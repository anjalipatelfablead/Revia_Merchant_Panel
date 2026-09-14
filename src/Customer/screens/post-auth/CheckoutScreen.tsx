import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { MOCK_ADDONS } from '../../data/mockData';
import { CatalogItem } from '../../types';

export interface CheckoutScreenProps {
  cartItems: CatalogItem[];
  updateQuantity: (id: string, delta: number) => void;
  subtotal: number;
  tax: number;
  total: number;
  onSuccess?: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cartItems, updateQuantity, subtotal, tax, total, onSuccess }) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

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

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-[#E6E6E6]">
          <ShoppingBag className="w-10 h-10 text-[#999]" />
        </div>
        <h2 className="text-xl font-black text-[#222]">Your cart is empty</h2>
        <p className="text-[#666] max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        {/* DESKTOP UI (Split Layout Full Width) */}
        <div className="hidden md:flex min-h-[75vh] w-full animate-in fade-in duration-700 items-stretch gap-12 py-4">

          {/* Left Side: Massive Graphic & Status */}
          <div className="w-1/2 pr-12 border-r border-[#E6E6E6] relative">
            <div className="sticky top-32 flex flex-col items-center justify-center text-center h-[calc(100vh-16rem)]">
              <div className="relative group mb-8 inline-block w-max mx-auto">
                <div className="absolute inset-0 bg-[#C89B3C] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="w-32 h-32 bg-gradient-to-tr from-[#C89B3C] to-[#E0B85E] rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 border-8 border-white/50 backdrop-blur-sm mx-auto">
                  <Check className="w-16 h-16 text-white animate-in zoom-in duration-500 delay-300" strokeWidth={3} />
                </div>
              </div>

              <h2 className="text-5xl font-black text-[#222] tracking-tight leading-[1.1] mb-6">
                Order Successfully<br />Placed.
              </h2>
              <p className="text-[#666] text-xl leading-relaxed max-w-md mx-auto">
                We've received your order and are preparing your items right now. Thank you for choosing Revia!
              </p>

              <button
                onClick={() => onSuccess?.()}
                className="mt-10 bg-[#222] text-white px-8 py-5 rounded-2xl font-black hover:bg-black transition-all shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-3 w-max text-lg mx-auto"
              >
                View My Orders <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side: The Receipt */}
          <div className="w-1/2 flex flex-col justify-center pl-4">
            <div className="w-full max-w-xl bg-white rounded-[40px] border border-[#E6E6E6] shadow-2xl shadow-black/5 p-10 text-left relative overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-[#999] uppercase tracking-[0.2em]">Order ID</p>
                  <p className="text-2xl font-black text-[#222] mt-1">#REV-{(Math.random() * 10000).toFixed(0).padStart(4, '0')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-[#999] uppercase tracking-[0.2em]">Spot / Table</p>
                  <div className="inline-flex items-center justify-center bg-[#C89B3C] text-white px-4 py-1.5 rounded-xl mt-2 shadow-sm">
                    <span className="text-base font-bold">Table 12</span>
                  </div>
                </div>
              </div>

              {/* Perfect Ticket Divider with aligned Cutouts */}
              <div className="relative flex items-center my-8">
                <div className="absolute -left-10 w-6 h-12 bg-[#F8F8F6] rounded-r-full border-y border-r border-[#E6E6E6] z-10"></div>
                <div className="w-full border-b-2 border-dashed border-[#E6E6E6]"></div>
                <div className="absolute -right-10 w-6 h-12 bg-[#F8F8F6] rounded-l-full border-y border-l border-[#E6E6E6] z-10"></div>
              </div>

              <div className="space-y-8 pb-4">
                <p className="text-xs font-black text-[#999] uppercase tracking-[0.2em]">Items Ordered</p>
                <div className="space-y-6">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between group">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E6E6E6] bg-[#F8F8F6] group-hover:scale-105 transition-transform shadow-sm">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[#222] line-clamp-1">{item.title}</p>
                          <p className="text-sm font-bold text-[#999] mt-1">Qty: {item.quantity} × ${(item.price).toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="text-xl font-black text-[#222] mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  {selectedAddons.length > 0 && (
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#F0F0F0]">
                      <p className="text-base font-bold text-[#666]">Extras ({selectedAddons.length})</p>
                      <p className="text-lg font-bold text-[#222]">${addonsTotal.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 mt-2 border-t-2 border-dashed border-[#E6E6E6] bg-[#F8F8F6] -mx-10 -mb-10 p-10 rounded-b-[40px]">
                <p className="text-sm font-black text-[#666] uppercase tracking-[0.2em]">Total Paid</p>
                <p className="text-4xl font-black text-[#222]">${grandTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE UI */}
        <div className="md:hidden flex flex-col h-full w-full bg-[#F8F8F6] absolute inset-0 z-50 animate-in slide-in-from-bottom-full duration-500">
          <div className="flex-1 overflow-y-auto pb-32">

            {/* Mobile Header Graphic */}
            <div className="bg-[#222] rounded-b-[40px] pt-16 pb-12 px-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="w-20 h-20 bg-gradient-to-tr from-[#C89B3C] to-[#E0B85E] rounded-full flex items-center justify-center shadow-lg relative z-10 mb-6">
                <Check className="w-10 h-10 text-white animate-in zoom-in duration-500 delay-300" strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight relative z-10">Order Placed</h2>
              <p className="text-[#999] mt-2 text-sm relative z-10">Your order has been sent to the kitchen.</p>
            </div>

            {/* Mobile Receipt Card */}
            <div className="px-4 -mt-6 relative z-20">
              <div className="bg-white rounded-3xl border border-[#E6E6E6] shadow-sm p-6 text-left space-y-6">

                <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0]">
                  <div>
                    <p className="text-[10px] font-black text-[#999] uppercase tracking-[0.2em]">Order ID</p>
                    <p className="text-base font-black text-[#222] mt-1">#REV-{(Math.random() * 10000).toFixed(0).padStart(4, '0')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-[#999] uppercase tracking-[0.2em]">Spot</p>
                    <p className="text-base font-black text-[#222] mt-1">Table 12</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-[#222] uppercase tracking-[0.2em]">Items Ordered</p>
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#E6E6E6] bg-[#F8F8F6]">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#222] line-clamp-1">{item.title}</p>
                            <p className="text-xs font-medium text-[#999]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-black text-[#222] mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
                  <p className="text-xs font-black text-[#222] uppercase tracking-[0.2em]">Total</p>
                  <p className="text-xl font-black text-[#C89B3C]">${grandTotal.toFixed(2)}</p>
                </div>

              </div>
            </div>
          </div>

          {/* Sticky Mobile Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E6E6E6] shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-50">
            <button
              onClick={() => onSuccess?.()}
              className="w-full bg-[#222] text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
            >
              View My Orders <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-full mx-auto pb-24 space-y-8 animate-in fade-in duration-500">

      <div>
        <h2 className="text-3xl font-black text-[#222]">Checkout</h2>
        <p className="text-[#666] mt-1">Review your items and add any extras.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Col: Cart Items & Add-ons */}
        <div className="lg:col-span-7 space-y-8">

          {/* Items */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Your Order</h3>
            <div className="bg-white rounded-2xl border border-[#E6E6E6] p-2 divide-y divide-[#F0F0F0] shadow-sm">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E6E6E6] bg-[#F8F8F6]">
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
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#222] bg-white rounded-full shadow-sm">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-[#666] hover:text-[#222] bg-white rounded-full shadow-sm">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addons */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Frequently Added Extras</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_ADDONS.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center gap-4 p-3 rounded-2xl border transition-all text-left ${isSelected ? 'border-[#C89B3C] bg-[#FFF8ED] shadow-sm' : 'border-[#E6E6E6] bg-white hover:border-[#C89B3C] hover:bg-[#FFF8ED]/50'}`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#E6E6E6] bg-white relative">
                      {addon.image && <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#C89B3C]/80 flex items-center justify-center backdrop-blur-[1px]">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[#222] text-sm">{addon.name}</p>
                      <p className={`text-xs font-bold mt-0.5 ${isSelected ? 'text-[#C89B3C]' : 'text-[#666]'}`}>+${addon.price.toFixed(2)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-[#E6E6E6] p-6 shadow-sm sticky top-6">
            <h3 className="text-lg font-black text-[#222] mb-6">Order Summary</h3>

            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-[#666]">
                <span>Subtotal</span>
                <span className="font-medium text-[#222]">${subtotal.toFixed(2)}</span>
              </div>

              {addonsTotal > 0 && (
                <div className="flex justify-between text-[#666]">
                  <span>Extras</span>
                  <span className="font-medium text-[#222]">${addonsTotal.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#666]">
                <span>Tax (8%)</span>
                <span className="font-medium text-[#222]">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xl font-black text-[#222] pt-4 border-t border-[#E6E6E6]">
                <span>Total</span>
                <span className="text-[#C89B3C]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSuccess(true)}
              className="w-full bg-gradient-to-r from-[#E0B85E] to-[#C89B3C] hover:from-[#F5DEB3] hover:to-[#D4AF37] text-[#222] py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#C89B3C]/20"
            >
              Place Order <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[10px] text-[#999] font-bold uppercase tracking-widest mt-4 flex items-center justify-center gap-1">
              <Check className="w-3 h-3" /> Secure Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
