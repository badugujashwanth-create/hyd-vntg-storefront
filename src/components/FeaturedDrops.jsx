import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { getStockLabel, isSoldOut } from '../lib/product-store';
import { formatPrice } from '../lib/whatsapp';

const layouts = [
  'col-span-12 lg:col-span-7 lg:row-span-2',
  'col-span-12 md:col-span-6 lg:col-span-5 lg:translate-y-8',
  'col-span-12 md:col-span-6 lg:col-span-5',
  'col-span-12 lg:col-span-7 lg:-translate-y-6',
];

const ratios = ['aspect-[4/5]', 'aspect-[4.4/5]', 'aspect-[4/4.8]', 'aspect-[4.2/5]'];

export default function FeaturedDrops({ products, onSelectProduct }) {
  return (
    <section id="drops" className="section-shell pt-10 pb-40 md:pt-16 md:pb-48">
      <Reveal className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-luxe text-stone">Featured Drops</p>
          <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-ink">
            Real pieces. Uneven grid. No template energy.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-stone">
          Featured fits sit slightly off-grid on purpose, the same way actual drops get merchandised
          when stock is limited and every piece matters.
        </p>
      </Reveal>

      <div className="grid auto-rows-[220px] gap-5 lg:grid-cols-12">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 80} className={layouts[index]}>
            <article className="group relative h-full overflow-hidden border border-white/8 bg-mist">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className={`${ratios[index % ratios.length]} h-full w-full object-cover transition duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="border border-white/12 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink">
                    Drop {String(index + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() => !isSoldOut(product.stock) && onSelectProduct(product)}
                    disabled={isSoldOut(product.stock)}
                    className="inline-flex items-center gap-2 border border-white/12 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:border-white/24 hover:text-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/35"
                  >
                    {isSoldOut(product.stock) ? 'Sold Out' : 'View Piece'}
                    {!isSoldOut(product.stock) && <ArrowUpRight size={14} strokeWidth={1.7} />}
                  </button>
                </div>

                <div className="max-w-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-stone">
                    {product.category}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-ink md:text-4xl">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/72">
                    <span>{formatPrice(product.price)}</span>
                    <span>{getStockLabel(product.stock)}</span>
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-7 text-white/72">{product.accent}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
