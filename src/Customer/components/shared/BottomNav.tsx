import React from 'react';
import { Home, Utensils, ReceiptText, Ticket, User } from 'lucide-react';
import { MainTab } from '../../types';

export const BottomNav = ({ active, onChange }: { active: MainTab; onChange: (t: MainTab) => void }) => {
  const tabs: { id: MainTab; label: string; Icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Home', Icon: Home },
    { id: 'menu', label: 'Menu', Icon: Utensils },
    { id: 'orders', label: 'Orders', Icon: ReceiptText, badge: '2' },
    { id: 'coupons', label: 'Rewards', Icon: Ticket, badge: '4' },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E6E6E6] px-3 py-2 safe-area-pb shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {tabs.map(t => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-white font-black'
                  : 'text-[#777] hover:text-[#222]'
              }`}
            >
              {isActive && (
                <div className="absolute inset-x-1 inset-y-0.5 bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-xl shadow-md shadow-[#D4A753]/30 transition-all" />
              )}
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <div className="relative">
                  <t.Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-105 stroke-[2.5]' : ''}`} />
                  {t.badge && !isActive && (
                    <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-[#D4A753] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs border border-white">
                      {t.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] tracking-tight leading-none mt-0.5 ${isActive ? 'font-black' : 'font-semibold'}`}>
                  {t.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
