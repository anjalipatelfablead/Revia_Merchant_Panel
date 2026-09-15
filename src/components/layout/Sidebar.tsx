import React, { useState } from 'react';
import {
  LayoutDashboard,
  Store,
  Users,
  Star,
  QrCode,
  Receipt,
  Megaphone,
  Gift,
  BarChart2,
  CreditCard,
  Bell,
  ShieldCheck,
  Award,
  Plus,
  Package,
  ClipboardList,
  ScanLine
} from 'lucide-react';
import { NavRoute } from '../../types';

interface SidebarProps {
  currentRoute: NavRoute;
  onRouteChange: (route: NavRoute) => void;
  activeBranch: string;
  onBranchChange: (branch: string) => void;
  branches: string[];
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  name: string;
  route: NavRoute;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  activeBranch,
  onBranchChange,
  branches,
  isMobileOpen = false,
  onMobileClose,
}) => {
  // Navigation groups matching Figma design screenshot exactly
  const navigationGroups: NavGroup[] = [
    {
      label: 'MAIN',
      items: [
        { name: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
        { name: 'Branches', route: '/branches', icon: Store },
        { name: 'Staff & RBAC', route: '/staff', icon: ShieldCheck },
        { name: 'Loyalty Program', route: '/loyalty', icon: Gift },
        { name: 'QR Codes', route: '/qr-codes', icon: QrCode },
      ],
    },
    {
      label: 'CATALOG & ORDERS',
      items: [
        { name: 'Item Catalog', route: '/item-catalog', icon: Package },
        { name: 'Order Queue', route: '/orders', icon: ClipboardList },
      ],
    },
    {
      label: 'CRM & ACTIVITY',
      items: [
        { name: 'Customers', route: '/customerlist', icon: Users },
        { name: 'Transactions', route: '/transactions', icon: Receipt },
        { name: 'Campaigns', route: '/campaigns/new', icon: Megaphone },
        { name: 'Redemption Terminal', route: '/terminal', icon: ScanLine },
        { name: 'Rewards', route: '/rewards', icon: Award },
      ],
    },
    {
      label: 'INSIGHTS & CONFIG',
      items: [
        { name: 'Analytics & Reports', route: '/analytics', icon: BarChart2 },
        { name: 'Subscription & Billing', route: '/billing', icon: CreditCard },
        { name: 'Notifications', route: '/notifications', icon: Bell },
        { name: 'Settings & Audit Log', route: '/settings/audit', icon: ShieldCheck },
        { name: 'Business Profile & Branding', route: '/settings/branding', icon: Store },
      ],
    },
  ];

  return (
    <aside
      className={`
        bg-white border-r border-[#EAE6E1] flex flex-col shrink-0 h-screen transition-all duration-200 z-50
        lg:static lg:w-[240px] lg:translate-x-0
        ${isMobileOpen
          ? 'fixed inset-y-0 left-0 w-[260px] translate-x-0 shadow-2xl'
          : 'fixed inset-y-0 left-0 w-[260px] -translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Brand Header */}
      <div className="p-4 pb-3 border-b border-[#EAE6E1]/70">
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => onRouteChange('/dashboard')}
        >
          {/* Gold squircle emblem matching screenshot */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D4A753] to-[#9E782F] flex items-center justify-center text-white shadow-xs">
            <Award className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wider text-[#1A1615] font-sans">
              REVIA
            </div>
            <div className="text-[9px] uppercase tracking-widest text-[#8C827A] font-bold font-sans">
              MERCHANT SUITE
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links Area */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-0.5">
        {navigationGroups.map((group) => (
          <React.Fragment key={group.label}>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                currentRoute === item.route ||
                (item.route === '/branches' && currentRoute === '/branches/new') ||
                (item.route === '/campaigns/new' && currentRoute === '/campaigns');

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onRouteChange(item.route);
                    if (onMobileClose) onMobileClose();
                  }}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-[13px] transition-all duration-150 cursor-pointer whitespace-nowrap ${isActive
                      ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white font-bold shadow-xs'
                      : 'bg-transparent text-[#4A433D] hover:bg-[#FAF8F5] hover:text-[#1A1615] font-medium'
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-nowrap">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#6E6A66]'}`} />
                    <span className="whitespace-nowrap tracking-tight font-sans">{item.name}</span>
                  </div>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Footer Status matching Figma: ● v2.14.0-prod  LIVE */}
      <div className="p-3 border-t border-[#EAE6E1] bg-white">
        <div className="px-2.5 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#7C746C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span>v2.14.0-prod</span>
          </div>
          <span className="bg-[#EBF7F0] text-[#15803D] font-bold text-[10px] px-2 py-0.5 rounded-sm tracking-wider">
            LIVE
          </span>
        </div>
      </div>
    </aside>
  );
};
