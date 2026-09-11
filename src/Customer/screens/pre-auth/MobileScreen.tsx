import React, { useState } from 'react';
import { Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { GoldBtn } from '../../components/ui/Buttons';
import { AuthRightPanel } from '../../components/shared/AuthRightPanel';

export const MobileScreen = ({ onNext }: { onNext: (mobile: string) => void }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const isValid = mobile.replace(/\s/g, '').length >= 10;
  
  const handleSubmit = () => {
    if (!isValid) { setError('Please enter a valid mobile number.'); return; }
    setError('');
    onNext(mobile);
  };
  
  return (
    <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
      <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 flex-1 px-6 pt-16 pb-8 md:p-16 flex flex-col justify-center relative bg-white">
          <div className="mb-8 mt-4 md:mt-0">
            <div className="w-12 h-12 bg-[#FFF8ED] rounded-2xl flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-[#C89B3C]" />
            </div>
            <h1 className="text-2xl font-black text-[#222] mb-2">Enter Your Mobile</h1>
            <p className="text-[#666] text-sm">We'll send a verification code to confirm your identity.</p>
          </div>

          <div className="flex-1 space-y-4 md:max-w-md">
            <div>
              <label className="block text-xs font-black text-[#222] uppercase tracking-wider mb-2">Mobile Number</label>
              <div className="flex gap-2">
                <div className="bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl px-3 py-4 text-sm font-bold text-[#222] w-20 text-center shrink-0">+91</div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={e => { setMobile(e.target.value); setError(''); }}
                  placeholder="98765 43210"
                  className={`flex-1 bg-[#F8F8F6] border rounded-xl px-4 py-4 text-sm font-medium text-[#222] focus:outline-none focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C]/20 transition-all ${error ? 'border-red-400 bg-[#FFF5F5]' : 'border-[#E6E6E6]'}`}
                />
              </div>
              {error && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
            </div>
            <p className="text-xs text-[#999]">Standard message rates may apply. Your number is used only for login and loyalty membership.</p>
          </div>

          <div className="mt-6 md:max-w-md">
            <GoldBtn onClick={handleSubmit} disabled={!isValid}>Continue <ArrowRight className="w-4 h-4" /></GoldBtn>
          </div>
        </div>
        <AuthRightPanel />
      </div>
    </div>
  );
};
