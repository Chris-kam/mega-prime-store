import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ShoppingBag } from 'lucide-react';
import { CATEGORIES, deduplicateProducts } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Pagination, PRODUCTS_PER_PAGE } from '../components/Pagination';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { Product } from '../types';

interface ProductsPageProps {
  currentPath?: string;
  products: Product[];
  navigate: (path: string) => void;
  onSelectProduct: (slug: string) => void;
  onOpenPipelineModal: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  currentPath,
  products,
  navigate,
  onSelectProduct,
  onOpenPipelineModal,
}) => {
  // Read category from URL query param if present
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const searchPart = currentPath && currentPath.includes('?')
        ? currentPath.slice(currentPath.indexOf('?'))
        : window.location.search;
      const urlParams = new URLSearchParams(searchPart);
      const cat = urlParams.get('category');
      if (cat && CATEGORIES.includes(cat)) {
        return cat;
      }
    }
    return 'All Products';
  });

  // Read initial page number from URL ?page= (fallback to 1 if invalid or absent)
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const searchPart = currentPath && currentPath.includes('?')
        ? currentPath.slice(currentPath.indexOf('?'))
        : window.location.search;
      const urlParams = new URLSearchParams(searchPart);
      const pageStr = urlParams.get('page');
      const parsed = parseInt(pageStr || '1', 10);
      if (!isNaN(parsed) && parsed >= 1) {
        return parsed;
      }
    }
    return 1;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ref to the top of the products section for smooth scrolling
  const productsGridRef = useRef<HTMLDivElement>(null);

  // Sync state whenever currentPath prop updates (e.g., when clicking collections dropdown item)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchPart = currentPath && currentPath.includes('?')
      ? currentPath.slice(currentPath.indexOf('?'))
      : window.location.search;
    const urlParams = new URLSearchParams(searchPart);
    const cat = urlParams.get('category');
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All Products');
    }

    const pageStr = urlParams.get('page');
    const parsed = parseInt(pageStr || '1', 10);
    if (!isNaN(parsed) && parsed >= 1) {
      setCurrentPage(parsed);
    } else {
      setCurrentPage(1);
    }

    // When navigating to a specific category, smoothly scroll to the products grid
    if (productsGridRef.current && cat) {
      const topOffset = productsGridRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth',
      });
    }
  }, [currentPath]);

  // Sync state when browser back/forward buttons are pressed
  useEffect(() => {
    const handlePop = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get('category');
      if (cat && CATEGORIES.includes(cat)) {
        setSelectedCategory(cat);
      } else {
        setSelectedCategory('All Products');
      }

      const pageStr = urlParams.get('page');
      const parsed = parseInt(pageStr || '1', 10);
      if (!isNaN(parsed) && parsed >= 1) {
        setCurrentPage(parsed);
      } else {
        setCurrentPage(1);
      }
    };

    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const uniqueProducts = deduplicateProducts(products);

  // Filter products by category and search term
  const filteredProducts = uniqueProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All Products' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.tagline?.toLowerCase().includes(q) ||
      p.shortBenefit?.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.bulletDetails?.fabric?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.startingPrice - b.startingPrice;
    if (sortBy === 'price-high') return b.startingPrice - a.startingPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  // Pagination calculation
  const totalItems = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PRODUCTS_PER_PAGE));

  // If filtered results decrease and current page is out of bounds, reset to page 1
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All Products') {
        params.set('category', selectedCategory);
      }
      const newPath = params.toString() ? `/products?${params.toString()}` : '/products';
      navigate(newPath);
    }
  }, [totalPages, currentPage, selectedCategory, navigate]);

  // Paginated slice for the current page
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const startItemNumber = totalItems === 0 ? 0 : startIndex + 1;
  const endItemNumber = Math.min(startIndex + PRODUCTS_PER_PAGE, totalItems);

  // Handler for category filter change (resets to page 1)
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    const newPath = cat === 'All Products' ? '/products' : `/products?category=${encodeURIComponent(cat)}`;
    navigate(newPath);
  };

  // Handler for search term change (resets to page 1)
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Handler for sort change (resets to page 1)
  const handleSortChange = (val: 'featured' | 'price-low' | 'price-high' | 'rating') => {
    setSortBy(val);
    setCurrentPage(1);
  };

  // Handler for pagination change (smoothly scrolls to top of product grid)
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;

    setIsTransitioning(true);
    setCurrentPage(newPage);

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'All Products') {
      params.set('category', selectedCategory);
    }
    if (newPage > 1) {
      params.set('page', newPage.toString());
    }
    const queryString = params.toString();
    const newPath = queryString ? `/products?${queryString}` : '/products';
    navigate(newPath);

    // Smooth scroll back to top of the product grid
    if (productsGridRef.current) {
      const topOffset = productsGridRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-[#2D2430] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-3 bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1 rounded-[5px]">
            <Sparkles className="w-3.5 h-3.5 text-[#E75480]" />
            <span>
              {selectedCategory === 'All Products'
                ? `Blush & Bloom Catalog (${uniqueProducts.length} Designs)`
                : `Category: ${selectedCategory} (${filteredProducts.length} ${filteredProducts.length === 1 ? 'Design' : 'Designs'})`}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#2D2430] tracking-tight font-display">
            {selectedCategory === 'All Products' ? 'The Complete Fashion Edit' : `${selectedCategory} Collection`}
          </h1>
          <p className="text-sm sm:text-base text-[#8A7F8E] mt-2">
            {selectedCategory === 'All Products'
              ? 'Liquid satins, authentic Ankara prints, tailored crepe, and fine accessories with 100% free nationwide delivery and pay on delivery.'
              : `Explore handcrafted ${selectedCategory.toLowerCase()} curated for elegance, premium fit, and nationwide pay on delivery across Nigeria.`}
          </p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div
          ref={productsGridRef}
          className="bg-white border border-[#FFE4EC] rounded-[5px] p-4 sm:p-6 mb-8 shadow-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#8A7F8E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dresses, Ankara prints, fabrics, bags..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-[#FFF5F8] border border-[#FFE4EC] focus:border-[#E75480] focus:bg-white focus:ring-2 focus:ring-[#E75480]/20 text-[#2D2430] rounded-[5px] pl-10 pr-4 py-2.5 text-xs sm:text-sm placeholder:text-[#8A7F8E]/60 transition-colors"
              />
            </div>

            {/* Sort Selector & Admin Pipeline button */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-mono">
              <span className="text-[#8A7F8E]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => handleSortChange(e.target.value)}
                className="bg-[#FFF5F8] border border-[#FFE4EC] rounded-[5px] px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#C2185B]"
              >
                <option value="featured">Featured Looks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                onClick={onOpenPipelineModal}
                className="bg-[#FFE4EC] text-[#C2185B] border border-[#E75480]/30 hover:bg-[#E75480] hover:text-white px-3 py-2 rounded-[5px] transition-all flex items-center gap-1 font-bold text-xs"
                title="Open AI Content Pipeline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI Pipeline</span>
              </button>
            </div>
          </div>

          {/* 11 Categories Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none pt-2 border-t border-[#FFE4EC]">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === 'All Products'
                  ? uniqueProducts.length
                  : uniqueProducts.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-[5px] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#C2185B] text-white font-bold shadow-xs'
                      : 'bg-[#FFF5F8] hover:bg-[#FFE4EC] text-[#2D2430] border border-[#FFE4EC]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1 rounded-full ${
                      isActive ? 'bg-white text-[#C2185B]' : 'bg-[#FFE4EC] text-[#8A7F8E]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Summary Banner above grid */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#8A7F8E] mb-6 px-1 gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <span>
              Showing <strong className="text-[#2D2430]">{startItemNumber} to {endItemNumber}</strong> of{' '}
              <strong className="text-[#2D2430]">{totalItems}</strong> products in{' '}
              <strong className="text-[#C2185B]">{selectedCategory}</strong>
              {totalPages > 1 && (
                <span className="ml-2 text-[#8A7F8E] font-medium">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </span>
            {selectedCategory !== 'All Products' && (
              <button
                onClick={() => handleCategorySelect('All Products')}
                className="inline-flex items-center gap-1 text-[11px] bg-[#FFE4EC] hover:bg-[#E75480] hover:text-white text-[#C2185B] font-bold px-2 py-0.5 rounded-[5px] transition-colors"
                title="Show all fashion categories"
              >
                <span>Clear filter ✕</span>
              </button>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="text-[#C2185B] hover:underline self-start sm:self-auto"
            >
              Clear search "{searchQuery}"
            </button>
          )}
        </div>

        {/* Product Grid with Smooth Transition & Skeleton State */}
        {totalItems > 0 ? (
          <div>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200 ${
                isTransitioning ? 'opacity-40 pointer-events-none' : 'opacity-100'
              }`}
            >
              {isTransitioning
                ? Array.from({ length: Math.min(12, paginatedProducts.length || 12) }).map(
                    (_, idx) => <ProductCardSkeleton key={`skeleton-${idx}`} />
                  )
                : paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(slug) => onSelectProduct(slug)}
                    />
                  ))}
            </div>

            {/* Pagination Component Centered Below Grid */}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={PRODUCTS_PER_PAGE}
              onPageChange={handlePageChange}
              showSummary={true}
            />
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#FFE4EC] rounded-[5px] p-8">
            <ShoppingBag className="w-12 h-12 text-[#E75480] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#2D2430] font-display">
              No matching fashion items found
            </h3>
            <p className="text-xs text-[#8A7F8E] mt-1 mb-5">
              We couldn’t find anything matching "{searchQuery}". Try browsing by category or clear your search term.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleCategorySelect('All Products');
                }}
                className="bg-[#E75480] hover:bg-[#C2185B] text-white text-xs font-mono font-bold px-4 py-2.5 rounded-[5px]"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
