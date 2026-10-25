# Optimus Cooling & Power Solution website

Corporate website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Local development

Install dependencies with `npm install`, then start the development server:

```bash
npm run dev
```

The homepage and its reusable sections are in `src/app/page.tsx`; shared site
components are in `src/components`, and company content is in `src/content`.

## Visual assets

The hero and all six service panels use local representative photographs. The
cooling-system explorer uses a custom explanatory illustration. These images
are not identified as photographs of Optimus installations. If an image's
subject, source, or usage rights need confirmation, verify that before
publication.

## Enquiry email configuration

The form submits to `POST /api/enquiries`. Without email configuration, the
endpoint reports that the enquiry was not sent and the form does not show
success. To enable Resend delivery, configure these server-side variables:

- `RESEND_API_KEY`: secret Resend API key.
- `ENQUIRY_FROM_EMAIL`: sender address on a domain Optimus owns and has verified
  for sending in Resend.
- `ENQUIRY_TO_EMAIL`: enquiry inbox; currently `queryoptimus@gmail.com`.

Copy `.env.example` to `.env.local` for local setup. The API key and sender
remain blank until a Resend key and verified sender domain are available. Add
the same variables to the hosting provider's server-side environment settings
before production email delivery. Never use `NEXT_PUBLIC_` prefixes or commit
real credentials. See [docs/ENQUIRY_SETUP.md](docs/ENQUIRY_SETUP.md) for the
steps and delivery limitations.

## Checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```
