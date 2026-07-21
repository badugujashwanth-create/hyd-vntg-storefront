# HYD VNTG walkthrough script

**Primary target:** at least 3 minutes

**Supporting cut:** no more than 90 seconds

**Format:** 1280×720 real browser recording with narration and captions

**Data:** repository synthetic catalog and synthetic buyer details only

## Walkthrough

1. **Thesis and boundary (0:00–0:25):** Introduce the responsive storefront prototype. State that inventory is synthetic and there is no payment or production-order backend.
2. **Catalog (0:25–0:55):** Show local product imagery, featured drops, category filters, price, and stock state.
3. **Safe order preparation (0:55–2:00):** Open Black 705 Tee, select size L, enter the scripted synthetic buyer details, and generate the local message preview. Confirm no popup or external site opened.
4. **Admin boundary (2:00–2:40):** Open `/admin`, explain disabled/Supabase/local-demo modes, attempt the scripted invalid login, and show the fail-closed result.
5. **Architecture and close (2:40–3:20):** Return to the storefront, identify local fixtures and optional provider boundaries, then close with tests and limitations.

Keep WhatsApp, Instagram, Supabase, file pickers, accounts, environment files, notifications, and private URLs closed. Do not imply payment, inventory reservation, order submission, provider ownership, or deployed RLS.
