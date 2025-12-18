const ProductSkeleton = () => {
  return (
    <div className="flex flex-row bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <div className="relative w-[45%] sm:w-1/2 flex-shrink-0">
        <div className="aspect-square w-full bg-[#f0f0f0] overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>

      {/* Info skeleton */}
      <div className="flex flex-col justify-between p-3 sm:p-4 flex-1 min-w-0">
        <div>
          {/* Brand */}
          <div className="h-2.5 sm:h-3 w-14 sm:w-16 bg-[#f0f0f0] rounded mb-1 sm:mb-2 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          {/* Title */}
          <div className="h-3 sm:h-4 w-full bg-[#f0f0f0] rounded mb-1 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="h-3 sm:h-4 w-3/4 bg-[#f0f0f0] rounded mb-2 sm:mb-3 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          {/* Price */}
          <div className="h-4 sm:h-5 w-16 sm:w-20 bg-[#f0f0f0] rounded mb-2 sm:mb-3 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          {/* Description - hidden on mobile */}
          <div className="hidden sm:block">
            <div className="h-3 w-full bg-[#f0f0f0] rounded mb-1 overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="h-3 w-2/3 bg-[#f0f0f0] rounded overflow-hidden relative">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-2 sm:mt-3 h-8 sm:h-10 w-full bg-[#f0f0f0] rounded-full overflow-hidden relative">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
