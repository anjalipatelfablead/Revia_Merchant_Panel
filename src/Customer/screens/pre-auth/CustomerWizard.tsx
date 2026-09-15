import React, { useState, useEffect, useRef } from 'react';
import {
  Scan, Camera, ArrowRight, ShieldCheck, Smartphone,
  User, Calendar, Coffee, HeartPulse, Check, Star, Award,
  Sparkles, Crown, Gift, Clock, MapPin, Phone, Lock, Zap, Heart,
  Plus, Minus, ChevronRight
} from 'lucide-react';
import { CustomerHeader } from '../../components/shared/CustomerHeader';
import { MOCK_BUSINESS } from '../../data/mockData';
import { MOCK_CATALOG_ITEMS } from '../../../data/mockData';

export const CustomerWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('prefer-not');
  const [favoriteDrink, setFavoriteDrink] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [partySize, setPartySize] = useState('party-2');
  const [pacing, setPacing] = useState('classic');
  const [notes, setNotes] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [activeMenuCategory, setActiveMenuCategory] = useState('All');
  const [tableMode, setTableMode] = useState<'scan' | 'manual'>('scan');
  const [tableNumber, setTableNumber] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (step === 1 && tableMode === 'scan') {
      let currentStream: MediaStream | null = null;

      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .catch(() => navigator.mediaDevices.getUserMedia({ video: true }))
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraStream(stream);
            currentStream = stream;
          }
        })
        .catch(err => {
          console.error("Camera access denied or unavailable:", err);
          setCameraError(true);
        });

      return () => {
        if (currentStream) {
          currentStream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [step, tableMode]);

  const toggleProduct = (id: string) => setSelectedProducts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAddOn = (id: string) => setSelectedAddOns(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => setLoadingProgress(p => p >= 100 ? 100 : p + Math.random() * 15), 150);
      const t = setTimeout(() => { setLoadingProgress(100); setTimeout(() => setStep(3), 500); }, 2500);
      return () => { clearInterval(interval); clearTimeout(t); };
    }
  }, [step]);

  const [otpTimer, setOtpTimer] = useState(48);
  const [isVerifying, setIsVerifying] = useState(false);
  useEffect(() => {
    if (step === 4 && otpTimer > 0) { const t = setInterval(() => setOtpTimer(p => p - 1), 1000); return () => clearInterval(t); }
  }, [step, otpTimer]);

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val; setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };
  const handleOtpKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) document.getElementById(`otp-${idx - 1}`)?.focus();
  };
  const verifyOtp = () => { setIsVerifying(true); setTimeout(() => { setIsVerifying(false); setStep(5); }, 1500); };
  const toggleAllergy = (a: string) => setAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  const goNext = () => { if (step < totalSteps) setStep(step + 1); else onComplete(); };

  const menuCategories = ['All', ...Array.from(new Set(MOCK_CATALOG_ITEMS.map(i => i.category)))];
  const filteredItems = activeMenuCategory === 'All' ? MOCK_CATALOG_ITEMS : MOCK_CATALOG_ITEMS.filter(i => i.category === activeMenuCategory);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8F6F0] font-sans relative overflow-x-hidden overflow-y-auto">
      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        <CustomerHeader mode="light" bgColor="bg-white/80 backdrop-blur-md" position="sticky" transparentOnTop={false} borderClass="border-b border-[#EAE3D9]" />

        <main className="flex-1 w-full">
          <div className="w-full animate-in fade-in duration-500">

            {/* ═══════════════ STEP 1: QR SCAN — Hero Split Layout ═══════════════ */}
            {step === 1 && (
              <div className="min-h-[calc(100dvh-64px)]">
                {/* Full-width hero image */}
                <div className="relative w-full h-[120px] md:h-[340px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=90&w=2000" alt="Restaurant interior" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F0] via-transparent to-black/30" />
                  <div className="absolute bottom-30 left-0 right-0 p-8 md:p-12 pb-16 max-w-[1400px] mx-auto hidden md:block">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#9A7436] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Welcome to {MOCK_BUSINESS.name}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#1C8A54]/90 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Open Now
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                      Scan & Dine
                    </h1>
                  </div>
                </div>

                {/* Content below hero */}
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 -mt-24 md:-mt-32 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">

                    {/* Left — Info & VIP Cards */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                      {/* Intro & Tabs */}
                      <div>
                        <div className="hidden md:block">
                          <h2 className="text-3xl font-black text-[#111] mb-4 tracking-tight">
                            Identify your <span className="text-[#9A7436]">table</span>
                          </h2>
                          <p className="text-[15px] text-[#000] leading-relaxed mb-8 max-w-lg">
                            Scan the QR code on your table or enter your table number manually to open your personal concierge portal.
                          </p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex gap-2 mb-8 max-w-[420px]">
                          <button onClick={() => setTableMode('scan')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[14px] transition-all ${tableMode === 'scan' ? 'bg-[#9A7436] text-white shadow-md' : 'bg-white text-[#666] shadow-sm hover:bg-[#EAE3D9]'}`}>
                            <Scan className="w-5 h-5" /> Scan QR
                          </button>
                          <button onClick={() => setTableMode('manual')} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[14px] transition-all ${tableMode === 'manual' ? 'bg-[#9A7436] text-white shadow-md' : 'bg-white text-[#666] shadow-sm hover:bg-[#EAE3D9]'}`}>
                            <MapPin className="w-5 h-5" /> Enter Table No.
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#666]"><Lock className="w-3.5 h-3.5 text-[#1C8A54]" /> 256-bit Encrypted</div>
                          <div className="w-px h-4 bg-[#ddd]" />
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#666]"><ShieldCheck className="w-3.5 h-3.5 text-[#1C8A54]" /> GDPR Compliant</div>
                        </div>
                      </div>

                      {/* VIP Cards (Desktop Only) */}
                      <div className="hidden lg:flex flex-col xl:flex-row gap-4">
                        <div className="flex-1 bg-[#9A7436] rounded-md md:rounded-3xl p-4 md:p-7 text-white shadow-sm">
                          <Crown className="w-8 h-8 mb-4 opacity-80" />
                          <h3 className="text-xl font-black mb-2">VIP Concierge Access</h3>
                          <p className="text-[13px] opacity-80 leading-relaxed mb-5">Unlock personalized recommendations, express ordering, and exclusive member rewards.</p>
                          <div className="flex gap-3">
                            <div className="bg-white/20 rounded-xl px-4 py-3 text-center flex-1">
                              <p className="text-xl font-black">100</p><p className="text-[10px] uppercase tracking-wider opacity-80">Points</p>
                            </div>
                            <div className="bg-white/20 rounded-xl px-4 py-3 text-center flex-1">
                              <p className="text-xl font-black">4.9★</p><p className="text-[10px] uppercase tracking-wider opacity-80">Rating</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-6">
                          <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-6 shadow-sm">
                            <div className="flex gap-0.5 mb-2">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-[#B89454] fill-[#B89454]" />)}</div>
                            <p className="text-[13px] text-[#333] italic leading-relaxed mb-3">"The table scanning was instant — within seconds I had my entire tasting menu curated. Absolutely magical."</p>
                            <div className="flex items-center gap-3">
                              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Sarah" className="w-8 h-8 rounded-full object-cover" />
                              <div><p className="text-[12px] font-bold text-[#111]">Sarah Jenkins</p></div>
                            </div>
                          </div>

                          <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-6 shadow-sm">
                            <h4 className="text-sm font-black text-[#111] mb-3">How It Works</h4>
                            {[
                              { step: '1', title: 'Scan or Enter Table' },
                              { step: '2', title: 'Quick Sign Up' },
                              { step: '3', title: 'Start Ordering' }
                            ].map(item => (
                              <div key={item.step} className="flex items-center gap-3 py-1.5">
                                <div className="w-6 h-6 bg-[#9A7436]/10 rounded-md flex items-center justify-center shrink-0 text-[11px] font-black text-[#9A7436]">{item.step}</div>
                                <p className="text-[12px] font-bold text-[#111]">{item.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right — Scanner & Manual Input */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                      <div className="w-full max-w-[480px]">
                        {tableMode === 'scan' ? (
                          <>
                            {/* Scanner Area */}
                            <div className="relative w-full aspect-square bg-black rounded-[32px] overflow-hidden mb-6 shadow-lg">
                              {cameraError ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 p-6 text-center">
                                  <Camera className="w-12 h-12 mb-4 opacity-50" />
                                  <p className="text-[13px]">Camera access denied or unavailable. Please use the manual table entry.</p>
                                </div>
                              ) : (
                                <>
                                  <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                                  {!cameraStream && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                                      <div className="w-8 h-8 border-4 border-[#9A7436] border-t-transparent rounded-full animate-spin" />
                                    </div>
                                  )}
                                </>
                              )}

                              {/* Overlay Graphics */}
                              <div className="absolute inset-10 z-10 pointer-events-none">
                                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#B89454] rounded-tl-2xl" />
                                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#B89454] rounded-tr-2xl" />
                                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#B89454] rounded-bl-2xl" />
                                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#B89454] rounded-br-2xl" />
                              </div>
                              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                <Camera className="w-20 h-20 text-white/20" />
                              </div>
                              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#9A7436] to-transparent shadow-[0_4px_12px_rgba(154,116,54,0.3)] animate-[scan_2s_ease-in-out_infinite] z-10 pointer-events-none" />
                            </div>
                            <button onClick={goNext} className="w-full h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 hover:bg-[#333] shadow-lg shadow-black/20 transition-all group mb-8">
                              Simulate Scan (Demo) <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Manual Entry Area */}
                            <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm mb-6 w-full">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-[#F8F6F0] rounded-2xl flex items-center justify-center">
                                  <MapPin className="w-7 h-7 text-[#9A7436]" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-black text-[#111]">Table Number</h3>
                                  <p className="text-[12px] text-[#666]">Find this on the tent card at your table</p>
                                </div>
                              </div>
                              <input
                                type="text"
                                value={tableNumber}
                                onChange={e => setTableNumber(e.target.value)}
                                placeholder="e.g. T-12"
                                className="w-full bg-[#F8F6F0] rounded-2xl px-6 py-6 text-3xl font-black text-center text-[#111] placeholder:text-[#ccc] outline-none focus:ring-2 focus:ring-[#9A7436]/20 transition-all tracking-widest mb-3"
                              />
                              <p className="text-[11px] text-[#999] text-center mb-6">Check the small card or sticker on your table.</p>
                              <div className="grid grid-cols-4 gap-2">
                                {['T-1', 'T-2', 'T-5', 'T-8', 'T-10', 'T-12', 'T-15', 'T-20'].map(num => (
                                  <button key={num} onClick={() => setTableNumber(num)} className={`py-3 rounded-xl text-[13px] font-bold transition-all ${tableNumber === num ? 'bg-[#9A7436] text-white shadow-sm' : 'bg-[#F8F6F0] text-[#666] hover:bg-[#EAE3D9]'}`}>
                                    {num}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button onClick={goNext} disabled={!tableNumber.trim()} className="w-full h-16 bg-[#111] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333] shadow-lg shadow-black/20 transition-all group">
                              Connect to Table <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 2: LOADING — Centered Cinematic ═══════════════ */}
            {step === 2 && (
              <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center">
                <div className="max-w-lg mx-auto text-center px-6 py-20">
                  <div className="relative mb-14 inline-block">
                    <div className="absolute inset-0 bg-[#9A7436]/15 rounded-[40px] blur-2xl animate-pulse" />
                    <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center shadow-lg relative overflow-hidden animate-[float_4s_ease-in-out_infinite]">
                      <span className="text-[#9A7436] font-black text-5xl">R</span>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-[#E8F5E9] text-[#1C8A54] text-[10px] font-black uppercase tracking-widest mb-6 inline-flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#1C8A54] rounded-full animate-pulse" /> Establishing Connection
                  </div>
                  <h2 className="text-3xl font-black text-[#111] mb-3">Synchronizing Your Table</h2>
                  <p className="text-[15px] text-[#666] mb-10">Setting up your personalized concierge session...</p>
                  <div className="w-full max-w-[360px] mx-auto h-3 bg-[#EAE3D9] rounded-full overflow-hidden shadow-inner mb-8">
                    <div className="h-full bg-gradient-to-r from-[#9A7436] to-[#B89454] rounded-full transition-all duration-200" style={{ width: `${loadingProgress}%` }} />
                  </div>
                  <div className="flex items-center justify-center gap-6 text-[11px] font-bold text-[#666]">
                    <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#1C8A54]" /> Encrypted</span>
                    <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#9A7436]" /> Ultra-Fast</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#1C8A54]" /> Verified</span>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 3: MOBILE — Two-Column with Image ═══════════════ */}
            {step === 3 && (
              <div className="min-h-[calc(100dvh-64px)] flex flex-col lg:flex-row">
                {/* Left Image Panel */}
                <div className="hidden lg:block lg:w-[45%] relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=90&w=1200" alt="Cafe ambiance" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8F6F0]/50" />
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex gap-0.5 mb-2">{[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#B89454] fill-[#B89454]" />)}</div>
                    <p className="text-white text-[14px] italic mb-2">"Signed up in under a minute. The rewards are genuinely amazing."</p>
                    <p className="text-white/70 text-[12px] font-bold">— Marcus T., Silver Member</p>
                  </div>
                </div>

                {/* Right Form */}
                <div className="flex-1 flex items-center justify-center px-4 md:px-16 py-4 md:py-12">
                  <div className="w-full max-w-[500px]">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-12 h-12 bg-[#9A7436]/10 rounded-2xl flex items-center justify-center"><Phone className="w-6 h-6 text-[#9A7436]" /></div>
                      <div>
                        <p className="text-[10px] font-black text-[#9A7436] uppercase tracking-widest">Step 1 of 6</p>
                        <p className="text-[12px] text-[#999] font-bold">Authentication</p>
                      </div>
                    </div>

                    <h2 className="text-4xl font-black text-[#111] mb-4 tracking-tight">Enter Your<br /><span className="text-[#9A7436]">Mobile Number</span></h2>
                    <p className="text-[15px] text-[#666] leading-relaxed mb-3">We'll send a one-time passcode to verify your identity and link your loyalty profile.</p>
                    <p className="text-[12px] text-[#999] mb-10">By continuing, you agree to our <button className="text-[#9A7436] font-bold hover:underline">Terms</button> and <button className="text-[#9A7436] font-bold hover:underline">Privacy Policy</button>.</p>

                    <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-3">Phone Number</label>
                    <div className="flex gap-3 mb-8">
                      <div className="flex items-center gap-2 bg-white rounded-2xl px-5 py-5 w-28 shrink-0 justify-center shadow-sm">
                        <span className="text-2xl">🇮🇳</span><span className="text-base font-bold text-[#111]">+91</span>
                      </div>
                      <div className="flex-1 bg-white rounded-2xl px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-[#9A7436]/20 transition-all">
                        <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="98765 43210" className="w-full bg-transparent outline-none text-xl font-bold text-[#111] placeholder:text-[#ccc]" />
                      </div>
                    </div>

                    <button onClick={goNext} disabled={mobile.replace(/\s/g, '').length < 10} className="w-full h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#886630] shadow-lg shadow-[#9A7436]/20 transition-all group">
                      Send Passcode <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {[{ icon: Award, text: 'Earn Points' }, { icon: Gift, text: 'Get Rewards' }, { icon: Crown, text: 'VIP Access' }].map(p => (
                        <div key={p.text} className="bg-white rounded-2xl p-4 text-center shadow-sm">
                          <p.icon className="w-5 h-5 text-[#9A7436] mx-auto mb-2" /><p className="text-[11px] font-bold text-[#666]">{p.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 4: OTP — Clean Centered ═══════════════ */}
            {step === 4 && (
              <div className="min-h-[calc(100dvh-64px)] flex flex-col lg:flex-row">
                <div className="hidden lg:block lg:w-[45%] relative overflow-hidden bg-[#111]">
                  <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=90&w=1200" alt="Security" className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10">
                    <ShieldCheck className="w-16 h-16 mb-6 opacity-80" />
                    <h3 className="text-3xl font-black mb-3">Bank-Grade Security</h3>
                    <p className="text-[15px] opacity-70 text-center max-w-sm leading-relaxed">Our verification uses the same encryption standard as major financial institutions.</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center px-4 md:px-16 py-4 md:py-12">
                  <div className="w-full max-w-[500px]">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-12 h-12 bg-[#1C8A54]/10 rounded-2xl flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-[#1C8A54]" /></div>
                      <div>
                        <p className="text-[10px] font-black text-[#9A7436] uppercase tracking-widest">Step 2 of 6</p>
                        <p className="text-[12px] text-[#999] font-bold">Verification</p>
                      </div>
                    </div>

                    <h2 className="text-4xl font-black text-[#111] mb-4 tracking-tight">Verify Your<br /><span className="text-[#9A7436]">Identity</span></h2>
                    <p className="text-[15px] text-[#666] mb-2">
                      6-digit code sent to <span className="text-[#111] font-bold">+44 {mobile}</span>
                      <button onClick={() => setStep(3)} className="text-[#9A7436] ml-2 font-bold hover:underline">Change</button>
                    </p>
                    <p className="text-[12px] text-[#999] mb-10">Enter the code below. It expires in 10 minutes.</p>

                    <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-3">Verification Code</label>
                    <div className="grid grid-cols-6 gap-3 mb-8">
                      {otp.map((digit, i) => (
                        <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit}
                          onChange={e => handleOtpChange(e.target.value, i)} onKeyDown={e => handleOtpKey(e, i)}
                          className="w-full h-16 sm:h-20 bg-white rounded-2xl text-center text-3xl font-black text-[#111] focus:ring-2 focus:ring-[#9A7436]/30 transition-all outline-none shadow-sm" />
                      ))}
                    </div>

                    <button onClick={verifyOtp} disabled={otp.join('').length < 6 || isVerifying} className="w-full h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-[#9A7436]/20 transition-all mb-6">
                      {isVerifying ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</> : 'Verify & Continue'}
                    </button>
                    <p className="text-center text-[13px] text-[#666]">
                      {otpTimer > 0 ? <>Resend in <span className="font-bold text-[#111]">00:{String(otpTimer).padStart(2, '0')}</span></> : <button className="text-[#9A7436] font-bold hover:underline">Resend Code</button>}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 5: PERSONAL — Card Grid Style ═══════════════ */}
            {step === 5 && (
              <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[10px] font-black text-[#9A7436] uppercase tracking-widest">Step 3 of 6</p>
                      <span className="text-[#ddd]">·</span>
                      <p className="text-[10px] font-bold text-[#999] uppercase tracking-widest">Personal Information</p>
                    </div>
                    <h2 className="text-4xl font-black text-[#111] mb-4 tracking-tight">Tell Us About <span className="text-[#9A7436]">Yourself</span></h2>
                    <p className="text-[15px] text-[#666] leading-relaxed mb-10 max-w-lg">
                      We use your details to personalize greetings, recommendations, and your concierge experience. Your sommelier will address you by name.
                    </p>

                    <div className="space-y-5 mb-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-2">First Name *</label>
                          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Sarah" className="w-full bg-white rounded-2xl px-5 py-5 text-[#111] text-lg font-bold focus:ring-2 focus:ring-[#9A7436]/20 outline-none transition-all placeholder:text-[#ccc] shadow-sm" />
                        </div>
                        <div>
                          <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-2">Last Name</label>
                          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Jenkins" className="w-full bg-white rounded-2xl px-5 py-5 text-[#111] text-lg font-bold focus:ring-2 focus:ring-[#9A7436]/20 outline-none transition-all placeholder:text-[#ccc] shadow-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-2">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sarah@example.com" className="w-full bg-white rounded-2xl px-5 py-5 text-[#111] text-lg font-bold focus:ring-2 focus:ring-[#9A7436]/20 outline-none transition-all placeholder:text-[#ccc] shadow-sm" />
                        <p className="text-[11px] text-[#999] mt-2">We'll send order confirmations and exclusive offers here.</p>
                      </div>
                    </div>

                    <button onClick={goNext} disabled={!firstName} className="w-full md:w-auto md:px-16 h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-[#886630] shadow-lg shadow-[#9A7436]/20 transition-all group">
                      Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="hidden lg:block lg:w-[400px] shrink-0 space-y-6">
                    <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=90&w=800" alt="Coffee art" className="w-full h-[240px] rounded-md md:rounded-3xl object-cover shadow-sm" />
                    <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-6 shadow-sm">
                      <h4 className="text-sm font-black text-[#111] mb-3">Why We Ask</h4>
                      {['Personalized table greetings', 'Curated menu suggestions', 'Birthday surprises & rewards', 'Order history & preferences'].map(item => (
                        <div key={item} className="flex items-center gap-3 py-2"><Check className="w-4 h-4 text-[#1C8A54] shrink-0" /><span className="text-[13px] text-[#444]">{item}</span></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 6: DEMOGRAPHICS — With Birthday Visual ═══════════════ */}
            {step === 6 && (
              <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[10px] font-black text-[#9A7436] uppercase tracking-widest">Step 4 of 6</p>
                      <span className="text-[#ddd]">·</span>
                      <p className="text-[10px] font-bold text-[#999] uppercase tracking-widest">Optional</p>
                    </div>
                    <h2 className="text-4xl font-black text-[#111] mb-4 tracking-tight">Birthday & <span className="text-[#9A7436]">Preferences</span></h2>
                    <p className="text-[15px] text-[#666] leading-relaxed mb-10 max-w-lg">
                      Share your birthday to receive a complimentary dessert and special rewards. Gold-tier members unlock a birthday brunch experience.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                      <div>
                        <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-2">Date of Birth</label>
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full bg-white rounded-2xl px-5 py-5 text-[#111] text-lg font-bold focus:ring-2 focus:ring-[#9A7436]/20 outline-none transition-all shadow-sm" />
                        <p className="text-[11px] text-[#999] mt-2">🎂 Free dessert on your birthday!</p>
                      </div>
                      <div>
                        <label className="block text-[12px] font-black uppercase tracking-wider text-[#999] mb-2">Gender (Optional)</label>
                        <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-white rounded-2xl px-5 py-5 text-[#111] text-lg font-bold focus:ring-2 focus:ring-[#9A7436]/20 outline-none transition-all shadow-sm appearance-none cursor-pointer">
                          <option value="prefer-not">Prefer not to say</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="non-binary">Non-binary</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(step - 1)} className="px-8 h-16 bg-white text-[#666] font-bold rounded-2xl hover:bg-[#EAE3D9]/50 transition-colors shadow-sm">← Back</button>
                      <button onClick={goNext} className="flex-1 md:flex-none md:px-16 h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 hover:bg-[#886630] shadow-lg shadow-[#9A7436]/20 transition-all group">
                        Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-[400px] shrink-0 space-y-6">
                    <div className="bg-[#9A7436] rounded-md md:rounded-3xl p-4 md:p-7 text-white">
                      <Gift className="w-8 h-8 mb-4 opacity-80" />
                      <h3 className="text-xl font-black mb-2">Birthday Rewards</h3>
                      <p className="text-[13px] opacity-80 leading-relaxed mb-4">Members receive on their birthday:</p>
                      {['Complimentary signature dessert', 'Personalized greeting card', 'Double points for the week', 'Exclusive birthday brunch (Gold+)'].map(item => (
                        <div key={item} className="flex items-center gap-2 py-1.5"><Check className="w-3.5 h-3.5 opacity-80" /><span className="text-[12px] opacity-90">{item}</span></div>
                      ))}
                    </div>
                    <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=90&w=800" alt="Birthday cake" className="w-full h-[200px] rounded-md md:rounded-3xl object-cover shadow-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 7: TASTE PROFILE — With Food Imagery ═══════════════ */}
            {step === 7 && (
              <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-10">
                {/* Hero Banner */}
                <div className="relative w-full h-[200px] md:h-[260px] rounded-md md:rounded-3xl overflow-hidden mb-10 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=90&w=1400" alt="Coffee art" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center p-10 md:p-14">
                    <div>
                      <p className="text-[10px] font-black text-[#B89454] uppercase tracking-widest mb-2">Step 5 of 6 · Taste Profile</p>
                      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Your Taste DNA</h2>
                      <p className="text-[14px] text-white/70 max-w-md">Help our AI sommelier understand your palate for perfect dish pairings.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
                  <div className="flex-1 space-y-10">
                    <div>
                      <h3 className="text-xl font-black text-[#111] mb-2">☕ Signature Beverage</h3>
                      <p className="text-[13px] text-[#666] mb-5">Select your go-to — we'll have it ready when you arrive.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: 'Espresso', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&auto=format&fit=crop&q=80' },
                          { name: 'Pour Over', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&auto=format&fit=crop&q=80' },
                          { name: 'Matcha', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=200&auto=format&fit=crop&q=80' },
                          { name: 'Cold Brew', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&auto=format&fit=crop&q=80' }
                        ].map(drink => (
                          <button key={drink.name} onClick={() => setFavoriteDrink(drink.name)} className={`rounded-2xl overflow-hidden transition-all ${favoriteDrink === drink.name ? 'ring-3 ring-[#9A7436] shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
                            <img src={drink.img} alt={drink.name} className="w-full h-28 object-cover" />
                            <div className={`p-3 text-center ${favoriteDrink === drink.name ? 'bg-[#9A7436] text-white' : 'bg-white text-[#111]'}`}>
                              <span className="text-[13px] font-bold">{drink.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#111] mb-2">⚠️ Dietary & Allergies</h3>
                      <p className="text-[13px] text-[#666] mb-5">Our kitchen team will flag these to ensure a safe experience.</p>
                      <div className="flex flex-wrap gap-3">
                        {['Dairy', 'Nuts', 'Gluten', 'Soy', 'Vegan', 'Vegetarian'].map(allergy => {
                          const sel = allergies.includes(allergy);
                          return (
                            <button key={allergy} onClick={() => toggleAllergy(allergy)} className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px] font-bold transition-all ${sel ? 'bg-[#1C8A54] text-white shadow-sm' : 'bg-white text-[#666] shadow-sm hover:shadow-md'}`}>
                              {sel && <Check className="w-4 h-4" />} {allergy}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(step - 1)} className="px-8 h-16 bg-white text-[#666] font-bold rounded-2xl hover:bg-[#EAE3D9]/50 transition-colors shadow-sm">← Back</button>
                      <button onClick={goNext} className="flex-1 md:flex-none md:px-16 h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 hover:bg-[#886630] shadow-lg shadow-[#9A7436]/20 transition-all group">
                        Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-[380px] shrink-0 space-y-6">
                    <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-6 shadow-sm">
                      <Sparkles className="w-6 h-6 text-[#9A7436] mb-3" />
                      <h4 className="text-sm font-black text-[#111] mb-2">AI-Powered Pairings</h4>
                      <p className="text-[12px] text-[#666] leading-relaxed">Our engine analyzes your taste profile across 50+ flavor dimensions for perfect food & drink pairings.</p>
                    </div>
                    <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-6 shadow-sm">
                      <ShieldCheck className="w-6 h-6 text-[#1C8A54] mb-3" />
                      <h4 className="text-sm font-black text-[#111] mb-2">Allergy Safety</h4>
                      <p className="text-[12px] text-[#666] leading-relaxed">Kitchen staff are automatically alerted. Every dish is cross-checked before preparation.</p>
                    </div>
                    <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-6 shadow-sm">
                      <Heart className="w-6 h-6 text-[#E74C3C] mb-3" />
                      <h4 className="text-sm font-black text-[#111] mb-2">Evolving Preferences</h4>
                      <p className="text-[12px] text-[#666] leading-relaxed">Your taste profile evolves with every visit. The more you order, the better our suggestions.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══════════════ STEP 8: CURATE EXPERIENCE — Full Menu ═══════════════ */}
            {step === 8 && (
              <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-4 md:py-10 space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black text-[#9A7436] uppercase tracking-widest mb-2">Step 6 of 6 · Final Step</p>
                    <h2 className="text-4xl font-black text-[#111] tracking-tight">Curate Your <span className="text-[#9A7436]">Experience</span></h2>
                    <p className="text-[15px] text-[#666] mt-2 max-w-lg">Pre-order from our menu, customize add-ons, and set your visit preferences.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#9A7436]/10 rounded-2xl px-5 py-3">
                    <Award className="w-7 h-7 text-[#9A7436]" />
                    <div><p className="text-[14px] font-black text-[#111]">+100 Points</p><p className="text-[11px] text-[#666]">For completing profile</p></div>
                  </div>
                </div>

                {/* Party & Pacing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm">
                    <h3 className="text-lg font-black text-[#111] mb-5 flex items-center gap-2"><User className="w-5 h-5 text-[#9A7436]" /> Party Size</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[{ id: 'solo', label: 'Just Me', emoji: '👤' }, { id: 'party-2', label: 'Table for 2', emoji: '👫' }, { id: 'party-4', label: '3-4 Guests', emoji: '👨‍👩‍👧' }, { id: 'salon-6', label: 'Group 5+', emoji: '👥' }].map(opt => (
                        <button key={opt.id} onClick={() => setPartySize(opt.id)} className={`py-5 rounded-2xl text-center transition-all ${partySize === opt.id ? 'bg-[#9A7436] text-white shadow-md' : 'bg-[#F8F6F0] text-[#666] hover:bg-[#EAE3D9]'}`}>
                          <span className="text-2xl block mb-2">{opt.emoji}</span>
                          <span className="text-[13px] font-bold">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm">
                    <h3 className="text-lg font-black text-[#111] mb-5 flex items-center gap-2"><Clock className="w-5 h-5 text-[#9A7436]" /> Service Pace</h3>
                    <div className="flex flex-col gap-4">
                      {[{ id: 'classic', title: '🕐 Leisurely', desc: 'Multi-course with perfect timing between dishes.' }, { id: 'executive', title: '⚡ Express', desc: 'All courses within 45 minutes.' }].map(opt => (
                        <button key={opt.id} onClick={() => setPacing(opt.id)} className={`p-5 rounded-2xl text-left transition-all ${pacing === opt.id ? 'bg-[#9A7436] text-white shadow-md' : 'bg-[#F8F6F0] hover:bg-[#EAE3D9]'}`}>
                          <span className={`text-[15px] font-bold block mb-1 ${pacing === opt.id ? '' : 'text-[#111]'}`}>{opt.title}</span>
                          <span className={`text-[12px] ${pacing === opt.id ? 'text-white/70' : 'text-[#666]'}`}>{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Full Menu */}
                <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-black text-[#111] flex items-center gap-2"><Coffee className="w-5 h-5 text-[#9A7436]" /> Pre-order from Menu</h3>
                      <p className="text-[13px] text-[#666] mt-1">Have your favorites ready at your table — skip the wait.</p>
                    </div>
                    {selectedProducts.length > 0 && (
                      <div className="bg-[#9A7436]/10 rounded-xl px-4 py-2 text-[13px] font-bold text-[#9A7436]">
                        {selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''} selected
                      </div>
                    )}
                  </div>

                  {/* Category Tabs */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
                    {menuCategories.map(cat => (
                      <button key={cat} onClick={() => setActiveMenuCategory(cat)} className={`px-5 py-2.5 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${activeMenuCategory === cat ? 'bg-[#9A7436] text-white shadow-sm' : 'bg-[#F8F6F0] text-[#666] hover:bg-[#EAE3D9]'}`}>
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Menu Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map(item => {
                      const sel = selectedProducts.includes(item.id);
                      return (
                        <button key={item.id} onClick={() => toggleProduct(item.id)} className={`rounded-2xl overflow-hidden text-left transition-all group ${sel ? 'ring-2 ring-[#9A7436] shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
                          <div className="relative h-44 overflow-hidden">
                            <img src={item.image || ''} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            {sel && (
                              <div className="absolute top-3 right-3 w-8 h-8 bg-[#9A7436] rounded-full flex items-center justify-center shadow-md">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">{item.category}</span>
                            </div>
                          </div>
                          <div className={`p-4 ${sel ? 'bg-[#9A7436]/5' : 'bg-white'}`}>
                            <h4 className="text-[14px] font-bold text-[#111] mb-1 line-clamp-1">{item.title}</h4>
                            <p className="text-[11px] text-[#999] mb-2 line-clamp-1">{item.cuppingNotes}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[16px] font-black text-[#9A7436]">${item.price.toFixed(2)}</span>
                              <span className="text-[10px] font-bold text-[#1C8A54] bg-[#1C8A54]/10 px-2 py-1 rounded-full">+{item.stampsAwarded} pts</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Add-ons & Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm">
                    <h3 className="text-lg font-black text-[#111] mb-5 flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#9A7436]" /> Customize Add-ons</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Extra Shot', emoji: '☕', price: '+$0.50' },
                        { name: 'Oat Milk', emoji: '🥛', price: '+$0.75' },
                        { name: 'Gift Wrap', emoji: '🎁', price: '+$2.00' },
                        { name: 'Ice', emoji: '🧊', price: 'Free' },
                        { name: 'Whipped Cream', emoji: '🍦', price: '+$0.50' },
                        { name: 'Honey Drizzle', emoji: '🍯', price: '+$0.30' }
                      ].map(addon => {
                        const sel = selectedAddOns.includes(addon.name);
                        return (
                          <button key={addon.name} onClick={() => toggleAddOn(addon.name)} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${sel ? 'bg-[#1C8A54] text-white shadow-sm' : 'bg-[#F8F6F0] hover:bg-[#EAE3D9]'}`}>
                            <span className="text-2xl">{addon.emoji}</span>
                            <div className="flex-1">
                              <span className={`text-[14px] font-bold block ${sel ? '' : 'text-[#111]'}`}>{addon.name}</span>
                              <span className={`text-[11px] ${sel ? 'text-white/70' : 'text-[#999]'}`}>{addon.price}</span>
                            </div>
                            {sel ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5 text-[#999]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm">
                      <h3 className="text-lg font-black text-[#111] mb-5 flex items-center gap-2"><Heart className="w-5 h-5 text-[#9A7436]" /> Special Requests</h3>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Window seat, celebrating anniversary, high chair needed..." className="w-full bg-[#F8F6F0] rounded-2xl p-5 outline-none text-[14px] text-[#111] placeholder:text-[#999] resize-none h-36 focus:ring-2 focus:ring-[#9A7436]/20 transition-all" />
                      <p className="text-[11px] text-[#999] mt-3">Our concierge team will do their best to accommodate.</p>
                    </div>

                    {/* Order Summary */}
                    {(selectedProducts.length > 0 || selectedAddOns.length > 0) && (
                      <div className="bg-[#9A7436]/5 rounded-md md:rounded-3xl p-4 md:p-8">
                        <h3 className="text-lg font-black text-[#111] mb-4">Pre-order Summary</h3>
                        {selectedProducts.map(id => {
                          const item = MOCK_CATALOG_ITEMS.find(i => i.id === id);
                          if (!item) return null;
                          return (
                            <div key={id} className="flex items-center gap-3 py-2">
                              <img src={item.image || ''} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-[13px] font-bold text-[#111] flex-1 truncate">{item.title}</span>
                              <span className="text-[13px] font-black text-[#9A7436]">${item.price.toFixed(2)}</span>
                            </div>
                          );
                        })}
                        {selectedAddOns.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-[#EAE3D9]">
                            <p className="text-[11px] font-black text-[#999] uppercase tracking-wider mb-2">Add-ons</p>
                            <p className="text-[13px] text-[#666]">{selectedAddOns.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Final CTA */}
                <div className="bg-white rounded-md md:rounded-3xl p-4 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C8A54]/10 flex items-center justify-center"><Check className="w-7 h-7 text-[#1C8A54]" /></div>
                    <div>
                      <p className="text-[16px] font-black text-[#111]">Your Concierge Profile is Ready</p>
                      <p className="text-[13px] text-[#666]">Enter the exclusive member area and start your experience.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={() => setStep(step - 1)} className="px-8 h-16 bg-[#F8F6F0] text-[#666] font-bold rounded-2xl hover:bg-[#EAE3D9]/50 transition-colors shadow-sm shrink-0">← Back</button>
                    <button onClick={goNext} className="flex-1 md:flex-none md:px-16 h-16 bg-[#9A7436] text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-3 hover:bg-[#886630] shadow-lg shadow-[#9A7436]/20 transition-all group">
                      Enter Concierge <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* Footer */}
        <footer className="w-full bg-white/80 backdrop-blur-md mt-auto">
          <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[#888] tracking-wide">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-[#9A7436] text-white rounded flex items-center justify-center text-[9px] font-black">R</div>
              <p>{MOCK_BUSINESS.name} • Powered by Revia</p>
            </div>
            <div className="flex items-center gap-6">
              <button className="hover:text-[#111] transition-colors">Privacy</button>
              <button className="hover:text-[#111] transition-colors">Terms</button>
              <button className="hover:text-[#111] transition-colors">Support</button>
              <span className="flex items-center gap-1.5 text-[#1C8A54]"><span className="w-1.5 h-1.5 bg-[#1C8A54] rounded-full inline-block animate-pulse" /> Online</span>
            </div>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan { 0%, 100% { top: 10%; opacity: 0; } 10%, 90% { opacity: 1; } 50% { top: 90%; opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
      `}} />
    </div>
  );
};
