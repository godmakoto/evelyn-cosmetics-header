import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Check } from "lucide-react";

interface ProductCardProps {
  product: ShopProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, items, setIsCartOpen } = useCart();

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
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
      setIsCartOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#eaeaea] overflow-hidden flex flex-row h-[220px] md:h-[280px] hover:shadow-lg transition-shadow duration-300">
      {/* Image Column */}
      <div className="relative w-[35%] md:w-[40%] bg-[#fcfcfc] flex items-center justify-center p-3">
        {product.discount && (
          <span className="absolute top-2 left-2 bg-[#e02b2b] text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md">
            {product.discount}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info Column */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-center">
        {/* Title - up to 4 lines */}
        <h3 className="text-[#222] font-bold text-sm md:text-base leading-tight line-clamp-4 mb-1.5">
          {product.name}
        </h3>

        {/* Brand */}
        <p className="text-[#888] text-xs capitalize mb-2">
          {product.brand}
        </p>

        {/* Prices */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#e02b2b] font-bold text-base md:text-lg">
            {product.price.toFixed(1)} Bs
          </span>
          {product.originalPrice && (
            <span className="text-[#999] text-sm line-through">
              {product.originalPrice.toFixed(1)} Bs
            </span>
          )}
        </div>

        {/* Description - max 2 lines */}
        <p className="text-[#666] text-xs leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`
            flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full
            text-sm font-medium transition-all duration-200
            ${isInCart 
              ? "bg-[#222] text-white" 
              : "bg-black text-white hover:bg-[#333]"
            }
          `}
        >
          {isInCart ? (
            <>
              <Check className="w-4 h-4" />
              <span>Agregado</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
