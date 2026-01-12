-- Migration: Convert singular category/subcategory to plural arrays
-- Este script convierte las columnas category (string) y subcategory (string)
-- a categories (jsonb array) y subcategories (jsonb array) para sincronizar
-- con el panel de administración.

-- IMPORTANTE: Ejecuta este script en Supabase SQL Editor antes de actualizar el código

-- 1. Agregar nuevas columnas si no existen
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS categories jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS subcategories jsonb DEFAULT '[]'::jsonb;

-- 2. Migrar datos existentes de category a categories (singular -> array)
UPDATE public.products
SET categories =
  CASE
    WHEN category IS NOT NULL AND category != ''
    THEN jsonb_build_array(category)
    ELSE '[]'::jsonb
  END
WHERE categories = '[]'::jsonb;

-- 3. Migrar datos existentes de subcategory a subcategories (singular -> array)
UPDATE public.products
SET subcategories =
  CASE
    WHEN subcategory IS NOT NULL AND subcategory != ''
    THEN jsonb_build_array(subcategory)
    ELSE '[]'::jsonb
  END
WHERE subcategories = '[]'::jsonb;

-- 4. Crear índices para mejor rendimiento con arrays JSONB
CREATE INDEX IF NOT EXISTS idx_products_categories ON public.products USING GIN (categories);
CREATE INDEX IF NOT EXISTS idx_products_subcategories ON public.products USING GIN (subcategories);

-- 5. Verificar la migración (opcional - ejecuta esto para verificar)
-- SELECT
--   product_id,
--   category as old_category,
--   categories as new_categories,
--   subcategory as old_subcategory,
--   subcategories as new_subcategories
-- FROM public.products
-- LIMIT 10;

-- NOTA: Las columnas antiguas (category, subcategory) se mantienen por compatibilidad.
-- Una vez verificado que todo funciona, puedes eliminarlas con:
-- ALTER TABLE public.products DROP COLUMN IF EXISTS category;
-- ALTER TABLE public.products DROP COLUMN IF EXISTS subcategory;
