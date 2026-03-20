import { Instagram, Menu, MessageCircleMore, Shield, X } from 'lucide-react';
import { useState } from 'react';
import { buildWhatsAppLink } from '../lib/whatsapp';

export default function Navbar({ navigation, whatsappNumber }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(11,11,11,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
        <a href="/" className="flex flex-col">
          <span className="font-display text-sm font-black uppercase tracking-[0.38em] text-ink">
            HYD VNTG
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone">
            Men&apos;s Thrift / Hyderabad, India
          </span>
        </a>

        <nav className="hidden items-center gap-10 text-sm text-stone md:flex">
          {navigation.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-ink">
              {link.label}
            </a>
          ))}
          <a href="/admin" className="transition hover:text-ink">
            Admin
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={buildWhatsAppLink(
              whatsappNumber,
              'Hi, I want to order from the current HYD VNTG collection.',
            )}
            className="hidden border border-moss/55 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c6d2bb] transition hover:-translate-y-0.5 hover:bg-moss/10 md:inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            Order via WhatsApp
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center border border-white/10 bg-transparent transition hover:-translate-y-0.5 hover:bg-white/[0.04]"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a
            href="/admin"
            aria-label="Admin"
            className="hidden h-11 w-11 place-items-center border border-white/10 bg-transparent transition hover:-translate-y-0.5 hover:bg-white/[0.04] md:grid"
          >
            <Shield size={18} strokeWidth={1.5} />
          </a>
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center border border-white/10 bg-transparent transition hover:-translate-y-0.5 hover:bg-white/[0.04] md:hidden"
          >
            {mobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/8 bg-black/45 px-6 py-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-stone">
            {navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border border-white/10 bg-transparent px-4 py-4 transition hover:border-moss/55 hover:bg-white/[0.04] hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="border border-white/10 bg-transparent px-4 py-4 transition hover:border-moss/55 hover:bg-white/[0.04] hover:text-ink"
            >
              Admin Dashboard
            </a>
            <a
              href={buildWhatsAppLink(
                whatsappNumber,
                'Hi, I want to order from the current HYD VNTG collection.',
              )}
              target="_blank"
              rel="noreferrer"
              className="button-primary mt-2 gap-2"
            >
              <MessageCircleMore size={15} strokeWidth={1.7} />
              Order via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
