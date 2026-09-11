import React from 'react';
import { AlertCircle } from 'lucide-react';
import { GoldBtn } from './Buttons';

export const Skeleton = ({ h = 'h-4', w = 'w-full', rounded = 'rounded-lg' }: { h?: string; w?: string; rounded?: string }) => (
  <div className={`${h} ${w} ${rounded} bg-[#E6E6E6] animate-pulse`} />
);

export const EmptyState = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-16 h-16 bg-[#F8F8F6] rounded-2xl flex items-center justify-center mb-4 border border-[#E6E6E6]">
      <Icon className="w-7 h-7 text-[#C89B3C]/50" />
    </div>
    <h3 className="text-base font-black text-[#222] mb-2">{title}</h3>
    <p className="text-sm text-[#666] leading-relaxed max-w-xs">{desc}</p>
  </div>
);

export const ErrorState = ({ title, desc, onRetry }: { title: string; desc: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
    <div className="w-14 h-14 bg-[#FFF5F5] rounded-2xl flex items-center justify-center mb-4">
      <AlertCircle className="w-7 h-7 text-red-400" />
    </div>
    <h3 className="text-base font-black text-[#222] mb-2">{title}</h3>
    <p className="text-sm text-[#666] mb-5 leading-relaxed">{desc}</p>
    {onRetry && <GoldBtn onClick={onRetry} full={false}>Try Again</GoldBtn>}
  </div>
);
