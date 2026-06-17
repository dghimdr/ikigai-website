# IKIGAI International Website

Premium Vite + React website for IKIGAI International with a separate project finance review intake page.

## Local Development

```bash
npm install
npm run dev
```

Use `vercel dev` when you need to test the `/api/submit-project` serverless function locally with environment variables.

## Build

```bash
npm run build
```

## Apply Form Email Setup

The `/apply` form posts to `api/submit-project.js`, a Vercel serverless function that sends submissions through Resend.

Required Vercel environment variables:

- `RESEND_API_KEY`: Resend API key.
- `IKIGAI_SUBMISSIONS_FROM`: verified sender identity, for example `IKIGAI Submissions <submissions@ikigaiintl.com>`.

Submission recipients are configured in `api/submit-project.js`:

- `alexei@ikigaiintl.com`
- `SWIFTY@ikigaiintl.com`
- `dgim@ikigaiintl.com`

Important: verify the IKIGAI sender domain in Resend before launch. Do not expose `RESEND_API_KEY` in frontend code or commit it to the repository.

## Vercel Routing

`vercel.json` rewrites all non-API routes to `index.html` so direct navigation to `/apply` works on Vercel.
