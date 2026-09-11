import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { MOCK_OFFERS } from '../../data/mockData';

export const OfferCard: React.FC<{ offer: typeof MOCK_OFFERS[0]; onClick?: () => void }> = ({ offer, onClick }) => {
  const statusBadge = { active: { v: 'green' as const, l: 'Active' }, expired: { v: 'red' as const, l: 'Expired' }, paused: { v: 'gray' as const, l: 'Paused' } };
  const sb = statusBadge[offer.status];
  return (
    <div onClick={offer.status === 'active' ? onClick : undefined}
      className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ${offer.status === 'active' ? 'border-[#E6E6E6] hover:shadow-md hover:border-[#C89B3C]/40 cursor-pointer active:scale-[0.99]' : 'border-[#E6E6E6] opacity-60 cursor-default'}`}>
      <div className="h-14 bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] flex items-center justify-between px-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{offer.type}</p>
          <p className="text-sm font-black text-white">{offer.value}</p>
        </div>
        <Badge variant={sb.v}>{sb.l}</Badge>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-black text-[#222] mb-1">{offer.title}</h4>
        <p className="text-xs text-[#666] leading-relaxed mb-3">{offer.desc}</p>
        <div className="flex items-center justify-between text-[10px] text-[#999]">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{offer.branch}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{offer.validity}</span>
        </div>
        {offer.status === 'active' && (
          <button className="mt-3 w-full py-2 rounded-xl text-[10px] font-black text-[#C89B3C] border border-[#C89B3C]/30 bg-[#FFF8ED] hover:bg-[#C89B3C] hover:text-white transition-all">
            View Offer
          </button>
        )}
      </div>
    </div>
  );
};
