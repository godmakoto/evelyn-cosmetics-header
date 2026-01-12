/**
 * Helpers para trabajar con productos que tienen categories y subcategories como arrays JSONB
 */

/**
 * Convierte un valor JSONB a un array de strings
 * Maneja tanto arrays como strings singulares para retrocompatibilidad
 */
export function jsonbToStringArray(jsonb: any): string[] {
  if (!jsonb) return [];

  // Si ya es un array, devolverlo (asumiendo que es array de strings)
  if (Array.isArray(jsonb)) {
    return jsonb.filter((item) => typeof item === 'string' && item.trim() !== '');
  }

  // Si es un string, convertir a array de un elemento
  if (typeof jsonb === 'string' && jsonb.trim() !== '') {
    return [jsonb];
  }

  return [];
}

/**
 * Obtiene la primera categoría de un producto
 * Útil para componentes que solo necesitan mostrar una categoría
 */
export function getFirstCategory(product: { categories?: any }): string | null {
  if (product.categories) {
    const categories = jsonbToStringArray(product.categories);
    return categories[0] || null;
  }
  return null;
}

/**
 * Obtiene todas las categorías de un producto
 */
export function getAllCategories(product: { categories?: any }): string[] {
  if (product.categories) {
    return jsonbToStringArray(product.categories);
  }
  return [];
}

/**
 * Obtiene la primera subcategoría de un producto
 */
export function getFirstSubcategory(product: { subcategories?: any }): string | null {
  if (product.subcategories) {
    const subcategories = jsonbToStringArray(product.subcategories);
    return subcategories[0] || null;
  }
  return null;
}

/**
 * Obtiene todas las subcategorías de un producto
 */
export function getAllSubcategories(product: { subcategories?: any }): string[] {
  if (product.subcategories) {
    return jsonbToStringArray(product.subcategories);
  }
  return [];
}

/**
 * Verifica si un producto tiene una categoría específica
 */
export function hasCategory(product: { categories?: any }, categoryName: string): boolean {
  const categories = getAllCategories(product);
  return categories.some((cat) => cat.toLowerCase() === categoryName.toLowerCase());
}

/**
 * Verifica si un producto tiene una subcategoría específica
 */
export function hasSubcategory(product: { subcategories?: any }, subcategoryName: string): boolean {
  const subcategories = getAllSubcategories(product);
  return subcategories.some((sub) => sub.toLowerCase() === subcategoryName.toLowerCase());
}
