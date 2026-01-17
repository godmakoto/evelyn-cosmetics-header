import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { ShopProduct } from "@/data/shopProducts";
import { useProducts, Product } from "@/hooks/useProducts";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/constants";
import { getFirstCategory, getFirstSubcategory, getAllCategories, getAllSubcategories, hasCategory, hasSubcategory } from "@/utils/productHelpers";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const PRODUCTS_PER_PAGE = 20;

// Helper function to convert Supabase Product to ShopProduct
const convertToShopProduct = (product: Product): ShopProduct => {
  return {
    id: product.id,
    name: product.title,
    brand: product.brand || "Sin marca",
    category: getFirstCategory(product) || "Sin categoría",
    subcategory: getFirstSubcategory(product) || "General",
    price: product.offer_price || product.regular_price,
    originalPrice: product.offer_price ? product.regular_price : undefined,
    description: product.description || product.long_description || "",
    image: product.image_1 || DEFAULT_PRODUCT_IMAGE,
    discount: product.offer_price
      ? Math.round(((product.regular_price - product.offer_price) / product.regular_price) * 100)
      : undefined,
    isBestSeller: product.is_best_seller || false,
    isFeatured: product.is_featured || false,
    isBackInStock: product.is_back_in_stock || false,
  };
};

interface ProductGridProps {
  initialBrandFilter?: string | null;
  initialCategoryFilter?: string | null;
  initialSubcategoryFilter?: string | null;
  resetFiltersTimestamp?: number | null;
  searchQuery?: string | null;
  statusFilter?: string | null;
  carouselStateFilter?: string | null;
}

const ProductGrid = ({
  initialBrandFilter = null,
  initialCategoryFilter = null,
  initialSubcategoryFilter = null,
  resetFiltersTimestamp = null,
  searchQuery = null,
  statusFilter = null,
  carouselStateFilter = null
}: ProductGridProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: productsData, isLoading: isLoadingProducts } = useProducts();
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ShopProduct[]>([]);
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    brand: initialBrandFilter,
    category: initialCategoryFilter,
    subcategory: initialSubcategoryFilter,
    status: statusFilter,
    carouselState: carouselStateFilter,
  });
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Usar location.state directamente como fuente de verdad para búsqueda
  const activeSearchQuery = location.state?.searchQuery || null;

  // Mantener productos originales de Supabase para filtrar por arrays
  const visibleProducts = useMemo(() => {
    if (!productsData) return [];
    return productsData.filter(product => !product.is_hidden);
  }, [productsData]);

  // Convert Supabase products to ShopProduct format
  const shopProducts = useMemo(() => {
    return visibleProducts.map(convertToShopProduct);
  }, [visibleProducts]);

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
        status: null,
        carouselState: null,
      });
    }
  }, [resetFiltersTimestamp]);

  // Reset displayed count when filters or search changes
  useEffect(() => {
    setDisplayedCount(PRODUCTS_PER_PAGE);
  }, [filters, activeSearchQuery]);

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
  }, [filters.brand, filters.category, filters.subcategory, filters.maxPrice, filters.status, filters.carouselState, isFirstRender]);

  useEffect(() => {
    console.log('Filter effect triggered', { filters, isFirstRender, isLoadingProducts, activeSearchQuery });

    // Mostrar loading state cuando cambian los filtros (excepto en first render)
    if (!isFirstRender && !isLoadingProducts) {
      setIsFiltering(true);
    }

    const filterTimeout = setTimeout(() => {
      // Filtrar sobre productos originales de Supabase para búsquedas en arrays
      let resultProducts = [...visibleProducts];

      // Search query filter - buscar en todos los arrays
      if (activeSearchQuery) {
        const query = activeSearchQuery.toLowerCase();
        resultProducts = resultProducts.filter((p) => {
          const categories = getAllCategories(p);
          const subcategories = getAllSubcategories(p);

          return (
            p.title.toLowerCase().includes(query) ||
            (p.brand && p.brand.toLowerCase().includes(query)) ||
            categories.some(cat => cat.toLowerCase().includes(query)) ||
            subcategories.some(sub => sub.toLowerCase().includes(query))
          );
        });
      }

      if (filters.maxPrice) {
        resultProducts = resultProducts.filter((p) => (p.offer_price || p.regular_price) <= filters.maxPrice!);
      }
      if (filters.brand) {
        resultProducts = resultProducts.filter((p) => p.brand === filters.brand);
      }
      if (filters.category) {
        // Buscar en todos los arrays de categorías
        resultProducts = resultProducts.filter((p) => hasCategory(p, filters.category!));
      }
      if (filters.subcategory) {
        // Buscar en todos los arrays de subcategorías
        resultProducts = resultProducts.filter((p) => hasSubcategory(p, filters.subcategory!));
      }
      if (filters.status) {
        resultProducts = resultProducts.filter((p) => {
          if (filters.status === 'best-seller') return p.is_best_seller;
          if (filters.status === 'featured') return p.is_featured;
          if (filters.status === 'back-in-stock') return p.is_back_in_stock;
          return true;
        });
      }
      if (filters.carouselState) {
        resultProducts = resultProducts.filter((p) => p.carousel_state === filters.carouselState);
      }

      // Convertir productos filtrados a ShopProduct
      const result = resultProducts.map(convertToShopProduct);

      console.log('Filtered products:', { count: result.length, filters });
      setFilteredProducts(result);
      console.log('Setting isFiltering to FALSE');
      setIsFiltering(false);
    }, 150); // Pequeño delay para suavizar la transición

    return () => clearTimeout(filterTimeout);
  }, [filters, activeSearchQuery, isFirstRender, isLoadingProducts, visibleProducts]);

  // Infinite scroll: Load more products when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoadingProducts && !isFiltering && !isLoadingMore) {
          // Check if there are more products to load
          if (displayedCount < filteredProducts.length) {
            setIsLoadingMore(true);
            // Simulate loading delay for smooth UX
            setTimeout(() => {
              setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length));
              setIsLoadingMore(false);
            }, 300);
          }
        }
      },
      {
        root: null,
        rootMargin: '200px', // Start loading 200px before reaching the bottom
        threshold: 0.1,
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [displayedCount, filteredProducts.length, isLoadingProducts, isFiltering, isLoadingMore]);

  const handleFiltersChange = useCallback((newFilters: typeof filters) => {
    const currentFilters = filtersRef.current;
    console.log('handleFiltersChange called', { newFilters, currentFilters, activeSearchQuery });

    // Verificar si los filtros realmente cambiaron
    const filtersChanged =
      newFilters.brand !== currentFilters.brand ||
      newFilters.category !== currentFilters.category ||
      newFilters.subcategory !== currentFilters.subcategory ||
      newFilters.maxPrice !== currentFilters.maxPrice ||
      newFilters.status !== currentFilters.status ||
      newFilters.carouselState !== currentFilters.carouselState;

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
          initialStatusFilter={statusFilter}
          initialCarouselStateFilter={carouselStateFilter}
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
                initialStatusFilter={statusFilter}
                initialCarouselStateFilter={carouselStateFilter}
                resetFiltersTimestamp={resetFiltersTimestamp}
              />
            </div>
          </aside>

          {/* Productos */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-0 lg:gap-4">
              {(isLoadingProducts || isFiltering)
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="border-b border-b-[#eee] last:border-b-0 lg:border-b-0">
                      <div className="py-4 lg:py-0">
                        <ProductSkeleton />
                      </div>
                    </div>
                  ))
                : filteredProducts.slice(0, displayedCount).map((product) => (
                    <div key={product.id} className="border-b border-b-[#eee] last:border-b-0 lg:border-b-0">
                      <div className="py-4 lg:py-0">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  ))}
            </div>

            {/* Products count indicator */}
            {!isLoadingProducts && !isFiltering && filteredProducts.length > 0 && (
              <div className="text-center py-6 text-sm text-[#666]">
                Mostrando {Math.min(displayedCount, filteredProducts.length)} de {filteredProducts.length} productos
              </div>
            )}

            {/* Load more trigger element */}
            {!isLoadingProducts && !isFiltering && displayedCount < filteredProducts.length && (
              <div ref={loadMoreRef} className="py-8">
                {isLoadingMore && (
                  <div className="grid grid-cols-1 gap-0 lg:gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="border-b border-b-[#eee] last:border-b-0 lg:border-b-0">
                        <div className="py-4 lg:py-0">
                          <ProductSkeleton />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {!isLoadingProducts && !isFiltering && filteredProducts.length === 0 && (
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
