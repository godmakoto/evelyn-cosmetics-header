import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
  product: ShopProduct;
}

// Genera un nombre largo genérico para demostración en desktop
const generateLongName = (originalName: string): string => {
  const suffixes = [
    "con Ácido Hialurónico y Vitamina C para una Piel Radiante",
    "Fórmula Avanzada con Extractos Naturales y Péptidos Bioactivos",
    "Tratamiento Intensivo con Retinol y Niacinamida de Alta Potencia",
    "Edición Especial con Ceramidas y Extracto de Rosa Mosqueta",
    "con Colágeno Marino y Ácido Ferúlico para Rejuvenecimiento",
    "Fórmula Profesional con Bakuchiol y Vitamina E Antioxidante",
  ];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${originalName} ${randomSuffix}`;
};

const ProductCard = ({
  product
}: ProductCardProps) => {
  const navigate = useNavigate();
  const {
    addItem,
    items,
    setIsCartOpen
  } = useCart();
  const isInCart = items.some(item => item.id === product.id);
  
  // Genera el nombre largo una sola vez por producto usando el id como seed
  const longName = (() => {
    const suffixes = [
      "con Ácido Hialurónico y Vitamina C para una Piel Radiante",
      "Fórmula Avanzada con Extractos Naturales y Péptidos Bioactivos",
      "Tratamiento Intensivo con Retinol y Niacinamida de Alta Potencia",
      "Edición Especial con Ceramidas y Extracto de Rosa Mosqueta",
      "con Colágeno Marino y Ácido Ferúlico para Rejuvenecimiento",
      "Fórmula Profesional con Bakuchiol y Vitamina E Antioxidante",
    ];
    // Usar el id del producto para seleccionar un sufijo consistente
    const index = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % suffixes.length;
    return `${product.name} ${suffixes[index]}`;
  })();
  
  const handleAddToCart = () => {
    if (isInCart) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/producto/${product.id}`);
  };
  return <div
    className="bg-white rounded-none lg:rounded-2xl border-0 lg:border lg:border-[#eaeaea] overflow-hidden flex flex-row h-[200px] sm:h-[320px] lg:h-auto shadow-none lg:hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    onClick={handleCardClick}
  >
      <div className="relative w-[56%] sm:w-[45%] sm:aspect-square lg:w-[320px] lg:h-[320px] flex items-center justify-center p-3 lg:p-6 flex-shrink-0">
        {product.discount && <span className="hidden lg:block absolute top-2 left-2 bg-[#e02b2b] text-white text-[10px] lg:text-xs font-semibold px-2 py-1 rounded-md z-10">
            {product.discount}% OFF
          </span>}
        <div className="w-full h-full aspect-square overflow-hidden rounded-xl bg-white flex items-center justify-center">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="w-[44%] sm:w-[55%] lg:flex-1 py-3 pr-3 sm:py-4 sm:pr-4 lg:py-6 lg:pr-6 lg:pl-0 flex flex-col justify-between h-full lg:h-[320px]">
        {/* Mobile/Tablet content */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden lg:hidden">
          <h3 className="text-[#222] font-medium text-[13px] sm:text-[15px] leading-[1.3] line-clamp-5 mb-1">
            {product.name}
          </h3>

          <p className="text-[#888] text-[10px] sm:text-[11px] capitalize mb-1">{product.brand}</p>

          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <span className="text-[#e02b2b] font-bold text-[15px] sm:text-[17px]">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && <span className="text-[#999] text-[12px] sm:text-[13px] line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>}
          </div>

          <p className="hidden sm:block text-[#666] text-[12px] leading-relaxed line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        {/* Mobile/Tablet: botón */}
        <Button
          variant={isInCart ? "outline" : "default"}
          className="w-full rounded-full gap-2 text-[13px] sm:text-[14px] mt-auto py-2.5 h-auto flex-shrink-0 lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <ShoppingBag className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px]" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </Button>

        {/* Desktop content - espaciado uniforme y precio alineado al fondo */}
        <div className="hidden lg:flex flex-col h-full justify-between">
          {/* Contenido superior con espaciado uniforme */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#222] font-semibold text-lg leading-[1.3] line-clamp-5">
              {longName}
            </h3>

            <p className="text-[#888] text-xs capitalize tracking-wide font-medium">{product.brand}</p>

            <div className="flex flex-wrap gap-1.5">
              {product.category && (
                <span className="bg-[#f5f5f5] text-[#555] text-[10px] font-medium px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
              )}
              {product.subcategory && (
                <span className="bg-[#f0f7ff] text-[#4a90d9] text-[10px] font-medium px-2.5 py-1 rounded-full">
                  {product.subcategory}
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#fff8e6] text-[#b8860b] text-[10px] font-medium px-2.5 py-1 rounded-full">
                  Más Vendido
                </span>
              )}
              {product.isBackInStock && (
                <span className="bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-medium px-2.5 py-1 rounded-full">
                  De Vuelta
                </span>
              )}
            </div>
          </div>

          {/* Precio + botón al fondo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[#e02b2b] font-bold text-2xl">
                {product.price.toFixed(1)} Bs
              </span>
              {product.originalPrice && (
                <span className="text-[#999] text-base line-through">
                  {product.originalPrice.toFixed(1)} Bs
                </span>
              )}
            </div>
            <Button
              variant={isInCart ? "outline" : "default"}
              className="flex-1 rounded-full gap-2 text-base py-3.5 h-auto font-medium"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              {isInCart ? "Ver carrito" : "Agregar"}
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default ProductCard;