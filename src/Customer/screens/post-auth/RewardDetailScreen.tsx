import React from 'react';
import { QrCode } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { GoldBtn, OutlineBtn, BackBtn } from '../../components/ui/Buttons';
import { Badge } from '../../components/ui/Badge';

export const RewardDetailScreen = ({ rewardId, onBack, onShowQR }: { rewardId: string; onBack: () => void; onShowQR: () => void }) => {
  const reward = MOCK_REWARDS.available.find(r => r.id === rewardId) || MOCK_REWARDS.redeemed.find(r => r.id === rewardId);
  if (!reward) return <div className="p-4"><BackBtn onClick={onBack} /></div>;
  return (
    <div className="space-y-5">
      <BackBtn onClick={onBack} />
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 text-center shadow-2xl">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/40 mb-2">Reward</p>
        <p className="text-5xl font-black text-[#C89B3C] mb-1">{reward.value}</p>
        <p className="text-white font-black text-base">{reward.title}</p>
        <div className="mt-4 flex justify-center">
          <Badge variant="green">Available</Badge>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E6E6E6] divide-y divide-[#F5F5F5]">
        {[['Business', reward.business], ['Branch', reward.branch], ['Source', reward.source], ['Valid Until', reward.validity]].map(([k, v]) => (
          <div key={k} className="flex justify-between items-center px-4 py-3.5 text-sm">
            <span className="text-[#666]">{k}</span>
            <span className="font-bold text-[#222]">{v}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#F8F8F6] rounded-2xl p-4 border border-[#E6E6E6] text-center">
        <p className="text-[10px] text-[#999] mb-1">Reward Code</p>
        <p className="text-base font-black tracking-[0.2em] text-[#222] font-mono">{reward.code}</p>
      </div>

      <GoldBtn onClick={onShowQR}><QrCode className="w-4 h-4" /> Show Reward QR</GoldBtn>
      <OutlineBtn onClick={onBack}>Back to Wallet</OutlineBtn>
    </div>
  );
};
