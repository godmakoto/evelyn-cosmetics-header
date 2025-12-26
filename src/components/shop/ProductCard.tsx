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
    <div className="bg-white rounded-none md:rounded-2xl border-0 md:border md:border-[#eaeaea] overflow-hidden flex flex-row h-[200px] sm:h-[240px] md:h-[280px] shadow-none md:hover:shadow-lg transition-shadow duration-300">
      {/* Image Column - 56% en móvil, 40% en tablet/desktop */}
      <div className="relative w-[56%] sm:w-[40%] md:w-[40%] bg-white flex items-center justify-center p-3">
        {product.discount && (
          <span className="hidden md:block absolute top-2 left-2 bg-[#e02b2b] text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md z-10">
            {product.discount}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full aspect-square object-contain md:w-[90%] md:h-[90%] md:aspect-auto rounded-xl"
        />
      </div>

      {/* Info Column - 44% en móvil, 60% en tablet */}
      <div className="w-[44%] sm:w-[60%] md:flex-1 py-3 pr-3 sm:py-4 sm:pr-4 md:p-6 flex flex-col justify-between">
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-[#222] font-medium md:font-bold text-[13px] sm:text-[15px] md:text-base leading-[1.3] line-clamp-5 md:line-clamp-4 mb-1">
            {product.name}
          </h3>

          <p className="text-[#888] text-[10px] sm:text-[11px] md:text-xs capitalize mb-1">{product.brand}</p>

          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <span className="text-[#e02b2b] font-bold text-[15px] sm:text-[17px] md:text-lg">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && (
              <span className="text-[#999] text-[12px] sm:text-[13px] md:text-sm line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>
            )}
          </div>

          {/* Descripción breve - visible en tablet con 2 líneas */}
          <p className="hidden sm:block text-[#666] text-[12px] md:text-xs leading-relaxed line-clamp-2 mb-2 md:mb-0">
            {product.description}
          </p>
        </div>

        <Button
          variant={isInCart ? "outline" : "default"}
          className="w-full rounded-full gap-2 text-[13px] sm:text-[14px] md:text-sm mt-auto py-2.5 md:py-2 h-auto flex-shrink-0"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-4 md:h-4" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
