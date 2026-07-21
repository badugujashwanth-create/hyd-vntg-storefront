const indianPriceFormatter = new Intl.NumberFormat('en-IN');

export function formatPrice(price) {
  return `₹${indianPriceFormatter.format(Number(price) || 0)}`;
}

export function normalizeWhatsAppNumber(number) {
  const normalized = String(number || '').replace(/\D/g, '');
  return /^\d{10,15}$/.test(normalized) ? normalized : '';
}

export function isWhatsAppConfigured(number) {
  return Boolean(normalizeWhatsAppNumber(number));
}

export function buildWhatsAppLink(number, message) {
  const cleanNumber = normalizeWhatsAppNumber(number);
  if (!cleanNumber) return null;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function buildProductOrderMessage(product, customer) {
  return [
    'Hi, I want to order:',
    '',
    `Product: ${product.name}`,
    `Price: ${formatPrice(product.price)}`,
    `Size: ${customer.size}`,
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
  ].join('\n');
}

export function openWhatsAppOrder(number, product, customer) {
  const link = buildWhatsAppLink(number, buildProductOrderMessage(product, customer));
  if (!link) return false;
  window.open(link, '_blank', 'noopener,noreferrer');
  return true;
}
