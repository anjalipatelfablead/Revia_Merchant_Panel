import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CatalogItem } from '../../../types';
import { MOCK_ADDONS } from '../../data/mockData';

interface CartItem extends CatalogItem {
  quantity: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const CustomerCartOverlay: React.FC<Props> = ({ isOpen, onClose, cartItems, onUpdateQuantity }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% mock tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E6E6E6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F8F8F6] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#222]" />
            </div>
            <h2 className="text-xl font-black text-[#222]">Your Order</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F8F6] text-[#666] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
              <ShoppingBag className="w-12 h-12 text-[#999]" />
              <p className="font-bold text-[#666]">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
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
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#222]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#222]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add-ons Section */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E6E6E6] bg-white shrink-0">
            <h3 className="text-xs font-black text-[#222] uppercase tracking-wider mb-3">Frequently Added</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {MOCK_ADDONS.map(addon => (
                <button 
                  key={addon.id} 
                  className="flex-shrink-0 flex items-center gap-3 bg-white border border-[#E6E6E6] rounded-xl p-2 pr-4 hover:border-[#C89B3C] hover:bg-[#FFF8ED] transition-colors text-left"
                  onClick={() => alert(`Added ${addon.name} to cart!`)}
                >
                  <div className="w-8 h-8 bg-[#F8F8F6] rounded-full flex items-center justify-center shrink-0">
                    <Plus className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#222] leading-tight">{addon.name}</p>
                    <p className="text-[10px] font-bold text-[#999]">+${addon.price.toFixed(2)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#E6E6E6] p-6 bg-[#F8F8F6] shrink-0">
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-[#666]">
                <span>Subtotal</span>
                <span className="font-medium text-[#222]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#666]">
                <span>Tax (8%)</span>
                <span className="font-medium text-[#222]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-[#222] pt-3 border-t border-[#E6E6E6]">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                alert('Order placed successfully! (Demo)');
                onClose();
              }}
              className="w-full bg-[#222] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
