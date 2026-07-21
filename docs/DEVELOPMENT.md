# Development guide

## Install and run

Node.js 22 is the CI baseline.

```powershell
npm ci
npm run dev
```

The default application uses local synthetic fixtures and intentionally disables outbound and admin actions.

## Targeted checks

After editing handoff, catalog, session, or schema rules:

```powershell
npm test -- tests/unit/whatsapp.test.js
npm test -- tests/unit/product-store.test.js
npm test -- tests/unit/schema.test.js
```

After editing a browser workflow:

```powershell
npx playwright test --grep "relevant test title"
```

Before release:

```powershell
npm test
npm run build
npm run test:e2e
npm audit --audit-level=low
```

Copy `.env.example` only for explicit integration work. Use synthetic values and do not commit `.env`, generated dependencies, browser artifacts, caches, or build output.
