import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/contexts/CartContext";

interface CreateOrderData {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  items: CartItem[];
  subtotal: number;
  discount: number; // Descuentos manuales adicionales
  product_discounts: number; // Descuentos automáticos de productos
  total: number;
  notes?: string;
  paymentMethod?: string;
}

interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  image?: string;
}

/**
 * Hook para obtener el ID del estado "Pendiente"
 */
export const usePendingStatusId = () => {
  return useQuery({
    queryKey: ["order-status-pending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_statuses")
        .select("id")
        .eq("name", "Pendiente")
        .single();

      if (error) {
        console.error("Error fetching pending status:", error);
        return null;
      }

      return data?.id || null;
    },
    staleTime: Infinity, // El ID del estado no cambia
  });
};

/**
 * Hook para generar número de orden único
 */
const generateOrderNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `ORD-${year}${month}${day}-${hours}${minutes}${seconds}${random}`;
};

/**
 * Hook para crear un pedido en Supabase
 */
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      // Primero, intentar obtener el ID del estado "Pendiente"
      let pendingStatusId = null;
      try {
        const { data: statusData } = await supabase
          .from("order_statuses")
          .select("id")
          .eq("name", "Pendiente")
          .single();

        if (statusData) {
          pendingStatusId = statusData.id;
        }
      } catch (error) {
        console.log("No se encontró estado 'Pendiente', continuando sin status_id");
      }

      // Generar número de orden único
      const orderNumber = generateOrderNumber();

      // Convertir items del carrito a formato de orden
      const orderItems: OrderItem[] = orderData.items.map((item) => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.discountedPrice || item.originalPrice,
        subtotal: (item.discountedPrice || item.originalPrice) * item.quantity,
        image: item.image,
      }));

      // Crear objeto de orden
      const order = {
        order_number: orderNumber,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        customer_email: orderData.customerEmail || null,
        customer_address: orderData.customerAddress || null,
        items: orderItems,
        subtotal: orderData.subtotal,
        discount: orderData.discount, // Descuentos manuales adicionales
        product_discounts: orderData.product_discounts, // Descuentos automáticos de productos
        total: orderData.total,
        status_id: pendingStatusId,
        notes: orderData.notes || null,
        payment_method: orderData.paymentMethod || null,
      };

      // Guardar en Supabase
      const { data, error } = await supabase
        .from("orders")
        .insert(order)
        .select()
        .single();

      if (error) {
        console.error("Error creating order:", error);
        throw new Error(`Error al crear el pedido: ${error.message}`);
      }

      return data;
    },
  });
};
