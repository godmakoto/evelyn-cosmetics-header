# PR: Implementar sistema de pedidos con Supabase y formato secuencial

## 📋 Resumen de Cambios

Esta PR implementa un sistema completo de sincronización de pedidos con Supabase, permitiendo que los pedidos realizados desde el checkout web se guarden automáticamente en la base de datos y aparezcan en el panel de administración.

## ✨ Características Implementadas

### 1. **Sistema de Pedidos en Supabase**
- ✅ Guardado automático de pedidos al hacer clic en WhatsApp
- ✅ Sin formularios de contacto (cliente: "Cliente Web", teléfono: "N/A")
- ✅ Números de orden secuenciales: `ORD-1000`, `ORD-1001`, `ORD-1002`, etc.
- ✅ Sincronización inmediata con panel de administración

### 2. **Separación de Descuentos**
- ✅ `discount`: Descuentos manuales adicionales (actualmente 0)
- ✅ `product_discounts`: Descuentos automáticos de productos en oferta
- ✅ Visualización correcta en el admin panel

### 3. **Políticas RLS para Usuarios Anónimos**
- ✅ Permitir INSERT a usuarios anónimos (clientes web)
- ✅ Permitir SELECT a todos
- ✅ Permitir UPDATE solo a usuarios autenticados (admins)

### 4. **Formato de Order Number**
- ❌ **ANTES**: `ORD-20260113-012251521` (timestamp)
- ✅ **DESPUÉS**: `ORD-1000` (secuencial)
- ✅ Consulta automática del último número usado
- ✅ Incremento automático
- ✅ Fallback a timestamp en caso de error

## 🔧 Archivos Modificados

### Frontend
- `src/pages/Checkout.tsx` - Integración con Supabase, guardado automático
- `src/hooks/useCreateOrder.ts` - Hook para crear pedidos con número secuencial
- `src/contexts/CartContext.tsx` - Función `clearCart()` para limpiar carrito
- `src/integrations/supabase/types.ts` - Tipos actualizados con `product_discounts`

### Scripts SQL
- `scripts/create-orders-table-simple.sql` - Crear tabla orders (versión simplificada)
- `scripts/fix-orders-rls-policies.sql` - Políticas RLS para usuarios anónimos
- `scripts/add-product-discounts-column.sql` - Agregar columna product_discounts

## 📊 Flujo del Usuario

1. Cliente agrega productos al carrito
2. Va a checkout y acepta términos y condiciones
3. Hace clic en "Finalizar por WhatsApp"
4. **Sistema guarda pedido en Supabase automáticamente**
5. Se genera número de orden secuencial (ORD-1000, ORD-1001, etc.)
6. Se abre WhatsApp con mensaje que incluye número de orden
7. Carrito se limpia automáticamente
8. **Pedido aparece instantáneamente en panel de administración**

## 🎯 Estructura del Pedido

\`\`\`typescript
{
  order_number: "ORD-1000",
  customer_name: "Cliente Web",
  customer_phone: "N/A",
  items: [...], // Productos con cantidades, precios e imágenes
  subtotal: 540.0,
  discount: 0, // Descuentos manuales
  product_discounts: 15.0, // Descuentos automáticos
  total: 525.0,
  status_id: "uuid", // Estado "Pendiente"
  created_at: "timestamp",
  updated_at: "timestamp"
}
\`\`\`

## ✅ Scripts SQL a Ejecutar (si aplica)

Si la columna \`product_discounts\` no existe en la tabla \`orders\`:
\`\`\`bash
scripts/add-product-discounts-column.sql
\`\`\`

Si las políticas RLS bloquean pedidos de usuarios anónimos:
\`\`\`bash
scripts/fix-orders-rls-policies.sql
\`\`\`

## 🧪 Testing

- [x] Pedidos se guardan correctamente en Supabase
- [x] Números de orden son secuenciales
- [x] Descuentos se separan correctamente (manual vs automático)
- [x] Pedidos aparecen en panel de administración
- [x] Carrito se limpia después de crear pedido
- [x] WhatsApp se abre con mensaje correcto
- [x] Mensaje incluye número de orden

## 📝 Commits Incluidos

1. Actualizar número de WhatsApp en checkout a 59165038009
2. Implementar sincronización de pedidos con Supabase
3. Simplificar checkout: eliminar formulario de contacto
4. Agregar script SQL simplificado para tabla orders
5. Implementar guardado automático de pedidos en Supabase
6. Corregir error al crear pedidos sin autenticación
7. Separar descuentos manuales y automáticos
8. Cambiar formato de order_number a secuencial

## 🔗 Relacionado

- Panel de administración actualizado para soportar el nuevo formato
- Sincronización bidireccional entre tienda y admin panel
