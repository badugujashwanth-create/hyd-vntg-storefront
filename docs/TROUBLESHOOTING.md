# Troubleshooting

## Order actions say unavailable

This is the safe default. The complete order-message preview works locally without configuration. Set a verified `VITE_WHATSAPP_NUMBER` in international digits only when an owner has approved the real outbound destination.

## Admin login is disabled

Configure Supabase or both synthetic local-demo credential values. Local credentials are visible in the browser bundle and must never protect real data. A Supabase account also needs a server-assigned `app_metadata.role = admin` and matching deployed RLS policies.

## Catalog uses local data

The default is a deterministic synthetic catalog. If a configured Supabase read fails, the storefront falls back to the same local fixtures and displays a notice; this is not live inventory.

## Browser tests open the wrong application

Stop any existing process on port 4173 or run with `CI=1` so Playwright starts its own server. The test suite fails rather than treating another app as evidence.

## Sensitive configuration

Never paste real credentials or customer details into an issue, screenshot, test, or recording. Use the repository's synthetic examples.
