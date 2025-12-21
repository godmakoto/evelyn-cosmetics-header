export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
}

export const brands = [
  "Avene",
  "La Roche-Posay",
  "ISDIN",
  "CeraVe",
  "Eucerin",
  "Neutrogena",
  "Bioderma",
  "Vichy",
  "Garnier",
  "Nivea",
];

export const categories: Record<string, string[]> = {
  "Protectores Solares": ["Piel Grasa", "Con Color", "Sin Color", "Piel Seca"],
  "Limpiadores": ["Gel", "Espuma", "Aceite", "Agua Micelar"],
  "Hidratantes": ["Gel-Crema", "Crema", "Loción", "Bálsamo"],
  "Serums": ["Niacinamida", "Vitamina C", "Retinoides", "Hialurónico"],
  "Tónicos": ["Exfoliante", "Hidratante", "Calmante"],
};

const productTemplates = [
  { type: "Protector Solar", category: "Protectores Solares", desc: "Protección avanzada con acabado ligero y no graso", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { type: "Gel Limpiador", category: "Limpiadores", desc: "Limpieza profunda que respeta la barrera cutánea", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop" },
  { type: "Crema Hidratante", category: "Hidratantes", desc: "Hidratación intensa de larga duración", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop" },
  { type: "Sérum Facial", category: "Serums", desc: "Fórmula concentrada de rápida absorción", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
  { type: "Tónico Facial", category: "Tónicos", desc: "Equilibra y prepara la piel para el siguiente paso", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop" },
  { type: "Agua Micelar", category: "Limpiadores", desc: "Limpia y desmaquilla sin necesidad de enjuagar", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop" },
  { type: "Gel-Crema", category: "Hidratantes", desc: "Textura ligera ideal para pieles mixtas", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop" },
  { type: "Espuma Limpiadora", category: "Limpiadores", desc: "Espuma suave que elimina impurezas", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop" },
  { type: "Loción Corporal", category: "Hidratantes", desc: "Nutre e hidrata la piel del cuerpo", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop" },
  { type: "Sérum Vitamina C", category: "Serums", desc: "Ilumina y unifica el tono de la piel", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop" },
];

const sizes = ["30ml", "50ml", "75ml", "100ml", "150ml", "200ml"];

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;

  brands.forEach((brand) => {
    productTemplates.forEach((template, index) => {
      const subcategories = categories[template.category];
      const subcategory = subcategories[index % subcategories.length];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const basePrice = Math.floor(Math.random() * 350) + 70;
      const hasDiscount = Math.random() < 0.4;
      const discountPercent = hasDiscount ? Math.floor(Math.random() * 16) + 5 : 0;
      const finalPrice = hasDiscount
        ? Math.round(basePrice * (1 - discountPercent / 100))
        : basePrice;

      products.push({
        id: `prod-${id}`,
        name: `${brand} ${template.type} ${size}`,
        brand,
        category: template.category,
        subcategory,
        price: finalPrice,
        originalPrice: hasDiscount ? basePrice : undefined,
        description: template.desc,
        image: template.image,
      });
      id++;
    });
  });

  return products.sort(() => Math.random() - 0.5);
}

export const products = generateProducts();

export const formatPrice = (price: number): string => {
  return `Bs ${price.toFixed(1)}`;
};
