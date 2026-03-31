# OptiX Final Secure Site

This package is set up so the only things left are:

1. Connect your domain to Vercel
2. Add your environment variables
3. Create your PayNow product and paste its URL into `PAYNOW_PRODUCT_URL_REGULAR`

## Included

- Secure email/password auth with Argon2id
- Google login
- Discord login
- Forgot-password / reset-password
- Gmail API reset email sender scaffold
- Prisma + PostgreSQL
- Cloudflare Turnstile hook
- Security headers + CSP
- OptiX landing page + shop-ready layout

## Setup

```bash
npm install
cp .env.example .env
npx prisma db push
npm run dev
```

## Final things you must configure

- `DATABASE_URL`
- `AUTH_SECRET`
- Google OAuth credentials
- Discord OAuth credentials
- Gmail API credentials
- Cloudflare Turnstile keys
- `PAYNOW_PRODUCT_URL_REGULAR`

## Security notes

- Never put secrets in client code
- Keep `.env` out of git
- Add Cloudflare WAF + rate limiting for auth routes
- Keep Vercel HTTPS enabled
- Rotate secrets if exposed
