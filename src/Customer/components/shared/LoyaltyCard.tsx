import React from 'react';
import { Badge } from '../ui/Badge';
import { MOCK_BUSINESS } from '../../data/mockData';

export const LoyaltyCard = ({ stamps = 8, total = 10, name = 'Rohit Sharma', compact = false }: { stamps?: number; total?: number; name?: string; compact?: boolean }) => (
  <div className={`bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl text-white shadow-2xl ${compact ? 'p-4' : 'p-6'}`}>
    <div className={`flex justify-between items-start ${compact ? 'mb-3' : 'mb-5'}`}>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30 mb-1">REVIA LOYALTY</p>
        <p className={`font-black ${compact ? 'text-sm' : 'text-base'}`}>{MOCK_BUSINESS.name}</p>
        <p className="text-[10px] text-white/30">{MOCK_BUSINESS.branch}</p>
      </div>
      <div className="text-right">
        <p className="text-[9px] text-white/30 mb-0.5">Stamps</p>
        <p className={`font-black text-[#C89B3C] ${compact ? 'text-xl' : 'text-3xl'}`}>{stamps}<span className="text-white/30 text-sm">/{total}</span></p>
      </div>
    </div>

    <div className={`flex gap-1.5 ${compact ? 'mb-3' : 'mb-4'}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`flex-1 ${compact ? 'h-5' : 'h-7'} rounded-xl flex items-center justify-center transition-all ${i < stamps ? 'bg-[#C89B3C] shadow-lg shadow-[#C89B3C]/30' : 'bg-white/8 border border-white/10'}`}>
          <span className={`${compact ? 'text-[7px]' : 'text-[9px]'} ${i < stamps ? 'text-white' : 'text-white/20'}`}>{i < stamps ? '●' : '○'}</span>
        </div>
      ))}
    </div>

    <div className="flex justify-between items-center">
      <p className={`text-white/40 ${compact ? 'text-[9px]' : 'text-xs'}`}>
        {total - stamps > 0 ? `${total - stamps} more qualifying visit${total - stamps > 1 ? 's' : ''} to your reward` : '🎉 Reward unlocked!'}
      </p>
      <Badge variant="green">Active</Badge>
    </div>

    {!compact && (
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <p className="text-[10px] text-white/30">Member: {name}</p>
        <p className="text-[9px] text-white/20">Since Jan 2026</p>
      </div>
    )}
  </div>
);
