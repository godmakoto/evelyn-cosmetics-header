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
    <div className="bg-white rounded-2xl border border-[#eaeaea] overflow-hidden flex flex-row h-[220px] md:h-[280px] hover:shadow-lg transition-shadow duration-300">
      {/* Image Column */}
      <div className="w-[35%] md:w-[40%] bg-[#f5f5f5] flex items-center justify-center p-3 md:p-4">
        <div className="relative w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain rounded-2xl"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-[#b91c1c] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {product.discount}% OFF
            </span>
          )}
        </div>
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

        {/* Add to Cart Button - Same as ProductCarousel */}
        <Button
          variant={isInCart ? "outline" : "default"}
          className="w-full rounded-full gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-4 h-4" />
          {isInCart ? "Ver carrito" : "Agregar"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
