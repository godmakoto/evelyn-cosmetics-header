-- Script para llenar las descripciones cortas automáticamente
-- Toma la primera línea de long_description para crear description
-- Solo actualiza productos donde description es NULL

-- Función auxiliar para extraer la primera línea o primeras 200 caracteres
-- con comportamiento inteligente
UPDATE products
SET description = CASE
  -- Si la descripción larga es NULL o vacía, dejar NULL
  WHEN long_description IS NULL OR trim(long_description) = '' THEN NULL

  -- Si la primera línea es muy corta (menos de 50 chars), tomar más contenido
  WHEN length(split_part(long_description, E'\n', 1)) < 50 THEN
    CASE
      -- Si el contenido completo es corto, usarlo todo
      WHEN length(long_description) <= 200 THEN trim(long_description)
      -- Si no, tomar 200 caracteres y agregar '...'
      ELSE substring(trim(long_description), 1, 197) || '...'
    END

  -- Si la primera línea tiene buen tamaño (50-200 chars), usarla
  WHEN length(split_part(long_description, E'\n', 1)) <= 200 THEN
    trim(split_part(long_description, E'\n', 1))

  -- Si la primera línea es muy larga, cortarla en 200 caracteres
  ELSE substring(trim(split_part(long_description, E'\n', 1)), 1, 197) || '...'
END
WHERE description IS NULL
  AND long_description IS NOT NULL
  AND trim(long_description) != '';

-- Mostrar cuántos productos se actualizaron
-- (Ejecuta esto después del UPDATE para ver el resultado)
SELECT
  COUNT(*) as productos_actualizados,
  'Descripciones cortas creadas exitosamente' as mensaje
FROM products
WHERE description IS NOT NULL
  AND long_description IS NOT NULL;
