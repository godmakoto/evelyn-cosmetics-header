import { ArrowRight, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SaleBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div 
          className="relative overflow-hidden rounded-2xl bg-foreground text-primary-foreground"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 w-20 h-20 border-2 border-current rounded-full" />
            <div className="absolute bottom-6 right-12 w-32 h-32 border-2 border-current rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-current rounded-full" />
          </div>

          {/* Content */}
          <div className="relative px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-foreground/15 backdrop-blur-sm">
                <Percent className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold mb-1 md:mb-2">
                  Productos en Oferta
                </h3>
                <p className="text-sm md:text-base text-primary-foreground/80">
                  Descubre descuentos exclusivos en tus productos favoritos
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => navigate('/tienda?status=sale')}
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-medium bg-primary-foreground text-foreground hover:bg-primary-foreground/90 hover:text-foreground border-0 gap-2 group"
            >
              Ver ofertas
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
