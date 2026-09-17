import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, Gift, Users, Store, ArrowRight, ChevronLeft, ChevronRight, BarChart2, TrendingUp, Calendar, MapPin, Sparkles, QrCode, Utensils, Award, Clock, ChevronDown, Compass, Heart, ShoppingBag } from 'lucide-react';
import { MainTab } from '../../types';
import { LoyaltyCard } from '../../components/shared/LoyaltyCard';

export const HomeScreen = ({ setTab, setSelectedOffer, setSelectedReward, selectedMerchant = 'All Merchants' }: {
  setTab: (t: MainTab) => void;
  setSelectedOffer: (id: string) => void;
  setSelectedReward: (id: string) => void;
  selectedMerchant?: string;
}) => {
  if (selectedMerchant === 'All Merchants') {
    return <AllMerchantsView setTab={setTab} />;
  }
  return <SpecificMerchantView setTab={setTab} setSelectedOffer={setSelectedOffer} setSelectedReward={setSelectedReward} merchantName={selectedMerchant} />;
};

const AllMerchantsView = ({ setTab }: { setTab: (t: MainTab) => void }) => {
  return (
    <div className="max-w-[1280px] mx-auto pb-24 space-y-8 animate-in fade-in duration-500">
      
      {/* Premium Hero Banner (adapted for global) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#222] to-[#111] rounded-[32px] p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row items-stretch justify-between gap-6 md:gap-8 border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C89B3C]/30 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#0D7A53]/20 via-transparent to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Gold Tier Member
              </span>
              <span className="text-xs text-white/60 font-medium">• Global Access</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Welcome to Revia, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">Rohit!</span> 👋
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md">
              Explore your rewards, active offers, and loyalty memberships across all our partner merchants.
            </p>
          </div>

          {/* Global Stats Tracker */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
             <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 min-w-[150px]">
                <p className="text-xs text-white/60 font-bold mb-1">Total Savings</p>
                <p className="text-2xl font-black text-[#C89B3C]">$124.50</p>
             </div>
             <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 min-w-[150px]">
                <p className="text-xs text-white/60 font-bold mb-1">Active Memberships</p>
                <p className="text-2xl font-black text-[#C89B3C]">4</p>
             </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => setTab('offers')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#C89B3C]" /> Explore All Offers
            </button>
            <button 
              onClick={() => setTab('membership')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-[#C89B3C]" /> My Memberships
            </button>
          </div>
        </div>

        {/* Right CTA Card */}
        <div className="relative z-10 shrink-0 flex flex-col justify-center">
          <div className="bg-gradient-to-b from-[#222] to-[#141414] p-5 md:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center max-w-xs mx-auto w-full space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#C89B3C] shadow-inner">
              <Store className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white leading-tight">Find Merchants</h3>
              <p className="text-xs text-white/60 mt-1">Discover new places to earn rewards near you.</p>
            </div>
            <button
              onClick={() => setTab('offers')} // or some merchants tab
              className="w-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] hover:from-[#B88A2B] hover:to-[#D0A74D] text-[#222] py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              Explore Merchants <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Saved', value: '$124', max: '.50', iconBg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]', border: 'border-[#F5DEB3]', Icon: TrendingUp },
          { label: 'Available Rewards', value: '6', max: '', iconBg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]', border: 'border-[#BCE3D1]', Icon: Gift },
          { label: 'Total Stamps', value: '34', max: '', iconBg: 'bg-[#F0F5FF]', color: 'text-[#3B5BDB]', border: 'border-[#C5D5FF]', Icon: Star },
          { label: 'Favorite Stores', value: '4', max: '', iconBg: 'bg-[#F5F0FF]', color: 'text-[#8A2BE2]', border: 'border-[#E2D2FF]', Icon: Store },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-3xl p-6 shadow-sm border border-[#E6E6E6] hover:border-[#C89B3C]/50 hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex gap-4 items-center">
              <div className={`w-12 h-12 rounded-2xl ${s.iconBg} ${s.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <s.Icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-[#999] font-black uppercase tracking-wider mb-0.5">{s.label}</p>
                <p className="text-2xl font-black text-[#222]">{s.value}<span className="text-xs text-[#999] font-bold">{s.max}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Split Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Active Memberships */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="text-xl font-black text-[#222]">My Memberships</h3>
              </div>
              <button onClick={() => setTab('membership')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" businessName="Grand Café" branchName="All Branches" compact />
              <LoyaltyCard stamps={3} total={5} name="Rohit Sharma" businessName="Urban Eats" branchName="Eastside" compact />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E6E6E6] space-y-6">
            <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="text-xl font-black text-[#222]">Recent Global Activity</h3>
              </div>
              <button onClick={() => setTab('history')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                Full History <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F8F6] border border-[#E6E6E6] hover:border-[#C89B3C] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FFF8] border border-[#BCE3D1] flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-[#0D7A53]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#222] text-sm">Reward Redeemed</p>
                    <p className="text-xs text-[#666]">10% OFF • Grand Café</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#999] font-medium">Yesterday, 7:42 PM</p>
                  <p className="text-[10px] font-black text-[#0D7A53] uppercase">Redeemed</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F8F6] border border-[#E6E6E6] hover:border-[#C89B3C] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8ED] border border-[#F5DEB3] flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#222] text-sm">Loyalty Stamp Added</p>
                    <p className="text-xs text-[#666]">3 / 5 Stamps • Urban Eats</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#999] font-medium">Tue, 2:34 PM</p>
                  <p className="text-[10px] font-black text-[#C89B3C] uppercase">+1 Stamp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Top Global Offer */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] animate-pulse" />
                <h3 className="text-xl font-black text-[#222]">Top Global Offer</h3>
              </div>
              <button onClick={() => setTab('offers')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E6E6E6] space-y-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#3B5BDB] text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="font-black text-xl">15%</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block bg-[#F0F5FF] text-[#3B5BDB] border border-[#C5D5FF] text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1">
                    Storewide
                  </span>
                  <p className="font-black text-[#222] text-base leading-tight">Weekend Special</p>
                  <p className="text-xs text-[#666] leading-relaxed mt-1">Get 15% off your entire order at Artisan Bakers.</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold text-[#999] uppercase tracking-wider border-t border-[#F0F0F0] pt-4">
                <div className="flex items-center gap-1"><Store className="w-3.5 h-3.5 text-[#C89B3C]" /> Artisan Bakers</div>
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C89B3C]" /> Ends Sunday</div>
              </div>
            </div>
          </div>

          {/* Active Global Reward */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#222]">Available Reward</h3>
              <button onClick={() => setTab('coupons')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                My Wallet <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10">
              <Sparkles className="absolute -right-6 -bottom-6 w-44 h-44 text-[#C89B3C] opacity-15 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C89B3C] text-white flex items-center justify-center shadow-lg shrink-0">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black leading-none mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">BOGO</h4>
                      <p className="font-bold text-white text-base">Buy 1 Get 1 Free</p>
                    </div>
                  </div>
                  <span className="bg-[#94F1C6] text-[#0D7A53] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Ready
                  </span>
                </div>
                <div className="space-y-1 border-t border-white/10 pt-4">
                  <p className="text-xs font-medium text-white/80">Grand Café • All Branches</p>
                  <p className="text-[10px] text-white/60 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C89B3C]" /> Valid until Dec 31
                  </p>
                </div>
                <button 
                  onClick={() => { setTab('coupons'); }} 
                  className="w-full py-3.5 rounded-2xl font-black text-xs text-[#222] bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] hover:from-[#B88A2B] hover:to-[#D0A74D] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" /> Use Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecificMerchantView = ({ setTab, setSelectedOffer, setSelectedReward, merchantName }: {
  setTab: (t: MainTab) => void;
  setSelectedOffer: (id: string) => void;
  setSelectedReward: (id: string) => void;
  merchantName: string;
}) => {

  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <div className="max-w-[1280px] mx-auto pb-24 space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Reward Modal */}
      {showWelcome && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm h-screen w-screen overflow-hidden">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-[#E6E6E6]">
            <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 text-[#999] hover:text-[#222]">✕</button>
            <div className="w-16 h-16 bg-[#FFF8ED] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#F5DEB3]">
              <Gift className="w-8 h-8 text-[#C89B3C]" />
            </div>
            <h3 className="text-2xl font-black text-[#222] mb-2">Welcome to Revia! 🎉</h3>
            <p className="text-[#666] mb-6 text-sm">As a Gold Tier member, you've unlocked a welcome reward: <strong className="text-[#222]">Free Signature Brew</strong> on your next visit!</p>
            <button onClick={() => { setShowWelcome(false); setTab('coupons'); }} className="w-full bg-[#222] hover:bg-black text-white py-3.5 rounded-xl font-bold transition-all shadow-md">View My Rewards</button>
          </div>
        </div>,
        document.body
      )}

      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden bg-[#161616] rounded-[32px] p-6 md:p-12 shadow-2xl flex flex-col lg:flex-row items-stretch justify-between gap-6 md:gap-8 border border-white/10">
        
        {/* Subtle Decorative Ambient Light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#C89B3C]/30 via-transparent to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#0D7A53]/20 via-transparent to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Gold Tier Member
              </span>
              <span className="text-xs text-white/60 font-medium">• 1.5x Multiplier Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Welcome back to {merchantName}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">Rohit!</span> 👋
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md">
              You are just <strong>2 visits away</strong> from unlocking your next free Artisanal Beverage at {merchantName}.
            </p>
          </div>

          {/* Loyalty Progress Tracker */}
          <div className="space-y-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 max-w-lg">
            <div className="flex justify-between text-xs font-black">
              <span className="text-white/80">Stamp Card Progress</span>
              <span className="text-[#C89B3C]">8 / 10 Stamps Collected</span>
            </div>
            <div className="h-3 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div className="h-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] rounded-full transition-all duration-700 w-[80%]" />
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => setTab('offers')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#C89B3C]" /> View Offers
            </button>
            <button 
              onClick={() => setTab('coupons')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all flex items-center gap-2"
            >
              <Gift className="w-3.5 h-3.5 text-[#C89B3C]" /> Redeem Code / QR
            </button>
          </div>
        </div>

        {/* Right CTA Card */}
        <div className="relative z-10 shrink-0 flex flex-col justify-center">
          <div className="bg-gradient-to-b from-[#222] to-[#141414] p-5 md:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center max-w-xs mx-auto w-full space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-[#C89B3C] shadow-inner">
              <QrCode className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white leading-tight">Digital Pass</h3>
              <p className="text-xs text-white/60 mt-1">Scan at POS terminal to earn stamps instantly</p>
            </div>
            <button
              onClick={() => setTab('membership')}
              className="w-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] hover:from-[#B88A2B] hover:to-[#D0A74D] text-[#222] py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Show Pass QR <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Stamps', value: '8', max: '/10', iconBg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]', border: 'border-[#F5DEB3]', Icon: Star, miniChart: BarChart2 },
          { label: 'Active Rewards', value: '4', max: '', iconBg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]', border: 'border-[#BCE3D1]', Icon: Gift, miniChart: Gift },
          { label: 'Total Visits', value: '24', max: '', iconBg: 'bg-[#F0F5FF]', color: 'text-[#3B5BDB]', border: 'border-[#C5D5FF]', Icon: Users, miniChart: TrendingUp },
          { label: 'Favorite Stores', value: '3', max: '', iconBg: 'bg-[#F5F0FF]', color: 'text-[#8A2BE2]', border: 'border-[#E2D2FF]', Icon: Store, miniChart: Store },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-3xl p-6 shadow-sm border border-[#E6E6E6] hover:border-[#C89B3C]/50 hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex gap-4 items-center">
              <div className={`w-12 h-12 rounded-2xl ${s.iconBg} ${s.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <s.Icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-[#999] font-black uppercase tracking-wider mb-0.5">{s.label}</p>
                <p className="text-2xl font-black text-[#222]">{s.value}<span className="text-xs text-[#999] font-bold">{s.max}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Split Main Grid: Left 60% / Right 40% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-8">

          {/* Loyalty Cards Carousel */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="text-xl font-black text-[#222]">{merchantName} Loyalty Card</h3>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center hover:bg-[#F8F8F6] text-[#666]">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white border border-[#E6E6E6] flex items-center justify-center hover:bg-[#F8F8F6] text-[#666]">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" businessName={merchantName} branchName="Main Branch" compact />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E6E6E6] space-y-6">
            <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C89B3C]" />
                <h3 className="text-xl font-black text-[#222]">Recent Activity</h3>
              </div>
              <button onClick={() => setTab('history')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                View Full History <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Activity 1 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F8F6] border border-[#E6E6E6] hover:border-[#C89B3C] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FFF8] border border-[#BCE3D1] flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-[#0D7A53]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#222] text-sm">Reward Redeemed (C-11)</p>
                    <p className="text-xs text-[#666]">10% OFF • {merchantName} — Downtown</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#999] font-medium">7:42 PM</p>
                  <p className="text-[10px] font-black text-[#0D7A53] uppercase">Redeemed</p>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F8F6] border border-[#E6E6E6] hover:border-[#C89B3C] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8ED] border border-[#F5DEB3] flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#222] text-sm">Loyalty Stamp Added</p>
                    <p className="text-xs text-[#666]">8 / 10 Stamps Collected</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#999] font-medium">2:34 PM</p>
                  <p className="text-[10px] font-black text-[#C89B3C] uppercase">+1 Stamp</p>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F8F8F6] border border-[#E6E6E6] hover:border-[#C89B3C] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F0FF] border border-[#E2D2FF] flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5 text-[#8A2BE2]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#222] text-sm">Store Visit</p>
                    <p className="text-xs text-[#666]">Artisan Bakers • Connaught Place</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#999] font-medium">10:15 AM</p>
                  <p className="text-[10px] font-black text-[#8A2BE2] uppercase">Recorded</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-8">

          {/* Active Offers Card */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] animate-pulse" />
                <h3 className="text-xl font-black text-[#222]">Featured Offer</h3>
              </div>
              <button onClick={() => setTab('offers')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E6E6E6] space-y-4">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C89B3C] text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="font-black text-xl">2x</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block bg-[#FFF8ED] text-[#C89B3C] border border-[#F5DEB3] text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1">
                    Loyalty Special
                  </span>
                  <p className="font-black text-[#222] text-base leading-tight">Double Stamps Weekend</p>
                  <p className="text-xs text-[#666] leading-relaxed mt-1">Earn 2 stamps on every artisanal beverage purchase this weekend.</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-[#999] uppercase tracking-wider border-t border-[#F0F0F0] pt-4">
                <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C89B3C]" /> Central Branch</div>
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#C89B3C]" /> Valid Sat-Sun</div>
              </div>

              <button 
                onClick={() => { setSelectedOffer('1'); setTab('offers'); }} 
                className="w-full py-3 rounded-2xl font-black text-xs text-[#222] bg-[#FFF8ED] border border-[#F5DEB3] hover:bg-[#C89B3C] hover:text-white transition-all shadow-sm"
              >
                Claim Offer Details
              </button>
            </div>
          </div>

          {/* Active Reward Pass Card */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-[#222]">Available Reward</h3>
              <button onClick={() => setTab('coupons')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B88A2B] uppercase tracking-wider flex items-center gap-1">
                Open Wallet <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-3xl p-6 shadow-xl relative overflow-hidden text-white border border-white/10">
              <Sparkles className="absolute -right-6 -bottom-6 w-44 h-44 text-[#C89B3C] opacity-15 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C89B3C] text-white flex items-center justify-center shadow-lg shrink-0">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black leading-none mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#E0B85E] to-[#C89B3C]">100% OFF</h4>
                      <p className="font-bold text-white text-base">Free Signature Brew</p>
                    </div>
                  </div>
                  <span className="bg-[#94F1C6] text-[#0D7A53] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Ready
                  </span>
                </div>

                <div className="space-y-1 border-t border-white/10 pt-4">
                  <p className="text-xs font-medium text-white/80">Unlocked via 10-Stamp Card</p>
                  <p className="text-[10px] text-white/60 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C89B3C]" /> Valid for 10 minutes once opened
                  </p>
                </div>

                <button 
                  onClick={() => { setSelectedReward('r1'); setTab('coupons'); }} 
                  className="w-full py-3.5 rounded-2xl font-black text-xs text-[#222] bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] hover:from-[#B88A2B] hover:to-[#D0A74D] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" /> Open Reward PIN / QR Code
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

