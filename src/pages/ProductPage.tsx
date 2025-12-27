import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, FileText, Zap, BookOpen } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Mock data - En el futuro esto vendrá de una API
const mockProduct = {
  id: "1",
  name: "Centella Cleansing Foam",
  brand: "MIXSOON",
  price: 185.0,
  originalPrice: null,
  description: "Jabón facial con extracto de Centella Asiática que limpia suavemente mientras calma y equilibra la piel. Ideal para todo tipo de piel, especialmente sensible. Su fórmula con pH balanceado respeta la barrera natural de tu piel.",
  images: [
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
  ],
  fullDescription: "Este limpiador facial de espuma suave está formulado con extracto puro de Centella Asiática, conocida por sus propiedades calmantes y regeneradoras. La fórmula de pH balanceado limpia profundamente sin irritar ni resecar la piel, eliminando impurezas, exceso de grasa y residuos de maquillaje mientras mantiene la barrera de humedad natural de la piel intacta.",
  howToUse: "1. Humedece tu rostro con agua tibia.\n2. Aplica una pequeña cantidad de producto en las manos.\n3. Masajea suavemente sobre el rostro con movimientos circulares.\n4. Enjuaga abundantemente con agua tibia.\n5. Usa mañana y noche como parte de tu rutina de cuidado facial.",
  ingredients: "Centella Asiatica Extract, Water, Glycerin, Sodium Cocoyl Isethionate, Coconut Acid, Sodium Isethionate, Potassium Cocoyl Glycinate, Coco-Betaine, Citric Acid, Sodium Chloride, Caprylyl Glycol, Ethylhexylglycerin, Disodium EDTA."
};

const ProductPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, items, setIsCartOpen } = useCart();

  // Mock: En producción, aquí cargarías el producto real basado en el ID
  const product = mockProduct;
  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.images[0],
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Product Section - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

          {/* Left Column - Image Gallery */}
          <div className="w-full">
            {/* Mobile: Carousel with dots */}
            <div className="lg:hidden">
              <div className="aspect-square overflow-hidden rounded-2xl bg-secondary mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Navigation dots */}
              <div className="flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === selectedImage
                        ? "w-8 bg-foreground"
                        : "w-2 bg-border"
                    )}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Thumbnails + Main Image */}
            <div className="hidden lg:flex gap-4">
              {/* Thumbnails column */}
              <div className="flex flex-col gap-3 w-24">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      index === selectedImage
                        ? "border-foreground"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1 aspect-square overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Brand */}
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.brand}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                {product.price.toFixed(1)} Bs
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toFixed(1)} Bs
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              variant={isInCart ? "outline" : "default"}
              size="lg"
              className="w-full rounded-full gap-2 text-base py-6 mb-6"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-5 h-5" />
              {isInCart ? "VER CARRITO" : "AGREGAR"}
            </Button>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Accordion Section - Below both columns */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {/* Description */}
            <AccordionItem value="description" className="border-b border-border">
              <AccordionTrigger className="text-foreground hover:text-foreground/80 py-5">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="text-base font-medium">Descripción del Producto</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pt-2">
                {product.fullDescription}
              </AccordionContent>
            </AccordionItem>

            {/* How to Use */}
            <AccordionItem value="how-to-use" className="border-b border-border">
              <AccordionTrigger className="text-foreground hover:text-foreground/80 py-5">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span className="text-base font-medium">Modo de Uso</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pt-2 whitespace-pre-line">
                {product.howToUse}
              </AccordionContent>
            </AccordionItem>

            {/* Ingredients */}
            <AccordionItem value="ingredients" className="border-b border-border">
              <AccordionTrigger className="text-foreground hover:text-foreground/80 py-5">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-base font-medium">Ingredientes</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 pt-2">
                {product.ingredients}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
