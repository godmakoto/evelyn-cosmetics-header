import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartTotal] = useState(0);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "header-scrolled" : "header-default"
      )}
    >
      {/* Main Header */}
      <div className="header-main">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="logo-icon">
                <svg
                  viewBox="0 0 40 40"
                  className="w-10 h-10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="18" className="fill-primary" />
                  <path
                    d="M20 8C20 8 12 14 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 14 20 8 20 8Z"
                    className="fill-primary-foreground"
                  />
                  <path
                    d="M20 12C20 12 16 16 16 21C16 23.7614 17.7909 26 20 26C22.2091 26 24 23.7614 24 21C24 16 20 12 20 12Z"
                    className="fill-primary"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="logo-text">Evelyn</span>
                <span className="logo-subtext">COSMETICS</span>
              </div>
            </a>

            {/* Search Bar */}
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

            {/* Cart */}
            <button className="cart-button">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="cart-badge">0</span>
              </div>
              <span className="cart-total">Bs {cartTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4 bg-background">
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

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex items-center gap-1">
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
  );
};

export default Header;
