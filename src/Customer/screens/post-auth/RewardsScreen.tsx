import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { EmptyState } from '../../components/ui/States';
import { RewardCard } from '../../components/shared/RewardCard';

export const RewardsScreen = ({ onSelectReward }: { onSelectReward: (id: string) => void }) => {
  const [tab, setTab] = useState<'available' | 'redeemed' | 'expired' | 'voided'>('available');
  const tabs: (typeof tab)[] = ['available', 'redeemed', 'expired', 'voided'];
  const rewards = MOCK_REWARDS[tab];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">My Rewards</h2>
        <p className="text-sm text-[#666]">Your earned and redeemed rewards.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
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
            <RewardCard key={r.id} reward={r} status={tab} onClick={tab === 'available' ? () => onSelectReward(r.id) : undefined} />
          ))}
        </div>
      )}
    </div>
  );
};
