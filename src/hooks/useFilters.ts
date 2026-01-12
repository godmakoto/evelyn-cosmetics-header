import { useMemo } from "react";
import { useProducts } from "./useProducts";

/**
 * Hook to get unique brands from Supabase products
 * Filters out null/empty brands and sorts alphabetically
 */
export const useBrands = () => {
  const { data: products, isLoading } = useProducts();

  const brands = useMemo(() => {
    if (!products) return [];

    const uniqueBrands = [...new Set(
      products
        .map(p => p.brand)
        .filter(brand => brand && brand.trim() !== '')
    )];

    return uniqueBrands.sort((a, b) => a!.localeCompare(b!));
  }, [products]);

  return { brands, isLoading };
};

/**
 * Hook to get unique categories from Supabase products
 * Filters out null/empty categories and sorts alphabetically
 */
export const useCategories = () => {
  const { data: products, isLoading } = useProducts();

  const categories = useMemo(() => {
    if (!products) return [];

    const uniqueCategories = [...new Set(
      products
        .map(p => p.category)
        .filter(category => category && category.trim() !== '')
    )];

    return uniqueCategories.sort((a, b) => a!.localeCompare(b!));
  }, [products]);

  return { categories, isLoading };
};

/**
 * Hook to get unique subcategories for a specific category
 * @param categoryName - The category to get subcategories for
 */
export const useSubcategories = (categoryName: string | null) => {
  const { data: products, isLoading } = useProducts();

  const subcategories = useMemo(() => {
    if (!products || !categoryName) return [];

    const uniqueSubcategories = [...new Set(
      products
        .filter(p => p.category === categoryName)
        .map(p => p.subcategory)
        .filter(sub => sub && sub.trim() !== '')
    )];

    return uniqueSubcategories.sort((a, b) => a!.localeCompare(b!));
  }, [products, categoryName]);

  return { subcategories, isLoading };
};
