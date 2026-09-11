import React from 'react';
import { QrCode, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const RewardCard: React.FC<{ reward: any; status: string; onClick?: () => void }> = ({ reward, status, onClick }) => {
  const cfg: Record<string, { bg: string; badge: { v: any; l: string } }> = {
    available: { bg: 'from-[#C89B3C] to-[#a07520]', badge: { v: 'green', l: 'Available' } },
    redeemed: { bg: 'from-[#3B5BDB] to-[#2848c7]', badge: { v: 'blue', l: 'Redeemed' } },
    expired: { bg: 'from-[#999] to-[#666]', badge: { v: 'gray', l: 'Expired' } },
    voided: { bg: 'from-[#999] to-[#666]', badge: { v: 'gray', l: 'Voided' } },
  };
  const c = cfg[status] || cfg.expired;
  return (
    <div onClick={status === 'available' ? onClick : undefined}
      className={`bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm ${status === 'available' ? 'hover:shadow-md hover:border-[#C89B3C]/40 cursor-pointer active:scale-[0.99] transition-all' : 'opacity-60'}`}>
      <div className={`h-20 bg-gradient-to-r ${c.bg} flex items-center justify-center`}>
        <p className="text-3xl font-black text-white">{reward.value}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-sm font-black text-[#222]">{reward.title}</h4>
          <Badge variant={c.badge.v}>{c.badge.l}</Badge>
        </div>
        <p className="text-[10px] text-[#999] mb-1">{reward.source}</p>
        <p className="text-[10px] text-[#999] flex items-center gap-1 mb-3"><Clock className="w-3 h-3" />{reward.validity}</p>
        {status === 'available' && (
          <button className="w-full py-2.5 rounded-xl text-xs font-black bg-[#C89B3C] text-white hover:bg-[#a07520] transition-colors flex items-center justify-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" /> View Reward
          </button>
        )}
      </div>
    </div>
  );
};
