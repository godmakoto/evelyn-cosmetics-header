# Configuración de Pedidos (Orders)

## 🎯 Objetivo

Sincronizar los pedidos del checkout del cliente con el panel de administración mediante Supabase.

## ⚠️ IMPORTANTE - Ejecutar ANTES de desplegar

**DEBES ejecutar el script SQL en Supabase ANTES de desplegar estos cambios**, de lo contrario el checkout dará errores al intentar guardar pedidos.

## 📋 PASO 1: Ejecutar Script SQL en Supabase

1. Abre **Supabase Dashboard**
2. Ve a **SQL Editor**
3. Copia y pega el contenido completo de `scripts/create-orders-table.sql`
4. Ejecuta el script
5. Verifica que se ejecutó correctamente (debería mostrar "Tabla orders creada exitosamente")

### ¿Qué hace este script?

- ✅ Crea la tabla `orders` con todos los campos necesarios
- ✅ Crea índices para mejorar el rendimiento
- ✅ Configura trigger para actualizar `updated_at` automáticamente
- ✅ Habilita Row Level Security (RLS)
- ✅ Crea políticas de acceso (usuarios pueden crear pedidos, solo admins pueden actualizarlos)
- ✅ Crea función para generar números de orden únicos (formato: ORD-20260113-001)

## 📋 PASO 2: Verificar la Tabla

Ejecuta esta consulta para verificar que la tabla se creó correctamente:

```sql
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;
```

Deberías ver columnas como:
- `id` (uuid)
- `order_number` (text)
- `customer_name` (text)
- `customer_phone` (text)
- `customer_email` (text)
- `customer_address` (text)
- `items` (jsonb)
- `subtotal` (numeric)
- `discount` (numeric)
- `total` (numeric)
- `status_id` (uuid)
- `notes` (text)
- `payment_method` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 📋 PASO 3: Verificar Estados de Pedidos

Asegúrate de que existe el estado "Pendiente" en `order_statuses`:

```sql
SELECT id, name, color FROM public.order_statuses;
```

Si no existe, créalo:

```sql
INSERT INTO public.order_statuses (name, color)
VALUES ('Pendiente', '#f59e0b');
```

## 🚀 PASO 4: Desplegar Código

Una vez ejecutada la migración SQL, despliega el código actualizado. Los cambios incluyen:

### Archivos nuevos:
- `src/hooks/useCreateOrder.ts` - Hook para crear pedidos en Supabase
- `scripts/create-orders-table.sql` - Script de migración
- `scripts/ORDERS_SETUP.md` - Este documento

### Archivos modificados:
- `src/integrations/supabase/types.ts` - Tipos actualizados con tablas `orders` y `order_statuses`
- `src/pages/Checkout.tsx` - Formulario de información del cliente y guardado en Supabase

## ✅ Funcionalidades Implementadas

### En el Checkout:

1. **Formulario de información del cliente**:
   - Nombre completo (requerido)
   - Teléfono/WhatsApp (requerido)
   - Email (opcional)
   - Dirección de entrega (opcional)
   - Notas adicionales (opcional)

2. **Validaciones**:
   - Campos requeridos validados
   - Formato de teléfono básico
   - Términos y condiciones aceptados

3. **Flujo de pedido**:
   - Cliente completa formulario
   - Acepta términos y condiciones
   - Hace clic en "Finalizar por WhatsApp"
   - **Primero** se guarda en Supabase como "Pendiente"
   - **Luego** se abre WhatsApp con mensaje formateado
   - El mensaje incluye número de orden
   - Carrito se limpia automáticamente

4. **Mensaje de WhatsApp mejorado**:
   ```
   ¡Hola! Me gustaría realizar el siguiente pedido:

   📋 Pedido: ORD-20260113-001
   👤 Nombre: Juan Pérez
   📱 Teléfono: 76543210
   📧 Email: juan@ejemplo.com
   📍 Dirección: Av. Principal #123

   Productos:
   1. Producto A
      Cantidad: 2
      Precio: 150 Bs c/u
      Subtotal: 300.0 Bs

   Subtotal: 300.0 Bs
   Descuento: -30.0 Bs
   Total: 270.0 Bs

   📝 Notas: Entrega en horario de tarde
   ```

## 🔍 Verificar que Funciona

### En el cliente web:
1. Agrega productos al carrito
2. Ve a checkout
3. Completa el formulario de información
4. Acepta términos y condiciones
5. Haz clic en "Finalizar por WhatsApp"
6. Verifica que:
   - Aparece mensaje "Pedido registrado correctamente"
   - Se abre WhatsApp con el mensaje
   - El carrito se limpia

### En Supabase:
1. Ve a **Table Editor** → **orders**
2. Deberías ver el pedido guardado con:
   - Número de orden único
   - Información del cliente
   - Productos en formato JSON
   - Estado "Pendiente"
   - Totales correctos

### En el panel de admin:
1. Ve a la sección de pedidos
2. Deberías ver el nuevo pedido
3. Puedes cambiar su estado
4. Puedes ver toda la información del pedido

## 🔧 Solución de Problemas

### Error: "column 'orders' does not exist"
- **Causa**: No ejecutaste el script SQL en Supabase
- **Solución**: Ejecuta `scripts/create-orders-table.sql` en Supabase SQL Editor

### Error: "status_id violates foreign key constraint"
- **Causa**: No existe el estado "Pendiente" en `order_statuses`
- **Solución**: Crea el estado con el SQL del PASO 3

### Error: "permission denied for table orders"
- **Causa**: Las políticas RLS no están configuradas correctamente
- **Solución**: Re-ejecuta el script SQL completo

### El pedido no se guarda pero WhatsApp se abre
- **Causa**: Error en la conexión con Supabase o políticas RLS
- **Solución**: Revisa la consola del navegador y logs de Supabase

## 📊 Estructura de Items (JSONB)

Los productos se guardan en formato JSON:

```json
[
  {
    "product_id": "uuid-del-producto",
    "name": "Nombre del Producto",
    "quantity": 2,
    "price": 150,
    "subtotal": 300,
    "image": "url-de-la-imagen"
  }
]
```

## 🎉 Beneficios

✅ **Sincronización automática**: Pedidos del cliente van directo al panel de admin
✅ **No se pierden pedidos**: Se guardan antes de abrir WhatsApp
✅ **Trazabilidad**: Número de orden único para cada pedido
✅ **Información completa**: Datos del cliente y productos guardados
✅ **Estados**: Sistema de estados para gestión de pedidos
✅ **Historial**: Timestamps de creación y actualización
✅ **Seguridad**: RLS configurado correctamente
