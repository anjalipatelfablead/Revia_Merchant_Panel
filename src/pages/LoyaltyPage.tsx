import React, { useState } from 'react';
import {
  Undo2,
  Save,
  Sparkles,
  Award,
  Gift,
  Shield,
  Zap,
  Coffee,
  Ticket,
  Percent,
  ShoppingBag,
  ChevronDown,
  ScanBarcode,
  TrendingUp,
  Plus,
  Check,
  Nfc,
  QrCode
} from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  passes: string;
  desc: string;
  style: 'default' | 'gold' | 'dark' | 'new';
}

const initialTiers: Tier[] = [
  { id: 'T1', name: 'Member', passes: '0–4 completed passes', desc: 'Standard 1x stamp earning velocity. Universal menu eligibility.', style: 'default' },
  { id: 'T2', name: 'Gold Reserve', passes: '5–9 completed passes', desc: '1.25x earning speed, complimentary birthday pastry, and secret menu access.', style: 'gold' },
  { id: 'T3', name: 'Obsidian VIP', passes: '10+ completed passes', desc: '1.5x double-stamp happy hours, private quarterly cupping tastings.', style: 'dark' }
];

export const LoyaltyPage: React.FC = () => {
  // State for forms
  const [passBrandName, setPassBrandName] = useState('Revia Artisanal Stamp Pass');
  const [qualificationRule, setQualificationRule] = useState('Spend at least ₹6.00 per visit');
  const [stampsToComplete, setStampsToComplete] = useState<number>(10);
  const [selectedReward, setSelectedReward] = useState<string>('flight');
  const [expirationWindow, setExpirationWindow] = useState('Voucher valid for 30 days post completion');
  const [flashActive, setFlashActive] = useState<boolean>(true);
  const [walletView, setWalletView] = useState<'ios' | 'google' | 'pwa'>('ios');

  // Tier Management State
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [isAddingTier, setIsAddingTier] = useState(false);
  const [newTierName, setNewTierName] = useState('');
  const [newTierPasses, setNewTierPasses] = useState('');
  const [newTierDesc, setNewTierDesc] = useState('');

  // Wallet State
  const [isAddedToWallet, setIsAddedToWallet] = useState(false);

  const handleAddToWallet = () => {
    setIsAddedToWallet(true);
    setTimeout(() => setIsAddedToWallet(false), 3000);
  };

  // Publish State
  const [publishStatus, setPublishStatus] = useState<'idle' | 'publishing' | 'published'>('idle');

  const handlePublish = () => {
    if (publishStatus !== 'idle') return;
    setPublishStatus('publishing');
    setTimeout(() => {
      setPublishStatus('published');
      setTimeout(() => setPublishStatus('idle'), 3000);
    }, 1500);
  };

  const handleAddTier = () => {
    if (!newTierName || !newTierPasses || !newTierDesc) return;
    const newTier: Tier = {
      id: `T${tiers.length + 1}`,
      name: newTierName,
      passes: newTierPasses,
      desc: newTierDesc,
      style: 'new'
    };
    setTiers([...tiers, newTier]);
    setIsAddingTier(false);
    setNewTierName('');
    setNewTierPasses('');
    setNewTierDesc('');
  };

  const [branches, setBranches] = useState({
    downtown: true,
    northside: true,
    westend: false,
  });

  const rewards = [
    {
      id: 'flight',
      title: 'Signature Flight',
      desc: 'Free Specialty Beverage or 3-Pour Flight (up to ₹14 value)',
      icon: Coffee
    },
    {
      id: 'voucher',
      title: 'Fixed Voucher',
      desc: '₹15.00 off entire guest tab, including pastry cases',
      icon: Ticket
    },
    {
      id: 'rebate',
      title: 'Percentage Rebate',
      desc: '25% discount applied across whole ticket',
      icon: Percent
    },
    {
      id: 'custom',
      title: 'Custom Tasting Item',
      desc: 'Single-origin 250g bag of whole-bean reserve',
      icon: ShoppingBag
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#FAF8F5] min-h-[calc(100vh-4rem)]">
      {/* 2. PAGE HEADER & ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title */}
        <div className="w-full lg:w-auto">
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight">
            Loyalty Program Builder
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:gap-3 self-start lg:self-auto w-full lg:w-auto">
          <button className="flex-none px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#6E6A66] hover:bg-[#EFECE6] rounded-lg transition-colors cursor-pointer text-center">
            <span className="hidden sm:inline">Discard Changes</span>
            <span className="sm:hidden">Discard</span>
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#1A1615] bg-white border border-[#EAE6E1] hover:bg-[#FAF8F5] rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap">
            <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={publishStatus !== 'idle'}
            className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-lg transition-all shadow-xs ${publishStatus === 'published'
              ? 'bg-[#15803D] cursor-default'
              : publishStatus === 'publishing'
                ? 'bg-[#1A1615] opacity-80 cursor-wait'
                : 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:opacity-95 cursor-pointer'
              }`}
          >
            {publishStatus === 'idle' && <><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Publish Program Changes</span><span className="sm:hidden">Publish</span></>}
            {publishStatus === 'publishing' && <span className="animate-pulse flex items-center gap-2">Publishing...</span>}
            {publishStatus === 'published' && <><Check className="w-4 h-4" /> Published Successfully</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3. LEFT COLUMN: PROGRAM CONFIGURATION BUILDER */}
        <div className="lg:col-span-7 space-y-6">

          {/* Section 1: Core Stamp Mechanics */}
          <div className="bg-white rounded-[16px] border border-[#EFECE6] p-6 shadow-xs">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center text-[#9E782F]">
                  <Award className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-[#1A1615]">1. Core Stamp Mechanics</h2>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-[#FDF4E7] text-[#D4A753] rounded-full">
                Primary Loop
              </span>
            </div>
            <p className="text-sm text-[#6E6A66] mb-5 ml-11">
              Define how patrons earn and track physical digital stamps.
            </p>

            <div className="space-y-5 ml-11">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9E9A93]">Pass Brand Name</label>
                  <input
                    type="text"
                    value={passBrandName}
                    onChange={(e) => setPassBrandName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753] focus:ring-1 focus:ring-[#D4A753]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9E9A93]">Stamps to Complete Pass</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stampsToComplete}
                      onChange={(e) => setStampsToComplete(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753] focus:ring-1 focus:ring-[#D4A753]/20 transition-all"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6E6A66]">
                      Stamps
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#9E9A93]">Earning Qualification Rule</label>
                <div className="relative">
                  <select
                    value={qualificationRule}
                    onChange={(e) => setQualificationRule(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753] focus:ring-1 focus:ring-[#D4A753]/20 transition-all cursor-pointer pr-10"
                  >
                    <option value="Spend at least ₹6.00 per visit">Spend at least ₹6.00 per visit</option>
                    <option value="Buy any 1 specialty drink">Buy any 1 specialty drink</option>
                    <option value="Any transaction > ₹0.00">Any transaction &gt; ₹0.00</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#6E6A66] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span>
                  Stamps are triggered automatically via integrated Square and Clover POS webhooks.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#9E9A93] mb-3">Progress Milestones</div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EFECE6] rounded-full text-xs font-semibold text-[#1A1615] shadow-xs">
                    <span className="text-[#D4A753]">•</span> Stamp 5: Midpoint Perk
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EFECE6] rounded-full text-xs font-semibold text-[#1A1615] shadow-xs">
                    <span className="text-[#0D7A53]">•</span> Stamp 10: Complete Reward
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Reward Definition & Expiration */}
          <div className="bg-white rounded-[16px] border border-[#EFECE6] p-6 shadow-xs">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center text-[#9E782F]">
                  <Gift className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-[#1A1615]">2. Reward Definition & Expiration</h2>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded-full">
                Incentive
              </span>
            </div>

            <div className="ml-11 mt-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rewards.map((rew) => {
                  const Icon = rew.icon;
                  const isSelected = selectedReward === rew.id;
                  return (
                    <div
                      key={rew.id}
                      onClick={() => setSelectedReward(rew.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${isSelected
                        ? 'border-[#D4A753] bg-[#FDF8EB]/30'
                        : 'border-[#EFECE6] bg-[#FAF8F5]/50 hover:bg-[#FAF8F5]'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#D4A753] text-white' : 'bg-white border border-[#EFECE6] text-[#6E6A66]'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#1A1615] mb-0.5">{rew.title}</div>
                          <div className="text-xs text-[#6E6A66] leading-relaxed">{rew.desc}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-5 h-5 rounded-full bg-[#D4A753] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#EFECE6]">
                <div className="space-y-2 mt-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9E9A93]">Voucher Expiration Window</label>
                  <div className="relative">
                    <select
                      value={expirationWindow}
                      onChange={(e) => setExpirationWindow(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753] transition-all cursor-pointer pr-10"
                    >
                      <option value="Voucher valid for 30 days post completion">Voucher valid for 30 days post completion</option>
                      <option value="Voucher valid for 60 days post completion">Voucher valid for 60 days post completion</option>
                      <option value="No expiration date">No expiration date</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2 mt-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#9E9A93]">Branch Availability</label>
                  <div className="space-y-2">
                    <label
                      className="flex items-center gap-2 cursor-pointer group"
                      onClick={(e) => { e.preventDefault(); setBranches({ ...branches, downtown: !branches.downtown }); }}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${branches.downtown ? 'bg-[#1A1615] border-[#1A1615]' : 'border-[#D1CDC7] group-hover:border-[#1A1615] bg-white'}`}>
                        {branches.downtown && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-[#1A1615]">Downtown Flagship [Roastery]</span>
                    </label>
                    <label
                      className="flex items-center gap-2 cursor-pointer group"
                      onClick={(e) => { e.preventDefault(); setBranches({ ...branches, northside: !branches.northside }); }}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${branches.northside ? 'bg-[#1A1615] border-[#1A1615]' : 'border-[#D1CDC7] group-hover:border-[#1A1615] bg-white'}`}>
                        {branches.northside && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-[#1A1615]">Northside Mall Atrium Bar</span>
                    </label>
                    <label
                      className="flex items-center gap-2 cursor-pointer group"
                      onClick={(e) => { e.preventDefault(); setBranches({ ...branches, westend: !branches.westend }); }}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${branches.westend ? 'bg-[#1A1615] border-[#1A1615]' : 'border-[#D1CDC7] group-hover:border-[#1A1615] bg-white'}`}>
                        {branches.westend && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-[#1A1615]">West End Espresso Kiosk</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Tier & Milestone Upgrades */}
          <div className="bg-white rounded-[16px] border border-[#EFECE6] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center text-[#9E782F]">
                  <Shield className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-[#1A1615]">3. Tier & Milestone Upgrades</h2>
              </div>
              <button
                onClick={() => setIsAddingTier(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#EFECE6] rounded-lg text-xs font-semibold text-[#1A1615] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Level
              </button>
            </div>

            <div className="ml-11 space-y-3">
              {tiers.map((tier) => {
                if (tier.style === 'default') {
                  return (
                    <div key={tier.id} className="flex items-start gap-4 p-4 rounded-xl bg-[#F7F5F0] border border-[#EFECE6]">
                      <div className="w-10 h-10 rounded-full bg-white border border-[#EFECE6] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="text-sm font-bold text-[#6E6A66]">{tier.id}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-[#1A1615]">{tier.name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#EFECE6] text-[10px] font-bold text-[#6E6A66]">
                            {tier.passes}
                          </span>
                        </div>
                        <p className="text-xs text-[#6E6A66] leading-relaxed">{tier.desc}</p>
                      </div>
                    </div>
                  );
                } else if (tier.style === 'gold') {
                  return (
                    <div key={tier.id} className="flex items-start gap-4 p-4 rounded-xl bg-[#FDF8EB] border border-[#F3E5C8] relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A753] to-[#9E782F]"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-sm font-bold">{tier.id}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-[#1A1615]">{tier.name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-[#F3E5C8] text-[10px] font-bold text-[#D4A753]">
                            {tier.passes}
                          </span>
                        </div>
                        <p className="text-xs text-[#8A6A32] leading-relaxed">{tier.desc}</p>
                      </div>
                    </div>
                  );
                } else if (tier.style === 'dark') {
                  return (
                    <div key={tier.id} className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1615] border border-[#2D2624] text-white">
                      <div className="w-10 h-10 rounded-full bg-[#2D2624] border border-[#3E3532] text-white flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-sm font-bold">{tier.id}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-white">{tier.name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-[10px] font-bold text-white">
                            {tier.passes}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">{tier.desc}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={tier.id} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#EFECE6] shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EFECE6] text-[#9E782F] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="text-sm font-bold">{tier.id}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-[#1A1615]">{tier.name}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EFECE6] text-[10px] font-bold text-[#9E782F]">
                            {tier.passes}
                          </span>
                        </div>
                        <p className="text-xs text-[#6E6A66] leading-relaxed">{tier.desc}</p>
                      </div>
                    </div>
                  );
                }
              })}

              {/* Add New Tier Form */}
              {isAddingTier && (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#D4A753] shadow-sm animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-[#6E6A66]">T{tiers.length + 1}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#9E9A93] mb-1 block">Tier Name</label>
                        <input type="text" value={newTierName} onChange={(e) => setNewTierName(e.target.value)} className="w-full text-sm font-bold text-[#1A1615] bg-[#FAF8F5] border border-[#EFECE6] rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#D4A753]" placeholder="e.g. Platinum Elite" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#9E9A93] mb-1 block">Passes Required</label>
                        <input type="text" value={newTierPasses} onChange={(e) => setNewTierPasses(e.target.value)} className="w-full text-[11px] font-bold text-[#6E6A66] bg-[#FAF8F5] border border-[#EFECE6] rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#D4A753]" placeholder="e.g. 15+ completed passes" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#9E9A93] mb-1 block">Perks Description</label>
                      <input type="text" value={newTierDesc} onChange={(e) => setNewTierDesc(e.target.value)} className="w-full text-xs text-[#6E6A66] bg-[#FAF8F5] border border-[#EFECE6] rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#D4A753]" placeholder="e.g. 2x stamp earning, free merchandise." />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button onClick={() => setIsAddingTier(false)} className="px-3 py-1.5 text-xs font-semibold text-[#6E6A66] hover:bg-[#FAF8F5] rounded-md transition-colors cursor-pointer">Cancel</button>
                      <button onClick={handleAddTier} className="px-3 py-1.5 bg-[#1A1615] hover:bg-black text-white text-xs font-bold rounded-md transition-colors cursor-pointer">Save Tier</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Flash Velocity Windows */}
          <div className="bg-white rounded-[16px] border border-[#EFECE6] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center text-[#9E782F]">
                  <Zap className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-[#1A1615]">4. Flash Velocity Windows</h2>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F4ED] border border-[#BCE3D1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53] animate-pulse"></span>
                <span className="text-[10px] font-bold text-[#0D7A53] tracking-wide">ACTIVE NOW</span>
              </div>
            </div>

            <div className="ml-11 mt-4">
              <div className="bg-[#FAF8F5] rounded-xl border border-[#EFECE6] p-4 flex items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#1A1615]">Weekday Afternoon Double Stamp Hours</h3>
                    <span className="px-2 py-0.5 rounded border border-[#EFECE6] bg-white text-[10px] font-bold text-[#6E6A66] whitespace-nowrap">
                      Mon - Fri
                    </span>
                  </div>
                  <p className="text-xs text-[#6E6A66]">
                    2:00 PM - 5:00 PM - Double stamp issued per qualified transaction.
                  </p>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={() => setFlashActive(!flashActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D7A53] focus:ring-offset-2 ${flashActive ? 'bg-[#0D7A53]' : 'bg-[#D1CDC7]'
                    }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${flashActive ? 'translate-x-5' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 4. RIGHT COLUMN: LIVE SIMULATOR & ROI METRICS */}
        <div className="lg:col-span-5 space-y-6 sticky top-6">

          {/* Top Widget: Customer Pass Simulator */}
          <div className="bg-white rounded-[16px] border border-[#EFECE6] overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-[#EFECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F5]">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#1A1615]">
                LIVE WALLET RENDER: <span className="text-[#6E6A66] font-semibold normal-case">Customer Pass Simulator</span>
              </h3>

              <div className="flex p-0.5 bg-[#EFECE6] rounded-lg">
                <button
                  onClick={() => setWalletView('ios')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${walletView === 'ios' ? 'bg-white shadow-xs text-[#1A1615]' : 'text-[#6E6A66] hover:text-[#1A1615]'}`}
                >
                  iOS
                </button>
                <button
                  onClick={() => setWalletView('google')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${walletView === 'google' ? 'bg-white shadow-xs text-[#1A1615]' : 'text-[#6E6A66] hover:text-[#1A1615]'}`}
                >
                  Google
                </button>
                <button
                  onClick={() => setWalletView('pwa')}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${walletView === 'pwa' ? 'bg-white shadow-xs text-[#1A1615]' : 'text-[#6E6A66] hover:text-[#1A1615]'}`}
                >
                  PWA
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-gradient-to-b from-[#F5F2EC] to-[#FAF8F5] flex justify-center">
              {/* Live Phone Pass Preview Card */}
              <div className="w-full max-w-[340px] bg-[#FDFBF7] rounded-[24px] shadow-xl overflow-hidden border border-[#E5E0D8] relative">
                {/* Top Notch Area simulation for iOS */}
                {walletView === 'ios' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-[16px] z-10"></div>
                )}

                {/* Pass Header */}
                <div className="bg-[#1A1615] px-4 py-6 pb-8 text-white relative">
                  {/* Subtle noise/texture would go here */}
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-bold uppercase tracking-widest text-[#D4A753]">
                      GOLD TIER #REV-8924
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#D4A753] to-[#9E782F] flex items-center justify-center border-2 border-white/10 shadow-lg shrink-0">
                      <Coffee className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white/70 truncate">REVIA CAFE - DOWNTOWN FLAGSHIP</div>
                      <div className="text-sm sm:text-base font-bold text-white tracking-tight truncate">{passBrandName || "Artisanal Stamp Pass"}</div>
                    </div>
                  </div>
                </div>

                {/* Pass Body (Overlapping Header) */}
                <div className="px-3 sm:px-4 pb-5 -mt-4 relative z-10">
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#EFECE6]">
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#9E9A93]">Pass Holder</div>
                        <div className="text-sm font-bold text-[#1A1615]">Julianna Sterling</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#9E9A93]">Pass Reward</div>
                        <div className="text-sm font-bold text-[#D4A753]">
                          {rewards.find(r => r.id === selectedReward)?.title || "Reward"}
                        </div>
                      </div>
                    </div>

                    {/* Stamp Matrix */}
                    <div className="space-y-3">
                      {/* Row 1 (Stamps 1-5) */}
                      <div className="flex justify-between">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div key={num} className="w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-inner shrink-0">
                            <Coffee className="w-4 h-4 fill-current" />
                          </div>
                        ))}
                      </div>
                      {/* Row 2 (Stamps 6-10) */}
                      <div className="flex justify-between">
                        {[6, 7, 8].map((num) => (
                          <div key={num} className="w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-inner shrink-0">
                            <Coffee className="w-4 h-4 fill-current" />
                          </div>
                        ))}
                        {/* Stamp 9 (Empty) */}
                        <div className="w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center border-2 border-dashed border-[#D1CDC7] bg-[#FAF8F5] text-[#9E9A93] font-bold text-sm shrink-0">
                          9
                        </div>
                        {/* Stamp 10 (Reward) */}
                        <div className="w-9 h-9 sm:w-[38px] sm:h-[38px] rounded-full flex items-center justify-center border-2 border-[#D4A753] bg-[#FDF8EB] text-[#D4A753] shrink-0">
                          <Gift className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs font-bold bg-[#FAF8F5] px-3 py-2 rounded-lg border border-[#EFECE6]">
                      <span className="text-[#1A1615] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A753]"></span>
                        2 more stamps to unlock Free Flight
                      </span>
                      <span className="text-[#6E6A66]">8 / 10</span>
                    </div>
                  </div>
                </div>

                {/* Bottom NFC Bar */}
                <div className="bg-[#FAF8F5] border-t border-[#EFECE6] px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615]">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                      <ScanBarcode className="w-3.5 h-3.5" />
                    </div>
                    <Nfc className="w-4 h-4" /> NFC TAP READY
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg border border-[#EFECE6] p-1 flex items-center justify-center shadow-xs">
                    {/* QR code using lucide icon */}
                    <QrCode className="w-full h-full text-[#1A1615] opacity-80" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white border-t border-[#EFECE6]">
              <button
                onClick={handleAddToWallet}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${isAddedToWallet
                  ? 'bg-[#0D7A53] hover:bg-[#0D7A53]/90 text-white'
                  : 'bg-black hover:bg-black/90 text-white'
                  }`}
              >
                {isAddedToWallet ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Wallet
                  </>
                ) : (
                  'Add Card to Apple & Google Wallet'
                )}
              </button>
            </div>
          </div>

          {/* Bottom Widget: Margin Health & ROI Simulation */}
          <div className="bg-white rounded-[16px] border border-[#EFECE6] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1615]">MARGIN HEALTH & ROI SIMULATION</h3>
              <span className="px-2 py-1 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded border border-[#BCE3D1]">
                ~High Efficiency
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EFECE6]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1">Est. Cost Per Stamp</div>
                <div className="text-xl font-bold text-[#1A1615] mb-1">₹0.42 <span className="text-xs text-[#6E6A66] font-semibold">/ purchase</span></div>
                <div className="text-[11px] text-[#6E6A66] leading-tight">
                  6.8% reward allowance based on ₹6.20 average cup.
                </div>
              </div>
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EFECE6]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9E9A93] mb-1">Repeat Visit Lift</div>
                <div className="text-xl font-bold text-[#0D7A53] mb-1 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +18.4% <span className="text-xs text-[#6E6A66] font-semibold">vs Cohort</span>
                </div>
                <div className="text-[11px] text-[#6E6A66] leading-tight">
                  Projected +2.1 additional monthly transactions/patron.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#1A1615] to-[#2D2624] text-white shadow-inner relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">Net Incremental Revenue</div>
                <div className="text-2xl font-bold text-[#D4A753]">+₹3,420 <span className="text-sm text-white/70">/ branch / mo</span></div>
              </div>

              {/* Subtle upward trend micro-chart line in background */}
              <svg className="absolute right-0 bottom-0 w-32 h-16 opacity-30" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path d="M0,50 Q20,40 40,30 T80,15 T100,0 L100,50 Z" fill="url(#gradient)" />
                <path d="M0,50 Q20,40 40,30 T80,15 T100,0" fill="none" stroke="#D4A753" strokeWidth="2" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A753" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#D4A753" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
