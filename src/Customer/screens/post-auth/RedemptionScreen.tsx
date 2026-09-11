import React from 'react';
import { QrCode, X } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';

export const RedemptionScreen = ({ rewardId, onClose, onRedeemed }: { rewardId: string; onClose: () => void; onRedeemed: () => void }) => {
  const reward = MOCK_REWARDS.available.find(r => r.id === rewardId);
  if (!reward) return null;
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6E6E6]">
        <p className="text-sm font-black text-[#222]">Show to Staff</p>
        <button onClick={onClose} className="w-8 h-8 bg-[#F8F8F6] rounded-xl flex items-center justify-center">
          <X className="w-4 h-4 text-[#666]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#C89B3C] mb-3">Reward</p>
        <p className="text-5xl font-black text-[#222] mb-1">{reward.value}</p>
        <p className="text-[#666] text-sm mb-8">{reward.title}</p>

        <div className="bg-[#F8F8F6] border-2 border-[#C89B3C] rounded-3xl p-6 mb-6 shadow-lg">
          <QrCode className="w-44 h-44 text-[#222]" />
        </div>

        <div className="bg-[#F8F8F6] rounded-2xl px-6 py-3 border border-[#E6E6E6] mb-4">
          <p className="text-base font-black tracking-[0.2em] text-[#222] font-mono">{reward.code}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#0D7A53] bg-[#F0FFF8] border border-[#BCE3D1] rounded-full px-4 py-2 mb-2">
          <div className="w-1.5 h-1.5 bg-[#0D7A53] rounded-full animate-pulse" />
          Available · {reward.validity}
        </div>
        <p className="text-xs text-[#999]">{reward.branch}</p>
      </div>

      <div className="px-5 pb-8">
        <p className="text-xs text-[#999] text-center mb-4">Show this QR code or code to staff when ready to redeem. This reward can only be redeemed once.</p>
        <button onClick={onRedeemed} className="w-full border border-[#E6E6E6] rounded-2xl py-3 text-sm font-bold text-[#666] hover:bg-[#F8F8F6] transition-colors">
          Simulate Redemption (Demo)
        </button>
      </div>
    </div>
  );
};
