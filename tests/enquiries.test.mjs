/* global process */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const load = createRequire(import.meta.url);
const ts = load("typescript");
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const originalResolveFilename = Module._resolveFilename;

load.extensions[".ts"] = (loadedModule, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  loadedModule._compile(transpiled.outputText, filename);
};

Module._resolveFilename = function resolveProjectAlias(request, parent, isMain, options) {
  const resolvedRequest = request.startsWith("@/")
    ? path.join(projectRoot, "src", request.slice(2))
    : request;
  return originalResolveFilename.call(this, resolvedRequest, parent, isMain, options);
};

const { POST } = load(path.join(projectRoot, "src/app/api/enquiries/route.ts"));
const environmentNames = [
  "RESEND_API_KEY",
  "ENQUIRY_FROM_EMAIL",
  "ENQUIRY_TO_EMAIL",
];
const validEnquiry = {
  name: "Project Contact",
  company: "Example Company",
  email: "contact@example.test",
  phone: "",
  service: "HVAC & Cooling Solutions",
  message: "Please contact me about cooling requirements for a new site.",
  website: "",
};

function requestFor(payload, ip = "192.0.2.10") {
  return new Request("http://localhost/api/enquiries", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
  });
}

function configuredEnvironment(overrides = {}) {
  return {
    RESEND_API_KEY: "re_test_mock_only",
    ENQUIRY_FROM_EMAIL: "enquiries@example.test",
    ENQUIRY_TO_EMAIL: "queryoptimus@gmail.com",
    ...overrides,
  };
}

async function withRuntime({ environment = {}, fetchImpl }, run) {
  const oldEnvironment = Object.fromEntries(
    environmentNames.map((name) => [name, process.env[name]]),
  );
  const oldFetch = globalThis.fetch;

  for (const name of environmentNames) {
    if (Object.hasOwn(environment, name)) process.env[name] = environment[name];
    else delete process.env[name];
  }
  globalThis.fetch = fetchImpl;

  try {
    await run();
  } finally {
    globalThis.fetch = oldFetch;
    for (const name of environmentNames) {
      if (oldEnvironment[name] === undefined) delete process.env[name];
      else process.env[name] = oldEnvironment[name];
    }
  }
}

async function responseBody(response) {
  return response.json();
}

test("rejects missing fields and malformed email without contacting Resend", async () => {
  let providerCalls = 0;
  await withRuntime({
    fetchImpl: async () => {
      providerCalls += 1;
      throw new Error("Provider must not be called for invalid input.");
    },
  }, async () => {
    const response = await POST(requestFor({
      ...validEnquiry,
      name: "   ",
      email: "not-an-email",
      service: "unknown service",
      message: "short",
    }));
    const body = await responseBody(response);

    assert.equal(response.status, 400);
    assert.match(body.fieldErrors.name, /name/i);
    assert.match(body.fieldErrors.email, /email/i);
    assert.match(body.fieldErrors.service, /service/i);
    assert.match(body.fieldErrors.message, /details/i);
    assert.equal(providerCalls, 0);
  });
});

test("does not call the provider when email configuration is missing", async () => {
  let providerCalls = 0;
  await withRuntime({
    fetchImpl: async () => {
      providerCalls += 1;
      throw new Error("Provider must not be called without configuration.");
    },
  }, async () => {
    const response = await POST(requestFor(validEnquiry, "192.0.2.11"));
    const body = await responseBody(response);

    assert.equal(response.status, 503);
    assert.match(body.message, /not been sent/i);
    assert.equal(providerCalls, 0);
  });
});

test("rejects a sender that is not a bare email address", async () => {
  let providerCalls = 0;
  await withRuntime({
    environment: configuredEnvironment({
      ENQUIRY_FROM_EMAIL: "Optimus Enquiries <enquiries@example.test>",
    }),
    fetchImpl: async () => {
      providerCalls += 1;
      throw new Error("Provider must not be called with an invalid sender.");
    },
  }, async () => {
    const response = await POST(requestFor(validEnquiry, "192.0.2.12"));
    assert.equal(response.status, 503);
    assert.equal(providerCalls, 0);
  });
});

test("does not use the public Gmail address as a Resend sender", async () => {
  let providerCalls = 0;
  await withRuntime({
    environment: configuredEnvironment({
      ENQUIRY_FROM_EMAIL: "queryoptimus@gmail.com",
    }),
    fetchImpl: async () => {
      providerCalls += 1;
      throw new Error("Provider must not be called with a Gmail sender.");
    },
  }, async () => {
    const response = await POST(requestFor(validEnquiry, "192.0.2.19"));
    const body = await responseBody(response);

    assert.equal(response.status, 503);
    assert.match(body.message, /Gmail cannot be used as the sender/i);
    assert.equal(providerCalls, 0);
  });
});

test("sends through the mocked Resend API and reports success only after its 2xx response", async () => {
  let providerRequest;
  await withRuntime({
    environment: configuredEnvironment(),
    fetchImpl: async (url, options) => {
      providerRequest = { url, options };
      return Response.json({ id: "mock_email_id" }, { status: 200 });
    },
  }, async () => {
    const response = await POST(requestFor({
      ...validEnquiry,
      name: "  Project Contact  ",
      email: "  contact@example.test  ",
      message: "  Please contact me about cooling requirements for a new site.  ",
    }, "192.0.2.13"));
    const body = await responseBody(response);
    const message = JSON.parse(providerRequest.options.body);

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(
      body.message,
      "Your enquiry was accepted for sending. Delivery to the inbox is not confirmed.",
    );
    assert.equal(providerRequest.url, "https://api.resend.com/emails");
    assert.equal(providerRequest.options.headers.Authorization, "Bearer re_test_mock_only");
    assert.equal(message.from, "enquiries@example.test");
    assert.deepEqual(message.to, ["queryoptimus@gmail.com"]);
    assert.equal(message.reply_to, "contact@example.test");
    assert.match(message.text, /Name: Project Contact/);
    assert.match(message.text, /cooling requirements for a new site\.$/);
    assert.doesNotMatch(JSON.stringify(body), /re_test_mock_only|mock_email_id/);
  });
});

test("does not expose provider response details or credentials on provider failure", async () => {
  await withRuntime({
    environment: configuredEnvironment(),
    fetchImpl: async () =>
      new Response("private provider diagnostic re_test_mock_only", { status: 500 }),
  }, async () => {
    const response = await POST(requestFor(validEnquiry, "192.0.2.14"));
    const body = await responseBody(response);

    assert.equal(response.status, 502);
    assert.match(body.message, /couldn't confirm delivery/i);
    assert.doesNotMatch(JSON.stringify(body), /private provider diagnostic|re_test_mock_only/);
  });
});

test("returns a generic failure when the provider request throws", async () => {
  await withRuntime({
    environment: configuredEnvironment(),
    fetchImpl: async () => {
      throw new Error("private network diagnostic re_test_mock_only");
    },
  }, async () => {
    const response = await POST(requestFor(validEnquiry, "192.0.2.15"));
    const body = await responseBody(response);

    assert.equal(response.status, 502);
    assert.doesNotMatch(JSON.stringify(body), /private network diagnostic|re_test_mock_only/);
  });
});

test("rejects honeypot submissions and oversized bodies", async () => {
  let providerCalls = 0;
  await withRuntime({
    environment: configuredEnvironment(),
    fetchImpl: async () => {
      providerCalls += 1;
      return Response.json({ id: "unexpected" });
    },
  }, async () => {
    const spam = await POST(requestFor({ ...validEnquiry, website: "spam" }, "192.0.2.16"));
    assert.equal(spam.status, 400);

    const oversizedBody = JSON.stringify({ message: "x".repeat(13_000) });
    const oversized = await POST(new Request("http://localhost/api/enquiries", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "192.0.2.17",
      },
      body: oversizedBody,
    }));
    assert.equal(oversized.status, 413);
    assert.equal(providerCalls, 0);
  });
});

test("rate limits a client after five requests in the window", async () => {
  await withRuntime({ fetchImpl: async () => Response.json({}) }, async () => {
    const statuses = [];
    for (let index = 0; index < 6; index += 1) {
      const response = await POST(requestFor(validEnquiry, "192.0.2.18"));
      statuses.push(response.status);
    }
    assert.deepEqual(statuses, [503, 503, 503, 503, 503, 429]);
  });
});

test("keeps email credentials out of client code and avoids logging enquiry data", () => {
  const formSource = fs.readFileSync(
    path.join(projectRoot, "src/components/site/EnquiryForm.tsx"),
    "utf8",
  );
  const routeSource = fs.readFileSync(
    path.join(projectRoot, "src/app/api/enquiries/route.ts"),
    "utf8",
  );

  assert.doesNotMatch(formSource, /RESEND_API_KEY|ENQUIRY_FROM_EMAIL|ENQUIRY_TO_EMAIL|process\.env/);
  assert.doesNotMatch(routeSource, /console\.(?:log|warn|error)\s*\(/);
});

test("the form requires explicit endpoint acceptance before reporting success", () => {
  const formSource = fs.readFileSync(
    path.join(projectRoot, "src/components/site/EnquiryForm.tsx"),
    "utf8",
  );
  assert.match(formSource, /if \(!response\.ok \|\| result\?\.ok !== true\)/);
});
