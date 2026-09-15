import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag, ArrowRight, Check, CreditCard, Wallet, QrCode, Tag, MapPin, Clock, Utensils, Percent } from 'lucide-react';
import { MOCK_ADDONS, MOCK_REWARDS } from '../../data/mockData';
import { CatalogItem } from '../../../types';

export interface CheckoutScreenProps {
  cartItems: (CatalogItem & { quantity: number })[];
  updateQuantity: (id: string, delta: number) => void;
  subtotal: number;
  tax: number;
  total: number;
  onSuccess?: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cartItems, updateQuantity, subtotal, tax, total, onSuccess }) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [orderType, setOrderType] = useState<'dine-in' | 'pickup' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 12');
  const [pickupTime, setPickupTime] = useState('As soon as possible (10-15 mins)');
  const [deliveryAddress, setDeliveryAddress] = useState('45 Artisanal Lane, Flat 4B');
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'counter' | 'wallet'>('upi');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>({ code: 'GOLD15', discount: 0.15 });
  const [promoInput, setPromoInput] = useState('');
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

  const baseTotal = total + addonsTotal;
  const discountAmount = appliedPromo ? baseTotal * appliedPromo.discount : 0;
  const grandTotal = Math.max(0, baseTotal - discountAmount);

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'FREE5') {
      setAppliedPromo({ code: 'FREE5', discount: 0.20 });
    } else {
      alert('Applied promo code!');
    }
  };

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
      <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
        <div className="bg-white rounded-3xl border border-[#E6E6E6] shadow-2xl p-8 md:p-12 space-y-8">
          
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#C89B3C] to-[#E0B85E] rounded-3xl flex items-center justify-center shadow-xl mx-auto text-white">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h2 className="text-3xl font-black text-[#222]">Order Successfully Placed!</h2>
            <p className="text-base text-[#666] max-w-md mx-auto">
              Your order has been sent directly to the kitchen.
            </p>
          </div>

          <div className="bg-[#F8F8F6] rounded-2xl p-6 border border-[#E6E6E6] space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#E6E6E6]">
              <div>
                <p className="text-[10px] font-black text-[#999] uppercase tracking-wider">Order Reference</p>
                <p className="text-xl font-black text-[#222]">#REV-4921</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-[#999] uppercase tracking-wider">Order Type</p>
                <span className="bg-[#C89B3C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {orderType} • {orderType === 'dine-in' ? tableNumber : orderType === 'pickup' ? 'Counter' : 'Delivery'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-xs font-black text-[#999] uppercase tracking-wider">Items Ordered</p>
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-[#222] font-medium">{item.quantity}x {item.title}</span>
                  <span className="font-bold text-[#222]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {appliedPromo && (
                <div className="flex justify-between text-[#0D7A53] pt-2 border-t border-[#E6E6E6]">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-black text-[#222] pt-3 border-t border-[#E6E6E6]">
                <span>Total Paid</span>
                <span className="text-[#C89B3C]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSuccess?.()}
            className="w-full bg-[#222] text-white py-4 rounded-2xl font-black text-base hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
          >
            View Live Order Status <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto pb-24 space-y-8 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-[#222]">Checkout & Payment</h1>
        <p className="text-[#666] text-sm mt-1">Configure your order type, apply rewards, and choose payment method.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Order details & customizers */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Order Type Selection */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <h2 className="text-xs font-black text-[#222] uppercase tracking-wider flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#C89B3C]" /> 1. Select Order Type
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'dine-in', label: 'Dine-In', icon: Utensils },
                { id: 'pickup', label: 'Takeaway', icon: Clock },
                { id: 'delivery', label: 'Delivery', icon: MapPin }
              ].map(type => {
                const isSelected = orderType === type.id;
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setOrderType(type.id as any)}
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${
                      isSelected 
                        ? 'bg-[#FFF8ED] border-[#C89B3C] text-[#C89B3C] shadow-sm font-black' 
                        : 'bg-white border-[#E6E6E6] text-[#666] hover:border-[#C89B3C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-inputs based on order type */}
            <div className="pt-2">
              {orderType === 'dine-in' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#999] uppercase tracking-wider">Table / Spot Number</label>
                  <input 
                    type="text" 
                    value={tableNumber} 
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-full p-3 bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl text-sm font-bold text-[#222]" 
                  />
                </div>
              )}
              {orderType === 'pickup' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#999] uppercase tracking-wider">Estimated Pickup Time</label>
                  <select 
                    value={pickupTime} 
                    onChange={e => setPickupTime(e.target.value)}
                    className="w-full p-3 bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl text-sm font-bold text-[#222]"
                  >
                    <option>As soon as possible (10-15 mins)</option>
                    <option>In 30 minutes</option>
                    <option>In 1 hour</option>
                  </select>
                </div>
              )}
              {orderType === 'delivery' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#999] uppercase tracking-wider">Delivery Address</label>
                  <input 
                    type="text" 
                    value={deliveryAddress} 
                    onChange={e => setDeliveryAddress(e.target.value)}
                    className="w-full p-3 bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl text-sm font-bold text-[#222]" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. Cart Items */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <h2 className="text-xs font-black text-[#222] uppercase tracking-wider">2. Review Cart Items</h2>
            <div className="divide-y divide-[#F0F0F0]">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0">
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover border border-[#E6E6E6]" />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#222] text-sm">{item.title}</h3>
                    <p className="text-xs text-[#999]">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F8F8F6] rounded-full px-2 py-1 border border-[#E6E6E6]">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-[#666]">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-[#666]">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-black text-[#222] text-sm min-w-[60px] text-right">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Promo Code & Reward Selection */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <h2 className="text-xs font-black text-[#222] uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#C89B3C]" /> 3. Apply Reward / Promo Code
            </h2>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter promo code (e.g. GOLD15, FREE5)"
                value={promoInput}
                onChange={e => setPromoInput(e.target.value)}
                className="flex-1 p-3 bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl text-sm font-bold uppercase tracking-wider"
              />
              <button 
                onClick={handleApplyPromo}
                className="bg-[#222] hover:bg-black text-white px-5 py-3 rounded-xl text-xs font-bold transition-all"
              >
                Apply
              </button>
            </div>

            {appliedPromo && (
              <div className="bg-[#F0FFF8] border border-[#BCE3D1] rounded-2xl p-3 flex items-center justify-between text-xs text-[#0D7A53] font-bold">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  <span>Promo Code <strong>{appliedPromo.code}</strong> Applied ({(appliedPromo.discount * 100)}% OFF)</span>
                </div>
                <button onClick={() => setAppliedPromo(null)} className="text-[#D32F2F] text-xs hover:underline">Remove</button>
              </div>
            )}
          </div>

          {/* 4. Payment Method Selection */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <h2 className="text-xs font-black text-[#222] uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C89B3C]" /> 4. Payment Method Selection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'upi', label: 'UPI / GPay / PhonePe', desc: 'Instant QR / Mobile Pay', icon: QrCode },
                { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex', icon: CreditCard },
                { id: 'wallet', label: 'Revia Wallet (₹45.50)', desc: 'Pay instantly with wallet balance', icon: Wallet },
                { id: 'counter', label: 'Pay at Counter / Cash', desc: 'Pay directly when ready', icon: Utensils }
              ].map(method => {
                const isSelected = paymentMethod === method.id;
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected 
                        ? 'bg-[#FFF8ED] border-[#C89B3C] ring-1 ring-[#C89B3C]' 
                        : 'bg-white border-[#E6E6E6] hover:border-[#C89B3C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C89B3C]' : 'text-[#666]'}`} />
                      <div>
                        <p className="text-sm font-bold text-[#222]">{method.label}</p>
                        <p className="text-[10px] text-[#999]">{method.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 shadow-xl sticky top-24 space-y-6">
            <h3 className="text-xl font-black text-[#222]">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#666]">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#222]">${subtotal.toFixed(2)}</span>
              </div>

              {addonsTotal > 0 && (
                <div className="flex justify-between text-[#666]">
                  <span>Custom Extras</span>
                  <span className="font-bold text-[#222]">${addonsTotal.toFixed(2)}</span>
                </div>
              )}

              {appliedPromo && (
                <div className="flex justify-between text-[#0D7A53] font-bold">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#666]">
                <span>Taxes & Fees (8%)</span>
                <span className="font-bold text-[#222]">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xl font-black text-[#222] pt-4 border-t border-[#E6E6E6]">
                <span>Grand Total</span>
                <span className="text-[#C89B3C]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSuccess(true)}
              className="w-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] hover:from-[#B88A2B] hover:to-[#D0A74D] text-[#222] py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#C89B3C]/20"
            >
              Place Order • ${grandTotal.toFixed(2)} <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-[10px] text-[#999] text-center font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-[#0D7A53]" /> 256-bit Encrypted Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
