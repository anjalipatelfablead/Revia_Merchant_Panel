import React, { useState } from 'react';
import { Star, Check, Crown, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_MEMBERSHIP } from '../../data/mockData';

const PLANS = [
  {
    id: 'gold',
    name: 'Gold Member',
    price: '$9.99',
    period: '/month',
    business: 'Grand Café',
    description: 'Perfect for regular visitors who want consistent perks.',
    features: [
      'Double stamps on every visit',
      'Free pastry with any large coffee',
      'Priority queue jumping',
      'Exclusive tasting events access'
    ],
    popular: false,
    theme: 'bg-white text-[#222] border-[#E6E6E6]',
    buttonTheme: 'bg-[#F8F8F6] text-[#222] hover:bg-[#E6E6E6]',
    icon: Star,
    iconColor: 'text-[#C89B3C]'
  },
  {
    id: 'vip',
    name: 'VIP Platinum',
    price: '$24.99',
    period: '/month',
    business: 'Grand Café',
    description: 'The ultimate coffee lover\'s unlimited experience.',
    features: [
      'Unlimited filter coffee all month',
      'Triple stamps on weekends',
      'Free birthday cake',
      'VIP table reservations',
      '20% off all whole bean bags'
    ],
    popular: true,
    theme: 'bg-[#1A1A1A] text-white border-transparent shadow-2xl',
    buttonTheme: 'bg-[#C89B3C] text-white hover:bg-[#B89454]',
    icon: Crown,
    iconColor: 'text-white'
  },
  {
    id: 'roasters',
    name: 'Coffee Club',
    price: '$4.99',
    period: '/month',
    business: 'Artisan Bakers',
    description: 'A simple plan for daily commuters.',
    features: [
      '10% off all orders',
      'Free flavor syrups',
      'Monthly free cookie'
    ],
    popular: false,
    theme: 'bg-white text-[#222] border-[#E6E6E6]',
    buttonTheme: 'bg-[#F8F8F6] text-[#222] hover:bg-[#E6E6E6]',
    icon: CreditCard,
    iconColor: 'text-[#0D7A53]'
  }
];

export const MembershipScreen = () => {
  const [activePlanId, setActivePlanId] = useState<string | null>('gold');
  
  const membership = MOCK_MEMBERSHIP;
  const nextTierAmount = 1000000; // Mock target for VVIP
  const progressPercent = Math.min((membership.totalBilledAmount / nextTierAmount) * 100, 100);

  return (
    <div className="max-w-[1280px] mx-auto pb-24">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black text-[#222] mb-3">Your Membership</h1>
        <p className="text-[#666] md:text-lg max-w-2xl">Track your loyalty tier progress and explore premium subscription plans.</p>
      </div>

      {/* Current Tier Card */}
      <div className="bg-[#1A1A1A] rounded-[24px] p-6 md:p-10 text-white mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C89B3C]/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Current Status</p>
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-[#C89B3C]" />
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">{membership.tier} Tier</h2>
            </div>
            <p className="text-white/80 mt-3 text-sm">Valid until {new Date(membership.expiryDate).toLocaleDateString()}</p>
          </div>
          
          <div className="w-full md:w-[400px] bg-white/5 rounded-xl p-5 border border-white/10">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-white">₹{(membership.totalBilledAmount).toLocaleString()}</span>
              <span className="text-white/60">₹{(nextTierAmount).toLocaleString()} for VVIP</span>
            </div>
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] rounded-full" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-white/50 text-xs mt-3 text-right">Keep spending to unlock the next tier benefits.</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-[#222] mb-6 text-center md:text-left">Explore Premium Plans</h2>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {PLANS.map((plan) => {
          const isSubscribed = activePlanId === plan.id;
          
          return (
          <div 
            key={plan.id}
            className={`relative rounded-[24px] border p-8 flex flex-col transition-transform hover:-translate-y-2 ${plan.theme} ${isSubscribed ? 'ring-4 ring-[#C89B3C]/50' : ''}`}
          >
            {isSubscribed && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                Current Plan
              </div>
            )}
            {!isSubscribed && plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#E0B85E] to-[#C89B3C] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                Most Popular
              </div>
            )}

            <div className="mb-8 mt-2">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/10' : 'bg-[#F8F8F6]'}`}>
                  <plan.icon className={`w-5 h-5 ${plan.iconColor}`} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${plan.popular ? 'text-white/60' : 'text-[#999]'}`}>{plan.business}</p>
                  <h3 className="text-xl font-black">{plan.name}</h3>
                </div>
              </div>
              <p className={`text-sm mt-3 ${plan.popular ? 'text-white/80' : 'text-[#666]'}`}>{plan.description}</p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className={`text-sm font-bold ${plan.popular ? 'text-white/60' : 'text-[#999]'}`}>{plan.period}</span>
            </div>

            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-[#C89B3C]/20 text-[#C89B3C]' : 'bg-[#E6E6E6] text-[#222]'}`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-semibold ${plan.popular ? 'text-white/90' : 'text-[#444]'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {isSubscribed ? (
              <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-black/5 text-[#222] cursor-default border border-[#E6E6E6]">
                <CheckCircle2 className="w-4 h-4 text-[#C89B3C]" />
                Active Subscription
              </button>
            ) : (
              <button 
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${plan.buttonTheme}`} 
                onClick={() => setActivePlanId(plan.id)}
              >
                Subscribe Now <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )})}
      </div>
    </div>
  );
};
