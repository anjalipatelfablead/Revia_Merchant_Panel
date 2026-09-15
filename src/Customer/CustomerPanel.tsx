import React, { useState } from 'react';
import { Scan } from 'lucide-react';
import { MainTab } from './types';
import { MOCK_BUSINESS } from './data/mockData';

// Shared Components
import { CustomerLayout } from './components/shared/CustomerLayout';
import { CustomerHeader } from './components/shared/CustomerHeader';
import { CustomerFooter } from './components/shared/CustomerFooter';
import { ErrorState } from './components/ui/States';
// Additional imports for cart functionality
import { useCart } from './hooks/useCart';
import { CustomerCartOverlay } from './components/shared/CustomerCartOverlay';

// Pre-auth Screens
import { QRScreen } from './screens/pre-auth/QRScreen';
import { QRLoadingScreen } from './screens/pre-auth/QRLoadingScreen';
import { WelcomeScreen } from './screens/pre-auth/WelcomeScreen';
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

interface Props {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

type PreScreen = 'qr' | 'qr-loading' | 'qr-error' | 'welcome' | 'mobile' | 'otp' | 'curate-experience' | 'member-status' | 'profile-form' | 'join-loyalty';

export const CustomerPanel: React.FC<Props> = ({ currentRoute, onNavigate }) => {
  // Parse initial route
  const subRoute = currentRoute?.split('/').filter(Boolean)[1] || 'qr';

  // Pre-auth state
  const [preScreen, setPreScreen] = useState<PreScreen>(subRoute as PreScreen);
  const isPostAuthRoute = ['dashboard', 'scan', 'menu', 'orders', 'coupons', 'membership', 'offers', 'rewards', 'history', 'profile', 'checkout'].includes(subRoute);
  const [isAuthenticated, setIsAuthenticated] = useState(isPostAuthRoute);
  const [isExistingMember] = useState(true);
  const [mobile, setMobile] = useState('');
  // Active tab for post-auth navigation
  const [activeTab, setActiveTab] = useState<MainTab>((subRoute as MainTab) || 'dashboard');

  // Post-auth state
  const { cartItems, addItem, updateQuantity, subtotal, tax, total } = useCart();
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showRedemption, setShowRedemption] = useState(false);
  const [showRedemptionSuccess, setShowRedemptionSuccess] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Sync state to URL when changed programmatically
  const navigateTo = (path: string) => {
    onNavigate?.('/customer/' + path);
  };

  const handleSetPreScreen = (screen: PreScreen) => {
    setPreScreen(screen);
    navigateTo(screen);
  };

  const handleSetActiveTab = (tab: MainTab) => {
    setActiveTab(tab);
    navigateTo(tab);
  };

  // Sync URL changes back to state (e.g. back button)
  React.useEffect(() => {
    const sr = currentRoute?.split('/').filter(Boolean)[1];
    if (sr) {
      if (!isAuthenticated) setPreScreen(sr as PreScreen);
      else setActiveTab(sr as MainTab);
    }
  }, [currentRoute, isAuthenticated]);

  // Pre-auth flow
  if (!isAuthenticated) {
    const renderPreScreen = () => {
      if (preScreen === 'qr') return <QRScreen onNext={() => handleSetPreScreen('qr-loading')} />;
      if (preScreen === 'qr-loading') return <QRLoadingScreen onDone={() => handleSetPreScreen('mobile')} />;
      if (preScreen === 'qr-error') return (
        <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
          <div className="w-full max-w-[400px] bg-[#F8F8F6] min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
            <ErrorState title="QR Code Unavailable" desc="This QR code is no longer active. Please try a different code." onRetry={() => handleSetPreScreen('qr')} />
          </div>
        </div>
      );
      if (preScreen === 'welcome') return <WelcomeScreen onJoin={() => handleSetPreScreen('mobile')} />;
      if (preScreen === 'mobile') return <MobileScreen onNext={m => { setMobile(m); handleSetPreScreen('otp'); }} />;
      if (preScreen === 'otp') return <OTPScreen mobile={mobile} onVerify={() => onNavigate?.('/customer-onboarding')} onBack={() => handleSetPreScreen('mobile')} />;
      if (preScreen === 'curate-experience') return <CurateExperienceScreen onConfirm={() => handleSetPreScreen('dashboard')} />;
      return null;
    };

    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          {renderPreScreen()}
        </div>
      </div>
    );
  }

  // Redemption overlay
  if (showRedemptionSuccess && selectedReward) {
    return <RedemptionSuccessScreen rewardId={selectedReward} onDone={() => { setShowRedemptionSuccess(false); setSelectedReward(null); handleSetActiveTab('history'); }} />;
  }

  if (showRedemption && selectedReward) {
    return <RedemptionScreen rewardId={selectedReward} onClose={() => setShowRedemption(false)} onRedeemed={() => { setShowRedemption(false); setShowRedemptionSuccess(true); }} />;
  }

  // Reward detail (full-screen over main)
  if (selectedReward && activeTab === 'rewards') {
    return (
      <CustomerLayout tab={activeTab} setTab={t => { handleSetActiveTab(t); setSelectedReward(null); }} title="Reward Detail" showBack onBack={() => setSelectedReward(null)}>
        <RewardDetailScreen rewardId={selectedReward} onBack={() => setSelectedReward(null)} onShowQR={() => setShowRedemption(true)} />
      </CustomerLayout>
    );
  }

  // Post-auth main tabs
  const getTitle = () => {
    if (showPrivacy) return 'Privacy & Data';
    if (activeTab === 'offers' && selectedOffer) return 'Offer Detail';
    if ((activeTab as string) === 'product' && selectedProduct) return 'Item Details';
    const titles: Record<string, string> = { dashboard: MOCK_BUSINESS.name, scan: 'Scan QR', menu: 'Menu / Order', orders: 'My Orders', coupons: 'Coupons', membership: 'Membership Cards', offers: 'Offers', rewards: 'Rewards Wallet', history: 'Activity', profile: 'My Profile', checkout: 'Checkout' };
    return titles[activeTab] || 'Revia';
  };

  return (
    <CustomerLayout
      tab={activeTab}
      setTab={t => { handleSetActiveTab(t); setSelectedOffer(null); setSelectedReward(null); setShowPrivacy(false); }}
      title={getTitle()}
      showBack={showPrivacy || (activeTab === 'offers' && !!selectedOffer)}
      onBack={() => { if (showPrivacy) setShowPrivacy(false); else setSelectedOffer(null); }}
      onNavigateApp={onNavigate}
      cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    >
      {showPrivacy ? (
        <PrivacyScreen onBack={() => setShowPrivacy(false)} />
      ) : activeTab === 'dashboard' ? (
        <HomeScreen setTab={handleSetActiveTab} setSelectedOffer={id => { setSelectedOffer(id); handleSetActiveTab('offers'); }} setSelectedReward={id => { setSelectedReward(id); handleSetActiveTab('rewards'); }} />
      ) : activeTab === 'scan' ? (
        <CustomerScanScreen />
      ) : activeTab === 'menu' ? (
        <CustomerMenuScreen
          setTab={handleSetActiveTab}
          cartItems={cartItems}
          addItem={addItem}
          updateQuantity={updateQuantity}
          onProductClick={(id) => { setSelectedProduct(id); handleSetActiveTab('product' as MainTab); }}
        />
      ) : (activeTab as string) === 'product' && selectedProduct ? (
        <ProductDetailScreen
          productId={selectedProduct}
          onBack={() => { setSelectedProduct(null); handleSetActiveTab('menu'); }}
          addItem={addItem}
        />
      ) : activeTab === 'offers' || activeTab === 'coupons' ? (
        <OffersScreen type={activeTab} selectedId={selectedOffer} setSelectedId={setSelectedOffer} />
      ) : activeTab === 'membership' ? (
        <MembershipScreen />
      ) : activeTab === 'rewards' ? (
        <RewardsScreen selectedId={selectedReward} setSelectedId={setSelectedReward} />
      ) : activeTab === 'history' || activeTab === 'orders' ? (
        <HistoryScreen />
      ) : activeTab === 'profile' ? (
        <ProfileScreen onPrivacy={() => setShowPrivacy(true)} onNavigateApp={onNavigate} />
      ) : activeTab === 'checkout' ? (
        <CheckoutScreen
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          subtotal={subtotal}
          tax={tax}
          total={total}
          onSuccess={() => {
            cartItems.forEach(item => updateQuantity(item.id, -item.quantity));
            handleSetActiveTab('orders');
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[#F8F8F6] rounded-2xl flex items-center justify-center mb-4 border border-[#E6E6E6]">
            <Scan className="w-8 h-8 text-[#ccc]" />
          </div>
          <h2 className="text-xl font-black text-[#222] mb-2">{getTitle()}</h2>
          <p className="text-[#666] text-sm">This section is coming soon.</p>
        </div>
      )}
    </CustomerLayout>
  );
};
