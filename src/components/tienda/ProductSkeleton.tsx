const ProductSkeleton = () => {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <div className="relative w-1/2 bg-[#f0f0f0] overflow-hidden flex-shrink-0">
        <div className="aspect-square w-full">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>

      {/* Info skeleton */}
      <div className="flex flex-col justify-between p-4 w-1/2">
        <div>
          {/* Brand */}
          <div className="h-3 w-16 bg-[#f0f0f0] rounded mb-2 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          {/* Title */}
          <div className="h-4 w-full bg-[#f0f0f0] rounded mb-1 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="h-4 w-3/4 bg-[#f0f0f0] rounded mb-3 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          {/* Price */}
          <div className="h-5 w-20 bg-[#f0f0f0] rounded mb-3 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          {/* Description */}
          <div className="h-3 w-full bg-[#f0f0f0] rounded mb-1 overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="h-3 w-2/3 bg-[#f0f0f0] rounded overflow-hidden relative">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        </div>

        {/* Button */}
        <div className="mt-3 h-10 w-full bg-[#f0f0f0] rounded-full overflow-hidden relative">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
