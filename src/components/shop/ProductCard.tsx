import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    }
  };

  return (
    <div className="bg-white rounded-none sm:rounded-2xl border-0 sm:border sm:border-[#eaeaea] border-b border-b-[#eee] overflow-hidden flex flex-row h-auto sm:h-[300px] md:h-[280px] shadow-none sm:hover:shadow-lg transition-shadow duration-300">
      {/* Image Column - 50% cuadrado en móvil, ajustado en desktop */}
      <div className="relative w-1/2 sm:w-[35%] md:w-[40%] bg-white flex items-center justify-center py-5 sm:py-0 sm:p-3">
        {product.discount && (
          <span className="hidden sm:block absolute top-2 left-2 bg-[#e02b2b] text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md z-10">
            {product.discount}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square sm:w-[95%] sm:h-[95%] md:w-[90%] md:h-[90%] sm:aspect-auto object-cover sm:object-contain rounded-xl"
        />
      </div>

      {/* Info Column - 50% en móvil */}
      <div className="w-1/2 sm:flex-1 p-3 sm:p-4 md:p-6 flex flex-col justify-between">
        <div className="flex-1">
          {/* Title - hasta 5 líneas en móvil, 4 en desktop */}
          <h3 className="text-[#222] font-semibold sm:font-bold text-[15px] sm:text-sm md:text-base leading-[1.3] line-clamp-5 sm:line-clamp-4 mb-1">
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-[#888] text-[10px] sm:text-xs capitalize mb-1">{product.brand}</p>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-2 sm:mb-1.5">
            <span className="text-[#e02b2b] font-bold text-[17px] sm:text-base md:text-lg">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && (
              <span className="text-[#999] text-[13px] sm:text-xs md:text-sm line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>
            )}
          </div>

          {/* Description - oculta en móvil, visible en desktop */}
          <p className="hidden sm:block text-[#666] text-xs leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant={isInCart ? "outline" : "default"}
          className="w-full rounded-full gap-2 text-[14px] sm:text-sm mt-2 py-2 sm:py-2"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-[15px] h-[15px] sm:w-4 sm:h-4" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
