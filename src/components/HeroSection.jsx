import { ArrowRight, MessageCircleMore } from 'lucide-react';
import { buildWhatsAppLink } from '../lib/whatsapp';

const fallbackHeroImage =
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1600&q=80';

export default function HeroSection({ heroImage, whatsappNumber }) {
  return (
    <section className="section-shell pt-12 pb-32 md:pt-20 md:pb-40 xl:pt-20 xl:pb-48">
      <div className="animate-floatIn overflow-hidden border border-white/10 bg-mist shadow-float">
        <div className="relative min-h-[76vh]">
          <img
            src={heroImage}
            alt="Male model wearing a streetwear fit"
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackHeroImage;
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,4,0.94)_8%,rgba(3,4,4,0.74)_42%,rgba(3,4,4,0.22)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(111,123,99,0.18),transparent_35%)]" />

          <div className="relative z-10 flex h-full min-h-[76vh] flex-col justify-between px-6 py-8 md:px-10 md:py-10 xl:px-14 xl:py-14">
            <div className="flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-stone">
              <span className="border border-white/12 px-4 py-2">Hyderabad Based</span>
              <span className="border border-white/12 px-4 py-2">Only Limited Pieces Available</span>
              <span className="border border-moss/30 px-4 py-2 text-[#c8d2c0]">Order via WhatsApp</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="max-w-4xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-stone">
                  Men&apos;s thrift / streetwear / vintage
                </p>
                <h1 className="max-w-5xl font-display text-[clamp(3.6rem,10vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-ink">
                  HYD VINTAGE.
                  <br />
                  REDEFINED.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#d7d7d3] md:text-xl">
                  Curated thrift. No repeats.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-stone md:text-base">
                  Underground men&apos;s drops built around oversized fits, washed textures, and
                  one-piece inventory that moves fast.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="/#collection" className="button-primary group gap-2">
                    Shop Drops
                    <ArrowRight
                      size={15}
                      strokeWidth={1.8}
                      className="transition duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href={buildWhatsAppLink(
                      whatsappNumber,
                      'Hi, I want to browse the latest HYD VNTG drops.',
                    )}
                    className="button-secondary gap-2 border-[#25D366]/30 text-[#98d4aa] hover:border-[#25D366]/45 hover:bg-[#25D366]/[0.05] hover:text-[#c1edd0]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircleMore size={15} strokeWidth={1.8} />
                    Order via WhatsApp
                  </a>
                </div>
              </div>

              <div className="max-w-sm justify-self-end border border-white/10 bg-[rgba(6,7,7,0.82)] p-6 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone">
                  Drop Signal
                </p>
                <p className="mt-4 font-display text-3xl font-black uppercase leading-[0.92] text-ink">
                  No mass production.
                  <br />
                  Only pieces.
                </p>
                <div className="mt-6 grid gap-4 border-t border-white/8 pt-5 text-sm text-stone">
                  <div className="flex items-start justify-between gap-4">
                    <span>Inventory style</span>
                    <span className="font-semibold uppercase tracking-[0.2em] text-ink">Single units</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Customer flow</span>
                    <span className="font-semibold uppercase tracking-[0.2em] text-ink">WhatsApp direct</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span>Base</span>
                    <span className="font-semibold uppercase tracking-[0.2em] text-ink">Hyderabad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
