import React, { useState } from 'react';
import { User, Calendar, Coffee, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { CustomerHeader } from '../../components/shared/CustomerHeader';

interface CustomerOnboardingPageProps {
  onComplete: () => void;
}

export const CustomerOnboardingPage: React.FC<CustomerOnboardingPageProps> = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('prefer-not');

  const [favoriteDrink, setFavoriteDrink] = useState('');
  const [allergies, setAllergies] = useState<string[]>([]);

  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const steps = [
    { id: 1, name: 'Personal Info', icon: User },
    { id: 2, name: 'Demographics', icon: Calendar },
    { id: 3, name: 'Preferences', icon: Coffee },
  ];

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
            <h1 className="text-3xl font-black text-[#111] mb-2 tracking-tight">VIP Profile Setup</h1>
            <p className="text-[13px] text-[#666] leading-relaxed">
              Complete your profile to access bespoke cellar allocations and redeem Reserve points for your next visit.
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
          <div className="w-full lg:flex-1 shrink-0 space-y-6">

            {/* Horizontal Wizard */}
            <div className="bg-white border border-[#EAE3D9] rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#EAE3D9] -translate-y-1/2 z-0 hidden sm:block mx-10" />

              <div className="flex items-center justify-between relative z-10 max-w-lg mx-auto">
                {steps.map((step) => {
                  const isPast = step.id < activeStep;
                  const isCurrent = step.id === activeStep;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPast
                            ? 'bg-[#1C8A54] text-white ring-4 ring-[#F0FFF8]'
                            : isCurrent
                              ? 'bg-[#9A7436] text-white shadow-md ring-4 ring-[#F3EFE7]'
                              : 'bg-white border-2 border-[#EAE3D9] text-[#999] group-hover:border-[#999]'
                          }`}
                      >
                        {isPast ? <Check className="w-5 h-5 text-white" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <div className="mt-3 text-center">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider block ${isCurrent
                              ? 'text-[#111]'
                              : isPast
                                ? 'text-[#1C8A54]'
                                : 'text-[#999]'
                            }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-[#EAE3D9] shadow-[0_4px_30px_rgba(0,0,0,0.03)] min-h-[400px]">

              {activeStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9A7436]">Step 1 of 3</span>
                    <h2 className="text-2xl font-black text-[#111] tracking-tight mt-1">Personal Details</h2>
                    <p className="text-[#666] text-sm mt-2">Let's start with the basics.</p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-1.5">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Sarah"
                          className="w-full bg-[#F8F6F0] border border-[#EAE3D9] rounded-xl px-4 py-3 text-sm font-bold text-[#111] focus:outline-hidden focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-1.5">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Jenkins"
                          className="w-full bg-[#F8F6F0] border border-[#EAE3D9] rounded-xl px-4 py-3 text-sm font-bold text-[#111] focus:outline-hidden focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full bg-[#F8F6F0] border border-[#EAE3D9] rounded-xl px-4 py-3 text-sm font-bold text-[#111] focus:outline-hidden focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9A7436]">Step 2 of 3</span>
                    <h2 className="text-2xl font-black text-[#111] tracking-tight mt-1">Birthday & Gender</h2>
                    <p className="text-[#666] text-sm mt-2">We use this to send you special rewards.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-[#F8F6F0] border border-[#EAE3D9] rounded-xl px-4 py-3 text-sm font-bold text-[#111] focus:outline-hidden focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10 transition-all max-w-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-1.5">Gender (Optional)</label>
                      <div className="relative max-w-sm">
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full appearance-none bg-[#F8F6F0] border border-[#EAE3D9] rounded-xl px-4 py-3 text-sm font-bold text-[#111] focus:outline-hidden focus:border-[#B89454] focus:ring-4 focus:ring-[#B89454]/10 transition-all"
                        >
                          <option value="prefer-not">Prefer not to say</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="non-binary">Non-binary</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#999]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9A7436]">Step 3 of 3</span>
                    <h2 className="text-2xl font-black text-[#111] tracking-tight mt-1">Taste Profile</h2>
                    <p className="text-[#666] text-sm mt-2">Help us curate the perfect recommendations for you.</p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-3">Favorite Beverage</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Espresso', 'Pour Over', 'Matcha', 'Cold Brew'].map(drink => (
                          <button
                            key={drink}
                            onClick={() => setFavoriteDrink(drink)}
                            className={`py-3 px-3 rounded-xl text-sm font-bold border transition-all ${favoriteDrink === drink
                                ? 'border-[#B89454] bg-[#B89454]/10 text-[#9A7436] shadow-sm ring-1 ring-[#B89454]'
                                : 'border-[#EAE3D9] bg-[#F8F6F0] text-[#666] hover:bg-white hover:border-[#B89454]/50'
                              }`}
                          >
                            {drink}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#666] mb-3">Dietary & Allergies</label>
                      <div className="flex flex-wrap gap-2.5">
                        {['Dairy', 'Nuts', 'Gluten', 'Soy', 'Vegan', 'Vegetarian'].map(allergy => {
                          const isSelected = allergies.includes(allergy);
                          return (
                            <button
                              key={allergy}
                              onClick={() => toggleAllergy(allergy)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all ${isSelected
                                  ? 'border-[#1C8A54] bg-[#1C8A54] text-white shadow-md'
                                  : 'border-[#EAE3D9] bg-[#F8F6F0] text-[#666] hover:bg-white hover:border-[#B89454]/50'
                                }`}
                            >
                              {isSelected && <ShieldCheck className="w-4 h-4" />}
                              {allergy}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-[#EAE3D9] flex items-center justify-between">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-5 py-3 rounded-xl border border-[#EAE3D9] bg-[#F8F6F0] text-sm font-bold text-[#666] hover:bg-[#EAE3D9]/50 transition-colors shadow-sm"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => {
                    if (activeStep < 3) {
                      setActiveStep(activeStep + 1);
                    } else {
                      onComplete();
                    }
                  }}
                  className="h-12 rounded-xl bg-[#9A7436] hover:bg-[#886630] text-white font-bold text-[13px] px-8 flex items-center gap-2 transition-all shadow-xl shadow-[#9A7436]/20 group"
                >
                  {activeStep === 3 ? 'Complete Profile' : 'Continue'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="w-full lg:w-[420px] shrink-0 space-y-6">
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
