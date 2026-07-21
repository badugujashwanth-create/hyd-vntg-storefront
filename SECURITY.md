# Security policy

## Supported scope

Security fixes target the public canonical browser app in `badugujashwanth-create/hyd-vntg-storefront`. The private duplicate is retained separately and receives no implied support from this release.

## Trust boundaries

- `VITE_*` values are public browser configuration. Never put a Supabase service-role key, private token, reused password, or customer secret in them.
- WhatsApp is disabled unless a 10–15 digit destination is explicitly configured. The default build opens no placeholder contact.
- Local admin credentials and sessions protect only browser demo state; they are not production authorization.
- Supabase admin access requires a server-assigned `app_metadata.role = admin` in both the client check and example row-level policies. User-editable metadata is not trusted.
- A Supabase write/delete failure surfaces as failure and does not mutate a local shadow copy.
- Order-preview fields remain in component memory and are not intentionally persisted. Use synthetic data in demonstrations.

## Deployment checklist

Before connecting real services, an owner must separately verify the Supabase project, authentication settings, admin-role assignment process, deployed RLS policies, allowed origins, key restrictions, WhatsApp destination ownership, privacy notice, and data-retention requirements. Repository code is not proof that those external controls are deployed.

## Reporting

Use GitHub private vulnerability reporting when available. Otherwise, contact the owner through a verified GitHub profile channel without placing tokens, customer data, private URLs, or exploit details in a public issue.

No production support or response-time commitment is implied.
