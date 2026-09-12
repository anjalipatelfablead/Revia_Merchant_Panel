import React from 'react';
import { Home, Scan, Utensils, ReceiptText, Ticket, CreditCard, Zap, User, ChevronLeft, Bell } from 'lucide-react';
import { MainTab } from '../../types';
import { MOCK_BUSINESS } from '../../data/mockData';
import { BottomNav } from './BottomNav';
import { CustomerHeader } from './CustomerHeader';
import { CustomerFooter } from './CustomerFooter';

export const CustomerLayout = ({ tab, setTab, title, showBack, onBack, children, onNavigateApp }: {
  tab: MainTab; setTab: (t: MainTab) => void; title?: string; showBack?: boolean;
  onBack?: () => void; children: React.ReactNode; onNavigateApp?: (route: string) => void;
}) => {
  const tabs: { id: MainTab; label: string; Icon: React.ElementType; badge?: React.ReactNode }[] = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'scan', label: 'Scan QR', Icon: Scan, badge: <span className="bg-[#EBE7E0] text-[#666] text-[10px] font-bold px-2 py-0.5 rounded-full">Table</span> },
    { id: 'menu', label: 'Menu / Order', Icon: Utensils, badge: <span className="bg-[#94F1C6] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full">Fresh</span> },
    { id: 'orders', label: 'My Orders', Icon: ReceiptText, badge: <span className="bg-[#F8F8F6] border border-[#E6E6E6] text-[#666] text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span> },
    { id: 'coupons', label: 'Coupons', Icon: Ticket, badge: <span className="bg-[#FFF8ED] border border-[#F5DEB3] text-[#C89B3C] text-[10px] font-bold px-1.5 py-0.5 rounded-full">4</span> },
    { id: 'membership', label: 'Membership Cards', Icon: CreditCard },
    { id: 'offers', label: 'Offers', Icon: Zap, badge: <div className="w-2 h-2 rounded-full bg-[#D32F2F]" /> },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex flex-col pt-[70px]">
      <CustomerHeader onNavigate={onNavigateApp} />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex w-64 bg-white border-r border-[#E6E6E6] flex-col sticky shrink-0" style={{ top: '70px', height: 'calc(100vh - 70px)' }}>
          <div className="h-20 flex items-center gap-3 px-6 border-b border-[#E6E6E6]">
            <div className="w-10 h-10 bg-[#C89B3C] rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-black text-sm">GC</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-black text-[#222] truncate">{MOCK_BUSINESS.name}</p>
              <p className="text-[10px] text-[#999] truncate">{MOCK_BUSINESS.branch}</p>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {tabs.map(t => {
              const isActive = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
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
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          {/* Content */}
          <div className="flex-1 max-w-lg md:max-w-none mx-auto md:mx-0 w-full px-4 md:px-8 py-5 pb-28 md:pb-12">
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
      <CustomerFooter onNavigate={onNavigateApp} />
    </div>
  );
};
