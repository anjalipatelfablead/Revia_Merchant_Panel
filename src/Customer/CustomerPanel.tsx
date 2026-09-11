import React, { useState } from 'react';
import { Scan } from 'lucide-react';
import { MainTab } from './types';
import { MOCK_BUSINESS } from './data/mockData';

// Shared Components
import { CustomerLayout } from './components/shared/CustomerLayout';
import { CustomerHeader } from './components/shared/CustomerHeader';
import { CustomerFooter } from './components/shared/CustomerFooter';
import { ErrorState } from './components/ui/States';

// Pre-auth Screens
import { QRScreen } from './screens/pre-auth/QRScreen';
import { QRLoadingScreen } from './screens/pre-auth/QRLoadingScreen';
import { WelcomeScreen } from './screens/pre-auth/WelcomeScreen';
import { MobileScreen } from './screens/pre-auth/MobileScreen';
import { OTPScreen } from './screens/pre-auth/OTPScreen';
import { MemberStatusScreen } from './screens/pre-auth/MemberStatusScreen';
import { ProfileFormScreen } from './screens/pre-auth/ProfileFormScreen';
import { JoinLoyaltyScreen } from './screens/pre-auth/JoinLoyaltyScreen';

// Post-auth Screens
import { HomeScreen } from './screens/post-auth/HomeScreen';
import { OffersScreen } from './screens/post-auth/OffersScreen';
import { RewardsScreen } from './screens/post-auth/RewardsScreen';
import { RewardDetailScreen } from './screens/post-auth/RewardDetailScreen';
import { RedemptionScreen } from './screens/post-auth/RedemptionScreen';
import { RedemptionSuccessScreen } from './screens/post-auth/RedemptionSuccessScreen';
import { HistoryScreen } from './screens/post-auth/HistoryScreen';
import { ProfileScreen } from './screens/post-auth/ProfileScreen';
import { PrivacyScreen } from './screens/post-auth/PrivacyScreen';

interface Props {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

type PreScreen = 'qr' | 'qr-loading' | 'qr-error' | 'welcome' | 'mobile' | 'otp' | 'member-status' | 'profile-form' | 'join-loyalty';

export const CustomerPanel: React.FC<Props> = ({ currentRoute, onNavigate }) => {
  // Parse initial route
  const subRoute = currentRoute?.split('/').filter(Boolean)[1] || 'qr';

  // Pre-auth state
  const [preScreen, setPreScreen] = useState<PreScreen>(subRoute as PreScreen);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExistingMember] = useState(true);
  const [mobile, setMobile] = useState('');

  // Post-auth state
  const [activeTab, setActiveTab] = useState<MainTab>((subRoute as MainTab) || 'home');
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [showRedemption, setShowRedemption] = useState(false);
  const [showRedemptionSuccess, setShowRedemptionSuccess] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Sync state to URL when changed programmatically
  const navigateTo = (path: string) => {
    onNavigate?.('/customer-panel/' + path);
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
      if (preScreen === 'qr-loading') return <QRLoadingScreen onDone={() => handleSetPreScreen('welcome')} />;
      if (preScreen === 'qr-error') return (
        <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
          <div className="w-full max-w-[400px] bg-[#F8F8F6] min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
            <ErrorState title="QR Code Unavailable" desc="This QR code is no longer active. Please try a different code." onRetry={() => handleSetPreScreen('qr')} />
          </div>
        </div>
      );
      if (preScreen === 'welcome') return <WelcomeScreen onJoin={() => handleSetPreScreen('mobile')} />;
      if (preScreen === 'mobile') return <MobileScreen onNext={m => { setMobile(m); handleSetPreScreen('otp'); }} />;
      if (preScreen === 'otp') return <OTPScreen mobile={mobile} onVerify={() => handleSetPreScreen('member-status')} onBack={() => handleSetPreScreen('mobile')} />;
      if (preScreen === 'member-status') return <MemberStatusScreen isExisting={isExistingMember} onContinue={() => handleSetPreScreen('profile-form')} />;
      if (preScreen === 'profile-form') return <ProfileFormScreen isNew={!isExistingMember} onContinue={() => { if (isExistingMember) { setIsAuthenticated(true); navigateTo('home'); } else handleSetPreScreen('join-loyalty'); }} />;
      if (preScreen === 'join-loyalty') return <JoinLoyaltyScreen onJoined={() => { setIsAuthenticated(true); navigateTo('home'); }} />;
      return null;
    };

    return (
      <div className="min-h-screen flex flex-col pt-[70px]">
        <CustomerHeader onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col">
          {renderPreScreen()}
        </div>
        <CustomerFooter onNavigate={onNavigate} />
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
    const titles: Record<string, string> = { home: MOCK_BUSINESS.name, scan: 'Scan QR', menu: 'Menu / Order', orders: 'My Orders', coupons: 'Coupons', membership: 'Membership Cards', offers: 'Offers', rewards: 'Rewards Wallet', history: 'Activity', profile: 'My Profile' };
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
    >
      {showPrivacy ? (
        <PrivacyScreen onBack={() => setShowPrivacy(false)} />
      ) : activeTab === 'home' ? (
        <HomeScreen setTab={handleSetActiveTab} setSelectedOffer={id => { setSelectedOffer(id); handleSetActiveTab('offers'); }} setSelectedReward={id => { setSelectedReward(id); handleSetActiveTab('rewards'); }} />
      ) : activeTab === 'offers' || activeTab === 'coupons' ? (
        <OffersScreen selectedId={selectedOffer} setSelectedId={setSelectedOffer} />
      ) : activeTab === 'rewards' || activeTab === 'membership' ? (
        <RewardsScreen onSelectReward={id => setSelectedReward(id)} />
      ) : activeTab === 'history' || activeTab === 'orders' ? (
        <HistoryScreen />
      ) : activeTab === 'profile' ? (
        <ProfileScreen onPrivacy={() => setShowPrivacy(true)} onNavigateApp={onNavigate} />
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
