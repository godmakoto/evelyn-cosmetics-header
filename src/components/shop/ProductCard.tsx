import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ProductCardProps {
  product: ShopProduct;
}
const ProductCard = ({
  product
}: ProductCardProps) => {
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
  return <div className="bg-white rounded-none border-0 border-b border-[#eaeaea] sm:rounded-2xl sm:border sm:border-[#eaeaea] overflow-hidden flex flex-row h-auto sm:h-[300px] md:h-[280px] hover:shadow-lg transition-shadow duration-300">
      {/* Image Column */}
      <div className="relative w-[42%] sm:w-[35%] md:w-[40%] bg-[#fcfcfc] flex items-center justify-center p-2 sm:p-1.5 md:p-3 self-stretch">
        {product.discount && <span className="absolute top-2 left-2 bg-[#e02b2b] text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md z-10">
            {product.discount}% OFF
          </span>}
        <img src={product.image} alt={product.name} className="w-full h-full object-contain max-h-[180px] sm:max-h-none" />
      </div>

      {/* Info Column */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 flex flex-col justify-center gap-2">
        <div>
          {/* Title - up to 4 lines */}
          <h3 className="text-[#222] font-bold text-[13px] sm:text-sm md:text-base leading-snug line-clamp-4 mb-1">
            {product.name}
          </h3>

          {/* Brand */}
          <p className="text-[#888] text-xs capitalize mb-1.5">
            {product.brand}
          </p>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[#e02b2b] font-bold md:text-lg text-base">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && <span className="text-[#999] text-xs md:text-sm line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>}
          </div>

          {/* Description - max 2 lines */}
          <p className="text-[#666] text-xs leading-relaxed line-clamp-2 mb-2">
            {product.description}
          </p>
        </div>

        {/* Add to Cart Button - Same as ProductCarousel */}
        <Button variant={isInCart ? "outline" : "default"} className="w-full rounded-full gap-2 text-sm shrink-0" onClick={handleAddToCart}>
          <ShoppingBag className="w-4 h-4" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </Button>
      </div>
    </div>;
};
export default ProductCard;