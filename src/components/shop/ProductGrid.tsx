import { useState, useEffect, useCallback } from "react";
import { shopProducts, ShopProduct } from "@/data/shopProducts";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const ProductGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>(shopProducts);
  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    brand: null as string | null,
    category: null as string | null,
    subcategory: null as string | null,
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Apply filters
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
    <div className="bg-white sm:bg-[#f9f9f9] min-h-screen">
      {/* Filters */}
      <ShopFilters onFiltersChange={handleFiltersChange} />

      {/* Products Grid */}
      <div className="max-w-[1200px] mx-auto px-0 py-0 sm:px-4 sm:py-6">
        {/* Results count - hidden on mobile */}
        <p className="hidden sm:block text-[#666] text-sm mb-4">
          {isLoading ? "Cargando..." : `${filteredProducts.length} productos encontrados`}
        </p>

        {/* Grid - con separación controlada en móvil */}
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-5 lg:gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border-b border-b-[#eee] last:border-b-0 sm:border-b-0">
                  <div className="py-4 sm:py-0">
                    <ProductSkeleton />
                  </div>
                </div>
              ))
            : filteredProducts.map((product, index) => (
                <div key={product.id} className="border-b border-b-[#eee] last:border-b-0 sm:border-b-0">
                  <div className="py-4 sm:py-0">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
        </div>

        {/* No results */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#666] text-lg mb-2">No se encontraron productos</p>
            <p className="text-[#999] text-sm">Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
