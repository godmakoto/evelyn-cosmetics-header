import fs from 'fs';
import csv from 'csv-parser';

console.log('🔄 Generando script SQL para insertar productos...\n');

const products = [];
let sqlStatements = [];

// Leer el CSV original
fs.createReadStream('./products_all_images.csv')
  .pipe(csv())
  .on('data', (row) => {
    try {
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

      // Escapar comillas simples en strings
      const escapeStr = (str) => str ? str.replace(/'/g, "''") : '';

      // Crear objeto del producto
      const product = {
        product_id: escapeStr(row['Product ID'].trim()),
        title: escapeStr(row['Title'].trim()),
        offer_price: offerPrice,
        regular_price: regularPrice,
        description: escapeStr(row['Description'] ? row['Description'].trim() : ''),
        images: JSON.stringify(images).replace(/'/g, "''"),
      };

      products.push(product);
    } catch (error) {
      console.error('Error procesando fila:', error.message);
    }
  })
  .on('end', () => {
    console.log(`✅ Procesados ${products.length} productos\n`);
    console.log('📝 Generando SQL...\n');

    // Generar INSERT statements en lotes de 50
    const batchSize = 50;
    let sql = `-- Script de inserción de productos para Supabase
-- Total: ${products.length} productos
-- Generado automáticamente

`;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);

      sql += `-- Lote ${Math.floor(i / batchSize) + 1} (productos ${i + 1}-${Math.min(i + batchSize, products.length)})\n`;
      sql += `INSERT INTO products (product_id, title, offer_price, regular_price, description, images, is_featured, is_back_in_stock, is_best_seller, is_on_sale, stock, low_stock_threshold, in_stock)\nVALUES\n`;

      batch.forEach((product, index) => {
        const offerPriceStr = product.offer_price !== null ? product.offer_price : 'NULL';

        sql += `  ('${product.product_id}', '${product.title}', ${offerPriceStr}, ${product.regular_price}, '${product.description}', '${product.images}'::jsonb, false, false, false, false, 10, 5, true)`;

        if (index < batch.length - 1) {
          sql += ',\n';
        } else {
          sql += ';\n\n';
        }
      });
    }

    // Guardar el script SQL
    fs.writeFileSync('./database/insert-products.sql', sql);

    console.log('✅ Script SQL generado: database/insert-products.sql\n');
    console.log('📥 Instrucciones:\n');
    console.log('1. Ve a SQL Editor en Supabase');
    console.log('2. Copia y pega el contenido de database/insert-products.sql');
    console.log('3. Ejecuta el script\n');
    console.log(`💡 Esto insertará ${products.length} productos en tu base de datos\n`);
  })
  .on('error', (error) => {
    console.error('❌ Error:', error.message);
  });
