# HYD VNTG Storefront (Duplicate) architecture

Public duplicate of the HYD VNTG React storefront, including its catalog, optional Supabase admin flow, and WhatsApp handoff.

## System view

```mermaid
flowchart LR
  N0[Shopper or administrator] --> N1
  N1[React storefront] --> N2
  N2[Catalog/product store] --> N3
  N3[Optional Supabase] --> N4
  N4[WhatsApp handoff]
```

## Component boundaries

- **Shopper or administrator:** initiates the primary workflow.
- **React storefront:** owns one stage of the request or interaction flow.
- **Catalog/product store:** owns one stage of the request or interaction flow.
- **Optional Supabase:** owns one stage of the request or interaction flow.
- **WhatsApp handoff:** provides the terminal integration or persistence boundary.

## Runtime and trust boundaries

Content-identical duplicate of `thrifty_vintagegarag`; keep one canonical portfolio entry and archive the other only after manual review. Inputs crossing a network, filesystem, provider, or database boundary should be validated and logged without sensitive values. Optional integrations must fail clearly rather than being presented as successful.

## Technology

React, Vite, Tailwind CSS, Supabase, WhatsApp deep links.

