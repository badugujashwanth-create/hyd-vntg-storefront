import { ArrowUpRight, Instagram, MessageCircleMore } from 'lucide-react';
import WhatsAppAction from './WhatsAppAction';

const footerLinks = [
  { label: 'Drops', href: '/#drops' },
  { label: 'Collection', href: '/#collection' },
  { label: 'About', href: '/#about' },
  { label: 'Admin', href: '/admin' },
];

export default function SiteFooter({ instagramUrl, instagramHandle, whatsappNumber }) {
  return (
    <footer className="border-t border-white/8 bg-white/[0.03]">
      <div className="section-shell flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.36em] text-stone">HYD VNTG</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone">
            Hyderabad Based Street Archive
          </p>
          <p className="mt-5 font-display text-[clamp(2.2rem,4vw,3.8rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] text-ink">
            Men&apos;s wardrobe staples with streetwear weight and thrift-store edge.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-stone">
            Customers browse on-site, place orders through WhatsApp, and inventory stays easy to
            manage through the admin dashboard.
          </p>
        </div>

        <div className="flex flex-col items-start gap-8 md:items-end">
          <div className="flex flex-wrap gap-6 text-sm text-stone">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-ink">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {instagramUrl ? (
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center border border-white/10 bg-transparent text-ink transition hover:-translate-y-0.5 hover:bg-white/[0.04]">
                <Instagram size={18} strokeWidth={1.6} />
              </a>
            ) : (
              <span aria-label="Instagram unavailable" aria-disabled="true" title="Instagram is not configured in this prototype." className="grid h-11 w-11 place-items-center border border-white/10 bg-transparent text-stone opacity-60">
                <Instagram size={18} strokeWidth={1.6} />
              </span>
            )}
            <WhatsAppAction
              whatsappNumber={whatsappNumber}
              message="Hi, I want to connect about the latest HYD VNTG pieces."
              ariaLabel="WhatsApp"
              className="grid h-11 w-11 place-items-center border border-white/10 bg-transparent text-ink transition hover:-translate-y-0.5 hover:bg-white/[0.04]"
              disabledChildren={<MessageCircleMore size={18} strokeWidth={1.6} />}
            >
              <MessageCircleMore size={18} strokeWidth={1.6} />
            </WhatsAppAction>
            <a
              href="/admin"
              aria-label="Admin dashboard"
              className="grid h-11 w-11 place-items-center border border-white/10 bg-transparent text-ink transition hover:-translate-y-0.5 hover:bg-white/[0.04]"
            >
              <ArrowUpRight size={18} strokeWidth={1.6} />
            </a>
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
            Instagram {instagramHandle}
          </p>
        </div>
      </div>
    </footer>
  );
}
