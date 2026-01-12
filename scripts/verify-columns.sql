-- Verificar las columnas que existen en la tabla products
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'products'
  AND column_name IN ('category', 'categories', 'subcategory', 'subcategories')
ORDER BY column_name;
