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
    <div className="group flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative w-1/2 bg-[#f5f5f5] flex-shrink-0">
        <div className="aspect-square w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0]" />
        </div>
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-[#2a2a2a] text-white text-xs font-medium px-2 py-1 rounded">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-4 w-1/2">
        <div>
          <p className="text-xs text-[#999] uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-semibold text-[#1a1a1a]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#999] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="text-xs text-[#666] line-clamp-2">{product.description}</p>
        </div>

        <Button
          onClick={handleClick}
          className={`mt-3 w-full rounded-full text-sm font-medium transition-all duration-300 ${
            isInCart
              ? "bg-[#2a2a2a] hover:bg-[#1a1a1a]"
              : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
          } text-white hover:-translate-y-px`}
        >
          {isInCart ? (
            <>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ver carrito
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
