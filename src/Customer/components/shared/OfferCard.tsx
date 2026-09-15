import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { MOCK_OFFERS } from '../../data/mockData';

export const OfferCard: React.FC<{ offer: typeof MOCK_OFFERS[0]; onClick?: () => void }> = ({ offer, onClick }) => {
  const isActive = offer.status === 'active';
  
  const statusPill = {
    active: { text: 'ACTIVE', color: 'text-[#0D7A53]' },
    expired: { text: 'EXPIRED', color: 'text-[#D32F2F]' },
    paused: { text: 'PAUSED', color: 'text-[#999]' }
  };
  const pill = statusPill[offer.status];

  return (
    <div onClick={isActive ? onClick : undefined}
      className={`bg-white rounded-xl border border-[#E6E6E6] overflow-hidden shadow-sm transition-all ${isActive ? 'hover:shadow-md hover:border-[#C89B3C]/40 cursor-pointer active:scale-[0.99]' : 'opacity-70 cursor-default grayscale-[20%]'}`}>
      
      {/* Header */}
      <div className={`p-4 flex items-start justify-between ${isActive ? 'bg-[#222]' : 'bg-[#888]'}`}>
        <div>
          <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-1">{offer.type}</p>
          <p className="text-lg font-black text-white">{offer.value}</p>
        </div>
        <div className="bg-white rounded-full px-3 py-1 mt-0.5">
          <span className={`text-[9px] font-black uppercase tracking-widest ${pill.color}`}>{pill.text}</span>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4">
        <h4 className={`text-sm font-black mb-1 ${isActive ? 'text-[#222]' : 'text-[#666]'}`}>{offer.title}</h4>
        <p className="text-xs text-[#999] leading-relaxed mb-4">{offer.desc}</p>
        
        <div className="flex items-center justify-between text-[9px] font-bold text-[#999] uppercase tracking-wider mb-4 border-t border-[#F5F5F5] pt-4">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{offer.branch}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{offer.validity}</span>
        </div>
        
        {isActive && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:from-[#C89B3C] hover:to-[#8E6825] shadow-md shadow-[#9E782F]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Redeem Reward (Code / QR)
          </button>
        )}
      </div>
    </div>
  );
};
