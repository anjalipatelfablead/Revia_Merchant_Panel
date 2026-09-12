import React from 'react';
import { Bell, User, Search, Menu, LogOut, Settings, Heart } from 'lucide-react';

import { MainTab } from '../../types';

interface Props {
  onNavigate?: (route: string) => void;
  onMenuClick?: () => void;
  tabs?: { id: MainTab; label: string; Icon: React.ElementType; badge?: React.ReactNode }[];
  activeTab?: MainTab;
  setTab?: (t: MainTab) => void;
}

export const CustomerDashboardHeader: React.FC<Props> = ({ onNavigate, onMenuClick, tabs = [], activeTab, setTab }) => {
  // Separate primary tabs from secondary ("More") tabs
  const primaryTabs = tabs.slice(0, 4);
  const moreTabs = tabs.slice(4);

  return (
    <header className="h-[70px] bg-white border-b border-[#E6E6E6] flex items-center px-4 lg:px-8 sticky top-0 z-50 shrink-0">
      
      {/* Left Section: Mobile Logo and Hamburger (Hidden on Desktop) */}
      <div className="flex items-center gap-2 md:hidden flex-1">
        {onMenuClick && (
          <button onClick={onMenuClick} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8F8F6] text-[#222]">
            <Menu className="w-5 h-5" />
          </button>
        )}
        <button onClick={() => onNavigate?.('/customer-landing')} className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="w-7 h-7 bg-[#C89B3C] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-black text-base leading-none">R</span>
          </div>
          <span className="text-lg font-black tracking-[0.2em] uppercase text-[#222]">REVIA</span>
        </button>
      </div>

      {/* Spacer for Desktop (Since logo is in sidebar) */}
      <div className="hidden md:block flex-1" />
      {/* Navigation moved to DesktopSidebar */}

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1">


        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8F8F6] text-[#666] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#D32F2F] rounded-full border border-white" />
        </button>

        <div className="h-6 w-[1px] bg-[#E6E6E6] mx-1 sm:mx-2 hidden sm:block"></div>

        <div className="relative group">
          <button
            onClick={() => onNavigate?.('/customer/profile')}
            className="flex items-center gap-3 hover:bg-[#F8F8F6] p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-[#E6E6E6]"
          >
            <div className="w-8 h-8 rounded-full bg-[#F3EFE7] border border-[#E6E6E6] flex items-center justify-center overflow-hidden shrink-0">
              <User className="w-4 h-4 text-[#C89B3C]" />
            </div>
            <span className="text-xs font-bold text-[#222] hidden sm:block">Rohit Sharma</span>
          </button>

          {/* Profile Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E6E6E6] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex flex-col p-2">
            <div className="px-4 py-3 border-b border-[#E6E6E6] mb-2">
              <p className="text-sm font-black text-[#222]">Rohit Sharma</p>
              <p className="text-xs text-[#666]">rohit@example.com</p>
            </div>
            
            <button 
              onClick={() => { setTab?.('profile'); onNavigate?.('/customer/profile'); }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#666] hover:bg-[#F8F8F6] hover:text-[#222] transition-colors flex items-center gap-3"
            >
              <User className="w-4 h-4" />
              My Profile
            </button>
            <button 
              onClick={() => setTab?.('rewards')}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#666] hover:bg-[#F8F8F6] hover:text-[#222] transition-colors flex items-center gap-3"
            >
              <Heart className="w-4 h-4" />
              Saved Rewards
            </button>
            <button 
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#666] hover:bg-[#F8F8F6] hover:text-[#222] transition-colors flex items-center gap-3"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <div className="h-[1px] bg-[#E6E6E6] my-1" />
            <button 
              onClick={() => {
                // Temporary logout bypass for static demo
                window.location.href = '/';
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#D32F2F] hover:bg-[#FFF0F0] transition-colors flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
