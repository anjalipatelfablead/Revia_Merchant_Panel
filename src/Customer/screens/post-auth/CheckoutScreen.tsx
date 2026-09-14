import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { MOCK_ADDONS } from '../../data/mockData';
import { CatalogItem } from '../../types';

export interface CheckoutScreenProps {
  cartItems: CatalogItem[];
  updateQuantity: (id: string, delta: number) => void;
  subtotal: number;
  tax: number;
  total: number;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cartItems, updateQuantity, subtotal, tax, total }) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const addonsTotal = MOCK_ADDONS.reduce(
    (sum, a) => (selectedAddons.includes(a.id) ? sum + a.price : sum),
    0
  );

  const grandTotal = total + addonsTotal;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-[#999]" />
        <p className="font-bold text-[#666]">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#E6E6E6]">
        <h2 className="text-xl font-black text-[#222]">Checkout</h2>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EDEDED] text-[#666] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E6E6E6]">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#222] text-sm leading-tight line-clamp-2">{item.title}</h3>
                <p className="text-xs text-[#999] mt-1">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="font-black text-[#C89B3C]">${(item.price * item.quantity).toFixed(2)}</p>
                <div className="flex items-center gap-3 bg-[#F8F8F6] rounded-full px-2 py-1 border border-[#E6E6E6]">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#222]">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#222]">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add‑ons */}
      <div className="border-t border-[#E6E6E6] p-6 bg-[#F8F8F6]">
        <h3 className="text-lg font-bold text-[#222] mb-4">Add‑ons</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {MOCK_ADDONS.map(addon => (
            <label key={addon.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedAddons.includes(addon.id)}
                onChange={() => toggleAddon(addon.id)}
                className="w-4 h-4 text-[#C89B3C] border-[#E6E6E6] rounded"
              />
              <span className="text-sm text-[#222] flex-1">{addon.name} (+${addon.price.toFixed(2)})</span>
            </label>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#666]"><span>Subtotal</span><span className="font-medium text-[#222]">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-[#666]"><span>Tax (8%)</span><span className="font-medium text-[#222]">${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-[#666]"><span>Add‑ons</span><span className="font-medium text-[#222]">${addonsTotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-lg font-black text-[#222] pt-3 border-t border-[#E6E6E6]"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
        </div>
        <button
          onClick={() => {
            alert('Order placed successfully! (Demo)');
            // In a real app you would clear the cart here
          }}
          className="w-full bg-[#222] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg mt-6"
        >
          Place Order <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
