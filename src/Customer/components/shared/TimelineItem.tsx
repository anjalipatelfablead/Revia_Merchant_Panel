import React from 'react';
import { CheckCircle2, Star, Gift } from 'lucide-react';
import { MOCK_HISTORY } from '../../data/mockData';

export const TimelineItem: React.FC<{ item: typeof MOCK_HISTORY[0] & { business?: string, branch?: string }; isLast: boolean; showMerchant?: boolean; }> = ({ item, isLast, showMerchant }) => {
  const iconMap: Record<string, { Icon: React.ElementType; bg: string; color: string }> = {
    check: { Icon: CheckCircle2, bg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]' },
    star: { Icon: Star, bg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]' },
    gift: { Icon: Gift, bg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]' },
    redemption: { Icon: CheckCircle2, bg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]' },
  };
  const ic = iconMap[item.icon] || iconMap['check'];
  
  // Mock Merchant Logos based on business name
  let merchantLogoStr = '🏪'; // default
  if (item.business === 'Grand Café') merchantLogoStr = '☕';
  if (item.business === 'Urban Eats') merchantLogoStr = '🍔';
  if (item.business === 'Artisan Bakers') merchantLogoStr = '🥐';

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        {showMerchant && item.business ? (
          <div className="w-10 h-10 rounded-xl bg-[#F8F8F6] border border-[#E6E6E6] flex items-center justify-center shrink-0 shadow-sm text-xl hover:scale-110 transition-transform cursor-pointer">
            {merchantLogoStr}
          </div>
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm ${ic.bg}`}>
            <ic.Icon className={`w-[18px] h-[18px] ${ic.color}`} />
          </div>
        )}
        {!isLast && <div className="w-px flex-1 bg-[#E6E6E6] my-2" />}
      </div>
      <div className={`flex-1 min-w-0 ${!isLast ? 'pb-5' : 'pb-1'}`}>
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 pt-0.5">
            {showMerchant && item.business ? (
              <p className="text-[11px] font-black uppercase text-[#222] tracking-wider mb-0.5">
                {item.business}{item.branch ? <span className="text-[#999] font-bold tracking-normal capitalize ml-1">({item.branch})</span> : ''}
              </p>
            ) : (
              showMerchant && item.branch && (
                 <p className="text-[10px] font-black uppercase text-[#C89B3C] mb-0.5">{item.branch}</p>
              )
            )}
            <div className="flex items-center gap-2 mt-1">
               {showMerchant && <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${ic.bg}`}><ic.Icon className={`w-2.5 h-2.5 ${ic.color}`} /></div>}
               <p className="text-sm font-bold text-[#222] leading-none">{item.title}</p>
            </div>
            <p className="text-xs text-[#666] mt-1.5 truncate">{item.sub}</p>
          </div>
          <div className="text-right shrink-0 pt-1">
            <p className="text-[10px] text-[#999] font-medium">{item.time}</p>
            {item.badge && <p className={`inline-block text-[9px] font-black mt-1.5 uppercase tracking-widest px-2 py-0.5 rounded-full ${item.badge.includes('+') ? 'bg-[#FFF8ED] text-[#C89B3C] border border-[#E0B85E]' : item.badge === 'Redeemed' ? 'bg-[#F0FFF8] text-[#0D7A53] border border-[#BCE3D1]' : 'bg-[#F8F8F6] text-[#666] border border-[#E6E6E6]'}`}>{item.badge}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
