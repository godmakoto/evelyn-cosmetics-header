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
  return (
    <>
      {/* Mobile Product Card */}
      <div className="sm:hidden flex gap-0 bg-white items-stretch">
        {/* Columna Izquierda: Imagen (50%) */}
        <div className="relative w-1/2 flex-shrink-0 p-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Columna Derecha: Información (50%) */}
        <div className="flex-1 flex flex-col justify-between p-4 h-auto self-stretch">
          <div className="space-y-2">
            {/* Nombre del producto */}
            <div>
              <h3 className="text-[13px] font-medium leading-tight line-clamp-5 mb-1">
                {product.name}
              </h3>
              {/* Marca */}
              <p className="text-gray-400 text-[11px] capitalize">{product.brand}</p>
            </div>
            
            {/* Precios */}
            <div className="flex flex-row flex-nowrap items-baseline gap-2 -mt-1">
              <span className="text-red-600 text-[15px] whitespace-nowrap">
                {product.price.toFixed(1)} Bs
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm whitespace-nowrap">
                  {product.originalPrice.toFixed(1)} Bs
                </span>
              )}
            </div>
          </div>

          {/* Botón Agregar */}
          <button 
            className="w-full py-2 rounded-full flex items-center justify-center gap-2 bg-black text-white text-[14px] font-medium"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isInCart ? "Ver carrito" : "Agregar"}</span>
          </button>
        </div>
      </div>

      {/* Tablet/Desktop Product Card */}
      <div className="hidden sm:flex bg-white rounded-2xl border border-[#eaeaea] overflow-hidden flex-row h-[300px] md:h-[280px] hover:shadow-lg transition-shadow duration-300">
        {/* Image Column */}
        <div className="relative w-[40%] md:w-[45%] bg-white flex items-center justify-center p-2 md:p-0">
          {product.discount && (
            <span className="absolute top-2 left-2 bg-[#e02b2b] text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md z-10">
              {product.discount}% OFF
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl md:rounded-2xl"
          />
        </div>

        {/* Info Column */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[#222] font-bold text-sm md:text-base leading-snug line-clamp-4 mb-1">
              {product.name}
            </h3>
            <p className="text-[#888] text-xs capitalize mb-1.5">
              {product.brand}
            </p>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[#e02b2b] font-bold md:text-lg text-base">
                {product.price.toFixed(1)} Bs
              </span>
              {product.originalPrice && (
                <span className="text-[#999] text-xs md:text-sm line-through">
                  {product.originalPrice.toFixed(1)} Bs
                </span>
              )}
            </div>
            <p className="text-[#666] text-xs leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          <Button
            variant={isInCart ? "outline" : "default"}
            className="w-full rounded-full gap-2 text-sm mt-2"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4" />
            {isInCart ? "Ver carrito" : "Agregar"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default ProductCard;