import React, { useState } from 'react';
import {
  Home,
  QrCode,
  UtensilsCrossed,
  ReceiptText,
  Ticket,
  CreditCard,
  Star,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Package,
  ShoppingBag,
  MapPin,
  Coffee,
  Settings
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

type TabType = 'home' | 'scan' | 'menu' | 'orders' | 'coupons' | 'membership' | 'offers' | 'profile';

export const CustomerPanel: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeCategory, setActiveCategory] = useState('All Curations');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'scan', label: 'Scan QR', icon: QrCode, badge: { text: 'Table', style: 'bg-[#EAE6E1] text-[#5C544E]' } },
    { id: 'menu', label: 'Menu / Order', icon: UtensilsCrossed, badge: { text: 'Fresh', style: 'bg-[#98f5c7] text-[#0d7a53]' } },
    { id: 'orders', label: 'My Orders', icon: ReceiptText, badge: { text: '2', style: 'bg-[#EAE6E1] text-[#5C544E]' } },
    { id: 'coupons', label: 'Coupons', icon: Ticket, badge: { text: '4', style: 'bg-[#F2EDDF] text-[#A37837]' } },
    { id: 'membership', label: 'Membership Cards', icon: CreditCard, badge: null },
    { id: 'offers', label: 'Offers', icon: Star, badge: { dot: true } },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1615]">Welcome back, Julian!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[20px] border border-[#EAE6E1] shadow-sm">
                <div className="w-12 h-12 bg-[#F6EFEA] rounded-2xl flex items-center justify-center mb-4 text-[#A37837]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-[#5C544E] mb-1">Membership Tier</p>
                <p className="text-2xl font-bold text-[#1A1615]">Reserve VIP</p>
              </div>
              <div className="bg-white p-6 rounded-[20px] border border-[#EAE6E1] shadow-sm">
                <div className="w-12 h-12 bg-[#E6F4ED] rounded-2xl flex items-center justify-center mb-4 text-[#0D7A53]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-[#5C544E] mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-[#1A1615]">24</p>
              </div>
              <div className="bg-white p-6 rounded-[20px] border border-[#EAE6E1] shadow-sm">
                <div className="w-12 h-12 bg-[#F3E8FF] rounded-2xl flex items-center justify-center mb-4 text-[#9333EA]">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-[#5C544E] mb-1">Points Balance</p>
                <p className="text-2xl font-bold text-[#1A1615]">2,450 pts</p>
              </div>
            </div>
            <div className="bg-white rounded-[20px] border border-[#EAE6E1] shadow-sm overflow-hidden mt-8">
              <div className="p-6 border-b border-[#EAE6E1]">
                <h3 className="text-lg font-bold text-[#1A1615]">Recent Activity</h3>
              </div>
              <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F6EFEA] rounded-xl flex items-center justify-center shrink-0 text-[#A37837]">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1615]">Hacienda La Esmeralda Geisha</p>
                    <p className="text-xs text-[#7C746C]">Order #REV-8924 • Delivered</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#1A1615]">£28.00</p>
                  <p className="text-xs text-[#7C746C]">Oct 12</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[#1A1615] mb-2 tracking-tight">Atelier Menu</h1>
              <p className="text-[#5C544E] text-sm">Explore micro-lot extractions and tableside culinary courses.</p>
            </header>
            <div className="flex flex-col xl:flex-row gap-8">
              <aside className="w-full xl:w-60 shrink-0 space-y-2">
                {['All Curations', 'Rare Micro-Lots', 'Sommelier Allocations', 'Savory Courses'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-[#1A1615] text-white font-bold shadow-md' : 'bg-white border border-[#EAE6E1] text-[#5C544E] hover:border-[#1A1615]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </aside>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Item 1 */}
                <div className="bg-white rounded-2xl border border-[#EAE6E1] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                  <div className="h-48 relative bg-gray-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800" alt="Coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-white text-[#1A1615] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-md">Lot #109</div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[#A37837] text-[10px] font-bold uppercase tracking-widest mb-1">Panama • 1,750m</p>
                        <h3 className="text-base font-bold text-[#1A1615]">La Esmeralda Geisha</h3>
                      </div>
                      <p className="text-base font-bold text-[#1A1615]">£28.00</p>
                    </div>
                    <p className="text-sm text-[#5C544E] mb-6 flex-1 leading-relaxed">Bergamot, Wild Peach, Honey, White Jasmine Blossom.</p>
                    <button className="w-full bg-[#1A1615] hover:bg-[#3A3432] text-white py-3 rounded-xl text-sm font-bold transition-colors">
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1615]">My Orders</h2>
            <div className="bg-white rounded-[20px] border border-[#EAE6E1] shadow-sm overflow-hidden">
              <div className="divide-y divide-[#EAE6E1]">
                {[
                  { id: 'REV-8924', date: 'Oct 12, 2026', items: 'Hacienda La Esmeralda Geisha (1)', total: '£28.00', status: 'Delivered', color: 'bg-green-100 text-green-800' },
                  { id: 'REV-8810', date: 'Sep 28, 2026', items: '2015 Romanée-Conti Échezeaux (1 Pour)', total: '£95.00', status: 'Consumed In-House', color: 'bg-blue-100 text-blue-800' },
                ].map(order => (
                  <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-sm font-bold text-[#1A1615]">{order.id}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${order.color}`}>{order.status}</span>
                      </div>
                      <p className="text-sm text-[#5C544E] mb-1">{order.items}</p>
                      <p className="text-xs text-[#7C746C]">{order.date}</p>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                      <p className="text-lg font-bold text-[#1A1615]">{order.total}</p>
                      <button className="text-sm font-bold text-[#A37837] hover:underline flex items-center gap-1">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-2xl">
            <h2 className="text-3xl font-bold text-[#1A1615]">Profile Details</h2>
            <div className="bg-white rounded-[20px] border border-[#EAE6E1] shadow-sm p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#7C746C] uppercase tracking-wider mb-2">First Name</label>
                    <input type="text" defaultValue="Julian" className="w-full bg-gray-50 border border-[#EAE6E1] rounded-xl px-4 py-3 text-sm text-[#1A1615] focus:outline-hidden focus:border-[#1A1615]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#7C746C] uppercase tracking-wider mb-2">Last Name</label>
                    <input type="text" defaultValue="Vance" className="w-full bg-gray-50 border border-[#EAE6E1] rounded-xl px-4 py-3 text-sm text-[#1A1615] focus:outline-hidden focus:border-[#1A1615]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#7C746C] uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" defaultValue="julian.vance@example.com" className="w-full bg-gray-50 border border-[#EAE6E1] rounded-xl px-4 py-3 text-sm text-[#1A1615] focus:outline-hidden focus:border-[#1A1615]" />
                </div>
                <div className="pt-6 mt-6 border-t border-[#EAE6E1] flex justify-end">
                  <button type="button" className="bg-[#1A1615] hover:bg-[#3A3432] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-[#EAE6E1] rounded-3xl text-[#7C746C] animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl">
            <h3 className="text-xl font-bold text-[#1A1615] mb-2">Coming Soon</h3>
            <p className="text-sm">This section is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1615] font-sans selection:bg-[#FAF6EE] selection:text-[#A37837]">
      {/* Simple Top Navigation */}
      <nav className="bg-white border-b border-[#EAE6E1] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate?.('/customer-landing')}
          >
            <span className="text-lg font-bold tracking-[0.2em] text-[#1A1615] uppercase">REVIA</span>
          </div>

          <button
            onClick={() => onNavigate?.('/customer-landing')}
            className="text-xs font-bold text-[#7C746C] hover:text-[#1A1615] uppercase tracking-widest flex items-center gap-1.5 transition-colors bg-gray-50 px-4 py-2 rounded-full"
          >
            Back to Store <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-12">

        {/* Left Navigation Sidebar - Exact Match to Screenshot */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="sticky top-24">

            {/* Tier Status Box */}
            <div className="bg-[#F6EFEA] rounded-[20px] p-5 flex items-center justify-between mb-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#D4B58A] bg-white flex items-center justify-center text-[#A37837] shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7C746C] uppercase tracking-widest leading-none mb-1.5">Tier Status</p>
                  <p className="text-sm font-bold text-[#1A1615] leading-none">Reserve VIP</p>
                </div>
              </div>
              <span className="bg-white text-[#8A652E] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                2,450 pts
              </span>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center justify-between px-3 py-3.5 rounded-2xl text-[15px] transition-all group ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#1A1615]' : 'text-[#4A4442] group-hover:text-[#1A1615] stroke-[1.5]'}`} />
                      <span className={`${isActive ? 'font-bold text-[#1A1615]' : 'font-medium text-[#4A4442] group-hover:text-[#1A1615]'}`}>
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      item.badge.dot ? (
                        <div className="w-2 h-2 rounded-full bg-[#E53E3E] mr-2"></div>
                      ) : (
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide ${item.badge.style}`}>
                          {item.badge.text}
                        </span>
                      )
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Dynamic Content */}
        <main className="flex-1 min-w-0 pb-20">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};
