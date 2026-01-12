import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Genera una descripción corta a partir de una descripción larga
 * Toma la primera línea o las primeras 2-3 frases (máximo 200 caracteres)
 */
function generateShortDescription(longDescription: string): string {
  if (!longDescription) return '';

  // Limpiar espacios y saltos de línea extras
  const cleaned = longDescription.trim().replace(/\n\n+/g, '\n');

  // Opción 1: Tomar la primera línea
  const firstLine = cleaned.split('\n')[0];

  // Si la primera línea es muy corta (menos de 50 caracteres), tomar más
  if (firstLine.length < 50) {
    const lines = cleaned.split('\n');
    let shortDesc = firstLine;
    let i = 1;

    while (i < lines.length && shortDesc.length < 150) {
      shortDesc += ' ' + lines[i].trim();
      i++;
    }

    // Limitar a 200 caracteres
    if (shortDesc.length > 200) {
      shortDesc = shortDesc.substring(0, 197) + '...';
    }

    return shortDesc;
  }

  // Si la primera línea es suficientemente larga, usarla
  if (firstLine.length <= 200) {
    return firstLine;
  }

  // Si es muy larga, cortarla en 200 caracteres
  return firstLine.substring(0, 197) + '...';
}

async function fillShortDescriptions() {
  console.log('🚀 Iniciando proceso de llenado de descripciones cortas...\n');

  try {
    // 1. Obtener todos los productos que tienen long_description pero no description
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, product_id, title, description, long_description')
      .is('description', null)
      .not('long_description', 'is', null);

    if (fetchError) {
      console.error('❌ Error al obtener productos:', fetchError);
      return;
    }

    if (!products || products.length === 0) {
      console.log('✅ No hay productos sin descripción corta. Todo está actualizado!');
      return;
    }

    console.log(`📦 Se encontraron ${products.length} productos sin descripción corta\n`);

    // 2. Actualizar cada producto
    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
      const shortDesc = generateShortDescription(product.long_description || '');

      console.log(`\n📝 Procesando: ${product.title}`);
      console.log(`   Descripción larga (primeros 100 chars): ${product.long_description?.substring(0, 100)}...`);
      console.log(`   Descripción corta generada: ${shortDesc}`);

      const { error: updateError } = await supabase
        .from('products')
        .update({ description: shortDesc })
        .eq('id', product.id);

      if (updateError) {
        console.error(`   ❌ Error al actualizar: ${updateError.message}`);
        errorCount++;
      } else {
        console.log(`   ✅ Actualizado exitosamente`);
        successCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN:');
    console.log(`   ✅ Productos actualizados: ${successCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Error inesperado:', error);
  }
}

// Ejecutar el script
fillShortDescriptions();
