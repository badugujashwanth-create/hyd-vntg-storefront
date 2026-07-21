import { buildWhatsAppLink, isWhatsAppConfigured } from '../lib/whatsapp';

export default function WhatsAppAction({
  whatsappNumber,
  message,
  children,
  disabledChildren = 'WhatsApp unavailable',
  className = '',
  ariaLabel,
}) {
  if (!isWhatsAppConfigured(whatsappNumber)) {
    return (
      <span
        aria-label={ariaLabel}
        aria-disabled="true"
        title="WhatsApp ordering is disabled until VITE_WHATSAPP_NUMBER is configured."
        className={`${className} cursor-not-allowed opacity-60`}
      >
        {disabledChildren}
      </span>
    );
  }

  return (
    <a
      href={buildWhatsAppLink(whatsappNumber, message)}
      className={className}
      aria-label={ariaLabel}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
