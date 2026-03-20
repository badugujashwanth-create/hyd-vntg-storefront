# HYD VNTG

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
