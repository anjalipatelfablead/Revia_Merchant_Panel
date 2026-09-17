import React from 'react';
import { QrCode, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const RewardCard: React.FC<{ reward: any; status: string; onClick?: () => void; showMerchant?: boolean }> = ({ reward, status, onClick, showMerchant }) => {
  const cfg: Record<string, { bg: string; badge: { v: any; l: string } }> = {
    available: { bg: 'from-[#D4A753] to-[#9E782F]', badge: { v: 'green', l: 'Available' } },
    redeemed: { bg: 'from-[#3B5BDB] to-[#2848c7]', badge: { v: 'blue', l: 'Redeemed' } },
    expired: { bg: 'from-[#999] to-[#666]', badge: { v: 'gray', l: 'Expired' } },
    voided: { bg: 'from-[#999] to-[#666]', badge: { v: 'gray', l: 'Voided' } },
  };
  const c = cfg[status] || cfg.expired;
  return (
    <div onClick={status === 'available' ? onClick : undefined}
      className={`bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm flex flex-col h-full ${status === 'available' ? 'hover:shadow-md hover:border-[#D4A753]/50 cursor-pointer active:scale-[0.99] transition-all' : 'opacity-[0.85]'}`}>
      <div className={`h-24 bg-gradient-to-r ${c.bg} flex items-center justify-center shrink-0`}>
        <p className="text-3xl font-black text-white px-4 text-center">{reward.value}</p>
      </div>
      <div className="p-5 flex flex-col flex-1">
        {showMerchant && (reward.business || reward.branch) && (
          <div className="text-[11px] font-black uppercase tracking-wider text-[#C89B3C] mb-2 line-clamp-1">
            {reward.business}{reward.business && reward.branch ? ' • ' : ''}{reward.branch}
          </div>
        )}
        <div className="flex justify-between items-start gap-3 mb-2">
          <h4 className="text-base font-black text-[#222] line-clamp-2 leading-tight">{reward.title}</h4>
          <div className="shrink-0">
            <Badge variant={c.badge.v}>{c.badge.l}</Badge>
          </div>
        </div>
        <p className="text-xs text-[#666] mb-2 line-clamp-2">{reward.source}</p>
        <div className="mt-auto pt-2">
          <p className="text-xs text-[#999] font-medium flex items-center gap-1.5 mb-4">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{reward.validity}</span>
          </p>
          {status === 'available' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="w-full py-3 rounded-xl text-sm font-black bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:opacity-95 text-white transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
            >
              <QrCode className="w-4 h-4" /> View Single-Use Voucher
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
