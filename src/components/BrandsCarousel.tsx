import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = ["EUCERIN", "ISDIN", "LA ROCHE-POSAY", "NEUTROGENA", "NIVEA", "L'ORÉAL", "GARNIER", "BIODERMA", "CERAVE", "VICHY", "BYPHASSE", "REVOX"];
export const BrandsCarousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const animationRef = useRef<number>();
  const resumeTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Touch/drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPosition = useRef(0);

  // Duplicate brands 4 times for infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  useEffect(() => {
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused && !isDragging.current) {
        setPosition(prev => {
          const trackWidth = trackRef.current?.scrollWidth || 0;
          const singleSetWidth = trackWidth / 4;
          const newPosition = prev - speed;

          // Reset position when one full set has scrolled
          if (Math.abs(newPosition) >= singleSetWidth) {
            return 0;
          }
          return newPosition;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleInteractionStart = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const scrollLeft = () => {
    handleInteractionStart();
    setPosition(prev => prev + 200);
    handleInteractionEnd();
  };

  const scrollRight = () => {
    handleInteractionStart();
    setPosition(prev => prev - 200);
    handleInteractionEnd();
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startPosition.current = position;
    handleInteractionStart();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setPosition(startPosition.current + diff);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    handleInteractionEnd();
  };

  // Mouse handlers for drag (desktop fallback)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startPosition.current = position;
    handleInteractionStart();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    setPosition(startPosition.current + diff);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    handleInteractionEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
    }
    handleInteractionEnd();
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);
  return <section className="py-12 md:py-16 bg-gradient-to-b from-[#f8f8f8] to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xs md:text-sm font-medium tracking-[3px] text-[#666] uppercase mb-4">
            Marcas
          </h2>
          <div className="w-[60px] h-px bg-[#2a2a2a] mx-auto" />
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden cursor-grab active:cursor-grabbing" 
          onMouseEnter={handleInteractionStart} 
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={scrollLeft}
            className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-[#2a2a2a]" />
          </button>
          <button
            onClick={scrollRight}
            className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-[#2a2a2a]" />
          </button>

          {/* Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-[50px] md:w-[100px] lg:w-[150px] bg-gradient-to-r from-[#f8f8f8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[50px] md:w-[100px] lg:w-[150px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Track */}
          <div ref={trackRef} className="flex items-center" style={{
          transform: `translateX(${position}px)`
        }}>
            {duplicatedBrands.map((brand, index) => <div key={`${brand}-${index}`} className={cn("flex-shrink-0 cursor-pointer", "px-[25px] md:px-[30px] lg:px-[45px]")}>
                <span className={cn("block font-sans font-medium text-[#666] uppercase whitespace-nowrap", "text-sm md:text-base lg:text-xl", "tracking-[1.5px] md:tracking-[2px] lg:tracking-[3px]", "transition-all duration-300 ease-out", "hover:text-[#2a2a2a] hover:-translate-y-0.5", "relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px", "after:bg-[#2a2a2a] after:scale-x-0 after:origin-right after:transition-transform after:duration-300", "hover:after:scale-x-100 hover:after:origin-left")}>
                  {brand}
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};