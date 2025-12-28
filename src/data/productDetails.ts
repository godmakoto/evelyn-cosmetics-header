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
  },
  // Productos de la tienda
  "shop-0": {
    id: "shop-0",
    name: "La Roche-Posay Effaclar Duo+ Unifiant Tratamiento Corrector Desincrustante Anti-Imperfecciones con Color Tono Medio para Pieles Grasas con Tendencia Acneica",
    brand: "La Roche-Posay",
    price: 189.0,
    originalPrice: 225.0,
    category: "Cuidado Facial",
    description: "Tratamiento corrector con color que unifica el tono mientras trata las imperfecciones.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    fullDescription: "Tratamiento anti-imperfecciones con color que combina eficacia anti-acné con cobertura unificadora. Su fórmula avanzada contiene niacinamida, ácido salicílico y procerad para reducir las imperfecciones, desobstruir los poros y prevenir las marcas residuales. El tono medio se adapta a la mayoría de tonos de piel, proporcionando una cobertura natural.",
    howToUse: "1. Aplica sobre piel limpia y seca.\n2. Extiende una pequeña cantidad sobre el rostro.\n3. Insiste en zonas con imperfecciones.\n4. Puede usarse solo o bajo el maquillaje.\n5. Usa mañana y noche.\n6. No olvides usar protector solar durante el día.",
    ingredients: "Aqua, Glycerin, Niacinamide, Isocetyl Stearate, Salicylic Acid, Silica, Ammonium Polyacryldimethyltauramide, Zinc PCA, Piroctone Olamine, CI 77891, CI 77492, CI 77491, CI 77499."
  },
  "shop-1": {
    id: "shop-1",
    name: "Avène Cicalfate+ Crema Reparadora Protectora Intensiva 100ml",
    brand: "Avène",
    price: 185.0,
    originalPrice: 220.0,
    category: "Cuidado Facial",
    description: "Crema reparadora para pieles irritadas y sensibles. Acción calmante inmediata.",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
    ],
    fullDescription: "Crema reparadora post-acto que acelera la recuperación de la piel irritada, sensibilizada o fragilizada. Su complejo patentado de sucralfato, sulfato de cobre y zinc favorece la reparación cutánea mientras protege contra infecciones bacterianas. La textura no grasa se absorbe rápidamente sin dejar residuos blancos.",
    howToUse: "1. Limpia y seca la zona a tratar.\n2. Aplica una capa gruesa de crema.\n3. Masajea suavemente hasta absorción.\n4. Usa 2 veces al día o según necesidad.\n5. Ideal para pieles post-procedimientos.\n6. Apto para toda la familia.",
    ingredients: "Avene Thermal Spring Water, Caprylic/Capric Triglyceride, Glycerin, Copper Sulfate, Zinc Sulfate, Sucralfate, Hyaluronic Acid, Oenothera Biennis Oil, Tocopherol."
  },
  "shop-2": {
    id: "shop-2",
    name: "La Roche-Posay Effaclar Duo+ Tratamiento Anti-Imperfecciones",
    brand: "La Roche-Posay",
    price: 165.5,
    originalPrice: 195.0,
    category: "Cuidado Facial",
    description: "Tratamiento corrector y desincrustante para pieles grasas con tendencia acneica.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Cuidado anti-imperfecciones completo que actúa sobre todas las etapas de formación de las imperfecciones. Reduce las lesiones de acné, desincrusta los poros, limita las marcas residuales y previene la reaparición. Su fórmula con niacinamida, ácido salicílico y procerad ofrece resultados visibles en 12 horas.",
    howToUse: "1. Aplica mañana y/o noche sobre piel limpia.\n2. Extiende sobre todo el rostro.\n3. Evita el contorno de ojos.\n4. Deja absorber antes de aplicar otros productos.\n5. Puede experimentarse ligero hormigueo inicial.\n6. Usar protector solar durante el día.",
    ingredients: "Aqua, Glycerin, Dimethicone, Niacinamide, Isocetyl Stearate, Salicylic Acid, Silica, Ammonium Polyacryldimethyltauramide, Zinc PCA, Linoleic Acid, Mannose, Piroctone Olamine."
  },
  "shop-3": {
    id: "shop-3",
    name: "Isdin Fotoprotector Fusion Water SPF50+ 50ml",
    brand: "Isdin",
    price: 145.0,
    category: "Protección Solar",
    description: "Fotoprotector ultraligero de fase acuosa. Textura fresca y absorción inmediata.",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Fotoprotector facial de muy alta protección con tecnología Fusion Water. Su textura ultraligera de base acuosa se funde con la piel proporcionando una sensación fresca e hidratante. Protege contra los rayos UVA y UVB mientras previene el fotoenvejecimiento. Resistente al agua y al sudor, ideal para uso diario y actividades deportivas.",
    howToUse: "1. Agita antes de usar.\n2. Aplica generosamente sobre piel seca.\n3. Usa 30 minutos antes de la exposición solar.\n4. Reaplicar cada 2 horas.\n5. Reaplicar después de nadar o transpirar.\n6. Adecuado como base de maquillaje.",
    ingredients: "Aqua, Dibutyl Adipate, Cyclopentasiloxane, Octocrylene, Alcohol Denat, Butyl Methoxydibenzoylmethane, Cyclohexasiloxane, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, PEG-30 Dipolyhydroxystearate."
  },
  "shop-4": {
    id: "shop-4",
    name: "Eucerin Hyaluron-Filler Crema de Día SPF30 Piel Seca",
    brand: "Eucerin",
    price: 210.0,
    originalPrice: 250.0,
    category: "Cuidado Facial",
    description: "Rellenador de arrugas con ácido hialurónico de alto y bajo peso molecular.",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Crema anti-edad de día que rellena las arrugas desde el interior. Su fórmula innovadora combina dos tipos de ácido hialurónico (de alto y bajo peso molecular) que penetran en diferentes capas de la piel para máxima eficacia. El glicino-saponina activa la producción natural de ácido hialurónico. Incluye protección solar SPF30 y filtro UVA.",
    howToUse: "1. Aplica por la mañana sobre piel limpia.\n2. Masajea suavemente sobre rostro, cuello y escote.\n3. Evita el contorno de ojos.\n4. Úsala antes del maquillaje.\n5. Para mejores resultados, combina con el sérum Hyaluron-Filler.\n6. Adecuada para uso diario.",
    ingredients: "Aqua, Glycerin, Butyl Methoxydibenzoylmethane, Ethylhexyl Salicylate, Octocrylene, Sodium Hyaluronate, Magnolia Officinalis Bark Extract, Pimpinella Anisum Fruit Extract, Dimethicone, Carbomer."
  },
  "shop-5": {
    id: "shop-5",
    name: "Vichy Minéral 89 Sérum Fortificante Hidratante 50ml",
    brand: "Vichy",
    price: 175.0,
    category: "Cuidado Facial",
    description: "Booster diario fortificante y rellenador con ácido hialurónico natural.",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    fullDescription: "Sérum concentrado fortificante que combina 89% de Agua Volcánica Mineralizante de Vichy con ácido hialurónico natural. Fortalece la barrera cutánea, protege contra agresiones externas y proporciona hidratación intensa durante 24 horas. Su textura gel fresca se absorbe instantáneamente dejando la piel suave, elástica y radiante.",
    howToUse: "1. Aplica mañana y noche como primer paso.\n2. Usa 2-3 gotas sobre piel limpia.\n3. Extiende sobre rostro y cuello.\n4. Masajea con movimientos ascendentes.\n5. Continúa con tu crema habitual.\n6. Apto para todo tipo de piel, incluso sensible.",
    ingredients: "Aqua (Vichy Volcanic Water 89%), Glycerin, Hyaluronic Acid, Pentylene Glycol, Phenoxyethanol, Ammonium Polyacryldimethyltauramide, Disodium EDTA, Carbomer, PPG-5-Ceteth-20."
  },
  "shop-6": {
    id: "shop-6",
    name: "CeraVe Crema Hidratante para Piel Seca a Muy Seca 340g",
    brand: "CeraVe",
    price: 125.0,
    originalPrice: 145.0,
    category: "Cuidado Corporal",
    description: "Crema hidratante con ceramidas esenciales y ácido hialurónico. Textura rica.",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    fullDescription: "Crema corporal intensiva desarrollada con dermatólogos para restaurar y mantener la barrera protectora de la piel. Contiene 3 ceramidas esenciales idénticas a las de la piel, ácido hialurónico y tecnología MVE que proporciona hidratación continua durante 24 horas. Su textura rica pero no grasa se absorbe rápidamente.",
    howToUse: "1. Aplica generosamente sobre piel limpia.\n2. Masajea hasta completa absorción.\n3. Insiste en zonas más secas.\n4. Usa después del baño o ducha.\n5. Puede usarse en rostro y cuerpo.\n6. Apta para toda la familia.",
    ingredients: "Aqua, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Hyaluronic Acid, Cholesterol, Dimethicone, Petrolatum."
  },
  "shop-7": {
    id: "shop-7",
    name: "Bioderma Sensibio H2O Agua Micelar 500ml",
    brand: "Bioderma",
    price: 135.0,
    category: "Limpieza Facial",
    description: "Agua micelar desmaquillante para piel sensible. Sin enjuague necesario.",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    fullDescription: "Primera y original agua micelar biológicamente compatible con la piel. Las micelas contenidas en su fórmula capturan y eliminan eficazmente maquillaje, impurezas y contaminación, respetando el equilibrio cutáneo. Calma y previene las reacciones de irritación. Sin perfume, sin alcohol, sin parabenos. Testada oftalmológicamente.",
    howToUse: "1. Impregna un algodón con el producto.\n2. Limpia suavemente rostro y ojos.\n3. Repite hasta que el algodón salga limpio.\n4. No requiere enjuague.\n5. Puedes usarla por la mañana y noche.\n6. Continúa con tu rutina de cuidado.",
    ingredients: "Aqua, PEG-6 Caprylic/Capric Glycerides, Fructooligosaccharides, Mannitol, Xylitol, Rhamnose, Cucumis Sativus Fruit Extract, Propylene Glycol, Cetrimonium Bromide, Disodium EDTA."
  },
  "shop-8": {
    id: "shop-8",
    name: "SkinCeuticals C E Ferulic Sérum Antioxidante 30ml",
    brand: "SkinCeuticals",
    price: 450.0,
    originalPrice: 520.0,
    category: "Cuidado Facial",
    description: "Sérum antioxidante de día con vitamina C pura al 15%, vitamina E y ácido ferúlico.",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Sérum revolucionario de vitamina C que proporciona protección antioxidante avanzada contra el daño ambiental. Su combinación sinérgica de 15% L-ácido ascórbico puro, 1% alfa-tocoferol y 0.5% ácido ferúlico neutraliza los radicales libres, mejora signos de envejecimiento, reduce arrugas y líneas finas, firmeza y luminosidad. Protección que permanece hasta 72 horas.",
    howToUse: "1. Aplica por la mañana después de limpiar.\n2. Usa 4-5 gotas sobre rostro seco.\n3. Extiende sobre cuello y escote.\n4. Espera absorción antes de crema.\n5. Continúa con protector solar.\n6. Puede experimentarse ligero hormigueo.",
    ingredients: "L-Ascorbic Acid 15%, Alpha Tocopherol 1%, Ferulic Acid 0.5%, Water, Ethoxydiglycol, Propylene Glycol, Glycerin, Triethanolamine, Laureth-23, Phenoxyethanol."
  },
  "shop-9": {
    id: "shop-9",
    name: "Avène Eau Thermale Spray 300ml Pack Duo",
    brand: "Avène",
    price: 95.0,
    category: "Cuidado Facial",
    description: "Agua termal calmante y suavizante. Ideal para todo tipo de pieles sensibles.",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Agua termal 100% natural y estéril, directamente extraída de la fuente de Avène en Francia. Rica en oligoelementos y silicatos, proporciona propiedades calmantes, desensibilizantes y suavizantes clínicamente probadas. Alivia irritaciones, rojeces y sensaciones de tirantez. Apta para pieles sensibles, reactivas, alérgicas e incluso con dermatitis.",
    howToUse: "1. Agita antes de usar.\n2. Pulveriza sobre rostro cerrado.\n3. Mantén a 20cm de distancia.\n4. Deja actuar unos segundos.\n5. Seca con toques suaves.\n6. Usa en cualquier momento del día para refrescar.",
    ingredients: "Avene Aqua (Avene Thermal Spring Water), Nitrogen."
  },
  "shop-10": {
    id: "shop-10",
    name: "La Roche-Posay Anthelios Age Correct SPF50 50ml",
    brand: "La Roche-Posay",
    price: 195.0,
    originalPrice: 230.0,
    category: "Protección Solar",
    description: "Fotoprotector anti-edad con niacinamida y ácido hialurónico fragmentado.",
    images: [
      "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    ],
    fullDescription: "Fotoprotector facial anti-edad que combina muy alta protección solar con un cuidado anti-edad avanzado. Su fórmula contiene [Niacinamida + Ácido Hialurónico Fragmentado + Phe-Resorcinol] que corrige arrugas, manchas y pérdida de firmeza mientras protege contra rayos UVA/UVB. Textura ultra-fluida no grasa con acabado mate.",
    howToUse: "1. Aplica generosamente antes de la exposición solar.\n2. Extiende uniformemente sobre rostro y cuello.\n3. Reaplicar cada 2 horas.\n4. Reaplicar después de nadar o transpirar.\n5. Puede usarse como base de maquillaje.\n6. Ideal para prevenir fotoenvejecimiento.",
    ingredients: "Aqua, Homosalate, Silica, Drometrizole Trisiloxane, Niacinamide, Ethylhexyl Triazone, Phenylbenzimidazole Sulfonic Acid, Glycerin, Sodium Hyaluronate, Phe-Resorcinol, Adenosine."
  },
  "shop-11": {
    id: "shop-11",
    name: "Isdin Isdinceutics Flavo-C Ultraglican Ampollas 30 Unidades",
    brand: "Isdin",
    price: 285.0,
    category: "Cuidado Facial",
    description: "Sérum antioxidante de día en ampollas. Luminosidad y firmeza intensiva.",
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Ampollas antioxidantes que combinan vitamina C al 5% con UltraGlycans (proteoglicanos + pre-proteoglicanos) para proporcionar luminosidad inmediata y firmeza a largo plazo. Su fórmula en ampollas monodosis asegura máxima estabilidad y eficacia. Mejora la textura, reduce arrugas y unifica el tono de la piel. Resultados visibles desde la primera aplicación.",
    howToUse: "1. Agita la ampolla antes de abrir.\n2. Rompe la ampolla con el easy-open incluido.\n3. Aplica media ampolla por la mañana.\n4. Extiende sobre rostro, cuello y escote.\n5. Masajea hasta completa absorción.\n6. Continúa con crema y protector solar.",
    ingredients: "Propylene Glycol, Aqua, Ascorbic Acid 5%, Proteoglycans, Pre-Proteoglycans, Glycerin, PPG-26-Buteth-26, PEG-40 Hydrogenated Castor Oil, Parfum, Tocopherol."
  },
  "shop-12": {
    id: "shop-12",
    name: "Eucerin DermoCapillaire Champú Anticaspa 250ml",
    brand: "Eucerin",
    price: 78.5,
    originalPrice: 95.0,
    category: "Cuidado Capilar",
    description: "Champú anticaspa con piroctona olamina. Alivia el picor del cuero cabelludo.",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Champú especializado que elimina eficazmente la caspa visible mientras alivia el picor del cuero cabelludo desde la primera aplicación. Su fórmula con Piroctona Olamina combate las causas de la caspa y previene su reaparición. El Polidocanol calma el picor inmediatamente. Testado clínicamente en cueros cabelludos sensibles.",
    howToUse: "1. Aplica sobre cabello húmedo.\n2. Masajea suavemente el cuero cabelludo.\n3. Deja actuar 2 minutos.\n4. Enjuaga abundantemente.\n5. Usa 2-3 veces por semana.\n6. Para mejores resultados, alterna con champú suave.",
    ingredients: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride, Piroctone Olamine, Climbazole, Polidocanol, Glycerin, PEG-120 Methyl Glucose Dioleate, Citric Acid, Sodium Benzoate."
  },
  "shop-13": {
    id: "shop-13",
    name: "Vichy Liftactiv Supreme Crema Anti-Arrugas Piel Normal Mixta",
    brand: "Vichy",
    price: 225.0,
    category: "Cuidado Facial",
    description: "Crema anti-arrugas y firmeza con rhamnose al 5% y ácido hialurónico.",
    images: [
      "https://images.unsplash.com/photo-1556229012-50c74f5c9f25?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    fullDescription: "Tratamiento anti-edad global que corrige arrugas, redefine contornos y aporta firmeza desde la primera aplicación. Su fórmula innovadora con Rhamnose al 5%, un azúcar vegetal pro-juventud, estimula la renovación celular. Combinado con cafeína y adenosina, reafirma visiblemente el óvalo facial. Enriquecida con Agua Volcánica de Vichy mineralizante.",
    howToUse: "1. Aplica mañana y/o noche.\n2. Extiende sobre rostro limpio y cuello.\n3. Masajea desde el centro hacia exterior.\n4. Evita el contorno de ojos.\n5. Ideal como base de maquillaje.\n6. Resultados visibles en 4 semanas.",
    ingredients: "Aqua (Vichy Volcanic Water), Glycerin, Rhamnose 5%, Cyclohexasiloxane, Alcohol Denat, Dimethicone, Isohexadecane, Adenosine, Caffeine, Hyaluronic Acid, Tocopherol."
  },
  "shop-14": {
    id: "shop-14",
    name: "CeraVe Gel Limpiador Espumoso Control Grasa 236ml",
    brand: "CeraVe",
    price: 85.0,
    category: "Limpieza Facial",
    description: "Gel espumoso para piel normal a grasa. Con ceramidas y niacinamida.",
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    fullDescription: "Limpiador facial espumoso desarrollado con dermatólogos específicamente para pieles normales a grasas. Elimina exceso de grasa, suciedad y maquillaje sin alterar la barrera protectora de la piel. Con 3 ceramidas esenciales, niacinamida y ácido hialurónico. Su fórmula con tecnología MVE libera ingredientes gradualmente para hidratación prolongada.",
    howToUse: "1. Humedece el rostro con agua tibia.\n2. Aplica el gel y masajea suavemente.\n3. Crea espuma con movimientos circulares.\n4. Evita el área de los ojos.\n5. Enjuaga completamente.\n6. Usa mañana y noche.",
    ingredients: "Aqua, Cocamidopropyl Hydroxysultaine, Glycerin, Sodium Lauroyl Sarcosinate, Niacinamide, Gluconolactone, Sodium Methyl Cocoyl Taurate, Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid."
  },
  "shop-15": {
    id: "shop-15",
    name: "Bioderma Atoderm Intensive Baume Ultra-Calmante 500ml",
    brand: "Bioderma",
    price: 155.0,
    originalPrice: 185.0,
    category: "Cuidado Corporal",
    description: "Bálsamo ultra-calmante para piel muy seca a atópica. Alivio inmediato del picor.",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    fullDescription: "Bálsamo corporal anti-picor que calma inmediatamente e hidrata duraderamente las pieles muy secas, irritadas y con tendencia atópica. Su patente Skin Barrier Therapy refuerza la barrera cutánea y limita la proliferación de bacterias irritantes. El complejo Lipigenium restaura los lípidos esenciales. Textura fundente, no grasa, de rápida absorción.",
    howToUse: "1. Aplica 1-2 veces al día sobre piel limpia.\n2. Insiste en zonas más secas e irritadas.\n3. Masajea hasta completa absorción.\n4. Ideal después de la ducha.\n5. Puede usarse en cara y cuerpo.\n6. Apto para toda la familia, incluso bebés.",
    ingredients: "Aqua, Glycerin, Paraffinum Liquidum, Niacinamide, Butyrospermum Parkii Butter, Cetearyl Alcohol, PEG-30 Dipolyhydroxystearate, Mannitol, Xylitol, Rhamnose, Fructooligosaccharides, Laminaria Ochroleuca Extract."
  },
  "shop-16": {
    id: "shop-16",
    name: "SkinCeuticals Retinol 0.5 Refining Night Cream 30ml",
    brand: "SkinCeuticals",
    price: 320.0,
    category: "Cuidado Facial",
    description: "Crema de noche con retinol puro al 0.5%. Mejora textura y reduce arrugas.",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    fullDescription: "Tratamiento nocturno concentrado con 0.5% de retinol puro microencapsulado para máxima eficacia y mínima irritación. Acelera la renovación celular, mejora la textura de la piel, minimiza los poros dilatados y reduce las líneas finas y arrugas. Su sistema de liberación gradual optimiza la tolerancia. Resultados visibles en 4-12 semanas.",
    howToUse: "1. Aplica solo por la noche.\n2. Usa sobre piel completamente seca.\n3. Comienza 2-3 veces por semana.\n4. Aumenta gradualmente la frecuencia.\n5. Evita el contorno de ojos.\n6. Usa protector solar durante el día obligatoriamente.",
    ingredients: "Aqua, Propylene Glycol, Dimethicone, Cetyl Alcohol, Retinol 0.5%, Allyl Methacrylates Crosspolymer, Glycerin, Polysorbate 20, BHT, Bisabolol, Tocopherol."
  },
  "shop-17": {
    id: "shop-17",
    name: "Avène Cleanance Comedomed Concentrado Anti-Imperfecciones 30ml",
    brand: "Avène",
    price: 145.0,
    originalPrice: 170.0,
    category: "Cuidado Facial",
    description: "Concentrado anti-imperfecciones con Comedoclastin. Reduce puntos negros.",
    images: [
      "https://images.unsplash.com/photo-1556228720-da5274c3fb6f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    ],
    fullDescription: "Concentrado revolucionario que actúa sobre comedones (puntos negros y puntos blancos) y previene su reaparición. Su activo patentado Comedoclastin, derivado de semillas de leche, regula la producción de sebo y elimina las células muertas que obstruyen los poros. Resultados visibles: -50% de comedones en 28 días. Textura fluida no grasa.",
    howToUse: "1. Aplica por la noche sobre piel limpia.\n2. Extiende sobre todo el rostro.\n3. Evita el contorno de ojos.\n4. Deja secar antes de aplicar crema.\n5. Puede experimentarse ligero hormigueo.\n6. Usa protector solar durante el día.",
    ingredients: "Avene Thermal Spring Water, Propanediol, Niacinamide, Glycolic Acid, Lactic Acid, Comedoclastin (Milk Thistle Seed Extract), Salicylic Acid, Zinc Gluconate, Glycerin, Tocopherol."
  },
  "shop-18": {
    id: "shop-18",
    name: "La Roche-Posay Cicaplast Baume B5+ Bálsamo Reparador 100ml",
    brand: "La Roche-Posay",
    price: 115.0,
    category: "Cuidado Corporal",
    description: "Bálsamo reparador multiusos con panthenol al 5%. Para toda la familia.",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
    ],
    fullDescription: "Bálsamo reparador multiusos que calma y repara la piel irritada, sensibilizada o fragilizada. Su nueva fórmula mejorada con [Panthenol 5% + Madecassoside + Cobre-Zinc-Manganeso] acelera la recuperación cutánea. Textura no grasa que forma una película protectora. Ideal para toda la familia, incluso bebés. Sin perfume, sin parabenos.",
    howToUse: "1. Aplica generosamente sobre la zona a tratar.\n2. Usa sobre piel limpia y seca.\n3. Puede aplicarse 2-3 veces al día.\n4. Ideal post-procedimientos estéticos.\n5. Apto para cara y cuerpo.\n6. Seguro en bebés desde el nacimiento.",
    ingredients: "Aqua, Panthenol 5%, Glycerin, Butyrospermum Parkii Butter, Madecassoside, Copper Sulfate, Zinc Sulfate, Manganese Sulfate, Capryloyl Glycine, Dimethicone, Tocopherol."
  },
  "shop-19": {
    id: "shop-19",
    name: "Isdin Foto Ultra Age Repair Fusion Water SPF50 50ml",
    brand: "Isdin",
    price: 175.0,
    originalPrice: 205.0,
    category: "Protección Solar",
    description: "Fotoprotector anti-envejecimiento con textura ultraligera water-like.",
    images: [
      "https://images.unsplash.com/photo-1556228994-7be8d82c30a9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
    ],
    fullDescription: "Fotoprotector facial de muy alta protección que combina protección solar avanzada con activos anti-edad. Su tecnología Fusion Water proporciona textura ultraligera de sensación acuosa. Con [DNA Repairsomes + Vitamina E] repara el daño solar, previene el fotoenvejecimiento y neutraliza radicales libres. Resistente al agua, no irrita los ojos.",
    howToUse: "1. Agita antes de usar.\n2. Aplica generosamente sobre piel seca.\n3. Usa 30 minutos antes de la exposición solar.\n4. Reaplicar cada 2 horas.\n5. Reaplicar después de nadar o transpirar.\n6. Perfecto como primer paso del maquillaje.",
    ingredients: "Aqua, Dibutyl Adipate, Cyclopentasiloxane, Octocrylene, Alcohol Denat, Butyl Methoxydibenzoylmethane, Plankton Extract, Tocopheryl Acetate, PEG-30 Dipolyhydroxystearate, Cyclohexasiloxane."
  },
  "shop-20": {
    id: "shop-20",
    name: "Eucerin Oil Control Dry Touch Gel-Crema SPF50+ 50ml",
    brand: "Eucerin",
    price: 135.0,
    category: "Protección Solar",
    description: "Fotoprotector facial de toque seco para piel grasa y con tendencia acneica.",
    images: [
      "https://images.unsplash.com/photo-1556228721-5e9d89f76c88?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    ],
    fullDescription: "Fotoprotector facial de muy alta protección especialmente formulado para pieles grasas y con tendencia acneica. Su tecnología Oil Control regula la producción de sebo hasta 8 horas proporcionando un acabado mate anti-brillo. La L-Carnitina regula la producción de sebo. Textura gel-crema ultra-ligera, no comedogénica. Resistente al agua y al sudor.",
    howToUse: "1. Aplica generosamente antes de la exposición solar.\n2. Extiende uniformemente sobre el rostro.\n3. Evita el contorno de ojos.\n4. Reaplicar cada 2 horas.\n5. Reaplicar después de nadar o transpirar.\n6. Puede usarse como base de maquillaje.",
    ingredients: "Aqua, Homosalate, Alcohol Denat, Butyl Methoxydibenzoylmethane, Ethylhexyl Salicylate, Octocrylene, C12-15 Alkyl Benzoate, L-Carnitine, Silica Dimethyl Silylate, Glycyrrhetinic Acid, Glycerin."
  },
  "shop-21": {
    id: "shop-21",
    name: "Vichy Normaderm Phytosolution Gel Purificante 400ml",
    brand: "Vichy",
    price: 110.0,
    originalPrice: 130.0,
    category: "Limpieza Facial",
    description: "Gel limpiador purificante con ácido salicílico y probióticos.",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=600&fit=crop",
    ],
    fullDescription: "Gel limpiador purificante de nueva generación para pieles grasas con tendencia acneica. Su fórmula con [Ácido Salicílico + Probióticos + Ácido Hialurónico] elimina el 91% de las impurezas, reduce el exceso de sebo y respeta el equilibrio de la microbiota cutánea. Textura gel fresca que se transforma en espuma sedosa. Sin jabón, pH fisiológico.",
    howToUse: "1. Aplica sobre rostro húmedo mañana y noche.\n2. Masajea suavemente con movimientos circulares.\n3. Crea espuma evitando el contorno de ojos.\n4. Enjuaga abundantemente con agua.\n5. Seca sin frotar.\n6. Para mejores resultados, completa con Normaderm Phytosolution.",
    ingredients: "Aqua (Vichy Volcanic Water), Coco-Betaine, Propanediol, PEG-120 Methyl Glucose Dioleate, Salicylic Acid, Glycerin, Vitreoscilla Ferment, Hyaluronic Acid, Zinc PCA, Citric Acid."
  },
  "shop-22": {
    id: "shop-22",
    name: "CeraVe Loción Hidratante Ligera para Rostro SPF25 52ml",
    brand: "CeraVe",
    price: 95.0,
    category: "Cuidado Facial",
    description: "Loción hidratante facial ligera con protección solar. Para uso diario.",
    images: [
      "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Hidratante facial de día con protección solar de amplio espectro desarrollada con dermatólogos. Combina las 3 ceramidas esenciales, niacinamida y ácido hialurónico con SPF25 para hidratar, restaurar la barrera cutánea y proteger del daño solar. Su tecnología MVE proporciona hidratación continua durante 24 horas. Textura ligera, no comedogénica.",
    howToUse: "1. Aplica generosamente cada mañana.\n2. Extiende sobre rostro y cuello.\n3. Usa como último paso del cuidado facial.\n4. Reaplicar cada 2 horas si hay exposición prolongada.\n5. Ideal como base de maquillaje.\n6. Apta para todo tipo de piel.",
    ingredients: "Aqua, Homosalate, Octinoxate, Glycerin, Niacinamide, Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid, Cholesterol, Phytosphingosine, Dimethicone, Carbomer."
  },
  "shop-23": {
    id: "shop-23",
    name: "Bioderma Photoderm MAX Spray SPF50+ 200ml",
    brand: "Bioderma",
    price: 165.0,
    originalPrice: 195.0,
    category: "Protección Solar",
    description: "Spray fotoprotector de muy alta protección. Resistente al agua y sudor.",
    images: [
      "https://images.unsplash.com/photo-1556228994-22d86adf57e6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
    ],
    fullDescription: "Spray solar de muy alta protección que garantiza protección celular optimizada. Su exclusiva patente SUN ACTIVE DEFENSE refuerza las defensas naturales de la piel, protege las células y previene el daño celular. Textura spray ligera e invisible de rápida absorción. Muy resistente al agua, arena y sudor. Sin perfume, sin parabenos. Fotoseguro.",
    howToUse: "1. Agita bien antes de usar.\n2. Pulveriza generosamente antes de la exposición solar.\n3. Reaplicar cada 2 horas mínimo.\n4. Reaplicar después de cada baño.\n5. Puede aplicarse sobre piel húmeda.\n6. Apto para toda la familia a partir de 12 meses.",
    ingredients: "Aqua, Dicaprylyl Carbonate, Octocrylene, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Butyl Methoxydibenzoylmethane, Glycerin, Ectoin, Mannitol, Xylitol, Rhamnose, Tocopherol."
  },
  "shop-24": {
    id: "shop-24",
    name: "SkinCeuticals Hyaluronic Acid Intensifier Sérum 30ml",
    brand: "SkinCeuticals",
    price: 385.0,
    category: "Cuidado Facial",
    description: "Sérum amplificador de ácido hialurónico. Aumenta los niveles en un 30%.",
    images: [
      "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
    ],
    fullDescription: "Sérum revolucionario que multiplica el ácido hialurónico natural de la piel hasta en un 30%. Su fórmula patentada con [Ácido Hialurónico 1.3% + Ácido Polihidroxi + Extracto de Licorice] estimula la producción endógena de ácido hialurónico, mejora el volumen, hidrata profundamente y reduce arrugas. Textura gel sedosa de rápida absorción. Resultados duraderos.",
    howToUse: "1. Aplica mañana y noche después de limpiar.\n2. Usa 4-6 gotas sobre rostro seco.\n3. Extiende sobre cuello y escote.\n4. Espera absorción antes de crema.\n5. Continúa con antioxidante de día.\n6. Resultados óptimos en 8 semanas de uso continuo.",
    ingredients: "Aqua, Cyclohexasiloxane, Glycerin, Alcohol Denat, Hydroxypropyl Tetrahydropyrantriol, Propylene Glycol, Dipotassium Glycyrrhizate, Polysilicone-11, Dimethicone, Sodium Hyaluronate, Gluconic Acid."
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
