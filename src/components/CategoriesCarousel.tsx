import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { 
  ChevronLeft, 
  ChevronRight, 
  Droplet, 
  Sun, 
  Droplets, 
  SprayCan, 
  FlaskConical, 
  Sparkles, 
  Gift, 
  Brush, 
  Waves, 
  Eraser, 
  Scissors, 
  Wind,
  Cherry,
  CircleDashed,
  Leaf
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  categoryFilter?: string;
  subcategoryFilter?: string;
}

const categories: Category[] = [
  {
    id: "limpiadores",
    name: "Limpiadores",
    icon: <Waves className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Limpiadores"
  },
  {
    id: "hidratantes-faciales",
    name: "Hidratantes Faciales",
    icon: <Droplets className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Hidratantes Faciales"
  },
  {
    id: "hidratantes-corporales",
    name: "Hidratantes Corporales",
    icon: <Leaf className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Hidratantes Corporales"
  },
  {
    id: "protectores-solares",
    name: "Protectores Solares",
    icon: <Sun className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Protectores Solares"
  },
  {
    id: "serums",
    name: "Serums",
    icon: <Droplet className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Serums"
  },
  {
    id: "exfoliantes-faciales",
    name: "Exfoliantes faciales",
    icon: <CircleDashed className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Exfoliantes faciales"
  },
  {
    id: "exfoliantes-corporales",
    name: "Exfoliantes Corporales",
    icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Exfoliantes Corporales"
  },
  {
    id: "desmaquillantes",
    name: "Desmaquillantes",
    icon: <Eraser className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Desmaquillantes"
  },
  {
    id: "tonicos-esencias",
    name: "Tonicos y Esencias",
    icon: <FlaskConical className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Tonicos y Esencias"
  },
  {
    id: "agua-termal-mist",
    name: "Agua Termal y Mist",
    icon: <SprayCan className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Agua Termal y Mist"
  },
  {
    id: "capilar",
    name: "Capilar",
    icon: <Scissors className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Capilar"
  },
  {
    id: "maquillaje",
    name: "Maquillaje",
    icon: <Brush className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Maquillaje"
  },
  {
    id: "kits",
    name: "Kits",
    icon: <Gift className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Kits"
  },
  {
    id: "labios",
    name: "Labios",
    icon: <Cherry className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Labios"
  },
  {
    id: "mascarillas",
    name: "Mascarillas",
    icon: <Wind className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />,
    categoryFilter: "Mascarillas"
  }
];

export const CategoriesCarousel = () => {
  const navigate = useNavigate();
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
  }, [Autoplay({ delay: 2000, stopOnInteraction: false })]);

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
                  <div
                    onClick={() => {
                      if (category.categoryFilter || category.subcategoryFilter) {
                        navigate('/tienda', {
                          state: {
                            categoryFilter: category.categoryFilter || null,
                            subcategoryFilter: category.subcategoryFilter || null
                          }
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
