const marqueeText = "HYDERABAD BASED // LIMITED PIECES // MEN'S STREETWEAR // ";

export default function MarqueeStrip() {
  return (
    <section className="border-y border-white/8 bg-white/[0.03] py-4">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="flex w-max animate-marquee gap-10 text-xs font-semibold uppercase tracking-[0.38em] text-stone">
          <span>{marqueeText.repeat(4)}</span>
          <span aria-hidden="true">{marqueeText.repeat(4)}</span>
        </div>
      </div>
    </section>
  );
}
