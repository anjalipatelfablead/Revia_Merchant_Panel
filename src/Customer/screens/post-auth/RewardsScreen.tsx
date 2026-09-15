import React, { useState, useEffect, useRef } from 'react';
import { Gift } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { EmptyState } from '../../components/ui/States';
import { RewardCard } from '../../components/shared/RewardCard';
import { RedemptionScreen } from './RedemptionScreen';
import { RedemptionSuccessScreen } from './RedemptionSuccessScreen';
import { useCustomer } from '../../CustomerContext';

export const RewardsScreen = ({ selectedId, setSelectedId }: { selectedId?: string | null, setSelectedId?: (id: string | null) => void }) => {
  const { redeemedRewardIds } = useCustomer();
  const [tab, setTab] = useState<'available' | 'redeemed' | 'expired' | 'voided'>('available');
  const [activeRedeemRewardId, setActiveRedeemRewardId] = useState<string | null>(selectedId || null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const tabs: (typeof tab)[] = ['available', 'redeemed', 'expired', 'voided'];
  
  // Filter rewards based on customer context redeemed IDs
  const availableList = MOCK_REWARDS.available.filter(r => !redeemedRewardIds.includes(r.id));
  const redeemedList = [...MOCK_REWARDS.redeemed, ...MOCK_REWARDS.available.filter(r => redeemedRewardIds.includes(r.id))];

  const getRewardsForTab = () => {
    if (tab === 'available') return availableList;
    if (tab === 'redeemed') return redeemedList;
    return MOCK_REWARDS[tab] || [];
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
    <div className="space-y-5 relative">
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
        <h2 className="text-xl font-black text-[#222] mb-0.5">My Rewards</h2>
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
              className={`px-4 py-2 rounded-full text-xs font-black capitalize whitespace-nowrap transition-all ${
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
