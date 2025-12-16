import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    totalDiscount,
    finalTotal,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="text-lg font-semibold">
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <p className="text-muted-foreground text-center">
              Tu carrito está vacío
            </p>
          </div>
        ) : (
          <>
            {/* Product List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-secondary/30 rounded-lg"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {item.name}
                    </h4>

                    {/* Prices */}
                    <div className="mt-1 flex items-center gap-2">
                      {item.discountedPrice ? (
                        <>
                          <span className="text-sm font-semibold text-foreground">
                            Bs {item.discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            Bs {item.originalPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold text-foreground">
                          Bs {item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-border px-6 py-5 bg-background space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">Bs {subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Descuento total</span>
                  <span className="font-medium text-green-600">
                    -Bs {totalDiscount.toFixed(2)}
                  </span>
                </div>
              )}

              <Separator />

              {/* Final Total */}
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold">Total final</span>
                <span className="text-xl font-bold">
                  Bs {finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button className="w-full h-12 text-base font-semibold mt-4">
                Finalizar compra
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
