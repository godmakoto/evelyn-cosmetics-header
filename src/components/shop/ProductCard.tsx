import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
  product: ShopProduct;
}
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
          <img src={product.image} alt={product.name} className="w-full h-full object-fill" />
        </div>
      </div>

      <div className="w-[44%] sm:w-[55%] lg:flex-1 py-3 pr-3 sm:py-4 sm:pr-4 lg:py-6 lg:pr-6 lg:pl-0 flex flex-col justify-between h-full lg:h-[320px]">
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <h3 className="text-[#222] font-medium lg:font-semibold text-[13px] sm:text-[15px] lg:text-lg leading-[1.3] line-clamp-5 lg:line-clamp-3 mb-1 lg:mb-2">
            {product.name}
          </h3>

          <p className="text-[#888] text-[10px] sm:text-[11px] lg:text-xs capitalize mb-1 lg:mb-2 lg:tracking-wide lg:font-medium">{product.brand}</p>

          <p className="hidden lg:block text-[#666] text-xs leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Mobile/Tablet: precio arriba del botón */}
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 lg:hidden">
            <span className="text-[#e02b2b] font-bold text-[15px] sm:text-[17px]">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && <span className="text-[#999] text-[12px] sm:text-[13px] line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>}
          </div>

          <p className="hidden sm:block lg:hidden text-[#666] text-[12px] leading-relaxed line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        {/* Mobile/Tablet: botón solo */}
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

        {/* PC: precio y botón en la misma fila */}
        <div className="hidden lg:flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-2 w-1/2 flex-shrink-0">
            <span className="text-[#e02b2b] font-bold text-2xl">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && <span className="text-[#999] text-base line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>}
          </div>
          <Button
            variant={isInCart ? "outline" : "default"}
            className="w-1/2 rounded-full gap-2 text-base py-3.5 h-auto font-medium"
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
    </div>;
};
export default ProductCard;