import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const GoldBtn = ({ children, onClick, full = true, disabled = false, className = '' }: { children: React.ReactNode; onClick?: () => void; full?: boolean; disabled?: boolean; className?: string }) => (
  <button onClick={onClick} disabled={disabled}
    className={`${full ? 'w-full' : ''} bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:from-[#C89B3C] hover:to-[#8E6825] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-2xl text-sm font-bold tracking-wide transition-all shadow-md shadow-[#9E782F]/20 flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

export const OutlineBtn = ({ children, onClick, full = true, className = '' }: { children: React.ReactNode; onClick?: () => void; full?: boolean; className?: string }) => (
  <button onClick={onClick}
    className={`${full ? 'w-full' : ''} border border-[#E6E6E6] hover:border-[#9E782F] text-[#222] bg-white py-3.5 px-6 rounded-2xl text-sm font-bold tracking-wide transition-all active:scale-[0.98] ${className}`}>
    {children}
  </button>
);

export const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 text-sm font-bold text-[#666] hover:text-[#222] transition-colors">
    <ChevronLeft className="w-4 h-4" /> Back
  </button>
);
