import { ShopProduct } from "@/data/shopProducts";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ShopProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      originalPrice: product.price,
      image: product.image,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col min-[520px]:flex-row">
        {/* Image Container */}
        <div className="w-full min-[520px]:w-[200px] min-[520px]:min-w-[200px] h-[200px] min-[520px]:h-auto min-[520px]:items-center flex justify-center bg-muted/30 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain min-[520px]:my-auto"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.brand}
            </p>
            <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2 mb-2">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {product.category}
              </span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                {product.subcategory}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-bold text-foreground">
              ${product.price.toLocaleString("es-MX")}
            </p>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
