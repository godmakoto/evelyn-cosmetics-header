-- Tabla de productos para Evelyn Cosmetics
-- Ejecutar este script en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  offer_price NUMERIC,
  regular_price NUMERIC NOT NULL,
  description TEXT,
  images JSONB DEFAULT '[]'::jsonb,

  -- Estados del producto
  is_featured BOOLEAN DEFAULT false,
  is_back_in_stock BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,

  -- Gestión de inventario
  stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  in_stock BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_products_product_id ON products(product_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_is_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_products_is_back_in_stock ON products(is_back_in_stock) WHERE is_back_in_stock = true;
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock) WHERE in_stock = true;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Enable read access for all users" ON products
    FOR SELECT USING (true);

-- Política: Permitir inserción solo con autenticación (opcional, ajustar según necesidad)
CREATE POLICY "Enable insert for authenticated users only" ON products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política: Permitir actualización solo con autenticación (opcional, ajustar según necesidad)
CREATE POLICY "Enable update for authenticated users only" ON products
    FOR UPDATE USING (auth.role() = 'authenticated');
