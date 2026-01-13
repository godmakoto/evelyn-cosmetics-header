-- Actualizar políticas RLS para permitir pedidos sin autenticación
-- Este script soluciona el error "Error al registrar el pedido"

-- 1. Eliminar políticas existentes
DROP POLICY IF EXISTS "Allow authenticated users to insert orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated users to view orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated users to update orders" ON public.orders;

-- 2. Crear nueva política para INSERT sin autenticación (clientes anónimos)
CREATE POLICY "Allow anonymous users to insert orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Crear política para SELECT sin autenticación (para que el admin pueda ver)
CREATE POLICY "Allow all users to view orders"
ON public.orders
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Crear política para UPDATE solo para usuarios autenticados (admins)
CREATE POLICY "Allow authenticated users to update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (true);

-- 5. Verificar que las políticas se crearon correctamente
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'orders';
