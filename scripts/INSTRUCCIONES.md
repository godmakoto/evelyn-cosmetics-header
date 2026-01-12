# Instrucciones Rápidas - Solución de Descripciones

## 🎯 Problema
La descripción corta y larga muestran el mismo texto en la página de producto.

## ✅ Solución (Ejecutar en Orden)

### PASO 1: Verificar columnas existentes
```
Archivo: check-columns.sql
```
1. Abre **Supabase Dashboard** → **SQL Editor** → **New Query**
2. Copia y pega el contenido de `check-columns.sql`
3. Ejecuta con **Run** (Ctrl+Enter)
4. **Anota qué columnas tienes actualmente**

### PASO 2: Agregar columnas faltantes (si es necesario)
```
Archivo: add-missing-columns.sql
```
Si en el PASO 1 no viste estas columnas:
- `description`
- `usage_instructions`
- `ingredients`

Entonces:
1. **SQL Editor** → **New Query**
2. Copia y pega el contenido de `add-missing-columns.sql`
3. Ejecuta con **Run**
4. Verifica que el script muestre "Columna agregada exitosamente"

### PASO 3: Llenar descripción corta
```
Archivo: fill-short-descriptions.sql
```
1. **SQL Editor** → **New Query**
2. Copia y pega el contenido de `fill-short-descriptions.sql`
3. Ejecuta con **Run**
4. El script generará descripciones cortas automáticamente

## 🧪 Verificación

Después de ejecutar los 3 pasos:
1. Ve a tu sitio web
2. Abre cualquier página de producto
3. Verifica:
   - Descripción arriba del botón "Agregar" = **corta** (1-2 líneas)
   - Descripción en acordeón = **larga y completa**

## 📁 Archivos en esta carpeta

```
scripts/
├── INSTRUCCIONES.md              ← Estás aquí (guía rápida)
├── README.md                     ← Documentación completa
├── check-columns.sql             ← PASO 1: Verificar columnas
├── add-missing-columns.sql       ← PASO 2: Agregar columnas
├── fill-short-descriptions.sql   ← PASO 3: Llenar descripciones
└── fill-short-descriptions.ts    ← Alternativa TypeScript (opcional)
```

## ❓ Preguntas Frecuentes

**Q: ¿Puedo ejecutar los scripts múltiples veces?**
A: Sí, todos los scripts son seguros de ejecutar múltiples veces.

**Q: ¿Qué pasa si ya tengo las columnas?**
A: El script `add-missing-columns.sql` detectará que existen y no hará nada.

**Q: ¿Se borrarán mis datos existentes?**
A: No, los scripts solo AGREGAN columnas y LLENAN valores NULL. No modifican ni borran datos existentes.

**Q: ¿Necesito ejecutar los 3 pasos siempre?**
A: Ejecuta PASO 1 para ver qué necesitas. Si ya tienes todas las columnas, salta al PASO 3.
