import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';

export const AuthRightPanel = () => (
  <div className="hidden md:flex md:w-1/2 bg-[#F8F8F6] border-l border-[#E6E6E6] p-16 flex-col justify-center">
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C]">Detected Profile Tier</h3>
        <span className="bg-[#1a1a1a] text-[#C89B3C] text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">Reserve Black</span>
      </div>
      <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white shadow-xl">
        <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Revia Private Reserve</p>
        <div className="flex justify-between items-start mb-6">
          <h4 className="text-xl font-bold">Lord Sterling-Vance</h4>
          <span className="text-[10px] font-mono text-white/40">#REV-3829</span>
        </div>
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Accrued Balance</p>
            <p className="text-2xl font-black">4,850 <span className="text-sm font-medium text-white/60">Pts</span></p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Sommelier Reserve</p>
            <p className="text-sm font-bold text-[#0D7A53]">3 Cellar Allocations</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-[#E6E6E6] p-6 mb-6">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#222] mb-4">Privileges Unlocked on Sign-In:</h4>
      <ul className="space-y-3 text-xs text-[#666]">
        <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#F0FFF8] flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-[#0D7A53]" /></div> Direct tableside order dispatch to Master Roaster bar</li>
        <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#F0FFF8] flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-[#0D7A53]" /></div> Redeem member tier coupons (15% bespoke tasting credit)</li>
        <li className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#F0FFF8] flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-[#0D7A53]" /></div> Automatic contactless billing charged to registered vault</li>
      </ul>
    </div>

    <div className="bg-white rounded-2xl border border-[#E6E6E6] p-4 flex gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#FFF8ED] flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-[#C89B3C]" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#222]">Zero-Spam Authentication Policy</h4>
          <p className="text-[10px] text-[#666] leading-relaxed">Revia Concierge will never call or share guest telemetry. All table telemetry and ordering data are encrypted end-to-end between your device and the Mayfair Atelier dispatch station.</p>
        </div>
    </div>
  </div>
);
