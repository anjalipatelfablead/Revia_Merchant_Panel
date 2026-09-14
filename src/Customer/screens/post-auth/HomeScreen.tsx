import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, Gift, Users, Store, ArrowRight, ChevronLeft, ChevronRight, BarChart2, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { MainTab } from '../../types';
import { LoyaltyCard } from '../../components/shared/LoyaltyCard';

export const HomeScreen = ({ setTab, setSelectedOffer, setSelectedReward }: {
  setTab: (t: MainTab) => void;
  setSelectedOffer: (id: string) => void;
  setSelectedReward: (id: string) => void;
}) => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
  <div className="max-w-[1280px] mx-auto pb-12 space-y-8">
    
    {showWelcome && typeof document !== 'undefined' && createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm h-screen w-screen overflow-hidden">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <button onClick={() => setShowWelcome(false)} className="absolute top-4 right-4 text-[#999] hover:text-[#222]">✕</button>
          <div className="w-16 h-16 bg-[#FFF8ED] rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-[#C89B3C]" />
          </div>
          <h3 className="text-2xl font-black text-[#222] mb-2">Welcome to Grand Café!</h3>
          <p className="text-[#666] mb-6 text-sm">As a new customer, you've received a welcome reward: <strong className="text-[#222]">Free Coffee</strong> on your first visit!</p>
          <button onClick={() => { setShowWelcome(false); setTab('rewards'); }} className="w-full bg-[#222] hover:bg-black text-white py-3 rounded-lg font-bold transition-colors">View My Rewards</button>
        </div>
      </div>,
      document.body
    )}

    {/* Dark Hero Banner */}
    <div className="relative overflow-hidden bg-[#161616] rounded-md p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
      {/* Decorative Gold Curve Line (Simulated via SVG) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="w-full h-full">
          <path d="M-100,200 C300,300 600,100 1100,150" fill="none" stroke="#C89B3C" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-lg w-full">
        <p className="text-[#C89B3C] text-[9px] font-black uppercase tracking-[0.25em] mb-3">Good to see you again</p>
        <h2 className="text-4xl md:text-[44px] font-black text-white mb-2 tracking-tight">Welcome back, Rohit! 👋</h2>
        <p className="text-[13px] text-white/60 mb-8">You are 2 visits away from your next reward.</p>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 max-w-md">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5DEB3] rounded-full w-[80%]" />
          </div>
          <span className="text-[11px] font-bold text-white/50"><span className="text-[#C89B3C]">8</span> / 10 visits</span>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        <div className="bg-[#1C1C1C] p-6 rounded-md border border-white/5 shadow-2xl flex flex-col items-center text-center min-w-[240px]">
          <h3 className="text-[22px] font-black text-white leading-tight mb-4">Great Coffee<br /><span className="text-[#C89B3C]">Greater Rewards</span></h3>
          <button
            onClick={() => setTab('membership')}
            className="w-full bg-gradient-to-r from-[#E0B85E] to-[#C89B3C] hover:from-[#F5DEB3] hover:to-[#D4AF37] text-[#222] py-3 rounded-full font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            Explore Plans <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Stat Cards Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {[
        { label: 'Total Stamps', value: '8', max: '/10', iconBg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]', Icon: Star, miniChart: BarChart2 },
        { label: 'Rewards', value: '1', max: '', iconBg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]', Icon: Gift, miniChart: Gift },
        { label: 'Total Visits', value: '24', max: '', iconBg: 'bg-[#F0F5FF]', color: 'text-[#3B5BDB]', Icon: Users, miniChart: TrendingUp },
        { label: 'Favorite Stores', value: '3', max: '', iconBg: 'bg-[#F5F0FF]', color: 'text-[#8A2BE2]', Icon: Store, miniChart: Store },
      ].map(s => (
        <div key={s.label} className="bg-white rounded-md p-6 shadow-sm border border-[#E6E6E6] flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className={`w-12 h-12 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
              <s.Icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-[#666] font-bold uppercase tracking-widest mb-0.5">{s.label}</p>
              <p className="text-2xl font-black text-[#222]">{s.value}<span className="text-xs text-[#999]">{s.max}</span></p>
            </div>
          </div>
          <s.miniChart className={`w-8 h-8 opacity-20 ${s.color}`} />
        </div>
      ))}
    </div>

    {/* Split Layout: Left (60%) / Right (40%) */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* LEFT COLUMN */}
      <div className="lg:col-span-7 space-y-8">

        {/* Loyalty Cards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-black text-[#222]">My Loyalty Cards</h3>
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
            <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" compact />
            <LoyaltyCard stamps={5} total={10} name="Rohit Sharma" businessName="Artisan Bakers" branchName="Connaught Place" compact />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-md p-6 shadow-sm border border-[#E6E6E6]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-[#222]">Recent Activity</h3>
            <button onClick={() => setTab('history')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B89454] uppercase tracking-wider flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {/* Activity 1 */}
            <div className="flex items-center justify-between p-4 rounded-md hover:bg-[#F8F8F6] transition-colors border border-transparent hover:border-[#E6E6E6]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F0FFF8] flex items-center justify-center">
                  <Gift className="w-4 h-4 text-[#0D7A53]" />
                </div>
                <div>
                  <p className="font-bold text-[#222] text-sm">Reward Redeemed</p>
                  <p className="text-xs text-[#666]">10% OFF • Grand Café — Downtown</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#666] font-medium">7:42 PM</p>
                <p className="text-[10px] font-bold text-[#0D7A53]">Redeemed</p>
              </div>
            </div>
            {/* Activity 2 */}
            <div className="flex items-center justify-between p-4 rounded-md hover:bg-[#F8F8F6] transition-colors border border-transparent hover:border-[#E6E6E6]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFF8ED] flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#C89B3C]" />
                </div>
                <div>
                  <p className="font-bold text-[#222] text-sm">Loyalty Progress</p>
                  <p className="text-xs text-[#666]">8 / 10 Stamps</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#666] font-medium">2:34 PM</p>
                <p className="text-[10px] font-bold text-[#C89B3C]">+1 Stamp</p>
              </div>
            </div>
            {/* Activity 3 */}
            <div className="flex items-center justify-between p-4 rounded-md hover:bg-[#F8F8F6] transition-colors border border-transparent hover:border-[#E6E6E6]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F5F0FF] flex items-center justify-center">
                  <Store className="w-4 h-4 text-[#8A2BE2]" />
                </div>
                <div>
                  <p className="font-bold text-[#222] text-sm">Visit at Artisan Bakers</p>
                  <p className="text-xs text-[#666]">Connaught Place</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#666] font-medium">10:15 AM</p>
                <p className="text-[10px] font-bold text-[#C89B3C]">+1 Stamp</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-5 space-y-6">

        {/* Active Offers */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
              <h3 className="text-lg font-black text-[#222]">Active Offers</h3>
            </div>
            <button onClick={() => setTab('offers')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B89454] uppercase tracking-wider flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white rounded-md p-5 shadow-sm border border-[#E6E6E6]">
            <div className="flex gap-4 mb-4">
              <div className="w-12 h-12 rounded-md bg-[#C89B3C] flex items-center justify-center shrink-0">
                <span className="font-black text-white text-lg">2x</span>
              </div>
              <div className="flex-1">
                <span className="inline-block bg-[#F8F8F6] text-[#666] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1">Loyalty Offer</span>
                <p className="font-black text-[#222] text-sm mb-1">Double Stamps Weekend</p>
                <p className="text-xs text-[#666] leading-relaxed">Earn 2 stamps instead of 1 on qualifying visits this weekend.</p>
              </div>
              <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 relative">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=200&h=200" alt="Iced Coffee" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
                  <span className="text-white font-black text-xs leading-none">2X<br />STAMPS</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-[#999] uppercase tracking-wider mb-4 border-t border-[#E6E6E6] pt-4">
              <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Downtown Branch</div>
              <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Valid Sat-Sun</div>
            </div>
            <button onClick={() => { setSelectedOffer('1'); setTab('offers'); }} className="w-full py-2.5 rounded-md font-bold text-[#C89B3C] border-2 border-[#F5DEB3] hover:bg-[#FFF8ED] transition-colors text-xs">
              View Offer
            </button>
          </div>
        </div>

        {/* Your Rewards */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-black text-[#222]">Your Rewards</h3>
            <button onClick={() => setTab('rewards')} className="text-xs font-bold text-[#C89B3C] hover:text-[#B89454] uppercase tracking-wider flex items-center gap-1">
              Open Wallet <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-[#E0B85E] to-[#C89B3C] rounded-md p-6 shadow-xl relative overflow-hidden text-white">
            <Gift className="absolute -right-4 -bottom-4 w-40 h-40 text-white opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black leading-none mb-1 text-[#222]">10% OFF</h4>
                    <p className="font-bold text-white text-lg">Free Coffee</p>
                  </div>
                </div>
                <span className="bg-[#94F1C6] text-[#0D7A53] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Available
                </span>
              </div>

              <div className="space-y-1 mb-6 border-t border-white/20 pt-4">
                <p className="text-xs font-medium text-white/90">Loyalty Program - 10 Stamps</p>
                <p className="text-[10px] text-white/70 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Valid until 20 Sep 2025
                </p>
              </div>

              <button onClick={() => { setSelectedReward('r1'); setTab('rewards'); }} className="w-full py-3 rounded-md font-black text-white bg-[#A07B2D] hover:bg-[#8B6A25] transition-colors text-sm shadow-inner flex items-center justify-center gap-2 border border-[#B89454]">
                <Gift className="w-4 h-4" /> View Reward
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  );
};
