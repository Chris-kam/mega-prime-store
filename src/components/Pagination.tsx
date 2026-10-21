import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PRODUCTS_PER_PAGE = 12;

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  showSummary?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize = PRODUCTS_PER_PAGE,
  onPageChange,
  showSummary = true,
  className = '',
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // If a filter returns 12 or fewer products, hide the pagination bar completely
  if (totalItems <= pageSize) {
    return null;
  }

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const summaryText = `Showing ${startItem} to ${endItem} of ${totalItems} products`;

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className={`w-full flex flex-col items-center gap-4 my-10 ${className}`}>
      {/* Small summary below the grid */}
      {showSummary && (
        <div
          className="text-xs font-mono text-[#8A7F8E] flex items-center gap-1.5"
          role="status"
          aria-live="polite"
        >
          <span>{summaryText}</span>
        </div>
      )}

      {/* Accessible Pagination Bar */}
      <nav
        aria-label="Product pagination"
        className="flex items-center justify-center gap-2 sm:gap-3 select-none"
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Go to previous page"
          className={`min-h-[44px] min-w-[44px] px-4 sm:px-5 py-2.5 rounded-full border border-[#E75480] bg-white text-[#2D2430] text-sm font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E75480] focus:ring-offset-2 ${
            isFirstPage
              ? 'opacity-40 cursor-not-allowed hover:bg-white'
              : 'hover:bg-[#FFE4EC] hover:text-[#C2185B] cursor-pointer active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4 shrink-0 text-[#E75480]" />
          <span>Previous</span>
        </button>

        {/* Mobile View: Compact "Page X of Y" */}
        <div
          className="sm:hidden min-h-[44px] px-3.5 py-2 rounded-full bg-[#FFE4EC] border border-[#E75480]/40 text-[#C2185B] font-mono text-xs font-bold flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          Page {currentPage} of {totalPages}
        </div>

        {/* Desktop View: Numbered Page Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {pageNumbers.map((page) => {
            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={
                  isCurrent ? `Page ${page}, current page` : `Go to page ${page}`
                }
                className={`min-h-[44px] min-w-[44px] px-3.5 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E75480] focus:ring-offset-2 ${
                  isCurrent
                    ? 'bg-[#E75480] text-white border border-[#E75480] shadow-sm pointer-events-none'
                    : 'bg-white text-[#2D2430] border border-[#E75480] hover:bg-[#FFE4EC] hover:text-[#C2185B] active:scale-95 cursor-pointer'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Go to next page"
          className={`min-h-[44px] min-w-[44px] px-4 sm:px-5 py-2.5 rounded-full border border-[#E75480] bg-white text-[#2D2430] text-sm font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-[#E75480] focus:ring-offset-2 ${
            isLastPage
              ? 'opacity-40 cursor-not-allowed hover:bg-white'
              : 'hover:bg-[#FFE4EC] hover:text-[#C2185B] cursor-pointer active:scale-95'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 shrink-0 text-[#E75480]" />
        </button>
      </nav>
    </div>
  );
};
