import React, { useState, useEffect } from 'react';
import { NavRoute, OutletsData } from './types';
import {
  MOCK_CUSTOMERS,
  MOCK_CATALOG_ITEMS,
  MOCK_BRANCHES,
  MOCK_AUDIT_LOGS,
  AVAILABLE_BRANCHES
} from './data/mockData';
import { INITIAL_OUTLETS } from './data/outletsData';

// Shell components
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/common/CommandPalette';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { CustomersPage } from './pages/CustomersPage';
import { FableadLandingPage } from './Customer/CustomerLandingPage';
import { CustomerPanel } from './Customer/CustomerPanel';
import { CatalogPage } from './pages/CatalogPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { CampaignBuilderPage } from './pages/CampaignBuilderPage';
import { BranchesPage } from './pages/BranchesPage';
import { AddNewBranchPage } from './pages/AddNewBranchPage';
import { BrandingPage } from './pages/BrandingPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { StaffPage } from './pages/StaffPage';
import { QrCodesPage } from './pages/QrCodesPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { RewardsPage } from './pages/RewardsPage';
import { BillingPage } from './pages/BillingPage';
import { NotificationsPage } from './pages/NotificationsPage';




export default function App() {
  const [currentRoute, setCurrentRouteState] = useState<NavRoute>(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      return '/customer-landing';
    }
    return path as NavRoute;
  });
  const [activeBranch, setActiveBranch] = useState<string>(AVAILABLE_BRANCHES[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Core Mock Datasets
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [catalog, setCatalog] = useState(MOCK_CATALOG_ITEMS);
  const [branches, setBranches] = useState(MOCK_BRANCHES);
  const [auditLogs] = useState(MOCK_AUDIT_LOGS);

  // Outlets Data
  const [outlets, setOutlets] = useState<OutletsData[]>(INITIAL_OUTLETS);
  const [selectedOutletId, setSelectedOutletId] = useState<string>('downtown');
  const [branchList, setBranchList] = useState<string[]>(AVAILABLE_BRANCHES);

  const handleAddOutlet = (newOutlet: OutletsData) => {
    setOutlets((prev) => [newOutlet, ...prev]);
    setSelectedOutletId(newOutlet.id);
    setActiveBranch(newOutlet.shortName);
    if (!branchList.includes(newOutlet.shortName)) {
      setBranchList((prev) => [newOutlet.shortName, ...prev]);
    }
  };



  const handleNavigate = (route: NavRoute) => {
    window.history.pushState({}, '', route);
    setCurrentRouteState(route);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentRouteState((path === '/' || path === '' ? '/customer-landing' : path) as NavRoute);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentRoute === '/customer-landing') {
    return <FableadLandingPage />;
  }

  if (currentRoute === '/customer-panel') {
    return <CustomerPanel onNavigate={(route) => handleNavigate(route as NavRoute)} />;
  }

  // Render auth and onboarding pages directly as standalone
  if (currentRoute === '/login' || currentRoute === '/onboarding') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#1A1615]">
        {currentRoute === '/login' ? (
          <LoginPage onLoginSuccess={(role) => handleNavigate(role === 'merchant' ? '/dashboard' : '/customer-panel')} />
        ) : (
          <OnboardingPage
            onComplete={() => handleNavigate('/dashboard')}
            onCancel={() => handleNavigate('/login')}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAF8F5] text-[#1A1615] font-sans antialiased selection:bg-[#FAF6EE] selection:text-[#A37837] overflow-hidden">
      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ⌘K Global Command Palette */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Persistent Desktop Sidebar (w-[240px]) & Mobile Drawer */}
      <Sidebar
        currentRoute={currentRoute}
        onRouteChange={handleNavigate}
        activeBranch={activeBranch}
        onBranchChange={setActiveBranch}
        branches={branchList}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Viewport (Starts right next to Sidebar, no overlap!) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <Header
          currentRoute={currentRoute}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Page Routing Area */}
        <main className="flex-1 pb-12">
          {currentRoute === '/dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              customers={customers}
              catalog={catalog}
              branches={branches}
            />
          )}

          {currentRoute === '/branches' && (
            <BranchesPage
              onNavigate={handleNavigate}
              onBranchSelect={setActiveBranch}
              outlets={outlets}
              onAddBranch={handleAddOutlet}
              selectedOutletId={selectedOutletId}
              onSelectOutletId={setSelectedOutletId}
            />
          )}

          {currentRoute === '/branches/new' && (
            <AddNewBranchPage
              onNavigate={handleNavigate}
              onAddBranch={handleAddOutlet}
            />
          )}

          {currentRoute === '/staff' && (
            <StaffPage />
          )}

          {currentRoute === '/loyalty' && (
            <LoyaltyPage />
          )}

          {currentRoute === '/qr-codes' && (
            <QrCodesPage />
          )}

          {currentRoute === '/customers' && (
            <CustomersPage
              customers={customers}
              onUpdateCustomer={(updated) => {
                setCustomers((currentCustomers) =>
                  currentCustomers.map((customer) => (customer.id === updated.id ? updated : customer))
                );
              }}
              onAddCustomer={(newCustomer) => {
                setCustomers((currentCustomers) => [newCustomer, ...currentCustomers]);
              }}
            />
          )}

          {currentRoute === '/transactions' && (
            <TransactionsPage />
          )}

          {(currentRoute === '/campaigns' || currentRoute === '/campaigns/new') && (
            <CampaignBuilderPage />
          )}

          {currentRoute === '/rewards' && (
            <RewardsPage />
          )}

          {currentRoute === '/analytics' && (
            <AnalyticsPage />
          )}

          {currentRoute === '/billing' && (
            <BillingPage />
          )}

          {currentRoute === '/notifications' && (
            <NotificationsPage />
          )}

          {currentRoute === '/settings/audit' && (
            <AuditLogPage logs={auditLogs} />
          )}

          {currentRoute === '/settings/branding' && (
            <BrandingPage />
          )}

          {currentRoute === '/catalog' && (
            <CatalogPage
              catalog={catalog}
              onUpdateItem={(updatedItem) => {
                setCatalog((currentCatalog) =>
                  currentCatalog.map((item) => (item.id === updatedItem.id ? updatedItem : item))
                );
              }}
              onAddItem={(newItem) => {
                setCatalog((currentCatalog) => [newItem, ...currentCatalog]);
              }}
            />
          )}


          {
            currentRoute === '/onboarding' && (
              <div className="p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between bg-white p-3 rounded-xl border border-[#EAE6E1]">
                  <span className="text-xs text-[#7C746C]">
                    Viewing Onboarding Wizard inside Merchant Shell
                  </span>
                  <button
                    onClick={() => setStandaloneAuthView(true)}
                    className="text-xs font-bold text-[#A37837] hover:underline"
                  >
                    Open Full-Screen Presentation Mode ↗
                  </button>
                </div>
                <OnboardingPage
                  onComplete={() => handleNavigate('/dashboard')}
                  onCancel={() => handleNavigate('/login')}
                />
              </div>
            )
          }
        </main >
      </div >
    </div >
  );
}
