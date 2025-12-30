export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  discount?: number;
}

export const shopProducts: ShopProduct[] = [
  {
    id: "shop-0",
    name: "La Roche-Posay Effaclar Duo+ Unifiant Tratamiento Corrector Desincrustante Anti-Imperfecciones con Color Tono Medio para Pieles Grasas con Tendencia Acneica",
    brand: "La Roche-Posay",
    category: "Hidratantes Faciales",
    subcategory: "Piel Mixta a Grasa",
    price: 189.0,
    originalPrice: 225.0,
    description: "Tratamiento corrector con color que unifica el tono mientras trata las imperfecciones.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    discount: 16
  },
  {
    id: "shop-1",
    name: "Avène Cicalfate+ Crema Reparadora Protectora Intensiva 100ml",
    brand: "Avène",
    category: "Hidratantes Corporales",
    subcategory: "Crema",
    price: 185.0,
    originalPrice: 220.0,
    description: "Crema reparadora para pieles irritadas y sensibles. Acción calmante inmediata.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    discount: 16
  },
  {
    id: "shop-2",
    name: "La Roche-Posay Effaclar Duo+ Tratamiento Anti-Imperfecciones",
    brand: "La Roche-Posay",
    category: "Serums",
    subcategory: "Niacimida",
    price: 165.5,
    originalPrice: 195.0,
    description: "Tratamiento corrector y desincrustante para pieles grasas con tendencia acneica.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "shop-3",
    name: "Isdin Fotoprotector Fusion Water SPF50+ 50ml",
    brand: "Isdin",
    category: "Protectores Solares",
    subcategory: "Piel Mixta a Grasa",
    price: 145.0,
    description: "Fotoprotector ultraligero de fase acuosa. Textura fresca y absorción inmediata.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop"
  },
  {
    id: "shop-4",
    name: "Eucerin Hyaluron-Filler Crema de Día SPF30 Piel Seca",
    brand: "Eucerin",
    category: "Hidratantes Faciales",
    subcategory: "Piel normal a seca",
    price: 210.0,
    originalPrice: 250.0,
    description: "Rellenador de arrugas con ácido hialurónico de alto y bajo peso molecular.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    discount: 16
  },
  {
    id: "shop-5",
    name: "Vichy Minéral 89 Sérum Fortificante Hidratante 50ml",
    brand: "Vichy",
    category: "Serums",
    subcategory: "Acido Hialuronico",
    price: 175.0,
    description: "Booster diario fortificante y rellenador con ácido hialurónico natural.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop"
  },
  {
    id: "shop-6",
    name: "CeraVe Crema Hidratante para Piel Seca a Muy Seca 340g",
    brand: "CeraVe",
    category: "Hidratantes Corporales",
    subcategory: "Crema",
    price: 125.0,
    originalPrice: 145.0,
    description: "Crema hidratante con ceramidas esenciales y ácido hialurónico. Textura rica.",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    discount: 14
  },
  {
    id: "shop-7",
    name: "Bioderma Sensibio H2O Agua Micelar 500ml",
    brand: "Bioderma",
    category: "Desmaquillantes",
    subcategory: "Agua Micelar",
    price: 135.0,
    description: "Agua micelar desmaquillante para piel sensible. Sin enjuague necesario.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
  },
  {
    id: "shop-8",
    name: "SkinCeuticals C E Ferulic Sérum Antioxidante 30ml",
    brand: "SkinCeuticals",
    category: "Serums",
    subcategory: "Vitamina C",
    price: 450.0,
    originalPrice: 520.0,
    description: "Sérum antioxidante de día con vitamina C pura al 15%, vitamina E y ácido ferúlico.",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop",
    discount: 13
  },
  {
    id: "shop-9",
    name: "Avène Eau Thermale Spray 300ml Pack Duo",
    brand: "Avène",
    category: "Agua Termal y Mist",
    subcategory: "",
    price: 95.0,
    description: "Agua termal calmante y suavizante. Ideal para todo tipo de pieles sensibles.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop"
  },
  {
    id: "shop-10",
    name: "La Roche-Posay Anthelios Age Correct SPF50 50ml",
    brand: "La Roche-Posay",
    category: "Protectores Solares",
    subcategory: "Piel normal a seca",
    price: 195.0,
    originalPrice: 230.0,
    description: "Fotoprotector anti-edad con niacinamida y ácido hialurónico fragmentado.",
    image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "shop-11",
    name: "Isdin Isdinceutics Flavo-C Ultraglican Ampollas 30 Unidades",
    brand: "Isdin",
    category: "Serums",
    subcategory: "Vitamina C",
    price: 285.0,
    description: "Sérum antioxidante de día en ampollas. Luminosidad y firmeza intensiva.",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop"
  },
  {
    id: "shop-12",
    name: "Eucerin DermoCapillaire Champú Anticaspa 250ml",
    brand: "Eucerin",
    category: "Capilar",
    subcategory: "",
    price: 78.5,
    originalPrice: 95.0,
    description: "Champú anticaspa con piroctona olamina. Alivia el picor del cuero cabelludo.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
    discount: 17
  },
  {
    id: "shop-13",
    name: "Vichy Liftactiv Supreme Crema Anti-Arrugas Piel Normal Mixta",
    brand: "Vichy",
    category: "Hidratantes Faciales",
    subcategory: "Piel Mixta a Grasa",
    price: 225.0,
    description: "Crema anti-arrugas y firmeza con rhamnose al 5% y ácido hialurónico.",
    image: "https://images.unsplash.com/photo-1556229012-50c74f5c9f25?w=400&h=400&fit=crop"
  },
  {
    id: "shop-14",
    name: "CeraVe Gel Limpiador Espumoso Control Grasa 236ml",
    brand: "CeraVe",
    category: "Limpiadores",
    subcategory: "Piel Mixta a Grasa",
    price: 85.0,
    description: "Gel espumoso para piel normal a grasa. Con ceramidas y niacinamida.",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop"
  },
  {
    id: "shop-15",
    name: "Bioderma Atoderm Intensive Baume Ultra-Calmante 500ml",
    brand: "Bioderma",
    category: "Hidratantes Corporales",
    subcategory: "Locion",
    price: 155.0,
    originalPrice: 185.0,
    description: "Bálsamo ultra-calmante para piel muy seca a atópica. Alivio inmediato del picor.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    discount: 16
  },
  {
    id: "shop-16",
    name: "SkinCeuticals Retinol 0.5 Refining Night Cream 30ml",
    brand: "SkinCeuticals",
    category: "Serums",
    subcategory: "Retinol",
    price: 320.0,
    description: "Crema de noche con retinol puro al 0.5%. Mejora textura y reduce arrugas.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop"
  },
  {
    id: "shop-17",
    name: "Avène Cleanance Comedomed Concentrado Anti-Imperfecciones 30ml",
    brand: "Avène",
    category: "Serums",
    subcategory: "Niacimida",
    price: 145.0,
    originalPrice: 170.0,
    description: "Concentrado anti-imperfecciones con Comedoclastin. Reduce puntos negros.",
    image: "https://images.unsplash.com/photo-1556228720-da5274c3fb6f?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "shop-18",
    name: "La Roche-Posay Cicaplast Baume B5+ Bálsamo Reparador 100ml",
    brand: "La Roche-Posay",
    category: "Hidratantes Corporales",
    subcategory: "Crema",
    price: 115.0,
    description: "Bálsamo reparador multiusos con panthenol al 5%. Para toda la familia.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop"
  },
  {
    id: "shop-19",
    name: "Isdin Foto Ultra Age Repair Fusion Water SPF50 50ml",
    brand: "Isdin",
    category: "Protectores Solares",
    subcategory: "Piel sensible",
    price: 175.0,
    originalPrice: 205.0,
    description: "Fotoprotector anti-envejecimiento con textura ultraligera water-like.",
    image: "https://images.unsplash.com/photo-1556228994-7be8d82c30a9?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "shop-20",
    name: "Eucerin Oil Control Dry Touch Gel-Crema SPF50+ 50ml",
    brand: "Eucerin",
    category: "Protectores Solares",
    subcategory: "Piel Mixta a Grasa",
    price: 135.0,
    description: "Fotoprotector facial de toque seco para piel grasa y con tendencia acneica.",
    image: "https://images.unsplash.com/photo-1556228721-5e9d89f76c88?w=400&h=400&fit=crop"
  },
  {
    id: "shop-21",
    name: "Vichy Normaderm Phytosolution Gel Purificante 400ml",
    brand: "Vichy",
    category: "Limpiadores",
    subcategory: "Piel Mixta a Grasa",
    price: 110.0,
    originalPrice: 130.0,
    description: "Gel limpiador purificante con ácido salicílico y probióticos.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "shop-22",
    name: "CeraVe Loción Hidratante Ligera para Rostro SPF25 52ml",
    brand: "CeraVe",
    category: "Hidratantes Faciales",
    subcategory: "Piel Mixta a Grasa",
    price: 95.0,
    description: "Loción hidratante facial ligera con protección solar. Para uso diario.",
    image: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400&h=400&fit=crop"
  },
  {
    id: "shop-23",
    name: "Bioderma Photoderm MAX Spray SPF50+ 200ml",
    brand: "Bioderma",
    category: "Protectores Solares",
    subcategory: "Corporales",
    price: 165.0,
    originalPrice: 195.0,
    description: "Spray fotoprotector de muy alta protección. Resistente al agua y sudor.",
    image: "https://images.unsplash.com/photo-1556228994-22d86adf57e6?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "shop-24",
    name: "SkinCeuticals Hyaluronic Acid Intensifier Sérum 30ml",
    brand: "SkinCeuticals",
    category: "Serums",
    subcategory: "Acido Hialuronico",
    price: 385.0,
    description: "Sérum amplificador de ácido hialurónico. Aumenta los niveles en un 30%.",
    image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=400&h=400&fit=crop"
  },
  // Productos de los carruseles de la página principal
  {
    id: "1",
    name: "Bond Intense Repair Óleo bifasico",
    brand: "Nivea",
    category: "Capilar",
    subcategory: "",
    price: 85,
    originalPrice: 100,
    description: "Óleo bifásico que nutre y realza la vitalidad del cabello, controla el frizz, protección térmica y blindaje anti-humedad - 110ml",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    discount: 15
  },
  {
    id: "2",
    name: "Sebium Gel Moussant Actif",
    brand: "La Roche-Posay",
    category: "Limpiadores",
    subcategory: "Piel Mixta a Grasa",
    price: 180,
    description: "Gel limpiador facial con Ácido salicílico, Ácido glicólico y Gluconato de Zinc. Limpia, purifica y reduce el tamaño de los poros - 532g",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop"
  },
  {
    id: "3",
    name: "Photoderm Cover Touch FPS50+",
    brand: "Eucerin",
    category: "Protectores Solares",
    subcategory: "Piel Mixta a Grasa",
    price: 120,
    originalPrice: 150,
    description: "Protector solar facial anti-brillo y toque seco para piel mixta y grasa. Tono dorado con cobertura alta - 40ml",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    discount: 20
  },
  {
    id: "4",
    name: "Pigmentbio Foaming Cream",
    brand: "Bioderma",
    category: "Exfoliantes faciales",
    subcategory: "Quimicos",
    price: 95,
    description: "Limpiador despigmentante crema-espuma facial y corporal. Limpia y exfolia suavemente, reduce manchas oscuras - 200ml",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop"
  },
  {
    id: "5",
    name: "Crema Contorno de Ojos Anti-edad Intensiva",
    brand: "Vichy",
    category: "Serums",
    subcategory: "Retinol",
    price: 200,
    originalPrice: 250,
    description: "Con Retinol y Péptidos. Reduce ojeras, bolsas y líneas de expresión. Hidratación 24h - 15ml",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop",
    discount: 20
  },
  {
    id: "6",
    name: "Hydrating Cleanser Limpiador Facial Espuma",
    brand: "CeraVe",
    category: "Limpiadores",
    subcategory: "Piel normal a seca",
    price: 75,
    description: "Con Ceramidas y Ácido Hialurónico. Limpia sin resecar, restaura la barrera cutánea - 473ml",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop"
  },
  {
    id: "7",
    name: "Hydro Boost Mascarilla Hidratante Nocturna",
    brand: "Neutrogena",
    category: "Mascarillas",
    subcategory: "",
    price: 45,
    originalPrice: 55,
    description: "Con Ácido Hialurónico. Hidratación intensa durante la noche, despierta con piel suave - 50ml",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    discount: 18
  },
  {
    id: "8",
    name: "100% Organic Cold-Pressed Rose Hip Seed Oil",
    brand: "The Ordinary",
    category: "Serums",
    subcategory: "Vitamina C",
    price: 160,
    description: "Aceite facial nutritivo y regenerador. Reduce cicatrices, manchas y líneas finas - 30ml",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop"
  },
  {
    id: "bs-1",
    name: "Crema Hidratante Facial con Ácido Hialurónico y Vitamina E",
    brand: "Nivea",
    category: "Hidratantes Faciales",
    subcategory: "Piel normal a seca",
    price: 95,
    originalPrice: 120,
    description: "Crema hidratante para pieles secas con ácido hialurónico y vitamina E. Hidratación profunda 24h.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    discount: 21
  },
  {
    id: "bs-2",
    name: "Sérum Concentrado Reparador Nocturno con Retinol y Niacinamida",
    brand: "La Roche-Posay",
    category: "Serums",
    subcategory: "Retinol",
    price: 220,
    description: "Sérum anti-edad con retinol y niacinamida. Repara y regenera la piel durante la noche.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop"
  },
  {
    id: "bs-3",
    name: "Protector Solar Facial SPF 50+ Resistente al Agua",
    brand: "Eucerin",
    category: "Protectores Solares",
    subcategory: "Piel sensible",
    price: 135,
    originalPrice: 165,
    description: "Protector solar con antioxidantes, resistente al agua. Protección muy alta UVA/UVB.",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop",
    discount: 18
  },
  {
    id: "bs-4",
    name: "Tónico Facial Purificante con Extracto de Té Verde y Hamamelis",
    brand: "Bioderma",
    category: "Tonicos y Esencias",
    subcategory: "",
    price: 85,
    description: "Tónico purificante natural con té verde y hamamelis. Equilibra y refresca la piel.",
    image: "https://images.unsplash.com/photo-1512303452766-a48f2bc60dcd?w=400&h=400&fit=crop"
  },
  // Productos De Vuelta en Stock
  {
    id: "bis-1",
    name: "Agua Micelar Desmaquillante Todo en Uno para Piel Sensible",
    brand: "Bioderma",
    category: "Desmaquillantes",
    subcategory: "Agua Micelar",
    price: 125,
    originalPrice: 145,
    description: "Agua micelar ultra suave que limpia, desmaquilla y tonifica sin necesidad de enjuague. Ideal para piel sensible.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    discount: 14
  },
  {
    id: "bis-2",
    name: "Exfoliante Facial Químico con AHA y BHA Anti-Imperfecciones",
    brand: "The Ordinary",
    category: "Exfoliantes faciales",
    subcategory: "Quimicos",
    price: 95,
    description: "Exfoliante químico suave que renueva la piel, minimiza poros y mejora la textura. Uso nocturno.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"
  },
  {
    id: "bis-3",
    name: "Crema Hidratante Corporal Nutritiva con Manteca de Karité",
    brand: "Nivea",
    category: "Hidratantes Corporales",
    subcategory: "Crema",
    price: 78,
    originalPrice: 95,
    description: "Crema corporal intensiva con manteca de karité que nutre profundamente la piel muy seca. Textura rica.",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    discount: 18
  },
  {
    id: "bis-4",
    name: "Protector Solar Corporal SPF 50+ en Spray Resistente al Agua",
    brand: "Isdin",
    category: "Protectores Solares",
    subcategory: "Corporales",
    price: 155,
    description: "Spray solar de rápida absorción con protección muy alta. Resistente al agua y sudor para toda la familia.",
    image: "https://images.unsplash.com/photo-1556228994-7be8d82c30a9?w=400&h=400&fit=crop"
  },
  {
    id: "bis-5",
    name: "Mascarilla Facial Hidratante Overnight con Ácido Hialurónico",
    brand: "Neutrogena",
    category: "Mascarillas",
    subcategory: "",
    price: 65,
    originalPrice: 80,
    description: "Mascarilla de noche que hidrata intensamente mientras duermes. Despierta con piel radiante y suave.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    discount: 19
  },
  {
    id: "bis-6",
    name: "Aceite Limpiador Desmaquillante Facial Suave Bifásico",
    brand: "La Roche-Posay",
    category: "Desmaquillantes",
    subcategory: "Aceite Limpiador",
    price: 135,
    description: "Aceite limpiador que elimina maquillaje resistente al agua sin resecar. Deja la piel suave y limpia.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop"
  },
  {
    id: "bis-7",
    name: "Base de Maquillaje Líquida Cobertura Media a Buildable SPF 15",
    brand: "Vichy",
    category: "Maquillaje",
    subcategory: "Base",
    price: 185,
    originalPrice: 220,
    description: "Base de maquillaje con acabado natural y protección solar. Larga duración y cobertura modulable.",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
    discount: 16
  },
  {
    id: "bis-8",
    name: "Champú Tratante Anticaída Fortificante con Cafeína",
    brand: "Eucerin",
    category: "Capilar",
    subcategory: "",
    price: 98,
    description: "Champú fortificante que reduce la caída del cabello y estimula el crecimiento. Con cafeína activa.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop"
  }
];

export const brands = [...new Set(shopProducts.map(p => p.brand))];
export const categories = [...new Set(shopProducts.map(p => p.category))];

export const getSubcategories = (category: string): string[] => {
  return [...new Set(shopProducts.filter(p => p.category === category).map(p => p.subcategory))];
};
