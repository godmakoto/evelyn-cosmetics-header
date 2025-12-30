import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { shopProducts, ShopProduct } from "@/data/shopProducts";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

interface ProductGridProps {
  initialBrandFilter?: string | null;
  initialCategoryFilter?: string | null;
  initialSubcategoryFilter?: string | null;
  resetFiltersTimestamp?: number | null;
  searchQuery?: string | null;
}

const ProductGrid = ({
  initialBrandFilter = null,
  initialCategoryFilter = null,
  initialSubcategoryFilter = null,
  resetFiltersTimestamp = null,
  searchQuery = null
}: ProductGridProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>(shopProducts);
  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    brand: initialBrandFilter,
    category: initialCategoryFilter,
    subcategory: initialSubcategoryFilter,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Usar location.state directamente como fuente de verdad para búsqueda
  const activeSearchQuery = location.state?.searchQuery || null;

  // Ref para acceder a filters actuales sin causar re-creación del callback
  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  console.log('ProductGrid render - activeSearchQuery:', activeSearchQuery, 'location.state:', location.state);

  // Update filters when initial filter props change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      brand: initialBrandFilter,
      category: initialCategoryFilter,
      subcategory: initialSubcategoryFilter,
    }));
  }, [initialBrandFilter, initialCategoryFilter, initialSubcategoryFilter]);

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
      // Delay el scroll para que coincida con el delay del filtrado
      const scrollTimeout = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
      return () => clearTimeout(scrollTimeout);
    }
  }, [filters.brand, filters.category, filters.subcategory, filters.maxPrice, isFirstRender]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('Filter effect triggered', { filters, isFirstRender, isLoading, activeSearchQuery });

    // Mostrar loading state cuando cambian los filtros (excepto en first render)
    if (!isFirstRender && !isLoading) {
      setIsFiltering(true);
    }

    const filterTimeout = setTimeout(() => {
      let result = [...shopProducts];

      // Search query filter - usar activeSearchQuery en lugar de searchQuery
      if (activeSearchQuery) {
        const query = activeSearchQuery.toLowerCase();
        result = result.filter((p) => {
          return (
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.subcategory.toLowerCase().includes(query)
          );
        });
      }

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

      console.log('Filtered products:', { count: result.length, filters });
      setFilteredProducts(result);
      console.log('Setting isFiltering to FALSE');
      setIsFiltering(false);
    }, 150); // Pequeño delay para suavizar la transición

    return () => clearTimeout(filterTimeout);
  }, [filters, activeSearchQuery, isFirstRender, isLoading]);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    const currentFilters = filtersRef.current;
    console.log('handleFiltersChange called', { newFilters, currentFilters, activeSearchQuery });

    // Verificar si los filtros realmente cambiaron
    const filtersChanged =
      newFilters.brand !== currentFilters.brand ||
      newFilters.category !== currentFilters.category ||
      newFilters.subcategory !== currentFilters.subcategory ||
      newFilters.maxPrice !== currentFilters.maxPrice;

    if (!filtersChanged) {
      console.log('Filters did not change, skipping');
      return;
    }

    // Los filtros cambiaron - es una acción del usuario
    if (activeSearchQuery) {
      // Hay búsqueda activa, navegar para limpiarla
      console.log('Clearing search and applying filters');
      navigate('/tienda', {
        state: {
          brandFilter: newFilters.brand,
          categoryFilter: newFilters.category,
          subcategoryFilter: newFilters.subcategory,
        },
        replace: true
      });
    } else {
      // No hay búsqueda activa, solo actualizar estado local
      console.log('Setting filters to:', newFilters);
      setFilters(newFilters);
    }
  }, [navigate, activeSearchQuery]);

  const clearSearch = () => {
    navigate('/tienda', {
      state: { resetFiltersTimestamp: Date.now() },
      replace: true
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white lg:bg-[#f9f9f9] min-h-screen">
      {/* Mobile: Search Results Header - Debajo de la barra de búsqueda */}
      {activeSearchQuery && (
        <div className="lg:hidden bg-white border-b border-[#e5e5e5] px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666]">Resultados para</p>
              <p className="text-base font-semibold text-[#222]">"{activeSearchQuery}"</p>
            </div>
            <button
              onClick={clearSearch}
              className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#222] transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>
      )}

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
            <div className="sticky top-0">
              {/* Desktop: Search Results Header - Encima de los filtros */}
              {activeSearchQuery && (
                <div className="bg-white rounded-lg border border-[#e5e5e5] p-4 mb-4">
                  <div className="mb-3">
                    <p className="text-xs text-[#666] mb-1">Resultados para</p>
                    <p className="text-base font-semibold text-[#222]">"{activeSearchQuery}"</p>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#222] transition-colors w-full justify-center py-2 border border-[#e5e5e5] rounded hover:bg-[#f5f5f5]"
                  >
                    <X className="w-4 h-4" />
                    <span>Limpiar búsqueda</span>
                  </button>
                </div>
              )}

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
            {console.log('Rendering products section - isLoading:', isLoading, 'isFiltering:', isFiltering, 'filteredProducts:', filteredProducts.length)}
            <div className="grid grid-cols-1 gap-0 lg:gap-4">
              {(isLoading || isFiltering)
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

            {!isLoading && !isFiltering && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#666] text-lg mb-2">
                  {filters.subcategory
                    ? `Sin productos en esta subcategoría`
                    : filters.category
                    ? `Sin productos en esta categoría`
                    : filters.brand
                    ? `Sin productos de esta marca`
                    : activeSearchQuery
                    ? `No se encontraron productos para "${activeSearchQuery}"`
                    : 'No se encontraron productos'}
                </p>
                <p className="text-[#999] text-sm">
                  {filters.subcategory && `"${filters.subcategory}" en ${filters.category}`}
                  {filters.category && !filters.subcategory && `"${filters.category}"`}
                  {filters.brand && `"${filters.brand}"`}
                  {!filters.subcategory && !filters.category && !filters.brand && 'Intenta ajustar los filtros de búsqueda'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
