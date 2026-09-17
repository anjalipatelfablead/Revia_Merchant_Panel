import React from 'react';
import { MainTab } from '../../types';
import { Crown, QrCode, Sparkles, ChevronRight } from 'lucide-react';

interface SidebarProps {
  tabs: { id: MainTab; label: string; Icon: React.ElementType; badge?: React.ReactNode }[];
  activeTab: MainTab;
  setTab: (t: MainTab) => void;
  onNavigateApp?: (route: string) => void;
}

export const DesktopSidebar: React.FC<SidebarProps> = ({ tabs, activeTab, setTab, onNavigateApp }) => {
  // Group navigation items logically for cleaner aesthetics
  const mainTabs = tabs.filter(t => ['dashboard', 'offers', 'menu'].includes(t.id));
  const loyaltyTabs = tabs.filter(t => ['history', 'coupons', 'membership'].includes(t.id));
  const accountTabs = tabs.filter(t => ['profile'].includes(t.id));

  const renderTabItem = (t: typeof tabs[0]) => {
    const isActive = activeTab === t.id;
    return (
      <button
        key={t.id}
        onClick={() => setTab(t.id)}
        className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 group relative ${
          isActive 
            ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-lg shadow-[#D4A753]/30 font-black scale-[1.01]' 
            : 'text-[#666] hover:bg-[#FAF8F5] hover:text-[#9E782F] hover:translate-x-1'
        }`}
      >
        <div className="flex items-center gap-3">
          <t.Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
            isActive ? 'text-white stroke-[2.5]' : 'text-[#888]'
          }`} />
          <span className="tracking-wide">{t.label}</span>
        </div>
        {t.badge && <div className="scale-90">{t.badge}</div>}
      </button>
    );
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E6E6E6] h-screen sticky top-0 shrink-0 z-40 justify-between">
      
      <div>
        {/* Logo & Branding */}
        <div className="h-[75px] flex items-center px-6 border-b border-[#E6E6E6] shrink-0">
          <button 
            onClick={() => onNavigateApp?.('/')} 
            className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-[#D4A753] to-[#9E782F] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4A753]/25 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl leading-none">R</span>
            </div>
            <div className="text-left">
              <span className="text-lg font-black tracking-[0.2em] uppercase text-[#222] leading-none block">REVIA</span>
              <span className="text-[9px] font-bold text-[#9E782F] uppercase tracking-wider block mt-0.5">Customer Suite</span>
            </div>
          </button>
        </div>

        {/* Grouped Navigation List */}
        <div className="overflow-y-auto py-6 px-4 space-y-6 max-h-[calc(100vh-210px)] hide-scrollbar">
          
          {/* Section 1: Main Menu */}
          <div className="space-y-1">
            <p className="text-[9px] font-black text-[#999] uppercase tracking-[0.2em] px-4 mb-2">Main Menu</p>
            {mainTabs.map(renderTabItem)}
          </div>

          {/* Section 2: Loyalty & Rewards */}
          <div className="space-y-1">
            <p className="text-[9px] font-black text-[#999] uppercase tracking-[0.2em] px-4 mb-2">Loyalty & History</p>
            {loyaltyTabs.map(renderTabItem)}
          </div>

          {/* Section 3: Perks & Profile */}
          <div className="space-y-1">
            <p className="text-[9px] font-black text-[#999] uppercase tracking-[0.2em] px-4 mb-2">Perks & Profile</p>
            {accountTabs.map(renderTabItem)}
          </div>

        </div>
      </div>

      {/* Bottom Compact Member Pass Card */}
      <div className="p-4 border-t border-[#E6E6E6] bg-[#FAF8F5]">
        <button 
          onClick={() => setTab('membership')}
          className="cursor-pointer w-full bg-[#1A1A1A] hover:bg-black text-white p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-between text-left group border border-[#D4A753]/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#D4A753] to-[#9E782F] text-white flex items-center justify-center shadow-sm">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#D4A753]">Gold Member</p>
              <p className="text-xs font-bold text-white/90">8/10 Stamps</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

    </aside>
  );
};
