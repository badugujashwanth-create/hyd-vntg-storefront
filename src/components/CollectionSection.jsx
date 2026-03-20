import { useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import Reveal from './Reveal';
import ProductCard from './ProductCard';
import { buildWhatsAppLink } from '../lib/whatsapp';

const cardOffsets = ['', 'md:translate-y-8', '', 'xl:-translate-y-6', 'xl:translate-y-6', '', 'md:-translate-y-4', ''];
const imageRatios = [
  'aspect-[4/5]',
  'aspect-[4.2/5]',
  'aspect-[3.95/5]',
  'aspect-[4/5]',
  'aspect-[4.15/5]',
  'aspect-[4/5]',
  'aspect-[3.9/5]',
  'aspect-[4.1/5]',
];

export default function CollectionSection({ products, whatsappNumber, onOrderProduct }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', ...new Set(products.map((product) => product.category))];

  const visibleProducts =
    activeFilter === 'All'
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <section id="collection" className="section-shell pt-10 pb-44 md:pt-16 md:pb-56">
      <Reveal className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-luxe text-stone">Collection</p>
          <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
            Built for the weekly rotation.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone md:text-base">
            Browse the current men&apos;s thrift lineup, then order directly through WhatsApp after
            selecting size and delivery details.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="border border-white/10 bg-transparent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone">
              Only 1 piece available per drop
            </span>
            <span className="border border-white/10 bg-transparent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone">
              Hyderabad Based
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:items-end">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const active = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] transition duration-300 ${
                    active
                      ? 'border-white/28 bg-transparent text-ink shadow-velvet'
                      : 'border-white/10 bg-transparent text-stone hover:border-white/20 hover:bg-white/[0.04] hover:text-ink'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <a
            href={buildWhatsAppLink(
              whatsappNumber,
              'Hi, I want to browse the current HYD VNTG collection.',
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[#25D366]/35 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8fe6af] transition hover:-translate-y-0.5 hover:bg-[#25D366]/[0.05]"
          >
            <MessageCircleMore size={15} strokeWidth={1.7} />
            Order via WhatsApp
          </a>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {visibleProducts.map((product, index) => (
          <Reveal key={product.id} delay={index * 70} className={cardOffsets[index % cardOffsets.length]}>
            <ProductCard
              product={product}
              onOrder={onOrderProduct}
              imageClassName={imageRatios[index % imageRatios.length]}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
