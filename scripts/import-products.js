import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para procesar el CSV y convertirlo a formato compatible con la base de datos
function processCSVRow(row) {
  // Extraer todas las imágenes disponibles
  const images = [];
  for (let i = 1; i <= 7; i++) {
    const imageKey = `Image ${i}`;
    if (row[imageKey] && row[imageKey].trim()) {
      images.push(row[imageKey].trim());
    }
  }

  // Convertir precios a números
  const offerPrice = row['Offer Price'] && row['Offer Price'] !== 'N/A'
    ? parseFloat(row['Offer Price'])
    : null;

  const regularPrice = row['Regular Price'] && row['Regular Price'] !== 'N/A'
    ? parseFloat(row['Regular Price'])
    : offerPrice || 0;

  // Detectar automáticamente si está en oferta
  const isOnSale = offerPrice !== null && offerPrice < regularPrice;

  return {
    product_id: row['Product ID'].trim(),
    title: row['Title'].trim(),
    offer_price: offerPrice,
    regular_price: regularPrice,
    description: row['Description'] ? row['Description'].trim() : null,
    images: images,

    // Estados por defecto (se pueden actualizar después manualmente)
    is_featured: false,
    is_back_in_stock: false,
    is_best_seller: false,
    is_on_sale: isOnSale,

    // Inventario por defecto
    stock: 10, // Stock inicial por defecto
    low_stock_threshold: 5,
    in_stock: true
  };
}

// Función para importar productos en lotes
async function importProducts() {
  console.log('🚀 Iniciando importación de productos...\n');

  const products = [];
  const csvFilePath = './products_all_images.csv';

  // Verificar que el archivo existe
  if (!fs.existsSync(csvFilePath)) {
    console.error(`❌ Error: No se encontró el archivo ${csvFilePath}`);
    process.exit(1);
  }

  // Leer el CSV
  console.log('📖 Leyendo archivo CSV...');

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        try {
          const product = processCSVRow(row);
          products.push(product);
        } catch (error) {
          console.error(`⚠️ Error procesando fila:`, error.message);
        }
      })
      .on('end', async () => {
        console.log(`✅ CSV procesado: ${products.length} productos encontrados\n`);

        // Importar en lotes de 100 productos
        const batchSize = 100;
        let imported = 0;
        let errors = 0;

        for (let i = 0; i < products.length; i += batchSize) {
          const batch = products.slice(i, i + batchSize);

          try {
            const { data, error } = await supabase
              .from('products')
              .insert(batch)
              .select();

            if (error) {
              console.error(`❌ Error en lote ${Math.floor(i / batchSize) + 1}:`, error.message);
              errors += batch.length;
            } else {
              imported += batch.length;
              console.log(`✅ Lote ${Math.floor(i / batchSize) + 1}: ${batch.length} productos importados (Total: ${imported}/${products.length})`);
            }
          } catch (error) {
            console.error(`❌ Error inesperado en lote ${Math.floor(i / batchSize) + 1}:`, error.message);
            errors += batch.length;
          }

          // Pequeña pausa entre lotes para no sobrecargar la API
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('\n📊 Resumen de importación:');
        console.log(`   ✅ Productos importados: ${imported}`);
        console.log(`   ❌ Errores: ${errors}`);
        console.log(`   📦 Total procesados: ${products.length}`);

        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Error leyendo el archivo CSV:', error);
        reject(error);
      });
  });
}

// Ejecutar la importación
importProducts()
  .then(() => {
    console.log('\n🎉 Importación completada!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
  });
