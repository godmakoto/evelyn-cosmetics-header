import { useState, useEffect, useRef } from "react";
import { brands, categories, getSubcategories } from "@/data/shopProducts";
import { ChevronDown } from "lucide-react";

interface ShopFiltersProps {
  onFiltersChange: (filters: {
    maxPrice: number | null;
    brand: string | null;
    category: string | null;
    subcategory: string | null;
  }) => void;
}

const ShopFilters = ({ onFiltersChange }: ShopFiltersProps) => {
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  
  // Smart sticky logic
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setSubcategories(getSubcategories(selectedCategory));
    } else {
      setSubcategories([]);
      setSelectedSubcategory(null);
    }
  }, [selectedCategory]);

  useEffect(() => {
    onFiltersChange({
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
      brand: selectedBrand,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    });
  }, [maxPrice, selectedBrand, selectedCategory, selectedSubcategory, onFiltersChange]);

  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    // Reset category when brand is selected (exclusion logic)
    if (brand) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    // Reset brand when category is selected (exclusion logic)
    if (category) {
      setSelectedBrand(null);
    }
  };

  const clearFilters = () => {
    setMaxPrice("");
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const hasActiveFilters = maxPrice || selectedBrand || selectedCategory || selectedSubcategory;

  return (
    <div
      ref={filterRef}
      className={`
        sticky top-0 z-40 bg-[#f9f9f9] border-b border-[#eaeaea]
        transition-transform duration-300 ease-in-out
        md:relative md:transform-none
        ${isVisible ? "translate-y-0" : "-translate-y-full md:translate-y-0"}
      `}
    >
      <div className="max-w-[1200px] mx-auto px-3 py-2 sm:px-4 sm:py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <h2 className="text-[#222] font-semibold text-sm sm:text-lg">Filtrar Productos</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs sm:text-sm text-[#666] hover:text-[#e02b2b] transition-colors"
            >
              Limpiar Filtros
            </button>
          )}
        </div>

        {/* Row 1: Precio Máximo + Marca */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
          {/* Max Price Input */}
          <div>
            <label className="block text-[10px] sm:text-xs text-[#666] mb-1 sm:mb-1.5">Precio Máximo</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Ej: 200"
              className="w-full h-8 sm:h-10 px-2 sm:px-3 rounded-lg sm:rounded-xl border border-[#eaeaea] bg-white text-[#222] text-xs sm:text-sm
                focus:outline-none focus:border-[#222] transition-colors"
            />
          </div>

          {/* Brand Dropdown */}
          <div>
            <label className="block text-[10px] sm:text-xs text-[#666] mb-1 sm:mb-1.5">Marca</label>
            <div className="relative">
              <select
                value={selectedBrand || ""}
                onChange={(e) => handleBrandChange(e.target.value || null)}
                className="w-full h-8 sm:h-10 px-2 sm:px-3 pr-6 sm:pr-8 rounded-lg sm:rounded-xl border border-[#eaeaea] bg-white text-[#222] text-xs sm:text-sm
                  appearance-none focus:outline-none focus:border-[#222] transition-colors cursor-pointer"
              >
                <option value="">Todas</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#666] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Categoría */}
        <div className="mb-2 sm:mb-3">
          <label className="block text-[10px] sm:text-xs text-[#666] mb-1 sm:mb-1.5">Categoría</label>
          <div className="relative">
            <select
              value={selectedCategory || ""}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
              className="w-full h-8 sm:h-10 px-2 sm:px-3 pr-6 sm:pr-8 rounded-lg sm:rounded-xl border border-[#eaeaea] bg-white text-[#222] text-xs sm:text-sm
                appearance-none focus:outline-none focus:border-[#222] transition-colors cursor-pointer"
            >
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#666] pointer-events-none" />
          </div>
        </div>

        {/* Row 3: Subcategorías (solo visible cuando hay categoría seleccionada) */}
        {selectedCategory && subcategories.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-[10px] sm:text-xs text-[#666] mb-1 sm:mb-1.5">Tipo de Producto</label>
            <div className="relative">
              <select
                value={selectedSubcategory || ""}
                onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                className="w-full h-8 sm:h-10 px-2 sm:px-3 pr-6 sm:pr-8 rounded-lg sm:rounded-xl border border-[#eaeaea] bg-white text-[#222] text-xs sm:text-sm
                  appearance-none focus:outline-none focus:border-[#222] transition-colors cursor-pointer"
              >
                <option value="">Todos</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#666] pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilters;
