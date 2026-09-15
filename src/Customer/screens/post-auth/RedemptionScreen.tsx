import React, { useState, useEffect } from 'react';
import { QrCode, X, Copy, Check, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { MOCK_REWARDS } from '../../data/mockData';
import { useCustomer } from '../../CustomerContext';

export const RedemptionScreen = ({ rewardId, onClose, onRedeemed }: { rewardId: string; onClose: () => void; onRedeemed: () => void }) => {
  const { redeemReward } = useCustomer();
  const reward = MOCK_REWARDS.available.find(r => r.id === rewardId) || {
    id: rewardId,
    title: 'Free Artisanal Coffee or Pastry',
    value: '100% OFF',
    code: '849-201',
    validity: 'Valid for 10 mins once opened',
    branch: 'Grand Café - Central Branch'
  };

  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reward.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 py-8 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Compact Floating Centered Card Container */}
      <div className="bg-white rounded-[24px] p-4 sm:p-5 max-w-[360px] w-full relative shadow-2xl border border-[#E6E6E6] space-y-2.5 my-auto text-center animate-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* Top Header & Close Button */}
        <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2 shrink-0">
          <span className="bg-[#FFF8ED] text-[#C89B3C] border border-[#F5DEB3] text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Single-Use Voucher
          </span>
          <button 
            onClick={onClose} 
            className="w-7 h-7 bg-[#F8F8F6] hover:bg-[#E6E6E6] rounded-full flex items-center justify-center transition-colors text-[#222]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Offer Value */}
        <div className="space-y-0.5 shrink-0">
          <h2 className="text-2xl font-black text-[#222] leading-none">{reward.value}</h2>
          <p className="text-[11px] font-bold text-[#666] line-clamp-1">{reward.title}</p>
        </div>

        {/* Live Expiry Countdown Chip */}
        <div className="inline-flex items-center gap-1.5 bg-[#FFF0F0] border border-[#FFCDCD] text-[#D32F2F] px-3 py-0.5 rounded-full text-[10px] font-black mx-auto shrink-0">
          <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Expires in: {formattedTime}</span>
        </div>

        {/* Compact Scannable QR Code Box */}
        <div className="bg-[#1A1A1A] p-3 rounded-xl border-2 border-[#C89B3C] shadow-md relative group max-w-[180px] mx-auto text-white shrink-0">
          <div className="w-28 h-28 bg-white rounded-lg p-1.5 flex flex-col justify-between mx-auto shadow-inner">
            <div className="flex justify-between">
              <div className="w-6 h-6 bg-[#1A1A1A] rounded flex items-center justify-center p-0.5">
                <div className="w-2 h-2 bg-white" />
              </div>
              <div className="w-6 h-6 bg-[#1A1A1A] rounded flex items-center justify-center p-0.5">
                <div className="w-2 h-2 bg-white" />
              </div>
            </div>
            <div className="text-center font-mono font-black text-[7px] tracking-widest text-[#222] uppercase">
              REVIA PASS
            </div>
            <div className="flex justify-between items-end">
              <div className="w-6 h-6 bg-[#1A1A1A] rounded flex items-center justify-center p-0.5">
                <div className="w-2 h-2 bg-white" />
              </div>
              <QrCode className="w-5 h-5 text-[#1A1A1A]" />
            </div>
          </div>
          <p className="text-[8px] font-bold text-white/70 uppercase tracking-wider mt-1.5">Present for POS scanning</p>
        </div>

        {/* 6-Digit Numeric Code with Copy Button */}
        <div className="bg-[#F8F8F6] rounded-xl p-2 border border-[#E6E6E6] flex items-center justify-between shrink-0">
          <div className="text-left">
            <p className="text-[8px] font-black text-[#999] uppercase tracking-wider">Numeric PIN Code</p>
            <p className="text-base font-black text-[#222] font-mono tracking-widest">{reward.code}</p>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 bg-white hover:bg-[#F0F0F0] text-[#222] px-2 py-1 rounded-lg text-[10px] font-bold transition-all border border-[#E6E6E6] shadow-sm"
          >
            {copied ? <Check className="w-3 h-3 text-[#0D7A53]" /> : <Copy className="w-3 h-3 text-[#666]" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Outlet Location Indicator */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-[#666] bg-[#FFF8ED] border border-[#F5DEB3] p-1.5 rounded-lg shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
          <span className="truncate">Valid at <strong>{reward.branch || 'Grand Café Central'}</strong></span>
        </div>

        {/* Redeem Action Button */}
        <div className="pt-1 shrink-0">
          <button 
            onClick={() => {
              redeemReward(reward.id);
              onRedeemed();
            }}
            className="w-full bg-gradient-to-r from-[#C89B3C] to-[#E0B85E] hover:from-[#B88A2B] hover:to-[#D0A74D] text-[#222] py-2.5 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            Simulate Staff Scan / Done ✓
          </button>
        </div>

      </div>

    </div>
  );
};
