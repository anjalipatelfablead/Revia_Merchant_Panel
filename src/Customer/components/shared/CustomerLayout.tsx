import React, { useState } from 'react';
import { Home, Scan, Utensils, ReceiptText, Ticket, CreditCard, Zap, User, ChevronLeft, Bell, X } from 'lucide-react';
import { MainTab } from '../../types';
import { MOCK_BUSINESS } from '../../data/mockData';
import { BottomNav } from './BottomNav';
import { CustomerDashboardHeader } from './CustomerDashboardHeader';
import { DesktopSidebar } from './DesktopSidebar';

export const CustomerLayout = ({ tab, setTab, title, showBack, onBack, children, onNavigateApp }: {
  tab: MainTab; setTab: (t: MainTab) => void; title?: string; showBack?: boolean;
  onBack?: () => void; children: React.ReactNode; onNavigateApp?: (route: string) => void;
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const tabs: { id: MainTab; label: string; Icon: React.ElementType; badge?: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', Icon: Home },
    // { id: 'scan', label: 'Scan QR', Icon: Scan, badge: <span className="bg-[#EBE7E0] text-[#666] text-[10px] font-bold px-2 py-0.5 rounded-full">Table</span> },
    { id: 'menu', label: 'Menu / Order', Icon: Utensils, badge: <span className="bg-[#94F1C6] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full">Fresh</span> },
    { id: 'orders', label: 'My Orders', Icon: ReceiptText, badge: <span className="bg-[#F8F8F6] border border-[#E6E6E6] text-[#666] text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span> },
    { id: 'coupons', label: 'Coupons', Icon: Ticket, badge: <span className="bg-[#FFF8ED] border border-[#F5DEB3] text-[#C89B3C] text-[10px] font-bold px-1.5 py-0.5 rounded-full">4</span> },
    { id: 'membership', label: 'Membership Cards', Icon: CreditCard },
    { id: 'offers', label: 'Offers', Icon: Zap, badge: <div className="w-2 h-2 rounded-full bg-[#D32F2F]" /> },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <DesktopSidebar 
        tabs={tabs} 
        activeTab={tab} 
        setTab={setTab} 
        onNavigateApp={onNavigateApp} 
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        <CustomerDashboardHeader 
          onNavigate={onNavigateApp} 
          onMenuClick={() => setIsMobileDrawerOpen(true)}
          tabs={tabs}
          activeTab={tab}
          setTab={setTab}
        />

      {/* Mobile Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileDrawerOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl animate-in slide-in-from-left duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsMobileDrawerOpen(false)}
              >
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-4 gap-3">
                <div className="w-8 h-8 bg-[#C89B3C] rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-black text-lg leading-none">R</span>
                </div>
                <span className="text-xl font-black tracking-[0.2em] uppercase text-[#222]">REVIA</span>
              </div>
              <nav className="px-3 mt-8 space-y-1">
                {tabs.map(t => {
                  const isActive = tab === t.id;
                  return (
                    <button key={t.id} onClick={() => { setTab(t.id); setIsMobileDrawerOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all ${isActive ? 'bg-[#C89B3C]/10 text-[#C89B3C] font-black' : 'text-[#666] font-bold hover:bg-[#F8F8F6] hover:text-[#222]'}`}>
                      <div className="flex items-center gap-3">
                        <t.Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                        <span>{t.label}</span>
                      </div>
                      {t.badge && <div>{t.badge}</div>}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

        {/* Content */}
        <div className="flex-1 w-full mx-auto px-4 md:px-8 py-5 pb-28 md:pb-12 max-w-[1440px]">
          {showBack && (
            <button onClick={onBack} className="mb-4 w-8 h-8 rounded-xl bg-white border border-[#E6E6E6] flex items-center justify-center shadow-sm hover:bg-[#F8F8F6] transition-colors">
              <ChevronLeft className="w-4 h-4 text-[#222]" />
            </button>
          )}
          {children}
        </div>

        {/* Bottom Nav (Mobile only) */}
        <div className="md:hidden">
          <BottomNav active={tab} onChange={setTab} />
        </div>
      </div>
    </div>
  );
};
