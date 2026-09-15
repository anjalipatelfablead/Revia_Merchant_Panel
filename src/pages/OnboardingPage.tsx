import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import {
  Check,
  Building2,
  Clock,
  Store,
  Award,
  Users,
  MapPin,
  ShieldCheck,
  Coffee,
  CheckCircle2,
  Sparkles,
  Zap,
  Lock,
  CreditCard
} from 'lucide-react';
import { PrimaryButton, LiveBadge } from '../components/common/Badges';

interface OnboardingPageProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete, onCancel }) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(1);

  // M-01 Registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // M-02 Business Info
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [ownerName, setOwnerName] = useState('');

  // Step 3 First Branch
  const [branchName, setBranchName] = useState('Blue Bottle Cafe - Downtown Flagship');
  const [address, setAddress] = useState('315 Montgomery St, Financial District, San Francisco, CA');
  const [timezone, setTimezone] = useState('America/Los_Angeles (PST - UTC-8)');
  const [hours, setHours] = useState('06:30 AM - 07:00 PM PST');
  const [registerType, setRegisterType] = useState<'counter' | 'salon' | 'express'>('counter');

  // Step 4 & 5
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>('pro');

  const steps = [
    { id: 1, name: 'Business Info', icon: Building2 },
    { id: 2, name: 'Category & Time', icon: Clock },
    { id: 3, name: 'First Branch', icon: Store },
    { id: 4, name: 'Select Plan', icon: Sparkles },
    { id: 5, name: 'Payment', icon: CreditCard },
  ];

  if (!isRegistered) {
    return <LoginPage onLoginSuccess={() => setIsRegistered(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16">
      {/* Top Banner & Navigation Header */}
      <div className="bg-white border-b border-[#E5E0D8] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#D4A753] to-[#9E782F] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#1A1615] tracking-tight">REVIA ONBOARDING ORCHESTRATOR</div>
              <div className="text-[10px] uppercase font-semibold text-[#9E9A93] tracking-wider">Enterprise Venue Provisioning Engine</div>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-[#6E6A66] hover:text-[#1A1615] px-3 py-1.5 rounded-lg border border-[#E5E0D8] hover:bg-[#FAF8F5] cursor-pointer"
          >
            Save Draft & Exit
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top 5-Step Horizontal Wizard */}
        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 sm:p-5 mb-6 shadow-xs">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E5E0D8] -translate-y-1/2 z-0 hidden md:block" />

            {steps.map((step) => {
              const isPast = step.id < activeStep;
              const isCurrent = step.id === activeStep;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all text-xs font-bold ${isPast
                        ? 'bg-[#0D7A53] text-white ring-4 ring-[#E6F4ED]'
                        : isCurrent
                          ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-md ring-4 ring-[#FDF8EB]'
                          : 'bg-white border-2 border-[#E5E0D8] text-[#9E9A93] group-hover:border-[#9E9A93]'
                      }`}
                  >
                    {isPast ? <Check className="w-4 h-4 text-white" /> : <span>{step.id}</span>}
                  </div>
                  <div className="mt-2 text-center">
                    <span
                      className={`text-xs font-semibold block ${isCurrent
                          ? 'text-[#1A1615] font-bold'
                          : isPast
                            ? 'text-[#0D7A53]'
                            : 'text-[#9E9A93]'
                        }`}
                    >
                      {step.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] uppercase font-bold text-[#9E782F] tracking-wider block">
                        • ACTIVE STEP
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Area: Form + Right Progress Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form Area (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-[#E5E0D8] rounded-xl p-6 shadow-xs">
              {activeStep === 1 && (
                <>
                  <div className="border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                      STEP 01 // BUSINESS PROFILE
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-[#1A1615] mt-1">
                      Business Information
                    </h2>
                    <p className="text-xs text-[#6E6A66] mt-1">
                      Set up your tenant profile and business details.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">Business Name</label>
                      <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">Owner Name</label>
                      <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" />
                    </div>
                  </div>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <div className="border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                      STEP 02 // OPERATIONS
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-[#1A1615] mt-1">
                      Category & Settings
                    </h2>
                    <p className="text-xs text-[#6E6A66] mt-1">
                      Define your primary business category and regional preferences.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">Business Category</label>
                      <input type="text" value={businessCategory} onChange={(e) => setBusinessCategory(e.target.value)} className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" placeholder="e.g. Coffee Shop, Retail" />
                    </div>
                  </div>
                </>
              )}

              {activeStep === 3 && (
                <>
                  <div className="border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                      STEP 03 // PHYSICAL RETAIL PROFILE
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-[#1A1615] mt-1">
                      Configure Flagship Outlet & Register Setup
                    </h2>
                    <p className="text-xs text-[#6E6A66] mt-1">
                      Define the operating parameters and hardware profile for your initial physical location.
                    </p>
                  </div>

                  {/* Branch Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">
                        Official Branch Name
                      </label>
                      <input
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">
                        Physical Address & GPS Pin
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#9E782F] absolute left-3 top-3" />
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg pl-9 pr-3.5 py-2.5 text-xs font-medium text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                        />
                      </div>
                    </div>

                    {/* Mock Map Preview Box */}
                    <div className="h-32 rounded-lg border border-[#E5E0D8] bg-[#F5F4F0] relative overflow-hidden flex items-center justify-center">
                      <div
                        className="absolute inset-0 opacity-40 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'radial-gradient(#D4A753 1px, transparent 1px), radial-gradient(#9E782F 1px, #FAF8F5 1px)',
                          backgroundSize: '20px 20px',
                          backgroundPosition: '0 0, 10px 10px',
                        }}
                      />
                      <div className="relative z-10 bg-white/95 border border-[#E5E0D8] px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#0D7A53] animate-ping" />
                        <span className="text-xs font-bold text-[#1A1615]">Montgomery Flagship Beacon Verified</span>
                        <span className="text-[10px] text-[#0D7A53] font-semibold bg-[#E6F4ED] px-1.5 py-0.5 rounded">
                          ±1.2m Accuracy
                        </span>
                      </div>
                    </div>

                    {/* Timezone & Operating Hours */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">
                          Store Timezone
                        </label>
                        <input
                          type="text"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1A1615]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">
                          Daily Operating Hours
                        </label>
                        <input
                          type="text"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-medium text-[#1A1615]"
                        />
                      </div>
                    </div>

                    {/* Selection Cards: Primary Register Architecture */}
                    <div className="pt-4 border-t border-[#E5E0D8]">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                        Primary Register Architecture
                      </label>
                      <p className="text-[11px] text-[#9E9A93] mb-3">
                        Select your counter interaction flow to optimize POS scanning speed and receipt printing.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Option 1 */}
                        <div
                          onClick={() => setRegisterType('counter')}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${registerType === 'counter'
                              ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                              : 'border-[#E5E0D8] bg-white hover:bg-[#FAF8F5]'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                              <Coffee className="w-4 h-4" />
                            </div>
                            {registerType === 'counter' && (
                              <div className="w-4 h-4 rounded-full bg-[#9E782F] text-white flex items-center justify-center text-[10px]">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#1A1615]">Counter Barista</div>
                          <div className="text-[10px] text-[#6E6A66] mt-0.5">High-volume pour-over bar, dual customer display scanner.</div>
                        </div>

                        {/* Option 2 */}
                        <div
                          onClick={() => setRegisterType('salon')}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${registerType === 'salon'
                              ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                              : 'border-[#E5E0D8] bg-white hover:bg-[#FAF8F5]'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                              <Store className="w-4 h-4" />
                            </div>
                            {registerType === 'salon' && (
                              <div className="w-4 h-4 rounded-full bg-[#9E782F] text-white flex items-center justify-center text-[10px]">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#1A1615]">Tasting Salon</div>
                          <div className="text-[10px] text-[#6E6A66] mt-0.5">Table-side sensory service, mobile wallet NFC checkout.</div>
                        </div>

                        {/* Option 3 */}
                        <div
                          onClick={() => setRegisterType('express')}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${registerType === 'express'
                              ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                              : 'border-[#E5E0D8] bg-white hover:bg-[#FAF8F5]'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                              <Zap className="w-4 h-4" />
                            </div>
                            {registerType === 'express' && (
                              <div className="w-4 h-4 rounded-full bg-[#9E782F] text-white flex items-center justify-center text-[10px]">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#1A1615]">Express Window</div>
                          <div className="text-[10px] text-[#6E6A66] mt-0.5">Sub-20s tap & go scan, automated loyalty stamp batching.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeStep === 4 && (
                <>
                  <div className="border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                      STEP 04 // SUBSCRIPTION
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-[#1A1615] mt-1">
                      Choose Your Plan
                    </h2>
                    <p className="text-xs text-[#6E6A66] mt-1">
                      Select the tier that best fits your business needs.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Plan Options */}
                    <div
                      onClick={() => setSelectedPlan('starter')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedPlan === 'starter'
                          ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                          : 'border-[#E5E0D8] bg-white hover:bg-[#FAF8F5]'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-[#1A1615]">Starter</div>
                          <div className="text-[11px] text-[#6E6A66]">Essential tools for single-location shops.</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-[#1A1615]">₹49<span className="text-[10px] text-[#9E9A93] font-normal">/mo</span></div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedPlan('pro')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${selectedPlan === 'pro'
                          ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                          : 'border-[#E5E0D8] bg-white hover:bg-[#FAF8F5]'
                        }`}
                    >
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">RECOMMENDED</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-[#1A1615]">Pro</div>
                          <div className="text-[11px] text-[#6E6A66]">Advanced loyalty and multi-branch support.</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-[#1A1615]">₹99<span className="text-[10px] text-[#9E9A93] font-normal">/mo</span></div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedPlan('enterprise')}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedPlan === 'enterprise'
                          ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                          : 'border-[#E5E0D8] bg-white hover:bg-[#FAF8F5]'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-[#1A1615]">Enterprise</div>
                          <div className="text-[11px] text-[#6E6A66]">Custom deployments and API access.</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-[#1A1615]">Custom</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeStep === 5 && (
                <>
                  <div className="border-b border-[#E5E0D8] pb-4 mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                      STEP 05 // PAYMENT
                    </span>
                    <h2 className="text-xl font-bold tracking-tight text-[#1A1615] mt-1">
                      Payment Details
                    </h2>
                    <p className="text-xs text-[#6E6A66] mt-1">
                      Enter your payment information to finalize your {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan subscription.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-4 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider">Total Due Today</div>
                          <div className="text-sm font-bold text-[#1A1615]">
                            {selectedPlan === 'starter' ? '₹49.00' : selectedPlan === 'pro' ? '₹99.00' : 'Contact Sales'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedPlan !== 'enterprise' ? (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">Cardholder Name</label>
                          <input type="text" placeholder="Name on card" className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">CVC</label>
                            <input type="text" placeholder="123" className="w-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg px-3.5 py-2.5 text-xs font-semibold text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 text-[#0D7A53] text-[10px] font-bold bg-[#E6F4ED] p-3 rounded-lg border border-[#BCE3D1]">
                          <Lock className="w-3.5 h-3.5" /> All transactions are secure and encrypted.
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl border-dashed">
                        <p className="text-sm font-semibold text-[#1A1615]">Enterprise Setup Pending</p>
                        <p className="text-xs text-[#6E6A66] mt-1">An enterprise sales representative will contact you to set up billing and custom provisioning.</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Bottom Actions */}
              <div className="mt-8 pt-5 border-t border-[#E5E0D8] flex items-center justify-between">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-4 py-2.5 rounded-lg border border-[#E5E0D8] text-xs font-semibold text-[#6E6A66] hover:bg-[#FAF8F5] cursor-pointer"
                  >
                    ← Back
                  </button>
                ) : (
                  <div></div>
                )}
                <PrimaryButton
                  type="button"
                  onClick={() => {
                    if (activeStep < 5) setActiveStep(activeStep + 1);
                    else onComplete();
                  }}
                  className="py-2.5 px-5 text-xs font-semibold"
                >
                  {activeStep === 5 ? 'Complete Onboarding' : 'Continue →'}
                </PrimaryButton>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Progress Checklist & Trust Benchmarks (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Progress Checklist Widget */}
            <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                  PROGRESS CHECKLIST
                </span>
                <span className="text-xs font-bold text-[#9E782F]">{Math.round(((activeStep - 1) / steps.length) * 100)}% Complete</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#E5E0D8] mb-4">
                <div className={`h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full`} style={{ width: `${((activeStep - 1) / steps.length) * 100}%` }} />
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-[#0D7A53]">
                  <span className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Legal Merchant Registration
                  </span>
                  <span className="text-[10px] font-bold">DONE</span>
                </div>
                {steps.map((step) => {
                  const isDone = activeStep > step.id;
                  const isCurrent = activeStep === step.id;

                  return (
                    <div key={step.id} className={`flex items-center justify-between ${isDone ? 'text-[#0D7A53]' : isCurrent ? 'text-[#1A1615] font-semibold' : 'text-[#9E9A93]'}`}>
                      <span className="flex items-center gap-2 font-medium">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full bg-[#9E782F] text-white flex items-center justify-center text-[10px]">
                            {step.id}
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#E5E0D8] text-[10px] flex items-center justify-center">
                            {step.id}
                          </div>
                        )}
                        {step.name}
                      </span>
                      <span className={`text-[10px] font-bold ${isDone ? '' : isCurrent ? 'text-[#9E782F]' : 'font-normal'}`}>
                        {isDone ? 'DONE' : isCurrent ? 'IN PROGRESS' : 'PENDING'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SOC-2 Type II PCI Trust Badges */}
            <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl p-4">
              <div className="flex items-center gap-2 text-[#0D7A53] text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4 text-[#0D7A53]" />
                <span>Enterprise Trust Guarantee</span>
              </div>
              <p className="text-[11px] text-[#6E6A66] leading-relaxed">
                Revia runs on SOC-2 Type II certified infrastructure. Customer digital wallet keys are never stored on cleartext cloud storage.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-[#E5E0D8] text-[#1A1615]">
                  SOC-2 TYPE II
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-[#E5E0D8] text-[#1A1615]">
                  PCI-DSS LEVEL 1
                </span>
              </div>
            </div>

            {/* Branch Speed Benchmarks */}
            <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] block mb-2">
                BRANCH SPEED BENCHMARK
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#1A1615]">38s</span>
                <span className="text-xs font-semibold text-[#0D7A53]">Avg. Order-to-Pour</span>
              </div>
              <p className="text-[11px] text-[#6E6A66] mt-1">
                Baristas equipped with Revia instant NFC scanner redeem rewards 2.8x faster than standard punch cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
