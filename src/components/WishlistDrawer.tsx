import React, { useEffect, useState } from 'react';
import { X, Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../data/states';
import { getProductImageUrl } from '../data/products';
import { getWishlist, toggleWishlist, clearWishlist } from '../services/wishlistService';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (slug: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);

  const refreshWishlist = () => {
    setWishlistSlugs(getWishlist());
  };

  useEffect(() => {
    refreshWishlist();
    const handleUpdate = () => refreshWishlist();
    window.addEventListener('megaprime_wishlist_updated', handleUpdate);
    return () => window.removeEventListener('megaprime_wishlist_updated', handleUpdate);
  }, []);

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

  if (!isOpen) return null;

  const savedProducts = products.filter((p) => wishlistSlugs.includes(p.slug));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#FFE4EC] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#FFE4EC] flex items-center justify-between bg-[#FFF5F8]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FFE4EC] text-[#C2185B] flex items-center justify-center">
                <Heart className="w-4 h-4 fill-[#E75480] text-[#E75480]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#2D2430] font-display">
                  Your Saved Looks
                </h3>
                <span className="text-xs text-[#8A7F8E] font-mono">
                  {savedProducts.length} {savedProducts.length === 1 ? 'item saved' : 'items saved'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white text-[#8A7F8E] hover:text-[#2D2430] transition-colors"
              aria-label="Close Saved Looks"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#FFE4EC]">
            {savedProducts.length > 0 ? (
              <div className="space-y-4">
                {savedProducts.map((product) => {
                  const imgUrl = getProductImageUrl(product.images[0]);
                  return (
                    <div
                      key={product.id}
                      className="pt-4 first:pt-0 flex items-center gap-3.5 group"
                    >
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => {
                          onClose();
                          onSelectProduct(product.slug);
                        }}
                        className="w-20 h-24 rounded-[5px] overflow-hidden border border-[#FFE4EC] bg-[#FFF5F8] shrink-0 cursor-pointer"
                      >
                        <img
                          src={imgUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-[#C2185B] uppercase block">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => {
                            onClose();
                            onSelectProduct(product.slug);
                          }}
                          className="font-bold text-sm text-[#2D2430] hover:text-[#C2185B] transition-colors truncate cursor-pointer font-display"
                        >
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-black text-[#2D2430] font-mono">
                            {formatNaira(product.startingPrice)}
                          </span>
                          {product.oldPrice && product.oldPrice > product.startingPrice && (
                            <span className="text-[11px] text-[#8A7F8E] line-through font-mono">
                              {formatNaira(product.oldPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              onClose();
                              onSelectProduct(product.slug);
                            }}
                            className="text-xs font-bold text-[#C2185B] hover:text-[#E75480] flex items-center gap-1 font-mono"
                          >
                            <span>Order Look</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <span className="text-[#8A7F8E]/40">•</span>
                          <button
                            onClick={() => toggleWishlist(product.slug)}
                            className="text-[11px] text-[#8A7F8E] hover:text-red-500 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#FFF5F8] border border-[#FFE4EC] text-[#E75480] flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-bold text-base text-[#2D2430] mb-1 font-display">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-[#8A7F8E] max-w-xs mx-auto mb-6">
                  Tap the heart icon on any dress or fashion piece to save it for quick review and ordering anytime.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onSelectProduct(''); // Will navigate to products if handled
                  }}
                  className="bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-xs px-5 py-2.5 rounded-[5px] transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {savedProducts.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#FFE4EC] bg-[#FFF5F8] space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onSelectProduct(savedProducts[0].slug);
                }}
                className="w-full bg-[#E75480] hover:bg-[#C2185B] text-white font-bold text-xs py-3 px-4 rounded-[5px] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER SAVED PIECES (PAY ON DELIVERY)</span>
              </button>

              <button
                onClick={clearWishlist}
                className="w-full text-center text-xs text-[#8A7F8E] hover:text-red-600 font-mono py-1 transition-colors"
              >
                Clear all saved looks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

