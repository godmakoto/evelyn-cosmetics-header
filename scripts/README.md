# Scripts de Mantenimiento - Evelyn Cosmetics

## Problema: Descripción Corta vs Descripción Larga

### Situación Actual

Tu tabla de Supabase tiene estas columnas:
- `description` - Descripción corta (para mostrar arriba del botón "Agregar")
- `long_description` - Descripción larga (para mostrar en el acordeón)
- `usage_instructions` - Modo de uso
- `ingredients` - Ingredientes

**El problema:** La columna `description` está vacía (NULL), por lo que el código usa como fallback la `long_description`, haciendo que ambas secciones muestren el mismo texto.

### Solución

Llenar la columna `description` con versiones cortas de la descripción larga.

---

## Opción 1: Ejecutar Script SQL en Supabase (RECOMENDADO)

Esta es la forma más rápida y confiable.

### Pasos:

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor** en el menú lateral
3. Haz clic en **New Query**
4. Copia todo el contenido del archivo `fill-short-descriptions.sql`
5. Pégalo en el editor
6. Haz clic en **Run** o presiona `Ctrl+Enter`

El script:
- ✅ Solo actualiza productos que NO tienen `description` (donde es NULL)
- ✅ Toma la primera línea o primeros 200 caracteres de `long_description`
- ✅ Es seguro ejecutarlo múltiples veces (solo actualiza NULLs)

---

## Opción 2: Ejecutar Script TypeScript Localmente

Si prefieres ejecutarlo desde tu proyecto local:

### Requisitos:
- Node.js instalado
- Archivo `.env` con credenciales de Supabase válidas

### Pasos:

```bash
npm run fill-descriptions
```

El script:
- Lee todos los productos con `long_description` pero sin `description`
- Genera automáticamente descripciones cortas inteligentes
- Actualiza cada producto en Supabase
- Muestra progreso detallado en la consola

---

## Resultado Esperado

Después de ejecutar cualquiera de los scripts:

### Antes:
```
description: NULL
long_description: "Tocobo Cotton Soft Sun Stick es un protector solar..."
```
→ Ambas secciones muestran el texto largo

### Después:
```
description: "Tocobo Cotton Soft Sun Stick es un protector solar suave y sedoso..."
long_description: "Tocobo Cotton Soft Sun Stick es un protector solar suave y sedoso que utiliza filtros químicos y minerales que ofrecen protección solar de amplio espectro FPS50 PPA++++..."
```
→ Descripción corta arriba del botón, descripción completa en el acordeón

---

## Verificación

Para verificar que funcionó correctamente:

1. Ve a tu sitio web
2. Abre cualquier página de producto
3. Verifica que:
   - La descripción arriba del botón "Agregar" sea **corta** (1-2 líneas)
   - La descripción en el acordeón "Descripción del Producto" sea **completa**

---

## Notas Importantes

### Para el Panel de Administración (dermos-admin-suite)

Tu panel de administración ya tiene los campos necesarios:
- ✅ Descripción larga
- ✅ Modo de uso
- ✅ Ingredientes

**Falta agregar:** Campo para "Descripción corta"

Para agregar este campo en el panel de administración:
1. Ve a `dermos-admin-suite/src/components/ProductForm.tsx` (o similar)
2. Agrega un input para el campo `description`
3. El campo ya existe en Supabase, solo necesitas agregarlo al formulario

---

## Columnas en Supabase

Tu tabla `products` ya tiene todas las columnas necesarias:

| Columna | Tipo | Propósito | Estado |
|---------|------|-----------|--------|
| `description` | text | Descripción corta | ✅ Existe (llenar con script) |
| `long_description` | text | Descripción larga | ✅ Existe y tiene datos |
| `usage_instructions` | text | Modo de uso | ✅ Existe y tiene datos |
| `ingredients` | text | Ingredientes | ✅ Existe y tiene datos |

**No necesitas crear ninguna columna nueva.**

---

## Soporte

Si encuentras algún problema:
1. Verifica que las credenciales de Supabase en `.env` sean correctas
2. Verifica que tengas acceso a internet
3. Prueba ejecutar el script SQL directamente desde Supabase

---

## Próximos Pasos (Opcional)

1. **Agregar campo de descripción corta en el panel de administración**
   - Para que los administradores puedan editar ambas descripciones

2. **Validación de longitud**
   - Agregar validación en el panel para que `description` no supere 200 caracteres

3. **Actualizar marca, categoría, subcategoría**
   - Como mencionaste, revisar estos campos más adelante
