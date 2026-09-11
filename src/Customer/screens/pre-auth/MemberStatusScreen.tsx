import React from 'react';
import { RefreshCw, Star } from 'lucide-react';
import { GoldBtn } from '../../components/ui/Buttons';
import { AuthRightPanel } from '../../components/shared/AuthRightPanel';
import { LoyaltyCard } from '../../components/shared/LoyaltyCard';

export const MemberStatusScreen = ({ isExisting, onContinue }: { isExisting: boolean; onContinue: () => void }) => (
  <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
    <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
      <div className="md:w-1/2 flex-1 px-6 py-12 md:p-16 flex flex-col items-center justify-center text-center relative bg-white">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${isExisting ? 'bg-[#F0FFF8]' : 'bg-[#FFF8ED]'}`}>
          {isExisting ? <RefreshCw className="w-9 h-9 text-[#0D7A53]" /> : <Star className="w-9 h-9 text-[#C89B3C]" />}
        </div>
        <p className={`text-[10px] font-black uppercase tracking-[0.25em] mb-3 ${isExisting ? 'text-[#0D7A53]' : 'text-[#C89B3C]'}`}>
          {isExisting ? 'Existing Member' : 'New Member'}
        </p>
        <h1 className="text-2xl font-black text-[#222] mb-3">{isExisting ? 'Welcome Back!' : 'Welcome to Revia Loyalty'}</h1>
        <p className="text-[#666] text-sm leading-relaxed max-w-xs mb-8">
          {isExisting
            ? 'Your loyalty progress is already saved. Pick up right where you left off.'
            : "You're ready to join this loyalty program and start earning rewards."}
        </p>

        {isExisting && (
          <div className="w-full max-w-xs bg-[#F8F8F6] rounded-2xl p-4 border border-[#E6E6E6] mb-8">
            <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" compact />
          </div>
        )}

        <div className="w-full mt-auto mb-4 md:max-w-sm">
          <GoldBtn onClick={onContinue} full={true}>Continue →</GoldBtn>
        </div>
      </div>
      <AuthRightPanel />
    </div>
  </div>
);
