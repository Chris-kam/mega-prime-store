import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#FFE4EC] rounded-[5px] overflow-hidden flex flex-col h-full animate-pulse shadow-xs">
      {/* 3:4 Aspect Ratio Image Skeleton */}
      <div className="relative aspect-3/4 bg-[#FFF5F8] border-b border-[#FFE4EC] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-[#FFF5F8] via-[#FFE4EC] to-[#FFF5F8]" />
        {/* Category badge placeholder */}
        <div className="absolute top-2 left-2 w-16 h-4 rounded-full bg-[#FFE4EC]" />
      </div>

      {/* Content Skeleton */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-1.5">
          {/* Rating placeholder */}
          <div className="flex items-center justify-between gap-1">
            <div className="w-14 h-3 rounded bg-[#FFE4EC]" />
            <div className="w-8 h-3 rounded bg-[#FFF5F8]" />
          </div>

          {/* Title placeholders */}
          <div className="w-11/12 h-3.5 sm:h-4 rounded bg-[#FFE4EC]" />
          <div className="w-3/4 h-3 sm:h-3.5 rounded bg-[#FFF5F8]" />
        </div>

        {/* Footer: Price + Button */}
        <div className="pt-2 sm:pt-3 border-t border-[#FFE4EC] flex items-center justify-between">
          <div className="w-16 h-4 sm:h-5 rounded bg-[#FFE4EC]" />
          <div className="w-14 sm:w-20 h-6 sm:h-8 rounded bg-[#FFE4EC]" />
        </div>
      </div>
    </div>
  );
};
