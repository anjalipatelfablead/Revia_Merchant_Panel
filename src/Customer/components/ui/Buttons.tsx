import React from 'react';
import { ChevronLeft } from 'lucide-react';

export const GoldBtn = ({ children, onClick, full = true, disabled = false }: { children: React.ReactNode; onClick?: () => void; full?: boolean; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled}
    className={`${full ? 'w-full' : ''} bg-[#C89B3C] hover:bg-[#a07520] disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl text-sm font-black tracking-wide transition-all active:scale-[0.98] shadow-lg shadow-[#C89B3C]/20 flex items-center justify-center gap-2`}>
    {children}
  </button>
);

export const OutlineBtn = ({ children, onClick, full = true }: { children: React.ReactNode; onClick?: () => void; full?: boolean }) => (
  <button onClick={onClick}
    className={`${full ? 'w-full' : ''} border border-[#E6E6E6] hover:border-[#222] text-[#222] bg-white py-4 px-6 rounded-2xl text-sm font-bold tracking-wide transition-all active:scale-[0.98]`}>
    {children}
  </button>
);

export const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 text-sm font-bold text-[#666] hover:text-[#222] transition-colors">
    <ChevronLeft className="w-4 h-4" /> Back
  </button>
);
