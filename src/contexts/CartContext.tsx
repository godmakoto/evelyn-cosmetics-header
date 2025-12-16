import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice?: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Demo products for testing
const demoItems: CartItem[] = [
  {
    id: "1",
    name: "Sérum Vitamina C",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop",
    originalPrice: 120,
    discountedPrice: 96,
    quantity: 2,
  },
  {
    id: "2",
    name: "Crema Hidratante Facial",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop",
    originalPrice: 85,
    quantity: 1,
  },
  {
    id: "3",
    name: "Protector Solar SPF 50",
    image: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=100&h=100&fit=crop",
    originalPrice: 75,
    discountedPrice: 60,
    quantity: 1,
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(demoItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalDiscount = items.reduce((sum, item) => {
    if (item.discountedPrice) {
      return sum + (item.originalPrice - item.discountedPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const finalTotal = subtotal - totalDiscount;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addItem,
        removeItem,
        updateQuantity,
        subtotal,
        totalDiscount,
        finalTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
