import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { CustomerHeader } from '../../components/shared/CustomerHeader';

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
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">Your Profile</h1>
            <p className="text-white/50 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase">Salon Cavendish</p>
          </div>
        </div>

        {/* Right Column (Content) */}
        <div className="w-full flex-1 bg-[#F5F4EE] rounded-t-[40px] md:rounded-none -mt-8 md:mt-0 relative z-20 px-8 py-10 md:p-16 lg:p-24 overflow-y-auto flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-none">
          <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
            
            <div className="mb-10 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-3 tracking-tight">Personal Details</h1>
              <p className="text-[#666] text-[13px] md:text-sm leading-relaxed">
                {isNew ? 'Tell us a little about yourself to personalise your exclusive experience.' : 'Review and update your profile privileges.'}
              </p>
            </div>

            <div className="flex-1 space-y-5">
              <div>
                <label className="block text-[10px] font-black text-[#B89454] uppercase tracking-widest mb-3 text-center md:text-left">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input value={name} onChange={e => { setName(e.target.value); setNameError(''); }}
                  placeholder="Enter your full name"
                  className={`w-full bg-white border rounded-xl px-5 py-4 text-base font-bold text-[#111] focus:outline-none transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] ${nameError ? 'border-red-400 focus:ring-4 focus:ring-red-400/10' : 'border-[#EAE3D9] focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10'}`} 
                />
                {nameError && <p className="text-[11px] text-red-500 mt-2 flex items-center justify-center md:justify-start gap-1 font-bold"><AlertCircle className="w-3 h-3" />{nameError}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#B89454] uppercase tracking-widest mb-3 text-center md:text-left">Mobile</label>
                <div className="w-full bg-[#EAE3D9]/30 border border-[#EAE3D9]/50 rounded-xl px-5 py-4 text-base font-bold text-[#888]">+91 XXXXX 43210</div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#B89454] uppercase tracking-widest mb-3 text-center md:text-left">
                  Email <span className="text-[#999] normal-case font-medium text-[9px]">(Optional)</span>
                </label>
                <input placeholder="Enter your email (optional)"
                  className="w-full bg-white border border-[#EAE3D9] rounded-xl px-5 py-4 text-base font-bold text-[#111] focus:outline-none focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]" 
                />
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EAE3D9] shadow-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div onClick={() => setConsent(!consent)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${consent ? 'bg-[#111] border-[#111]' : 'bg-white border-[#EAE3D9]'}`}>
                    {consent && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[11px] text-[#666] leading-relaxed">
                    I agree to the <span className="text-[#B89454] font-bold">Terms of Service</span> and <span className="text-[#B89454] font-bold">Privacy Policy</span>. I consent to my data being used to manage my exclusive privileges. <span className="text-[#999]">Required.</span>
                  </p>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <button 
                onClick={handleSubmit} 
                disabled={!name.trim() || !consent}
                className={`w-full h-14 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-xl ${(!name.trim() || !consent) ? 'bg-[#EAE3D9] text-[#999] cursor-not-allowed shadow-none' : 'bg-[#111] hover:bg-[#222] text-white shadow-black/10'}`}
              >
                Save & Continue
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
