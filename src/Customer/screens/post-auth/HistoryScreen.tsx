import React, { useState } from 'react';
import { ReceiptText } from 'lucide-react';
import { MOCK_HISTORY } from '../../data/mockData';
import { EmptyState } from '../../components/ui/States';
import { TimelineItem } from '../../components/shared/TimelineItem';

export const HistoryScreen = () => {
  const [filter, setFilter] = useState<'all' | 'loyalty' | 'rewards' | 'visits' | 'transactions'>('all');
  const filters: (typeof filter)[] = ['all', 'visits', 'loyalty', 'rewards', 'transactions'];
  const filtered = filter === 'all' ? MOCK_HISTORY : MOCK_HISTORY.filter(h => h.type === filter || (filter === 'visits' && h.type === 'visit'));
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, typeof MOCK_HISTORY>);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">Your Activity</h2>
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
            className={`px-5 py-2 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all ${filter === f ? 'bg-[#222] text-white shadow-md' : 'bg-white border border-[#E6E6E6] text-[#666] hover:bg-[#F8F8F6]'}`}>
            {f}
          </button>
        ))}
      </div>
      {Object.keys(grouped).length === 0 ? (
        <EmptyState icon={ReceiptText} title="No Activity Yet" desc="Your loyalty activity will appear here." />
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#999] mb-3">{date}</p>
            <div className="bg-white rounded-xl border border-[#E6E6E6] p-4 shadow-sm">
              {items.map((item, i) => <TimelineItem key={item.id} item={item} isLast={i === items.length - 1} />)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
