import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Heart,
  Truck,
  ShieldCheck,
  Flame,
  Tag,
  Crown,
  Ruler,
} from 'lucide-react';
import { CATEGORIES, deduplicateProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Pagination, PRODUCTS_PER_PAGE } from '../components/Pagination';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (slug: string) => void;
  navigate: (path: string) => void;
  onOpenPipelineModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  navigate,
  onOpenPipelineModal,
}) => {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 3 Hero Banners requested by the user
  const heroBanners = [
    {
      id: 'new-season',
      badge: 'NEW SEASON 2026',
      badgeColor: '#E75480',
      title: 'Contemporary Silhouettes & Ethereal Drapes.',
      subtitle:
        'Discover our signature Blush & Bloom edit—where liquid satins, airy georgette chiffons, and breathable European linens meet everyday Nigerian luxury.',
      ctaText: 'EXPLORE NEW SEASON',
      categoryTarget: 'Dresses',
      bgGradient: 'from-[#FFF5F8] via-[#FFE4EC]/40 to-white',
      accentTag: 'Trending Silhouettes',
    },
    {
      id: 'weekend-sale',
      badge: 'WEEKEND FLASH SALE',
      badgeColor: '#C2185B',
      title: 'Up to 35% Off Curated Best Sellers.',
      subtitle:
        'Limited weekend inventory with pre-applied discounts on matching co-ords, sculpted jumpsuits, and luxury bags. Free nationwide delivery on every piece.',
      ctaText: 'SHOP THE WEEKEND SALE',
      categoryTarget: 'Co-ord Sets',
      bgGradient: 'from-[#FFE4EC] via-[#FFF5F8] to-white',
      accentTag: 'Save up to ₦28,000 on Bundles',
    },
    {
      id: 'owambe-bridal',
      badge: 'OWAMBE & BRIDAL EDIT',
      badgeColor: '#D4A373',
      title: 'Handcrafted Ankara & Regal Occasionwear.',
      subtitle:
        'From high-society wedding guest gowns to bridal morning silk slips and 18K anti-tarnish jewelry. Turn heads with majestic African craftsmanship.',
      ctaText: 'DISCOVER OWAMBE LOOKS',
      categoryTarget: 'Ankara & African Prints',
      bgGradient: 'from-[#FFF5F8] via-[#FFF0E6]/50 to-white',
      accentTag: 'Royal African Heritage',
    },
  ];

  const currentBanner = heroBanners[activeBannerIndex];

  const uniqueProducts = deduplicateProducts(products);

  const filteredProducts =
    activeCategory === 'All Products'
      ? uniqueProducts
      : uniqueProducts.filter((p) => p.category === activeCategory);

  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const catalogGridRef = useRef<HTMLDivElement>(null);

  const totalHomeItems = filteredProducts.length;
  const totalHomePages = Math.max(1, Math.ceil(totalHomeItems / PRODUCTS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalHomePages && totalHomePages > 0) {
      setCurrentPage(1);
    }
  }, [totalHomePages, currentPage]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedHomeProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const startHomeItem = totalHomeItems === 0 ? 0 : startIndex + 1;
  const endHomeItem = Math.min(startIndex + PRODUCTS_PER_PAGE, totalHomeItems);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setIsTransitioning(true);
    setCurrentPage(newPage);
    if (catalogGridRef.current) {
      const topOffset = catalogGridRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth',
      });
    }
    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  };

  const homeFaqs = [
    {
      q: 'Do I need to create an account or password to buy?',
      a: 'No! Blush & Bloom operates on a direct-response purchase model. Simply choose your dress or piece, select your package, enter your delivery address, and submit. No passwords, no login verification codes.',
    },
    {
      q: 'Is Pay on Delivery available in my state?',
      a: 'Yes, Pay on Delivery is available across all 36 states and the FCT. Once you submit your order, our dispatch team calls to confirm your street address, and you pay when the parcel arrives at your gate via POS or instant bank transfer.',
    },
    {
      q: 'How do I know the clothes will fit my body properly?',
      a: 'All our pieces use standard UK sizing (UK 6 to 20) tailored with generous allowances for Nigerian hips and curves. Each product page has exact fabric stretch details and sizing notes. Plus, we offer a 7-day hassle-free sizing exchange guarantee!',
    },
    {
      q: 'Is delivery really 100% free nationwide?',
      a: 'Yes, 100% free delivery anywhere in Nigeria. We do not add surprise courier waybill fees or logistics surcharges at checkout.',
    },
    {
      q: 'How quickly will my order arrive?',
      a: 'Lagos State orders arrive within 24 to 48 hours. Deliveries to Abuja, Port Harcourt, Ibadan, and other key cities arrive in 2 to 3 business days. All other states arrive within 2 to 4 business days.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430]">
      {/* 3 Interactive Hero Banners Carousel / Tab Selector */}
      <section className={`relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 border-b border-[#FFE4EC] bg-gradient-to-b ${currentBanner.bgGradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Banner Tabs Selector */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 overflow-x-auto pb-2">
            {heroBanners.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => setActiveBannerIndex(idx)}
                className={`px-3 py-1.5 rounded-[5px] text-[11px] sm:text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  activeBannerIndex === idx
                    ? 'bg-[#2D2430] text-white shadow-sm'
                    : 'bg-white/80 text-[#8A7F8E] hover:text-[#2D2430] border border-[#FFE4EC]'
                }`}
              >
                <span>{b.badge}</span>
                {activeBannerIndex === idx && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E75480] inline-block" />
                )}
              </button>
            ))}
          </div>

          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[5px] bg-[#FFE4EC] border border-[#E75480]/30 text-[#C2185B] text-xs font-mono mb-5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E75480]"></span>
            </span>
            <span className="font-bold">{currentBanner.badge}</span>
            <span className="text-[#E75480]/40">•</span>
            <span className="text-[#2D2430]">{currentBanner.accentTag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2D2430] tracking-tight max-w-4xl mx-auto leading-[1.1] mb-5 font-display">
            {currentBanner.title}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-lg text-[#8A7F8E] max-w-2xl mx-auto leading-relaxed mb-8">
            {currentBanner.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
            <a
              href="#products-section"
              onClick={() => {
                if (currentBanner.categoryTarget) {
                  setActiveCategory(currentBanner.categoryTarget);
                }
              }}
              className="w-full sm:w-auto bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-sm sm:text-base py-3.5 px-8 rounded-[5px] shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 font-mono"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{currentBanner.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenPipelineModal}
              className="w-full sm:w-auto bg-white hover:bg-[#FFE4EC]/50 text-[#C2185B] font-bold text-xs sm:text-sm py-3.5 px-6 rounded-[5px] border border-[#E75480]/30 transition-all flex items-center justify-center gap-2 font-mono"
            >
              <Sparkles className="w-4 h-4 text-[#E75480]" />
              <span>AI CONTENT ENGINE</span>
            </button>
          </div>

          {/* 4 Trust stats for Fashion Store */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-[#FFE4EC] text-left">
            <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#C2185B] font-mono font-bold text-base sm:text-lg">
                <Truck className="w-4 h-4 text-[#E75480]" />
                <span>100% Free</span>
              </div>
              <div className="text-xs text-[#8A7F8E] font-medium">Nationwide Delivery Across Nigeria</div>
            </div>

            <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#D4A373] font-mono font-bold text-base sm:text-lg">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span>Pay on Delivery</span>
              </div>
              <div className="text-xs text-[#8A7F8E] font-medium">Inspect Before You Pay</div>
            </div>

            <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#C2185B] font-mono font-bold text-base sm:text-lg">
                <Ruler className="w-4 h-4 text-[#E75480]" />
                <span>UK 6 to 20</span>
              </div>
              <div className="text-xs text-[#8A7F8E] font-medium">Designed for Nigerian Curves</div>
            </div>

            <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#D4A373] font-mono font-bold text-base sm:text-lg">
                <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                <span>7-Day Sizing Guarantee</span>
              </div>
              <div className="text-xs text-[#8A7F8E] font-medium">Hassle-Free Sizing Exchange</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="products-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated 40-Piece Fashion Collection</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#2D2430] tracking-tight font-display">
              Shop Blush &amp; Bloom Looks
            </h2>
            <p className="text-xs sm:text-sm text-[#8A7F8E] mt-1">
              Select any design to view detailed fabric composition, styling ideas, and size guides.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8A7F8E]">
            <span>Showing:</span>
            <span className="font-bold text-[#2D2430] bg-white border border-[#FFE4EC] px-2.5 py-1 rounded-[5px]">
              {startHomeItem} to {endHomeItem} of {totalHomeItems} Styles
            </span>
          </div>
        </div>

        {/* 11 Categories Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All Products'
                ? uniqueProducts.length
                : uniqueProducts.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-2 rounded-[5px] text-xs font-mono font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#C2185B] text-white shadow-xs'
                    : 'bg-white hover:bg-[#FFE4EC]/50 text-[#2D2430] border border-[#FFE4EC]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white text-[#C2185B]' : 'bg-[#FFE4EC] text-[#8A7F8E]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid with Anchor Ref */}
        <div ref={catalogGridRef} className="scroll-mt-24">
          {totalHomeItems > 0 ? (
            <div>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${
                  isTransitioning ? 'opacity-40 pointer-events-none' : 'opacity-100'
                }`}
              >
                {isTransitioning
                  ? Array.from({ length: Math.min(12, paginatedHomeProducts.length || 12) }).map(
                      (_, idx) => <ProductCardSkeleton key={`home-skeleton-${idx}`} />
                    )
                  : paginatedHomeProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={(slug) => onSelectProduct(slug)}
                      />
                    ))}
              </div>

              {/* Centered Pagination Bar below Grid */}
              <Pagination
                currentPage={currentPage}
                totalItems={totalHomeItems}
                pageSize={PRODUCTS_PER_PAGE}
                onPageChange={handlePageChange}
                showSummary={true}
              />
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[#FFE4EC] rounded-[5px] p-8">
              <ShoppingBag className="w-12 h-12 text-[#E75480] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-[#2D2430]">No items found in this category</h3>
              <p className="text-xs text-[#8A7F8E] mt-1 mb-4">
                Try selecting another category or resetting the filter.
              </p>
              <button
                onClick={() => handleCategorySelect('All Products')}
                className="bg-[#E75480] text-white text-xs font-mono font-bold px-4 py-2 rounded-[5px]"
              >
                View All 40 Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Brand Story: Blush & Bloom */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#FFE4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] text-xs font-mono font-bold">
                <Crown className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>ABOUT BLUSH &amp; BLOOM</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-[#2D2430] font-display tracking-tight leading-tight">
                Designed for the Modern Woman.{' '}
                <span className="text-[#C2185B]">Crafted for Nigerian Elegance.</span>
              </h2>

              <p className="text-sm text-[#8A7F8E] leading-relaxed">
                Blush &amp; Bloom by Megaprime is a contemporary Nigerian fashion house built on a
                simple principle: you shouldn’t have to compromise between breathable comfort,
                flattering curves, and show-stopping elegance.
              </p>

              <p className="text-sm text-[#8A7F8E] leading-relaxed">
                From our liquid satin wraps engineered for humid evenings to 100% authentic African
                wax prints contoured with architectural peplums, every silhouette in our 40-piece
                catalogue is designed to empower you through boardrooms, church services, and
                high-society Owambes.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-[#FFE4EC] p-3 rounded-[5px] bg-[#FFF5F8]">
                  <div className="font-mono font-bold text-[#C2185B] text-sm">Zero Account Hassle</div>
                  <div className="text-xs text-[#8A7F8E]">Order directly in under 60 seconds</div>
                </div>
                <div className="border border-[#FFE4EC] p-3 rounded-[5px] bg-[#FFF5F8]">
                  <div className="font-mono font-bold text-[#D4A373] text-sm">36 States Reach</div>
                  <div className="text-xs text-[#8A7F8E]">Doorstep courier dispatch nationwide</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-3/4 rounded-[5px] overflow-hidden border border-[#FFE4EC] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
                  alt="Blush & Bloom Fashion Look"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-3/4 rounded-[5px] overflow-hidden border border-[#FFE4EC] shadow-sm mt-6">
                <img
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                  alt="Blush Satin Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Direct Ordering Works */}
      <section id="how-it-works" className="py-14 sm:py-20 bg-[#FFF5F8] border-b border-[#FFE4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Frictionless Ordering Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#2D2430] font-display mb-4">
            How Blush &amp; Bloom Direct Shopping Works
          </h2>
          <p className="text-xs sm:text-sm text-[#8A7F8E] max-w-xl mx-auto mb-12">
            No shopping carts to abandon. No passwords to remember. 3 simple steps to your new favorite outfit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white border border-[#FFE4EC] p-6 rounded-[5px] shadow-xs relative">
              <div className="text-3xl font-black font-mono text-[#FFE4EC] absolute top-4 right-4">
                01
              </div>
              <div className="w-10 h-10 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] flex items-center justify-center font-bold mb-4 font-mono">
                1
              </div>
              <h3 className="font-bold text-base text-[#2D2430] mb-2 font-display">
                Select Your Look &amp; Package
              </h3>
              <p className="text-xs text-[#8A7F8E] leading-relaxed">
                Browse our 40 curated fashion designs. Choose 1 piece or pick our discounted multi-piece bundles to save up to ₦28,000.
              </p>
            </div>

            <div className="bg-white border border-[#FFE4EC] p-6 rounded-[5px] shadow-xs relative">
              <div className="text-3xl font-black font-mono text-[#FFE4EC] absolute top-4 right-4">
                02
              </div>
              <div className="w-10 h-10 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] flex items-center justify-center font-bold mb-4 font-mono">
                2
              </div>
              <h3 className="font-bold text-base text-[#2D2430] mb-2 font-display">
                We Call to Confirm Sizing
              </h3>
              <p className="text-xs text-[#8A7F8E] leading-relaxed">
                After you submit your order form, our Lagos customer care desk calls or WhatsApps you to double check your measurements before courier dispatch.
              </p>
            </div>

            <div className="bg-white border border-[#FFE4EC] p-6 rounded-[5px] shadow-xs relative">
              <div className="text-3xl font-black font-mono text-[#FFE4EC] absolute top-4 right-4">
                03
              </div>
              <div className="w-10 h-10 rounded-[5px] bg-[#FFE4EC] text-[#C2185B] flex items-center justify-center font-bold mb-4 font-mono">
                3
              </div>
              <h3 className="font-bold text-base text-[#2D2430] mb-2 font-display">
                Doorstep Delivery &amp; Pay
              </h3>
              <p className="text-xs text-[#8A7F8E] leading-relaxed">
                Our logistics partner delivers straight to your doorstep across any of the 36 states. Inspect your package and pay on delivery!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <CustomerReviewsSection />

      {/* FAQs Section */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#FFE4EC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider">
              Hassle-Free Shopping
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D2430] font-display mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {homeFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="border border-[#FFE4EC] rounded-[5px] overflow-hidden bg-[#FFF5F8] transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-[#2D2430] hover:text-[#C2185B]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#C2185B] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A7F8E] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#8A7F8E] leading-relaxed border-t border-[#FFE4EC] pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/faq')}
              className="text-xs font-mono font-bold text-[#C2185B] hover:underline"
            >
              View Full Sizing &amp; Shipping Guide →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
