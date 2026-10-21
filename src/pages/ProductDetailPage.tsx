import React, { useState } from 'react';
import {
  Star,
  Truck,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Flame,
  ArrowRight,
  Package,
  Layers,
  Sparkles,
  Heart,
  Ruler,
  Camera,
  ExternalLink,
  RefreshCw,
  ShoppingBag,
  Sliders,
  Scissors,
} from 'lucide-react';
import { Product, PackageOption, OrderResult } from '../types';
import { formatNaira } from '../data/states';
import { FastOrderForm } from '../components/FastOrderForm';
import { getProductImageUrl, getProductImageItem, PRODUCTS } from '../data/products';

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

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

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="bg-white border-b border-[#FFE4EC] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-[#8A7F8E]">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button onClick={() => navigate('/')} className="hover:text-[#C2185B]">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-[#C2185B]">
              Collections
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)}
              className="hover:text-[#C2185B]"
            >
              {product.category}
            </button>
            <span>/</span>
            <span className="text-[#2D2430] font-semibold truncate max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={onOpenPipelineModal}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#C2185B] bg-[#FFF5F8] border border-[#FFE4EC] px-2.5 py-1 rounded-[5px] hover:bg-[#FFE4EC]"
          >
            <RefreshCw className="w-3 h-3 text-[#E75480]" />
            <span>Regenerate Content</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 space-y-3">
            {/* Main Stage Image */}
            <div className="relative aspect-3/4 sm:aspect-[4/5] bg-white border border-[#FFE4EC] rounded-[5px] overflow-hidden shadow-xs">
              <img
                src={
                  imageError[activeImageIndex]
                    ? 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
                    : currentImage.url
                }
                alt={currentImage.alt || product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                onError={() =>
                  setImageError((prev) => ({ ...prev, [activeImageIndex]: true }))
                }
              />

              {/* Tag / Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-white/95 backdrop-blur-md text-[#C2185B] border border-[#E75480]/30 text-xs font-mono font-bold px-3 py-1 rounded-[5px] shadow-sm">
                  {product.tag || product.category}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-[#C2185B] text-white text-xs font-mono font-bold px-2.5 py-1 rounded-[5px] shadow-sm">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Stock Count Pill */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#2D2430] border border-[#FFE4EC] px-2.5 py-1 rounded-[5px] text-[11px] font-mono shadow-xs flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E75480]"></span>
                </span>
                <span>{product.stockCount} units left</span>
              </div>

              {/* Required Photographer Licensing Credit */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md text-white/95 px-3 py-1.5 rounded-[5px] text-[11px] font-mono flex items-center justify-between">
                <div className="flex items-center gap-1.5 truncate">
                  <Camera className="w-3.5 h-3.5 text-[#E75480] shrink-0" />
                  <span className="truncate">
                    Photo by{' '}
                    <strong className="text-white">{currentImage.photographer}</strong> on{' '}
                    {currentImage.source}
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
                        ? 'border-[#C2185B] shadow-sm'
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
              <div className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] p-4 flex items-baseline justify-between gap-4">
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
                    <span>Free Delivery Nationwide</span>
                  </span>
                  <div className="text-[11px] text-[#D4A373] font-mono mt-1 font-bold">
                    ✓ Pay on Delivery Available
                  </div>
                </div>
              </div>
            </div>

            {/* 60-90 Word Warm Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2430]">
                About This Look
              </h3>
              <p className="text-xs sm:text-sm text-[#2D2430]/90 leading-relaxed bg-white border border-[#FFE4EC] p-4 rounded-[5px]">
                {product.description[0]}
              </p>
            </div>

            {/* Bullet Details (Fabric, Fit, Length, Care, Sizes, Colors) */}
            {product.bulletDetails && (
              <div className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2185B] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Garment Specifications &amp; Care</span>
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <dt className="text-[#8A7F8E] font-mono font-semibold">Fabric &amp; Feel:</dt>
                    <dd className="text-[#2D2430] font-medium">{product.bulletDetails.fabric}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8A7F8E] font-mono font-semibold">Silhouette &amp; Fit:</dt>
                    <dd className="text-[#2D2430] font-medium">{product.bulletDetails.fit}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8A7F8E] font-mono font-semibold">Garment Length:</dt>
                    <dd className="text-[#2D2430] font-medium">{product.bulletDetails.length}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8A7F8E] font-mono font-semibold">Care Instructions:</dt>
                    <dd className="text-[#2D2430] font-medium">{product.bulletDetails.care}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8A7F8E] font-mono font-semibold">Available Sizes:</dt>
                    <dd className="text-[#2D2430] font-bold text-[#C2185B]">
                      {product.bulletDetails.sizes}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#8A7F8E] font-mono font-semibold">Available Colorways:</dt>
                    <dd className="text-[#2D2430] font-medium">{product.bulletDetails.colors}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Size & Fit Note */}
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

            {/* "Style It With" Suggestion Naming 2 Other Products */}
            {product.styleItWith && product.styleItWith.length > 0 && (
              <div className="border border-[#FFE4EC] bg-white rounded-[5px] p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#2D2430] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#E75480]" />
                  <span>Style It With (Curated Edit)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.styleItWith.map((rec, i) => {
                    const recProduct = PRODUCTS.find((p) => p.slug === rec.productSlug);
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (recProduct) onSelectProduct(recProduct.slug);
                        }}
                        className="p-2.5 bg-[#FFF5F8] border border-[#FFE4EC] hover:border-[#E75480] rounded-[5px] cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="overflow-hidden pr-2">
                          <div className="text-xs font-bold text-[#2D2430] group-hover:text-[#C2185B] truncate">
                            {rec.productName}
                          </div>
                          {rec.reason && (
                            <div className="text-[10px] text-[#8A7F8E] truncate">
                              {rec.reason}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C2185B] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick jump to order CTA */}
            <button
              onClick={scrollToOrderForm}
              className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold font-mono py-4 px-6 rounded-[5px] text-sm transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>CHOOSE PACKAGE &amp; ORDER NOW (PAY ON DELIVERY)</span>
            </button>
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

        {/* 3 Customer Reviews per product */}
        <div className="mt-16 bg-white border border-[#FFE4EC] rounded-[5px] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FFE4EC]">
            <div>
              <span className="text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider">
                Customer Feedback
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#2D2430]">
                Verified Reviews for {product.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                ))}
              </div>
              <span className="font-bold text-[#2D2430]">{product.rating}</span>
              <span className="text-xs text-[#8A7F8E]">({product.reviews.length} written)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
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
      </div>
    </div>
  );
};
