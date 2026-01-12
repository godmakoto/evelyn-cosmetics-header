-- Script para verificar que categories y subcategories están funcionando correctamente
-- Ejecuta esto en Supabase SQL Editor

-- 1. Ver los primeros 10 productos con sus categorías y subcategorías
SELECT
  product_id,
  title,
  categories,
  subcategories
FROM public.products
LIMIT 10;

-- 2. Ver cuántos productos tienen categorías vs cuántos no
SELECT
  CASE
    WHEN categories IS NOT NULL AND categories != '[]'::jsonb THEN 'Con categorías'
    ELSE 'Sin categorías'
  END as estado,
  COUNT(*) as cantidad
FROM public.products
GROUP BY estado;

-- 3. Ver todas las categorías únicas en la base de datos
SELECT DISTINCT jsonb_array_elements_text(categories) as categoria
FROM public.products
WHERE categories IS NOT NULL AND categories != '[]'::jsonb
ORDER BY categoria;

-- 4. Ver todas las subcategorías únicas en la base de datos
SELECT DISTINCT jsonb_array_elements_text(subcategories) as subcategoria
FROM public.products
WHERE subcategories IS NOT NULL AND subcategories != '[]'::jsonb
ORDER BY subcategoria;

-- 5. Ver productos que tienen múltiples categorías (útil para verificar)
SELECT
  product_id,
  title,
  categories,
  jsonb_array_length(categories) as num_categorias
FROM public.products
WHERE jsonb_array_length(categories) > 1
LIMIT 10;
