import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const layouts = [
  'xl:col-span-3',
  'xl:col-span-4 xl:translate-y-10',
  'xl:col-span-2',
  'xl:col-span-3 xl:-translate-y-6',
];

const heights = ['h-[420px]', 'h-[520px]', 'h-[360px]', 'h-[470px]'];

export default function CuratedCategories({ categories }) {
  return (
    <section id="categories" className="section-shell pt-10 pb-40 md:pt-16 md:pb-52">
      <Reveal className="mb-14 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-luxe text-stone">Categories</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-ink">
            Vintage tees, hoodies, jackets, and full streetwear fits.
          </h2>
          <p className="max-w-md text-sm leading-7 text-stone md:text-base">
            Clean enough to feel premium, rough enough to still feel lived in.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12">
        {categories.map((category, index) => (
          <Reveal key={category.title} delay={index * 120} className={layouts[index]}>
            <article className="group relative overflow-hidden rounded-xl border border-white/8 bg-mist text-white shadow-velvet">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-95" />
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
                className={`${heights[index]} w-full object-cover transition duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  {category.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-[-0.03em] md:text-[2rem]">
                  {category.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-7 text-white/72">{category.description}</p>
                <a
                  href="#collection"
                  className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/14 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition duration-300 hover:bg-white/[0.06] hover:text-white"
                >
                  Explore
                  <ArrowRight size={15} strokeWidth={1.6} />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
