# Scripts de Mantenimiento - Evelyn Cosmetics

## Problema: Descripción Corta vs Descripción Larga

### Situación Actual

**El problema:** En la página de producto, la descripción corta (arriba del botón "Agregar") y la descripción larga (en el acordeón) muestran el mismo texto.

**Causa:** Tu tabla de Supabase puede no tener todas las columnas necesarias o la columna `description` está vacía.

### Columnas Necesarias

La tabla `products` necesita estas columnas:
- `description` - Descripción corta (para mostrar arriba del botón "Agregar")
- `long_description` - Descripción larga (para mostrar en el acordeón)
- `usage_instructions` - Modo de uso
- `ingredients` - Ingredientes

### Solución en 2 Pasos

1. **Primero:** Verificar y agregar columnas faltantes
2. **Segundo:** Llenar la columna `description` con versiones cortas

---

## PASO 1: Verificar y Agregar Columnas Faltantes

### 1.1. Verificar qué columnas existen

En Supabase SQL Editor, ejecuta:

```sql
-- Ver en el archivo: check-columns.sql
```

Este script te mostrará todas las columnas actuales de la tabla `products`.

### 1.2. Agregar columnas faltantes

Si faltan las columnas `description`, `usage_instructions` o `ingredients`, ejecuta:

```sql
-- Ver en el archivo: add-missing-columns.sql
```

Este script:
- ✅ Verifica si cada columna existe antes de agregarla
- ✅ Es seguro ejecutarlo múltiples veces
- ✅ Te muestra qué columnas se agregaron

---

## PASO 2: Llenar Descripción Corta

### Opción A: Ejecutar Script SQL en Supabase (RECOMENDADO)

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor** en el menú lateral
3. Haz clic en **New Query**
4. Copia el contenido del archivo `fill-short-descriptions.sql`
5. Pégalo y haz clic en **Run**

El script:
- ✅ Solo actualiza productos que NO tienen `description` (donde es NULL)
- ✅ Toma la primera línea o primeros 200 caracteres de `long_description`
- ✅ Es seguro ejecutarlo múltiples veces (solo actualiza NULLs)

### Opción B: Ejecutar Script TypeScript Localmente

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

## Resumen de Scripts

| Archivo | Propósito | Cuándo Usar |
|---------|-----------|-------------|
| `check-columns.sql` | Verificar columnas existentes | Ejecutar primero para diagnosticar |
| `add-missing-columns.sql` | Agregar columnas faltantes | Si faltan columnas después de verificar |
| `fill-short-descriptions.sql` | Llenar descripción corta | Después de tener todas las columnas |
| `fill-short-descriptions.ts` | Alternativa TypeScript | Si prefieres ejecutar localmente |

## Columnas Necesarias en Supabase

| Columna | Tipo | Propósito | Requerida |
|---------|------|-----------|-----------|
| `description` | text | Descripción corta | ✅ Sí |
| `long_description` | text | Descripción larga | ✅ Sí |
| `usage_instructions` | text | Modo de uso | ✅ Sí |
| `ingredients` | text | Ingredientes | ✅ Sí |

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
