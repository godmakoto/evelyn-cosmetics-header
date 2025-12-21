import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  brand?: string;
  image: string;
  price: number;
  originalPrice?: number;
}

const bestSellerProducts: Product[] = [
  {
    id: "bs-1",
    name: "Crema Hidratante Facial con Ácido Hialurónico y Vitamina E para Pieles Secas",
    brand: "Nivea",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    price: 95,
    originalPrice: 120
  },
  {
    id: "bs-2",
    name: "Sérum Concentrado Reparador Nocturno con Retinol y Niacinamida Anti-edad",
    brand: "La Roche-Posay",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    price: 220
  },
  {
    id: "bs-3",
    name: "Protector Solar Facial SPF 50+ Resistente al Agua con Antioxidantes",
    brand: "Eucerin",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop",
    price: 135,
    originalPrice: 165
  },
  {
    id: "bs-4",
    name: "Tónico Facial Purificante con Extracto de Té Verde y Hamamelis Natural",
    brand: "Bioderma",
    image: "https://images.unsplash.com/photo-1512303452766-a48f2bc60dcd?w=400&h=400&fit=crop",
    price: 85
  },
  {
    id: "bs-5",
    name: "Contorno de Ojos Anti-ojeras con Cafeína y Péptidos Reafirmantes Intensivo",
    brand: "Vichy",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop",
    price: 180,
    originalPrice: 220
  },
  {
    id: "bs-6",
    name: "Gel Limpiador Facial Suave para Todo Tipo de Piel con Ceramidas",
    brand: "CeraVe",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop",
    price: 65
  },
  {
    id: "bs-7",
    name: "Mascarilla Facial Detox con Arcilla Verde y Carbón Activado Purificante",
    brand: "Neutrogena",
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop",
    price: 55,
    originalPrice: 70
  },
  {
    id: "bs-8",
    name: "Aceite Facial Regenerador con Rosa Mosqueta y Vitamina C Iluminador",
    brand: "The Ordinary",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    price: 145
  }
];

export const BestSellersCarousel = () => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const {
    items,
    addItem,
    setIsCartOpen
  } = useCart();
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

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
    // Si ya agregamos este producto en esta sesión, abrir el carrito
    if (addedProducts.has(product.id)) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined
      });
      // Marcar como agregado para cambiar el botón a "Ver carrito"
      setAddedProducts(prev => new Set(prev).add(product.id));
    }
  };

  // Verificar si el producto está en el carrito
  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
          Mas Vendidos
        </h2>

        <div className={cn("relative", isMobile || isTablet ? "px-0" : "px-14")}>
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

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {bestSellerProducts.map(product => (
                <div
                  key={product.id}
                  className={cn(
                    "flex-shrink-0 px-2",
                    isMobile ? "w-[72%]" : isTablet ? "w-[38%]" : "lg:w-[30%] xl:w-[28%] w-1/3"
                  )}
                >
                  <div className="bg-background border border-border rounded-xl h-full flex flex-col overflow-hidden">
                    <div className="overflow-hidden bg-secondary aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className={cn(
                      "flex-1 flex flex-col",
                      isMobile ? "p-4 pt-3" : "p-5 pt-4 lg:p-6 lg:pt-4"
                    )}>
                      {product.brand && (
                        <span className="text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </span>
                      )}

                      <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-4 mt-auto">
                        <span className="text-lg font-semibold text-foreground">
                          Bs {product.price.toFixed(1)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            Bs {product.originalPrice.toFixed(1)}
                          </span>
                        )}
                      </div>

                      <Button
                        variant={isInCart(product.id) ? "outline" : "default"}
                        className="w-full rounded-full gap-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {isInCart(product.id) ? "Ver carrito" : "Agregar"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 md:h-2.5 rounded-full",
                  "transition-all duration-300",
                  index === selectedIndex
                    ? "bg-foreground w-6 md:w-8"
                    : "w-2 md:w-2.5 bg-border hover:bg-muted-foreground"
                )}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button className="px-8 lg:px-16 rounded-full bg-foreground text-background hover:bg-foreground/90">
            Ver más
          </Button>
        </div>
      </div>
    </section>
  );
};
