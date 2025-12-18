import { useState, useRef, useEffect, useCallback } from "react";
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

// ========== CONFIGURACIÓN AJUSTABLE ==========
// Umbral de scroll antes de cambiar dirección (evita flicker)
const SCROLL_THRESHOLD = 8;
// Duración de la animación en ms
const ANIMATION_DURATION = 220;
// Punto donde siempre se muestra el header
const TOP_THRESHOLD = 10;
// ==============================================

const Header = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  const { finalTotal, itemCount, setIsCartOpen } = useCart();

  // Detectar preferencia de reducción de movimiento
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Medir altura del header
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => setHeaderHeight(el.offsetHeight);
    update();

    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Lógica de scroll tipo Facebook
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Si estamos cerca del top, siempre mostrar
    if (currentScrollY <= TOP_THRESHOLD) {
      setIsHeaderVisible(true);
      lastScrollY.current = currentScrollY;
      ticking.current = false;
      return;
    }
    
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    // Solo actuar si superamos el umbral (evita flicker)
    if (Math.abs(scrollDelta) >= SCROLL_THRESHOLD) {
      // Scroll hacia abajo = ocultar, hacia arriba = mostrar
      setIsHeaderVisible(scrollDelta < 0);
      lastScrollY.current = currentScrollY;
    }
    
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };
    
    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

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

  return <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[9999] w-full"
        style={{
          transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: prefersReducedMotion ? 'none' : `transform ${ANIMATION_DURATION}ms ease`,
        }}
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

      {/* Spacer para evitar que el contenido quede tapado por el header fixed */}
      <div aria-hidden style={{ height: headerHeight }} />

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>;
};
export default Header;