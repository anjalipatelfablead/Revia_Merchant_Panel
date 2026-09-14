import React, { useState } from 'react';
import { User, Calendar, Coffee, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PrimaryButton } from '../components/common/Badges';

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
    <div className="min-h-screen bg-[#FAF8F5] pb-16 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E0D8] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#D4A753] to-[#9E782F] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#1A1615] tracking-tight">REVIA MEMBERSHIP</div>
              <div className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">Customer Profile Setup</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 flex-1">
        
        {/* Horizontal Wizard */}
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 mb-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E5E0D8] -translate-y-1/2 z-0 hidden sm:block mx-10" />
          
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isPast
                        ? 'bg-[#0D7A53] text-white ring-4 ring-[#E6F4ED]'
                        : isCurrent
                        ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-md ring-4 ring-[#FDF8EB]'
                        : 'bg-white border-2 border-[#E5E0D8] text-[#9E9A93] group-hover:border-[#9E9A93]'
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5 text-white" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <div className="mt-3 text-center">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isCurrent
                          ? 'text-[#1A1615]'
                          : isPast
                          ? 'text-[#0D7A53]'
                          : 'text-[#9E9A93]'
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

        {/* Main Content Area */}
        <div className="bg-white border border-[#E5E0D8] rounded-[24px] shadow-xs overflow-hidden">
          <div className="p-6 sm:p-10 min-h-[400px]">
            {activeStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C89B3C]">Step 1 of 3</span>
                  <h2 className="text-2xl font-black text-[#1A1615] tracking-tight mt-1">Personal Details</h2>
                  <p className="text-[#6E6A66] text-sm mt-2">Let's start with the basics.</p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Sarah"
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm font-bold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753] focus:bg-white transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Jenkins"
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm font-bold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753] focus:bg-white transition-all" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm font-bold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753] focus:bg-white transition-all" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C89B3C]">Step 2 of 3</span>
                  <h2 className="text-2xl font-black text-[#1A1615] tracking-tight mt-1">Birthday & Gender</h2>
                  <p className="text-[#6E6A66] text-sm mt-2">We use this to send you special rewards.</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1.5">Date of Birth</label>
                    <input 
                      type="date" 
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm font-bold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753] focus:bg-white transition-all max-w-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1.5">Gender (Optional)</label>
                    <div className="relative max-w-sm">
                      <select 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full appearance-none bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl px-4 py-3 text-sm font-bold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753] focus:bg-white transition-all"
                      >
                        <option value="prefer-not">Prefer not to say</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9E9A93]">
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
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C89B3C]">Step 3 of 3</span>
                  <h2 className="text-2xl font-black text-[#1A1615] tracking-tight mt-1">Taste Profile</h2>
                  <p className="text-[#6E6A66] text-sm mt-2">Help us curate the perfect recommendations for you.</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-3">Favorite Beverage</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Espresso', 'Pour Over', 'Matcha', 'Cold Brew'].map(drink => (
                        <button
                          key={drink}
                          onClick={() => setFavoriteDrink(drink)}
                          className={`py-3 px-3 rounded-xl text-sm font-bold border transition-all ${
                            favoriteDrink === drink 
                            ? 'border-[#C89B3C] bg-[#C89B3C]/10 text-[#C89B3C] shadow-sm ring-1 ring-[#C89B3C]'
                            : 'border-[#E5E0D8] bg-[#FAF8F5] text-[#6E6A66] hover:bg-white hover:border-[#D4A753]/50'
                          }`}
                        >
                          {drink}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] mb-3">Dietary & Allergies</label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Dairy', 'Nuts', 'Gluten', 'Soy', 'Vegan', 'Vegetarian'].map(allergy => {
                        const isSelected = allergies.includes(allergy);
                        return (
                          <button
                            key={allergy}
                            onClick={() => toggleAllergy(allergy)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold transition-all ${
                              isSelected
                              ? 'border-[#0D7A53] bg-[#0D7A53] text-white shadow-md'
                              : 'border-[#E5E0D8] bg-[#FAF8F5] text-[#6E6A66] hover:bg-white hover:border-[#D4A753]/50'
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
          </div>

          {/* Bottom Navigation */}
          <div className="p-6 bg-[#FAF8F5] border-t border-[#E5E0D8] flex items-center justify-between">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-5 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm font-bold text-[#6E6A66] hover:bg-[#FDFDFD] transition-colors shadow-xs"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            
            <PrimaryButton 
              onClick={() => {
                if (activeStep < 3) {
                  setActiveStep(activeStep + 1);
                } else {
                  onComplete();
                }
              }}
              className="py-3 px-8 text-sm flex items-center gap-2"
            >
              {activeStep === 3 ? 'Complete Profile' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
