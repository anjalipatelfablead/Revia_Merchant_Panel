import React from 'react';
import { QrCode, Star, Gift, ArrowRight } from 'lucide-react';
import { MOCK_BUSINESS } from '../../data/mockData';

import { CustomerHeader } from '../../components/shared/CustomerHeader';

export const WelcomeScreen = ({ onJoin, onTerms }: { onJoin: () => void; onTerms?: () => void }) => (
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
      <div className="w-full md:w-[45%] lg:w-[40%] bg-[#141414] relative flex flex-col justify-end p-8 md:p-16 shrink-0 min-h-[45dvh] md:min-h-full">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=1200')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center md:items-start text-center md:text-left">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#222] to-[#111] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#B89454]/20 to-transparent" />
          <span className="text-[#B89454] font-black text-2xl md:text-3xl relative z-10">R</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">{MOCK_BUSINESS.name}</h1>
        <p className="text-white/50 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase">{MOCK_BUSINESS.branch}</p>
      </div>
    </div>

    {/* Right Column (Content) */}
    <div className="w-full flex-1 bg-[#F5F4EE] rounded-t-[40px] md:rounded-none -mt-8 md:mt-0 relative z-20 px-8 py-10 md:p-16 lg:p-24 overflow-y-auto flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-none">
      <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        <div className="text-center md:text-left mb-10 md:mb-12 mt-4 md:mt-0">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B89454] mb-3">Loyalty Program</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#111] mb-4 leading-[1.1] tracking-tight">Elevate Your<br className="hidden md:block" />Experience</h2>
          <p className="text-[#666] text-[13px] md:text-[15px] leading-relaxed max-w-md">Join our exclusive loyalty program to unlock bespoke rewards. Collect signatures on each visit and earn curated privileges.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 mb-8 md:mb-10 border border-[#EAE3D9] shadow-[0_2px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89454]/5 rounded-bl-full" />
          <p className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[#9A7436] mb-6 relative z-10">How It Works</p>
          <div className="space-y-6 relative z-10">
            {[
              { icon: QrCode, text: 'Scan your signature on each visit' },
              { icon: Star, text: 'Earn 1 privilege token per visit' },
              { icon: Gift, text: 'Unlock curated rewards at 10 tokens' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#F8F6F0] rounded-xl border border-[#EAE3D9] flex items-center justify-center shrink-0 shadow-sm">
                  <item.icon className="w-5 h-5 text-[#B89454]" />
                </div>
                <p className="text-[13px] md:text-[15px] text-[#222] font-bold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 md:pt-0">
          <button 
            onClick={onJoin}
            className="w-full bg-[#111] hover:bg-[#222] text-white h-14 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-black/10 group"
          >
            Access Loyalty Program 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="w-full text-center text-[11px] text-[#888] mt-6 hover:text-[#444] transition-colors" onClick={onTerms}>
            By continuing you agree to our <span className="text-[#B89454] font-bold underline cursor-pointer">Terms & Privacy Policy</span>
          </button>
        </div>
        
      </div>
    </div>
  </div>
  </div>
);
