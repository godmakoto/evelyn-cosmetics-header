import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/tienda/ProductCard";
import ProductSkeleton from "@/components/tienda/ProductSkeleton";
import FilterSection from "@/components/tienda/FilterSection";
import { products, Product } from "@/data/products";
import { Package } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const Tienda = () => {
  // Filter states
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  // Pagination states
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    if (maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result.sort((a, b) => {
          const discA = a.originalPrice
            ? ((a.originalPrice - a.price) / a.originalPrice) * 100
            : 0;
          const discB = b.originalPrice
            ? ((b.originalPrice - b.price) / b.originalPrice) * 100
            : 0;
          return discB - discA;
        });
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [maxPrice, selectedBrand, selectedCategory, selectedSubcategory, sortBy]);

  // Get active filter text
  const activeFilterText = useMemo(() => {
    if (selectedBrand) return selectedBrand;
    if (selectedCategory && selectedSubcategory)
      return `${selectedCategory} > ${selectedSubcategory}`;
    if (selectedCategory) return selectedCategory;
    if (maxPrice) return `Hasta Bs ${maxPrice}`;
    return "Todos los productos";
  }, [maxPrice, selectedBrand, selectedCategory, selectedSubcategory]);

  // Reset pagination when filters change
  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    setDisplayedProducts([]);
    setHasMore(true);

    const timer = setTimeout(() => {
      const initial = filteredProducts.slice(0, ITEMS_PER_PAGE);
      setDisplayedProducts(initial);
      setHasMore(initial.length < filteredProducts.length);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filteredProducts]);

  // Load more products
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const timer = setTimeout(() => {
      const nextPage = page + 1;
      const start = (nextPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newProducts = filteredProducts.slice(start, end);

      if (newProducts.length > 0) {
        setDisplayedProducts((prev) => [...prev, ...newProducts]);
        setPage(nextPage);
        setHasMore(end < filteredProducts.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading, hasMore, page, filteredProducts]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "600px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // Clear all filters
  const handleClearFilters = () => {
    setMaxPrice("");
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSortBy("relevance");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Filter Section */}
        <FilterSection
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeFilterText={activeFilterText}
          onClear={handleClearFilters}
        />

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto px-4 pt-0 pb-6 sm:py-6">
          {/* Initial loading */}
          {isLoading && displayedProducts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="w-16 h-16 text-[#e0e0e0] mb-4" />
              <p className="text-[#666] text-lg">
                No encontramos productos con ese filtro
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {/* Loading more skeletons */}
                {isLoading &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <ProductSkeleton key={`loading-${i}`} />
                  ))}
              </div>

              {/* Observer target */}
              <div ref={observerRef} className="h-4" />

              {/* End message */}
              {!hasMore && displayedProducts.length > 0 && (
                <p className="text-center text-sm text-[#999] mt-8 pb-4">
                  Has visto todos los productos
                </p>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tienda;
