import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { brands, categories } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  activeFilterText: string;
  onClear: () => void;
}

const FilterSection = ({
  maxPrice,
  setMaxPrice,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  sortBy,
  setSortBy,
  activeFilterText,
  onClear,
}: FilterSectionProps) => {
  const [isVisible] = useState(true);

  const filterRef = useRef<HTMLDivElement | null>(null);
  const [filterHeight, setFilterHeight] = useState(220);

  useLayoutEffect(() => {
    const el = filterRef.current;
    if (!el) return;

    const update = () => {
      const next = Math.ceil(el.getBoundingClientRect().height);
      setFilterHeight(next);
    };

    update();

    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Filter section stays fixed (no hide on scroll)

  const subcategories = selectedCategory ? categories[selectedCategory] || [] : [];

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value === "all" ? "" : value);
    setMaxPrice("");
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value);
    setSelectedBrand("");
    setMaxPrice("");
    setSelectedSubcategory("");
  };

  const handlePriceChange = (value: string) => {
    setMaxPrice(value);
    if (value) {
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedSubcategory("");
    }
  };

  return (
      <div
        ref={filterRef}
        className="bg-[#fafafa] border-b border-[#e0e0e0] px-4 pt-6 pb-4 sm:py-4"
      >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="hidden sm:flex items-center justify-between mb-4 py-1">
          <h2 className="text-sm font-medium text-[#1a1a1a] uppercase tracking-wide">
            Filtros
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs text-[#666] hover:text-[#1a1a1a] hover:bg-transparent"
          >
            <X className="w-3 h-3 mr-1" />
            Limpiar
          </Button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Price */}
          <div>
            <label className="text-xs text-[#666] mb-1 block">Precio máximo</label>
            <Input
              type="number"
              placeholder="Ej: 200"
              value={maxPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="h-9 text-sm bg-white border-[#e0e0e0] focus:border-[#999] focus:ring-0"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="text-xs text-[#666] mb-1 block">Marca</label>
            <Select value={selectedBrand || "all"} onValueChange={handleBrandChange}>
              <SelectTrigger className="h-9 text-sm bg-white border-[#e0e0e0] focus:ring-0">
                <SelectValue placeholder="Todas las marcas" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">Todas las marcas</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category - Full Width */}
        <div className="mb-3">
          <label className="text-xs text-[#666] mb-1 block">Categoría</label>
          <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
            <SelectTrigger className="h-9 text-sm bg-white border-[#e0e0e0] focus:ring-0">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas las categorías</SelectItem>
              {Object.keys(categories).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory - Animated */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            subcategories.length > 0 ? "max-h-20 opacity-100 mb-3" : "max-h-0 opacity-0"
          }`}
        >
          <label className="text-xs text-[#666] mb-1 block">Subcategoría</label>
          <Select
            value={selectedSubcategory || "all"}
            onValueChange={(v) => setSelectedSubcategory(v === "all" ? "" : v)}
          >
            <SelectTrigger className="h-9 text-sm bg-white border-[#e0e0e0] focus:ring-0">
              <SelectValue placeholder="Todas las subcategorías" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas las subcategorías</SelectItem>
              {subcategories.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bottom Row */}
        <div className="hidden sm:flex items-center justify-between pt-3 border-t border-[#e0e0e0]">
          <p className="text-xs text-[#666]">
            Mostrando: <span className="text-[#1a1a1a]">{activeFilterText}</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666]">Ordenar por:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-8 text-xs bg-white border-[#e0e0e0] focus:ring-0 w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="relevance">Relevancia</SelectItem>
                <SelectItem value="price-asc">Precio menor a mayor</SelectItem>
                <SelectItem value="price-desc">Precio mayor a menor</SelectItem>
                <SelectItem value="discount">Mayor descuento</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
