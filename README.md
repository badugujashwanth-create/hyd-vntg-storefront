# HYD VNTG

> **Status: Duplicate / Archive Candidate** — The storefront build passes, but this audited commit is content-identical to `thrifty_vintagegarag` and should not be featured separately.

Dark, premium men's thrift and streetwear storefront for Hyderabad with:

- public product browsing
- WhatsApp-first ordering flow
- admin login and inventory dashboard
- local-first fallback with optional Supabase backend

## Stack

- React
- Vite
- Tailwind CSS
- Supabase JS

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment

Copy `.env.example` to `.env` and update values as needed.

Required for WhatsApp:

- `VITE_WHATSAPP_NUMBER`

Optional for live backend auth + product sync:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Local fallback admin credentials:

- email: `admin@hydvntg.in`
- password: `hydvntg123`

## Deploy

This repo is prepared for static deployment.

- Vercel: `vercel.json` adds SPA rewrites
- Netlify: `netlify.toml` and `public/_redirects` add SPA rewrites

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

## Supabase setup

Run the SQL in `supabase/schema.sql` to create the `products` table and policies.

## Related repository

The audited commit is content-identical to [thrifty_vintagegarag](https://github.com/badugujashwanth-create/thrifty_vintagegarag). This public copy is an archive candidate after the owner confirms which repository should remain canonical.

See [docs/TEST_REPORT.md](docs/TEST_REPORT.md) and [docs/demo/DEMO_SCRIPT.md](docs/demo/DEMO_SCRIPT.md).

The two repositories represent the same product. Watch the
[canonical storefront demo](https://github.com/badugujashwanth-create/thrifty_vintagegarag/blob/portfolio-polish/docs/demo/demo.webm)
instead of maintaining a duplicate recording.

## License status

No license file is currently present. All rights remain with the copyright holder unless a license is added manually.
