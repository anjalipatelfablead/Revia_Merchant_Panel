import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, ChevronDown, X, Radio } from 'lucide-react';
import { NavRoute } from '../../types';

interface HeaderProps {
  currentRoute: NavRoute;
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
  onNavigate: (route: NavRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onOpenSearch,
  onToggleMobileMenu,
  onNavigate,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Dynamic breadcrumb matching current route and Figma specs
  const getBreadcrumbs = () => {
    switch (currentRoute) {
      case '/branches/new':
        return {
          category: 'Outlets & Infrastructure',
          parentPage: 'Branches',
          parentRoute: '/branches' as NavRoute,
          page: 'Add New Branch'
        };
      case '/branches':
        return { category: 'Outlets & Infrastructure', page: 'Branch Management' };
      case '/staff':
        return { category: 'Team & Security', page: 'Staff & RBAC' };
      case '/loyalty':
        return { category: 'Loyalty Engine', page: 'Loyalty Program Rules' };
      case '/qr-codes':
        return { category: 'Hardware & Beacons', page: 'Dynamic QR Codes' };
      case '/customerlist':
        return { category: 'CRM & Audience', page: 'Customer Directory' };
      case '/transactions':
        return { category: 'POS Ledger', page: 'Transactions' };
      case '/campaigns':
        return { category: 'Growth & Automation', page: 'Campaign & Loyalty Management' };
      case '/campaigns/new':
        return {
          category: 'Growth & Automation',
          parentPage: 'Campaigns',
          parentRoute: '/campaigns' as NavRoute,
          page: 'Campaign Builder'
        };
      case '/rewards':
        return { category: 'Rewards Engine', page: 'Perks Catalog' };
      case '/rewards/new':
        return { category: 'Rewards Catalog', page: 'Create New Reward' };
      case '/analytics':
        return { category: 'Intelligence', page: 'Analytics & Reports' };
      case '/billing':
        return { category: 'Merchant Account', page: 'Wallet & Credits' };
      case '/notifications':
        return { category: 'Activity Stream', page: 'Notifications' };
      case '/settings/audit':
        return { category: 'Governance', page: 'Settings & Audit Log' };
      case '/settings/branding':
        return { category: 'Governance', page: 'Business Profile & Branding' };
      case '/item-catalog':
        return { category: 'Catalog', page: 'Item Catalog' };
      case '/orders':
        return { category: 'Orders', page: 'Order Queue' };
      case '/dashboard':
      default:
        return { category: 'Merchant Portal', page: 'Dashboard Overview' };
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EAE6E1] px-4 lg:px-6 py-2.5 flex items-center gap-4 lg:gap-6">
      {/* Left: Mobile hamburger & Clean Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 rounded-lg border border-[#EAE6E1] text-[#6E6A66] hover:bg-[#FAF8F5] cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Clean Breadcrumbs matching Figma design */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-[#7C746C]">
          <span
            className="hover:text-[#1A1615] cursor-pointer transition-colors"
            onClick={() => onNavigate('/dashboard')}
          >
            Home
          </span>
          <span className="text-[#A8A29E]">&gt;</span>
          <span className="text-[#1A1615] font-semibold">
            {breadcrumbs.page}
          </span>
        </div>
      </div>

      {/* Middle: Removed Search Bar per user request */}
      <div className="flex-1" />

      {/* Right: Scanner Status Pill, Notification Bell, Profile Info */}
      <div className="flex items-center gap-3 ml-auto">

        {/* Notifications Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg text-[#5C554E] hover:bg-[#FAF8F5] relative transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-[#5C554E]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D32F2F] ring-2 ring-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 sm:right-0 mt-2 w-[290px] sm:w-80 bg-white border border-[#EAE6E1] rounded-xl shadow-xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE6E1]">
                <div className="text-xs font-bold text-[#1A1615] flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-[#A37837]" /> Notifications (3 active)
                </div>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[#9E9A93] hover:text-[#1A1615] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1] space-y-0.5">
                  <div className="font-semibold text-[#1A1615] flex items-center justify-between text-[11px]">
                    <span>VIP Stamp Redeemed</span>
                    <span className="text-[10px] text-[#8C827A]">4m ago</span>
                  </div>
                  <p className="text-[11px] text-[#7C746C]">
                    Marcus Vance redeemed stamp #8 at Downtown Flagship.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1] space-y-0.5">
                  <div className="font-semibold text-[#1A1615] flex items-center justify-between text-[11px]">
                    <span>Voucher Claimed</span>
                    <span className="text-[10px] text-[#8C827A]">11m ago</span>
                  </div>
                  <p className="text-[11px] text-[#7C746C]">
                    Elena Rostova claimed Free Cold Brew &amp; Pastry at Northside.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1] space-y-0.5">
                  <div className="font-semibold text-[#1A1615] flex items-center justify-between text-[11px]">
                    <span>Mesh Status Online</span>
                    <span className="text-[10px] text-[#8C827A]">25m ago</span>
                  </div>
                  <p className="text-[11px] text-[#7C746C]">
                    All 12 POS scanner stands operating at 100% telemetry.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNotificationsOpen(false);
                  onNavigate('/settings/audit');
                }}
                className="w-full mt-1 text-center py-1.5 text-[11px] font-semibold text-[#A37837] hover:underline cursor-pointer"
              >
                View Audit Log Trail →
              </button>
            </div>
          )}
        </div>

        {/* User Profile Card: Elena Rostova, Regional Director (matching Figma design) */}
        <div className="relative" ref={profileDropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-1 py-1 pr-1.5 hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#EAE6E1] bg-[#FAF8F5]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-bold text-[#1A1615]">
                Elena Rostova
              </div>
              <div className="text-[10px] text-[#7C746C]">
                General Manager
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C827A] hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-[#EAE6E1] rounded-xl shadow-lg z-50 py-1 text-xs">
              <div className="px-3 py-2 border-b border-[#EAE6E1]">
                <div className="font-bold text-[#1A1615]">Elena Rostova</div>
                <div className="text-[10px] text-[#7C746C]">elena.rostova@bluebottle.com</div>
              </div>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate('/settings/audit');
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#3D3732] cursor-pointer"
              >
                Merchant Profile
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate('/branches');
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#3D3732] cursor-pointer"
              >
                Branch Management
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate('/staff');
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#3D3732] cursor-pointer"
              >
                Manage Staff &amp; RBAC
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate('/settings/audit');
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#3D3732] cursor-pointer"
              >
                Security &amp; Audit Log
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate('/login');
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] text-[#D32F2F] font-semibold border-t border-[#EAE6E1] cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
