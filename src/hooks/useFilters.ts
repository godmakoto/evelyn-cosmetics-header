import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook para obtener todas las marcas desde la tabla brands de Supabase
 * Retorna las marcas ordenadas alfabéticamente
 */
export const useBrands = () => {
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("name")
        .order("name", { ascending: true });

      if (error) throw error;
      return data.map((brand) => brand.name);
    },
  });

  return { brands, isLoading };
};

/**
 * Hook para obtener todas las categorías con sus subcategorías desde Supabase
 * Retorna un array de objetos { name, subcategories }
 */
export const useCategories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories-with-subcategories"],
    queryFn: async () => {
      // Obtener todas las categorías
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("id, name")
        .order("name", { ascending: true });

      if (categoriesError) throw categoriesError;

      // Obtener todas las subcategorías
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from("subcategories")
        .select("name, category_id")
        .order("name", { ascending: true });

      if (subcategoriesError) throw subcategoriesError;

      // Mapear categorías con sus subcategorías
      return categoriesData.map((category) => ({
        name: category.name,
        subcategories: subcategoriesData
          .filter((sub) => sub.category_id === category.id)
          .map((sub) => sub.name),
      }));
    },
  });

  return { categories, isLoading };
};

/**
 * Hook para obtener las subcategorías de una categoría específica
 * @param categoryName - Nombre de la categoría
 */
export const useSubcategories = (categoryName: string | null) => {
  const { data: subcategories = [], isLoading } = useQuery({
    queryKey: ["subcategories", categoryName],
    queryFn: async () => {
      if (!categoryName) return [];

      // Primero obtener el ID de la categoría
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("name", categoryName)
        .single();

      if (categoryError) throw categoryError;
      if (!categoryData) return [];

      // Obtener las subcategorías de esa categoría
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from("subcategories")
        .select("name")
        .eq("category_id", categoryData.id)
        .order("name", { ascending: true });

      if (subcategoriesError) throw subcategoriesError;

      return subcategoriesData.map((sub) => sub.name);
    },
    enabled: !!categoryName,
  });

  return { subcategories, isLoading };
};
