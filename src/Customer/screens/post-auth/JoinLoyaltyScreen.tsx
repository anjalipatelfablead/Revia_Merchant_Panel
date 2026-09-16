import React, { useState } from 'react';
import { Gift, Shield, Check, Crown, ChevronRight } from 'lucide-react';
import { useCustomer } from '../../CustomerContext';
import { MOCK_BUSINESS } from '../../data/mockData';

export const JoinLoyaltyScreen = ({ setTab }: { setTab?: (tab: string) => void }) => {
  const { setHasJoinedLoyalty } = useCustomer();
  const [isJoining, setIsJoining] = useState(false);
  const business = MOCK_BUSINESS;

  const handleJoin = () => {
    setIsJoining(true);
    setTimeout(() => {
      setHasJoinedLoyalty(true);
      setTab?.('dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-[2rem] bg-gradient-to-tr from-[#D4A753] to-[#9E782F] flex items-center justify-center shadow-xl">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-[#222]">Join {business.name} Rewards</h1>
        <p className="text-[#666] max-w-sm mx-auto">Unlock exclusive perks, earn stamps on every visit, and get rewarded for your loyalty.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#E6E6E6] shadow-xl shadow-black/5 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF8ED] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-3 pb-6 border-b border-[#E6E6E6]">
          <div className="bg-[#FFF8ED] border border-[#F5DEB3] p-4 rounded-2xl">
            <Gift className="w-8 h-8 text-[#C89B3C]" />
          </div>
          <span className="text-[#C89B3C] font-black text-xs uppercase tracking-widest">Sign Up Bonus</span>
          <h2 className="text-2xl font-black text-[#222]">Free Signature Brew</h2>
          <p className="text-sm text-[#666]">Instantly added to your rewards wallet when you join today.</p>
        </div>

        <div className="relative z-10 space-y-4 pt-2">
          <h3 className="text-sm font-bold text-[#222]">Program Benefits:</h3>
          <ul className="space-y-3">
            {[
              'Earn 1 stamp for every artisanal beverage purchase',
              'Unlock 1.5x points multiplier at Gold Tier',
              'Exclusive birthday treats and early access to events'
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#444]">
                <div className="bg-[#E8F5E9] p-1 rounded-full mt-0.5 shrink-0">
                  <Check className="w-3 h-3 text-[#2E7D32] stroke-[3]" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <button 
          onClick={handleJoin}
          disabled={isJoining}
          className="w-full bg-[#222] hover:bg-black text-white py-4 rounded-2xl font-black shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isJoining ? 'Creating Membership...' : 'Join Program & Claim Reward'}
          {!isJoining && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
        <p className="text-[11px] text-[#999] text-center flex items-center justify-center gap-1.5">
          <Shield className="w-3 h-3" /> By joining, you agree to the {business.name} Rewards Terms of Service and Privacy Policy.
        </p>
      </div>

    </div>
  );
};
