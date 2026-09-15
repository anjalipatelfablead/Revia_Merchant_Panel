import React, { useState, useEffect } from 'react';
import { Search, X, Store, UserCheck, Coffee, Award, ShieldCheck, BarChart3, Megaphone, ArrowRight } from 'lucide-react';
import { NavRoute } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: NavRoute) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { title: 'Customer Directory & CRM', category: 'CRM & ACTIVITY', route: '/customerlist' as NavRoute, icon: UserCheck },
    { title: 'Loyalty Program Builder & Wallet Passes', category: 'MAIN', route: '/loyalty' as NavRoute, icon: Award },
    { title: 'Item & Product Catalog Management', category: 'CATALOG & ORDERS', route: '/catalog' as NavRoute, icon: Coffee },
    { title: 'Branch & Outlets Network', category: 'MAIN', route: '/branches' as NavRoute, icon: Store },
    { title: 'Campaign Builder (AND/OR Logic)', category: 'CRM & ACTIVITY', route: '/campaigns/add' as NavRoute, icon: Megaphone },
    { title: 'Cohort Retention & Analytics', category: 'INSIGHTS & CONFIG', route: '/analytics' as NavRoute, icon: BarChart3 },
    { title: 'Settings & Security Audit Log (SOC-2)', category: 'INSIGHTS & CONFIG', route: '/settings/audit' as NavRoute, icon: ShieldCheck },
    { title: 'Business Profile & Branding Engine', category: 'INSIGHTS & CONFIG', route: '/settings/branding' as NavRoute, icon: Store },
    { title: 'Merchant Login & Auth Flow', category: 'AUTHENTICATION', route: '/login' as NavRoute, icon: ArrowRight },
    { title: 'Business Onboarding Wizard', category: 'ONBOARDING', route: '/onboarding' as NavRoute, icon: ArrowRight },
  ];

  const filtered = quickActions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#1A1615]/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-[#E5E0D8] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-3 border-b border-[#E5E0D8] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#9E9A93] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search customer, product or jump to page..."
            className="w-full text-sm font-medium text-[#1A1615] placeholder:text-[#9E9A93] focus:outline-hidden bg-transparent"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#6E6A66] hover:bg-[#FAF8F5] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          <div className="px-2 py-1 text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider">
            Navigation & Actions
          </div>
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#6E6A66]">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.route}
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-lg flex items-center justify-between hover:bg-[#FAF8F5] text-xs font-medium text-[#1A1615] group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F] group-hover:border-[#D4A753]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-[10px] text-[#9E9A93] uppercase font-medium">{item.category}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#9E782F] opacity-0 group-hover:opacity-100 font-semibold flex items-center gap-1 transition-opacity">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-[#6E6A66]">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E0D8] rounded text-[10px] font-mono shadow-2xs">ESC</kbd> to exit</span>
          <span className="text-[10px] text-[#9E9A93]">Revia Merchant Fast Navigation</span>
        </div>
      </div>
    </div>
  );
};
