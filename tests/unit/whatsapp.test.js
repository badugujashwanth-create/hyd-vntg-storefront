// @vitest-environment jsdom

import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  buildProductOrderMessage,
  buildWhatsAppLink,
  isWhatsAppConfigured,
  normalizeWhatsAppNumber,
  openWhatsAppOrder,
} from '../../src/lib/whatsapp';

const product = { name: 'Washed Black Cargo', price: 1299 };
const customer = { size: 'L', name: 'Demo Buyer', phone: '9000000000', address: 'Synthetic address' };

describe('WhatsApp handoff boundary', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  test('rejects absent and malformed destinations', () => {
    expect(normalizeWhatsAppNumber('')).toBe('');
    expect(normalizeWhatsAppNumber('12345')).toBe('');
    expect(isWhatsAppConfigured(undefined)).toBe(false);
    expect(buildWhatsAppLink('', 'hello')).toBeNull();
  });

  test('normalizes an explicitly configured international destination', () => {
    expect(normalizeWhatsAppNumber('+91 98765 43210')).toBe('919876543210');
    expect(buildWhatsAppLink('+91 98765 43210', 'hello world')).toBe(
      'https://wa.me/919876543210?text=hello%20world',
    );
  });

  test('builds a deterministic order message without sending it', () => {
    const message = buildProductOrderMessage(product, customer);
    expect(message).toContain('Product: Washed Black Cargo');
    expect(message).toContain('Size: L');
    expect(message).toContain('Name: Demo Buyer');
    expect(message).toContain('Address: Synthetic address');
    expect(window.open).not.toHaveBeenCalled();
  });

  test('opens only when the destination is valid', () => {
    expect(openWhatsAppOrder('', product, customer)).toBe(false);
    expect(window.open).not.toHaveBeenCalled();

    expect(openWhatsAppOrder('919876543210', product, customer)).toBe(true);
    expect(window.open).toHaveBeenCalledOnce();
    expect(window.open.mock.calls[0][0]).toMatch(/^https:\/\/wa\.me\/919876543210\?text=/);
  });
});
