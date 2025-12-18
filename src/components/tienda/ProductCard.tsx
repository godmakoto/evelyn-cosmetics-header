import { Plus, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addItem, setIsCartOpen } = useCart();
  const isInCart = items.some((item) => item.id === product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleClick = () => {
    if (isInCart) {
      setIsCartOpen(true);
    } else {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined,
      });
    }
  };

  return (
    <div className="group flex flex-row bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative w-[45%] sm:w-1/2 flex-shrink-0">
        <div className="aspect-square w-full bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0]" />
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#2a2a2a] text-white text-[10px] sm:text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-3 sm:p-4 flex-1 min-w-0">
        <div>
          <p className="text-[10px] sm:text-xs text-[#999] uppercase tracking-wide mb-0.5 sm:mb-1">
            {product.brand}
          </p>
          <h3 className="text-xs sm:text-sm font-medium text-[#1a1a1a] line-clamp-2 mb-1 sm:mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1 sm:gap-2 mb-1 sm:mb-2">
            <span className="text-base sm:text-lg font-semibold text-[#1a1a1a]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-sm text-[#999] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-[10px] sm:text-xs text-[#666] line-clamp-2 hidden sm:block">{product.description}</p>
        </div>

        <Button
          onClick={handleClick}
          size="sm"
          className={`mt-2 sm:mt-3 w-full rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
            isInCart
              ? "bg-[#2a2a2a] hover:bg-[#1a1a1a]"
              : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
          } text-white hover:-translate-y-px`}
        >
          {isInCart ? (
            <>
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Ver carrito
            </>
          ) : (
            <>
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Agregar
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
