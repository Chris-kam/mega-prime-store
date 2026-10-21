import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrustBar } from './components/TrustBar';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { RecentOrderPopup } from './components/RecentOrderPopup';
import { ContentPipelineModal } from './components/ContentPipelineModal';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { getStoredCatalog } from './services/contentPipeline';
import { OrderResult, Product } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined'
      ? (window.location.pathname + window.location.search) || '/'
      : '/';
  });

  // State holding the active 40 fashion products (cached or default)
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(() => {
    return getStoredCatalog();
  });

  const [pipelineModalOpen, setPipelineModalOpen] = useState(false);

  const [lastOrderResult, setLastOrderResult] = useState<OrderResult | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('megaprime_last_order');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore parse errors
      }
    }
    return null;
  });

  // Listen for browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(
        (window.location.pathname + window.location.search) || '/'
      );
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom client-side router
  const navigate = (path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.replace('/#', '');
      const currentPathname = currentPath.split('?')[0];
      if (currentPathname !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (result: OrderResult) => {
    setLastOrderResult(result);
    try {
      sessionStorage.setItem('megaprime_last_order', JSON.stringify(result));
    } catch {
      // ignore
    }
    navigate('/thank-you');
  };

  const currentPathname = currentPath.split('?')[0];

  // Synchronize document title
  useEffect(() => {
    if (currentPathname.startsWith('/products/')) {
      const slug = currentPathname.replace('/products/', '').split('/')[0];
      const product = catalogProducts.find((p) => p.slug === slug);
      if (product) {
        document.title = `${product.name} — Blush & Bloom by Megaprime`;
        return;
      }
    }
    if (currentPathname === '/products') {
      const searchPart = currentPath.includes('?') ? currentPath.slice(currentPath.indexOf('?')) : '';
      const params = new URLSearchParams(searchPart);
      const cat = params.get('category');
      if (cat) {
        document.title = `${cat} Collection — Blush & Bloom by Megaprime`;
        return;
      }
      document.title = 'All Fashion Collections — Blush & Bloom by Megaprime';
      return;
    }
    if (currentPathname === '/thank-you') {
      document.title = 'Order Received — Blush & Bloom by Megaprime';
      return;
    }
    if (currentPathname === '/contact') {
      document.title = 'Fashion Concierge & Support — Blush & Bloom by Megaprime';
      return;
    }
    if (currentPathname === '/faq' || currentPathname === '/help') {
      document.title = 'Sizing Guide & FAQs — Blush & Bloom by Megaprime';
      return;
    }
    if (currentPathname === '/privacy') {
      document.title = 'Privacy Policy — Blush & Bloom by Megaprime';
      return;
    }
    if (currentPathname === '/terms') {
      document.title = 'Terms & Sizing Guarantee — Blush & Bloom by Megaprime';
      return;
    }
    document.title =
      'Blush & Bloom by Megaprime — Contemporary African & Global Fashion Store';
  }, [currentPath, currentPathname, catalogProducts]);

  // Determine current route and selected product
  const getActiveProduct = (): Product | undefined => {
    if (currentPathname.startsWith('/products/')) {
      const slug = currentPathname.replace('/products/', '').split('?')[0].split('/')[0];
      return catalogProducts.find((p) => p.slug === slug);
    }
    return undefined;
  };

  const activeProduct = getActiveProduct();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F8] text-[#2D2430]">
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        navigate={navigate}
        products={catalogProducts}
        onOpenPipelineModal={() => setPipelineModalOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentPathname === '/' && (
          <HomePage
            products={catalogProducts}
            onSelectProduct={(slug) => navigate(`/products/${slug}`)}
            navigate={navigate}
            onOpenPipelineModal={() => setPipelineModalOpen(true)}
          />
        )}

        {currentPathname === '/products' && (
          <ProductsPage
            currentPath={currentPath}
            products={catalogProducts}
            navigate={navigate}
            onSelectProduct={(slug) => navigate(`/products/${slug}`)}
            onOpenPipelineModal={() => setPipelineModalOpen(true)}
          />
        )}

        {currentPathname.startsWith('/products/') && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            onOrderSuccess={handleOrderSuccess}
            navigate={navigate}
            onSelectProduct={(slug) => navigate(`/products/${slug}`)}
            onOpenPipelineModal={() => setPipelineModalOpen(true)}
          />
        )}

        {currentPathname.startsWith('/products/') && !activeProduct && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white">
            <h2 className="text-xl font-bold font-display text-[#2D2430] mb-2">
              Fashion Piece Not Found
            </h2>
            <p className="text-xs text-[#8A7F8E] max-w-md mb-6">
              The requested style may have been archived or updated in the catalog.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-[#E75480] text-white text-xs font-mono font-bold px-5 py-2.5 rounded-[5px]"
            >
              Browse Available Looks
            </button>
          </div>
        )}

        {currentPathname === '/thank-you' && (
          <ThankYouPage orderResult={lastOrderResult} navigate={navigate} />
        )}

        {currentPathname === '/contact' && <ContactPage navigate={navigate} />}

        {(currentPathname === '/faq' || currentPathname === '/help') && (
          <FaqPage navigate={navigate} />
        )}

        {currentPathname === '/privacy' && <PrivacyPage navigate={navigate} />}

        {currentPathname === '/terms' && <TermsPage navigate={navigate} />}
      </main>

      {/* Trust & Guarantee bar above footer */}
      <TrustBar />

      {/* Footer */}
      <Footer
        navigate={navigate}
        products={catalogProducts}
        onOpenPipelineModal={() => setPipelineModalOpen(true)}
      />

      {/* Floating WhatsApp Concierge Button */}
      <WhatsAppFloatingButton />

      {/* Social Proof Recent Fashion Order Notification Popup */}
      <RecentOrderPopup />

      {/* Content Pipeline & API Key Management Modal */}
      <ContentPipelineModal
        isOpen={pipelineModalOpen}
        onClose={() => setPipelineModalOpen(false)}
        currentProductSlug={activeProduct?.slug}
        onCatalogUpdated={(newProducts) => setCatalogProducts(newProducts)}
      />
    </div>
  );
}
