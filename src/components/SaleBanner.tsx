import { ArrowRight, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SaleBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          onClick={() => navigate('/tienda?carousel_state=Ofertas')}
          className="relative overflow-hidden rounded-2xl bg-foreground text-primary-foreground cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-6 w-12 h-12 md:w-20 md:h-20 border-2 border-current rounded-full" />
            <div className="absolute bottom-3 right-8 w-20 h-20 md:w-32 md:h-32 border-2 border-current rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-10 h-10 md:w-16 md:h-16 border border-current rounded-full" />
          </div>

          {/* Content */}
          <div className="relative px-5 py-4 md:px-10 md:py-6 lg:px-14 lg:py-8 flex items-center justify-between gap-4">
            {/* Left Content */}
            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary-foreground/15 backdrop-blur-sm">
                <Percent className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl lg:text-3xl font-display font-semibold">
                  Ofertas
                </h3>
                <p className="text-xs md:text-sm text-primary-foreground/80">
                  Descuentos exclusivos
                </p>
              </div>
            </div>

            {/* Arrow indicator */}
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
  );
};
