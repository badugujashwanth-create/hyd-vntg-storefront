import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sizeOptions } from '../data/catalog';
import { getStockLabel, isSoldOut } from '../lib/product-store';
import { formatPrice, openWhatsAppOrder } from '../lib/whatsapp';

const emptyOrder = {
  size: 'M',
  name: '',
  phone: '',
  address: '',
};

export default function ProductModal({ product, whatsappNumber, onClose }) {
  const [order, setOrder] = useState(emptyOrder);

  useEffect(() => {
    if (!product) {
      return undefined;
    }

    setOrder(emptyOrder);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [product, onClose]);

  if (!product) {
    return null;
  }

  const soldOut = isSoldOut(product.stock);

  function updateField(field, value) {
    setOrder((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (soldOut) {
      return;
    }

    openWhatsAppOrder(whatsappNumber, product, order);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">
      <div className="panel-surface relative w-full max-w-4xl overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close order form"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center border border-white/10 bg-black/60 text-ink transition hover:bg-white/[0.06]"
        >
          <X size={16} strokeWidth={1.8} />
        </button>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-white/8 lg:border-b-0 lg:border-r">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone">Order Form</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-ink">
              {product.name}
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.2em] text-stone">
              <span>{formatPrice(product.price)}</span>
              <span>{getStockLabel(product.stock)}</span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone">
              Select size, add delivery details, and the site will generate a ready-to-send
              WhatsApp order message.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone">
                  Size
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {sizeOptions.map((size) => {
                    const active = order.size === size;

                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateField('size', size)}
                        className={`border px-4 py-3 text-xs font-semibold uppercase tracking-[0.28em] transition ${
                          active
                            ? 'border-moss/50 bg-moss/10 text-ink'
                            : 'border-white/10 text-stone hover:border-white/20 hover:text-ink'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="customer-name"
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone"
                  >
                    Name
                  </label>
                  <input
                    id="customer-name"
                    className="form-field"
                    value={order.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="customer-phone"
                    className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone"
                  >
                    Phone
                  </label>
                  <input
                    id="customer-phone"
                    className="form-field"
                    value={order.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    placeholder="10 digit mobile number"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="customer-address"
                  className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.26em] text-stone"
                >
                  Address
                </label>
                <textarea
                  id="customer-address"
                  className="form-field min-h-[128px] resize-none"
                  value={order.address}
                  onChange={(event) => updateField('address', event.target.value)}
                  placeholder="House number, area, city, pincode"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={soldOut}
                  className="button-primary disabled:cursor-not-allowed disabled:border-white/10 disabled:text-stone"
                >
                  {soldOut ? 'Sold Out' : 'Send to WhatsApp'}
                </button>
                <button type="button" onClick={onClose} className="button-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
