import Reveal from './Reveal';

export default function StatementBanner() {
  return (
    <section className="section-shell py-12 md:py-16">
      <Reveal className="overflow-hidden border border-white/8 bg-mist px-6 py-16 shadow-velvet md:px-12 md:py-24 xl:px-20 xl:py-28">
        <p className="text-xs font-semibold uppercase tracking-luxe text-stone">Statement</p>
        <h2 className="mt-6 max-w-5xl font-display text-[clamp(3.2rem,9vw,7.8rem)] font-black uppercase leading-[0.84] tracking-[-0.06em] text-ink">
          NO MASS PRODUCTION. ONLY PIECES.
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-8 text-stone">
          Single-unit inventory keeps the drop honest. Once a piece goes, it leaves the site and
          the next rotation takes its place.
        </p>
      </Reveal>
    </section>
  );
}
