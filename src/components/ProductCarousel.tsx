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
const products: Product[] = [{
  id: "1",
  name: "Crema Hidratante Facial",
  brand: "Nivea",
  image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
  price: 85,
  originalPrice: 100
}, {
  id: "2",
  name: "Sérum Vitamina C",
  brand: "La Roche-Posay",
  image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
  price: 180
}, {
  id: "3",
  name: "Protector Solar SPF 50",
  brand: "Eucerin",
  image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
  price: 120,
  originalPrice: 150
}, {
  id: "4",
  name: "Agua Micelar",
  brand: "Bioderma",
  image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
  price: 95
}, {
  id: "5",
  name: "Crema Contorno de Ojos",
  brand: "Vichy",
  image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop",
  price: 200,
  originalPrice: 250
}, {
  id: "6",
  name: "Limpiador Facial Espuma",
  brand: "CeraVe",
  image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  price: 75
}, {
  id: "7",
  name: "Mascarilla Hidratante",
  brand: "Neutrogena",
  image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
  price: 45,
  originalPrice: 55
}, {
  id: "8",
  name: "Aceite Facial Nutritivo",
  brand: "The Ordinary",
  image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
  price: 160
}];
export const ProductCarousel = () => {
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
      setAddedProducts(prev => new Set(prev).add(product.id));
    }
  };
  const isInCart = (productId: string) => {
    return addedProducts.has(productId) || items.some(item => item.id === productId);
  };
  return <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h2 className="md:text-4xl lg:text-5xl font-display font-semibold text-foreground text-center mb-8 md:mb-12 text-3xl">
          Productos Destacados
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
              {products.map(product => <div key={product.id} className={cn("flex-shrink-0", isMobile ? "w-[72%] px-2" : "w-1/2 md:w-1/3 lg:w-[30%] xl:w-[28%] px-3")}>
                  <div className={cn("bg-background border border-border rounded-xl h-full flex flex-col", isMobile ? "p-4" : "p-5 lg:p-6")}>
                    {/* Product Image */}
                    <div className={cn("overflow-hidden rounded-lg bg-secondary mb-4", isMobile ? "aspect-square" : "aspect-[4/5] lg:aspect-[3/4]")}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      {/* Brand */}
                      {product.brand && <span className="text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </span>}

                      {/* Name */}
                      <h3 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Prices */}
                      <div className="flex items-center gap-2 mb-4 mt-auto">
                        <span className="text-lg font-semibold text-foreground">
                          Bs {product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && <span className="text-sm text-muted-foreground line-through">
                            Bs {product.originalPrice}
                          </span>}
                      </div>

                      {/* Add Button */}
                      <Button variant={isInCart(product.id) ? "outline" : "default"} className="w-full rounded-full gap-2" onClick={() => handleAddToCart(product)}>
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
          <Button className="px-8 rounded-full bg-foreground text-background hover:bg-foreground/90">
            Ver más
          </Button>
        </div>
      </div>
    </section>;
};