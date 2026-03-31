# OptiX Final Secure Site (Fixed)

This package fixes the Prisma schema error and updates Next.js to a patched release.

## Included

- OptiX homepage/shop layout
- Email/password auth with Argon2id
- Google login
- Discord login
- Forgot-password + reset-password
- Prisma + PostgreSQL
- Gmail API sender scaffold
- Cloudflare Turnstile hook
- Security headers + CSP
- PayNow-ready product button

## Setup

```bash
npm install
cp .env.example .env
npx prisma db push
npm run dev
```

## What changed

- Prisma schema rewritten with valid multiline block syntax
- Next.js upgraded to 15.5.9
- Prisma packages aligned to current CLI line
- Structure kept server-safe for secrets
