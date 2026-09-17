import React from 'react';
import { MapPin, Clock, QrCode } from 'lucide-react';
import { MOCK_OFFERS } from '../../data/mockData';

export const OfferCard: React.FC<{ offer: typeof MOCK_OFFERS[0] & { business?: string, branch?: string }; onClick?: () => void; showMerchant?: boolean }> = ({ offer, onClick, showMerchant }) => {
  const isActive = offer.status === 'active';
  
  const statusPill = {
    active: { text: 'AVAILABLE', color: 'text-[#0D7A53]', bg: 'bg-[#EBF7F0]', border: 'border-[#BCE3D1]' },
    expired: { text: 'EXPIRED', color: 'text-[#D32F2F]', bg: 'bg-[#FFF0F0]', border: 'border-[#FFE0E0]' },
    paused: { text: 'PAUSED', color: 'text-[#999]', bg: 'bg-[#F5F5F5]', border: 'border-[#E6E6E6]' },
    redeemed: { text: 'REDEEMED', color: 'text-[#0D7A53]', bg: 'bg-[#EBF7F0]', border: 'border-[#BCE3D1]' }
  };
  const pill = statusPill[offer.status as keyof typeof statusPill] || statusPill.active;

  let displayValue = offer.value;
  if (displayValue === '100% OFF') displayValue = 'FREE';

  // Mock Merchant Logos based on business name
  let merchantLogoStr = '🏪'; // default
  let logoBg = "bg-[#FFF8ED]";
  if (offer.business === 'Grand Café') { merchantLogoStr = '☕'; logoBg = "bg-[#FFF8ED]"; }
  if (offer.business === 'Urban Eats') { merchantLogoStr = '🍔'; logoBg = "bg-[#F0F5FF]"; }
  if (offer.business === 'Artisan Bakers') { merchantLogoStr = '🥐'; logoBg = "bg-[#F5F0FF]"; }

  return (
    <div onClick={isActive ? onClick : undefined}
      className={`relative bg-white rounded-[24px] border border-[#E6E6E6] p-6 shadow-sm transition-all overflow-hidden group ${isActive ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-[#C89B3C] cursor-pointer' : 'opacity-70 cursor-default grayscale-[10%]'}`}>
      
      {/* Dashed line ticket cutout effect */}
      <div className="absolute top-1/2 left-0 w-3 h-6 bg-[#F8F8F6] rounded-r-full -translate-y-1/2 border-r border-y border-[#E6E6E6] z-10" />
      <div className="absolute top-1/2 right-0 w-3 h-6 bg-[#F8F8F6] rounded-l-full -translate-y-1/2 border-l border-y border-[#E6E6E6] z-10" />
      <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-[#F0F0F0] -translate-y-1/2 z-0" />

      {/* Top Section */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex gap-4 items-start">
          {showMerchant && (
            <div className={`w-14 h-14 rounded-2xl ${logoBg} flex items-center justify-center shrink-0 shadow-inner text-2xl`}>
              {merchantLogoStr}
            </div>
          )}
          <div>
            {showMerchant && offer.business && (
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#666] mb-1">
                {offer.business} {offer.branch && <span className="text-[#999] tracking-normal capitalize ml-1">• {offer.branch}</span>}
              </p>
            )}
            <h4 className={`text-xl font-black leading-tight ${isActive ? 'text-[#222]' : 'text-[#666]'}`}>{offer.title}</h4>
            <p className="text-sm font-bold text-[#C89B3C] mt-1">{displayValue}</p>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full border ${pill.bg} ${pill.border}`}>
          <span className={`text-[9px] font-black uppercase tracking-widest ${pill.color}`}>{pill.text}</span>
        </div>
      </div>
      
      {/* Spacer for dashed line */}
      <div className="h-6" />
      
      {/* Bottom Section */}
      <div className="relative z-10">
        <p className="text-xs text-[#666] leading-relaxed mb-4 line-clamp-2">{offer.desc}</p>
        
        <div className="flex items-center gap-4 text-[10px] font-bold text-[#999] uppercase tracking-wider mb-5">
          {!showMerchant && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{offer.branch}</span>}
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{offer.validity || 'Valid until further notice'}</span>
        </div>
        
        {isActive ? (
          <button 
            onClick={(e) => { e.stopPropagation(); if (onClick) onClick(); }}
            className="w-full py-3.5 rounded-xl text-xs font-bold text-[#C89B3C] bg-[#FFF8ED] hover:bg-[#F2E5CC] transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#F2E5CC] group-hover:border-[#C89B3C]/50"
          >
            <QrCode className="w-4 h-4" />
            View Single-Use Voucher
          </button>
        ) : (
          <button className="w-full py-3.5 rounded-xl text-xs font-bold text-[#999] bg-[#F5F5F5] flex items-center justify-center gap-2 cursor-not-allowed">
            {(offer.status as string) === 'redeemed' ? 'Already Redeemed' : 'Unavailable'}
          </button>
        )}
      </div>
    </div>
  );
};
