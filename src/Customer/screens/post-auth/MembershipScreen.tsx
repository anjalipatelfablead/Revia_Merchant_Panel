import React, { useState } from 'react';
import { Star, Check, Crown, CreditCard, QrCode, Award, Zap, ChevronRight, X, Sparkles } from 'lucide-react';
import { MOCK_MEMBERSHIP } from '../../data/mockData';

const TIER_BENEFITS = [
  {
    tier: 'Silver Member',
    minSpend: '₹0',
    multiplier: '1x Points',
    benefits: ['Free welcome drink on registration', 'Standard stamp card rewards', 'Digital Wallet Pass'],
    color: 'bg-white border-[#E6E6E6] text-[#222]',
    badgeColor: 'bg-gray-100 text-gray-700'
  },
  {
    tier: 'Gold Tier',
    minSpend: '₹250',
    multiplier: '1.5x Points',
    benefits: ['1.5x point multiplier on all orders', 'Free pastry with any large drink', 'Birthday special treat', 'Priority table seating'],
    color: 'bg-gradient-to-br from-[#FFF8ED] to-[#FFF0D6] border-[#C89B3C] text-[#222] ring-2 ring-[#C89B3C]/30',
    badgeColor: 'bg-[#C89B3C] text-white',
    current: true
  },
  {
    tier: 'VIP Platinum',
    minSpend: '₹1,000',
    multiplier: '2x Points',
    benefits: ['2x point multiplier on all orders', 'Unlimited filter coffee refilling', 'Exclusive tasting event invitations', 'Dedicated concierge support'],
    color: 'bg-[#1A1A1A] text-white border-transparent shadow-xl',
    badgeColor: 'bg-gradient-to-r from-[#E0B85E] to-[#C89B3C] text-white'
  }
];

export const MembershipScreen = () => {
  const [showPassModal, setShowPassModal] = useState(false);
  const membership = MOCK_MEMBERSHIP;
  const nextTierAmount = 1000;
  const progressPercent = Math.min((membership.totalBilledAmount / nextTierAmount) * 100, 100);

  // 10 Stamp Card progress state (e.g. 7 collected)
  const stampsCollected = 7;

  return (
    <div className="max-w-[1280px] mx-auto pb-24 space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E6E6] pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#222]">Membership & Loyalty</h1>
          <p className="text-sm text-[#666] mt-1">Track your tier progress, stamp card rewards, and digital pass.</p>
        </div>

        <button 
          onClick={() => setShowPassModal(true)}
          className="bg-[#222] hover:bg-black text-white px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 shadow-lg transition-all self-start md:self-auto"
        >
          <QrCode className="w-4 h-4 text-[#C89B3C]" />
          Show Digital Membership Pass
        </button>
      </div>

      {/* Current Tier Status Hero Card */}
      <div className="bg-[#1A1A1A] rounded-[32px] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#C89B3C]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                Active Status
              </span>
              <span className="text-xs text-white/60 font-medium">• Member ID: #MEM-88219</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Crown className="w-9 h-9 text-[#C89B3C]" />
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">
                {membership.tier} Tier
              </h2>
            </div>
            <p className="text-white/70 text-sm">Valid through Dec 31, 2026 • 1.5x Points Multiplier Active</p>
          </div>

          <div className="w-full md:w-[420px] bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-md space-y-3">
            <div className="flex justify-between text-xs font-black">
              <span className="text-white/80">Tier Progress</span>
              <span className="text-[#C89B3C]">${membership.totalBilledAmount} / ${nextTierAmount} to VIP Platinum</span>
            </div>
            
            <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] rounded-full transition-all duration-700" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <p className="text-white/60 text-[11px] text-right">Spend ${(nextTierAmount - membership.totalBilledAmount).toFixed(2)} more to unlock VIP Platinum benefits!</p>
          </div>
        </div>
      </div>

      {/* Stamp Card Section (Coffee Loyalty Card) */}
      <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C89B3C]" />
              <h2 className="text-xl font-black text-[#222]">Signature Coffee Stamp Card</h2>
            </div>
            <p className="text-xs text-[#666] mt-1">Collect 10 stamps on artisanal beverages to claim a <strong>Free Signature Brew</strong>.</p>
          </div>
          <div className="bg-[#FFF8ED] border border-[#F5DEB3] px-4 py-2 rounded-2xl text-xs font-black text-[#C89B3C] self-start sm:self-auto">
            Stamps: {stampsCollected} / 10
          </div>
        </div>

        {/* 10 Stamps Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 md:gap-4 py-2">
          {Array.from({ length: 10 }).map((_, idx) => {
            const isStamped = idx < stampsCollected;
            const isRewardItem = idx === 9;

            return (
              <div 
                key={idx}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all border ${
                  isStamped 
                    ? 'bg-[#C89B3C] text-white border-[#C89B3C] shadow-md scale-105' 
                    : isRewardItem 
                      ? 'bg-[#FFF8ED] border-2 border-dashed border-[#C89B3C] text-[#C89B3C]' 
                      : 'bg-[#F8F8F6] border-[#E6E6E6] text-[#CCC]'
                }`}
              >
                {isStamped ? (
                  <Check className="w-6 h-6 stroke-[3]" />
                ) : isRewardItem ? (
                  <Sparkles className="w-6 h-6 animate-bounce" />
                ) : (
                  <span className="text-xs font-black">{idx + 1}</span>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-[#999] text-center font-medium">Show your pass QR code at checkout to automatically earn stamps on qualify orders.</p>
      </div>

      {/* Tier Benefits Comparison */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#222]">Tier Benefits Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIER_BENEFITS.map((tier, idx) => (
            <div key={idx} className={`rounded-3xl border p-6 flex flex-col justify-between space-y-6 transition-all ${tier.color}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${tier.badgeColor}`}>
                    {tier.tier}
                  </span>
                  {tier.current && (
                    <span className="text-xs font-black text-[#C89B3C] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Current
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-black">{tier.multiplier}</h3>
                  <p className="text-xs opacity-75 mt-0.5">Min Spend: {tier.minSpend}</p>
                </div>

                <ul className="space-y-3 pt-2">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-medium">
                      <Check className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Pass Modal */}
      {showPassModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 max-w-sm w-full space-y-6 relative border border-white/20 shadow-2xl">
            <button onClick={() => setShowPassModal(false)} className="absolute top-4 right-4 text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center space-y-2">
              <Crown className="w-10 h-10 text-[#C89B3C] mx-auto" />
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">
                Revia Member Pass
              </h3>
              <p className="text-xs text-white/60">Rohit Sharma • Gold Tier</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center text-[#222]">
              <QrCode className="w-48 h-48 mx-auto" />
              <p className="text-xs font-mono font-bold mt-4 tracking-widest">#MEM-88219-GOLD</p>
            </div>

            <p className="text-[11px] text-white/60 text-center">Scan at POS terminal to redeem rewards & earn loyalty stamps.</p>
          </div>
        </div>
      )}

    </div>
  );
};
