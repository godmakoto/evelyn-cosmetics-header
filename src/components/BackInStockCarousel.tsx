import { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

export const BackInStockCarousel = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);
  const {
    items,
    addItem,
    setIsCartOpen
  } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Get products from Supabase
  const { data: allProducts, isLoading } = useProducts();

  // Filter products with carousel_state = 'De vuelta en stock'
  const products = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(p => p.carousel_state === 'De vuelta en stock');
  }, [allProducts]);

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
  const handleAddToCart = (product: any) => {
    if (isInCart(product.id)) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.title || '',
        image: product.image_1 || '',
        originalPrice: product.regular_price || 0,
        discountedPrice: product.offer_price || undefined
      });
    }
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const handleCardClick = (productId: string) => {
    navigate(`/producto/${productId}`);
  };

  // Show loading state or empty state
  if (isLoading) {
    return (
      <section className="py-6 md:py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
            De Vuelta en Stock
          </h2>
          <div className="text-center text-muted-foreground">Cargando productos...</div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null; // Don't show the section if there are no products
  }

  return <section className="py-6 md:py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
          De Vuelta en Stock
        </h2>

        {/* Carousel Container */}
        <div className={cn("relative", isMobile || isTablet ? "px-0" : "px-14")}>
          {/* Navigation Arrows - Desktop Only (hide on mobile and tablet) */}
          {!isMobile && !isTablet && <>
              <button onClick={scrollPrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:bg-secondary transition-colors" aria-label="Anterior">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button onClick={scrollNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border hover:bg-secondary transition-colors" aria-label="Siguiente">
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </>}

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map(product => <div key={product.id} className={cn("flex-shrink-0 px-2", isMobile ? "w-[72%]" : isTablet ? "w-[38%]" : "lg:w-[30%] xl:w-[28%] w-1/3")}>
                  <div
                    className="bg-background border border-border rounded-xl h-full flex flex-col overflow-hidden cursor-pointer"
                    onClick={() => handleCardClick(product.id)}
                  >
                    {/* Product Image */}
                    <div className="overflow-hidden bg-secondary aspect-square">
                      <img src={product.image_1 || ''} alt={product.title || ''} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className={cn("flex-1 flex flex-col", isMobile ? "p-4 pt-3" : "p-5 pt-4 lg:p-6 lg:pt-4")}>
                      {/* Brand */}
                      {product.brand && <span className="text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </span>}

                      {/* Name */}
                      <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      {/* Prices */}
                      <div className="flex items-center gap-2 mb-4 mt-auto">
                        <span className="text-lg font-semibold text-foreground">
                          Bs {(product.offer_price || product.regular_price || 0).toFixed(1)}
                        </span>
                        {product.offer_price && product.regular_price && product.regular_price > product.offer_price && <span className="text-sm text-muted-foreground line-through">
                            Bs {product.regular_price.toFixed(1)}
                          </span>}
                      </div>

                      {/* Add Button */}
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
                </div>)}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => <button key={index} onClick={() => scrollTo(index)} className={cn("h-2 md:h-2.5 rounded-full", "transition-all duration-300", index === selectedIndex ? "bg-foreground w-6 md:w-8" : "w-2 md:w-2.5 bg-border hover:bg-muted-foreground")} aria-label={`Ir al slide ${index + 1}`} />)}
          </div>
        </div>

        {/* Ver más Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate('/tienda?carousel_state=De vuelta en stock')}
            className="px-8 lg:px-16 rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            Ver más
          </Button>
        </div>
      </div>
    </section>;
};
