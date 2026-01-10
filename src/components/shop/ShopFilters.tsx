import { useState, useEffect } from "react";
import { brands } from "@/data/shopProducts";
import { categories, getSubcategories } from "@/data/categories";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShopFiltersProps {
  onFiltersChange: (filters: {
    maxPrice: number | null;
    brand: string | null;
    category: string | null;
    subcategory: string | null;
    status: string | null;
  }) => void;
  initialBrandFilter?: string | null;
  initialCategoryFilter?: string | null;
  initialSubcategoryFilter?: string | null;
  initialStatusFilter?: string | null;
  resetFiltersTimestamp?: number | null;
}

const ShopFilters = ({
  onFiltersChange,
  initialBrandFilter = null,
  initialCategoryFilter = null,
  initialSubcategoryFilter = null,
  initialStatusFilter = null,
  resetFiltersTimestamp = null
}: ShopFiltersProps) => {
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrandFilter);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategoryFilter);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(initialSubcategoryFilter);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(initialStatusFilter);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  // Update filters when initial filter props change
  useEffect(() => {
    setSelectedBrand(initialBrandFilter);
    setSelectedCategory(initialCategoryFilter);
    setSelectedSubcategory(initialSubcategoryFilter);
    setSelectedStatus(initialStatusFilter);
  }, [initialBrandFilter, initialCategoryFilter, initialSubcategoryFilter, initialStatusFilter]);

  // Reset all filter states when resetFiltersTimestamp changes
  useEffect(() => {
    if (resetFiltersTimestamp) {
      setMaxPrice("");
      setSelectedBrand(null);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSelectedStatus(null);
    }
  }, [resetFiltersTimestamp]);

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
      status: selectedStatus,
    });
  }, [maxPrice, selectedBrand, selectedCategory, selectedSubcategory, selectedStatus, onFiltersChange]);

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
    setSelectedStatus(null);
  };

  const hasActiveFilters = maxPrice || selectedBrand || selectedCategory || selectedSubcategory || selectedStatus;

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
        <div className="mb-2 md:mb-3">
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
        <div className="mb-2 md:mb-3">
          <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Marca</label>
          <Select value={selectedBrand || "all"} onValueChange={(value) => handleBrandChange(value === "all" ? null : value)}>
            <SelectTrigger className="w-full h-10 md:h-10 rounded-xl border-[#eaeaea] text-base md:text-sm">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent side="bottom" align="start" avoidCollisions={false} className="rounded-xl">
              <SelectItem value="all" className="text-base md:text-sm">Todas</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand} className="text-base md:text-sm">
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Categoría */}
        <div className="mb-3 md:mb-3">
          <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Categoría</label>
          <Select value={selectedCategory || "all"} onValueChange={(value) => handleCategoryChange(value === "all" ? null : value)}>
            <SelectTrigger className="w-full h-10 md:h-10 rounded-xl border-[#eaeaea] text-base md:text-sm">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent side="bottom" align="start" avoidCollisions={false} className="rounded-xl">
              <SelectItem value="all" className="text-base md:text-sm">Todas</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name} className="text-base md:text-sm">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategorías (solo visible cuando hay categoría seleccionada) */}
        {selectedCategory && subcategories.length > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-sm md:text-xs text-[#666] mb-1.5 md:mb-1">Tipo de Producto</label>
            <Select value={selectedSubcategory || "all"} onValueChange={(value) => setSelectedSubcategory(value === "all" ? null : value)}>
              <SelectTrigger className="w-full h-10 md:h-10 rounded-xl border-[#eaeaea] text-base md:text-sm">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent side="bottom" align="start" avoidCollisions={false} className="rounded-xl">
                <SelectItem value="all" className="text-base md:text-sm">Todos</SelectItem>
                {subcategories.map((sub) => (
                  <SelectItem key={sub} value={sub} className="text-base md:text-sm">
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilters;
