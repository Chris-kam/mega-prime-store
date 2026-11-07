import React, { useState, useEffect } from 'react';
import {
  Star,
  Truck,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart,
  Ruler,
  Camera,
  ExternalLink,
  RefreshCw,
  ShoppingBag,
  Scissors,
  CheckCircle2,
  Home,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Product, PackageOption, OrderResult } from '../types';
import { formatNaira } from '../data/states';
import { FastOrderForm } from '../components/FastOrderForm';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { getProductImageItem, PRODUCTS } from '../data/products';
import { isInWishlist, toggleWishlist } from '../services/wishlistService';

interface ProductDetailPageProps {
  product: Product;
  onOrderSuccess: (result: OrderResult) => void;
  navigate: (path: string) => void;
  onSelectProduct: (slug: string) => void;
  onOpenPipelineModal: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onOrderSuccess,
  navigate,
  onSelectProduct,
  onOpenPipelineModal,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption>(
    product.packages[1] || product.packages[0]
  );
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'sizing' | 'reviews'>('description');
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [isFavorited, setIsFavorited] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedPackage(product.packages[1] || product.packages[0]);
    setIsFavorited(isInWishlist(product.slug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.slug]);

  useEffect(() => {
    const handleWishlistChange = () => {
      setIsFavorited(isInWishlist(product.slug));
    };
    window.addEventListener('megaprime_wishlist_updated', handleWishlistChange);
    return () => window.removeEventListener('megaprime_wishlist_updated', handleWishlistChange);
  }, [product.slug]);

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form-container');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const imagesList = product.images.map((img) => getProductImageItem(img));
  const currentImage = imagesList[activeImageIndex] || imagesList[0];

  const calculateDiscount = () => {
    if (product.oldPrice && product.oldPrice > product.startingPrice) {
      return Math.round(((product.oldPrice - product.startingPrice) / product.oldPrice) * 100);
    }
    return 0;
  };

  const discountPercent = calculateDiscount();

  // Related products (same category or others, excluding current)
  const relatedProducts = PRODUCTS.filter((p) => p.slug !== product.slug && (p.category === product.category || Math.random() > 0.5)).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] pb-20">
      {/* Template Breadcrumb Bar */}
      <div className="bg-white border-b border-[#FFE4EC] py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-[#8A7F8E]">
          <ul className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <li>
              <button
                onClick={() => navigate('/')}
                className="hover:text-[#C2185B] flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </li>
            <li>
              <button onClick={() => navigate('/products')} className="hover:text-[#C2185B] transition-colors">
                Collections
              </button>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </li>
            <li>
              <button
                onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)}
                className="hover:text-[#C2185B] transition-colors"
              >
                {product.category}
              </button>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </li>
            <li className="text-[#2D2430] font-bold truncate max-w-xs">{product.name}</li>
          </ul>

          <button
            onClick={onOpenPipelineModal}
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-[#C2185B] bg-[#FFF5F8] border border-[#FFE4EC] px-2.5 py-1 rounded-[5px] hover:bg-[#FFE4EC] transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-[#E75480]" />
            <span>AI Content</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Stage Image */}
            <div className="relative aspect-3/4 sm:aspect-[4/5] bg-white border border-[#FFE4EC] rounded-[5px] overflow-hidden shadow-xs group">
              <img
                src={
                  imageError[activeImageIndex]
                    ? 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
                : currentImage.url
                }
                alt={currentImage.alt || product.name}
                className="w-full h-full object-cover object-center img-zoom-hover"
                onError={() =>
                  setImageError((prev) => ({ ...prev, [activeImageIndex]: true }))
                }
              />

              {/* Tag / Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <span className="bg-white/95 backdrop-blur-md text-[#C2185B] border border-[#E75480]/30 text-xs font-mono font-bold px-3 py-1 rounded-[5px] shadow-sm">
                  {product.tag || product.category}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-[#C2185B] text-white text-xs font-mono font-bold px-2.5 py-1 rounded-[5px] shadow-sm">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Favorite Wishlist Button */}
              <button
                onClick={() => {
                  const nowFav = toggleWishlist(product.slug);
                  setIsFavorited(nowFav);
                }}
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                  isFavorited
                    ? 'bg-[#E75480] text-white'
                    : 'bg-white/90 backdrop-blur-md text-[#2D2430] hover:bg-[#E75480] hover:text-white border border-[#FFE4EC]'
                }`}
                aria-label="Save this look"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white text-white' : ''}`} />
              </button>

              {/* Stock Count Pill */}
              <div className="absolute bottom-12 left-3 bg-white/95 backdrop-blur-md text-[#2D2430] border border-[#FFE4EC] px-2.5 py-1 rounded-[5px] text-[11px] font-mono shadow-xs flex items-center gap-1.5 z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E75480]"></span>
                </span>
                <span>{product.stockCount} units left in stock</span>
              </div>

              {/* Required Photographer Licensing Credit */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md text-white/95 px-3 py-1.5 rounded-[5px] text-[11px] font-mono flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 truncate">
                  <Camera className="w-3.5 h-3.5 text-[#E75480] shrink-0" />
                  <span className="truncate">
                    Photo by <strong className="text-white">{currentImage.photographer}</strong> on {currentImage.source}
                  </span>
                </div>
                {currentImage.sourceUrl && (
                  <a
                    href={currentImage.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4A373] hover:underline flex items-center gap-1 shrink-0 ml-2"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-[5px] overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#C2185B] shadow-sm ring-1 ring-[#C2185B]'
                        : 'border-[#FFE4EC] hover:border-[#E75480]/50 opacity-80'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || `Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-mono text-center py-0.5">
                      {idx === 0 ? 'Front' : idx === 1 ? 'Detail' : idx === 2 ? 'Lifestyle' : 'Angle'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Narrative, Details & Ordering Form Anchor */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#D4A373] text-[#D4A373]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#2D2430] ml-1 font-mono">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#8A7F8E] font-mono">
                    ({product.reviewCount} Verified Reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-[#2D2430] tracking-tight leading-tight font-display mb-2">
                {product.name}
              </h1>

              {/* Short Tagline */}
              <p className="text-sm sm:text-base font-semibold text-[#C2185B] font-display italic mb-4">
                "{product.tagline || product.headline}"
              </p>

              {/* Pricing Display */}
              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 flex items-baseline justify-between gap-4 shadow-xs">
                <div>
                  <div className="text-[10px] font-mono text-[#8A7F8E] uppercase tracking-wider">
                    Starting From:
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-[#2D2430] font-mono">
                      {formatNaira(product.startingPrice)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm sm:text-base text-[#8A7F8E] line-through font-mono">
                        {formatNaira(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-white bg-[#E75480] px-2.5 py-1 rounded-[5px]">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Nationwide Delivery</span>
                  </span>
                  <div className="text-[11px] text-[#D4A373] font-mono mt-1 font-bold">
                    ✓ Pay on Delivery Available
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Garment Highlight Preview */}
            {product.bulletDetails && (
              <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-[#FFE4EC] pb-2">
                  <span className="text-[#8A7F8E] font-semibold">Fabric &amp; Feel:</span>
                  <span className="text-[#2D2430] font-bold text-right">{product.bulletDetails.fabric.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#FFE4EC] pb-2">
                  <span className="text-[#8A7F8E] font-semibold">Silhouette &amp; Fit:</span>
                  <span className="text-[#2D2430] font-medium text-right">{product.bulletDetails.fit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8A7F8E] font-semibold">Available Sizes:</span>
                  <span className="text-[#C2185B] font-bold text-right">{product.bulletDetails.sizes}</span>
                </div>
              </div>
            )}

            {/* Size & Fit Advisor Banner */}
            {product.sizeAndFitNote && (
              <div className="bg-[#FFF5F8] border border-[#E75480]/30 rounded-[5px] p-3.5 flex items-start gap-3">
                <Ruler className="w-4 h-4 text-[#C2185B] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#C2185B] font-mono uppercase block mb-0.5">
                    Size &amp; Fit Advisor:
                  </span>
                  <span className="text-[#2D2430]">{product.sizeAndFitNote}</span>
                </div>
              </div>
            )}

            {/* Quick Jump CTA */}
            <button
              onClick={scrollToOrderForm}
              className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold font-mono py-4 px-6 rounded-[5px] text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>CHOOSE PACKAGE &amp; ORDER NOW (PAY ON DELIVERY)</span>
            </button>
          </div>
        </div>

        {/* Template Interactive Tabs Section */}
        <div className="mt-12 bg-white border border-[#FFE4EC] rounded-[5px] overflow-hidden shadow-xs">
          {/* Tab Navigation Header */}
          <div className="flex items-center border-b border-[#FFE4EC] overflow-x-auto scrollbar-none bg-[#FFF5F8]">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-5 sm:px-8 py-3.5 text-xs sm:text-sm font-bold font-mono whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'description'
                  ? 'border-[#C2185B] text-[#C2185B] bg-white'
                  : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
              }`}
            >
              Description &amp; Styling
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 sm:px-8 py-3.5 text-xs sm:text-sm font-bold font-mono whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#C2185B] text-[#C2185B] bg-white'
                  : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
              }`}
            >
              Garment Specifications
            </button>
            <button
              onClick={() => setActiveTab('sizing')}
              className={`px-5 sm:px-8 py-3.5 text-xs sm:text-sm font-bold font-mono whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'sizing'
                  ? 'border-[#C2185B] text-[#C2185B] bg-white'
                  : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
              }`}
            >
              UK Sizing Chart
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 sm:px-8 py-3.5 text-xs sm:text-sm font-bold font-mono whitespace-nowrap transition-all border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#C2185B] text-[#C2185B] bg-white'
                  : 'border-transparent text-[#8A7F8E] hover:text-[#2D2430]'
              }`}
            >
              Verified Reviews ({product.reviews.length})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 sm:p-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-bold text-base sm:text-lg text-[#2D2430] font-display">
                  About {product.name}
                </h3>
                <p className="text-sm text-[#2D2430]/90 leading-relaxed">
                  {product.description[0]}
                </p>
                {product.description[1] && (
                  <p className="text-sm text-[#2D2430]/90 leading-relaxed">
                    {product.description[1]}
                  </p>
                )}
                {product.styleItWith && product.styleItWith.length > 0 && (
                  <div className="pt-4 border-t border-[#FFE4EC]">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2185B] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Curated Pairing Recommendations</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.styleItWith.map((rec, i) => {
                        const recProduct = PRODUCTS.find((p) => p.slug === rec.productSlug);
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              if (recProduct) onSelectProduct(recProduct.slug);
                            }}
                            className="p-3 bg-[#FFF5F8] border border-[#FFE4EC] hover:border-[#E75480] rounded-[5px] cursor-pointer transition-all flex items-center justify-between group"
                          >
                            <div className="overflow-hidden pr-2">
                              <div className="text-xs font-bold text-[#2D2430] group-hover:text-[#C2185B] truncate">
                                {rec.productName}
                              </div>
                              {rec.reason && (
                                <div className="text-[11px] text-[#8A7F8E] truncate">
                                  {rec.reason}
                                </div>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#C2185B] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && product.bulletDetails && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-bold text-base sm:text-lg text-[#2D2430] font-display flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#C2185B]" />
                  <span>Garment Craftsmanship &amp; Fabric Care</span>
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm">
                  <div className="bg-[#FFF5F8] p-3 rounded-[5px] border border-[#FFE4EC]">
                    <dt className="text-[#8A7F8E] font-mono font-semibold text-xs">Fabric &amp; Feel:</dt>
                    <dd className="text-[#2D2430] font-medium mt-0.5">{product.bulletDetails.fabric}</dd>
                  </div>
                  <div className="bg-[#FFF5F8] p-3 rounded-[5px] border border-[#FFE4EC]">
                    <dt className="text-[#8A7F8E] font-mono font-semibold text-xs">Silhouette &amp; Cut:</dt>
                    <dd className="text-[#2D2430] font-medium mt-0.5">{product.bulletDetails.fit}</dd>
                  </div>
                  <div className="bg-[#FFF5F8] p-3 rounded-[5px] border border-[#FFE4EC]">
                    <dt className="text-[#8A7F8E] font-mono font-semibold text-xs">Garment Length:</dt>
                    <dd className="text-[#2D2430] font-medium mt-0.5">{product.bulletDetails.length}</dd>
                  </div>
                  <div className="bg-[#FFF5F8] p-3 rounded-[5px] border border-[#FFE4EC]">
                    <dt className="text-[#8A7F8E] font-mono font-semibold text-xs">Care &amp; Washing:</dt>
                    <dd className="text-[#2D2430] font-medium mt-0.5">{product.bulletDetails.care}</dd>
                  </div>
                  <div className="bg-[#FFF5F8] p-3 rounded-[5px] border border-[#FFE4EC]">
                    <dt className="text-[#8A7F8E] font-mono font-semibold text-xs">Size Range:</dt>
                    <dd className="text-[#C2185B] font-bold mt-0.5">{product.bulletDetails.sizes}</dd>
                  </div>
                  <div className="bg-[#FFF5F8] p-3 rounded-[5px] border border-[#FFE4EC]">
                    <dt className="text-[#8A7F8E] font-mono font-semibold text-xs">Available Colors:</dt>
                    <dd className="text-[#2D2430] font-medium mt-0.5">{product.bulletDetails.colors}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Sizing Chart Tab */}
            {activeTab === 'sizing' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-bold text-base sm:text-lg text-[#2D2430] font-display flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#C2185B]" />
                  <span>Standard UK Sizing Chart (Inches &amp; Centimeters)</span>
                </h3>
                <p className="text-xs text-[#8A7F8E]">
                  Tailored with generous curves allowance. If you fall between sizes, we recommend selecting your larger size or speaking with our dispatch team when they call to confirm.
                </p>
                <div className="overflow-x-auto border border-[#FFE4EC] rounded-[5px]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#FFF5F8] border-b border-[#FFE4EC] text-[#2D2430]">
                      <tr>
                        <th className="p-2.5">UK Size</th>
                        <th className="p-2.5">Bust (Inches / cm)</th>
                        <th className="p-2.5">Waist (Inches / cm)</th>
                        <th className="p-2.5">Hips (Inches / cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#FFE4EC]">
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 8 (Small)</td>
                        <td className="p-2.5">32–33" (82–85 cm)</td>
                        <td className="p-2.5">25–26" (64–67 cm)</td>
                        <td className="p-2.5">35–36" (89–92 cm)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 10 (Medium)</td>
                        <td className="p-2.5">34–35" (86–89 cm)</td>
                        <td className="p-2.5">27–28" (68–72 cm)</td>
                        <td className="p-2.5">37–38" (93–97 cm)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 12 (Large)</td>
                        <td className="p-2.5">36–37" (90–94 cm)</td>
                        <td className="p-2.5">29–30" (73–77 cm)</td>
                        <td className="p-2.5">39–40" (98–102 cm)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 14 (XL)</td>
                        <td className="p-2.5">38–39" (95–100 cm)</td>
                        <td className="p-2.5">31–32" (78–82 cm)</td>
                        <td className="p-2.5">41–42" (103–108 cm)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 16 (2XL)</td>
                        <td className="p-2.5">40–42" (101–107 cm)</td>
                        <td className="p-2.5">33–35" (83–89 cm)</td>
                        <td className="p-2.5">43–45" (109–115 cm)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 18 (3XL)</td>
                        <td className="p-2.5">43–45" (108–114 cm)</td>
                        <td className="p-2.5">36–38" (90–97 cm)</td>
                        <td className="p-2.5">46–48" (116–122 cm)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#C2185B]">UK 20 (4XL)</td>
                        <td className="p-2.5">46–48" (115–122 cm)</td>
                        <td className="p-2.5">39–41" (98–105 cm)</td>
                        <td className="p-2.5">49–51" (123–130 cm)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#FFE4EC] pb-4">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#2D2430] font-display">
                      Customer Reviews for {product.name}
                    </h3>
                    <p className="text-xs text-[#8A7F8E]">
                      Real experiences from verified clients across Nigeria.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 font-mono">
                    <Star className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                    <span className="font-bold text-[#2D2430] text-sm">{product.rating}</span>
                    <span className="text-xs text-[#8A7F8E]">({product.reviews.length})</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-[#FFF5F8] border border-[#FFE4EC] p-5 rounded-[5px] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(rev.rating)
                                    ? 'fill-[#D4A373] text-[#D4A373]'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-[#8A7F8E]">{rev.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#2D2430] mb-1 font-display">
                          "{rev.title}"
                        </h4>
                        <p className="text-xs text-[#8A7F8E] leading-relaxed mb-4">
                          {rev.comment}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#FFE4EC] flex items-center justify-between text-xs">
                        <span className="font-bold text-[#2D2430]">{rev.author}</span>
                        <span className="text-[11px] font-mono text-[#C2185B]">{rev.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Package Selector & Fast Order Form */}
        <div id="order-form-container" className="pt-14 sm:pt-20">
          <FastOrderForm
            product={product}
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
            onOrderSuccess={onOrderSuccess}
            navigate={navigate}
          />
        </div>

        {/* More Styles You'll Love (Related looks) */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#FFE4EC]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider block mb-1">
                  Complete Your Wardrobe
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#2D2430]">
                  More Styles You May Love
                </h3>
              </div>
              <button
                onClick={() => navigate('/products')}
                className="text-xs font-mono font-bold text-[#C2185B] hover:text-[#E75480] flex items-center gap-1 btn-text-animated"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onSelect={(slug) => onSelectProduct(slug)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onSelectFullDetail={(slug) => {
          setQuickViewProduct(null);
          onSelectProduct(slug);
        }}
      />
    </div>
  );
};
