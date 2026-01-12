# Migración a Arrays JSONB

## 🎯 Objetivo

Sincronizar el proyecto cliente con el panel de administración. El admin guarda productos con `categories` y `subcategories` como arrays JSONB.

## ⚠️ IMPORTANTE - Verificar Primero

### Verificar si necesitas migración

Ejecuta este script en Supabase SQL Editor para verificar qué columnas tienes:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'products'
  AND column_name IN ('category', 'categories', 'subcategory', 'subcategories')
ORDER BY column_name;
```

**Si solo tienes `categories` y `subcategories` (sin las singulares):**
- ✅ Tu base de datos YA está correcta
- ✅ NO necesitas ejecutar el script de migración
- ✅ El código del proyecto ya funciona con tu estructura

**Si tienes `category` y `subcategory` (singulares):**
- ⚠️ Necesitas ejecutar la migración SQL
- ⚠️ Sigue los pasos del PASO 1 abajo

## 📋 PASO 1: Migración SQL (SOLO si tienes columnas singulares)

**Solo ejecuta esto si tienes `category` y `subcategory` como strings:**

1. Abre Supabase Dashboard
2. Ve a **SQL Editor**
3. Copia y pega el contenido de `migrate-to-arrays.sql`
4. Ejecuta el script
5. Verifica con:

```sql
SELECT
  product_id,
  category as old_category,
  categories as new_categories,
  subcategory as old_subcategory,
  subcategories as new_subcategories
FROM public.products
LIMIT 10;
```

## 📋 PASO 2: El Código Ya Está Actualizado

El código del proyecto ya está configurado para:

1. **types.ts**: Usar `categories: Json` y `subcategories: Json`
2. **productHelpers.ts**: Funciones para convertir JSONB a arrays
3. **Componentes**: Trabajar con arrays de categorías/subcategorías
4. **Filtros**: Buscar dentro de todos los arrays

## ✅ Verificación

Para verificar que funciona:

1. Crea un producto en el **admin panel** con múltiples categorías
2. Verifica que aparezca correctamente en el **cliente web**
3. Los filtros deben funcionar correctamente
4. El header y menú móvil deben mostrar las categorías desde Supabase

## 🎉 Tu Caso

Basado en el error que viste, tu base de datos YA tiene la estructura correcta con `categories` y `subcategories` como arrays JSONB. No necesitas ejecutar ninguna migración SQL.
