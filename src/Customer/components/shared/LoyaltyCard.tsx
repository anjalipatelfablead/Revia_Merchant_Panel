import React from 'react';
import { Badge } from '../ui/Badge';
import { Star } from 'lucide-react';
import { MOCK_BUSINESS } from '../../data/mockData';

export const LoyaltyCard = ({
  stamps = 8,
  total = 10,
  name = 'Rohit Sharma',
  compact = false,
  businessName = MOCK_BUSINESS.name,
  branchName = MOCK_BUSINESS.branch
}: {
  stamps?: number;
  total?: number;
  name?: string;
  compact?: boolean;
  businessName?: string;
  branchName?: string;
}) => (
  <div className={`group relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2C2720] to-[#0A0A0A] rounded-md text-white shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(200,155,60,0.4)] border border-white/10 ${compact ? 'p-5' : 'p-7'}`}>
    {/* Metallic sheen / glare effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    <div className={`relative flex justify-between items-start ${compact ? 'mb-4' : 'mb-6'}`}>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-1">REVIA LOYALTY</p>
        <p className={`font-black ${compact ? 'text-sm' : 'text-base'}`}>{businessName}</p>
        <p className="text-[10px] text-white/30">{branchName}</p>
      </div>
      <div className="text-right">
        <p className="text-[9px] text-white/30 mb-0.5">Stamps</p>
        <p className={`font-black text-[#C89B3C] ${compact ? 'text-xl' : 'text-3xl'}`}>{stamps}<span className="text-white/30 text-sm">/{total}</span></p>
      </div>
    </div>

    <div className={`relative flex gap-1.5 ${compact ? 'mb-4' : 'mb-6'}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`flex-1 ${compact ? 'h-6' : 'h-8'} rounded-lg flex items-center justify-center transition-all duration-500 ${i < stamps ? 'bg-gradient-to-b from-[#E0B85E] to-[#B89454] shadow-[0_0_15px_rgba(200,155,60,0.5)] scale-105 border border-[#F5DEB3]/50' : 'bg-black/30 border border-white/5 backdrop-blur-sm'}`}>
          {i < stamps && <Star className={`w-3.5 h-3.5 text-white/90 drop-shadow-md ${compact ? 'scale-75' : ''}`} fill="currentColor" />}
        </div>
      ))}
    </div>

    <div className="relative flex justify-between items-center">
      <p className={`text-[#B89454] font-semibold tracking-wide ${compact ? 'text-[9px]' : 'text-[11px]'}`}>
        {total - stamps > 0 ? `${total - stamps} MORE VISIT${total - stamps > 1 ? 'S' : ''} TO REWARD` : '🎉 REWARD UNLOCKED'}
      </p>
      <Badge variant="green">Active</Badge>
    </div>

    {!compact && (
      <div className="relative mt-5 pt-5 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">{name.charAt(0)}</span>
          </div>
          <p className="text-xs text-white/60 font-medium tracking-wide">{name}</p>
        </div>
        <p className="text-[10px] text-white/30 font-semibold tracking-widest uppercase">Since 2026</p>
      </div>
    )}
  </div>
);
