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
    <div className="bg-white rounded-none lg:rounded-2xl border-0 lg:border lg:border-[#eaeaea] overflow-hidden flex flex-row h-[200px] lg:h-[280px] shadow-none lg:hover:shadow-lg transition-shadow duration-300">
      {/* Image Column - 54% en móvil/tablet para imagen 1:1 perfecta */}
      <div className="relative w-[54%] lg:w-[40%] bg-white flex items-center justify-center p-3">
        {product.discount && (
          <span className="hidden lg:block absolute top-2 left-2 bg-[#e02b2b] text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
            {product.discount}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full lg:w-[90%] lg:h-[90%] aspect-square lg:aspect-auto object-cover lg:object-contain rounded-xl"
        />
      </div>

      {/* Info Column - 46% en móvil/tablet */}
      <div className="w-[46%] lg:flex-1 py-3 pr-3 lg:p-6 flex flex-col justify-between">
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-[#222] font-medium lg:font-bold text-[13px] lg:text-base leading-[1.3] line-clamp-5 lg:line-clamp-4 mb-1">
            {product.name}
          </h3>

          <p className="text-[#888] text-[10px] lg:text-xs capitalize mb-1">{product.brand}</p>

          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[#e02b2b] font-bold text-[15px] lg:text-lg">
              {product.price.toFixed(1)} Bs
            </span>
            {product.originalPrice && (
              <span className="text-[#999] text-[12px] lg:text-sm line-through">
                {product.originalPrice.toFixed(1)} Bs
              </span>
            )}
          </div>

          <p className="hidden lg:block text-[#666] text-xs leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        <Button
          variant={isInCart ? "outline" : "default"}
          className="w-full rounded-full gap-2 text-[13px] lg:text-sm mt-auto py-2.5 lg:py-2 h-auto flex-shrink-0"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-[14px] h-[14px] lg:w-4 lg:h-4" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
