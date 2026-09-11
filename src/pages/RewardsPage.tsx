import React, { useState } from 'react';
import { Gift, Plus, Award, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface RewardItem {
  id: string;
  title: string;
  stampCost: number;
  category: string;
  claimedCount: number;
  valueUsd: number;
  status: 'Active' | 'Paused';
  description: string;
}

const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'REW-01',
    title: 'Signature Tasting Flight',
    stampCost: 10,
    category: 'Specialty Experience',
    claimedCount: 284,
    valueUsd: 18.50,
    status: 'Active',
    description: '3 single-origin pour-overs served with cupping notes and origins card.',
  },
  {
    id: 'REW-02',
    title: 'Free Cold Brew & Artisanal Pastry',
    stampCost: 8,
    category: 'Food & Drink',
    claimedCount: 890,
    valueUsd: 11.00,
    status: 'Active',
    description: '16oz nitro or regular cold brew plus any baked item from the daily morning display.',
  },
  {
    id: 'REW-03',
    title: '$15 Reserve Roastery Voucher',
    stampCost: 12,
    category: 'Store Credit',
    claimedCount: 142,
    valueUsd: 15.00,
    status: 'Active',
    description: 'Applicable to any whole-bean 250g bag or brewing hardware at all locations.',
  },
  {
    id: 'REW-04',
    title: 'Private Cupping Workshop Invite',
    stampCost: 20,
    category: 'VIP Access',
    claimedCount: 45,
    valueUsd: 45.00,
    status: 'Active',
    description: 'Weekend small-group sensory coffee cupping session with the Head Roaster.',
  },
];

export const RewardsPage: React.FC = () => {
  const [rewards, setRewards] = useState<RewardItem[]>(INITIAL_REWARDS);

  const toggleStatus = (id: string) => {
    setRewards(
      rewards.map((r) =>
        r.id === id ? { ...r, status: r.status === 'Active' ? 'Paused' : 'Active' } : r
      )
    );
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
              Loyalty Rewards Catalog
            </h1>
            <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#CEEBD9]">
              4 Active Rewards
            </span>
          </div>
          <p className="text-xs text-[#7C746C] mt-1">
            Configure redeemable rewards, stamp redemption thresholds, and wallet pass perks
          </p>
        </div>

        <button
          onClick={() => alert('Add new reward item modal...')}
          className="bg-[#B38637] hover:bg-[#A37837] text-white rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Reward</span>
        </button>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
                  {reward.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    reward.status === 'Active'
                      ? 'bg-[#EBF7F0] text-[#15803D]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {reward.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1A1615] mt-2">
                {reward.title}
              </h3>
              <p className="text-xs text-[#7C746C] mt-1 line-clamp-2">
                {reward.description}
              </p>

              <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#8C827A]">
                    Stamp Cost
                  </div>
                  <div className="text-base font-bold text-[#B38637]">
                    {reward.stampCost} Stamps
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-[#8C827A]">
                    Retail Value
                  </div>
                  <div className="text-xs font-bold text-[#1A1615]">
                    ${reward.valueUsd.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F5F2EC] flex items-center justify-between text-xs">
              <span className="text-[#7C746C]">
                Claimed: <strong>{reward.claimedCount}</strong> times
              </span>
              <button
                onClick={() => toggleStatus(reward.id)}
                className="text-xs font-semibold text-[#B38637] hover:underline cursor-pointer"
              >
                {reward.status === 'Active' ? 'Pause' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
