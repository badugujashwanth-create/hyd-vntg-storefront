// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

async function loadStore(environment = {}) {
  vi.resetModules();
  vi.unstubAllEnvs();
  for (const [key, value] of Object.entries(environment)) vi.stubEnv(key, value);
  return import('../../src/lib/product-store');
}

describe('local catalog and admin boundary', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('fails closed and clears a forged session when admin is unconfigured', async () => {
    window.localStorage.setItem(
      'hyd-vntg-admin-session',
      JSON.stringify({ email: 'attacker@example.test', mode: 'local' }),
    );
    const store = await loadStore();

    expect(store.getAdminAccessMode()).toBe('disabled');
    await expect(store.loginAdmin({ email: 'admin@example.test', password: 'guess' })).rejects.toThrow(
      'Local admin access is disabled',
    );
    await expect(store.getAdminSession()).resolves.toBeNull();
    expect(window.localStorage.getItem('hyd-vntg-admin-session')).toBeNull();
  });

  test('recognizes only a server-assigned Supabase admin role', async () => {
    const store = await loadStore();
    expect(store.isSupabaseAdmin({ app_metadata: { role: 'admin' } })).toBe(true);
    expect(store.isSupabaseAdmin({ user_metadata: { role: 'admin' } })).toBe(false);
    expect(store.isSupabaseAdmin({ app_metadata: { role: 'customer' } })).toBe(false);
    expect(store.isSupabaseAdmin(null)).toBe(false);
  });

  test('accepts only an explicitly configured local demo identity', async () => {
    const store = await loadStore({
      VITE_ADMIN_EMAIL: 'demo-admin@example.test',
      VITE_ADMIN_PASSWORD: 'synthetic-password',
    });

    expect(store.getAdminAccessMode()).toBe('local-demo');
    await expect(store.loginAdmin({ email: 'demo-admin@example.test', password: 'wrong' })).rejects.toThrow(
      'Invalid admin credentials',
    );
    const session = await store.loginAdmin({
      email: 'demo-admin@example.test',
      password: 'synthetic-password',
    });
    expect(session).toEqual({ email: 'demo-admin@example.test', mode: 'local' });
    await expect(store.getAdminSession()).resolves.toEqual(session);
  });

  test('recovers a corrupt catalog and supports local add, stock, and delete transitions', async () => {
    window.localStorage.setItem('hyd-vntg-products', '{broken-json');
    const store = await loadStore();

    const initial = await store.loadProducts();
    expect(initial.mode).toBe('local');
    expect(initial.products).toHaveLength(6);

    const created = await store.upsertProduct({
      name: 'Synthetic Test Jacket',
      price: 1500,
      image: '/products/test-jacket.jpg',
      category: 'Jackets',
      stock: 2,
      accent: 'Synthetic test fixture.',
    });
    expect(created.product.stock).toBe(2);

    const soldOut = await store.toggleProductStock(created.product);
    expect(soldOut.product.stock).toBe(0);

    await store.deleteProductRecord(created.product.id);
    const afterDelete = await store.loadProducts();
    expect(afterDelete.products.some((product) => product.id === created.product.id)).toBe(false);
  });
});
