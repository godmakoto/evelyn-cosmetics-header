import { useState, useEffect } from "react";
import { brands, categories, getSubcategories } from "@/data/shopProducts";
import { ChevronDown } from "lucide-react";

interface ShopFiltersProps {
  onFiltersChange: (filters: {
    maxPrice: number | null;
    brand: string | null;
    category: string | null;
    subcategory: string | null;
  }) => void;
  initialBrandFilter?: string | null;
}

const ShopFilters = ({ onFiltersChange, initialBrandFilter = null }: ShopFiltersProps) => {
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrandFilter);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<string[]>([]);

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
      className="bg-[#f9f9f9] border-b border-[#eaeaea] lg:border lg:rounded-xl"
    >
      <div className="max-w-[1200px] mx-auto px-3 py-6 md:px-4 md:py-4 lg:max-w-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className="text-[#222] font-semibold text-lg md:text-lg">Filtrar Productos</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#666] hover:text-[#e02b2b] transition-colors"
            >
              Limpiar Filtros
            </button>
          )}
        </div>

        {/* Precio Máximo */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 mb-2 md:gap-3 md:mb-3">
          <div>
            <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Precio Máximo</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Ej: 200"
              className="w-full h-10 md:h-10 px-3 md:px-3 rounded-xl border border-[#eaeaea] bg-white text-[#222] text-base md:text-sm
                focus:outline-none focus:border-[#222] transition-colors"
            />
          </div>

          {/* Marca */}
          <div>
            <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Marca</label>
            <div className="relative">
              <select
                value={selectedBrand || ""}
                onChange={(e) => handleBrandChange(e.target.value || null)}
                className="w-full h-10 md:h-10 px-3 md:px-3 pr-8 rounded-xl border border-[#eaeaea] bg-white text-[#222] text-base md:text-sm
                  appearance-none focus:outline-none focus:border-[#222] transition-colors cursor-pointer"
              >
                <option value="">Todas</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 md:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Categoría */}
        <div className="mb-3 md:mb-3">
          <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Categoría</label>
          <div className="relative">
            <select
              value={selectedCategory || ""}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
              className="w-full h-10 md:h-10 px-3 md:px-3 pr-8 rounded-xl border border-[#eaeaea] bg-white text-[#222] text-base md:text-sm
                appearance-none focus:outline-none focus:border-[#222] transition-colors cursor-pointer"
            >
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
          </div>
        </div>

        {/* Row 3: Subcategorías (solo visible cuando hay categoría seleccionada) */}
        {selectedCategory && subcategories.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Tipo de Producto</label>
            <div className="relative">
              <select
                value={selectedSubcategory || ""}
                onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                className="w-full h-10 md:h-10 px-3 md:px-3 pr-8 rounded-xl border border-[#eaeaea] bg-white text-[#222] text-base md:text-sm
                  appearance-none focus:outline-none focus:border-[#222] transition-colors cursor-pointer"
              >
                <option value="">Todos</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilters;
