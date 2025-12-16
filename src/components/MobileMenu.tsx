import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Cuidado Facial",
    subcategories: ["Limpiadores", "Hidratantes", "Serums", "Contorno de Ojos", "Protección Solar"],
  },
  {
    name: "Cuidado Corporal",
    subcategories: ["Cremas Corporales", "Exfoliantes", "Aceites", "Tratamientos"],
  },
  {
    name: "Maquillaje",
    subcategories: ["Rostro", "Ojos", "Labios", "Accesorios"],
  },
  {
    name: "Cabello",
    subcategories: ["Shampoo", "Acondicionador", "Tratamientos", "Styling"],
  },
  {
    name: "Dermocosmética",
    subcategories: ["Anti-edad", "Acné", "Manchas", "Sensibilidad"],
  },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="text-left">
            <span className="text-xl font-semibold tracking-tight">Evelyn</span>
            <span className="text-sm font-normal text-muted-foreground ml-1">Cosmetics</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto py-4">
          {/* Categorías Dropdown */}
          <div className="px-4">
            <button
              onClick={() => toggleCategory("categorias")}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Categorías
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  expandedCategory === "categorias" && "rotate-180"
                )}
              />
            </button>

            {expandedCategory === "categorias" && (
              <div className="mt-1 ml-3 space-y-1">
                {categories.map((category) => (
                  <div key={category.name}>
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      {category.name}
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform",
                          expandedCategory === category.name && "rotate-90"
                        )}
                      />
                    </button>

                    {expandedCategory === category.name && (
                      <div className="ml-4 mt-1 space-y-1">
                        {category.subcategories.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-colors"
                            onClick={onClose}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Nav Items */}
          <div className="mt-2 px-4 space-y-1">
            <a
              href="#"
              className="block px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={onClose}
            >
              Tienda
            </a>
            <a
              href="#"
              className="block px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={onClose}
            >
              Blog
            </a>
            <a
              href="#"
              className="block px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={onClose}
            >
              Términos y condiciones
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
