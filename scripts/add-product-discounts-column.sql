-- Agregar columna product_discounts a la tabla orders
-- Esta columna almacenará los descuentos automáticos de productos
-- mientras que 'discount' se usa para descuentos manuales adicionales

-- 1. Agregar columna product_discounts si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'orders'
    AND column_name = 'product_discounts'
  ) THEN
    ALTER TABLE public.orders
    ADD COLUMN product_discounts numeric DEFAULT 0;

    RAISE NOTICE 'Columna product_discounts agregada exitosamente';
  ELSE
    RAISE NOTICE 'La columna product_discounts ya existe';
  END IF;
END $$;

-- 2. Verificar la estructura actualizada
SELECT
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'orders'
  AND column_name IN ('subtotal', 'discount', 'product_discounts', 'total')
ORDER BY ordinal_position;

-- 3. Mensaje de confirmación
SELECT
  'Columna product_discounts agregada exitosamente' as mensaje,
  COUNT(*) as total_pedidos_existentes
FROM public.orders;
