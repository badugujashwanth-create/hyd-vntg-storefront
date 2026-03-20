import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const initialCredentials = {
  email: 'admin@gmail.com',
  password: '123456',
};

export default function AdminLogin({ onSubmit, submitting, error }) {
  const [credentials, setCredentials] = useState(initialCredentials);

  function updateField(field, value) {
    setCredentials((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(credentials);
  }

  return (
    <div className="section-shell py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="panel-surface px-7 py-10 md:px-10 md:py-12">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone">
                Admin Access
              </p>
              <h1 className="mt-5 font-display text-[clamp(3rem,7vw,5.6rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-ink">
                Manage stock without leaving the brand.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-stone">
                The customer site stays public and fast. Inventory control, stock switches, and
                product updates stay behind admin login.
              </p>
            </div>

            <div className="grid gap-4 border-t border-white/8 pt-6 text-sm text-stone md:grid-cols-3">
              <div>
                <p className="font-display text-3xl font-black uppercase text-ink">Live</p>
                <p className="mt-2 leading-7">Public storefront with no customer login.</p>
              </div>
              <div className="md:translate-y-4">
                <p className="font-display text-3xl font-black uppercase text-ink">Direct</p>
                <p className="mt-2 leading-7">WhatsApp order flow with customer details built in.</p>
              </div>
              <div>
                <p className="font-display text-3xl font-black uppercase text-ink">Admin</p>
                <p className="mt-2 leading-7">Add, edit, delete, restock, and mark sold out.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="panel-surface px-7 py-10 md:px-10 md:py-12">
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center border border-moss/35 bg-moss/10 text-[#c5d0bc]">
              <ShieldCheck size={20} strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">
                HYD VNTG Admin
              </p>
              <p className="mt-2 text-sm text-stone">Secure access for dashboard controls.</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-email"
                className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                className="form-field"
                value={credentials.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="admin@hydvntg.in"
                required
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-field"
                value={credentials.password}
                onChange={(event) => updateField('password', event.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="border border-[#8b3e3e]/40 bg-[#8b3e3e]/10 px-4 py-3 text-sm text-[#ffbbbb]">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button type="submit" className="button-primary" disabled={submitting}>
                {submitting ? 'Signing In...' : 'Sign In'}
              </button>
              <a href="/" className="button-secondary">
                Back to Store
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
