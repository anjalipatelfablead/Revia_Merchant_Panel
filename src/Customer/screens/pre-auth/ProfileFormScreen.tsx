import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { GoldBtn } from '../../components/ui/Buttons';
import { AuthRightPanel } from '../../components/shared/AuthRightPanel';

export const ProfileFormScreen = ({ isNew, onContinue }: { isNew: boolean; onContinue: () => void }) => {
  const [name, setName] = useState(isNew ? '' : 'Rohit Sharma');
  const [consent, setConsent] = useState(!isNew);
  const [nameError, setNameError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) { setNameError('Full name is required.'); return; }
    if (!consent) { return; }
    onContinue();
  };

  return (
    <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
      <div className="w-full max-w-[400px] md:max-w-7xl bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        <div className="md:w-1/2 flex-1 px-6 pt-12 pb-8 md:p-16 flex flex-col justify-center relative bg-white">
          <div className="mb-8 mt-4 md:mt-0">
            <h1 className="text-2xl font-black text-[#222] mb-2">Your Profile</h1>
            <p className="text-[#666] text-sm">{isNew ? 'Tell us a little about yourself to personalise your experience.' : 'Review and update your profile details.'}</p>
          </div>

          <div className="flex-1 space-y-4 md:max-w-md">
            <div>
              <label className="block text-xs font-black text-[#222] uppercase tracking-wider mb-2">Full Name <span className="text-red-400">*</span></label>
              <input value={name} onChange={e => { setName(e.target.value); setNameError(''); }}
                placeholder="Enter your full name"
                className={`w-full bg-[#F8F8F6] border rounded-xl px-4 py-3.5 text-sm font-medium text-[#222] focus:outline-none focus:border-[#C89B3C] transition-all ${nameError ? 'border-red-400' : 'border-[#E6E6E6]'}`} />
              {nameError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{nameError}</p>}
            </div>

            <div>
              <label className="block text-xs font-black text-[#222] uppercase tracking-wider mb-2">Mobile</label>
              <div className="w-full bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl px-4 py-3.5 text-sm font-medium text-[#999]">+91 XXXXX 43210</div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#222] uppercase tracking-wider mb-2">Email <span className="text-[#999] normal-case font-medium text-[10px]">(Optional)</span></label>
              <input placeholder="Enter your email (optional)"
                className="w-full bg-[#F8F8F6] border border-[#E6E6E6] rounded-xl px-4 py-3.5 text-sm font-medium text-[#222] focus:outline-none focus:border-[#C89B3C] transition-all" />
            </div>

            <div className="bg-[#F8F8F6] rounded-2xl p-4 border border-[#E6E6E6]">
              <label className="flex items-start gap-3 cursor-pointer">
                <div onClick={() => setConsent(!consent)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consent ? 'bg-[#C89B3C] border-[#C89B3C]' : 'bg-white border-[#E6E6E6]'}`}>
                  {consent && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </div>
                <p className="text-xs text-[#666] leading-relaxed">
                  I agree to the <span className="text-[#C89B3C] font-bold">Terms of Service</span> and <span className="text-[#C89B3C] font-bold">Privacy Policy</span>. I consent to my data being used to manage my loyalty membership. <span className="text-[#999]">Required.</span>
                </p>
              </label>
            </div>
          </div>

          <div className="mt-6 md:max-w-md">
            <GoldBtn onClick={handleSubmit} disabled={!name.trim() || !consent}>Save & Continue</GoldBtn>
          </div>
        </div>
        <AuthRightPanel />
      </div>
    </div>
  );
};
