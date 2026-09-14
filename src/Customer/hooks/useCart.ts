import { useState, useMemo } from 'react';
import { CatalogItem } from '../../types';

export interface CartItem extends CatalogItem {
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: CatalogItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const subtotal = useMemo(() => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartItems]);
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  return {
    cartItems,
    addItem,
    updateQuantity,
    subtotal,
    tax,
    total,
  };
};
