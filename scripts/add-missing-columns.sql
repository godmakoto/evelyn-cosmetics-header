-- Script para agregar las columnas faltantes a la tabla products
-- Verifica si existen antes de agregarlas para evitar errores

-- 1. Agregar columna 'description' (Descripción corta)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'description'
    ) THEN
        ALTER TABLE products ADD COLUMN description text;
        RAISE NOTICE 'Columna "description" agregada exitosamente';
    ELSE
        RAISE NOTICE 'Columna "description" ya existe';
    END IF;
END $$;

-- 2. Agregar columna 'usage_instructions' (Modo de uso)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'usage_instructions'
    ) THEN
        ALTER TABLE products ADD COLUMN usage_instructions text;
        RAISE NOTICE 'Columna "usage_instructions" agregada exitosamente';
    ELSE
        RAISE NOTICE 'Columna "usage_instructions" ya existe';
    END IF;
END $$;

-- 3. Agregar columna 'ingredients' (Ingredientes)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'products' AND column_name = 'ingredients'
    ) THEN
        ALTER TABLE products ADD COLUMN ingredients text;
        RAISE NOTICE 'Columna "ingredients" agregada exitosamente';
    ELSE
        RAISE NOTICE 'Columna "ingredients" ya existe';
    END IF;
END $$;

-- Verificar las columnas agregadas
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN ('description', 'usage_instructions', 'ingredients', 'long_description')
ORDER BY column_name;
