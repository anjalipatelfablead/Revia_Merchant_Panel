import React from 'react';
import { CheckCircle2, Star, Gift } from 'lucide-react';
import { MOCK_HISTORY } from '../../data/mockData';

export const TimelineItem: React.FC<{ item: typeof MOCK_HISTORY[0]; isLast: boolean; }> = ({ item, isLast }) => {
  const iconMap: Record<string, { Icon: React.ElementType; bg: string; color: string }> = {
    check: { Icon: CheckCircle2, bg: 'bg-[#F0FFF8]', color: 'text-[#0D7A53]' },
    star: { Icon: Star, bg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]' },
    gift: { Icon: Gift, bg: 'bg-[#FFF8ED]', color: 'text-[#C89B3C]' },
    redemption: { Icon: CheckCircle2, bg: 'bg-[#F0F5FF]', color: 'text-[#3B5BDB]' },
  };
  const ic = iconMap[item.icon] || iconMap['check'];
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${ic.bg}`}>
          <ic.Icon className={`w-4 h-4 ${ic.color}`} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-[#E6E6E6] mt-1" />}
      </div>
      <div className={`flex-1 min-w-0 ${!isLast ? 'pb-5' : 'pb-1'}`}>
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#222]">{item.title}</p>
            <p className="text-xs text-[#666] mt-0.5 truncate">{item.sub}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-[#999]">{item.time}</p>
            {item.badge && <p className="text-[9px] font-black text-[#C89B3C] mt-0.5">{item.badge}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
