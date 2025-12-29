import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

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

const brands = [
  "Avène",
  "Bioderma",
  "CeraVe",
  "Eucerin",
  "Isdin",
  "La Roche-Posay",
  "Neutrogena",
  "Nivea",
  "SkinCeuticals",
  "The Ordinary",
  "Vichy"
];

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile header hide/show on scroll
  const [showMobileHeader, setShowMobileHeader] = useState(true);
  const [isMobileHeaderFixed, setIsMobileHeaderFixed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const brandsDropdownRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const brandsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { finalTotal, itemCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isCheckoutPage = location.pathname === '/checkout';

  const handleTiendaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Navegar a tienda sin filtros (resetear todo) usando timestamp para forzar reset
    navigate('/tienda', { state: { resetFiltersTimestamp: Date.now() }, replace: location.pathname === '/tienda' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile header scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = 116; // Altura total del header móvil (64px header + 52px search)

      if (currentScrollY < headerHeight) {
        // Si estamos en la parte superior, header estático (no fixed)
        setIsMobileHeaderFixed(false);
        setShowMobileHeader(true);
      } else {
        // Cuando scrolleamos más allá del header, hacerlo fixed
        setIsMobileHeaderFixed(true);

        // Si scrolleamos hacia arriba, mostrar header
        // Si scrolleamos hacia abajo, ocultar header
        if (currentScrollY < lastScrollY) {
          setShowMobileHeader(true);
        } else if (currentScrollY > lastScrollY) {
          setShowMobileHeader(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Solo agregar el listener en móvil
    if (window.innerWidth < 768) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Click outside para cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
        setActiveCategory(null);
      }
      if (brandsDropdownRef.current && !brandsDropdownRef.current.contains(event.target as Node)) {
        setIsBrandsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoriesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (brandsTimeoutRef.current) clearTimeout(brandsTimeoutRef.current);
    setIsBrandsOpen(false);
    setIsCategoriesOpen(true);
  };

  const handleCategoriesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCategoriesOpen(false);
      setActiveCategory(null);
    }, 50);
  };

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleBrandsEnter = () => {
    if (brandsTimeoutRef.current) clearTimeout(brandsTimeoutRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsCategoriesOpen(false);
    setActiveCategory(null);
    setIsBrandsOpen(true);
  };

  const handleBrandsLeave = () => {
    brandsTimeoutRef.current = setTimeout(() => {
      setIsBrandsOpen(false);
    }, 50);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/tienda', {
        state: {
          searchQuery: searchQuery.trim(),
          resetFiltersTimestamp: Date.now()
        }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSearchQuery(""); // Clear search after navigating
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      // Cerrar el teclado móvil
      e.currentTarget.blur();
    }
  };

  return <>
      <header
        ref={headerRef}
        className="header-wrapper"
      >
        {/* Mobile: wrapper para header + search */}
        <div
          className={cn(
            "md:hidden",
            isMobileHeaderFixed ? "fixed top-0 left-0 right-0 z-50" : "relative",
            "transition-transform duration-300 ease-in-out",
            isMobileHeaderFixed && !showMobileHeader && "-translate-y-full"
          )}
        >
          {/* Main Header */}
          <div className="header-main">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Mobile: Hamburger + Logo */}
                <div className="flex items-center gap-3">
                  {!isCheckoutPage && (
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:bg-white/10 rounded-lg transition-colors text-white" aria-label="Abrir menú">
                      <Menu className="w-6 h-6" />
                    </button>
                  )}
                  <Link to="/" className="flex flex-col leading-tight">
                    <span className="text-xl font-elegant tracking-wide text-white">
                      Evelyn
                    </span>
                    <span className="text-[0.6rem] font-normal text-gray-400 tracking-widest uppercase">
                      cosmetics
                    </span>
                  </Link>
                </div>

                {/* Cart Button */}
                {!isCheckoutPage && (
                  <button onClick={() => setIsCartOpen(true)} className="cart-button ml-auto">
                    <span className="text-sm font-medium text-white">Bs {finalTotal.toFixed(1)}</span>
                    <div className="relative text-white">
                      <ShoppingCart className="w-6 h-6" />
                      {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          {!isCheckoutPage && (
            <div className="px-4 py-3 bg-[hsl(0,0%,85%)]">
              <div className="search-container">
                <input type="text" placeholder="¿Qué estás buscando?" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleSearchKeyDown} className="search-input" />
                <button onClick={handleSearch} className="search-button">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block">
          {/* Main Header */}
          <div className="header-main">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between h-20">
                {/* Desktop: Logo */}
                <Link to="/" className="flex flex-col leading-tight group">
                  <span className="text-3xl font-elegant tracking-wide text-white transition-colors group-hover:text-gray-200">
                    Evelyn
                  </span>
                  <span className="text-[0.65rem] font-normal text-gray-400 tracking-widest uppercase">
                    cosmetics
                  </span>
                </Link>

                {/* Desktop: Search Bar */}
                {!isCheckoutPage && (
                  <div className="flex flex-1 max-w-xl mx-8">
                    <div className="search-container">
                      <input type="text" placeholder="¿Qué estás buscando?" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleSearchKeyDown} className="search-input" />
                      <button onClick={handleSearch} className="search-button">
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Cart Button */}
                {!isCheckoutPage && (
                  <button onClick={() => setIsCartOpen(true)} className="cart-button">
                    <span className="text-sm font-medium text-white">Bs {finalTotal.toFixed(1)}</span>
                    <div className="relative text-white">
                      <ShoppingCart className="w-7 h-7" />
                      {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        {!isCheckoutPage && (
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
                      {categories.map(category => <button
                          key={category.name}
                          className={cn("category-item", activeCategory === category.name && "category-item-active")}
                          onMouseEnter={() => handleCategoryHover(category.name)}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/tienda', {
                              state: {
                                categoryFilter: category.name
                              },
                              replace: location.pathname === '/tienda'
                            });
                            setIsCategoriesOpen(false);
                            setActiveCategory(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          {category.name}
                          <ChevronDown className="w-4 h-4 -rotate-90" />
                        </button>)}
                    </div>

                    {/* Subcategories */}
                    <div className="subcategories-panel">
                      {activeCategory && <div className="subcategories-list">
                          <h4 className="subcategories-title">{activeCategory}</h4>
                          {categories.find(c => c.name === activeCategory)?.subcategories.map(sub => <button
                                key={sub}
                                className="subcategory-item"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate('/tienda', {
                                    state: {
                                      categoryFilter: activeCategory,
                                      subcategoryFilter: sub
                                    },
                                    replace: location.pathname === '/tienda'
                                  });
                                  setIsCategoriesOpen(false);
                                  setActiveCategory(null);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                              >
                                {sub}
                              </button>)}
                        </div>}
                      {!activeCategory && <div className="subcategories-placeholder">
                          <p>Pasa el cursor sobre una categoría para ver las subcategorías</p>
                        </div>}
                    </div>
                  </div>
                </div>
              </li>

              {/* Brands Dropdown */}
              <li className="relative" ref={brandsDropdownRef} onMouseEnter={handleBrandsEnter} onMouseLeave={handleBrandsLeave}>
                <button className={cn("nav-item nav-item-categories", isBrandsOpen && "nav-item-active")} onClick={() => setIsBrandsOpen(!isBrandsOpen)}>
                  Marcas
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isBrandsOpen && "rotate-180")} />
                </button>

                {/* Brands Mega Menu */}
                <div className={cn("absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg border border-border overflow-hidden transition-all duration-200 z-50", isBrandsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2")}>
                  <div className="p-6">
                    <div className="grid gap-x-12" style={{ gridTemplateColumns: `repeat(${Math.ceil(brands.length / 10)}, minmax(180px, auto))` }}>
                      {Array.from({ length: Math.ceil(brands.length / 10) }).map((_, colIndex) => (
                        <div key={colIndex} className="space-y-1">
                          {brands.slice(colIndex * 10, (colIndex + 1) * 10).map(brand => (
                            <button
                              key={brand}
                              className="w-full text-left px-4 py-2 hover:bg-accent rounded transition-colors text-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate('/tienda', {
                                  state: {
                                    brandFilter: brand
                                  },
                                  replace: location.pathname === '/tienda'
                                });
                                setIsBrandsOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {/* Other Nav Items */}
              <li>
                <Link to="/tienda" className="nav-item" onClick={handleTiendaClick}>
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/blog" className="nav-item">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/terminos-y-condiciones" className="nav-item">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>;
};
export default Header;