import React from 'react';
import { Zap, Ticket } from 'lucide-react';
import { MOCK_OFFERS, MOCK_COUPONS } from '../../data/mockData';
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
      {active.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Active</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map(o => <OfferCard key={o.id} offer={o} onClick={() => setSelectedId(o.id)} />)}
          </div>
        </div>
      ) : (
        <EmptyState icon={type === 'coupons' ? Ticket : Zap} title={`No ${type === 'coupons' ? 'Coupons' : 'Offers'} Right Now`} desc={`Check back when new ${type === 'coupons' ? 'coupons' : 'offers'} become available for you.`} />
      )}
      {inactive.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Unavailable</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inactive.map(o => <OfferCard key={o.id} offer={o} />)}
          </div>
        </div>
      )}
    </div>
  );
};
