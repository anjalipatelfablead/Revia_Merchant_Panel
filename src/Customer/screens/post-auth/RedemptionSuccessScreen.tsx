import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { GoldBtn } from '../../components/ui/Buttons';

export const RedemptionSuccessScreen = ({ rewardId, onDone }: { rewardId: string; onDone: () => void }) => {
  const reward = MOCK_REWARDS.available.find(r => r.id === rewardId);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-[#F0FFF8] rounded-full flex items-center justify-center mb-6 shadow-lg">
        <CheckCircle2 className="w-12 h-12 text-[#0D7A53]" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0D7A53] mb-2">Success</p>
      <h1 className="text-2xl font-black text-[#222] mb-1">Reward Redeemed!</h1>
      <p className="text-[#666] text-sm mb-8">Your reward was successfully used.</p>
      <div className="w-full bg-[#F8F8F6] rounded-2xl border border-[#E6E6E6] divide-y divide-[#F0F0F0] mb-8">
        {[['Reward', reward?.value || '10% OFF'], ['Business', reward?.business || 'Grand Café'], ['Branch', reward?.branch || 'Downtown Branch'], ['Date', '11 Sep 2026'], ['Time', '7:42 PM'], ['Reference', 'RDM-20260911-001']].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center px-5 py-3 text-sm">
            <span className="text-[#666]">{k}</span>
            <span className="font-bold text-[#222]">{v}</span>
          </div>
        ))}
      </div>
      <GoldBtn onClick={onDone}>View History</GoldBtn>
    </div>
  );
};
