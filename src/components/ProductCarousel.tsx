import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFeaturedProducts } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  brand?: string;
  image: string;
  price: number;
  originalPrice?: number;
}

export const ProductCarousel = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const { products: supabaseProducts, loading } = useFeaturedProducts();
  const {
    items,
    addItem,
    setIsCartOpen
  } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Convertir productos de Supabase al formato del componente
  const products: Product[] = supabaseProducts.map(p => ({
    id: p.product_id,
    name: p.title,
    image: p.images[0] || "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    price: p.offer_price || p.regular_price,
    originalPrice: p.offer_price ? p.regular_price : undefined
  }));

  // Detect tablet (768px - 1024px)
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
    if (isInCart(product.id)) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined
      });
    }
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/producto/${productId}`);
  };

  if (loading) {
    return (
      <section className="py-6 md:py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
            Productos Destacados
          </h2>
          <div className="text-center text-muted-foreground">Cargando productos...</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
          Productos Destacados
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
              {products.map(product => (
                <div
                  key={product.id}
                  className={cn(
                    "flex-shrink-0 px-2",
                    isMobile ? "w-[72%]" : isTablet ? "w-[38%]" : "lg:w-[30%] xl:w-[28%] w-1/3"
                  )}
                >
                  <div
                    className="bg-background border border-border rounded-xl h-full flex flex-col overflow-hidden cursor-pointer"
                    onClick={() => handleCardClick(product.id)}
                  >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
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
          <Button
            onClick={() => navigate('/tienda?status=featured')}
            className="px-8 lg:px-16 rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            Ver más
          </Button>
        </div>
      </div>
    </section>
  );
};
