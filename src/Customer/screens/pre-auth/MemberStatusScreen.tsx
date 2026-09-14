import React from 'react';
import { RefreshCw, Star, ArrowRight } from 'lucide-react';
import { LoyaltyCard } from '../../components/shared/LoyaltyCard';
import { MOCK_BUSINESS } from '../../data/mockData';

import { CustomerHeader } from '../../components/shared/CustomerHeader';

export const MemberStatusScreen = ({ isExisting, onContinue }: { isExisting: boolean; onContinue: () => void }) => (
  <div className="flex flex-col min-h-[100dvh] bg-[#F5F4EE]">
    <CustomerHeader
      mode="light"
      bgColor="bg-[#F5F4EE]/95 backdrop-blur-md"
      position="sticky"
      transparentOnTop={false}
      borderClass="border-b border-[#EAE3D9]"
    />
    <div className="flex-1 bg-[#141414] md:bg-[#F5F4EE] flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* Left Column (Brand / Mobile Top) */}
      <div className="w-full md:w-[45%] lg:w-[40%] bg-[#141414] relative flex flex-col justify-end p-8 md:p-16 shrink-0 min-h-[35dvh] md:min-h-full">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=1200')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
      
      <div className="relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#222] to-[#111] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B89454]/20 to-transparent" />
          <span className="text-[#B89454] font-black text-2xl md:text-3xl relative z-10">R</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">{MOCK_BUSINESS.name}</h1>
        <p className="text-white/50 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase">{MOCK_BUSINESS.branch}</p>
      </div>
    </div>

    {/* Right Column (Content) */}
    <div className="w-full flex-1 bg-[#F5F4EE] rounded-t-[40px] md:rounded-none -mt-8 md:mt-0 relative z-20 px-8 py-10 md:p-16 lg:p-24 overflow-y-auto flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-none">
      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center items-center text-center">
        
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${isExisting ? 'bg-white border-[#1C8A54]/20' : 'bg-white border-[#B89454]/20'}`}>
          {isExisting ? <RefreshCw className="w-6 h-6 text-[#1C8A54]" /> : <Star className="w-6 h-6 text-[#B89454]" />}
        </div>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isExisting ? 'text-[#1C8A54]' : 'text-[#B89454]'}`}>
          {isExisting ? 'Existing Member' : 'New Member'}
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-4 tracking-tight">
          {isExisting ? 'Welcome Back' : 'Welcome to Revia Privileges'}
        </h1>
        <p className="text-[#666] text-[13px] md:text-sm leading-relaxed mb-8 max-w-lg">
          {isExisting
            ? 'Your loyalty progress has been securely retrieved. Pick up right where you left off at Salon Cavendish.'
            : "You're ready to join our exclusive loyalty program and begin unlocking curated rewards."}
        </p>

        {isExisting && (
          <div className="w-full bg-white rounded-2xl p-5 border border-[#EAE3D9] mb-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#1C8A54]/5 rounded-bl-full" />
             <div className="relative z-10 text-left">
               <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" compact />
             </div>
          </div>
        )}

        <div className="mt-auto md:mt-4 w-full">
          <button 
            onClick={onContinue}
            className="w-full h-14 bg-[#111] hover:bg-[#222] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/10 group"
          >
            {isExisting ? 'View Profile' : 'Complete Setup'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
      </div>
    </div>
  </div>
  </div>
);
