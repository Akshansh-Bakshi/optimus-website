"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { homepageServices } from "@/content/homepage-services";

type EnquiryFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website: string;
};

type FieldName = keyof EnquiryFields;
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = { type: "success" | "error"; message: string } | null;

type ApiResponse = {
  ok?: boolean;
  message?: string;
  fieldErrors?: FieldErrors;
};

const emptyFields: EnquiryFields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-control border border-sky-200 bg-white px-3.5 py-3 text-base text-navy-950 placeholder:text-ink-500/70 focus-visible:border-navy-700 focus-visible:outline-navy-700";
const labelClassName = "block text-sm font-semibold text-navy-950";

export function EnquiryForm() {
  const [fields, setFields] = useState(emptyFields);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>(null);
  const [submitting, setSubmitting] = useState(false);
  const submissionLock = useRef(false);

  useEffect(() => {
    function handleServiceSelection(event: Event) {
      const selection = (event as CustomEvent<{ serviceTitle?: string }>).detail;
      if (!selection?.serviceTitle) return;

      setFields((current) => ({ ...current, service: selection.serviceTitle ?? "" }));
      setFieldErrors((current) => ({ ...current, service: undefined }));
    }

    window.addEventListener("optimus:select-service", handleServiceSelection);
    return () =>
      window.removeEventListener("optimus:select-service", handleServiceSelection);
  }, []);

  function updateField(field: FieldName, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;
    submissionLock.current = true;
    setStatus(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || result?.ok !== true) {
        setFieldErrors(result?.fieldErrors ?? {});
        setStatus({
          type: "error",
          message:
            result?.message ??
            (response.ok
              ? "The enquiry service did not confirm acceptance. Please try again later."
              : "We couldn't process the enquiry. Please try again."),
        });
        return;
      }

      setFields(emptyFields);
      setStatus({
        type: "success",
        message: result.message ??
          "Your enquiry was accepted for sending. Delivery to the inbox is not confirmed.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We couldn't confirm delivery. Please try again later.",
      });
    } finally {
      submissionLock.current = false;
      setSubmitting(false);
    }
  }

  function errorFor(field: FieldName) {
    return fieldErrors[field] ? (
      <span className="mt-1 block text-sm text-error-600" id={`${field}-error`}>
        {fieldErrors[field]}
      </span>
    ) : null;
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="enquiry-name">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            className={fieldClassName}
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {errorFor("name")}
        </div>

        <div>
          <label className={labelClassName} htmlFor="enquiry-company">
            Company <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            className={fieldClassName}
            id="enquiry-company"
            name="company"
            autoComplete="organization"
            maxLength={160}
            value={fields.company}
            onChange={(event) => updateField("company", event.target.value)}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "company-error" : undefined}
          />
          {errorFor("company")}
        </div>

        <div>
          <label className={labelClassName} htmlFor="enquiry-email">
            Work email <span aria-hidden="true">*</span>
          </label>
          <input
            className={fieldClassName}
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value.trim())}
            onBlur={(event) => updateField("email", event.target.value.trim())}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {errorFor("email")}
        </div>

        <div>
          <label className={labelClassName} htmlFor="enquiry-phone">
            Phone <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <input
            className={fieldClassName}
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            value={fields.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          {errorFor("phone")}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClassName} htmlFor="enquiry-service">
            Service required <span aria-hidden="true">*</span>
          </label>
          <select
            className={fieldClassName}
            id="enquiry-service"
            name="service"
            required
            value={fields.service}
            onChange={(event) => updateField("service", event.target.value)}
            aria-invalid={Boolean(fieldErrors.service)}
            aria-describedby={fieldErrors.service ? "service-error" : undefined}
          >
            <option value="" disabled>
              Select a service
            </option>
            {homepageServices.map((service) => (
              <option key={service.number} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          {errorFor("service")}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClassName} htmlFor="enquiry-message">
            Project details <span aria-hidden="true">*</span>
          </label>
          <textarea
            className={`${fieldClassName} min-h-36 resize-y`}
            id="enquiry-message"
            name="message"
            required
            minLength={20}
            maxLength={5000}
            value={fields.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : "message-hint"}
          />
          {fieldErrors.message ? errorFor("message") : (
            <span className="mt-1 block text-sm text-ink-500" id="message-hint">
              Include the site, requirement, or timing details that would help us understand your project.
            </span>
          )}
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input
          id="enquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-control bg-green-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-green-700 hover:text-white disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Sending…" : "Send Enquiry"}
        </button>
        <p className="text-sm text-ink-500">
          Required fields are marked with <span aria-hidden="true">*</span>.
        </p>
      </div>

      {status ? (
        <p
          className={`rounded-control border p-4 text-sm ${
            status.type === "success"
              ? "border-green-500/40 bg-green-100 text-navy-950"
              : "border-error-600/30 bg-error-600/5 text-error-600"
          }`}
          role="status"
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
