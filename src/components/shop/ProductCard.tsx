import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: ShopProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, items, setIsCartOpen } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const isInCart = items.some(item => item.id === product.id);
  const isOutOfStock = false; // Add this property to product if needed

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    if (isInCart) {
      setIsCartOpen(true);
    } else {
      setIsAnimating(true);
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        originalPrice: product.originalPrice || product.price,
        discountedPrice: product.originalPrice ? product.price : undefined
      });
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <div className="bg-white sm:rounded-2xl sm:border sm:border-[#eaeaea] overflow-hidden flex flex-row items-stretch sm:h-[300px] md:h-[280px] sm:hover:shadow-lg transition-shadow duration-300">
      {/* Image Column - 50% on mobile */}
      <div className="relative w-1/2 sm:w-[35%] md:w-[40%] p-3 min-[375px]:p-4 sm:p-3 flex items-center justify-center">
        {/* Gray background container for mobile */}
        <div className="w-full aspect-square sm:aspect-auto sm:h-full bg-gray-100 sm:bg-white rounded-lg sm:rounded-xl flex items-center justify-center relative overflow-hidden">
          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-lg sm:rounded-xl">
              <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Agotado
              </span>
            </div>
          )}
          
          {/* Discount badge - tablet/desktop only */}
          {product.discount && (
            <span className="hidden sm:block absolute top-2 left-2 bg-[#DC2626] text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md z-10">
              {product.discount}% OFF
            </span>
          )}
          
          <img
            src={product.image}
            alt={product.name}
            className="w-[85%] h-[85%] sm:w-[95%] sm:h-[95%] object-contain"
          />
        </div>
      </div>

      {/* Info Column - 50% on mobile */}
      <div className="w-1/2 sm:flex-1 p-3 min-[375px]:p-4 sm:p-4 md:p-6 flex flex-col justify-between">
        {/* Top section: Title and Brand */}
        <div>
          <h3 className="text-[#000] font-semibold sm:font-bold text-[14px] min-[375px]:text-[15px] sm:text-sm md:text-base leading-snug line-clamp-5 sm:line-clamp-4 mb-0.5">
            {product.name}
          </h3>
          <p className="text-gray-400 text-[12px] min-[375px]:text-[13px] sm:text-xs capitalize">
            {product.brand}
          </p>
        </div>

        {/* Middle section: Prices */}
        <div className="flex items-center gap-1.5 sm:gap-2 my-2 sm:my-0">
          <span className="text-[#DC2626] font-bold text-[16px] min-[375px]:text-[17px] sm:text-base md:text-lg">
            {product.price.toFixed(1)} Bs
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-[12px] min-[375px]:text-[13px] sm:text-sm line-through">
              {product.originalPrice.toFixed(1)} Bs
            </span>
          )}
        </div>

        {/* Description - tablet/desktop only */}
        <p className="hidden sm:block text-[#666] text-xs leading-relaxed line-clamp-2 mb-2">
          {product.description}
        </p>

        {/* Bottom section: Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`
            w-full py-2.5 min-[375px]:py-3 sm:py-2 rounded-full flex items-center justify-center gap-2 
            text-[13px] min-[375px]:text-[14px] sm:text-sm font-medium
            transition-all duration-200
            ${isAnimating ? 'scale-95' : 'scale-100'}
            ${isOutOfStock 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : isInCart
                ? 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 sm:bg-transparent sm:border-input sm:hover:bg-accent'
                : 'bg-black text-white hover:bg-gray-800'
            }
          `}
        >
          <ShoppingBag className="w-4 h-4" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;