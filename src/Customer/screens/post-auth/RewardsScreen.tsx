import React, { useState, useEffect, useRef } from 'react';
import { Gift } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { EmptyState } from '../../components/ui/States';
import { RewardCard } from '../../components/shared/RewardCard';

export const RewardsScreen = ({ selectedId, setSelectedId }: { selectedId?: string | null, setSelectedId?: (id: string | null) => void }) => {
  const [tab, setTab] = useState<'available' | 'redeemed' | 'expired' | 'voided'>('available');
  const tabs: (typeof tab)[] = ['available', 'redeemed', 'expired', 'voided'];
  const rewards = MOCK_REWARDS[tab];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollRef.current;
        const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [tab]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">My Rewards</h2>
        <p className="text-sm text-[#666]">Your earned and redeemed rewards.</p>
      </div>
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {tabs.map(t => (
          <button 
            key={t} 
            data-active={tab === t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-xs font-black capitalize whitespace-nowrap transition-all ${tab === t ? 'bg-[#222] text-white' : 'bg-white border border-[#E6E6E6] text-[#666] hover:border-[#C89B3C]'}`}>
            {t}{t === 'available' && MOCK_REWARDS.available.length > 0 ? ` (${MOCK_REWARDS.available.length})` : ''}
          </button>
        ))}
      </div>
      {rewards.length === 0 ? (
        <EmptyState icon={Gift} title={tab === 'available' ? 'No Rewards Yet' : `No ${tab.charAt(0).toUpperCase() + tab.slice(1)} Rewards`}
          desc={tab === 'available' ? 'Complete qualifying loyalty activity to unlock rewards.' : `Your ${tab} rewards will appear here.`} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map(r => (
            <RewardCard key={r.id} reward={r} status={tab} onClick={tab === 'available' ? () => setSelectedId?.(r.id) : undefined} />
          ))}
        </div>
      )}
    </div>
  );
};
