import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquare, Phone, Lock, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PrimaryButton, LiveBadge } from '../components/common/Badges';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onGoToOnboarding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onGoToOnboarding }) => {
  const [authMethod, setAuthMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('415-892-4102');
  const [pin, setPin] = useState(['4', '8', '2', '', '', '']);
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [timeLeft, setTimeLeft] = useState(105); // 01:45

  useEffect(() => {
    if (step === 'verify' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-md mb-3">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">REVIA MERCHANT SUITE</h1>
        <p className="text-xs uppercase tracking-widest text-[#9E9A93] font-semibold mt-1">
          Specialty Coffee & Hospitality Terminal Portal
        </p>
      </div>

      {/* Floating Center Auth Card */}
      <div className="w-full max-w-md bg-white border border-[#E5E0D8] rounded-2xl shadow-xl p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">SECURE AUTH GATEWAY</span>
            <h2 className="text-lg font-bold text-[#1A1615] tracking-tight">Merchant Operator Sign In</h2>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded-full border border-[#BCE3D1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]" /> 256-BIT SSL
          </span>
        </div>

        {/* Tab switchers: SMS OTP vs WhatsApp OTP */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setAuthMethod('sms')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authMethod === 'sms'
                ? 'bg-white text-[#1A1615] shadow-xs'
                : 'text-[#6E6A66] hover:text-[#1A1615]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#9E782F]" />
            <span>SMS OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('whatsapp')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authMethod === 'whatsapp'
                ? 'bg-white text-[#1A1615] shadow-xs'
                : 'text-[#6E6A66] hover:text-[#1A1615]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#0D7A53]" />
            <span>WhatsApp</span>
            <span className="bg-[#E6F4ED] text-[#0D7A53] border border-[#BCE3D1] text-[9px] font-bold px-1.5 py-0.2 rounded-full">
              INSTANT
            </span>
          </button>
        </div>

        {step === 'input' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">
                Merchant Phone or Operator ID
              </label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  aria-label="Country Dialing Code"
                  className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-2.5 py-2.5 text-xs font-medium text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                >
                  <option value="+1">🇺🇸 +1 (US/CA)</option>
                  <option value="+44">🇬🇧 +44 (UK)</option>
                  <option value="+61">🇦🇺 +61 (AU)</option>
                  <option value="+81">🇯🇵 +81 (JP)</option>
                  <option value="+49">🇩🇪 +49 (DE)</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter registered mobile number"
                  className="flex-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3 py-2.5 text-xs font-medium text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                />
              </div>
              <p className="text-[10px] text-[#9E9A93] mt-1.5">
                Operator credentials provisioned by Central IT / General Management.
              </p>
            </div>

            <PrimaryButton
              type="button"
              onClick={() => setStep('verify')}
              className="w-full py-3 text-sm mt-2"
            >
              Send Verification Code →
            </PrimaryButton>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66]">
                  Enter 6-Digit Verification PIN
                </label>
                <span className="text-[11px] font-mono font-semibold text-[#9E782F]">
                  Expires in {formatTimer(timeLeft)}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {pin.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`pin-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="h-12 text-center text-lg font-bold text-[#1A1615] bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg focus:outline-hidden focus:border-[#D4A753] focus:ring-1 focus:ring-[#D4A753]"
                  />
                ))}
              </div>
              <p className="text-[11px] text-[#6E6A66] mt-2 flex items-center justify-between">
                <span>Sent to {countryCode} {phone}</span>
                <button
                  onClick={() => setStep('input')}
                  className="text-[#9E782F] hover:underline font-semibold text-[10px] cursor-pointer"
                >
                  Change Number
                </button>
              </p>
            </div>

            <PrimaryButton
              type="button"
              onClick={onLoginSuccess}
              className="w-full py-3 text-sm"
            >
              Verify PIN & Authenticate →
            </PrimaryButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setTimeLeft(105)}
                className="text-xs text-[#9E782F] font-semibold hover:underline cursor-pointer"
              >
                Didn&apos;t receive code? Resend OTP
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-[#6E6A66]">
          <span className="flex items-center gap-1 text-[10px]">
            <Lock className="w-3 h-3 text-[#9E9A93]" /> Hardware Security Enclave
          </span>
          <button
            onClick={onGoToOnboarding}
            className="text-[11px] font-semibold text-[#9E782F] hover:underline cursor-pointer"
          >
            New Outlet? Start Onboarding
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-xs text-[#9E9A93] space-y-1">
        <p>Revia Mesh Network Cryptographic Keypair: Active • Protocol v2.14.0</p>
        <p className="text-[10px]">Protected by Cloudflare Magic Transit & Hardware Security Enclave (HSM)</p>
      </div>
    </div>
  );
};
