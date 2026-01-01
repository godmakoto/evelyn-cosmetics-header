import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

console.log('🔄 Transformando CSV para Supabase...\n');

const products = [];

// Leer el CSV original
fs.createReadStream('./products_all_images.csv')
  .pipe(csv())
  .on('data', (row) => {
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

    // Crear objeto compatible con Supabase
    products.push({
      product_id: row['Product ID'].trim(),
      title: row['Title'].trim(),
      offer_price: offerPrice,
      regular_price: regularPrice,
      description: row['Description'] ? row['Description'].trim() : '',
      images: JSON.stringify(images),
      is_featured: false,
      is_back_in_stock: false,
      is_best_seller: false,
      is_on_sale: false,
      stock: 10,
      low_stock_threshold: 5,
      in_stock: true
    });
  })
  .on('end', async () => {
    console.log(`✅ Procesados ${products.length} productos\n`);

    // Crear CSV compatible con Supabase
    const csvWriter = createObjectCsvWriter({
      path: './products_supabase.csv',
      header: [
        { id: 'product_id', title: 'product_id' },
        { id: 'title', title: 'title' },
        { id: 'offer_price', title: 'offer_price' },
        { id: 'regular_price', title: 'regular_price' },
        { id: 'description', title: 'description' },
        { id: 'images', title: 'images' },
        { id: 'is_featured', title: 'is_featured' },
        { id: 'is_back_in_stock', title: 'is_back_in_stock' },
        { id: 'is_best_seller', title: 'is_best_seller' },
        { id: 'is_on_sale', title: 'is_on_sale' },
        { id: 'stock', title: 'stock' },
        { id: 'low_stock_threshold', title: 'low_stock_threshold' },
        { id: 'in_stock', title: 'in_stock' }
      ]
    });

    await csvWriter.writeRecords(products);
    console.log('✅ CSV transformado creado: products_supabase.csv\n');
    console.log('📥 Ahora puedes importar este archivo en Supabase\n');
  });
