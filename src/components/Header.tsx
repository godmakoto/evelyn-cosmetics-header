import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { finalTotal, itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
        setActiveCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoriesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCategoriesOpen(true);
  };

  const handleCategoriesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
      setActiveCategory(null);
    }, 150);
  };

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "header-scrolled" : "header-default"
        )}
      >
        {/* Main Header */}
        <div className="header-main">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Mobile: Hamburger + Logo */}
              <div className="flex items-center gap-3 md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Abrir menú"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <a href="/" className="flex flex-col leading-tight">
                  <span className="text-xl font-elegant tracking-wide text-foreground">
                    Evelyn
                  </span>
                  <span className="text-[0.6rem] font-normal text-muted-foreground tracking-widest uppercase">
                    cosmetics
                  </span>
                </a>
              </div>

              {/* Desktop: Logo */}
              <a href="/" className="hidden md:flex flex-col leading-tight group">
                <span className="text-3xl font-elegant tracking-wide text-foreground transition-colors group-hover:text-foreground/80">
                  Evelyn
                </span>
                <span className="text-[0.65rem] font-normal text-muted-foreground tracking-widest uppercase">
                  cosmetics
                </span>
              </a>

              {/* Desktop: Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-button">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="cart-button"
              >
                <span className="text-sm font-medium text-foreground">Bs {finalTotal.toFixed(2)}</span>
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  {itemCount > 0 && (
                    <span className="cart-badge">{itemCount}</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 py-3 bg-secondary">
          <div className="search-container bg-background">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input bg-background"
            />
            <button className="search-button">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="nav-bar hidden md:block">
          <div className="container mx-auto px-4 lg:px-8">
            <ul className="flex items-center justify-center gap-1">
              {/* Categories with Dropdown */}
              <li
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleCategoriesEnter}
                onMouseLeave={handleCategoriesLeave}
              >
                <button
                  className={cn(
                    "nav-item nav-item-categories",
                    isCategoriesOpen && "nav-item-active"
                  )}
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                >
                  Categorías
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isCategoriesOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Mega Menu */}
                <div
                  className={cn(
                    "mega-menu",
                    isCategoriesOpen ? "mega-menu-open" : "mega-menu-closed"
                  )}
                >
                  <div className="flex">
                    {/* Categories List */}
                    <div className="categories-list">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          className={cn(
                            "category-item",
                            activeCategory === category.name && "category-item-active"
                          )}
                          onMouseEnter={() => handleCategoryHover(category.name)}
                        >
                          {category.name}
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        </button>
                      ))}
                    </div>

                    {/* Subcategories */}
                    <div className="subcategories-panel">
                      {activeCategory && (
                        <div className="subcategories-list">
                          <h4 className="subcategories-title">{activeCategory}</h4>
                          {categories
                            .find((c) => c.name === activeCategory)
                            ?.subcategories.map((sub) => (
                              <a key={sub} href="#" className="subcategory-item">
                                {sub}
                              </a>
                            ))}
                        </div>
                      )}
                      {!activeCategory && (
                        <div className="subcategories-placeholder">
                          <p>Pasa el cursor sobre una categoría para ver las subcategorías</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>

              {/* Other Nav Items */}
              <li>
                <a href="#" className="nav-item">
                  Tienda
                </a>
              </li>
              <li>
                <a href="#" className="nav-item">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="nav-item">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Header;
