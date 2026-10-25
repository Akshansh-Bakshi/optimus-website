# Enquiry email setup

The enquiry route sends email through the Resend HTTP API only when all three
server-side variables below are present, the sender and recipient are valid
addresses, and the sender is not a public Gmail address. Resend must still
confirm the sender domain when the send request is made:

- `RESEND_API_KEY`: a Resend API key. Keep it secret and server-side.
- `ENQUIRY_FROM_EMAIL`: a bare sender address on a domain verified for sending
  in Resend. Use a bare email address without a display-name wrapper; the
  current route validates standard email address syntax. Leave this unset
  until a sender domain is available and verified. A Gmail address should not
  be used as this sender.
- `ENQUIRY_TO_EMAIL`: `queryoptimus@gmail.com`, the Optimus inbox supplied by
  the site owner. A Gmail address is valid as the recipient; the sending
  domain requirement applies to `ENQUIRY_FROM_EMAIL`.

The route can validate sender syntax, but it cannot confirm that Optimus owns
the domain or that Resend has verified it. Resend requires a domain the sender
owns; its documentation excludes shared/public domains. Since `gmail.com` is
a shared public domain, the supplied Gmail inbox is not a suitable Resend
sender. The route rejects Gmail/Googlemail sender addresses before contacting
Resend. Add a domain Optimus controls in the Resend dashboard, publish the
exact DNS records Resend provides (including sending authentication records),
and wait for its status to show verified before using an address on that
domain. See [Resend's verified-domain instructions](https://resend.com/docs/dashboard/domains/introduction).

Without a company-controlled domain, the current Resend integration cannot
send production enquiry emails. Resend's [test recipients](https://resend.com/changelog/sending-test-emails)
simulate delivery events; they do not deliver a real enquiry to
`queryoptimus@gmail.com`. A different email integration that authorizes the
existing Gmail account would be a separate implementation and would require
its own secure credentials.

## Local development

1. Obtain a domain Optimus controls and add it to a Resend account.
2. Add the DNS records shown by Resend at the domain's DNS host. Follow the
   records and troubleshooting details shown in the Resend dashboard; do not
   replace existing DNS records blindly.
3. Wait until Resend marks the domain verified for sending.
4. Create a Resend API key. Enter it directly into your local secret store;
   do not put it in browser code or share it in chat.
5. Keep `ENQUIRY_TO_EMAIL=queryoptimus@gmail.com`, or change it only if the
   site owner confirms a different monitored Optimus inbox.
6. Copy `.env.example` to `.env.local` in the project root. The recipient is
   already set; leave the API key and sender blank until a Resend key and
   verified sender domain are available. `.env.local` is ignored by Git.
   Never prefix these names with `NEXT_PUBLIC_`.
7. Restart the local Next.js server after changing `.env.local`.

## Hosting environment

Add the same three variables separately in the hosting provider's server-side
environment/secrets settings. Configure production, and configure preview or
staging only if those deployments should be able to send enquiries. Keep the
API key in the host's secret manager, never in committed files or client
environment variables. Redeploy after changing the hosting environment.

## Delivery behavior and checks

- The route returns success only after Resend responds with a successful HTTP
  status. The browser says the enquiry was accepted for sending and explicitly
  says inbox delivery is not confirmed; Resend acceptance is not a delivery
  receipt.
- Invalid data returns `400`; oversized requests return `413`; rate-limited
  requests return `429`.
- Missing or invalid email configuration returns `503` and tells the visitor
  the enquiry was not sent.
- A Resend HTTP error or network error returns a generic `502` message. The
  route does not include provider response bodies, credentials, or enquiry
  content in its API error response or logs.
- `npm test` mocks `fetch`; it never contacts Resend and does not require real
  credentials. It cannot prove that a particular sender domain is verified or
  that a real mailbox receives mail.

The endpoint has a honeypot, body-size and field-length limits, server-side
validation, and a best-effort in-memory limit of five requests per IP address
per 15 minutes. That rate limit is per running instance. Multi-instance
production hosting should use shared or edge-level rate limiting for a
persistent limit.
