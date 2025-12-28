// Base de datos de productos con detalles completos para páginas individuales
export interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  images: string[];
  fullDescription: string;
  howToUse: string;
  ingredients: string;
}

export const productDetails: Record<string, ProductDetail> = {
  "1": {
    id: "1",
    name: "Bond Intense Repair Óleo bifasico",
    brand: "Nivea",
    price: 85,
    originalPrice: 100,
    category: "Cuidado Capilar",
    description: "Óleo bifásico que nutre y realza la vitalidad del cabello, controla el frizz, protección térmica y blindaje anti-humedad - 110ml",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
    ],
    fullDescription: "Óleo bifásico intensivo que repara profundamente el cabello dañado. Su fórmula única combina aceites nutritivos con ingredientes reparadores para restaurar la fibra capilar desde el interior. Proporciona protección térmica hasta 230°C y crea un escudo anti-humedad que mantiene el cabello liso y brillante por más tiempo.",
    howToUse: "1. Agita bien antes de usar para mezclar las fases.\n2. Aplica sobre cabello húmedo o seco, evitando las raíces.\n3. No enjuagues.\n4. Peina como de costumbre.\n5. Puede usarse antes del secado o planchado para protección térmica.",
    ingredients: "Cyclopentasiloxane, Dimethicone, Argania Spinosa Kernel Oil, Prunus Amygdalus Dulcis Oil, Tocopheryl Acetate, Parfum, Benzyl Salicylate, Linalool, Limonene."
  },
  "2": {
    id: "2",
    name: "Sebium Gel Moussant Actif",
    brand: "La Roche-Posay",
    price: 180,
    category: "Limpiadores",
    description: "Gel limpiador facial con Ácido salicílico, Ácido glicólico y Gluconato de Zinc. Limpia, purifica y reduce el tamaño de los poros - 532g",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    ],
    fullDescription: "Gel limpiador purificante especialmente formulado para pieles grasas y con tendencia acneica. Su fórmula con ácidos exfoliantes ayuda a desobstruir los poros, controlar el exceso de sebo y prevenir la aparición de imperfecciones. Elimina hasta el 98% de las impurezas sin resecar la piel.",
    howToUse: "1. Humedece tu rostro con agua tibia.\n2. Aplica una pequeña cantidad del gel en las manos.\n3. Crea espuma y masajea suavemente sobre el rostro con movimientos circulares.\n4. Evita el contorno de ojos.\n5. Enjuaga abundantemente.\n6. Usa mañana y noche.",
    ingredients: "Aqua, Sodium Laureth Sulfate, Glycerin, Salicylic Acid, Glycolic Acid, Zinc Gluconate, Sodium Hydroxide, PEG-90 Glyceryl Isostearate, Laureth-2, Coco-Betaine, Parfum."
  },
  "3": {
    id: "3",
    name: "Photoderm Cover Touch FPS50+",
    brand: "Eucerin",
    price: 120,
    originalPrice: 150,
    category: "Protectores Solares",
    description: "Protector solar facial anti-brillo y toque seco para piel mixta y grasa. Tono dorado con cobertura alta - 40ml",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    fullDescription: "Protector solar con color de muy alta protección que combina fotoprotección UVA/UVB de amplio espectro con cobertura unificadora. Su textura ultra-ligera y de acabado mate es ideal para pieles grasas y con tendencia acneica. Resistente al agua y al sudor.",
    howToUse: "1. Aplica generosamente sobre el rostro limpio y seco.\n2. Usa antes de la exposición solar.\n3. Reaplicar cada 2 horas o después de nadar o transpirar.\n4. Puede usarse como base de maquillaje.\n5. No olvides aplicar también en cuello y escote.",
    ingredients: "Aqua, Dibutyl Adipate, Octocrylene, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Butyl Methoxydibenzoylmethane, Titanium Dioxide, Zinc Oxide, Silica, CI 77492, CI 77491, CI 77499."
  },
  "4": {
    id: "4",
    name: "Pigmentbio Foaming Cream",
    brand: "Bioderma",
    price: 95,
    category: "Limpiadores",
    description: "Limpiador despigmentante crema-espuma facial y corporal. Limpia y exfolia suavemente, reduce manchas oscuras - 200ml",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
    ],
    fullDescription: "Limpiador suave que exfolia y unifica el tono de la piel mientras limpia. Formulado con ingredientes activos despigmentantes que ayudan a reducir la apariencia de manchas oscuras y prevenir su reaparición. Su textura crema se transforma en espuma delicada.",
    howToUse: "1. Aplica sobre piel húmeda.\n2. Masajea suavemente hasta obtener una espuma ligera.\n3. Insiste en zonas con manchas.\n4. Enjuaga con agua tibia.\n5. Seca con suaves toques.\n6. Usa mañana y noche para mejores resultados.",
    ingredients: "Aqua, Glycerin, Sodium Cocoamphoacetate, Lauryl Glucoside, Acrylates Copolymer, Niacinamide, Mannitol, Xylitol, Rhamnose, Laminaria Ochroleuca Extract, Lysine, Azelaic Acid."
  },
  "5": {
    id: "5",
    name: "Crema Contorno de Ojos Anti-edad Intensiva",
    brand: "Vichy",
    price: 200,
    originalPrice: 250,
    category: "Contorno de Ojos",
    description: "Con Retinol y Péptidos. Reduce ojeras, bolsas y líneas de expresión. Hidratación 24h - 15ml",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Tratamiento intensivo para el contorno de ojos formulado con Retinol puro y péptidos reafirmantes. Reduce visiblemente las ojeras, disminuye las bolsas y suaviza las líneas de expresión y arrugas. Su textura sedosa se absorbe rápidamente sin dejar residuos grasos.",
    howToUse: "1. Aplica por la mañana y/o noche sobre piel limpia.\n2. Toma una pequeña cantidad con el dedo anular.\n3. Aplica con suaves toques desde el ángulo interno hacia el externo.\n4. No frotes, da pequeños toques hasta absorción.\n5. Evita el contacto directo con los ojos.",
    ingredients: "Aqua, Glycerin, Dimethicone, Retinol, Palmitoyl Pentapeptide-4, Caffeine, Hyaluronic Acid, Niacinamide, Adenosine, Tocopheryl Acetate, Panthenol."
  },
  "6": {
    id: "6",
    name: "Hydrating Cleanser Limpiador Facial Espuma",
    brand: "CeraVe",
    price: 75,
    category: "Limpiadores",
    description: "Con Ceramidas y Ácido Hialurónico. Limpia sin resecar, restaura la barrera cutánea - 473ml",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Limpiador suave e hidratante que elimina el maquillaje, la suciedad y el exceso de grasa mientras mantiene la barrera protectora de la piel. Formulado con 3 ceramidas esenciales y ácido hialurónico para ayudar a retener la humedad natural de la piel. Desarrollado con dermatólogos.",
    howToUse: "1. Humedece la piel con agua tibia.\n2. Masajea el limpiador sobre el rostro con movimientos circulares suaves.\n3. Enjuaga bien.\n4. Seca con toques suaves.\n5. Úsalo mañana y noche.\n6. Apto para todo tipo de piel, incluso sensible.",
    ingredients: "Aqua, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Hyaluronic Acid, Cholesterol, Sodium Lauroyl Lactylate, Xanthan Gum, Polysorbate 20, Ethylhexylglycerin."
  },
  "7": {
    id: "7",
    name: "Hydro Boost Mascarilla Hidratante Nocturna",
    brand: "Neutrogena",
    price: 45,
    originalPrice: 55,
    category: "Mascarillas",
    description: "Con Ácido Hialurónico. Hidratación intensa durante la noche, despierta con piel suave - 50ml",
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
    ],
    fullDescription: "Mascarilla nocturna que trabaja mientras duermes para proporcionar hidratación profunda e intensa. Su fórmula con ácido hialurónico purificado atrae y retiene la humedad, dejando la piel suave, flexible y radiante al despertar. Textura ligera en gel que se absorbe rápidamente.",
    howToUse: "1. Limpia y seca tu rostro antes de acostarte.\n2. Aplica una capa fina y uniforme sobre rostro y cuello.\n3. Evita el contorno de ojos.\n4. Deja actuar toda la noche.\n5. No enjuagues.\n6. Por la mañana, lava tu rostro normalmente.\n7. Usa 2-3 veces por semana.",
    ingredients: "Water, Dimethicone, Glycerin, Hyaluronic Acid, Dimethicone/Vinyl Dimethicone Crosspolymer, Phenoxyethanol, Synthetic Beeswax, Cetearyl Olivate, Sorbitan Olivate, Dimethiconol."
  },
  "8": {
    id: "8",
    name: "100% Organic Cold-Pressed Rose Hip Seed Oil",
    brand: "The Ordinary",
    price: 160,
    category: "Aceites Faciales",
    description: "Aceite facial nutritivo y regenerador. Reduce cicatrices, manchas y líneas finas - 30ml",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    fullDescription: "Aceite puro de rosa mosqueta 100% orgánico prensado en frío. Rico en ácidos grasos esenciales y vitaminas que ayudan a mejorar la apariencia de cicatrices, manchas, pigmentación irregular y signos de envejecimiento. Su textura ligera se absorbe fácilmente sin dejar sensación grasa.",
    howToUse: "1. Aplica por la noche después de tratamientos acuosos.\n2. Usa 2-3 gotas en las palmas.\n3. Calienta el aceite frotando las manos.\n4. Presiona suavemente sobre el rostro y cuello.\n5. Evita el contorno de ojos si tienes piel muy sensible.\n6. Puede mezclarse con tu crema habitual.",
    ingredients: "Rosa Canina Seed Oil (100% Organic, Cold-Pressed)"
  },
  // Productos del carrusel "Más Vendidos"
  "bs-1": {
    id: "bs-1",
    name: "Crema Hidratante Facial con Ácido Hialurónico y Vitamina E",
    brand: "Nivea",
    price: 95,
    originalPrice: 120,
    category: "Hidratantes",
    description: "Crema hidratante para pieles secas con ácido hialurónico y vitamina E. Hidratación profunda 24h.",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
    ],
    fullDescription: "Crema hidratante intensiva que proporciona hidratación profunda durante 24 horas. Su fórmula enriquecida con ácido hialurónico y vitamina E ayuda a retener la humedad en la piel, mejorando su elasticidad y suavidad. Ideal para pieles secas y deshidratadas.",
    howToUse: "1. Limpia tu rostro.\n2. Aplica una cantidad generosa sobre rostro y cuello.\n3. Masajea con movimientos circulares ascendentes.\n4. Usa mañana y noche.\n5. Perfecta como base de maquillaje.",
    ingredients: "Aqua, Glycerin, Hyaluronic Acid, Tocopheryl Acetate, Cetearyl Alcohol, Dimethicone, Phenoxyethanol, Carbomer, Sodium Hydroxide."
  },
  "bs-2": {
    id: "bs-2",
    name: "Sérum Concentrado Reparador Nocturno con Retinol y Niacinamida",
    brand: "La Roche-Posay",
    price: 220,
    category: "Serums",
    description: "Sérum anti-edad con retinol y niacinamida. Repara y regenera la piel durante la noche.",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    fullDescription: "Sérum nocturno concentrado que combina retinol puro y niacinamida para combatir los signos del envejecimiento. Ayuda a reducir arrugas, líneas finas y manchas mientras unifica el tono de la piel. Su fórmula de rápida absorción trabaja durante la noche cuando la piel está más receptiva.",
    howToUse: "1. Aplica solo por la noche sobre piel limpia.\n2. Usa 3-4 gotas en rostro y cuello.\n3. Evita el contorno de ojos.\n4. Espera 1-2 minutos antes de aplicar crema.\n5. Usa protector solar durante el día.\n6. Comienza 2-3 veces por semana.",
    ingredients: "Aqua, Niacinamide, Retinol, Glycerin, Propylene Glycol, Dimethicone, Adenosine, Pentylene Glycol, Caprylyl Glycol, BHT."
  },
  "bs-3": {
    id: "bs-3",
    name: "Protector Solar Facial SPF 50+ Resistente al Agua",
    brand: "Eucerin",
    price: 135,
    originalPrice: 165,
    category: "Protectores Solares",
    description: "Protector solar con antioxidantes, resistente al agua. Protección muy alta UVA/UVB.",
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Protector solar de muy alta protección que defiende la piel del daño solar inmediato y a largo plazo. Enriquecido con antioxidantes que neutralizan los radicales libres causados por la radiación UV. Resistente al agua y al sudor, ideal para actividades al aire libre.",
    howToUse: "1. Aplica generosamente 15 minutos antes de la exposición solar.\n2. Reaplicar cada 2 horas.\n3. Reaplicar después de nadar o transpirar.\n4. Evita las horas de mayor intensidad solar.\n5. No olvides orejas, cuello y manos.",
    ingredients: "Aqua, Homosalate, Octocrylene, Butyl Methoxydibenzoylmethane, Ethylhexyl Salicylate, Glycerin, Titanium Dioxide, Tocopheryl Acetate, Ascorbyl Palmitate."
  },
  "bs-4": {
    id: "bs-4",
    name: "Tónico Facial Purificante con Extracto de Té Verde y Hamamelis",
    brand: "Bioderma",
    price: 85,
    category: "Tónicos",
    description: "Tónico purificante natural con té verde y hamamelis. Equilibra y refresca la piel.",
    images: [
      "https://images.unsplash.com/photo-1512303452766-a48f2bc60dcd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
    ],
    fullDescription: "Tónico facial purificante que equilibra el pH de la piel después de la limpieza. Formulado con extracto de té verde y hamamelis, ayuda a minimizar la apariencia de los poros, controlar el brillo y refrescar la piel. Sin alcohol, apto para pieles sensibles.",
    howToUse: "1. Usa después de limpiar el rostro.\n2. Aplica con un algodón sobre rostro y cuello.\n3. No enjuagues.\n4. Continúa con tu sérum y crema habitual.\n5. Usa mañana y noche.\n6. Evita el contorno de ojos.",
    ingredients: "Aqua, Glycerin, Camellia Sinensis Leaf Extract, Hamamelis Virginiana Water, Niacinamide, Panthenol, Allantoin, Citric Acid, Sodium Benzoate, Potassium Sorbate."
  }
};

// Función para obtener un producto por ID
export const getProductById = (id: string): ProductDetail | null => {
  return productDetails[id] || null;
};

// Función para obtener productos relacionados por categoría
export const getRelatedProducts = (category: string, excludeId: string, limit: number = 6): ProductDetail[] => {
  return Object.values(productDetails)
    .filter(product => product.category === category && product.id !== excludeId)
    .slice(0, limit);
};
