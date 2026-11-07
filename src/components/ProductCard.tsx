import React, { useState, useEffect } from 'react';
import { Star, Heart, Eye, ArrowRight, Camera } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../data/states';
import { getProductImageUrl, getProductImageItem } from '../data/products';
import { isInWishlist, toggleWishlist } from '../services/wishlistService';

interface ProductCardProps {
  product: Product;
  onSelect: (slug: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(isInWishlist(product.slug));
    const handleWishlistUpdate = () => {
      setIsFavorited(isInWishlist(product.slug));
    };
    window.addEventListener('megaprime_wishlist_updated', handleWishlistUpdate);
    return () => window.removeEventListener('megaprime_wishlist_updated', handleWishlistUpdate);
  }, [product.slug]);

  const primaryImgItem = getProductImageItem(product.images[0]);
  const primaryImgUrl = getProductImageUrl(product.images[0]);

  // Fallback pink placeholder SVG with dress branding
  const fallbackPinkPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23FFF5F8"><rect width="100%" height="100%" fill="%23FFE4EC"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="28" fill="%23C2185B">Blush &amp; Bloom</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%238A7F8E">${encodeURIComponent(product.name)}</text></svg>`;

  const calculateDiscount = () => {
    if (product.oldPrice && product.oldPrice > product.startingPrice) {
      return Math.round(((product.oldPrice - product.startingPrice) / product.oldPrice) * 100);
    }
    return 0;
  };

  const discountPercent = calculateDiscount();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nowFavorited = toggleWishlist(product.slug);
    setIsFavorited(nowFavorited);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      onSelect(product.slug);
    }
  };

  return (
    <article
      onClick={() => onSelect(product.slug)}
      className="group relative bg-white border border-[#FFE4EC] hover:border-[#E75480] rounded-[5px] overflow-hidden card-hover-effect flex flex-col cursor-pointer transition-all duration-200"
      id={`product-card-${product.slug}`}
    >
      {/* Product Image Container with Template Hover Transition */}
      <div className="relative aspect-3/4 bg-[#FFF5F8] overflow-hidden border-b border-[#FFE4EC]">
        {/* Shimmer skeleton before loaded */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F8] via-[#FFE4EC] to-[#FFF5F8] animate-pulse" />
        )}

        <img
          src={imageError ? fallbackPinkPlaceholder : primaryImgUrl}
          alt={primaryImgItem.alt || product.name}
          className={`w-full h-full object-cover object-center img-zoom-hover ${
            imageLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges & Actions */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 z-10 pointer-events-none">
          <div className="flex items-center gap-1 flex-wrap">
            {discountPercent > 0 && (
              <span className="bg-[#C2185B] text-white text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-[5px] shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.tag && (
              <span className="bg-[#2D2430]/90 text-white text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-[5px] shadow-sm hidden xs:inline-block">
                {product.tag}
              </span>
            )}
          </div>

          {/* Template-style Circular Favorite/Wishlist Button */}
          <button
            onClick={handleFavoriteClick}
            type="button"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm pointer-events-auto shrink-0 ${
              isFavorited
                ? 'bg-[#E75480] text-white'
                : 'bg-white/90 backdrop-blur-md text-[#2D2430] hover:bg-[#E75480] hover:text-white border border-[#FFE4EC]'
            }`}
            title={isFavorited ? 'Remove from saved looks' : 'Save to favorites'}
            aria-label="Save to favorites"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-white text-white' : ''}`} />
          </button>
        </div>

        {/* Quick View Button on Hover (Template Feature) */}
        <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 flex flex-col gap-1.5 sm:gap-2 z-10 pointer-events-none">
          <div className="flex items-center justify-between">
            {/* Stock pill */}
            <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md text-[#2D2430] border border-[#FFE4EC] px-1.5 sm:px-2 py-0.5 rounded-[5px] font-mono text-[9px] sm:text-[10px] shadow-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E75480]"></span>
              </span>
              <span>{product.stockCount ? `${product.stockCount} left` : 'In Stock'}</span>
            </span>

            {/* Photo attribution */}
            <span className="hidden sm:inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white/90 px-1.5 py-0.5 rounded-[5px] text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-2.5 h-2.5" />
              <span>{primaryImgItem.photographer.split(' ')[0]}</span>
            </span>
          </div>

          {/* Quick View hover button (hidden on touch, visible on hover on desktop) */}
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-full bg-white/95 hover:bg-[#E75480] text-[#2D2430] hover:text-white font-bold text-[11px] sm:text-xs py-1.5 sm:py-2 px-2.5 rounded-[5px] shadow-md transition-all hidden md:flex items-center justify-center gap-1.5 quick-action-reveal pointer-events-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#C2185B] font-bold tracking-wider uppercase truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 shrink-0 font-mono">
              <Star className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />
              <span className="text-[11px] sm:text-xs font-bold text-[#2D2430]">
                {product.rating}
              </span>
              <span className="text-[10px] text-[#8A7F8E] hidden sm:inline">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-xs sm:text-sm md:text-base text-[#2D2430] group-hover:text-[#C2185B] transition-colors line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-snug mb-1 font-display">
            {product.name}
          </h3>

          {/* Tagline (Desktop & Tablet only to keep mobile cards clean & uniform) */}
          <p className="hidden sm:block text-xs text-[#8A7F8E] line-clamp-2 leading-relaxed mb-2.5">
            {product.tagline || product.shortBenefit}
          </p>

          {/* Bullet Quick Details Preview */}
          {product.bulletDetails && (
            <div className="hidden sm:block text-[11px] font-mono text-[#8A7F8E] border-t border-[#FFE4EC] pt-2 mb-3 space-y-0.5">
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
        <div className="pt-2 sm:pt-3 border-t border-[#FFE4EC] mt-auto">
          <div className="flex items-baseline justify-between gap-1 mb-2">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                <span className="text-sm sm:text-lg lg:text-xl font-black text-[#2D2430] font-mono">
                  {formatNaira(product.startingPrice)}
                </span>
                {product.oldPrice && product.oldPrice > product.startingPrice && (
                  <span className="text-[10px] sm:text-xs text-[#8A7F8E] line-through font-mono">
                    {formatNaira(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-bold text-[#D4A373] bg-[#FFF5F8] border border-[#FFE4EC] px-1.5 py-0.5 rounded-[5px] font-mono shrink-0">
              POD
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product.slug);
            }}
            className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-[10px] sm:text-xs py-2 sm:py-2.5 px-2 rounded-[5px] transition-all flex items-center justify-center gap-1 shadow-xs group-hover:bg-[#C2185B] active:scale-95"
          >
            <span className="sm:hidden">ORDER NOW</span>
            <span className="hidden sm:inline">SELECT SIZE &amp; ORDER</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
