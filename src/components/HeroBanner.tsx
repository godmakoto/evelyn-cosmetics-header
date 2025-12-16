import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Slide {
  id: number;
  headline: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl: string;
}

const slides: Slide[] = [
  {
    id: 1,
    headline: "Cuida tu piel",
    subtitle: "Descubre nuestra línea de dermocosmética premium",
    ctaText: "Explorar",
    ctaLink: "#",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1920&q=80",
  },
  {
    id: 2,
    headline: "Belleza natural",
    subtitle: "Productos formulados con ingredientes de alta calidad",
    ctaText: "Ver productos",
    ctaLink: "#",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80",
  },
  {
    id: 3,
    headline: "Rutina perfecta",
    subtitle: "Encuentra los productos ideales para tu tipo de piel",
    ctaText: "Comprar ahora",
    ctaLink: "#",
    imageUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1920&q=80",
  },
];

const HeroBanner = () => {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full bg-secondary/30">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0"
            >
              {/* Slide Content */}
              <div
                className={cn(
                  "relative w-full flex items-center justify-center",
                  "h-[50vh] md:h-[60vh] lg:h-[65vh]",
                  "min-h-[320px] max-h-[600px]"
                )}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-16 md:px-20 lg:px-24">
                  <div className="max-w-lg">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-3 md:mb-4">
                      {slide.headline}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground font-body mb-5 md:mb-6">
                      {slide.subtitle}
                    </p>
                    {slide.ctaText && (
                      <a
                        href={slide.ctaLink}
                        className={cn(
                          "inline-block px-6 py-2.5 md:px-8 md:py-3",
                          "text-sm md:text-base font-medium",
                          "bg-foreground text-background",
                          "rounded-full",
                          "transition-all duration-200",
                          "hover:bg-foreground/90"
                        )}
                      >
                        {slide.ctaText}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      {!isMobile && (
        <>
          <button
            onClick={scrollPrev}
            className={cn(
              "absolute left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20",
              "w-10 h-10 md:w-12 md:h-12",
              "flex items-center justify-center",
              "rounded-full",
              "bg-background/80 backdrop-blur-sm",
              "border border-border/50",
              "text-foreground/70 hover:text-foreground",
              "transition-all duration-200",
              "hover:bg-background"
            )}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={scrollNext}
            className={cn(
              "absolute right-3 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20",
              "w-10 h-10 md:w-12 md:h-12",
              "flex items-center justify-center",
              "rounded-full",
              "bg-background/80 backdrop-blur-sm",
              "border border-border/50",
              "text-foreground/70 hover:text-foreground",
              "transition-all duration-200",
              "hover:bg-background"
            )}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full",
              "transition-all duration-300",
              selectedIndex === index
                ? "bg-foreground w-6 md:w-8"
                : "bg-foreground/40 hover:bg-foreground/60"
            )}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
