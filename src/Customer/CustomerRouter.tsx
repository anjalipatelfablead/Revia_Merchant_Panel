import React from 'react';
import { CustomerProvider, useCustomer } from './CustomerContext';

// Shared Components
import { CustomerLayout } from './components/shared/CustomerLayout';
import { ErrorState } from './components/ui/States';

import { CustomerWizard } from './screens/pre-auth/CustomerWizard';

// Post-auth Screens
import { HomeScreen } from './screens/post-auth/HomeScreen';
import { CustomerScanScreen } from './screens/post-auth/CustomerScanScreen';
import { CustomerMenuScreen } from './screens/post-auth/CustomerMenuScreen';
import { OffersScreen } from './screens/post-auth/OffersScreen';
import { RewardsScreen } from './screens/post-auth/RewardsScreen';
import { RewardDetailScreen } from './screens/post-auth/RewardDetailScreen';
import { RedemptionScreen } from './screens/post-auth/RedemptionScreen';
import { RedemptionSuccessScreen } from './screens/post-auth/RedemptionSuccessScreen';
import { MembershipScreen } from './screens/post-auth/MembershipScreen';
import { HistoryScreen } from './screens/post-auth/HistoryScreen';
import { OrdersScreen } from './screens/post-auth/OrdersScreen';
import { CheckoutScreen } from './screens/post-auth/CheckoutScreen';
import { PrivacyScreen } from './screens/post-auth/PrivacyScreen';
import { ProfileScreen } from './screens/post-auth/ProfileScreen';
import { ProductDetailScreen } from './screens/post-auth/ProductDetailScreen';
import { MOCK_BUSINESS } from './data/mockData';

interface Props {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

import { MainTab } from './types';

const CustomerRoutesInner: React.FC<Props> = ({ currentRoute, onNavigate }) => {
  const {
    isAuthenticated, setIsAuthenticated,
    mobile, setMobile,
    isExistingMember,
    cartItems, addItem, updateQuantity, subtotal, tax, total,
    selectedOffer, setSelectedOffer,
    selectedReward, setSelectedReward,
    selectedProduct, setSelectedProduct
  } = useCustomer();

  const subRoute = currentRoute.split('/').filter(Boolean)[1] || 'identify';

  const navigateTo = (path: string) => {
    onNavigate('/customer/' + path);
  };

  const isPostAuthRoute = ['dashboard', 'scan', 'menu', 'orders', 'coupons', 'membership', 'offers', 'rewards', 'history', 'profile', 'checkout', 'product'].includes(subRoute);

  // Sync auth state based on route access if necessary, or just rely on the route string
  React.useEffect(() => {
    if (isPostAuthRoute && !isAuthenticated) {
      // For now allow it or set true since we are mock
      setIsAuthenticated(true);
    }
  }, [isPostAuthRoute, isAuthenticated, setIsAuthenticated]);

  if (!isPostAuthRoute) {

    return <CustomerWizard onComplete={() => { setIsAuthenticated(true); navigateTo('dashboard'); }} />;

    // return <CustomerWizard onComplete={() => { setIsAuthenticated(true); navigateTo('menu'); }} />;

    // return <CustomerWizard onComplete={() => { setIsAuthenticated(true); navigateTo('menu'); }} />;
  }

  const activeTab = subRoute as MainTab;

  // Handle overlay screens
  if (subRoute === 'redemption-success' || subRoute === 'redemption' || subRoute === 'reward-detail') {
    // Legacy sub-routes redirect cleanly to coupons / rewards tab
    return (
      <CustomerLayout tab={'coupons'} setTab={navigateTo as any} title="My Rewards" onNavigateApp={onNavigate} cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}>
        <RewardsScreen selectedId={selectedReward} setSelectedId={setSelectedReward} />
      </CustomerLayout>
    );
  }

  const getTitle = () => {
    if (subRoute === 'privacy') return 'Privacy & Data';
    if (subRoute === 'offers' && selectedOffer) return 'Offer Detail';
    if (subRoute === 'product' && selectedProduct) return 'Item Details';
    const titles: Record<string, string> = { dashboard: MOCK_BUSINESS.name, scan: 'Scan QR', menu: 'Menu / Order', orders: 'My Orders', coupons: 'My Rewards', membership: 'Membership Cards', offers: 'Offers', rewards: 'My Rewards', history: 'Activity', profile: 'My Profile', checkout: 'Checkout' };
    return titles[activeTab] || 'Revia';
  };

  const showBack = subRoute === 'privacy' || (subRoute === 'offers' && !!selectedOffer) || subRoute === 'product';

  return (
    <CustomerLayout
      tab={activeTab}
      setTab={(t) => {
        setSelectedOffer(null);
        setSelectedReward(null);
        navigateTo(t);
      }}
      title={getTitle()}
      showBack={showBack}
      onBack={() => {
        if (subRoute === 'privacy') navigateTo('profile');
        else if (subRoute === 'product') navigateTo('menu');
        else navigateTo('dashboard');
      }}
      onNavigateApp={onNavigate}
      cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    >
      {subRoute === 'privacy' ? (
        <PrivacyScreen onBack={() => navigateTo('profile')} />
      ) : activeTab === 'dashboard' ? (
        <HomeScreen setTab={navigateTo as any} setSelectedOffer={id => { setSelectedOffer(id); navigateTo('offers'); }} setSelectedReward={id => { setSelectedReward(id); navigateTo('coupons'); }} />
      ) : activeTab === 'scan' ? (
        <CustomerScanScreen />
      ) : activeTab === 'menu' ? (
        <CustomerMenuScreen
          setTab={navigateTo as any}
          cartItems={cartItems}
          addItem={addItem}
          updateQuantity={updateQuantity}
          onProductClick={(id) => { setSelectedProduct(id); navigateTo('product'); }}
        />
      ) : activeTab === 'product' && selectedProduct ? (
        <ProductDetailScreen
          productId={selectedProduct}
          onBack={() => { setSelectedProduct(null); navigateTo('menu'); }}
          addItem={addItem}
        />
      ) : activeTab === 'offers' ? (
        <OffersScreen type="offers" selectedId={selectedOffer} setSelectedId={setSelectedOffer} />
      ) : activeTab === 'coupons' || activeTab === 'rewards' ? (
        <RewardsScreen selectedId={selectedReward} setSelectedId={setSelectedReward} />
      ) : activeTab === 'membership' ? (
        <MembershipScreen />
      ) : activeTab === 'orders' ? (
        <OrdersScreen />
      ) : activeTab === 'history' ? (
        <HistoryScreen />
      ) : activeTab === 'profile' ? (
        <ProfileScreen onPrivacy={() => navigateTo('privacy')} onNavigateApp={onNavigate} />
      ) : activeTab === 'checkout' ? (
        <CheckoutScreen
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onSuccess={() => {
            cartItems.forEach(item => updateQuantity(item.id, -item.quantity));
            navigateTo('orders');
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[#F8F8F6] rounded-2xl flex items-center justify-center mb-4 border border-[#E6E6E6]">
            <span className="text-[#ccc] text-2xl">?</span>
          </div>
          <h2 className="text-xl font-black text-[#222] mb-2">{getTitle()}</h2>
          <p className="text-[#666] text-sm">This section is coming soon.</p>
        </div>
      )}
    </CustomerLayout>
  );
};

export const CustomerRouter: React.FC<Props> = (props) => {
  return (
    <CustomerProvider>
      <CustomerRoutesInner {...props} />
    </CustomerProvider>
  );
};
