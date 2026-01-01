import fs from 'fs';

console.log('🔪 Dividiendo script SQL en partes más pequeñas...\n');

// Leer el script SQL completo
const fullSQL = fs.readFileSync('./database/insert-products.sql', 'utf-8');

// Dividir por lotes (cada lote ya tiene ~50 productos)
const batches = fullSQL.split(/-- Lote \d+/).filter(b => b.trim());

// Crear archivos más pequeños (2 lotes por archivo = ~100 productos)
const header = batches[0]; // Header con comentarios iniciales
const batchesContent = batches.slice(1);

const filesPerPart = 2; // 2 lotes por archivo = ~100 productos
let partNumber = 1;

for (let i = 0; i < batchesContent.length; i += filesPerPart) {
  const partContent = batchesContent.slice(i, i + filesPerPart);

  const sqlContent = `-- Parte ${partNumber} de la importación de productos
-- Ejecuta cada parte en orden (parte-1, parte-2, etc.)

${partContent.join('\n')}`;

  fs.writeFileSync(`./database/sql-parts/insert-products-part-${partNumber}.sql`, sqlContent);
  console.log(`✅ Creada parte ${partNumber} (~${filesPerPart * 50} productos)`);
  partNumber++;
}

console.log(`\n✅ Script dividido en ${partNumber - 1} partes`);
console.log('\n📝 Instrucciones:');
console.log('1. Ve a SQL Editor en Supabase');
console.log('2. Ejecuta cada archivo en orden:');
for (let i = 1; i < partNumber; i++) {
  console.log(`   - database/sql-parts/insert-products-part-${i}.sql`);
}
