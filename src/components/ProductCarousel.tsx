import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Product {
  id: string;
  name: string;
  brand?: string;
  image: string;
  price: number;
  originalPrice?: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Crema Hidratante Facial",
    brand: "Nivea",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    price: 85,
    originalPrice: 100,
  },
  {
    id: "2",
    name: "Sérum Vitamina C",
    brand: "La Roche-Posay",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
    price: 180,
  },
  {
    id: "3",
    name: "Protector Solar SPF 50",
    brand: "Eucerin",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    price: 120,
    originalPrice: 150,
  },
  {
    id: "4",
    name: "Agua Micelar",
    brand: "Bioderma",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
    price: 95,
  },
  {
    id: "5",
    name: "Crema Contorno de Ojos",
    brand: "Vichy",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop",
    price: 200,
    originalPrice: 250,
  },
  {
    id: "6",
    name: "Limpiador Facial Espuma",
    brand: "CeraVe",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    price: 75,
  },
  {
    id: "7",
    name: "Mascarilla Hidratante",
    brand: "Neutrogena",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    price: 45,
    originalPrice: 55,
  },
  {
    id: "8",
    name: "Aceite Facial Nutritivo",
    brand: "The Ordinary",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
    price: 160,
  },
];

export const ProductCarousel = () => {
  const isMobile = useIsMobile();
  const { items, addItem, setIsCartOpen } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: false,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  const handleAddToCart = (product: Product) => {
    if (addedProducts.has(product.id)) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined,
      });
      setAddedProducts((prev) => new Set(prev).add(product.id));
    }
  };

  const isInCart = (productId: string) => {
    return addedProducts.has(productId) || items.some((item) => item.id === productId);
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground text-center mb-8 md:mb-10">
          Productos Destacados
        </h2>

        {/* Carousel Container */}
        <div className="relative px-0 md:px-14">
          {/* Navigation Arrows - Desktop Only */}
          {!isMobile && (
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
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 px-2 ${
                    isMobile ? "w-[72%]" : "w-1/2 md:w-1/3 lg:w-1/4"
                  }`}
                >
                  <div className="bg-background border border-border rounded-lg p-4 h-full flex flex-col">
                    {/* Product Image */}
                    <div className="aspect-square mb-4 overflow-hidden rounded-md bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      {/* Brand */}
                      {product.brand && (
                        <span className="text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </span>
                      )}

                      {/* Name */}
                      <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Prices */}
                      <div className="flex items-center gap-2 mb-4 mt-auto">
                        <span className="text-lg font-semibold text-foreground">
                          Bs {product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            Bs {product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Add Button */}
                      <Button
                        variant={isInCart(product.id) ? "outline" : "default"}
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        {isInCart(product.id) ? "Ver carrito" : "Agregar"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex
                    ? "bg-foreground"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Ver más Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="px-8">
            Ver más
          </Button>
        </div>
      </div>
    </section>
  );
};
