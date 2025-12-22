const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#eaeaea] overflow-hidden flex flex-row h-[220px] md:h-[280px] animate-pulse">
      {/* Image Skeleton */}
      <div className="w-[35%] md:w-[40%] bg-[#f0f0f0]" />

      {/* Info Skeleton */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-center gap-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-[#e8e8e8] rounded w-full" />
          <div className="h-4 bg-[#e8e8e8] rounded w-4/5" />
          <div className="h-4 bg-[#e8e8e8] rounded w-3/5" />
        </div>

        {/* Brand skeleton */}
        <div className="h-3 bg-[#e8e8e8] rounded w-24" />

        {/* Price skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 bg-[#e8e8e8] rounded w-20" />
          <div className="h-4 bg-[#e8e8e8] rounded w-16" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-1.5">
          <div className="h-3 bg-[#e8e8e8] rounded w-full" />
          <div className="h-3 bg-[#e8e8e8] rounded w-4/5" />
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-[#e8e8e8] rounded-full w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
