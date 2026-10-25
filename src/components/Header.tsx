import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu,
  X,
  PhoneCall,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Layers,
  Heart,
} from 'lucide-react';
import { CATEGORIES, getProductImageUrl, deduplicateProducts } from '../data/products';
import { MegaprimeLogo } from './MegaprimeLogo';
import { Product } from '../types';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  products: Product[];
  onOpenPipelineModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  navigate,
  products,
  onOpenPipelineModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  const activeCategoryFromPath = React.useMemo(() => {
    if (!currentPath.includes('/products')) return '';
    const searchPart = currentPath.includes('?') ? currentPath.slice(currentPath.indexOf('?')) : '';
    const params = new URLSearchParams(searchPart);
    return params.get('category') || '';
  }, [currentPath]);

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#FFE4EC]">
      {/* Top announcement bar */}
      <div className="bg-[#2D2430] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-[#3D3242]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden min-w-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E75480] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E75480]"></span>
            </span>
            <span className="text-[#E75480] font-bold tracking-wider shrink-0 font-mono hidden xs:inline">
              BLUSH &amp; BLOOM:
            </span>
            <span className="text-white/90 truncate font-medium text-[10px] sm:text-[11px]">
              <span className="xs:hidden">Free delivery · Pay on delivery 🇳🇬</span>
              <span className="hidden xs:inline">Free delivery nationwide · Pay on delivery available across all 36 States + FCT</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-[#8A7F8E]">
            <span className="flex items-center gap-1.5 text-white/90 font-mono">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Zero Account Required</span>
            </span>
            <span className="text-[#4A3D50]">|</span>
            <button
              onClick={() => handleNav('/contact')}
              className="hover:text-[#E75480] transition-colors flex items-center gap-1 text-white/90 font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Fashion Support Desk</span>
            </button>
            <span className="text-[#4A3D50]">|</span>
            <span className="text-[#D4A373] font-bold font-mono">🇳🇬 NGN (₦)</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNav('/')}
              className="text-left group flex items-center focus:outline-none"
              id="brand-logo-btn"
              aria-label="Megaprime Blush & Bloom Home"
            >
              <MegaprimeLogo className="h-8 sm:h-10 w-auto" variant="colored" />
            </button>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('/')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold transition-all rounded-[5px] ${
                currentPath === '/'
                  ? 'text-[#C2185B] bg-[#FFE4EC] border border-[#E75480]/30 font-bold'
                  : 'text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFE4EC]/50'
              }`}
              id="nav-home"
            >
              Home
            </button>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <button
                onClick={() => setProductsDropdownOpen((prev) => !prev)}
                className={`px-3.5 py-2 text-xs lg:text-sm font-semibold flex items-center gap-1.5 transition-all rounded-[5px] ${
                  currentPath.startsWith('/products')
                    ? 'text-[#C2185B] bg-[#FFE4EC] border border-[#E75480]/30 font-bold'
                    : 'text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFE4EC]/50'
                }`}
                id="nav-products"
                aria-haspopup="true"
                aria-expanded={productsDropdownOpen}
              >
                <span>Collections</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white border border-[#FFE4EC] shadow-xl rounded-[5px] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-4 py-2 border-b border-[#FFE4EC] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8A7F8E] uppercase font-bold">
                      Fashion Categories
                    </span>
                    <button
                      onClick={() => handleNav('/products')}
                      className="text-[11px] text-[#C2185B] font-mono font-bold hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#FFE4EC]/50">
                    {CATEGORIES.filter((c) => c !== 'All Products').map((cat) => {
                      const isSelected = activeCategoryFromPath === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => handleNav(`/products?category=${encodeURIComponent(cat)}`)}
                          className={`w-full px-4 py-2.5 text-left flex items-center justify-between group transition-colors ${
                            isSelected
                              ? 'bg-[#FFE4EC] text-[#C2185B] font-bold'
                              : 'hover:bg-[#FFF5F8] text-[#2D2430]'
                          }`}
                        >
                          <span
                            className={`text-xs ${
                              isSelected
                                ? 'text-[#C2185B] font-bold'
                                : 'group-hover:text-[#C2185B] font-medium'
                            } group-hover:translate-x-0.5 transition-transform`}
                          >
                            {cat}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#E75480]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/#how-it-works')}
              className="px-3.5 py-2 text-xs lg:text-sm font-semibold text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFE4EC]/50 transition-all rounded-[5px]"
            >
              Pay on Delivery
            </button>

            <button
              onClick={() => handleNav('/faq')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold transition-all rounded-[5px] ${
                currentPath === '/faq'
                  ? 'text-[#C2185B] bg-[#FFE4EC] border border-[#E75480]/30 font-bold'
                  : 'text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFE4EC]/50'
              }`}
            >
              Sizing &amp; FAQ
            </button>

            <button
              onClick={() => handleNav('/contact')}
              className={`px-3.5 py-2 text-xs lg:text-sm font-semibold transition-all rounded-[5px] ${
                currentPath === '/contact'
                  ? 'text-[#C2185B] bg-[#FFE4EC] border border-[#E75480]/30 font-bold'
                  : 'text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFE4EC]/50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* AI Content Pipeline Admin Button — hidden on mobile (accessible via mobile drawer) */}
            <button
              onClick={onOpenPipelineModal}
              title="Regenerate fashion copy and images via Gemini & Unsplash"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FFF5F8] hover:bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/40 text-xs font-mono font-bold px-3 py-2 rounded-[5px] transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E75480] animate-pulse" />
              <span className="hidden lg:inline">AI Pipeline</span>
            </button>

            {/* View Catalog CTA */}
            <button
              onClick={() => handleNav('/products')}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#E75480] hover:bg-[#C2185B] text-white text-[11px] sm:text-sm font-bold px-3 py-2 sm:px-5 sm:py-2.5 rounded-[5px] transition-all shadow-xs active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">SHOP 40 LOOKS</span>
              <span className="sm:hidden">SHOP</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-[#2D2430] hover:text-[#C2185B] rounded-[5px] border border-[#FFE4EC] bg-[#FFF5F8] shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#FFE4EC] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNav('/')}
              className="w-full text-left px-3 py-2.5 rounded-[5px] text-sm font-semibold text-[#2D2430] hover:bg-[#FFF5F8]"
            >
              Home
            </button>
            {/* Mobile Collections Dropdown */}
            <div className="border border-[#FFE4EC] rounded-[5px] overflow-hidden">
              <button
                onClick={() => setMobileCollectionsOpen((prev) => !prev)}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-[#2D2430] bg-[#FFF5F8] flex items-center justify-between"
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8A7F8E] transition-transform ${
                    mobileCollectionsOpen ? 'rotate-180 text-[#C2185B]' : ''
                  }`}
                />
              </button>
              {mobileCollectionsOpen && (
                <div className="bg-white py-1 divide-y divide-[#FFE4EC]/40">
                  <button
                    onClick={() => handleNav('/products')}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-[#C2185B] hover:bg-[#FFF5F8]"
                  >
                    View All Collections
                  </button>
                  {CATEGORIES.filter((c) => c !== 'All Products').map((cat) => {
                    const isSelected = activeCategoryFromPath === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleNav(`/products?category=${encodeURIComponent(cat)}`)}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-[#FFE4EC] text-[#C2185B] font-bold'
                            : 'font-medium text-[#2D2430] hover:text-[#C2185B] hover:bg-[#FFF5F8]'
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E75480]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <button
              onClick={() => handleNav('/#how-it-works')}
              className="w-full text-left px-3 py-2.5 rounded-[5px] text-sm font-semibold text-[#2D2430] hover:bg-[#FFF5F8]"
            >
              Pay on Delivery Details
            </button>
            <button
              onClick={() => handleNav('/faq')}
              className="w-full text-left px-3 py-2.5 rounded-[5px] text-sm font-semibold text-[#2D2430] hover:bg-[#FFF5F8]"
            >
              Sizing Guide &amp; FAQs
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="w-full text-left px-3 py-2.5 rounded-[5px] text-sm font-semibold text-[#2D2430] hover:bg-[#FFF5F8]"
            >
              Customer Support Desk
            </button>
          </div>

          <div className="pt-3 border-t border-[#FFE4EC] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPipelineModal();
              }}
              className="w-full bg-[#FFF5F8] border border-[#E75480]/40 text-[#C2185B] font-mono text-xs font-bold py-2.5 rounded-[5px] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E75480]" />
              <span>Open AI Content Pipeline Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
