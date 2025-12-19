import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

const categories = [{
  name: "Serums",
  subcategories: []
}, {
  name: "Protectores Solares",
  subcategories: []
}, {
  name: "Hidratantes",
  subcategories: []
}, {
  name: "Sprays",
  subcategories: []
}, {
  name: "Tónicos y Esencias",
  subcategories: []
}, {
  name: "Coreano",
  subcategories: []
}, {
  name: "Limpiadores",
  subcategories: []
}];

// Umbral mínimo para activar efecto headroom (100px para evitar ocultarse con scroll pequeño)
const SCROLL_HIDE_THRESHOLD = 100;
const SCROLL_SHADOW_THRESHOLD = 10;

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  
  const { finalTotal, itemCount, setIsCartOpen } = useCart();

  // Headroom effect: hide on scroll down (after 100px), show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for shadow
      setIsScrolled(currentScrollY > SCROLL_SHADOW_THRESHOLD);
      
      // At top of page or below threshold - always show header
      if (currentScrollY <= SCROLL_HIDE_THRESHOLD) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      // Scrolling down - hide header
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } 
      // Scrolling up - show header
      else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside para cerrar dropdown
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

  // Determinar clases del header - fixed para efecto Headroom
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300",
    isVisible ? "translate-y-0" : "-translate-y-full",
    isScrolled && "shadow-lg"
  );

  return <>
      <header
        ref={headerRef}
        className={headerClasses}
      >
        {/* Main Header */}
        <div className="header-main">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Mobile: Hamburger + Logo */}
              <div className="flex items-center gap-3 md:hidden">
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors text-white" aria-label="Abrir menú">
                  <Menu className="w-6 h-6" />
                </button>
                <Link to="/" className="flex flex-col leading-tight">
                  <span className="text-xl font-elegant tracking-wide text-white">
                    Evelyn
                  </span>
                  <span className="text-[0.6rem] font-normal text-gray-400 tracking-widest uppercase">
                    cosmetics
                  </span>
                </Link>
              </div>

              {/* Desktop: Logo */}
              <Link to="/" className="hidden md:flex flex-col leading-tight group">
                <span className="text-3xl font-elegant tracking-wide text-white transition-colors group-hover:text-gray-200">
                  Evelyn
                </span>
                <span className="text-[0.65rem] font-normal text-gray-400 tracking-widest uppercase">
                  cosmetics
                </span>
              </Link>

              {/* Desktop: Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="search-container">
                  <input type="text" placeholder="¿Qué estás buscando?" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="search-input" />
                  <button className="search-button">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cart Button */}
              <button onClick={() => setIsCartOpen(true)} className="cart-button ml-auto md:ml-0">
                <span className="text-sm font-medium text-white">Bs {finalTotal.toFixed(1)}</span>
                <div className="relative text-white">
                  <ShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
                  {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 py-3 bg-[hsl(0,0%,85%)]">
          <div className="search-container">
            <input type="text" placeholder="¿Qué estás buscando?" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="search-input" />
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
              <li className="relative" ref={dropdownRef} onMouseEnter={handleCategoriesEnter} onMouseLeave={handleCategoriesLeave}>
                <button className={cn("nav-item nav-item-categories", isCategoriesOpen && "nav-item-active")} onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
                  Categorías
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isCategoriesOpen && "rotate-180")} />
                </button>

                {/* Mega Menu */}
                <div className={cn("mega-menu", isCategoriesOpen ? "mega-menu-open" : "mega-menu-closed")}>
                  <div className="flex">
                    {/* Categories List */}
                    <div className="categories-list bg-accent">
                      {categories.map(category => <button key={category.name} className={cn("category-item", activeCategory === category.name && "category-item-active")} onMouseEnter={() => handleCategoryHover(category.name)}>
                          {category.name}
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        </button>)}
                    </div>

                    {/* Subcategories */}
                    <div className="subcategories-panel">
                      {activeCategory && <div className="subcategories-list">
                          <h4 className="subcategories-title">{activeCategory}</h4>
                          {categories.find(c => c.name === activeCategory)?.subcategories.map(sub => <a key={sub} href="#" className="subcategory-item">
                                {sub}
                              </a>)}
                        </div>}
                      {!activeCategory && <div className="subcategories-placeholder">
                          <p>Pasa el cursor sobre una categoría para ver las subcategorías</p>
                        </div>}
                    </div>
                  </div>
                </div>
              </li>

              {/* Other Nav Items */}
              <li>
                <Link to="/tienda" className="nav-item">
                  Tienda
                </Link>
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

      {/* Spacer fijo para compensar el header fixed */}
      <div className="h-16 md:h-20" />

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>;
};
export default Header;