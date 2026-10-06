# Higher Level website

Public site for Higher Level (higherleveladz.com). Service-business side first; ecommerce side is next.

- Next.js 15 App Router, TypeScript, plain CSS (`app/globals.css`).
- All copy lives in `content/site.ts`.
- Results section stays hidden until real, client-approved results are added to `results` in `content/site.ts`.
- `/audit` form posts to `/api/audit-request`, which logs the lead and emails it via Resend.

## Env vars (Vercel → Settings → Environment Variables)

See `.env.example`. Needed for leads to reach your inbox: `RESEND_API_KEY`, `LEAD_INBOX`.
Optional: `NEXT_PUBLIC_BOOKING_URL` (demo call link shown after the form), `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_CLIENT_LOGIN_URL`, `LEAD_FROM`.

## Dev

```bash
npm install
npm run dev
npm run build   # before pushing
```
