import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppAction from './WhatsAppAction';

export default function SplitFeature({ aboutCopy, image, whatsappNumber }) {
  return (
    <section id="about" className="section-shell pt-10 pb-40 md:pt-16 md:pb-52">
      <div className="grid items-center gap-12 border border-white/8 bg-mist p-6 shadow-velvet md:p-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16 xl:p-14">
        <Reveal className="lg:translate-y-6">
          <img src={image} alt="Chambray button-down product fixture" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </Reveal>

        <Reveal className="max-w-2xl" delay={120}>
          <p className="text-xs font-semibold uppercase tracking-luxe text-stone">About HYD VNTG</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] text-ink">
            Curated men&apos;s thrift and streetwear collection.
          </h2>
          <p className="mt-6 text-base leading-8 text-stone">{aboutCopy}</p>

          <div className="mt-8 grid gap-4 border-y border-white/8 py-8 text-sm text-stone md:grid-cols-2">
            <div>
              <p className="font-display text-3xl font-black uppercase text-ink">Local</p>
              <p className="mt-2 leading-7">Hyderabad based with direct WhatsApp support on every order.</p>
            </div>
            <div>
              <p className="font-display text-3xl font-black uppercase text-ink">Limited</p>
              <p className="mt-2 leading-7">Only one piece goes live by default unless the admin restocks it.</p>
            </div>
          </div>

          <WhatsAppAction
            whatsappNumber={whatsappNumber}
            message="Hi, I want recommendations from the current HYD VNTG drop."
            className="button-primary mt-8 gap-2"
            disabledChildren={<>WhatsApp not configured <ArrowRight size={15} strokeWidth={1.7} /></>}
          >
            Ask About Pieces
            <ArrowRight size={15} strokeWidth={1.7} />
          </WhatsAppAction>
        </Reveal>
      </div>
    </section>
  );
}
