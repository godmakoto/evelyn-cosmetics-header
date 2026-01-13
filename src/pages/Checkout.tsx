import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Minus, Plus, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, addItem, removeItem, updateQuantity, subtotal, totalDiscount, finalTotal, clearCart } = useCart();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Estado del formulario de información del cliente
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Hook para crear pedido
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();

  const handleWhatsAppCheckout = () => {
    // Validar que se haya completado la información requerida
    if (!customerName.trim()) {
      toast.error("Por favor ingresa tu nombre");
      return;
    }

    if (!customerPhone.trim()) {
      toast.error("Por favor ingresa tu número de teléfono");
      return;
    }

    // Validar formato de teléfono (básico)
    if (customerPhone.length < 8) {
      toast.error("Por favor ingresa un número de teléfono válido");
      return;
    }

    // Guardar pedido en Supabase primero
    createOrder(
      {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerAddress: customerAddress.trim() || undefined,
        items,
        subtotal,
        discount: totalDiscount,
        total: finalTotal,
        notes: notes.trim() || undefined,
        paymentMethod: "WhatsApp",
      },
      {
        onSuccess: (order) => {
          // Pedido guardado exitosamente, ahora abrir WhatsApp
          toast.success("Pedido registrado correctamente");

          // Build order message for WhatsApp
          let message = `¡Hola! Me gustaría realizar el siguiente pedido:\n\n`;
          message += `📋 *Pedido:* ${order.order_number}\n`;
          message += `👤 *Nombre:* ${customerName}\n`;
          message += `📱 *Teléfono:* ${customerPhone}\n`;
          if (customerEmail) {
            message += `📧 *Email:* ${customerEmail}\n`;
          }
          if (customerAddress) {
            message += `📍 *Dirección:* ${customerAddress}\n`;
          }
          message += `\n*Productos:*\n`;

          items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Cantidad: ${item.quantity}\n`;
            message += `   Precio: ${item.discountedPrice || item.originalPrice} Bs c/u\n`;
            message += `   Subtotal: ${((item.discountedPrice || item.originalPrice) * item.quantity).toFixed(1)} Bs\n\n`;
          });

          message += `Subtotal: ${subtotal.toFixed(1)} Bs\n`;
          if (totalDiscount > 0) {
            message += `Descuento: -${totalDiscount.toFixed(1)} Bs\n`;
          }
          message += `*Total: ${finalTotal.toFixed(1)} Bs*`;

          if (notes) {
            message += `\n\n📝 *Notas:* ${notes}`;
          }

          // Número de WhatsApp de Evelyn Cosmetics
          const phoneNumber = "59165038009";
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

          // Abrir WhatsApp
          window.open(whatsappUrl, '_blank');

          // Limpiar carrito después de enviar
          setTimeout(() => {
            clearCart();
            navigate('/tienda');
          }, 1000);
        },
        onError: (error) => {
          console.error("Error creating order:", error);
          toast.error("Error al registrar el pedido. Por favor intenta de nuevo.");
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <p className="text-[#666] text-lg mb-4">Tu carrito está vacío</p>
          <Button onClick={() => navigate('/tienda')} className="rounded-full">
            Ir a la tienda
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 bg-white lg:bg-[#f9f9f9]">
        <div className="max-w-[1200px] mx-auto px-4 py-6 lg:py-12">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#666] hover:text-[#222] transition-colors mb-4 lg:mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Volver</span>
            </button>
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#222]">Mi Carrito</h1>
          </div>

          {/* Desktop: Table Header */}
          <div className="hidden lg:grid lg:grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[#eee] mb-6 text-sm font-medium text-[#666] uppercase tracking-wide">
            <div>Producto</div>
            <div>Precio</div>
            <div>Cantidad</div>
            <div>Total</div>
            <div></div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
            {items.map((item) => (
              <div key={item.id}>
                {/* Mobile View */}
                <div className="lg:hidden bg-white border-b border-[#eee] pb-4">
                  <div className="flex gap-4 mb-3">
                    <div className="w-20 h-20 flex-shrink-0 bg-[#f5f5f5] rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#222] line-clamp-2 leading-tight mb-3">
                        {item.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        {item.discountedPrice && (
                          <span className="text-xs text-[#999] line-through">
                            Bs {item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-[#222]">
                          Bs {(item.discountedPrice || item.originalPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#999] hover:text-[#e02b2b] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 border border-[#ddd] rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#f5f5f5] transition-colors rounded-l-md"
                      >
                        <Minus className="w-4 h-4 text-[#666]" />
                      </button>
                      <span className="text-sm font-medium text-[#222] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addItem(item)}
                        className="p-2 hover:bg-[#f5f5f5] transition-colors rounded-r-md"
                      >
                        <Plus className="w-4 h-4 text-[#666]" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#666]">Total</p>
                      <p className="text-lg font-bold text-[#222]">
                        Bs {((item.discountedPrice || item.originalPrice) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:grid lg:grid-cols-[3fr_1fr_1fr_1fr_auto] gap-4 items-center py-6 border-b border-[#eee]">
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 bg-[#f5f5f5] rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#222] line-clamp-2 leading-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    {item.discountedPrice && (
                      <p className="text-xs text-[#999] line-through mb-1">
                        Bs {item.originalPrice.toFixed(2)}
                      </p>
                    )}
                    <p className="text-base font-bold text-[#222]">
                      Bs {(item.discountedPrice || item.originalPrice).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 border border-[#ddd] rounded-md w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-[#f5f5f5] transition-colors rounded-l-md"
                    >
                      <Minus className="w-4 h-4 text-[#666]" />
                    </button>
                    <span className="text-sm font-medium text-[#222] min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addItem(item)}
                      className="p-2 hover:bg-[#f5f5f5] transition-colors rounded-r-md"
                    >
                      <Plus className="w-4 h-4 text-[#666]" />
                    </button>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-xs text-[#666] mb-1">Total</p>
                    <p className="text-base font-bold text-[#222]">
                      Bs {((item.discountedPrice || item.originalPrice) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#999] hover:text-[#e02b2b] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:max-w-md lg:ml-auto">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-base">
                <span className="text-[#666]">Subtotal</span>
                <span className="font-medium text-[#222]">Bs {subtotal.toFixed(2)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-base">
                  <span className="text-[#666]">Descuentos</span>
                  <span className="font-medium text-[#e02b2b]">Bs -{totalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[#eee] pt-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold text-[#222]">Total</span>
                  <span className="text-2xl font-bold text-[#e02b2b]">Bs {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information Form */}
            <div className="mb-6 space-y-4 p-4 bg-[#f9f9f9] rounded-lg border border-[#eee]">
              <h3 className="text-base font-semibold text-[#222]">Información de Contacto</h3>

              <div>
                <label htmlFor="customerName" className="block text-sm text-[#666] mb-1.5">
                  Nombre completo <span className="text-[#e02b2b]">*</span>
                </label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="h-10 rounded-lg border-[#ddd] focus:border-[#222] focus:ring-[#222]"
                  required
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm text-[#666] mb-1.5">
                  Teléfono / WhatsApp <span className="text-[#e02b2b]">*</span>
                </label>
                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="Ej: 76543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="h-10 rounded-lg border-[#ddd] focus:border-[#222] focus:ring-[#222]"
                  required
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm text-[#666] mb-1.5">
                  Email (opcional)
                </label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="Ej: correo@ejemplo.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="h-10 rounded-lg border-[#ddd] focus:border-[#222] focus:ring-[#222]"
                />
              </div>

              <div>
                <label htmlFor="customerAddress" className="block text-sm text-[#666] mb-1.5">
                  Dirección de entrega (opcional)
                </label>
                <Textarea
                  id="customerAddress"
                  placeholder="Ej: Av. Principal #123, Zona Centro"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="min-h-[60px] rounded-lg border-[#ddd] focus:border-[#222] focus:ring-[#222] resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm text-[#666] mb-1.5">
                  Notas adicionales (opcional)
                </label>
                <Textarea
                  id="notes"
                  placeholder="Ej: Entrega en horario de tarde"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[60px] rounded-lg border-[#ddd] focus:border-[#222] focus:ring-[#222] resize-none"
                  rows={2}
                />
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#ccc] accent-[#222] focus:outline-none focus:ring-0 cursor-pointer"
                />
                <span className="text-sm text-[#666] leading-relaxed">
                  Estoy de acuerdo con los{" "}
                  <Link
                    to="/terminos-y-condiciones"
                    className="text-[#222] font-semibold underline hover:text-[#e02b2b] transition-colors"
                    target="_blank"
                  >
                    términos y condiciones
                  </Link>
                </span>
              </label>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppCheckout}
              disabled={!acceptedTerms || !customerName.trim() || !customerPhone.trim() || isCreatingOrder}
              className={cn(
                "w-full rounded-full py-6 text-base font-semibold transition-all",
                acceptedTerms && customerName.trim() && customerPhone.trim() && !isCreatingOrder
                  ? "bg-[#25D366] hover:bg-[#20BD5A] text-white cursor-pointer"
                  : "bg-[#ddd] text-[#999] cursor-not-allowed"
              )}
            >
              {isCreatingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Finalizar por WhatsApp
                </>
              )}
            </Button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate('/tienda')}
              className="w-full mt-4 text-[#666] hover:text-[#222] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Escoger más productos
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
