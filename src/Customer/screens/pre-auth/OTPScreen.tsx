import React, { useState, useEffect } from 'react';
import { ChevronLeft, Shield, AlertCircle } from 'lucide-react';
import { GoldBtn } from '../../components/ui/Buttons';
import { AuthRightPanel } from '../../components/shared/AuthRightPanel';

export const OTPScreen = ({ mobile, onVerify, onBack }: { mobile: string; onVerify: () => void; onBack: () => void }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) { const t = setInterval(() => setTimer(p => p - 1), 1000); return () => clearInterval(t); }
  }, [timer]);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val;
    setOtp(next);
    setError('');
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };
  
  const handleKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length < 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onVerify(); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
      <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 flex-1 px-6 pt-16 pb-8 md:p-16 flex flex-col justify-center relative bg-white">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-bold text-[#666] mb-8 w-fit mt-4 md:mt-0 md:absolute md:top-10 md:left-10">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="mb-8">
            <div className="w-12 h-12 bg-[#FFF8ED] rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-[#C89B3C]" />
            </div>
            <h1 className="text-2xl font-black text-[#222] mb-2">Verify Your Number</h1>
            <p className="text-[#666] text-sm">Enter the 6-digit code sent to <span className="font-bold text-[#222]">+91 {mobile}</span></p>
          </div>

          <div className="flex-1 space-y-5 md:max-w-md">
            <div>
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, i) => (
                  <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                    onChange={e => handleChange(e.target.value, i)}
                    onKeyDown={e => handleKey(e, i)}
                    className={`h-12 text-center text-xl font-black rounded-2xl border focus:outline-none transition-all ${digit ? 'border-[#C89B3C] bg-[#FFF8ED] text-[#222]' : error ? 'border-red-300 bg-[#FFF5F5]' : 'border-[#E6E6E6] bg-[#F8F8F6]'} focus:border-[#C89B3C] focus:ring-2 focus:ring-[#C89B3C]/10`}
                  />
                ))}
              </div>
              {error && <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
            </div>

            <div className="flex justify-between items-center text-sm">
              <button onClick={() => onBack()} className="text-[#C89B3C] font-bold hover:underline text-xs">Change number</button>
              {timer > 0
                ? <p className="text-[#999] text-xs">Resend in 00:{String(timer).padStart(2, '0')}</p>
                : <button onClick={() => setTimer(30)} className="text-[#C89B3C] font-bold hover:underline text-xs">Resend Code</button>
              }
            </div>
          </div>

          <div className="mt-6 md:max-w-md">
            <GoldBtn onClick={handleVerify} disabled={loading || otp.join('').length < 6}>
              {loading ? (
                <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Verifying…</span>
              ) : 'Verify & Enter Mayfair Salon →'}
            </GoldBtn>
          </div>
        </div>
        <AuthRightPanel />
      </div>
    </div>
  );
};
