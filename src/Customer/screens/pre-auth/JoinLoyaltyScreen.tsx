import React, { useState } from 'react';
import { CheckCircle2, Star, Gift } from 'lucide-react';
import { GoldBtn } from '../../components/ui/Buttons';
import { AuthRightPanel } from '../../components/shared/AuthRightPanel';

export const JoinLoyaltyScreen = ({ onJoined }: { onJoined: () => void }) => {
  const [joined, setJoined] = useState(false);
  const handleJoin = () => { setJoined(true); setTimeout(onJoined, 2000); };

  if (joined) return (
    <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
      <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 flex-1 px-6 flex flex-col items-center justify-center text-center relative bg-white">
          <div className="w-20 h-20 bg-[#F0FFF8] rounded-full flex items-center justify-center mb-5">
            <CheckCircle2 className="w-10 h-10 text-[#0D7A53]" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0D7A53] mb-2">You're In!</p>
          <h2 className="text-2xl font-black text-[#222] mb-2">Welcome to the Program!</h2>
          <p className="text-[#666] text-sm mb-4">Your loyalty membership has been created.</p>
          <div className="bg-[#FFF8ED] border border-[#F5DEB3] rounded-2xl px-5 py-3">
            <p className="text-sm font-black text-[#C89B3C]">🎁 Welcome Reward Added</p>
            <p className="text-xs text-[#666]">Double stamps on your first qualifying visit</p>
          </div>
        </div>
        <AuthRightPanel />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
      <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 flex-1 px-6 pt-12 pb-8 md:p-16 flex flex-col relative bg-white">
          <div className="flex-1 mt-4">
            <div className="text-center mb-8 md:text-left">
              <div className="w-16 h-16 bg-[#C89B3C] rounded-3xl flex items-center justify-center mx-auto md:mx-0 mb-4 shadow-xl shadow-[#C89B3C]/20">
                <Star className="w-8 h-8 text-white fill-current" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C89B3C] mb-2">Grand Café Rewards</p>
              <h1 className="text-2xl font-black text-[#222] mb-3">Join Loyalty Program</h1>
              <p className="text-[#666] text-sm leading-relaxed md:max-w-md">Collect stamps and unlock exclusive rewards every time you visit.</p>
            </div>

            <div className="bg-[#F8F8F6] rounded-2xl p-5 border border-[#E6E6E6] mb-5 md:max-w-md">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#C89B3C] mb-3">Program Details</p>
              <div className="space-y-2">
                {[['Rule', '1 stamp per qualifying visit'], ['Threshold', '10 stamps = reward'], ['Welcome Benefit', 'Double stamps on first visit']].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5 border-b border-[#E6E6E6] last:border-0">
                    <span className="text-[#666]">{k}</span><span className="font-bold text-[#222] text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF8ED] rounded-2xl p-4 border border-[#F5DEB3] flex gap-3 md:max-w-md">
              <Gift className="w-5 h-5 text-[#C89B3C] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-[#222] mb-0.5">Welcome Benefit</p>
                <p className="text-xs text-[#666]">Double stamps on your first qualifying visit. Applied once only.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 md:max-w-md">
            <GoldBtn onClick={handleJoin}>Join Loyalty →</GoldBtn>
            <p className="text-xs text-[#999] text-center mt-3">Membership is created once and cannot be duplicated.</p>
          </div>
        </div>
        <AuthRightPanel />
      </div>
    </div>
  );
};
