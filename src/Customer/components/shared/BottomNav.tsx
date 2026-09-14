import React from 'react';
import { Home, Zap, Gift, ReceiptText, User } from 'lucide-react';
import { MainTab } from '../../types';

export const BottomNav = ({ active, onChange }: { active: MainTab; onChange: (t: MainTab) => void }) => {
  const tabs: { id: MainTab; label: string; Icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', Icon: Home },
    { id: 'offers', label: 'Offers', Icon: Zap },
    { id: 'rewards', label: 'Rewards', Icon: Gift },
    { id: 'history', label: 'History', Icon: ReceiptText },
    { id: 'profile', label: 'Profile', Icon: User },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6E6E6] safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center">
        {tabs.map(t => {
          const isActive = active === t.id;
          return (
            <button key={t.id} onClick={() => onChange(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${isActive ? 'text-[#C89B3C]' : 'text-[#999] hover:text-[#666]'}`}>
              <t.Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? 'text-[#C89B3C]' : 'text-[#bbb]'}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
