import React from 'react';
import { Zap } from 'lucide-react';
import { MOCK_OFFERS } from '../../data/mockData';
import { GoldBtn, BackBtn } from '../../components/ui/Buttons';
import { EmptyState } from '../../components/ui/States';
import { OfferCard } from '../../components/shared/OfferCard';

export const OffersScreen = ({ selectedId, setSelectedId }: { selectedId: string | null; setSelectedId: (id: string | null) => void }) => {
  if (selectedId) {
    const offer = MOCK_OFFERS.find(o => o.id === selectedId);
    if (!offer) return null;
    return (
      <div className="space-y-5">
        <BackBtn onClick={() => setSelectedId(null)} />
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl p-8 text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2">{offer.type}</p>
          <p className="text-5xl font-black text-[#C89B3C] mb-2">{offer.value}</p>
          <p className="text-white font-black text-lg">{offer.title}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E6E6E6] divide-y divide-[#F5F5F5]">
          {[['Description', offer.desc], ['Validity', offer.validity], ['Branch', offer.branch], ['Status', offer.status]].map(([k, v]) => (
            <div key={k} className="flex justify-between items-start px-4 py-3.5 text-sm">
              <span className="text-[#666]">{k}</span>
              <span className="font-bold text-[#222] text-right max-w-[60%]">{String(v).charAt(0).toUpperCase() + String(v).slice(1)}</span>
            </div>
          ))}
        </div>
        <GoldBtn onClick={() => setSelectedId(null)}>Got It</GoldBtn>
      </div>
    );
  }

  const active = MOCK_OFFERS.filter(o => o.status === 'active');
  const inactive = MOCK_OFFERS.filter(o => o.status !== 'active');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-[#222] mb-0.5">Offers For You</h2>
        <p className="text-sm text-[#666]">Discover offers available to you right now.</p>
      </div>
      {active.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Active</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map(o => <OfferCard key={o.id} offer={o} onClick={() => setSelectedId(o.id)} />)}
          </div>
        </div>
      ) : (
        <EmptyState icon={Zap} title="Nothing New Right Now" desc="Check back when new offers become available for you." />
      )}
      {inactive.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Unavailable</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactive.map(o => <OfferCard key={o.id} offer={o} />)}
          </div>
        </div>
      )}
    </div>
  );
};
