import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Droplet, Sun, Droplets, SprayCan, Beaker, Heart, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
}

const categories: Category[] = [
  {
    id: "serums",
    name: "Serums",
    icon: <Droplet className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#serums"
  },
  {
    id: "protectores-solares",
    name: "Protectores Solares",
    icon: <Sun className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#protectores-solares"
  },
  {
    id: "hidratantes",
    name: "Hidratantes",
    icon: <Droplets className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#hidratantes"
  },
  {
    id: "sprays",
    name: "Sprays",
    icon: <SprayCan className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#sprays"
  },
  {
    id: "tonicos-esencias",
    name: "Tónicos y Esencias",
    icon: <Beaker className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#tonicos-esencias"
  },
  {
    id: "coreano",
    name: "Coreano",
    icon: <Heart className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#coreano"
  },
  {
    id: "limpiadores",
    name: "Limpiadores",
    icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    href: "#limpiadores"
  }
];

export const CategoriesCarousel = () => {
  const isMobile = useIsMobile();
  const [isTablet, setIsTablet] = useState(false);

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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const showArrows = !isMobile && !isTablet;

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-foreground text-center mb-8 md:mb-12">
          Categorías
        </h2>

        <div className={cn("relative", showArrows ? "px-14" : "px-0")}>
          {showArrows && (
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
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={cn(
                    "flex-shrink-0",
                    isMobile 
                      ? "w-1/3 px-2" 
                      : isTablet 
                        ? "w-1/4 px-3" 
                        : "w-1/5 px-4"
                  )}
                >
                  <a
                    href={category.href}
                    className="flex flex-col items-center gap-3 md:gap-4 py-4 md:py-6 group cursor-pointer"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-border bg-background group-hover:bg-secondary group-hover:border-foreground/20 transition-all duration-300">
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                        {category.icon}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium">
                      {category.name}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
