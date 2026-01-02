-- Script para marcar productos aleatoriamente para carruseles
-- Ejecutar este script en SQL Editor de Supabase

-- 1. Marcar 20 productos aleatorios como DESTACADOS
UPDATE products
SET is_featured = true
WHERE product_id IN (
  SELECT product_id
  FROM products
  WHERE in_stock = true
  ORDER BY RANDOM()
  LIMIT 20
);

-- 2. Marcar 30 productos aleatorios como EN OFERTA
UPDATE products
SET is_on_sale = true
WHERE product_id IN (
  SELECT product_id
  FROM products
  WHERE in_stock = true
  ORDER BY RANDOM()
  LIMIT 30
);

-- 3. Marcar 15 productos aleatorios como DE VUELTA EN STOCK
UPDATE products
SET is_back_in_stock = true
WHERE product_id IN (
  SELECT product_id
  FROM products
  WHERE in_stock = true
  ORDER BY RANDOM()
  LIMIT 15
);

-- 4. Marcar 25 productos aleatorios como MÁS VENDIDOS
UPDATE products
SET is_best_seller = true
WHERE product_id IN (
  SELECT product_id
  FROM products
  WHERE in_stock = true
  ORDER BY RANDOM()
  LIMIT 25
);

-- Verificar resultados
SELECT
  COUNT(CASE WHEN is_featured = true THEN 1 END) as destacados,
  COUNT(CASE WHEN is_on_sale = true THEN 1 END) as en_oferta,
  COUNT(CASE WHEN is_back_in_stock = true THEN 1 END) as vuelta_en_stock,
  COUNT(CASE WHEN is_best_seller = true THEN 1 END) as mas_vendidos,
  COUNT(*) as total_productos
FROM products;
