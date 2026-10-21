import React, { useState } from 'react';
import { Star, Truck, Check, ArrowRight, Camera, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../data/states';
import { getProductImageUrl, getProductImageItem } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const firstPackage = product.packages[0];
  const primaryImgItem = getProductImageItem(product.images[0]);
  const primaryImgUrl = getProductImageUrl(product.images[0]);

  // Fallback pink placeholder SVG with dress icon
  const fallbackPinkPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23FFF5F8"><rect width="100%" height="100%" fill="%23FFE4EC"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="28" fill="%23C2185B">Blush &amp; Bloom</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%238A7F8E">${encodeURIComponent(product.name)}</text></svg>`;

  const calculateDiscount = () => {
    if (product.oldPrice && product.oldPrice > product.startingPrice) {
      return Math.round(((product.oldPrice - product.startingPrice) / product.oldPrice) * 100);
    }
    return 0;
  };

  const discountPercent = calculateDiscount();

  return (
    <div
      onClick={() => onSelect(product.slug)}
      className="group relative bg-white border border-[#FFE4EC] hover:border-[#E75480] rounded-[5px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col cursor-pointer"
      id={`product-card-${product.slug}`}
    >
      {/* Product Image Container with Blur Placeholder */}
      <div className="relative aspect-3/4 bg-[#FFF5F8] overflow-hidden border-b border-[#FFE4EC]">
        {/* Shimmer skeleton before loaded */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8] via-[#FFE4EC] to-[#FFF5F8] animate-pulse" />
        )}

        <img
          src={imageError ? fallbackPinkPlaceholder : primaryImgUrl}
          alt={primaryImgItem.alt || product.name}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out ${
            imageLoaded ? 'opacity-100 blur-none' : 'opacity-80 blur-xs'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="bg-white/95 backdrop-blur-md text-[#C2185B] border border-[#E75480]/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-[5px] shadow-sm">
              {product.category}
            </span>
            {discountPercent > 0 && (
              <span className="bg-[#C2185B] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-[5px] shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            {product.tag && (
              <span className="bg-[#2D2430]/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-[5px] shadow-sm">
                {product.tag}
              </span>
            )}
          </div>

          <span className="bg-[#E75480] text-white text-[10px] font-bold px-2 py-0.5 rounded-[5px] shadow-sm flex items-center gap-1 font-mono">
            <Truck className="w-2.5 h-2.5 text-white" />
            <span>FREE DELIVERY</span>
          </span>
        </div>

        {/* Stock & Photo Credit Badges at bottom of image */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-[#2D2430] border border-[#FFE4EC] px-2 py-0.5 rounded-[5px] font-mono text-[10px] shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E75480]"></span>
            </span>
            <span>{product.stockCount ? `${product.stockCount} left` : 'In Stock'}</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white/90 px-1.5 py-0.5 rounded-[5px] text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-2.5 h-2.5" />
            <span>Photo: {primaryImgItem.photographer.split(' ')[0]}</span>
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono text-[#C2185B] font-bold tracking-wide uppercase">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
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
          <h3 className="font-bold text-sm sm:text-base text-[#2D2430] group-hover:text-[#C2185B] transition-colors line-clamp-2 leading-snug mb-1.5 font-display">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#8A7F8E] line-clamp-2 leading-relaxed mb-3">
            {product.tagline || product.shortBenefit}
          </p>

          {/* Bullet Quick Details Preview */}
          {product.bulletDetails && (
            <div className="text-[11px] font-mono text-[#8A7F8E] border-t border-[#FFE4EC] pt-2 mb-3 space-y-0.5">
              <div className="truncate">
                <span className="text-[#2D2430] font-semibold">Fabric:</span>{' '}
                {product.bulletDetails.fabric.split('(')[0]}
              </div>
              <div className="truncate">
                <span className="text-[#2D2430] font-semibold">Sizes:</span>{' '}
                {product.bulletDetails.sizes}
              </div>
            </div>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 border-t border-[#FFE4EC] mt-auto">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div>
              <div className="text-[10px] font-mono text-[#8A7F8E] uppercase tracking-wider">
                Price:
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-black text-[#2D2430] font-mono">
                  {formatNaira(product.startingPrice)}
                </span>
                {product.oldPrice && product.oldPrice > product.startingPrice && (
                  <span className="text-xs text-[#8A7F8E] line-through font-mono">
                    {formatNaira(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#D4A373] bg-[#FFF5F8] border border-[#FFE4EC] px-2 py-0.5 rounded-[5px] font-mono shrink-0">
              Pay on Delivery
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.slug);
            }}
            className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-xs py-2.5 px-3 rounded-[5px] transition-all flex items-center justify-center gap-1.5 shadow-xs group-hover:bg-[#C2185B]"
          >
            <span>SELECT SIZE &amp; ORDER</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
