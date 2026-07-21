# HYD VNTG Storefront

> **Release candidate:** a responsive storefront prototype with deterministic synthetic inventory, a local order-message preview, and fail-closed external/admin boundaries.

[![Watch the 3:03 narrated HYD VNTG walkthrough](docs/demo/demo-thumbnail.png)](docs/demo/demo.mp4)

[Play MP4](docs/demo/demo.mp4) · [Download WebM](docs/demo/demo.webm) · [Captions](docs/demo/demo-captions.vtt) · [Portfolio case study](https://jashwanth-portfolio-ten.vercel.app/work/hyd-vntg-storefront/)

The 3:03 narrated walkthrough is a real browser recording of the verified workflow. It shows the synthetic catalog, responsive filtering, the local order-message preview with zero outbound popups, the fail-closed admin boundary, and the product limitations.

HYD VNTG demonstrates one complete public workflow without pretending to be a production commerce system: browse a synthetic catalog, filter by category, inspect stock, select a product and size, enter synthetic delivery details, and generate a local order-message preview. Nothing leaves the browser unless a real WhatsApp destination is explicitly configured.

## Primary workflow

1. Browse the synthetic single-unit catalog.
2. Filter a category and inspect the item, price, and stock state.
3. Open the product dialog, select a size, and enter synthetic demo details.
4. Generate the **Local message preview — not sent** result.
5. Close the dialog or, only in an explicitly configured build, continue to WhatsApp.

The catalog photography is stored in `public/products` so the core demo does not depend on an image CDN at runtime. The images come from the Unsplash photo URLs preserved in repository history; product names and inventory are synthetic fixtures, not offers for sale.

## Honest boundaries

- There is no payment, checkout, reservation, shipping, fulfillment, customer account, or production-order backend.
- WhatsApp and Instagram are visibly unavailable by default; no placeholder account or phone number is opened.
- Local admin mode is a browser-only demo. Its optional credentials are public build configuration and cannot secure real data.
- Supabase mode accepts only a server-assigned `app_metadata.role = admin`; example row-level policies enforce the same role for mutations.
- Supabase schema deployment, WhatsApp ownership, inventory truth, and real commerce operations are not claimed.
- The private `thrifty_vintagegarag` duplicate is unchanged and is not a second portfolio project.

## Run

Requires Node.js 22 and npm.

```bash
npm ci
npm run dev
```

The default build needs no environment variables and keeps every external action disabled.

## Verify

```bash
npm test
npm run build
npm run test:e2e
npm audit --audit-level=low
```

Unit tests cover handoff validation, order-message construction, local catalog transitions, corrupt storage recovery, admin sessions, and Supabase policy boundaries. Playwright covers the desktop order preview, fail-closed admin, and mobile navigation/overflow.

## Optional configuration

Copy `.env.example` to `.env` only for a boundary you intend to exercise.

| Variable | Purpose and boundary |
|---|---|
| `VITE_WHATSAPP_NUMBER` | Optional public international-digits destination; empty keeps handoff disabled |
| `VITE_SUPABASE_URL` | Optional public Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Optional public client key; never a service-role secret |
| `VITE_ADMIN_EMAIL` | Browser-visible local-demo identity used only when Supabase is absent |
| `VITE_ADMIN_PASSWORD` | Browser-visible local-demo password; synthetic values only |

See [PROJECT_COMPLETION_REPORT.md](PROJECT_COMPLETION_REPORT.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [SECURITY.md](SECURITY.md), and [docs/TEST_REPORT.md](docs/TEST_REPORT.md) for the verified scope.

## License status

No license file is present. All rights remain with the copyright holder unless an ownership-informed license is added manually.
