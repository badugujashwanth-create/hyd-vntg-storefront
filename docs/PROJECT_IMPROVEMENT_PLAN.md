# Project Improvement Plan

## Current state

The public HYD VNTG storefront builds, deploys, and has a verified video. At baseline, local admin access could fall back to hardcoded credentials and there were no automated product tests.

## Findings

- **Works:** storefront browsing, coherent visual design, deployment, production build, demo assets, and clear ownership.
- **Does not / missing:** production commerce/payment guarantees, automated workflow tests, durable backend authorization, and inventory concurrency.
- **UX / architecture:** strong presentation; administrative behavior is local/demo-oriented and must not be confused with secure commerce operations.
- **Testing / security:** hardcoded fallback credentials were a critical blocker. Client-side admin controls are not a production authorization boundary.
- **Performance / docs / demo:** dependency/build results are good; media and catalog scaling are not benchmarked.

## Recommendations

### Critical

- Remove all default credentials and fail closed unless explicit environment values exist.
- Keep secrets out of browser bundles and describe admin mode as local/demo only.

### High value

- Add browser tests for catalog, cart, invalid admin configuration, and responsive navigation.
- Add image sizing/lazy-loading checks if the catalog grows.

### Optional

- Introduce a server-side commerce/auth boundary only for a real product requirement.

## Delivery constraints

- **Priority:** credential removal; **complexity:** small to medium; **dependencies:** current frontend deployment.
- **Acceptance:** production build and dependency audit pass, no fallback login exists, video matches the app, and admin limitations are explicit.
- **Excluded:** fake payments, public client-side admin claims, and duplicating the private repository.
