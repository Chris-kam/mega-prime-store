import React, { useState, useEffect } from 'react';
import { X, Star, Truck, ShieldCheck, ArrowRight, ShoppingBag, Ruler, Scissors, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../data/states';
import { getProductImageItem } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectFullDetail: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onSelectFullDetail,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product]);

  if (!isOpen || !product) return null;

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-[5px] border border-[#FFE4EC] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-[#FFE4EC] text-[#2D2430] hover:text-[#C2185B] border border-[#FFE4EC] flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close Quick View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Image & Thumbnails */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-[#FFF5F8] border-b md:border-b-0 md:border-r border-[#FFE4EC] flex flex-col justify-between">
          <div className="relative aspect-3/4 rounded-[5px] overflow-hidden border border-[#FFE4EC] bg-white shadow-xs">
            <img
              src={currentImage.url}
              alt={currentImage.alt || product.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <span className="absolute top-2.5 left-2.5 bg-[#C2185B] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-[5px] shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            {/* Stock indicator */}
            <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#2D2430] border border-[#FFE4EC] px-2 py-0.5 rounded-[5px] font-mono text-[10px] shadow-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E75480]"></span>
              </span>
              <span>{product.stockCount ? `${product.stockCount} left in stock` : 'In Stock'}</span>
            </span>
          </div>

          {/* Thumbnail Gallery */}
          {imagesList.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-[5px] overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#C2185B] ring-1 ring-[#C2185B]'
                      : 'border-[#FFE4EC] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Direct Action */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono text-[#C2185B] font-bold tracking-wider uppercase bg-[#FFE4EC] px-2.5 py-0.5 rounded-[5px]">
                {product.category}
              </span>
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
                <span className="text-xs font-bold text-[#2D2430] ml-0.5 font-mono">
                  {product.rating}
                </span>
                <span className="text-[10px] text-[#8A7F8E] font-mono">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 id="quick-view-title" className="text-xl sm:text-2xl font-black text-[#2D2430] font-display mb-1.5 leading-snug">
              {product.name}
            </h2>

            {/* Tagline */}
            <p className="text-xs text-[#8A7F8E] leading-relaxed mb-4">
              {product.tagline || product.shortBenefit}
            </p>

            {/* Price Box */}
            <div className="bg-[#FFF5F8] border border-[#FFE4EC] p-3.5 rounded-[5px] flex items-baseline justify-between mb-4">
              <div>
                <div className="text-[10px] font-mono text-[#8A7F8E] uppercase tracking-wider">
                  Starting Price:
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#2D2430] font-mono">
                    {formatNaira(product.startingPrice)}
                  </span>
                  {product.oldPrice && product.oldPrice > product.startingPrice && (
                    <span className="text-xs text-[#8A7F8E] line-through font-mono">
                      {formatNaira(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[11px] font-bold text-[#D4A373] bg-white border border-[#FFE4EC] px-2.5 py-1 rounded-[5px] font-mono">
                Pay on Delivery
              </span>
            </div>

            {/* Specs Grid */}
            {product.bulletDetails && (
              <div className="bg-[#FFF5F8]/60 border border-[#FFE4EC] rounded-[5px] p-3 text-xs space-y-1.5 mb-4 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8A7F8E]">Fabric:</span>
                  <span className="text-[#2D2430] font-medium text-right">{product.bulletDetails.fabric.split('(')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7F8E]">Silhouette:</span>
                  <span className="text-[#2D2430] font-medium text-right">{product.bulletDetails.fit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7F8E]">Available Sizes:</span>
                  <span className="text-[#C2185B] font-bold text-right">{product.bulletDetails.sizes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7F8E]">Delivery:</span>
                  <span className="text-[#2D2430] font-medium text-right">100% Free Nationwide</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2 border-t border-[#FFE4EC]">
            <button
              onClick={() => {
                onClose();
                onSelectFullDetail(product.slug);
              }}
              className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-xs py-3 px-4 rounded-[5px] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SELECT SIZE &amp; ORDER NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectFullDetail(product.slug);
              }}
              className="w-full bg-white hover:bg-[#FFE4EC]/50 text-[#2D2430] hover:text-[#C2185B] border border-[#FFE4EC] font-bold text-xs py-2.5 px-4 rounded-[5px] transition-all flex items-center justify-center gap-1.5"
            >
              <span>View Full Sizing Guide &amp; Reviews</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

