import { Pencil, Plus, Power, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getStockLabel } from '../lib/product-store';
import { formatPrice } from '../lib/whatsapp';

const initialDraft = {
  id: '',
  name: '',
  price: '',
  image: '',
  category: 'Streetwear Fits',
  stock: 1,
  accent: '',
};

const categories = ['Vintage Tees', 'Hoodies', 'Jackets', 'Streetwear Fits'];

export default function AdminDashboard({
  products,
  inventoryMode,
  inventoryNotice,
  flashMessage,
  busyAction,
  adminEmail,
  onSaveProduct,
  onDeleteProduct,
  onToggleStock,
  onLogout,
}) {
  const [draft, setDraft] = useState(initialDraft);

  const totals = useMemo(() => {
    const liveCount = products.filter((product) => product.stock > 0).length;
    const soldOutCount = products.filter((product) => product.stock <= 0).length;

    return {
      total: products.length,
      live: liveCount,
      soldOut: soldOutCount,
    };
  }, [products]);

  function updateDraft(field, value) {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleEdit(product) {
    setDraft({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      accent: product.accent,
      createdAt: product.createdAt,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSaveProduct(draft);
    setDraft(initialDraft);
  }

  return (
    <div className="section-shell py-10 pb-20 md:py-14">
      <div className="mb-8 flex flex-col gap-6 border-b border-white/8 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone">Admin Dashboard</p>
          <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-ink">
            Stock control for the current drop.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone">
            Add new pieces, edit product details, and toggle sold out status without touching code.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-stone lg:items-end">
          <span className="border border-white/10 px-4 py-3 uppercase tracking-[0.22em]">
            Signed in as {adminEmail}
          </span>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="button-secondary">
              View Storefront
            </a>
            <button type="button" onClick={onLogout} className="button-primary" disabled={busyAction === 'logout'}>
              {busyAction === 'logout' ? 'Signing Out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="panel-surface px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">Total Products</p>
          <p className="mt-4 font-display text-5xl font-black uppercase text-ink">{totals.total}</p>
        </div>
        <div className="panel-surface px-5 py-6 xl:translate-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">In Stock</p>
          <p className="mt-4 font-display text-5xl font-black uppercase text-ink">{totals.live}</p>
        </div>
        <div className="panel-surface px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">Sold Out</p>
          <p className="mt-4 font-display text-5xl font-black uppercase text-ink">{totals.soldOut}</p>
        </div>
        <div className="panel-surface px-5 py-6 xl:-translate-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">Inventory Mode</p>
          <p className="mt-4 font-display text-3xl font-black uppercase text-ink">{inventoryMode}</p>
          <p className="mt-3 text-sm leading-7 text-stone">
            {inventoryNotice || 'Live product reads and writes are active.'}
          </p>
        </div>
      </div>

      {flashMessage && (
        <div className="mb-8 border border-moss/30 bg-moss/10 px-5 py-4 text-sm text-[#dbe6d2]">
          {flashMessage}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="panel-surface px-6 py-7 md:px-8">
          <div className="mb-7 flex items-center justify-between gap-4 border-b border-white/8 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">
                Product Form
              </p>
              <p className="mt-2 text-sm text-stone">
                Add product, edit details, or restock a sold-out piece.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDraft(initialDraft)}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone transition hover:border-white/20 hover:text-ink"
            >
              <Plus size={14} strokeWidth={1.7} />
              New
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                Product Name
              </label>
              <input
                className="form-field"
                value={draft.name}
                onChange={(event) => updateDraft('name', event.target.value)}
                placeholder="Washed Black Cargo"
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                  Price (INR)
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-field"
                  value={draft.price}
                  onChange={(event) => updateDraft('price', event.target.value)}
                  placeholder="1299"
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                  Stock
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-field"
                  value={draft.stock}
                  onChange={(event) => updateDraft('stock', event.target.value)}
                  placeholder="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                Image URL
              </label>
              <input
                type="url"
                className="form-field"
                value={draft.image}
                onChange={(event) => updateDraft('image', event.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                  Category
                </label>
                <select
                  className="form-field"
                  value={draft.category}
                  onChange={(event) => updateDraft('category', event.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                  Status
                </label>
                <div className="form-field flex items-center justify-between">
                  <span>{Number(draft.stock) > 0 ? 'In Stock' : 'Sold Out'}</span>
                  <button
                    type="button"
                    onClick={() => updateDraft('stock', Number(draft.stock) > 0 ? 0 : 1)}
                    className="border border-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone transition hover:border-white/20 hover:text-ink"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                Product Note
              </label>
              <textarea
                className="form-field min-h-[110px] resize-none"
                value={draft.accent}
                onChange={(event) => updateDraft('accent', event.target.value)}
                placeholder="Describe the fit, wash, or texture."
              />
            </div>

            <button type="submit" className="button-primary" disabled={busyAction === 'save'}>
              {busyAction === 'save' ? 'Saving...' : draft.id ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </section>

        <section className="panel-surface px-6 py-7 md:px-8">
          <div className="mb-7 flex items-end justify-between gap-4 border-b border-white/8 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">Inventory List</p>
              <p className="mt-2 text-sm text-stone">Current public catalog with stock controls.</p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone">
              {products.length} listed
            </p>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="grid gap-4 border border-white/8 bg-[#101212] p-4 md:grid-cols-[124px_1fr_auto]"
              >
                <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />

                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
                        {product.category}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] text-ink">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-stone">{product.accent}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
                    <span className="border border-white/10 px-3 py-2">{getStockLabel(product.stock)}</span>
                    <span className="border border-white/10 px-3 py-2">ID {product.id}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 md:flex-col md:items-end">
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                    className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone transition hover:border-white/20 hover:text-ink"
                  >
                    <Pencil size={13} strokeWidth={1.8} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleStock(product)}
                    className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone transition hover:border-white/20 hover:text-ink"
                    disabled={busyAction === product.id}
                  >
                    <Power size={13} strokeWidth={1.8} />
                    {product.stock > 0 ? 'Set Sold Out' : 'Restock'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(product.id)}
                    className="inline-flex items-center gap-2 border border-[#8b3e3e]/35 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffb3b3] transition hover:bg-[#8b3e3e]/10"
                    disabled={busyAction === product.id}
                  >
                    <Trash2 size={13} strokeWidth={1.8} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
