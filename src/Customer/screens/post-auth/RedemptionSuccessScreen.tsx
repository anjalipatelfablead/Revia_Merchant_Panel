import React from 'react';
import { Check, Sparkles, Award, History, X } from 'lucide-react';

export const RedemptionSuccessScreen = ({ rewardId, onDone }: { rewardId: string; onDone: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      
      <div className="w-full max-w-sm bg-white rounded-[28px] p-6 shadow-2xl border border-[#E6E6E6] my-auto text-center animate-in zoom-in-95 duration-300 space-y-5 relative">
        
        {/* Top Close Icon */}
        <button 
          onClick={onDone} 
          className="absolute top-4 right-4 w-7 h-7 bg-[#F8F8F6] hover:bg-[#E6E6E6] rounded-full flex items-center justify-center transition-colors text-[#222]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="relative pt-2">
          <div className="w-20 h-20 bg-[#0D7A53] rounded-full flex items-center justify-center shadow-xl shadow-[#0D7A53]/25 mx-auto text-white">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
          <div className="absolute top-1 right-1/4 bg-[#D4A753] text-white p-1.5 rounded-full shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="bg-[#EBF7F0] text-[#0D7A53] border border-[#BCE3D1] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full inline-block">
            Validated ✓
          </span>
          <h2 className="text-2xl font-black text-[#222]">Reward Redeemed!</h2>
          <p className="text-xs text-[#666] max-w-xs mx-auto">
            Your single-use voucher was successfully scanned by staff at Grand Café.
          </p>
        </div>

        {/* Receipt / Details Card */}
        <div className="w-full bg-[#FAF8F5] rounded-2xl border border-[#E6E6E6] p-4 text-left space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#E6E6E6]">
            <div>
              <p className="text-[8px] font-black text-[#999] uppercase tracking-wider">Redemption ID</p>
              <p className="text-sm font-black text-[#222] font-mono">#RED-88392</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-[#999] uppercase tracking-wider">Status</p>
              <p className="text-xs font-black text-[#0D7A53] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Claimed
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#666]">Item Redeemed</span>
              <span className="font-bold text-[#222]">Artisanal Reward (100% OFF)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Loyalty Stamp Earned</span>
              <span className="font-bold text-[#0D7A53] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#D4A753]" /> +1 Stamp Added
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666]">Time</span>
              <span className="font-bold text-[#222]">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onDone}
          className="w-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:opacity-95 text-white py-3.5 rounded-xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Done & View History</span>
          <History className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
