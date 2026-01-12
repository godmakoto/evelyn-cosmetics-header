# Migración a Arrays JSONB

## 🎯 Objetivo

Sincronizar el proyecto cliente con el panel de administración. El admin guarda productos con `categories` y `subcategories` como arrays JSONB, pero este cliente usaba strings singulares (`category`, `subcategory`).

## ⚠️ IMPORTANTE - EJECUTAR EN ESTE ORDEN

### PASO 1: Ejecutar Migración SQL en Supabase

**ANTES de actualizar el código**, ejecuta el script SQL en Supabase:

1. Abre Supabase Dashboard
2. Ve a **SQL Editor**
3. Copia y pega el contenido de `migrate-to-arrays.sql`
4. Ejecuta el script
5. Verifica que se ejecutó correctamente

```sql
-- Para verificar que funcionó, ejecuta:
SELECT
  product_id,
  category as old_category,
  categories as new_categories,
  subcategory as old_subcategory,
  subcategories as new_subcategories
FROM public.products
LIMIT 10;
```

### PASO 2: Actualizar el Código

Una vez ejecutada la migración SQL, el código del proyecto se actualizará automáticamente para:

1. **types.ts**: Actualizar tipos para usar `categories: Json` y `subcategories: Json`
2. **Componentes**: Actualizar todos los componentes para trabajar con arrays
3. **Filtros**: Actualizar la lógica de filtrado para manejar arrays JSONB
4. **Hooks**: Adaptar hooks para trabajar con arrays

## 📋 Cambios Realizados

### Base de Datos
- ✅ Agrega columnas `categories` (jsonb) y `subcategories` (jsonb)
- ✅ Migra datos de `category` → `categories[0]`
- ✅ Migra datos de `subcategory` → `subcategories[0]`
- ✅ Crea índices GIN para búsquedas eficientes en arrays
- ✅ Mantiene columnas antiguas por compatibilidad (se pueden eliminar después)

### Código TypeScript
- ✅ Tipos actualizados para reflejar arrays JSONB
- ✅ Componentes actualizados para manejar arrays
- ✅ Filtros actualizados para buscar dentro de arrays
- ✅ Hooks adaptados para trabajar con la nueva estructura

## 🔄 Compatibilidad

Las columnas antiguas (`category`, `subcategory`) se mantienen por compatibilidad. Una vez verificado que todo funciona correctamente, puedes eliminarlas con:

```sql
ALTER TABLE public.products DROP COLUMN IF EXISTS category;
ALTER TABLE public.products DROP COLUMN IF EXISTS subcategory;
```

## ✅ Verificación

Para verificar que la sincronización funciona:

1. Crea un producto en el **admin panel** con múltiples categorías
2. Verifica que aparezca correctamente en el **cliente web**
3. Los filtros deben funcionar con las categorías del admin panel
4. El header y menú móvil deben mostrar las categorías correctamente
