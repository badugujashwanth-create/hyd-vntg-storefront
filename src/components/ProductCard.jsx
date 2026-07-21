import { ArrowRight } from 'lucide-react';
import { getStockLabel, isSoldOut } from '../lib/product-store';
import { formatPrice } from '../lib/whatsapp';

export default function ProductCard({ product, onOrder, imageClassName = 'aspect-[4/5]' }) {
  return (
    <article className="group overflow-hidden border border-white/8 bg-mist shadow-[0_10px_35px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-velvet">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`${imageClassName} w-full object-cover transition duration-700 group-hover:scale-105`}
        />
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/8 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="border border-white/15 bg-black/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            {product.category}
          </span>
          <button
            type="button"
            onClick={() => onOrder(product)}
            disabled={isSoldOut(product.stock)}
            className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-ivory transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/35"
          >
            {isSoldOut(product.stock) ? 'Sold Out' : 'Order via WhatsApp'}
            <ArrowRight size={13} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="space-y-3 px-5 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[1.7rem] font-black uppercase leading-none tracking-[-0.04em] text-ink">
              {product.name}
            </h3>
            <p className="mt-3 text-sm text-stone">{product.accent}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
              {getStockLabel(product.stock)}
            </p>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </article>
  );
}
