const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-none lg:rounded-2xl border-0 lg:border lg:border-[#eaeaea] overflow-hidden flex flex-row h-[200px] sm:h-[320px] lg:h-auto animate-pulse">
      {/* Image Container - Matches ProductCard exact dimensions */}
      <div className="relative w-[56%] sm:w-[45%] sm:aspect-square lg:w-[320px] lg:h-[320px] flex items-center justify-center p-3 lg:p-6 flex-shrink-0">
        {/* Inner image container with rounded corners */}
        <div className="w-full h-full aspect-square rounded-xl bg-[#e8e8e8]" />
      </div>

      {/* Content Container - Matches ProductCard layout */}
      <div className="w-[44%] sm:w-[55%] lg:flex-1 py-3 pr-3 sm:py-4 sm:pr-4 lg:py-6 lg:pr-6 lg:pl-0 flex flex-col justify-between h-full lg:h-[320px]">
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Title skeleton - responsive heights */}
          <div className="space-y-1.5 mb-1 lg:mb-2">
            <div className="h-[13px] sm:h-[15px] lg:h-[18px] bg-[#e8e8e8] rounded w-full" />
            <div className="h-[13px] sm:h-[15px] lg:h-[18px] bg-[#e8e8e8] rounded w-[90%]" />
            <div className="h-[13px] sm:h-[15px] lg:h-[18px] bg-[#e8e8e8] rounded w-[75%]" />
          </div>

          {/* Brand skeleton */}
          <div className="h-[10px] sm:h-[11px] lg:h-3 bg-[#e8e8e8] rounded w-20 mb-1 lg:mb-2" />

          {/* Description skeleton - only visible on tablet and desktop */}
          <div className="hidden lg:block space-y-1.5 mb-3">
            <div className="h-3 bg-[#e8e8e8] rounded w-full" />
            <div className="h-3 bg-[#e8e8e8] rounded w-[85%]" />
          </div>

          {/* Mobile/Tablet: Price above button */}
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 lg:hidden">
            <div className="h-[15px] sm:h-[17px] bg-[#e8e8e8] rounded w-16" />
            <div className="h-[12px] sm:h-[13px] bg-[#e8e8e8] rounded w-12" />
          </div>

          {/* Tablet description (visible only on sm, hidden on mobile and desktop) */}
          <div className="hidden sm:block lg:hidden space-y-1 mb-2">
            <div className="h-3 bg-[#e8e8e8] rounded w-full" />
            <div className="h-3 bg-[#e8e8e8] rounded w-[80%]" />
          </div>
        </div>

        {/* Mobile/Tablet: Button only */}
        <div className="h-[38px] sm:h-[40px] bg-[#e8e8e8] rounded-full w-full mt-auto flex-shrink-0 lg:hidden" />

        {/* Desktop: Price and button side by side */}
        <div className="hidden lg:flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-2 w-1/2 flex-shrink-0">
            <div className="h-6 bg-[#e8e8e8] rounded w-20" />
            <div className="h-4 bg-[#e8e8e8] rounded w-14" />
          </div>
          <div className="h-[48px] bg-[#e8e8e8] rounded-full w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
