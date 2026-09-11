import React from 'react';
import { LoyaltyTier } from '../../types';

export const LiveBadge: React.FC<{ text?: string; className?: string }> = ({ text = 'LIVE', className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#E6F4ED] text-[#0D7A53] border border-[#BCE3D1] ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53] animate-pulse" />
    {text}
  </span>
);

export const TierBadge: React.FC<{ tier: LoyaltyTier; className?: string }> = ({ tier, className = '' }) => {
  if (tier === 'Obsidian VIP') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#1A1615] text-[#D4AF37] shadow-xs border border-[#332D2A] ${className}`}>
        <span className="text-[10px]">✦</span> {tier}
      </span>
    );
  }
  if (tier === 'Gold Reserve') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] ${className}`}>
        <span className="text-[10px]">◈</span> {tier}
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide bg-[#F5F4F0] text-[#6E6A66] border border-[#E5E0D8] ${className}`}>
      {tier}
    </span>
  );
};

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <button
    className={`bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-95 active:translate-y-0 text-white font-medium shadow-xs rounded-lg py-2.5 px-4 text-sm transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);
