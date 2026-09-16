import React, { useState } from 'react';
import { Star, Check, Crown, CreditCard, QrCode, Award, Zap, ChevronRight, X, Sparkles, Store, ChevronDown, Info, ArrowRight, Gift } from 'lucide-react';
import { MOCK_MEMBERSHIP, MOCK_BUSINESS, MOCK_ACTIVE_CAMPAIGNS, MOCK_CAMPAIGN_PROGRESS } from '../../data/mockData';

const TIER_BENEFITS = [
  {
    tier: 'Bronze Tier',
    minSpend: '₹0',
    multiplier: '1x Points',
    benefits: ['Standard earning rate', 'Digital Wallet Pass'],
    color: 'bg-[#F8F8F6] border-[#E6E6E6] text-[#222]',
    badgeColor: 'bg-[#E6E6E6] text-[#666]'
  },
  {
    tier: 'Silver Member',
    minSpend: '₹100',
    multiplier: '1.2x Points',
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
    badgeColor: 'bg-[#C89B3C] text-white'
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

export const MembershipScreen = ({ setTab }: { setTab?: (tab: string) => void }) => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const membership = MOCK_MEMBERSHIP;
  const business = MOCK_BUSINESS;
  const nextTierAmount = 1000;
  const progressPercent = Math.min((membership.totalBilledAmount / nextTierAmount) * 100, 100);
  const pointsBalance = 2450;

  const currentTierData = TIER_BENEFITS.find(t => t.tier.includes(membership.tier)) || TIER_BENEFITS.find(t => t.tier.includes('Gold')) || TIER_BENEFITS[0];
  const multiplier = currentTierData.multiplier;

  const stampCampaigns = MOCK_ACTIVE_CAMPAIGNS.filter(c => (c as any).type === 'Stamp');

  return (
    <div className="max-w-[1280px] mx-auto pb-12 space-y-6 animate-in fade-in duration-500">
      
      {/* Business Context Header (Hidden for now) */}

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
                {currentTierData.tier.split(' ')[0]} Tier
              </h2>
            </div>
            
            <div>
              <p className="text-white/70 text-sm flex items-center gap-2">
                Valid through Dec 31, 2026 • {multiplier} Active
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold text-white">Points Balance: {pointsBalance.toLocaleString()} pts</span>
                <div className="group relative flex items-center cursor-help">
                  <Info className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                  <div className="absolute left-0 bottom-full mb-2 w-64 bg-[#222] text-xs text-white p-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl border border-white/10 text-left pointer-events-none">
                    Earn points on every purchase. Your {membership.tier} tier multiplies points earned by {multiplier.replace(' Points', '')}.
                  </div>
                </div>
              </div>
            </div>
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
            
            <div className="flex items-center justify-between pt-1">
              <p className="text-white/60 text-[11px]">Spend ${(nextTierAmount - membership.totalBilledAmount).toFixed(2)} more for next tier!</p>
              <button onClick={() => setTab?.('history')} className="text-[10px] font-bold text-[#C89B3C] hover:text-[#E0B85E] flex items-center gap-1 transition-colors group cursor-pointer shrink-0">
                View Spending History <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stamp Cards Section */}
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar items-stretch">
        {stampCampaigns.length === 0 && (
          <div className="w-full text-center py-12 text-[#666] bg-white rounded-3xl border border-[#E6E6E6]">
            No active stamp card campaigns at this location.
          </div>
        )}
        
        {stampCampaigns.map((campaign, campIdx) => {
          // Find progress or mock it
          const progress = MOCK_CAMPAIGN_PROGRESS.find(p => p.campaignId === campaign.id);
          const stampsCollected = progress ? progress.currentProgress : (campIdx === 0 ? 10 : 7);
          const required = (campaign as any).requiredStamps || 10;
          const isComplete = stampsCollected >= required;

          return (
            <div key={campaign.id} className={`shrink-0 w-[90vw] sm:w-[400px] md:w-[480px] bg-white rounded-3xl border ${isComplete ? 'border-[#C89B3C] ring-4 ring-[#C89B3C]/10' : 'border-[#E6E6E6]'} p-6 md:p-8 shadow-sm snap-center transition-all flex flex-col`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className={`w-5 h-5 ${isComplete ? 'text-[#C89B3C]' : 'text-[#C89B3C]'}`} />
                    <h2 className="text-xl font-black text-[#222]">{campaign.name}</h2>
                  </div>
                  <p className="text-xs text-[#666] mt-1">Collect {required} stamps to claim a <strong>{campaign.rewardValue}</strong>.</p>
                  <p className="text-[10px] text-[#999] font-bold mt-1">Campaign valid until {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Ongoing — no end date'}</p>
                </div>
                {isComplete ? (
                  <div className="bg-[#E8F5E9] border border-[#A5D6A7] px-3 py-1.5 rounded-xl text-[11px] font-black text-[#2E7D32] self-start sm:self-auto shadow-sm flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Reward Ready!
                  </div>
                ) : (
                  <div className="bg-[#FFF8ED] border border-[#F5DEB3] px-3 py-1.5 rounded-xl text-[11px] font-black text-[#C89B3C] self-start sm:self-auto shrink-0">
                    Stamps: {stampsCollected} / {required}
                  </div>
                )}
              </div>

              {/* Stamps Grid */}
              <div className={`flex flex-wrap gap-2.5 sm:gap-3 py-6 ${isComplete ? 'opacity-80' : ''}`}>
                {Array.from({ length: required }).map((_, idx) => {
                  const isStamped = idx < stampsCollected;
                  const isRewardItem = idx === required - 1;

                  return (
                    <div 
                      key={idx}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                        isStamped 
                          ? 'bg-[#C89B3C] text-white border-[#C89B3C] shadow-md scale-105' 
                          : isRewardItem 
                            ? 'bg-[#FFF8ED] border-2 border-dashed border-[#C89B3C] text-[#C89B3C]' 
                            : 'bg-[#F8F8F6] border-[#E6E6E6] text-[#CCC]'
                      }`}
                    >
                      {isStamped ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : isRewardItem ? (
                        <Sparkles className="w-5 h-5 animate-bounce" />
                      ) : (
                        <span className="text-xs sm:text-sm font-black">{idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Bottom Actions */}
              <div className="mt-auto space-y-4 pt-2">
                {isComplete ? (
                  <button onClick={() => setTab?.('rewards')} className="w-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:from-[#C89B3C] hover:to-[#8E681F] text-white py-3 rounded-2xl font-black shadow-lg shadow-[#D4A753]/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <Gift className="w-4 h-4" /> Claim Reward
                  </button>
                ) : (
                  <p className="text-xs text-[#999] text-center font-medium px-2">Show your pass QR code at checkout to automatically earn stamps on qualifying orders.</p>
                )}
                
                <div className="flex justify-center">
                  <button onClick={() => setTab?.('history')} className="text-[11px] font-bold text-[#666] hover:text-[#222] flex items-center gap-1 transition-colors group cursor-pointer">
                    View Stamp History <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier Benefits Comparison */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#222]">Tier Benefits Overview</h2>
        
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar items-stretch">
          {TIER_BENEFITS.map((tier, idx) => {
            const isCurrent = tier.tier === currentTierData.tier;
            return (
            <div key={idx} className={`shrink-0 w-[280px] md:w-[320px] rounded-3xl border p-6 flex flex-col justify-between space-y-6 transition-all snap-center self-stretch ${tier.color} ${isCurrent ? 'ring-2 ring-offset-2 ring-[#C89B3C]' : ''}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${tier.badgeColor}`}>
                    {tier.tier}
                  </span>
                  {isCurrent && (
                    <span className="text-xs font-black text-[#C89B3C] flex items-center gap-1 bg-[#FFF8ED] px-2 py-1 rounded-full border border-[#F5DEB3]">
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
          )})}
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
