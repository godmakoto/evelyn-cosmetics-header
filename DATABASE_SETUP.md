# Evelyn Cosmetics - Integración con Base de Datos

## Objetivo
Implementar la base de datos con Supabase para gestionar el catálogo de productos de Evelyn Cosmetics.

## 📋 Requisitos Previos
- Cuenta en [Supabase](https://supabase.com)
- Node.js instalado
- Variables de entorno configuradas

## 🚀 Pasos para la Configuración

### 1. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

### 2. Crear la Tabla en Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo `supabase-schema.sql`
4. Ejecuta el script

Esto creará:
- ✅ Tabla `products` con todos los campos necesarios
- ✅ Índices para mejorar el rendimiento
- ✅ Trigger para actualizar `updated_at` automáticamente
- ✅ Políticas de seguridad (Row Level Security)

### 3. Importar Productos desde el CSV

Una vez creada la tabla, ejecuta el siguiente comando para importar los productos:

```bash
npm run import:products
```

Este comando:
- 📖 Lee el archivo `products_all_images.csv`
- 🔄 Procesa los datos y los formatea para la base de datos
- 📦 Importa los productos en lotes de 100 para optimizar el proceso
- ✅ Muestra el progreso en tiempo real

### 4. Verificar la Importación

1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla `products`
3. Verifica que los productos se hayan importado correctamente

## 📊 Estructura de la Base de Datos

```sql
products (
  id UUID                    -- ID único del producto
  product_id TEXT            -- ID del producto original
  title TEXT                 -- Nombre del producto
  offer_price NUMERIC        -- Precio en oferta (opcional)
  regular_price NUMERIC      -- Precio regular
  description TEXT           -- Descripción del producto
  images JSONB               -- Array de URLs de imágenes

  -- Estados del producto
  is_featured BOOLEAN        -- Producto destacado
  is_back_in_stock BOOLEAN   -- De vuelta en stock
  is_best_seller BOOLEAN     -- Más vendido

  -- Gestión de inventario
  stock INTEGER              -- Cantidad disponible
  low_stock_threshold INT    -- Umbral de stock bajo
  in_stock BOOLEAN           -- Disponible/Agotado

  created_at TIMESTAMP
  updated_at TIMESTAMP
)
```

## 🔧 API de Productos

El archivo `src/lib/supabase.ts` incluye funciones helper para interactuar con la base de datos:

- `productsAPI.getAll()` - Obtener todos los productos
- `productsAPI.getFeatured()` - Productos destacados
- `productsAPI.getBestSellers()` - Más vendidos
- `productsAPI.getBackInStock()` - De vuelta en stock
- `productsAPI.getById(id)` - Producto por ID
- `productsAPI.search(query)` - Buscar productos
- `productsAPI.getWithFilters(filters)` - Filtrar productos

## 📝 Notas
- Los productos se importan con valores por defecto para stock (10 unidades)
- Los estados (destacado, más vendido, etc.) se pueden actualizar manualmente después
- Las políticas de seguridad permiten lectura pública pero escritura solo autenticada

## Estado
✅ Configuración completada y lista para usar
