import React from 'react';
import { Zap, Ticket, Target } from 'lucide-react';
import { MOCK_OFFERS, MOCK_COUPONS, MOCK_CAMPAIGN_PROGRESS } from '../../data/mockData';
import { GoldBtn } from '../../components/ui/Buttons';
import { EmptyState } from '../../components/ui/States';
import { OfferCard } from '../../components/shared/OfferCard';

export const OffersScreen = ({ type = 'offers', selectedId, setSelectedId }: { type?: 'offers' | 'coupons'; selectedId: string | null; setSelectedId: (id: string | null) => void }) => {
  const data = type === 'coupons' ? MOCK_COUPONS : MOCK_OFFERS;

  if (selectedId) {
    const offer = data.find(o => o.id === selectedId);
    if (!offer) return null;
    return (
      <div className="space-y-4 p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{offer.title}</h3>
        <p className="text-sm text-gray-600">{offer.desc}</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li><strong>Type:</strong> {offer.type}</li>
          <li><strong>Value:</strong> {offer.value}</li>
          <li><strong>Validity:</strong> {offer.validity}</li>
          <li><strong>Branch:</strong> {offer.branch}</li>
          <li><strong>Status:</strong> {offer.status}</li>
        </ul>
        <GoldBtn className="mt-2 px-3 py-1 text-sm rounded-md" onClick={() => setSelectedId(null)}>Close</GoldBtn>
      </div>
    );
  }

  const active = data.filter(o => o.status === 'active');
  const inactive = data.filter(o => o.status !== 'active');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">{type === 'coupons' ? 'Your Coupons' : 'Offers For You'}</h2>
        <p className="text-sm text-[#666]">{type === 'coupons' ? 'View and manage your saved coupons.' : 'Discover offers available to you right now.'}</p>
      </div>

      {type === 'offers' && MOCK_CAMPAIGN_PROGRESS.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#C89B3C]" />
            <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Your Campaigns</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_CAMPAIGN_PROGRESS.map(camp => {
              const percent = Math.min((camp.currentProgress / camp.targetProgress) * 100, 100);
              return (
                <div key={camp.campaignId} className="bg-white rounded-[16px] border border-[#E6E6E6] p-5 flex flex-col hover:border-[#C89B3C] transition-colors cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#C89B3C] mb-1">{camp.type} Campaign</p>
                      <h4 className="font-bold text-[#222] text-base leading-tight">{camp.campaignName}</h4>
                    </div>
                    <div className="bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm border border-green-200">Active</div>
                  </div>
                  
                  <p className="text-sm text-[#666] mb-5 font-medium">Reward: <span className="text-[#222] font-bold">{camp.rewardValue}</span></p>
                  
                  <div className="mt-auto bg-[#F8F8F6] p-3 rounded-lg border border-[#E6E6E6]">
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

      {active.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Active Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map(o => <OfferCard key={o.id} offer={o} onClick={() => setSelectedId(o.id)} />)}
          </div>
        </div>
      ) : (
        <EmptyState icon={type === 'coupons' ? Ticket : Zap} title={`No ${type === 'coupons' ? 'Coupons' : 'Offers'} Right Now`} desc={`Check back when new ${type === 'coupons' ? 'coupons' : 'offers'} become available for you.`} />
      )}
      {inactive.length > 0 && (
        <div className="space-y-4 mt-8">
          <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Unavailable</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-75 grayscale">
            {inactive.map(o => <OfferCard key={o.id} offer={o} />)}
          </div>
        </div>
      )}
    </div>
  );
};
