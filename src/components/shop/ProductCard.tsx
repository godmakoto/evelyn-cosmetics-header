import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ProductCardProps {
  product: ShopProduct;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, items, setIsCartOpen } = useCart();
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

  return (
    <div className="bg-white rounded-2xl border border-gray-200 flex flex-row h-[170px] p-4 gap-5 hover:shadow-md transition-shadow duration-300">
      {/* Image Column */}
      <div className="w-[135px] sm:w-[150px] flex-shrink-0">
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Info Column */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* Top content block */}
        <div>
          {/* Title - 3 lines max with ellipsis */}
          <h3 className="text-[16px] leading-[1.25] font-medium text-gray-900 line-clamp-3">
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-[13px] text-[#8B8BA7] capitalize mt-1">
            {product.brand}
          </p>

          {/* Prices */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[18px] font-semibold text-red-600">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && (
              <span className="text-[13px] text-gray-400 line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button - pill style */}
        <button
          onClick={handleAddToCart}
          className="h-[44px] rounded-full bg-black text-white px-6 w-full sm:w-[240px] flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-sm font-medium">
            {isInCart ? "Ver carrito" : "Agregar"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;