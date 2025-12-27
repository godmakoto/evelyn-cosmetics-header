import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, FileText, Zap, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";
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
  category: "Limpiadores",
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

// Productos relacionados - Mock data
const relatedProducts = [
  {
    id: "rel-1",
    name: "Gel Limpiador Facial Suave para Todo Tipo de Piel con Ceramidas",
    brand: "CeraVe",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop",
    price: 65,
    category: "Limpiadores"
  },
  {
    id: "rel-2",
    name: "Sebium Gel Moussant Actif - Gel limpiador facial purificante",
    brand: "Bioderma",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
    price: 180,
    category: "Limpiadores"
  },
  {
    id: "rel-3",
    name: "Pigmentbio Foaming cream - Limpiador despigmentante",
    brand: "Bioderma",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    price: 95,
    originalPrice: 120,
    category: "Limpiadores"
  },
  {
    id: "rel-4",
    name: "Hydrating Cleanser Limpiador Facial Espuma",
    brand: "CeraVe",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    price: 75,
    category: "Limpiadores"
  },
  {
    id: "rel-5",
    name: "Tónico Facial Purificante con Extracto de Té Verde",
    brand: "Bioderma",
    image: "https://images.unsplash.com/photo-1512303452766-a48f2bc60dcd?w=400&h=400&fit=crop",
    price: 85,
    category: "Limpiadores"
  },
  {
    id: "rel-6",
    name: "Limpiador Facial Anti-edad con Retinol",
    brand: "La Roche-Posay",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    price: 220,
    originalPrice: 250,
    category: "Limpiadores"
  }
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, items, setIsCartOpen } = useCart();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const [selectedCarouselIndex, setSelectedCarouselIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Mock: En producción, aquí cargarías el producto real basado en el ID
  const product = mockProduct;
  const isInCart = items.some(item => item.id === product.id);

  // Detect tablet
  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: false
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedCarouselIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

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

  const handleRelatedProductAddToCart = (relatedProduct: typeof relatedProducts[0]) => {
    const isRelatedInCart = items.some(item => item.id === relatedProduct.id);
    if (isRelatedInCart) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: relatedProduct.id,
        name: relatedProduct.name,
        image: relatedProduct.image,
        originalPrice: relatedProduct.originalPrice || relatedProduct.price,
        discountedPrice: relatedProduct.originalPrice ? relatedProduct.price : undefined
      });
    }
  };

  const isProductInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const handleRelatedCardClick = (productId: string) => {
    navigate(`/producto/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {/* Related Products Carousel */}
        <section className="py-12 md:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
              Productos relacionados
            </h2>

            <div className={cn("relative", isMobile || isTablet ? "px-0" : "px-14")}>
              {/* Navigation Arrows - Desktop Only */}
              {!isMobile && !isTablet && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:bg-secondary transition-colors"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:bg-secondary transition-colors"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </>
              )}

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {relatedProducts.map(relProduct => (
                    <div
                      key={relProduct.id}
                      className={cn(
                        "flex-shrink-0 px-2",
                        isMobile ? "w-[72%]" : isTablet ? "w-[38%]" : "lg:w-[30%] xl:w-[28%] w-1/3"
                      )}
                    >
                      <div
                        className="bg-background border border-border rounded-xl h-full flex flex-col overflow-hidden cursor-pointer"
                        onClick={() => handleRelatedCardClick(relProduct.id)}
                      >
                        {/* Product Image */}
                        <div className="overflow-hidden bg-secondary aspect-square">
                          <img
                            src={relProduct.image}
                            alt={relProduct.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className={cn("flex-1 flex flex-col", isMobile ? "p-4 pt-3" : "p-5 pt-4 lg:p-6 lg:pt-4")}>
                          {/* Brand */}
                          {relProduct.brand && (
                            <span className="text-xs text-muted-foreground mb-1">
                              {relProduct.brand}
                            </span>
                          )}

                          {/* Name */}
                          <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                            {relProduct.name}
                          </h3>

                          {/* Prices */}
                          <div className="flex items-center gap-2 mb-4 mt-auto">
                            <span className="text-lg font-semibold text-foreground">
                              Bs {relProduct.price.toFixed(1)}
                            </span>
                            {relProduct.originalPrice && relProduct.originalPrice > relProduct.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                Bs {relProduct.originalPrice.toFixed(1)}
                              </span>
                            )}
                          </div>

                          {/* Add Button */}
                          <Button
                            variant={isProductInCart(relProduct.id) ? "outline" : "default"}
                            className="w-full rounded-full gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRelatedProductAddToCart(relProduct);
                            }}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            {isProductInCart(relProduct.id) ? "Ver carrito" : "Agregar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "h-2 md:h-2.5 rounded-full",
                      "transition-all duration-300",
                      index === selectedCarouselIndex
                        ? "bg-foreground w-6 md:w-8"
                        : "w-2 md:w-2.5 bg-border hover:bg-muted-foreground"
                    )}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
