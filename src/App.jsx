import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedDrops from './components/FeaturedDrops';
import CollectionSection from './components/CollectionSection';
import StatementBanner from './components/StatementBanner';
import SplitFeature from './components/SplitFeature';
import SiteFooter from './components/SiteFooter';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ProductModal from './components/ProductModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { aboutCopy, brand, featuredDropIds, heroImage, navigation, seedProducts } from './data/catalog';
import {
  deleteProductRecord,
  getAdminAccessMode,
  getAdminSession,
  loadProducts,
  loginAdmin,
  logoutAdmin,
  toggleProductStock,
  upsertProduct,
} from './lib/product-store';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || '';
const adminAccessMode = getAdminAccessMode();

export default function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const [products, setProducts] = useState([]);
  const [inventoryMode, setInventoryMode] = useState('local');
  const [inventoryNotice, setInventoryNotice] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [adminSession, setAdminSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [flashMessage, setFlashMessage] = useState('');
  const [busyAction, setBusyAction] = useState('');
  const [modalProduct, setModalProduct] = useState(null);

  const featuredProducts = useMemo(() => {
    const picked = featuredDropIds
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean);

    return picked.length ? picked : (products.length ? products.slice(0, 4) : seedProducts.slice(0, 4));
  }, [products]);

  useEffect(() => {
    document.title = isAdminRoute ? `${brand.name} Admin` : `${brand.name} | Hyderabad Thrift`;
  }, [isAdminRoute]);

  useEffect(() => {
    let active = true;

    async function initialize() {
      try {
        const [inventory, session] = await Promise.all([loadProducts(), getAdminSession()]);

        if (!active) {
          return;
        }

        setProducts(inventory.products);
        setInventoryMode(inventory.mode);
        setInventoryNotice(inventory.note || '');
        setAdminSession(session);
      } finally {
        if (active) {
          setLoadingProducts(false);
          setAuthLoading(false);
        }
      }
    }

    initialize();

    return () => {
      active = false;
    };
  }, []);

  async function refreshProducts() {
    const inventory = await loadProducts();
    setProducts(inventory.products);
    setInventoryMode(inventory.mode);
    setInventoryNotice(inventory.note || '');
  }

  async function handleAdminLogin(credentials) {
    setBusyAction('login');
    setAuthError('');
    setFlashMessage('');

    try {
      const session = await loginAdmin(credentials);
      setAdminSession(session);
      setFlashMessage(`Signed in as ${session.email}.`);
    } catch (error) {
      setAuthError(error.message || 'Unable to sign in.');
    } finally {
      setBusyAction('');
    }
  }

  async function handleLogout() {
    setBusyAction('logout');

    try {
      await logoutAdmin();
      setAdminSession(null);
      setFlashMessage('Admin session closed.');
    } finally {
      setBusyAction('');
    }
  }

  async function handleSaveProduct(draft) {
    setBusyAction('save');
    setFlashMessage('');

    try {
      const result = await upsertProduct(draft);
      await refreshProducts();
      setFlashMessage(
        `${draft.id ? 'Updated' : 'Added'} ${result.product.name}.${result.note ? ` ${result.note}` : ''}`,
      );
    } catch (error) {
      setFlashMessage(`Product was not saved. ${error.message || 'Unknown error.'}`);
    } finally {
      setBusyAction('');
    }
  }

  async function handleDeleteProduct(productId) {
    setBusyAction(productId);
    setFlashMessage('');

    try {
      const result = await deleteProductRecord(productId);
      await refreshProducts();
      setFlashMessage(`Deleted product.${result.note ? ` ${result.note}` : ''}`);
    } catch (error) {
      setFlashMessage(`Product was not deleted. ${error.message || 'Unknown error.'}`);
    } finally {
      setBusyAction('');
    }
  }

  async function handleToggleStock(product) {
    setBusyAction(product.id);
    setFlashMessage('');

    try {
      const result = await toggleProductStock(product);
      await refreshProducts();
      setFlashMessage(
        `${result.product.name} is now ${result.product.stock > 0 ? 'in stock' : 'sold out'}.${result.note ? ` ${result.note}` : ''}`,
      );
    } catch (error) {
      setFlashMessage(`Stock was not changed. ${error.message || 'Unknown error.'}`);
    } finally {
      setBusyAction('');
    }
  }

  if (isAdminRoute) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-ivory text-ink">
        <div className="grain" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(111,123,99,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.03),_transparent_22%)]" />

        {authLoading ? (
          <div className="section-shell flex min-h-screen items-center justify-center py-24">
            <div className="panel-surface w-full max-w-xl px-8 py-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone">Loading Admin</p>
              <p className="mt-4 font-display text-4xl font-black uppercase text-ink">
                Syncing inventory access.
              </p>
            </div>
          </div>
        ) : adminSession ? (
          <AdminDashboard
            products={products}
            inventoryMode={inventoryMode}
            inventoryNotice={inventoryNotice}
            flashMessage={flashMessage}
            busyAction={busyAction}
            adminEmail={adminSession.email}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onToggleStock={handleToggleStock}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin
            onSubmit={handleAdminLogin}
            submitting={busyAction === 'login'}
            error={authError}
            accessMode={adminAccessMode}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ivory text-ink">
      <div className="grain" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(111,123,99,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.03),_transparent_22%)]" />

      <Navbar navigation={navigation} whatsappNumber={whatsappNumber} />

      <main>
        <HeroSection heroImage={heroImage} whatsappNumber={whatsappNumber} />
        <FeaturedDrops products={featuredProducts} onSelectProduct={setModalProduct} />
        {loadingProducts ? (
          <section className="section-shell py-16">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="panel-surface animate-pulse overflow-hidden">
                  <div className="aspect-[4/5] bg-white/[0.06]" />
                  <div className="space-y-3 p-5">
                    <div className="h-6 w-2/3 bg-white/[0.06]" />
                    <div className="h-4 w-full bg-white/[0.05]" />
                    <div className="h-4 w-1/2 bg-white/[0.05]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <CollectionSection
            products={products}
            whatsappNumber={whatsappNumber}
            onOrderProduct={setModalProduct}
          />
        )}
        <StatementBanner />
        <SplitFeature
          aboutCopy={aboutCopy}
          image={products[5]?.image || heroImage}
          whatsappNumber={whatsappNumber}
        />
      </main>

      <SiteFooter
        instagramUrl={brand.instagramUrl}
        instagramHandle={brand.instagramHandle}
        whatsappNumber={whatsappNumber}
      />
      <FloatingWhatsApp whatsappNumber={whatsappNumber} />
      <ProductModal
        product={modalProduct}
        whatsappNumber={whatsappNumber}
        onClose={() => setModalProduct(null)}
      />
    </div>
  );
}
