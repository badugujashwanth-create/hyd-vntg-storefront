import { seedProducts } from '../data/catalog';
import { hasSupabase, supabase } from './supabase';

const PRODUCTS_KEY = 'hyd-vntg-products';
const SESSION_KEY = 'hyd-vntg-admin-session';
const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@hydvntg.in';
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'hydvntg123';

function hasWindow() {
  return typeof window !== 'undefined';
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeProduct(product, index = 0) {
  const price = Number(product.price) || 0;
  const stock = Math.max(0, Number(product.stock) || 0);
  const createdAt = product.createdAt || product.created_at || new Date().toISOString();

  return {
    id: product.id || `${slugify(product.name || 'piece')}-${index}`,
    name: product.name?.trim() || 'Untitled Piece',
    price,
    image: product.image?.trim() || seedProducts[0].image,
    stock,
    category: product.category?.trim() || 'Streetwear Fits',
    accent: product.accent?.trim() || 'Handpicked for the current Hyderabad rotation.',
    createdAt,
  };
}

function sortProducts(products) {
  return [...products].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

function readLocalProducts() {
  const seeded = sortProducts(seedProducts.map(normalizeProduct));

  if (!hasWindow()) {
    return seeded;
  }

  const raw = window.localStorage.getItem(PRODUCTS_KEY);

  if (!raw) {
    window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    const normalized = sortProducts(parsed.map(normalizeProduct));
    return normalized.length ? normalized : seeded;
  } catch {
    window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function writeLocalProducts(products) {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(sortProducts(products.map(normalizeProduct))),
  );
}

function saveLocalProduct(draft) {
  const current = readLocalProducts();
  const product = normalizeProduct({
    ...draft,
    id: draft.id || crypto.randomUUID(),
    createdAt: draft.createdAt || new Date().toISOString(),
  });

  const next = current.some((entry) => entry.id === product.id)
    ? current.map((entry) => (entry.id === product.id ? product : entry))
    : [product, ...current];

  writeLocalProducts(next);
  return product;
}

export function isSoldOut(stock) {
  return Number(stock) <= 0;
}

export function getStockLabel(stock) {
  if (Number(stock) <= 0) {
    return 'Sold Out';
  }

  if (Number(stock) === 1) {
    return 'Only 1 left';
  }

  return `${stock} left`;
}

export async function loadProducts() {
  if (hasSupabase) {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, image, stock, category, accent, created_at')
      .order('created_at', { ascending: false });

    if (!error) {
      return {
        products: data.map((entry, index) => normalizeProduct(entry, index)),
        mode: 'supabase',
      };
    }

    return {
      products: readLocalProducts(),
      mode: 'local',
      note: 'Supabase inventory is unavailable. Using local inventory.',
    };
  }

  return {
    products: readLocalProducts(),
    mode: 'local',
  };
}

export async function getAdminSession() {
  if (hasSupabase) {
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
      return {
        email: data.session.user.email,
        mode: 'supabase',
      };
    }
  }

  if (!hasWindow()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function loginAdmin({ email, password }) {
  if (hasSupabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    return {
      email: data.user.email,
      mode: 'supabase',
    };
  }

  if (email !== DEFAULT_ADMIN_EMAIL || password !== DEFAULT_ADMIN_PASSWORD) {
    throw new Error('Invalid admin credentials.');
  }

  const session = { email, mode: 'local' };

  if (hasWindow()) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export async function logoutAdmin() {
  if (hasSupabase) {
    await supabase.auth.signOut();
  }

  if (hasWindow()) {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export async function upsertProduct(draft) {
  const payload = {
    id: draft.id || crypto.randomUUID(),
    name: draft.name?.trim() || 'Untitled Piece',
    price: Number(draft.price) || 0,
    image: draft.image?.trim() || seedProducts[0].image,
    stock: Math.max(0, Number(draft.stock) || 0),
    category: draft.category?.trim() || 'Streetwear Fits',
    accent:
      draft.accent?.trim() ||
      'Handpicked for the current Hyderabad rotation with no mass restock.',
    created_at: draft.createdAt || draft.created_at || new Date().toISOString(),
  };

  if (hasSupabase) {
    const query = draft.id
      ? supabase
          .from('products')
          .update(payload)
          .eq('id', draft.id)
          .select('id, name, price, image, stock, category, accent, created_at')
          .single()
      : supabase
          .from('products')
          .insert(payload)
          .select('id, name, price, image, stock, category, accent, created_at')
          .single();

    const { data, error } = await query;

    if (!error) {
      return {
        product: normalizeProduct(data),
        mode: 'supabase',
      };
    }
  }

  return {
    product: saveLocalProduct({
      ...payload,
      createdAt: payload.created_at,
    }),
    mode: 'local',
    note: hasSupabase ? 'Saved locally because Supabase write failed.' : '',
  };
}

export async function deleteProductRecord(productId) {
  if (hasSupabase) {
    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (!error) {
      return { mode: 'supabase' };
    }
  }

  const next = readLocalProducts().filter((product) => product.id !== productId);
  writeLocalProducts(next);

  return {
    mode: 'local',
    note: hasSupabase ? 'Removed locally because Supabase delete failed.' : '',
  };
}

export async function toggleProductStock(product) {
  const nextStock = Number(product.stock) > 0 ? 0 : 1;

  return upsertProduct({
    ...product,
    stock: nextStock,
    createdAt: product.createdAt,
  });
}
