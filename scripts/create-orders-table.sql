-- Crear tabla de pedidos (orders) para sincronizar con panel de admin

-- 1. Crear tabla de pedidos
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE, -- Número de orden único (ej: ORD-20260113-001)

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
  payment_method text, -- Efectivo, Transferencia, etc.

  -- Metadatos
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  -- Llave primaria
  CONSTRAINT orders_pkey PRIMARY KEY (id)
);

-- 2. Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status_id ON public.orders(status_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);

-- 3. Crear trigger para actualizar updated_at automáticamente
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

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Crear políticas de acceso
-- Permitir INSERT a usuarios autenticados (para crear pedidos desde el cliente)
CREATE POLICY "Allow authenticated users to insert orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir SELECT a usuarios autenticados (para ver sus propios pedidos)
CREATE POLICY "Allow authenticated users to view orders"
ON public.orders
FOR SELECT
TO authenticated
USING (true);

-- Permitir UPDATE solo a admins (para actualizar estado de pedidos)
CREATE POLICY "Allow admins to update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.user_id = auth.uid()
  )
);

-- 6. Función para generar número de orden único
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  order_date text;
  order_count int;
  order_number text;
BEGIN
  -- Formato: ORD-YYYYMMDD-XXX
  order_date := to_char(now(), 'YYYYMMDD');

  -- Contar pedidos del día
  SELECT COUNT(*) + 1 INTO order_count
  FROM public.orders
  WHERE order_number LIKE 'ORD-' || order_date || '-%';

  -- Generar número de orden
  order_number := 'ORD-' || order_date || '-' || LPAD(order_count::text, 3, '0');

  RETURN order_number;
END;
$$ LANGUAGE plpgsql;

-- 7. Comentarios para documentación
COMMENT ON TABLE public.orders IS 'Tabla de pedidos realizados por clientes';
COMMENT ON COLUMN public.orders.order_number IS 'Número de orden único (ej: ORD-20260113-001)';
COMMENT ON COLUMN public.orders.items IS 'Array JSONB con productos del pedido: [{"product_id", "name", "quantity", "price", "subtotal"}]';
COMMENT ON COLUMN public.orders.status_id IS 'ID del estado del pedido (referencia a order_statuses)';

-- 8. Verificar que la tabla se creó correctamente
SELECT
  'Tabla orders creada exitosamente' as mensaje,
  COUNT(*) as total_pedidos
FROM public.orders;
