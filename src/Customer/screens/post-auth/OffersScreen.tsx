import React, { useState } from 'react';
import { Zap, Ticket, Target, CheckCircle2, ShieldCheck, Clock, Award, Store, MapPin, ChevronDown } from 'lucide-react';
import { MOCK_OFFERS, MOCK_COUPONS, MOCK_CAMPAIGN_PROGRESS } from '../../data/mockData';
import { GoldBtn } from '../../components/ui/Buttons';
import { EmptyState } from '../../components/ui/States';
import { OfferCard } from '../../components/shared/OfferCard';
import { useCustomer } from '../../CustomerContext';
import { RedemptionScreen } from './RedemptionScreen';
import { RedemptionSuccessScreen } from './RedemptionSuccessScreen';

export const OffersScreen = ({ type = 'offers', selectedId, setSelectedId, setTab, selectedMerchant = 'All Merchants' }: { type?: 'offers' | 'coupons'; selectedId: string | null; setSelectedId: (id: string | null) => void; setTab?: (tab: string) => void; selectedMerchant?: string }) => {
  if (selectedMerchant === 'All Merchants') {
    return <AllMerchantsOffersView type={type} selectedId={selectedId} setSelectedId={setSelectedId} setTab={setTab} />;
  }
  return <SpecificMerchantOffersView type={type} selectedId={selectedId} setSelectedId={setSelectedId} setTab={setTab} merchantName={selectedMerchant} />;
};

const AllMerchantsOffersView = ({ type = 'offers', selectedId, setSelectedId, setTab }: { type?: 'offers' | 'coupons'; selectedId: string | null; setSelectedId: (id: string | null) => void; setTab?: (tab: string) => void }) => {
  const { redeemedRewardIds } = useCustomer();
  const [activeTabFilter, setActiveTabFilter] = useState<'active' | 'redeemed'>('active');
  const [activeRedeemRewardId, setActiveRedeemRewardId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  
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

  const baseData = type === 'coupons' ? MOCK_COUPONS : MOCK_OFFERS;
  
  // Expanded data for All Merchants view
  let expandedCampaigns = [
    ...MOCK_CAMPAIGN_PROGRESS.map(c => ({ ...c, business: 'Grand Café' })),
    { campaignId: 'c-901', type: 'Stamp' as any, campaignName: 'Summer Bonanza', targetProgress: 10, currentProgress: 7, progressText: '7 / 10 Stamps', rewardType: 'Free_Item' as any, rewardValue: 'Free Croissant', business: 'Artisan Bakers' },
    { campaignId: 'c-902', type: 'Visit' as any, campaignName: 'Lunch Special', targetProgress: 5, currentProgress: 1, progressText: '1 / 5 Visits', rewardType: 'Discount_Percentage' as any, rewardValue: '$5 Off', business: 'Urban Eats' }
  ];

  let expandedBaseData = [
    ...baseData.map(o => ({ ...o, business: 'Grand Café' })),
    { id: 'all-1', type: 'Discount', value: '15%', title: '15% Off Total Bill', desc: 'Valid at Urban Eats', status: 'active' as any, branch: 'Urban Eats Central', business: 'Urban Eats' },
    { id: 'all-2', type: 'Freebie', value: 'FREE', title: 'Complimentary Dessert', desc: 'Valid at Artisan Bakers', status: 'active' as any, branch: 'Artisan Bakers', business: 'Artisan Bakers' },
    { id: 'all-3', type: 'Discount', value: '$10', title: '$10 Off Dinner', desc: 'Valid at Grand Café', status: 'expired' as any, branch: 'Grand Café', business: 'Grand Café' },
    { id: 'all-4', type: 'Discount', value: '20%', title: '20% Off Coffee', desc: 'Valid at Artisan Bakers', status: 'paused' as any, branch: 'Artisan Bakers', business: 'Artisan Bakers' }
  ];

  if (localMerchant !== 'All Merchants') {
    expandedCampaigns = expandedCampaigns.filter(c => c.business === localMerchant);
    expandedBaseData = expandedBaseData.filter(o => o.business === localMerchant);
  }

  if (localBranch !== 'All Branches') {
    // Note: mock campaigns don't have branch info, so we only filter baseData
    expandedBaseData = expandedBaseData.filter(o => o.branch === localBranch);
  }

  const activeUnredeemed = expandedBaseData.filter(o => o.status === 'active' && !redeemedRewardIds.includes(o.id));
  const redeemedItems = expandedBaseData.filter(o => redeemedRewardIds.includes(o.id) || o.status === ('redeemed' as any));
  const inactive = expandedBaseData.filter(o => o.status !== 'active' && !redeemedRewardIds.includes(o.id));

  const handleOpenRedemption = (rewardId: string) => {
    setActiveRedeemRewardId(rewardId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* 1. In-page QR / PIN Code Redemption Modal (C-10) */}
      {activeRedeemRewardId && !showSuccessModal && (
        <RedemptionScreen 
          rewardId={activeRedeemRewardId} 
          onClose={() => setActiveRedeemRewardId(null)} 
          onRedeemed={() => {
            setShowSuccessModal(true);
          }} 
        />
      )}

      {/* 2. In-page Confirmation Modal (C-11) */}
      {showSuccessModal && activeRedeemRewardId && (
        <RedemptionSuccessScreen 
          rewardId={activeRedeemRewardId} 
          onDone={() => {
            setShowSuccessModal(false);
            setActiveRedeemRewardId(null);
            setActiveTabFilter('redeemed');
          }} 
        />
      )}

      {/* Header & Sub-tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#E6E6E6] pb-5 z-20 relative">
        <div className="flex flex-col xl:flex-row xl:items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#222]">
              {type === 'coupons' ? 'Rewards From All Merchants' : 'Offers From All Merchants'}
            </h2>
            <p className="text-sm text-[#666] mt-1">
              {type === 'coupons' ? 'View active rewards across all merchants.' : 'Discover offers available across all our partner merchants.'}
            </p>
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

            {/* Local Branch Filter (Only shows if specific merchant selected) */}
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
        <div className="flex bg-[#F8F8F6] p-1 rounded-2xl border border-[#E6E6E6] self-start md:self-auto">
          <button onClick={() => setActiveTabFilter('active')} className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTabFilter === 'active' ? 'bg-white text-[#222] shadow-sm font-black' : 'text-[#666] hover:text-[#222]'}`}>
            <Ticket className="w-4 h-4 text-[#C89B3C]" /> Active ({activeUnredeemed.length})
          </button>
          <button onClick={() => setActiveTabFilter('redeemed')} className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTabFilter === 'redeemed' ? 'bg-white text-[#222] shadow-sm font-black' : 'text-[#666] hover:text-[#222]'}`}>
            <CheckCircle2 className="w-4 h-4 text-[#0D7A53]" /> Redeemed ({redeemedItems.length})
          </button>
        </div>
      </div>

      {type === 'offers' && expandedCampaigns.length > 0 && activeTabFilter === 'active' && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#C89B3C]" />
            <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Active Campaigns Across All Merchants</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expandedCampaigns.map(camp => {
              const percent = Math.min((camp.currentProgress / camp.targetProgress) * 100, 100);
              return (
                <div key={camp.campaignId} onClick={() => { if (setTab) setTab('membership'); }} className="bg-white rounded-2xl border border-[#E6E6E6] p-5 flex flex-col hover:border-[#C89B3C] transition-colors cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#C89B3C] mb-1">{camp.type} Campaign • {camp.business || 'Grand Café'}</p>
                      <h4 className="font-bold text-[#222] text-base leading-tight">{camp.campaignName}</h4>
                    </div>
                    <div className="bg-[#EBF7F0] text-[#0D7A53] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#BCE3D1]">Active</div>
                  </div>
                  
                  <p className="text-sm text-[#666] mb-5 font-medium">Reward: <span className="text-[#222] font-bold">{camp.rewardValue}</span></p>
                  
                  <div className="mt-auto bg-[#F8F8F6] p-3 rounded-xl border border-[#E6E6E6]">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-[#222]">{camp.progressText}</span>
                      <span className="text-[#C89B3C]">{Math.round(percent)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#E0B85E] to-[#C89B3C] rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      {activeTabFilter === 'active' ? (
        activeUnredeemed.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Available Single-Use Rewards (All Merchants)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeUnredeemed.map(o => (
                <OfferCard key={o.id} offer={o as any} onClick={() => handleOpenRedemption(o.id)} showMerchant={true} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState icon={type === 'coupons' ? Ticket : Zap} title="No Active Rewards Available" desc="You've redeemed your active vouchers!" />
        )
      ) : (
        redeemedItems.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Single-Use Redeemed Vouchers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-90">
              {redeemedItems.map(o => (
                <div key={o.id} className="bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm relative">
                  
                  {/* Top Bar */}
                  <div className="p-4 bg-[#222] text-white flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{o.type}</p>
                      <p className="text-lg font-black text-white">{o.value}</p>
                    </div>
                    <div className="bg-[#EBF7F0] border border-[#BCE3D1] text-[#0D7A53] px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-black">
                      <CheckCircle2 className="w-3.5 h-3.5" /> REDEEMED
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="text-[10px] font-black uppercase text-[#C89B3C] mb-1">{o.business || 'Grand Café'}</div>
                      <h4 className="text-base font-black text-[#222]">{o.title}</h4>
                      <p className="text-xs text-[#666] mt-1">{o.desc}</p>
                    </div>

                    <div className="bg-[#F8F8F6] p-3 rounded-xl border border-[#E6E6E6] flex items-center justify-between text-xs">
                      <span className="text-[#666]">Redeemed At: <strong>{o.branch || 'All Merchants Network'}</strong></span>
                      <span className="font-bold text-[#0D7A53]">Validated ✓</span>
                    </div>

                    {/* Redeem Button Disappears — Replaced with Permanently Used Status */}
                    <div className="w-full py-3 rounded-xl text-xs font-bold text-[#999] bg-[#F8F8F6] border border-[#E6E6E6] text-center flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0D7A53]" /> Single-Use Code Claimed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState icon={CheckCircle2} title="No Redeemed Rewards Yet" desc="Rewards you redeem across merchants will appear here." />
        )
      )}

      {inactive.length > 0 && activeTabFilter === 'active' && (
        <div className="space-y-4 mt-12">
          <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Expired / Paused</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60 grayscale">
            {inactive.map(o => <OfferCard key={o.id} offer={o as any} showMerchant={true} />)}
          </div>
        </div>
      )}
    </div>
  );
};

const SpecificMerchantOffersView = ({ type = 'offers', selectedId, setSelectedId, setTab, merchantName }: { type?: 'offers' | 'coupons'; selectedId: string | null; setSelectedId: (id: string | null) => void; setTab?: (tab: string) => void; merchantName: string }) => {
  const { redeemedRewardIds } = useCustomer();
  const [activeTabFilter, setActiveTabFilter] = useState<'active' | 'redeemed'>('active');
  
  // In-page modal states for QR redemption (no window.location redirect!)
  const [activeRedeemRewardId, setActiveRedeemRewardId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const baseData = type === 'coupons' ? MOCK_COUPONS : MOCK_OFFERS;

  // Separate active unredeemed items vs redeemed items
  const activeUnredeemed = baseData.filter(o => o.status === 'active' && !redeemedRewardIds.includes(o.id));
  const redeemedItems = baseData.filter(o => redeemedRewardIds.includes(o.id) || o.status === ('redeemed' as any));
  const inactive = baseData.filter(o => o.status !== 'active' && !redeemedRewardIds.includes(o.id));

  const handleOpenRedemption = (rewardId: string) => {
    setActiveRedeemRewardId(rewardId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* 1. In-page QR / PIN Code Redemption Modal (C-10) */}
      {activeRedeemRewardId && !showSuccessModal && (
        <RedemptionScreen 
          rewardId={activeRedeemRewardId} 
          onClose={() => setActiveRedeemRewardId(null)} 
          onRedeemed={() => {
            setShowSuccessModal(true);
          }} 
        />
      )}

      {/* 2. In-page Confirmation Modal (C-11) */}
      {showSuccessModal && activeRedeemRewardId && (
        <RedemptionSuccessScreen 
          rewardId={activeRedeemRewardId} 
          onDone={() => {
            setShowSuccessModal(false);
            setActiveRedeemRewardId(null);
            setActiveTabFilter('redeemed');
          }} 
        />
      )}

      {/* Header & Sub-tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E6E6] pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-[#222]">
            {type === 'coupons' ? `Your Rewards & Coupons at ${merchantName}` : `Offers For You at ${merchantName}`}
          </h2>
          <p className="text-sm text-[#666] mt-1">
            {type === 'coupons' ? 'View active rewards or review your single-use redemption history.' : 'Discover offers available to you right now.'}
          </p>
        </div>

        {/* Tab Filters: Active vs Redeemed */}
        <div className="flex bg-[#F8F8F6] p-1 rounded-2xl border border-[#E6E6E6] self-start md:self-auto">
          <button
            onClick={() => setActiveTabFilter('active')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTabFilter === 'active' 
                ? 'bg-white text-[#222] shadow-sm font-black' 
                : 'text-[#666] hover:text-[#222]'
            }`}
          >
            <Ticket className="w-4 h-4 text-[#C89B3C]" />
            Active ({activeUnredeemed.length})
          </button>
          <button
            onClick={() => setActiveTabFilter('redeemed')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTabFilter === 'redeemed' 
                ? 'bg-white text-[#222] shadow-sm font-black' 
                : 'text-[#666] hover:text-[#222]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#0D7A53]" />
            Redeemed ({redeemedItems.length})
          </button>
        </div>
      </div>

      {type === 'offers' && MOCK_CAMPAIGN_PROGRESS.length > 0 && activeTabFilter === 'active' && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#C89B3C]" />
            <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Your Active Campaigns</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_CAMPAIGN_PROGRESS.map(camp => {
              const percent = Math.min((camp.currentProgress / camp.targetProgress) * 100, 100);
              return (
                <div key={camp.campaignId} onClick={() => { if (setTab) setTab('membership'); }} className="bg-white rounded-2xl border border-[#E6E6E6] p-5 flex flex-col hover:border-[#C89B3C] transition-colors cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#C89B3C] mb-1">{camp.type} Campaign</p>
                      <h4 className="font-bold text-[#222] text-base leading-tight">{camp.campaignName}</h4>
                    </div>
                    <div className="bg-[#EBF7F0] text-[#0D7A53] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#BCE3D1]">Active</div>
                  </div>
                  
                  <p className="text-sm text-[#666] mb-5 font-medium">Reward: <span className="text-[#222] font-bold">{camp.rewardValue}</span></p>
                  
                  <div className="mt-auto bg-[#F8F8F6] p-3 rounded-xl border border-[#E6E6E6]">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-[#222]">{camp.progressText}</span>
                      <span className="text-[#C89B3C]">{Math.round(percent)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#E0B85E] to-[#C89B3C] rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      {activeTabFilter === 'active' ? (
        activeUnredeemed.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Available Single-Use Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeUnredeemed.map(o => (
                <OfferCard 
                  key={o.id} 
                  offer={o} 
                  onClick={() => handleOpenRedemption(o.id)} 
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState icon={type === 'coupons' ? Ticket : Zap} title="No Active Rewards Available" desc="You've redeemed your active vouchers! Earn more stamps to unlock new rewards." />
        )
      ) : (
        /* Redeemed Rewards Tab */
        redeemedItems.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Single-Use Redeemed Vouchers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-90">
              {redeemedItems.map(o => (
                <div key={o.id} className="bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm relative">
                  
                  {/* Top Bar */}
                  <div className="p-4 bg-[#222] text-white flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/60">{o.type}</p>
                      <p className="text-lg font-black text-white">{o.value}</p>
                    </div>
                    <div className="bg-[#EBF7F0] border border-[#BCE3D1] text-[#0D7A53] px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-black">
                      <CheckCircle2 className="w-3.5 h-3.5" /> REDEEMED
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-black text-[#222]">{o.title}</h4>
                      <p className="text-xs text-[#666] mt-1">{o.desc}</p>
                    </div>

                    <div className="bg-[#F8F8F6] p-3 rounded-xl border border-[#E6E6E6] flex items-center justify-between text-xs">
                      <span className="text-[#666]">Redeemed At: <strong>{o.branch || `${merchantName} Central`}</strong></span>
                      <span className="font-bold text-[#0D7A53]">Validated ✓</span>
                    </div>

                    {/* Redeem Button Disappears — Replaced with Permanently Used Status */}
                    <div className="w-full py-3 rounded-xl text-xs font-bold text-[#999] bg-[#F8F8F6] border border-[#E6E6E6] text-center flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#0D7A53]" /> Single-Use Code Claimed
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState icon={CheckCircle2} title="No Redeemed Rewards Yet" desc="When you show your QR/PIN code to cashier and redeem a reward, it will appear here." />
        )
      )}

      {inactive.length > 0 && activeTabFilter === 'active' && (
        <div className="space-y-4 mt-12">
          <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Expired / Paused</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60 grayscale">
            {inactive.map(o => <OfferCard key={o.id} offer={o} />)}
          </div>
        </div>
      )}
    </div>
  );
};
