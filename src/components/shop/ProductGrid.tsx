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
    <div className="bg-[#f9f9f9] min-h-screen">
      {/* Filters */}
      <ShopFilters onFiltersChange={handleFiltersChange} />

      {/* Products Grid */}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Results count */}
        <p className="text-[#666] text-sm mb-4">
          {isLoading ? "Cargando..." : `${filteredProducts.length} productos encontrados`}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
