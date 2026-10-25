import { homepageServices } from "@/content/homepage-services";

const MAX_REQUEST_BYTES = 12_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const emailLocalPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i;
const emailLabelPattern = /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i;

type EnquiryInput = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

function rateLimitKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  return address.slice(0, 100);
}

function isRateLimited(request: Request) {
  const now = Date.now();
  if (rateLimits.size > 1000) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(key);
    }
  }

  const key = rateLimitKey(request);
  const entry = rateLimits.get(key);
  if (!entry || entry.resetAt <= now) {
    if (rateLimits.size >= 5000) return true;
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let body = "";
  let byteLength = 0;

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new RangeError("Request body is too large.");
      }
      body += decoder.decode(value, { stream: true });
    }
    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

function text(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\0/g, "")
    .trim()
    .replace(/\r\n?/g, "\n")
    .slice(0, maxLength + 1);
}

function isValidEmail(value: string) {
  if (value.length > 254 || /[\r\n\0]/.test(value)) return false;
  const at = value.lastIndexOf("@");
  if (at < 1 || value.indexOf("@") !== at) return false;

  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  const labels = domain.split(".");
  return (
    local.length <= 64 &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    emailLocalPattern.test(local) &&
    labels.length >= 2 &&
    labels.every((label) => label.length > 0 && label.length <= 63 && emailLabelPattern.test(label)) &&
    (labels[labels.length - 1]?.length ?? 0) >= 2
  );
}

function isPublicGmailAddress(value: string) {
  const domain = value.slice(value.lastIndexOf("@") + 1).toLowerCase();
  return domain === "gmail.com" || domain === "googlemail.com";
}

function invalid(message: string, status = 400, fieldErrors?: Record<string, string>) {
  return Response.json(
    { ok: false, message, ...(fieldErrors ? { fieldErrors } : {}) },
    { status },
  );
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return invalid("Too many enquiries were submitted. Please try again in a little while.", 429);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return invalid("Send the enquiry using the website form.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return invalid("The enquiry is too large. Please shorten the project details.", 413);
  }

  let input: EnquiryInput;
  try {
    const rawBody = await readLimitedBody(request);
    input = JSON.parse(rawBody) as EnquiryInput;
  } catch (error) {
    if (error instanceof RangeError) {
      return invalid("The enquiry is too large. Please shorten the project details.", 413);
    }
    return invalid("The enquiry could not be read. Please check the form and try again.");
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return invalid("The enquiry could not be read. Please check the form and try again.");
  }

  if (typeof input.website === "string" && input.website.trim()) {
    return invalid("Unable to process enquiry.");
  }

  const fields = {
    name: text(input.name, 100),
    company: text(input.company, 160),
    email: text(input.email, 254),
    phone: text(input.phone, 40),
    service: text(input.service, 100),
    message: text(input.message, 5000),
  };
  const fieldErrors: Record<string, string> = {};

  if (fields.name.length < 2 || fields.name.length > 100) {
    fieldErrors.name = "Enter a name between 2 and 100 characters.";
  }
  if (fields.company.length > 160) {
    fieldErrors.company = "Company must be 160 characters or fewer.";
  }
  if (!isValidEmail(fields.email)) {
    fieldErrors.email = "Enter a valid work email address.";
  }
  if (fields.phone.length > 40 || /[\r\n\0]/.test(fields.phone)) {
    fieldErrors.phone = "Phone must be 40 characters or fewer.";
  }
  if (!homepageServices.some((service) => service.title === fields.service)) {
    fieldErrors.service = "Select one of the listed services.";
  }
  if (fields.message.length < 20 || fields.message.length > 5000) {
    fieldErrors.message = "Project details must be between 20 and 5,000 characters.";
  }
  if (Object.keys(fieldErrors).length) {
    return invalid("Please correct the highlighted fields and try again.", 400, fieldErrors);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to || !isValidEmail(from) || !isValidEmail(to)) {
    return invalid(
      "Email delivery is not configured, so your enquiry has not been sent. Please call Optimus using the number in the contact section.",
      503,
    );
  }
  if (isPublicGmailAddress(from)) {
    return invalid(
      "Resend requires a sender on a domain Optimus owns and has verified. Gmail cannot be used as the sender, so your enquiry has not been sent.",
      503,
    );
  }

  const emailText = [
    `Name: ${fields.name}`,
    `Company: ${fields.company || "Not provided"}`,
    `Work email: ${fields.email}`,
    `Phone: ${fields.phone || "Not provided"}`,
    `Service required: ${fields.service}`,
    "",
    "Project details:",
    fields.message,
  ].join("\n");

  try {
    const delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `Website enquiry: ${fields.service}`,
        text: emailText,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!delivery.ok) {
      return invalid("We couldn't confirm delivery. Please try again later or call Optimus.", 502);
    }
  } catch {
    return invalid("We couldn't confirm delivery. Please try again later or call Optimus.", 502);
  }

  return Response.json({
    ok: true,
    message: "Your enquiry was accepted for sending. Delivery to the inbox is not confirmed.",
  });
}
