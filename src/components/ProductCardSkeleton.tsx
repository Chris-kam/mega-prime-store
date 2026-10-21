import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#FFE4EC] rounded-[5px] overflow-hidden flex flex-col h-full animate-pulse shadow-xs">
      {/* 3:4 Aspect Ratio Image Skeleton */}
      <div className="relative aspect-3/4 bg-[#FFF5F8] border-b border-[#FFE4EC] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-[#FFF5F8] via-[#FFE4EC] to-[#FFF5F8]" />
        {/* Category badge placeholder */}
        <div className="absolute top-2.5 left-2.5 w-20 h-5 rounded-full bg-[#FFE4EC]" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Rating placeholder */}
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-3.5 rounded bg-[#FFE4EC]" />
            <div className="w-8 h-3.5 rounded bg-[#FFF5F8]" />
          </div>

          {/* Title placeholders */}
          <div className="w-11/12 h-4 rounded bg-[#FFE4EC]" />
          <div className="w-3/4 h-3.5 rounded bg-[#FFF5F8]" />

          {/* Detail specs placeholder */}
          <div className="pt-2 space-y-1">
            <div className="w-5/6 h-2.5 rounded bg-[#FFE4EC]/70" />
            <div className="w-4/6 h-2.5 rounded bg-[#FFE4EC]/50" />
          </div>
        </div>

        {/* Footer: Price + Button */}
        <div className="pt-3 border-t border-[#FFE4EC] flex items-center justify-between">
          <div className="space-y-1">
            <div className="w-20 h-5 rounded bg-[#FFE4EC]" />
            <div className="w-12 h-3 rounded bg-[#FFF5F8]" />
          </div>
          <div className="w-24 h-8 rounded-full bg-[#FFE4EC]" />
        </div>
      </div>
    </div>
  );
};
