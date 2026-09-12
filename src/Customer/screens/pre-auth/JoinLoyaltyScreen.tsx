import React, { useState } from 'react';
import { CheckCircle2, Star, Gift, ArrowRight } from 'lucide-react';
import { CustomerHeader } from '../../components/shared/CustomerHeader';
import { MOCK_BUSINESS } from '../../data/mockData';

export const JoinLoyaltyScreen = ({ onJoined }: { onJoined: () => void }) => {
  const [joined, setJoined] = useState(false);
  const handleJoin = () => { setJoined(true); setTimeout(onJoined, 2500); };

  if (joined) return (
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
            
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#1C8A54]/20 flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-[#1C8A54]" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1C8A54] mb-3">You're In!</p>
            <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-4 tracking-tight">Welcome to the Club</h1>
            <p className="text-[#666] text-[13px] md:text-sm leading-relaxed mb-8">Your exclusive loyalty membership has been securely provisioned.</p>

            <div className="bg-white rounded-2xl p-5 border border-[#EAE3D9] shadow-sm w-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B89454]/5 rounded-bl-full" />
              <div className="relative z-10 text-left">
                <p className="text-sm font-black text-[#B89454] mb-1">🎁 Welcome Privilege Added</p>
                <p className="text-xs text-[#666]">Double signatures awarded on your first qualifying visit to the Salon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
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
          <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
            
            <div className="mb-10 mt-4 md:mt-0 text-center md:text-left">
              <div className="w-12 h-12 bg-white rounded-2xl border border-[#EAE3D9] shadow-sm flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Star className="w-5 h-5 text-[#B89454]" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B89454] mb-3">Revia Privileges</p>
              <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-3 tracking-tight">Join Loyalty Program</h1>
              <p className="text-[#666] text-[13px] md:text-sm leading-relaxed">Collect signatures and unlock exclusive curated rewards every time you visit.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EAE3D9] mb-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#B89454] mb-4">Program Specifics</p>
              <div className="space-y-3">
                {[['Rule', '1 signature per visit'], ['Threshold', '10 signatures = reward'], ['Welcome', 'Double signatures on entry']].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[13px] pb-3 border-b border-[#EAE3D9] last:border-0 last:pb-0">
                    <span className="text-[#888] font-medium">{k}</span>
                    <span className="font-bold text-[#111] text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EAE3D9] flex gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Gift className="w-5 h-5 text-[#B89454] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-[#111] mb-1">Welcome Privilege</p>
                <p className="text-[11px] text-[#666] leading-relaxed">Receive double signatures on your very first qualifying visit. Applied automatically.</p>
              </div>
            </div>

            <div className="mt-10">
              <button 
                onClick={handleJoin}
                className="w-full h-14 bg-[#111] hover:bg-[#222] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/10 group"
              >
                Become a Member
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-[#999] text-center mt-4">Membership is exclusively created once per identity.</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
