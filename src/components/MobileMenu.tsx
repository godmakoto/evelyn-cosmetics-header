import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const categories = [{
  name: "Cuidado Facial",
  subcategories: ["Sérums", "Hidratantes", "Anti-Edad", "Anti-Acné", "Brumas Faciales", "Tónicos", "Mascarillas", "Contorno de Ojos", "Aceites Faciales", "Ampollas", "Cremas Reparadoras"]
}, {
  name: "Protección Solar",
  subcategories: ["Facial", "Corporal"]
}, {
  name: "Limpieza Facial",
  subcategories: ["Geles Limpiadores", "Aguas Micelares"]
}, {
  name: "Cuidado Corporal",
  subcategories: ["Hidratantes", "Cremas Reparadoras"]
}, {
  name: "Cuidado Capilar",
  subcategories: ["Champús Tratantes", "Tratamientos"]
}];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTiendaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Navegar a tienda sin filtros (resetear todo) usando timestamp para forzar reset
    navigate('/tienda', { state: { resetFiltersTimestamp: Date.now() }, replace: location.pathname === '/tienda' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose(); // Cerrar el menú móvil
  };

  const toggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
    if (isCategoriesOpen) {
      setExpandedSubcategory(null);
    }
  };

  const toggleSubcategory = (categoryName: string) => {
    setExpandedSubcategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="text-left">
            <Link to="/" className="flex flex-col leading-tight" onClick={onClose}>
              <span className="text-2xl font-elegant tracking-wide text-foreground">Evelyn</span>
              <span className="text-xs font-normal text-muted-foreground tracking-widest uppercase" style={{ fontSize: '0.65rem' }}>cosmetics</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto py-4">
          {/* Categorías Dropdown */}
          <div className="px-4">
            <button
              onClick={toggleCategories}
              className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Categorías
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  isCategoriesOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isCategoriesOpen ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0"
              )}
            >
              <div className="ml-3 space-y-0.5">
                {categories.map((category) => (
                  <div key={category.name}>
                    {category.subcategories.length > 0 ? (
                      <>
                        <button
                          onClick={() => toggleSubcategory(category.name)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground rounded-lg transition-all duration-200",
                            expandedSubcategory === category.name 
                              ? "bg-secondary/70" 
                              : "hover:bg-secondary/40"
                          )}
                        >
                          {category.name}
                          <ChevronRight
                            className={cn(
                              "w-4 h-4 text-muted-foreground transition-transform duration-200",
                              expandedSubcategory === category.name && "rotate-90"
                            )}
                          />
                        </button>

                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-250 ease-in-out",
                            expandedSubcategory === category.name
                              ? "max-h-[500px] opacity-100 mt-0.5"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="ml-4 pl-3 border-l border-border/50 space-y-0.5">
                            {category.subcategories.map((sub) => (
                              <button
                                key={sub}
                                className="w-full text-left block px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-lg transition-all duration-200"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate('/tienda', {
                                    state: {
                                      categoryFilter: category.name,
                                      subcategoryFilter: sub
                                    }
                                  });
                                  onClose();
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={`#${category.name.toLowerCase().replace(/\s+/g, '-').replace(/ó/g, 'o')}`}
                        className="block px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/40 rounded-lg transition-all duration-200"
                        onClick={onClose}
                      >
                        {category.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other Nav Items */}
          <div className="mt-2 px-4 space-y-1">
            <Link
              to="/tienda"
              className="block px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={handleTiendaClick}
            >
              Tienda
            </Link>
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
