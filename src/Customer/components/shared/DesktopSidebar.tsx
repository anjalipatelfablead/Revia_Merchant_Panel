import React from 'react';
import { MainTab } from '../../types';

interface SidebarProps {
  tabs: { id: MainTab; label: string; Icon: React.ElementType; badge?: React.ReactNode }[];
  activeTab: MainTab;
  setTab: (t: MainTab) => void;
  onNavigateApp?: (route: string) => void;
}

export const DesktopSidebar: React.FC<SidebarProps> = ({ tabs, activeTab, setTab, onNavigateApp }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E6E6E6] h-screen sticky top-0 shrink-0">
      
      {/* Logo */}
      <div className="h-[70px] flex items-center px-6 border-b border-[#E6E6E6] shrink-0">
        <button onClick={() => onNavigateApp?.('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="w-8 h-8 bg-[#C89B3C] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-black text-lg leading-none">R</span>
          </div>
          <span className="text-xl font-black tracking-[0.2em] uppercase text-[#222]">REVIA</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {tabs.map(t => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive 
                  ? 'bg-[#C89B3C]/10 text-[#C89B3C]' 
                  : 'text-[#666] hover:bg-[#F8F8F6] hover:text-[#222]'
              }`}
            >
              <div className="flex items-center gap-3">
                <t.Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                <span>{t.label}</span>
              </div>
              {t.badge && <div className="scale-90">{t.badge}</div>}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
