import React from 'react';
import { CustomerProvider, useCustomer } from './CustomerContext';

// Shared Components
import { CustomerLayout } from './components/shared/CustomerLayout';
import { ErrorState } from './components/ui/States';

// Pre-auth Screens
import { QRScreen } from './screens/pre-auth/QRScreen';
import { QRLoadingScreen } from './screens/pre-auth/QRLoadingScreen';
import { MobileScreen } from './screens/pre-auth/MobileScreen';
import { OTPScreen } from './screens/pre-auth/OTPScreen';
import { MemberStatusScreen } from './screens/pre-auth/MemberStatusScreen';
import { ProfileFormScreen } from './screens/pre-auth/ProfileFormScreen';
import { CurateExperienceScreen } from './screens/pre-auth/CurateExperienceScreen';
import { JoinLoyaltyScreen } from './screens/pre-auth/JoinLoyaltyScreen';

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
import { CheckoutScreen } from './screens/post-auth/CheckoutScreen';
import { PrivacyScreen } from './screens/post-auth/PrivacyScreen';
import { ProfileScreen } from './screens/post-auth/ProfileScreen';
import { ProductDetailScreen } from './screens/post-auth/ProductDetailScreen';
import { MOCK_BUSINESS } from './data/mockData';

interface Props {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

type MainTab = 'dashboard' | 'scan' | 'menu' | 'orders' | 'coupons' | 'membership' | 'offers' | 'rewards' | 'history' | 'profile' | 'checkout' | 'product';

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

  const subRoute = currentRoute.split('/').filter(Boolean)[1] || 'qr';
  
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

  if (!isAuthenticated && !isPostAuthRoute) {
    if (subRoute === 'qr') return <QRScreen onNext={() => navigateTo('qr-loading')} />;
    if (subRoute === 'qr-loading') return <QRLoadingScreen onDone={() => navigateTo('mobile')} />;
    if (subRoute === 'qr-error') return (
      <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
        <div className="w-full max-w-[400px] bg-[#F8F8F6] min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
          <ErrorState title="QR Code Unavailable" desc="This QR code is no longer active. Please try a different code." onRetry={() => navigateTo('qr')} />
        </div>
      </div>
    );
    if (subRoute === 'mobile') return <MobileScreen onNext={m => { setMobile(m); navigateTo('otp'); }} />;
    if (subRoute === 'otp') return <OTPScreen mobile={mobile} onVerify={() => onNavigate('/customer/onboarding')} onBack={() => navigateTo('mobile')} />;
    if (subRoute === 'curate-experience') return <CurateExperienceScreen onConfirm={() => navigateTo('dashboard')} />;
    if (subRoute === 'profile-form') return <ProfileFormScreen isNew={!isExistingMember} onContinue={() => { if (isExistingMember) { setIsAuthenticated(true); navigateTo('dashboard'); } else navigateTo('join-loyalty'); }} />;
    if (subRoute === 'join-loyalty') return <JoinLoyaltyScreen onJoined={() => { setIsAuthenticated(true); navigateTo('dashboard'); }} />;
    
    // Default fallback
    return <QRScreen onNext={() => navigateTo('qr-loading')} />;
  }

  const activeTab = subRoute as MainTab;

  // Handle overlay screens
  if (subRoute === 'redemption-success' && selectedReward) {
    return <RedemptionSuccessScreen rewardId={selectedReward} onDone={() => { setSelectedReward(null); navigateTo('history'); }} />;
  }
  
  if (subRoute === 'redemption' && selectedReward) {
    return <RedemptionScreen rewardId={selectedReward} onClose={() => navigateTo('rewards')} onRedeemed={() => { navigateTo('redemption-success'); }} />;
  }

  if (selectedReward && activeTab === 'rewards' && subRoute === 'reward-detail') {
    return (
      <CustomerLayout tab={'rewards'} setTab={navigateTo as any} title="Reward Detail" showBack onBack={() => navigateTo('rewards')}>
        <RewardDetailScreen rewardId={selectedReward} onBack={() => navigateTo('rewards')} onShowQR={() => navigateTo('redemption')} />
      </CustomerLayout>
    );
  }

  const getTitle = () => {
    if (subRoute === 'privacy') return 'Privacy & Data';
    if (subRoute === 'offers' && selectedOffer) return 'Offer Detail';
    if (subRoute === 'product' && selectedProduct) return 'Item Details';
    const titles: Record<string, string> = { dashboard: MOCK_BUSINESS.name, scan: 'Scan QR', menu: 'Menu / Order', orders: 'My Orders', coupons: 'Coupons', membership: 'Membership Cards', offers: 'Offers', rewards: 'Rewards Wallet', history: 'Activity', profile: 'My Profile', checkout: 'Checkout' };
    return titles[activeTab] || 'Revia';
  };

  const showBack = subRoute === 'privacy' || (subRoute === 'offers' && !!selectedOffer) || subRoute === 'product' || subRoute === 'reward-detail';

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
        else if (subRoute === 'reward-detail') navigateTo('rewards');
        else navigateTo('dashboard');
      }}
      onNavigateApp={onNavigate}
      cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    >
      {subRoute === 'privacy' ? (
        <PrivacyScreen onBack={() => navigateTo('profile')} />
      ) : activeTab === 'dashboard' ? (
        <HomeScreen setTab={navigateTo as any} setSelectedOffer={id => { setSelectedOffer(id); navigateTo('offers'); }} setSelectedReward={id => { setSelectedReward(id); navigateTo('reward-detail'); }} />
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
      ) : activeTab === 'offers' || activeTab === 'coupons' ? (
        <OffersScreen type={activeTab as 'offers' | 'coupons'} selectedId={selectedOffer} setSelectedId={setSelectedOffer} />
      ) : activeTab === 'membership' ? (
        <MembershipScreen />
      ) : activeTab === 'rewards' ? (
        <RewardsScreen selectedId={selectedReward} setSelectedId={(id) => { setSelectedReward(id); navigateTo(id ? 'reward-detail' : 'rewards'); }} />
      ) : activeTab === 'history' || activeTab === 'orders' ? (
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
