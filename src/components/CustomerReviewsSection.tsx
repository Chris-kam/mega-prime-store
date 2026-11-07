import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { Review } from '../types';
import { HOMEPAGE_REVIEWS } from '../data/reviews';

interface CustomerReviewsSectionProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  reviews = HOMEPAGE_REVIEWS,
  title = "Customer Feedback from Nigeria",
  subtitle = "Real verified feedback from fashion lovers, wedding guests, and stylish professionals across all 36 states.",
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const displayedReviews = reviews.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="py-16 sm:py-20 bg-[#FFF5F8] border-t border-[#FFE4EC]" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2185B] uppercase tracking-wider mb-2 bg-[#FFE4EC] border border-[#E75480]/30 px-3 py-1 rounded-[5px] shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#E75480]" />
              <span>Verified Direct Buyers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#2D2430] tracking-tight font-display">
              {title}
            </h2>
            <p className="text-sm text-[#8A7F8E] mt-2 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))}
                className="p-2.5 rounded-[5px] bg-white border border-[#FFE4EC] hover:border-[#E75480] hover:text-[#C2185B] transition-colors shadow-xs active:scale-95"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-5 h-5 text-[#2D2430]" />
              </button>
              <span className="text-xs font-mono text-[#8A7F8E] px-2 font-bold">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-[5px] bg-white border border-[#FFE4EC] hover:border-[#E75480] hover:text-[#C2185B] transition-colors shadow-xs active:scale-95"
                aria-label="Next Reviews"
              >
                <ChevronRight className="w-5 h-5 text-[#2D2430]" />
              </button>
            </div>
          )}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => {
            const initials = rev.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={rev.id}
                className="bg-white border border-[#FFE4EC] rounded-[5px] p-6 shadow-xs flex flex-col justify-between card-hover-effect relative overflow-hidden"
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-[#FFE4EC]/60 -z-0 pointer-events-none" />

                <div className="relative z-10">
                  {/* Header: Stars & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-[#D4A373] text-[#D4A373]' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#8A7F8E]">{rev.date}</span>
                  </div>

                  {/* Review Title */}
                  <h4 className="font-bold text-[#2D2430] text-sm sm:text-base mb-2 font-display">
                    "{rev.title}"
                  </h4>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-[#2D2430]/80 leading-relaxed mb-6">
                    {rev.comment}
                  </p>
                </div>

                {/* Author Avatar & Location */}
                <div className="pt-4 border-t border-[#FFE4EC] flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#FFE4EC] text-[#C2185B] font-bold font-mono text-xs flex items-center justify-center shrink-0 border border-[#E75480]/30 shadow-xs">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs sm:text-sm text-[#2D2430] truncate flex items-center gap-1.5 font-display">
                      <span>{rev.author}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E75480] shrink-0" />
                    </div>
                    <div className="text-[11px] font-mono text-[#8A7F8E] flex items-center gap-1 truncate mt-0.5">
                      <MapPin className="w-3 h-3 text-[#D4A373] shrink-0" />
                      <span>{rev.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
