const indianPriceFormatter = new Intl.NumberFormat('en-IN');

export function formatPrice(price) {
  return `₹${indianPriceFormatter.format(Number(price) || 0)}`;
}

export function buildWhatsAppLink(number, message) {
  const cleanNumber = String(number).replace(/\D/g, '');
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
  const message = buildProductOrderMessage(product, customer);
  window.open(buildWhatsAppLink(number, message), '_blank', 'noopener,noreferrer');
}
