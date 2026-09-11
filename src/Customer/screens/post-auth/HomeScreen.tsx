import React from 'react';
import { Star, Gift, TrendingUp, ChevronRight } from 'lucide-react';
import { MainTab } from '../../types';
import { MOCK_OFFERS, MOCK_REWARDS, MOCK_HISTORY } from '../../data/mockData';
import { LoyaltyCard } from '../../components/shared/LoyaltyCard';
import { OfferCard } from '../../components/shared/OfferCard';
import { RewardCard } from '../../components/shared/RewardCard';
import { TimelineItem } from '../../components/shared/TimelineItem';

export const HomeScreen = ({ setTab, setSelectedOffer, setSelectedReward }: {
  setTab: (t: MainTab) => void;
  setSelectedOffer: (id: string) => void;
  setSelectedReward: (id: string) => void;
}) => (
  <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 md:items-start">
    {/* Left Column */}
    <div className="space-y-6 md:col-span-7 lg:col-span-6">
      <div>
        <p className="text-xs font-black text-[#C89B3C] uppercase tracking-widest mb-1">Good evening</p>
        <h2 className="text-xl font-black text-[#222]">Welcome back, Rohit! 👋</h2>
        <p className="text-xs text-[#999] mt-0.5">Here's your loyalty progress.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Stamps', value: '8/10', bg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]', Icon: Star },
          { label: 'Rewards', value: '1', bg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]', Icon: Gift },
          { label: 'Visits', value: '24', bg: 'bg-[#F0F5FF]', color: 'text-[#3B5BDB]', Icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-3.5 border border-[#E6E6E6]`}>
            <s.Icon className={`w-4 h-4 ${s.color} mb-1.5`} />
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
            <p className="text-[9px] text-[#999] font-black uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Loyalty Card */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">My Loyalty</h3>
          <button onClick={() => setTab('rewards')} className="text-[10px] font-black text-[#C89B3C] flex items-center gap-1">View <ChevronRight className="w-3 h-3" /></button>
        </div>
        <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" />
      </div>

      {/* Next Reward */}
      <div className="bg-gradient-to-r from-[#C89B3C] to-[#a07520] rounded-2xl p-4 shadow-lg shadow-[#C89B3C]/20">
        <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">Next Reward</p>
        <p className="text-base font-black text-white mb-0.5">Free Coffee</p>
        <p className="text-white/70 text-xs">2 more qualifying visits away</p>
      </div>
    </div>

    {/* Right Column */}
    <div className="space-y-6 md:col-span-5 lg:col-span-6">
      {/* Offers */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Offers For You</h3>
          <button onClick={() => setTab('offers')} className="text-[10px] font-black text-[#C89B3C] flex items-center gap-1">All offers <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="space-y-3">
          {MOCK_OFFERS.filter(o => o.status === 'active').slice(0, 1).map(o => (
            <OfferCard key={o.id} offer={o} onClick={() => { setSelectedOffer(o.id); setTab('offers'); }} />
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Your Rewards</h3>
          <button onClick={() => setTab('rewards')} className="text-[10px] font-black text-[#C89B3C] flex items-center gap-1">Wallet <ChevronRight className="w-3 h-3" /></button>
        </div>
        {MOCK_REWARDS.available.map(r => (
          <RewardCard key={r.id} reward={r} status="available" onClick={() => { setSelectedReward(r.id); }} />
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Recent Activity</h3>
          <button onClick={() => setTab('history')} className="text-[10px] font-black text-[#C89B3C] flex items-center gap-1">All <ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="bg-white rounded-2xl border border-[#E6E6E6] p-4">
          {MOCK_HISTORY.slice(0, 3).map((item, i, arr) => <TimelineItem key={item.id} item={item} isLast={i === arr.length - 1} />)}
        </div>
      </div>
    </div>
  </div>
);
