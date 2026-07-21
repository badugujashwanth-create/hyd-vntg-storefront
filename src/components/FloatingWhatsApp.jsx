import { MessageCircleMore } from 'lucide-react';
import WhatsAppAction from './WhatsAppAction';

export default function FloatingWhatsApp({ whatsappNumber }) {
  return (
    <WhatsAppAction
      whatsappNumber={whatsappNumber}
      message="Hi, I want to order from the current HYD VNTG collection."
      ariaLabel="Order via WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 border border-[#25D366]/40 bg-[rgba(2,3,4,0.92)] px-4 py-3 text-[#8fe6af] shadow-float transition duration-300 hover:-translate-y-1 hover:bg-[#25D366]/[0.08]"
      disabledChildren={<><MessageCircleMore size={18} strokeWidth={2} /><span className="hidden text-[11px] font-extrabold uppercase tracking-[0.28em] sm:inline">WhatsApp unavailable</span></>}
    >
      <MessageCircleMore size={18} strokeWidth={2} />
      <span className="hidden text-[11px] font-extrabold uppercase tracking-[0.28em] sm:inline">
        Order via WhatsApp
      </span>
    </WhatsAppAction>
  );
}
