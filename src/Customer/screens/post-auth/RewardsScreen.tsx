import React, { useState, useEffect, useRef } from 'react';
import { Gift, Store, MapPin, ChevronDown } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { EmptyState } from '../../components/ui/States';
import { RewardCard } from '../../components/shared/RewardCard';
import { RedemptionScreen } from './RedemptionScreen';
import { RedemptionSuccessScreen } from './RedemptionSuccessScreen';
import { useCustomer } from '../../CustomerContext';

export const RewardsScreen = ({ selectedId, setSelectedId, selectedMerchant = 'All Merchants' }: { selectedId?: string | null, setSelectedId?: (id: string | null) => void, selectedMerchant?: string }) => {
  if (selectedMerchant === 'All Merchants') {
    return <AllMerchantsRewardsView selectedId={selectedId} setSelectedId={setSelectedId} />;
  }
  return <SpecificMerchantRewardsView selectedId={selectedId} setSelectedId={setSelectedId} merchantName={selectedMerchant} />;
};

const AllMerchantsRewardsView = ({ selectedId, setSelectedId }: { selectedId?: string | null, setSelectedId?: (id: string | null) => void }) => {
  const { redeemedRewardIds } = useCustomer();
  const [tab, setTab] = useState<'available' | 'redeemed' | 'expired' | 'voided'>('available');
  const [activeRedeemRewardId, setActiveRedeemRewardId] = useState<string | null>(selectedId || null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const tabs: (typeof tab)[] = ['available', 'redeemed', 'expired', 'voided'];
  
  const [localMerchant, setLocalMerchant] = useState('All Merchants');
  const [localBranch, setLocalBranch] = useState('All Branches');
  const [isMerchantOpen, setIsMerchantOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const merchantRef = React.useRef<HTMLDivElement>(null);
  const branchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (merchantRef.current && !merchantRef.current.contains(event.target as Node)) {
        setIsMerchantOpen(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setIsBranchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const expandedRewards = {
    available: [
      ...MOCK_REWARDS.available,
      { id: 'r10', title: '50% Off Bakery', value: '50% OFF', source: 'Special Campaign', validity: 'Valid until 30 Nov 2026', code: 'REVIA-XYZ12', business: 'Artisan Bakers', branch: 'Central' },
      { id: 'r11', title: '$5 Off Total', value: '$5 OFF', source: 'Loyalty Program', validity: 'Valid until 15 Oct 2026', code: 'REVIA-URB99', business: 'Urban Eats', branch: 'Westside' },
    ],
    redeemed: [
      ...MOCK_REWARDS.redeemed,
      { id: 'r12', title: 'Free Drink', value: 'FREE', source: 'Welcome Gift', validity: 'Redeemed 1 Sep 2026', code: 'REVIA-AB123', business: 'Urban Eats', branch: 'Eastside' },
    ],
    expired: MOCK_REWARDS.expired,
    voided: MOCK_REWARDS.voided,
  };

  const filterRewards = (list: any[]) => {
    let filtered = list;
    if (localMerchant !== 'All Merchants') {
      filtered = filtered.filter(r => r.business === localMerchant);
    }
    if (localBranch !== 'All Branches') {
      filtered = filtered.filter(r => r.branch === localBranch);
    }
    return filtered;
  };

  const filteredExpandedRewards = {
    available: filterRewards(expandedRewards.available),
    redeemed: filterRewards(expandedRewards.redeemed),
    expired: filterRewards(expandedRewards.expired),
    voided: filterRewards(expandedRewards.voided),
  };

  const availableList = filteredExpandedRewards.available.filter(r => !redeemedRewardIds.includes(r.id));
  const redeemedList = [...filteredExpandedRewards.redeemed, ...filteredExpandedRewards.available.filter(r => redeemedRewardIds.includes(r.id))];

  const getRewardsForTab = () => {
    if (tab === 'available') return availableList;
    if (tab === 'redeemed') return redeemedList;
    return filteredExpandedRewards[tab] || [];
  };

  const rewards = getRewardsForTab();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId) {
      setActiveRedeemRewardId(selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollRef.current;
        const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [tab]);

  const handleOpenReward = (id: string) => {
    setActiveRedeemRewardId(id);
    setSelectedId?.(id);
  };

  return (
    <div className="space-y-5 relative animate-in fade-in duration-500">
      {/* 1. In-page Floating QR & 6-Digit PIN Modal */}
      {activeRedeemRewardId && !showSuccessModal && (
        <RedemptionScreen 
          rewardId={activeRedeemRewardId} 
          onClose={() => {
            setActiveRedeemRewardId(null);
            setSelectedId?.(null);
          }} 
          onRedeemed={() => {
            setShowSuccessModal(true);
          }} 
        />
      )}

      {/* 2. In-page Confirmation Modal */}
      {showSuccessModal && activeRedeemRewardId && (
        <RedemptionSuccessScreen 
          rewardId={activeRedeemRewardId} 
          onDone={() => {
            setShowSuccessModal(false);
            setActiveRedeemRewardId(null);
            setSelectedId?.(null);
            setTab('redeemed');
          }} 
        />
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 z-20 relative">
        <div className="flex flex-col xl:flex-row xl:items-center gap-6">
          <div>
            <h2 className="text-xl font-black text-[#222] mb-0.5">Rewards Across All Merchants</h2>
            <p className="text-sm text-[#666]">Your earned and redeemed single-use rewards across all stores.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Local Merchant Filter */}
            <div className="relative" ref={merchantRef}>
              <button 
                onClick={() => { setIsMerchantOpen(!isMerchantOpen); setIsBranchOpen(false); }}
                className="cursor-pointer flex items-center gap-2 bg-white border border-[#E6E6E6] text-[#222] text-xs font-bold rounded-xl px-4 py-2 hover:bg-[#F8F8F6] transition-colors whitespace-nowrap shadow-sm"
              >
                <Store className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>{localMerchant}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#666] transition-transform ${isMerchantOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMerchantOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-48 bg-white border border-[#E6E6E6] rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => { setLocalMerchant('All Merchants'); setLocalBranch('All Branches'); setIsMerchantOpen(false); }}
                    className={`cursor-pointer w-full text-left px-4 py-2 text-xs font-bold transition-colors ${localMerchant === 'All Merchants' ? 'text-[#222] bg-[#F8F8F6]' : 'text-[#666] hover:bg-[#F8F8F6]'}`}
                  >
                    All Merchants
                  </button>
                  <div className="h-[1px] bg-[#E6E6E6] mx-4 my-1" />
                  {['Grand Café', 'Artisan Bakers', 'Urban Eats'].map(m => (
                    <button
                      key={m}
                      onClick={() => { setLocalMerchant(m); setLocalBranch('All Branches'); setIsMerchantOpen(false); }}
                      className={`cursor-pointer w-full text-left px-4 py-2 text-xs font-bold transition-colors ${localMerchant === m ? 'text-[#C89B3C] bg-[#FFF8F0]' : 'text-[#666] hover:bg-[#F8F8F6]'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Local Branch Filter */}
            {localMerchant !== 'All Merchants' && (
              <div className="relative" ref={branchRef}>
                <button 
                  onClick={() => { setIsBranchOpen(!isBranchOpen); setIsMerchantOpen(false); }}
                  className="cursor-pointer flex items-center gap-2 bg-white border border-[#E6E6E6] text-[#222] text-xs font-bold rounded-xl px-4 py-2 hover:bg-[#F8F8F6] transition-colors whitespace-nowrap shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{localBranch}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#666] transition-transform ${isBranchOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBranchOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-48 bg-white border border-[#E6E6E6] rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                    <button 
                      onClick={() => { setLocalBranch('All Branches'); setIsBranchOpen(false); }}
                      className={`cursor-pointer w-full text-left px-4 py-2 text-xs font-bold transition-colors ${localBranch === 'All Branches' ? 'text-[#222] bg-[#F8F8F6]' : 'text-[#666] hover:bg-[#F8F8F6]'}`}
                    >
                      All Branches
                    </button>
                    <div className="h-[1px] bg-[#E6E6E6] mx-4 my-1" />
                    {['Downtown Flagship', 'Northside Mall', 'West End Kiosk'].map(b => (
                      <button
                        key={b}
                        onClick={() => { setLocalBranch(b); setIsBranchOpen(false); }}
                        className={`cursor-pointer w-full text-left px-4 py-2 text-xs font-bold transition-colors ${localBranch === b ? 'text-[#C89B3C] bg-[#FFF8F0]' : 'text-[#666] hover:bg-[#F8F8F6]'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {tabs.map(t => {
          const count = t === 'available' ? availableList.length : t === 'redeemed' ? redeemedList.length : 0;
          return (
            <button 
              key={t} 
              data-active={tab === t}
              onClick={() => setTab(t)}
              className={`cursor-pointer px-4 py-2 rounded-full text-xs font-black capitalize whitespace-nowrap transition-all ${
                tab === t ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-md' : 'bg-white border border-[#E6E6E6] text-[#666] hover:border-[#D4A753]'
              }`}
            >
              {t}{count > 0 ? ` (${count})` : ''}
            </button>
          );
        })}
      </div>

      {rewards.length === 0 ? (
        <EmptyState 
          icon={Gift} 
          title={tab === 'available' ? 'No Active Rewards Available' : `No ${tab.charAt(0).toUpperCase() + tab.slice(1)} Rewards`}
          desc={tab === 'available' ? 'Complete qualifying loyalty activity to unlock rewards.' : `Your ${tab} rewards will appear here.`} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
          {rewards.map(r => (
            <RewardCard 
              key={r.id} 
              reward={r} 
              status={tab} 
              onClick={tab === 'available' ? () => handleOpenReward(r.id) : undefined}
              showMerchant={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SpecificMerchantRewardsView = ({ selectedId, setSelectedId, merchantName }: { selectedId?: string | null, setSelectedId?: (id: string | null) => void, merchantName: string }) => {
  const { redeemedRewardIds } = useCustomer();
  const [tab, setTab] = useState<'available' | 'redeemed' | 'expired' | 'voided'>('available');
  const [activeRedeemRewardId, setActiveRedeemRewardId] = useState<string | null>(selectedId || null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const tabs: (typeof tab)[] = ['available', 'redeemed', 'expired', 'voided'];
  
  const specificRewards = {
    available: MOCK_REWARDS.available.map(r => ({ ...r, business: merchantName })),
    redeemed: MOCK_REWARDS.redeemed.map(r => ({ ...r, business: merchantName })),
    expired: MOCK_REWARDS.expired.map(r => ({ ...r, business: merchantName })),
    voided: MOCK_REWARDS.voided.map(r => ({ ...r, business: merchantName })),
  };

  const availableList = specificRewards.available.filter(r => !redeemedRewardIds.includes(r.id));
  const redeemedList = [...specificRewards.redeemed, ...specificRewards.available.filter(r => redeemedRewardIds.includes(r.id))];

  const getRewardsForTab = () => {
    if (tab === 'available') return availableList;
    if (tab === 'redeemed') return redeemedList;
    return specificRewards[tab] || [];
  };

  const rewards = getRewardsForTab();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedId) {
      setActiveRedeemRewardId(selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollRef.current;
        const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [tab]);

  const handleOpenReward = (id: string) => {
    setActiveRedeemRewardId(id);
    setSelectedId?.(id);
  };

  return (
    <div className="space-y-5 relative animate-in fade-in duration-500">
      {/* 1. In-page Floating QR & 6-Digit PIN Modal */}
      {activeRedeemRewardId && !showSuccessModal && (
        <RedemptionScreen 
          rewardId={activeRedeemRewardId} 
          onClose={() => {
            setActiveRedeemRewardId(null);
            setSelectedId?.(null);
          }} 
          onRedeemed={() => {
            setShowSuccessModal(true);
          }} 
        />
      )}

      {/* 2. In-page Confirmation Modal */}
      {showSuccessModal && activeRedeemRewardId && (
        <RedemptionSuccessScreen 
          rewardId={activeRedeemRewardId} 
          onDone={() => {
            setShowSuccessModal(false);
            setActiveRedeemRewardId(null);
            setSelectedId?.(null);
            setTab('redeemed');
          }} 
        />
      )}

      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">Your Rewards at {merchantName}</h2>
        <p className="text-sm text-[#666]">Your earned and redeemed single-use rewards.</p>
      </div>

      <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {tabs.map(t => {
          const count = t === 'available' ? availableList.length : t === 'redeemed' ? redeemedList.length : 0;
          return (
            <button 
              key={t} 
              data-active={tab === t}
              onClick={() => setTab(t)}
              className={`cursor-pointer px-4 py-2 rounded-full text-xs font-black capitalize whitespace-nowrap transition-all ${
                tab === t ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-md' : 'bg-white border border-[#E6E6E6] text-[#666] hover:border-[#D4A753]'
              }`}
            >
              {t}{count > 0 ? ` (${count})` : ''}
            </button>
          );
        })}
      </div>

      {rewards.length === 0 ? (
        <EmptyState 
          icon={Gift} 
          title={tab === 'available' ? 'No Active Rewards Available' : `No ${tab.charAt(0).toUpperCase() + tab.slice(1)} Rewards`}
          desc={tab === 'available' ? `Complete qualifying loyalty activity at ${merchantName} to unlock rewards.` : `Your ${tab} rewards will appear here.`} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map(r => (
            <RewardCard 
              key={r.id} 
              reward={r} 
              status={tab} 
              onClick={tab === 'available' ? () => handleOpenReward(r.id) : undefined} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
