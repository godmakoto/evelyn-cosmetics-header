export interface CategoryConfig {
  name: string;
  subcategories: string[];
}

export const categories: CategoryConfig[] = [{
  name: "Limpiadores",
  subcategories: ["Piel Mixta a Grasa", "Piel normal a seca", "Piel sensible"]
}, {
  name: "Hidratantes Faciales",
  subcategories: ["Piel Mixta a Grasa", "Piel normal a seca", "Piel sensible"]
}, {
  name: "Hidratantes Corporales",
  subcategories: ["Locion", "Crema"]
}, {
  name: "Protectores Solares",
  subcategories: ["Piel Mixta a Grasa", "Piel normal a seca", "Piel sensible", "Corporales", "Para Niños"]
}, {
  name: "Serums",
  subcategories: ["Niacimida", "Retinol", "Vitamina C", "Acido Hialuronico"]
}, {
  name: "Exfoliantes faciales",
  subcategories: ["Quimicos", "Fisicos (Granulos)"]
}, {
  name: "Exfoliantes Corporales",
  subcategories: []
}, {
  name: "Desmaquillantes",
  subcategories: ["Agua Micelar", "Aceite Limpiador"]
}, {
  name: "Tonicos y Esencias",
  subcategories: []
}, {
  name: "Agua Termal y Mist",
  subcategories: []
}, {
  name: "Capilar",
  subcategories: []
}, {
  name: "Maquillaje",
  subcategories: ["Base", "Labial"]
}, {
  name: "Kits",
  subcategories: []
}, {
  name: "Labios",
  subcategories: []
}, {
  name: "Mascarillas",
  subcategories: []
}];

export const getSubcategories = (categoryName: string): string[] => {
  const category = categories.find(c => c.name === categoryName);
  return category ? category.subcategories : [];
};
