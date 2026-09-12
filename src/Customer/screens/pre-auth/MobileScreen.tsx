import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, Lock } from 'lucide-react';

import { CustomerHeader } from '../../components/shared/CustomerHeader';

export const MobileScreen = ({ onNext }: { onNext: (mobile: string) => void }) => {
  const [mobile, setMobile] = useState('');
  const isValid = mobile.replace(/\s/g, '').length >= 10;
  
  const handleSubmit = () => {
    if (!isValid) return;
    onNext(mobile);
  };
  
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8F6F0] font-sans overflow-y-auto">
      <CustomerHeader
        mode="light"
        bgColor="bg-[#F8F6F0]/95 backdrop-blur-md"
        position="sticky"
        transparentOnTop={false}
        borderClass="border-b border-[#EAE3D9]"
      />
      
      <div className="w-full max-w-[1280px] mx-auto flex flex-col flex-1 px-5 lg:px-8">
        {/* Top Navigation */}
        <header className="w-full py-8 flex justify-between items-start gap-4">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFE7] text-[#9A7436] text-[10px] font-black uppercase tracking-widest mb-4">
            Salon Security & Guest Privileges
          </div>
          <h1 className="text-3xl font-black text-[#111] mb-2 tracking-tight">Guest Authentication & VIP Profile</h1>
          <p className="text-[13px] text-[#666] leading-relaxed">
            Identify your phone number to access bespoke cellar allocations, redeem Reserve points, and authenticate live tableside orders for Table 14.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-3 bg-white border border-[#EAE3D9] rounded-xl px-4 py-2 shadow-sm">
          <div className="w-8 h-8 bg-[#F3EFE7] rounded-lg flex items-center justify-center shrink-0">
            <span className="text-[#9A7436] font-bold text-xs">SV</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-[#111] leading-tight">Sommelier Floor Host</p>
            <p className="text-[10px] text-[#1C8A54] font-medium leading-tight flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#1C8A54] rounded-full inline-block" />
              Julien Vance on Service
            </p>
          </div>
          <button className="text-[10px] font-bold text-[#111] uppercase tracking-widest border border-[#EAE3D9] bg-[#F8F6F0] px-3 py-1.5 rounded-lg ml-2 hover:bg-[#EAE3D9]/50 transition-colors">
            Call Host
          </button>
        </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full py-4 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start flex-1">
          
          {/* Left Column - Form */}
          <div className="w-full lg:flex-1 shrink-0">
          
          {/* Table Sync Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#EAE3D9] shadow-sm flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0FFF8] flex items-center justify-center shrink-0 border border-[#1C8A54]/20">
                <CheckCircle2 className="w-5 h-5 text-[#1C8A54]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111]">Table 14 Signature Linked</p>
                <p className="text-[11px] text-[#666]">Salon Cavendish • Seating session synchronized</p>
              </div>
            </div>
            <div className="bg-[#F0FFF8] text-[#1C8A54] border border-[#1C8A54]/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
              Encrypted
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#EAE3D9] shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
            <h3 className="text-[10px] font-black text-[#666] uppercase tracking-[0.2em] mb-4">Mobile Telephone Number</h3>
            
            <div className="flex gap-3 mb-4">
              <button className="flex items-center justify-between gap-2 bg-white border border-[#EAE3D9] shadow-sm rounded-xl px-4 py-4 w-[140px] shrink-0 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none">🇬🇧</span>
                  <span className="text-[13px] font-bold text-[#111]">+44 (UK)</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#888]" />
              </button>
              
              <div className="flex-1 flex items-center bg-white border border-[#EAE3D9] shadow-sm rounded-xl px-5 py-4 focus-within:border-[#B89454] focus-within:ring-4 focus-within:ring-[#B89454]/10 transition-all">
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="07946 091 284"
                  className="w-full bg-transparent outline-none text-base font-bold text-[#111]"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#888] leading-relaxed mb-8">
              A single-use 6-digit cryptographic passcode will be transmitted via priority SMS.
            </p>

            <button 
              onClick={handleSubmit}
              disabled={!isValid}
              className={`w-full h-14 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-xl group ${isValid ? 'bg-[#9A7436] hover:bg-[#886630] text-white shadow-[#9A7436]/20' : 'bg-[#EAE3D9] text-[#999] cursor-not-allowed shadow-none'}`}
            >
              Verify & Enter Mayfair Salon
              <ArrowRight className={`w-4 h-4 ${isValid ? 'group-hover:translate-x-1 transition-transform' : ''}`} />
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-[#EAE3D9] flex-1" />
              <span className="text-[10px] font-bold text-[#999] uppercase tracking-widest">Or</span>
              <div className="h-px bg-[#EAE3D9] flex-1" />
            </div>

            <button className="w-full h-14 bg-white border border-[#EAE3D9] hover:bg-[#F8F6F0] rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm">
              <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[12px] font-bold text-[#111] leading-tight">Continue with Whatsapp</p>
                <p className="text-[10px] text-[#888] leading-tight">Get your OTP on Whatsapp Application</p>
              </div>
            </button>
          </div>
        </div>

          {/* Right Column - Info Cards */}
          <div className="w-full lg:w-[420px] shrink-0 space-y-6">
          
          {/* Profile Tier Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAE3D9] shadow-sm">
            <div className="flex justify-between items-start mb-5">
              <p className="text-[10px] font-black text-[#B89454] uppercase tracking-[0.2em]">Detected Profile Tier</p>
              <div className="bg-[#F8F6F0] px-3 py-1 rounded-full border border-[#EAE3D9] text-[#111] text-[9px] font-black uppercase tracking-widest">
                Reserve Black
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl p-6 border border-white/10 relative overflow-hidden mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#B89454]/20 to-transparent rounded-bl-full opacity-50" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[9px] text-[#B89454] font-black uppercase tracking-[0.25em] mb-1">Revia Private Reserve</p>
                  <p className="text-lg font-bold text-white tracking-tight">Lord Sterling-Vance</p>
                </div>
                <p className="text-[10px] text-white/50 font-bold tracking-widest">XRRV-8829</p>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] text-white/50 font-black uppercase tracking-[0.25em] mb-1">Accrued Balance</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">4,850</span>
                    <span className="text-[11px] text-[#B89454] font-bold">Pts</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/50 font-black uppercase tracking-[0.25em] mb-1">Sommelier Reserve</p>
                  <p className="text-[11px] text-[#1C8A54] font-bold">3 Cellar Allocations</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-black text-[#111]">Privileges Unlocked on Sign-In:</p>
              {[
                'Direct tableside order dispatch to Master Roaster bar',
                'Redeem member tier coupons ($15 bespoke tasting credit)',
                'Automatic contactless billing charged to registered vault'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1C8A54]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5 text-[#1C8A54]" />
                  </div>
                  <p className="text-[11px] text-[#666] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zero Spam Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#EAE3D9] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#F8F6F0] flex items-center justify-center shrink-0 border border-[#EAE3D9]">
                <ShieldCheck className="w-4 h-4 text-[#9A7436]" />
              </div>
              <div>
                <p className="text-[11px] font-black text-[#111]">Zero-Spam Authentication Policy</p>
                <p className="text-[10px] text-[#888]">Revia Concierge will never call or share guest telemetry.</p>
              </div>
            </div>
            <p className="text-[10px] text-[#888] leading-relaxed">
              All table telemetry and ordering data are encrypted end-to-end between your device and the Mayfair Atelier dispatch station.
            </p>
          </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="w-full py-6 border-t border-[#EAE3D9] mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[#888] tracking-wide">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#DED6C4] text-white rounded flex items-center justify-center">R</div>
            <p>Revia Mayfair Atelier • 42 Conduit St., London W1S 2YQ</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-[#111] transition-colors">Privacy Charter</button>
            <button className="hover:text-[#111] transition-colors">Bespoke Terms</button>
            <button className="hover:text-[#111] transition-colors">Concierge Desk</button>
            <span className="flex items-center gap-1.5 text-[#1C8A54]">
              <span className="w-1.5 h-1.5 bg-[#1C8A54] rounded-full inline-block" />
              Direct Liaison On-Duty
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
