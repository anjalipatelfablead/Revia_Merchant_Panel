import React, { useState } from 'react';
import { ReceiptText, Store, MapPin, ChevronDown } from 'lucide-react';
import { MOCK_HISTORY } from '../../data/mockData';
import { EmptyState } from '../../components/ui/States';
import { TimelineItem } from '../../components/shared/TimelineItem';

export const HistoryScreen = ({ selectedMerchant = 'All Merchants' }: { selectedMerchant?: string }) => {
  if (selectedMerchant === 'All Merchants') {
    return <AllMerchantsHistoryView />;
  }
  return <SpecificMerchantHistoryView merchantName={selectedMerchant} />;
};

const AllMerchantsHistoryView = () => {
  const [filter, setFilter] = useState<'all' | 'loyalty' | 'rewards' | 'visits' | 'transactions'>('all');
  const filters: (typeof filter)[] = ['all', 'visits', 'loyalty', 'rewards', 'transactions'];
  
  let expandedHistory = [
    ...MOCK_HISTORY,
    { id: '10', date: 'Yesterday', type: 'visit', icon: 'check', title: 'Visit Recorded', sub: 'Completed transaction', time: '1:15 PM', badge: null, business: 'Urban Eats', branch: 'Central Branch' },
    { id: '11', date: 'Yesterday', type: 'loyalty', icon: 'star', title: 'Loyalty Progress', sub: '3 / 5 Visits', time: '1:15 PM', badge: '+1 Visit', business: 'Urban Eats', branch: 'Central Branch' },
    { id: '12', date: '3 Sep', type: 'redemption', icon: 'check', title: 'Reward Redeemed', sub: 'Free Dessert', time: '4:20 PM', badge: 'Redeemed', business: 'Artisan Bakers', branch: 'Downtown Flagship' },
  ];

  const filtered = filter === 'all' ? expandedHistory : expandedHistory.filter(h => h.type === filter || (filter === 'visits' && h.type === 'visit'));
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof MOCK_HISTORY>);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 z-20 relative">
        <div className="flex flex-col xl:flex-row xl:items-center gap-6">
          <div>
            <h2 className="text-xl font-black text-[#222] mb-0.5">Activity Across All Merchants</h2>
            <p className="text-sm text-[#666]">Track your loyalty visits, rewards, and total value unlocked across all merchants.</p>
          </div>
          {/* Removed local filters since they are redundant with the global header switch */}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-[#EBF7F0] to-[#F5FCF8] rounded-2xl border border-[#BCE3D1] p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm text-[#0D7A53]">💰</div>
          <div>
            <div className="text-[10px] font-bold text-[#0D7A53] uppercase tracking-wider mb-0.5">Total Value Saved</div>
            <div className="text-xl font-black text-[#222]">₹1,240</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#FFF8ED] to-[#FFF0D6] rounded-2xl border border-[#E0B85E] p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm text-[#C89B3C]">⭐️</div>
          <div>
            <div className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-wider mb-0.5">Total Points</div>
            <div className="text-xl font-black text-[#222]">4,150 <span className="text-[10px] text-[#666] uppercase">pts</span></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#F5F0FF] to-[#FAF8FF] rounded-2xl border border-[#D1BCE3] p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm text-[#8A2BE2]">🎁</div>
          <div>
            <div className="text-[10px] font-bold text-[#8A2BE2] uppercase tracking-wider mb-0.5">Rewards Used</div>
            <div className="text-xl font-black text-[#222]">28</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#F0F5FF] to-[#F8FAFF] rounded-2xl border border-[#BCCDF2] p-4 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm text-[#3B5BDB]">🏃</div>
          <div>
            <div className="text-[10px] font-bold text-[#3B5BDB] uppercase tracking-wider mb-0.5">Total Visits</div>
            <div className="text-xl font-black text-[#222]">45</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`cursor-pointer px-5 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${filter === f ? 'bg-[#222] text-white shadow-md' : 'bg-white border border-[#E6E6E6] text-[#666] hover:bg-[#F8F8F6]'}`}>
            {f}
          </button>
        ))}
      </div>
      {Object.keys(grouped).length === 0 ? (
        <EmptyState icon={ReceiptText} title="No Activity Yet" desc="Your activity across all merchants will appear here." />
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#999] mb-3">{date}</p>
            <div className="bg-white rounded-xl border border-[#E6E6E6] p-4 shadow-sm">
              {items.map((item, i) => <TimelineItem key={item.id} item={item as any} isLast={i === items.length - 1} showMerchant={true} />)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const SpecificMerchantHistoryView = ({ merchantName }: { merchantName: string }) => {
  const [filter, setFilter] = useState<'all' | 'loyalty' | 'rewards' | 'visits' | 'transactions'>('all');
  const filters: (typeof filter)[] = ['all', 'visits', 'loyalty', 'rewards', 'transactions'];
  
  // Modify MOCK_HISTORY slightly to reflect the specific merchant name
  const specificHistory = MOCK_HISTORY.map(h => ({
    ...h,
    sub: h.sub.replace('Grand Café', merchantName)
  }));

  const filtered = filter === 'all' ? specificHistory : specificHistory.filter(h => h.type === filter || (filter === 'visits' && h.type === 'visit'));
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof specificHistory>);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">Your Activity at {merchantName}</h2>
        <p className="text-sm text-[#666]">Track your loyalty visits, rewards, and total value unlocked.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-[#E6E6E6] p-3 shadow-sm flex flex-col justify-center">
          <div className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-1">Total Value</div>
          <div className="text-lg font-black text-[#0D7A53]">₹850</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E6E6] p-3 shadow-sm flex flex-col justify-center">
          <div className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-1">Points Balance</div>
          <div className="text-lg font-black text-[#E0B85E]">2,450 pts</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E6E6] p-3 shadow-sm flex flex-col justify-center">
          <div className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-1">Rewards Used</div>
          <div className="text-lg font-black text-[#222]">12</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E6E6] p-3 shadow-sm flex flex-col justify-center">
          <div className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-1">Visits</div>
          <div className="text-lg font-black text-[#222]">24</div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`cursor-pointer px-5 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${filter === f ? 'bg-[#222] text-white shadow-md' : 'bg-white border border-[#E6E6E6] text-[#666] hover:bg-[#F8F8F6]'}`}>
            {f}
          </button>
        ))}
      </div>
      {Object.keys(grouped).length === 0 ? (
        <EmptyState icon={ReceiptText} title="No Activity Yet" desc={`Your loyalty activity at ${merchantName} will appear here.`} />
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#999] mb-3">{date}</p>
            <div className="bg-white rounded-xl border border-[#E6E6E6] p-4 shadow-sm">
              {items.map((item, i) => <TimelineItem key={item.id} item={item as any} isLast={i === items.length - 1} />)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
