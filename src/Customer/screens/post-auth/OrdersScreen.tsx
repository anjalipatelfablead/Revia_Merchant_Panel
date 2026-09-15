import React, { useState } from 'react';
import { Clock, CheckCircle2, CookingPot, ShoppingBag, ArrowRight, RefreshCw, ChevronRight, Store, Star, DollarSign, CreditCard, Heart, Send, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { MOCK_CATALOG_ITEMS } from '../../../data/mockData';

export interface OrderItem {
  id: string;
  orderId: string;
  date: string;
  time: string;
  status: 'placed' | 'preparing' | 'arrived' | 'completed' | 'cancelled';
  orderType: 'dine-in' | 'pickup' | 'delivery';
  spot: string;
  serverName: string;
  items: { title: string; quantity: number; price: number; image: string }[];
  subtotal: number;
  tax: number;
  tipAmount: number;
  total: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod: string;
  estimatedMinutes: number;
  rating?: number;
  feedback?: string;
}

const INITIAL_ACTIVE_ORDERS: OrderItem[] = [
  {
    id: 'REV-4921',
    orderId: '#REV-4921',
    date: 'Today',
    time: '10:42 AM',
    status: 'arrived',
    orderType: 'dine-in',
    spot: 'Table 12',
    serverName: 'Alex M. (Table Host)',
    items: [
      { title: MOCK_CATALOG_ITEMS[0].title, quantity: 1, price: MOCK_CATALOG_ITEMS[0].price, image: MOCK_CATALOG_ITEMS[0].image },
      { title: MOCK_CATALOG_ITEMS[3].title, quantity: 1, price: MOCK_CATALOG_ITEMS[3].price, image: MOCK_CATALOG_ITEMS[3].image }
    ],
    subtotal: 30.50,
    tax: 2.44,
    tipAmount: 0,
    total: 32.94,
    paymentStatus: 'pending',
    paymentMethod: 'UPI (GPay)',
    estimatedMinutes: 0
  }
];

const PAST_ORDERS: OrderItem[] = [
  {
    id: 'REV-3810',
    orderId: '#REV-3810',
    date: 'Yesterday, 4:15 PM',
    time: '4:15 PM',
    status: 'completed',
    orderType: 'pickup',
    spot: 'Counter Pickup',
    serverName: 'Sarah K.',
    items: [
      { title: 'Panama Boquete Geisha Tasting Flight', quantity: 1, price: 24.00, image: MOCK_CATALOG_ITEMS[0].image }
    ],
    subtotal: 24.00,
    tax: 1.92,
    tipAmount: 3.00,
    total: 28.92,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card (**** 4242)',
    estimatedMinutes: 0,
    rating: 5,
    feedback: 'Amazing geisha coffee flight! Loved the jasmine notes.'
  }
];

export const OrdersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const [activeOrders, setActiveOrders] = useState<OrderItem[]>(INITIAL_ACTIVE_ORDERS);
  
  // Interactive Modal / Action States
  const [selectedTip, setSelectedTip] = useState<number>(3.00);
  const [customTip, setCustomTip] = useState<string>('');
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const advanceOrderStatus = (orderId: string) => {
    setActiveOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;
      const nextStatus: Record<string, OrderItem['status']> = {
        'placed': 'preparing',
        'preparing': 'arrived',
        'arrived': 'completed',
        'completed': 'completed'
      };
      const nextMinutes: Record<string, number> = {
        'placed': 12,
        'preparing': 5,
        'arrived': 0,
        'completed': 0
      };
      return {
        ...order,
        status: nextStatus[order.status],
        estimatedMinutes: nextMinutes[order.status]
      };
    }));
  };

  const getStatusStepIndex = (status: OrderItem['status']) => {
    switch (status) {
      case 'placed': return 0;
      case 'preparing': return 1;
      case 'arrived': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const handlePayBill = (orderId: string) => {
    const tip = customTip ? parseFloat(customTip) || 0 : selectedTip;
    setActiveOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        tipAmount: tip,
        total: o.subtotal + o.tax + tip,
        paymentStatus: 'paid',
        status: 'completed'
      };
    }));
    setShowPayModal(false);
  };

  const handleSendFeedback = (orderId: string) => {
    setActiveOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        rating,
        feedback: feedbackText
      };
    }));
    setFeedbackSubmitted(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto pb-24 space-y-8 animate-in fade-in duration-500">
      
      {/* Top Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E6E6] pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#222]">My Orders & Live Table</h1>
          <p className="text-sm text-[#666] mt-1">Track preparation status, pay bill, tip staff, and leave feedback.</p>
        </div>

        <div className="flex bg-[#F8F8F6] p-1 rounded-2xl border border-[#E6E6E6] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'live' 
                ? 'bg-white text-[#222] shadow-sm font-black' 
                : 'text-[#666] hover:text-[#222]'
            }`}
          >
            <CookingPot className="w-4 h-4 text-[#C89B3C]" />
            Live Orders ({activeOrders.filter(o => o.status !== 'completed').length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'history' 
                ? 'bg-white text-[#222] shadow-sm font-black' 
                : 'text-[#666] hover:text-[#222]'
            }`}
          >
            <Clock className="w-4 h-4" />
            Past Orders ({PAST_ORDERS.length + activeOrders.filter(o => o.status === 'completed').length})
          </button>
        </div>
      </div>

      {activeTab === 'live' ? (
        <div className="space-y-8">
          {activeOrders.filter(o => o.status !== 'completed').length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E6E6E6] p-12 text-center max-w-md mx-auto my-8 space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-[#FFF8ED] rounded-full flex items-center justify-center mx-auto text-[#C89B3C]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#222]">No Active Orders Right Now</h3>
              <p className="text-sm text-[#666]">All your orders have been completed and bills settled!</p>
            </div>
          ) : (
            activeOrders.filter(o => o.status !== 'completed').map(order => {
              const currentStep = getStatusStepIndex(order.status);
              const isOrderArrived = order.status === 'arrived';
              
              return (
                <div key={order.id} className="bg-white rounded-3xl border border-[#E6E6E6] shadow-xl overflow-hidden p-6 md:p-8 space-y-8">
                  
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0F0F0]">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-[#222]">{order.orderId}</span>
                        <span className="bg-[#FFF8ED] text-[#C89B3C] border border-[#F5DEB3] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                          {order.orderType} • {order.spot}
                        </span>
                      </div>
                      <p className="text-xs text-[#666] font-bold mt-1 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#0D7A53]" /> Served by <strong>{order.serverName}</strong>
                      </p>
                    </div>

                    {/* Interactive Demo Status Switcher */}
                    <div className="flex items-center gap-3 bg-[#F8F8F6] p-2 rounded-2xl border border-[#E6E6E6]">
                      <span className="text-[10px] font-black text-[#999] uppercase tracking-wider px-2">Demo Simulator:</span>
                      <button
                        onClick={() => advanceOrderStatus(order.id)}
                        className="bg-[#222] text-white hover:bg-black text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Advance Status ({order.status})
                      </button>
                    </div>
                  </div>

                  {/* 4-Step Progress Stepper */}
                  <div className="py-2">
                    <div className="flex items-center justify-between relative">
                      
                      {/* Line connecting steps */}
                      <div className="absolute top-5 left-8 right-8 h-1 bg-[#E6E6E6] -z-0">
                        <div 
                          className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] transition-all duration-500"
                          style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                      </div>

                      {[
                        { title: 'Placed', desc: 'Order sent', icon: ShoppingBag },
                        { title: 'Preparing', desc: 'Kitchen active', icon: CookingPot },
                        { title: 'Order Arrived', desc: 'Served at table', icon: Store },
                        { title: 'Completed', desc: 'Bill paid & done', icon: CheckCircle2 }
                      ].map((step, idx) => {
                        const isDone = currentStep > idx;
                        const isCurrent = currentStep === idx;
                        const Icon = step.icon;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center relative z-10 w-1/4">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                isDone 
                                  ? 'bg-[#C89B3C] text-white ring-4 ring-[#FFF8ED]' 
                                  : isCurrent 
                                    ? 'bg-[#222] text-white ring-4 ring-[#E6E6E6] scale-110 animate-pulse' 
                                    : 'bg-white border-2 border-[#E6E6E6] text-[#CCC]'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <p className={`text-xs font-black mt-3 ${isCurrent ? 'text-[#222]' : 'text-[#666]'}`}>{step.title}</p>
                            <p className="text-[10px] text-[#999] hidden sm:block mt-0.5">{step.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Arrived Banner Alert */}
                  {isOrderArrived && (
                    <div className="bg-[#EBF7F0] border border-[#BCE3D1] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in zoom-in">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0D7A53] text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#0D7A53]">Your Order Has Arrived at {order.spot}! 🎉</p>
                          <p className="text-xs text-[#666] mt-0.5">Hope you enjoy your meal! You can now pay your bill, tip staff, or rate your experience.</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowPayModal(true)}
                        className="bg-[#0D7A53] hover:bg-[#0A6041] text-white px-6 py-3 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 self-start sm:self-auto shrink-0"
                      >
                        <CreditCard className="w-4 h-4" /> Pay Bill & Tip Staff
                      </button>
                    </div>
                  )}

                  {/* Items Ordered List */}
                  <div>
                    <h3 className="text-xs font-black text-[#999] uppercase tracking-wider mb-4">Items Ordered</h3>
                    <div className="space-y-3 divide-y divide-[#F0F0F0]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between pt-3 first:pt-0">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover border border-[#E6E6E6]" />
                            <div>
                              <p className="font-bold text-[#222] text-sm">{item.title}</p>
                              <p className="text-xs text-[#999]">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <p className="font-black text-[#222] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar: Pay Bill, Tip, & Give Feedback */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E6E6E6]">
                    
                    {/* Pay Bill & Tip Card */}
                    <div className="bg-[#F8F8F6] rounded-2xl p-5 border border-[#E6E6E6] space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-black text-[#999] uppercase tracking-wider">Bill Status</p>
                          <p className={`text-sm font-black ${order.paymentStatus === 'paid' ? 'text-[#0D7A53]' : 'text-[#C89B3C]'}`}>
                            {order.paymentStatus === 'paid' ? '✓ Bill Settled' : 'Payment Pending'}
                          </p>
                        </div>
                        <span className="text-2xl font-black text-[#222]">${(order.subtotal + order.tax + (order.tipAmount || selectedTip)).toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => setShowPayModal(true)}
                        className="w-full bg-[#222] hover:bg-black text-white py-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <CreditCard className="w-4 h-4 text-[#C89B3C]" /> Pay Bill & Tip Staff
                      </button>
                    </div>

                    {/* Feedback & Star Rating */}
                    <div className="bg-[#F8F8F6] rounded-2xl p-5 border border-[#E6E6E6] space-y-3">
                      <p className="text-[10px] font-black text-[#999] uppercase tracking-wider">Rate Experience & Feedback</p>
                      
                      {!feedbackSubmitted ? (
                        <div className="space-y-3">
                          {/* Star Rating Picker */}
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="text-2xl hover:scale-125 transition-transform"
                              >
                                <Star className={`w-6 h-6 ${star <= rating ? 'fill-[#C89B3C] text-[#C89B3C]' : 'text-[#CCC]'}`} />
                              </button>
                            ))}
                            <span className="text-xs font-bold text-[#666] ml-2">{rating}/5 Stars</span>
                          </div>

                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="Write feedback for staff..." 
                              value={feedbackText}
                              onChange={e => setFeedbackText(e.target.value)}
                              className="flex-1 bg-white border border-[#E6E6E6] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C89B3C]"
                            />
                            <button
                              onClick={() => handleSendFeedback(order.id)}
                              className="bg-[#C89B3C] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#B88A2B] transition-colors flex items-center gap-1 shrink-0"
                            >
                              <Send className="w-3.5 h-3.5" /> Submit
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#F0FFF8] border border-[#BCE3D1] text-[#0D7A53] p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Thank you for your feedback! Your review helps us improve.</span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })
          )}
        </div>
      ) : (
        /* History Tab */
        <div className="space-y-4">
          {[...PAST_ORDERS, ...activeOrders.filter(o => o.status === 'completed')].map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-[#E6E6E6] p-6 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-black text-lg text-[#222]">{order.orderId}</span>
                  <span className="bg-[#EBF7F0] text-[#0D7A53] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Completed</span>
                  <span className="text-xs text-[#999]">• {order.date}</span>
                </div>
                <p className="text-sm text-[#666]">
                  {order.items.map(i => `${i.quantity}x ${i.title}`).join(', ')}
                </p>
                {order.feedback && (
                  <p className="text-xs text-[#C89B3C] font-semibold italic">"{order.feedback}" ({order.rating}★)</p>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[#F0F0F0]">
                <div className="text-right">
                  <p className="text-xs text-[#999] uppercase tracking-wider font-bold">Total Paid</p>
                  <p className="text-lg font-black text-[#222]">${order.total.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => alert(`Reordering items from ${order.orderId}!`)}
                  className="bg-[#F8F8F6] hover:bg-[#222] hover:text-white border border-[#E6E6E6] text-[#222] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  Reorder <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Pay Bill & Tip Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 relative shadow-2xl border border-[#E6E6E6]">
            
            <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-4">
              <div>
                <h3 className="text-xl font-black text-[#222]">Pay Bill & Tip Staff</h3>
                <p className="text-xs text-[#666] mt-0.5">Table 12 • Server: Alex M.</p>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-[#999] hover:text-[#222]">✕</button>
            </div>

            {/* Bill Summary */}
            <div className="bg-[#F8F8F6] p-4 rounded-2xl space-y-2 text-xs font-bold">
              <div className="flex justify-between text-[#666]">
                <span>Food & Drink Subtotal</span>
                <span className="text-[#222]">${INITIAL_ACTIVE_ORDERS[0].subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#666]">
                <span>Tax (8%)</span>
                <span className="text-[#222]">${INITIAL_ACTIVE_ORDERS[0].tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#C89B3C]">
                <span>Staff Tip</span>
                <span>+${(customTip ? parseFloat(customTip) || 0 : selectedTip).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#222] pt-2 border-t border-[#E6E6E6]">
                <span>Total Amount</span>
                <span className="text-[#C89B3C]">${(INITIAL_ACTIVE_ORDERS[0].subtotal + INITIAL_ACTIVE_ORDERS[0].tax + (customTip ? parseFloat(customTip) || 0 : selectedTip)).toFixed(2)}</span>
              </div>
            </div>

            {/* Tip Staff Selector */}
            <div className="space-y-3">
              <label className="text-xs font-black text-[#222] uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#D32F2F]" /> Add a Tip for Alex M.
              </label>

              <div className="grid grid-cols-4 gap-2">
                {[2.00, 3.00, 5.00, 7.00].map(tip => (
                  <button
                    key={tip}
                    onClick={() => { setSelectedTip(tip); setCustomTip(''); }}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedTip === tip && !customTip 
                        ? 'bg-[#C89B3C] text-white border-[#C89B3C] shadow-sm font-black' 
                        : 'bg-[#F8F8F6] border-[#E6E6E6] text-[#222] hover:border-[#C89B3C]'
                    }`}
                  >
                    ${tip.toFixed(2)}
                  </button>
                ))}
              </div>

              <input 
                type="number" 
                placeholder="Or enter custom tip amount ($)" 
                value={customTip}
                onChange={e => setCustomTip(e.target.value)}
                className="w-full bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl px-4 py-2.5 text-xs font-bold text-[#222]"
              />
            </div>

            {/* Confirm Payment CTA */}
            <button
              onClick={() => handlePayBill(INITIAL_ACTIVE_ORDERS[0].id)}
              className="w-full bg-[#222] hover:bg-black text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Confirm & Settle Bill (${(INITIAL_ACTIVE_ORDERS[0].subtotal + INITIAL_ACTIVE_ORDERS[0].tax + (customTip ? parseFloat(customTip) || 0 : selectedTip)).toFixed(2)})
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
