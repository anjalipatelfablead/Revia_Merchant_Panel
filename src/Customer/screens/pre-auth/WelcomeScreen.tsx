import React from 'react';
import { QrCode, Star, Gift, ArrowRight } from 'lucide-react';
import { MOCK_BUSINESS } from '../../data/mockData';
import { GoldBtn } from '../../components/ui/Buttons';

export const WelcomeScreen = ({ onJoin, onTerms }: { onJoin: () => void; onTerms?: () => void }) => (
  <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
    <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
      {/* Left Column (Brand) */}
      <div className="md:w-5/12 bg-[#1a1a1a] px-6 pt-16 pb-10 md:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=1200')] bg-cover bg-center md:block hidden" />
        <div className="relative z-10 w-full flex flex-col items-center md:items-start">
          <div className="w-20 h-20 bg-[#C89B3C] rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-[#C89B3C]/40">
            <span className="text-white font-black text-3xl">GC</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 leading-tight">{MOCK_BUSINESS.name}</h1>
          <p className="text-white/60 text-sm md:text-lg">{MOCK_BUSINESS.branch}</p>
        </div>
      </div>

      {/* Right Column (Content) */}
      <div className="md:w-7/12 flex-1 px-6 py-8 md:p-16 overflow-y-auto flex flex-col justify-center">
        <div className="text-center md:text-left mb-8 md:mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C89B3C] mb-3 md:mb-4">Loyalty Program</p>
          <h2 className="text-2xl md:text-4xl font-black text-[#222] mb-3 md:mb-5 leading-tight">Get Rewarded Every<br className="hidden md:block" />Time You Visit</h2>
          <p className="text-[#666] text-sm md:text-base leading-relaxed md:max-w-md">Join our loyalty program and unlock exclusive rewards. Collect stamps and earn free coffee, discounts and more.</p>
        </div>

        <div className="bg-[#F8F8F6] rounded-2xl p-5 md:p-8 mb-6 md:mb-10 border border-[#E6E6E6]">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[#C89B3C] mb-4 md:mb-6">How It Works</p>
          <div className="space-y-4 md:space-y-6">
            {[
              { icon: QrCode, text: 'Scan QR on each qualifying visit' },
              { icon: Star, text: 'Earn 1 stamp per qualifying visit' },
              { icon: Gift, text: '10 stamps = Free Coffee or reward' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl border border-[#E6E6E6] flex items-center justify-center shrink-0 shadow-sm">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[#C89B3C]" />
                </div>
                <p className="text-sm md:text-base text-[#222] font-bold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto md:mt-0">
          <div className="md:max-w-md">
            <GoldBtn onClick={onJoin}>Join Loyalty <ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></GoldBtn>
            <button className="w-full text-center text-xs md:text-sm text-[#999] mt-4 hover:text-[#666] transition-colors pb-4 md:pb-0" onClick={onTerms}>
              By continuing you agree to our <span className="text-[#C89B3C] font-bold underline">Terms & Privacy Policy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
