-- Crear tabla de pedidos (orders) - VERSIÓN SIMPLIFICADA
-- Esta versión no requiere la tabla admin_users

-- 1. Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,

  -- Información del cliente
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  customer_address text,

  -- Productos del pedido (array JSONB con items)
  items jsonb NOT NULL DEFAULT '[]'::jsonb,

  -- Totales
  subtotal numeric NOT NULL,
  discount numeric DEFAULT 0,
  total numeric NOT NULL,

  -- Estado del pedido
  status_id uuid REFERENCES public.order_statuses(id),

  -- Información adicional
  notes text,
  payment_method text,

  -- Metadatos
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  CONSTRAINT orders_pkey PRIMARY KEY (id)
);

-- 2. Crear índices
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status_id ON public.orders(status_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);

-- 3. Trigger para updated_at
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at_trigger
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION update_orders_updated_at();

-- 4. Habilitar RLS (sin políticas complejas)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Política simple: permitir a todos los usuarios autenticados ver y crear pedidos
CREATE POLICY "Allow authenticated users to insert orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view orders"
ON public.orders
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (true);

-- 5. Verificar
SELECT
  'Tabla orders creada exitosamente' as mensaje,
  COUNT(*) as total_pedidos
FROM public.orders;
