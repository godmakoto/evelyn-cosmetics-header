import { useState, useEffect, useCallback } from "react";
import { shopProducts, ShopProduct } from "@/data/shopProducts";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

interface ProductGridProps {
  initialBrandFilter?: string | null;
  initialCategoryFilter?: string | null;
  initialSubcategoryFilter?: string | null;
  resetFiltersTimestamp?: number | null;
}

const ProductGrid = ({
  initialBrandFilter = null,
  initialCategoryFilter = null,
  initialSubcategoryFilter = null,
  resetFiltersTimestamp = null
}: ProductGridProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>(shopProducts);
  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    brand: initialBrandFilter,
    category: initialCategoryFilter,
    subcategory: initialSubcategoryFilter,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Reset filters when resetFiltersTimestamp changes
  useEffect(() => {
    if (resetFiltersTimestamp) {
      setFilters({
        maxPrice: null,
        brand: null,
        category: null,
        subcategory: null,
      });
    }
  }, [resetFiltersTimestamp]);

  // Scroll to top when filters change (but not on first render)
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [filters.brand, filters.category, filters.subcategory, filters.maxPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...shopProducts];
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.subcategory) {
      result = result.filter((p) => p.subcategory === filters.subcategory);
    }
    setFilteredProducts(result);
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="bg-white lg:bg-[#f9f9f9] min-h-screen">
      {/* Mobile/Tablet: Filtros arriba */}
      <div className="lg:hidden">
        <ShopFilters
          onFiltersChange={handleFiltersChange}
          initialBrandFilter={initialBrandFilter}
          initialCategoryFilter={initialCategoryFilter}
          initialSubcategoryFilter={initialSubcategoryFilter}
          resetFiltersTimestamp={resetFiltersTimestamp}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-0 py-0 lg:px-4 lg:py-6">
        <div className="lg:flex lg:gap-10">
          {/* Desktop: Filtros en columna izquierda */}
          <aside className="hidden lg:block lg:w-[300px] lg:flex-shrink-0">
            <div className="sticky top-4">
              <ShopFilters
                onFiltersChange={handleFiltersChange}
                initialBrandFilter={initialBrandFilter}
                initialCategoryFilter={initialCategoryFilter}
                initialSubcategoryFilter={initialSubcategoryFilter}
                resetFiltersTimestamp={resetFiltersTimestamp}
              />
            </div>
          </aside>

          {/* Productos */}
          <div className="flex-1">
            {/* Results count */}
            <p className="hidden sm:block text-[#666] text-sm mb-6 px-4 lg:px-0 pt-4 sm:pt-6 lg:pt-0">
              {isLoading ? "Cargando..." : `${filteredProducts.length} productos encontrados`}
            </p>

            <div className="grid grid-cols-1 gap-0 lg:gap-4">
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="border-b border-b-[#eee] last:border-b-0 lg:border-b-0">
                      <div className="py-4 lg:py-0">
                        <ProductSkeleton />
                      </div>
                    </div>
                  ))
                : filteredProducts.map((product) => (
                    <div key={product.id} className="border-b border-b-[#eee] last:border-b-0 lg:border-b-0">
                      <div className="py-4 lg:py-0">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  ))}
            </div>

            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#666] text-lg mb-2">No se encontraron productos</p>
                <p className="text-[#999] text-sm">Intenta ajustar los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
