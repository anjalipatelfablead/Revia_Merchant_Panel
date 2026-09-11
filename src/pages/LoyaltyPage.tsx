import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Zap,
  Clock,
  Check,
  Shield,
  Smartphone,
  ChevronRight,
  Coffee,
  Gift,
  QrCode,
  Tag,
  Share2,
  Lock
} from 'lucide-react';
import { PrimaryButton, TierBadge } from '../components/common/Badges';

export const LoyaltyPage: React.FC = () => {
  // Section 1 State: Core Stamp Mechanics
  const [passBrandName, setPassBrandName] = useState('Blue Bottle Cafe');
  const [qualifyingMinSpend, setQualifyingMinSpend] = useState<number>(8.00);
  const [maxStamps, setMaxStamps] = useState<number>(10);

  // Section 2 State: Reward Definition
  const [selectedRewardType, setSelectedRewardType] = useState<string>('flight');
  const [expiryDays, setExpiryDays] = useState<number>(90);

  // Section 3 State: Tier Upgrades
  const [t2Threshold, setT2Threshold] = useState<number>(500);
  const [t3Threshold, setT3Threshold] = useState<number>(1500);

  // Section 4 State: Flash Velocity Windows
  const [flashVelocityActive, setFlashVelocityActive] = useState<boolean>(true);
  const [velocityMultiplier, setVelocityMultiplier] = useState<string>('2X Stamps');

  // Preview Wallet Type
  const [walletView, setWalletView] = useState<'apple' | 'google'>('apple');
  const [currentStampsInPreview, setCurrentStampsInPreview] = useState<number>(7);

  const rewardTypes = [
    {
      id: 'flight',
      title: 'Signature Flight',
      desc: 'Complimentary Single Origin Tasting Flight (Valued $24.00)',
      icon: Coffee,
    },
    {
      id: 'voucher',
      title: 'Fixed Voucher',
      desc: '$10.00 store credit applied directly at register scan',
      icon: Tag,
    },
    {
      id: 'rebate',
      title: 'Percentage Rebate',
      desc: '20% off whole bean bags or brewing equipment',
      icon: Gift,
    },
    {
      id: 'custom',
      title: 'Custom Tasting Item',
      desc: 'Specialty seasonal release or barista cupping access',
      icon: Sparkles,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            REWARDS ARCHITECTURE // PASS ORCHESTRATOR
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Loyalty Program Builder</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Configure stamp cards, multi-tier milestones, instant NFC mobile wallet passes, and flash velocity windows.
          </p>
        </div>

        <PrimaryButton onClick={() => alert('Publishing loyalty program rules to live NFC network...')} className="py-2 px-4 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Publish Program Changes</span>
        </PrimaryButton>
      </div>

      {/* Main Grid: Form Sections (Left 7 cols) + Live Wallet Simulator (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Sections */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Core Stamp Mechanics */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1615]">1. Core Stamp Mechanics</h3>
                <p className="text-[11px] text-[#6E6A66]">Digital stamp qualification criteria & punch threshold</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                  Pass Card Title
                </label>
                <input
                  type="text"
                  value={passBrandName}
                  onChange={(e) => setPassBrandName(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                  Min Spend to Earn Stamp ($)
                </label>
                <input
                  type="number"
                  step="1"
                  value={qualifyingMinSpend}
                  onChange={(e) => setQualifyingMinSpend(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs font-semibold px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1.5">
                Stamps Required for Complete Card Reward
              </label>
              <div className="flex items-center gap-3">
                {[6, 8, 10, 12].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setMaxStamps(cnt)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      maxStamps === cnt
                        ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white border-[#9E782F]'
                        : 'bg-[#FAF8F5] text-[#6E6A66] border-[#E5E0D8] hover:bg-[#F5F4F0]'
                    }`}
                  >
                    {cnt} Stamps
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Reward Definition & Expiration */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1615]">2. Reward Definition & Expiration</h3>
                <p className="text-[11px] text-[#6E6A66]">Choose the perk unlocked upon completing full stamps</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rewardTypes.map((rew) => {
                const Icon = rew.icon;
                const isSelected = selectedRewardType === rew.id;

                return (
                  <div
                    key={rew.id}
                    onClick={() => setSelectedRewardType(rew.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#D4A753] bg-[#FDF8EB]/50 ring-2 ring-[#D4A753]/20'
                        : 'border-[#E5E0D8] bg-[#FAF8F5]/40 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#9E782F]" />
                        <span className="text-xs font-bold text-[#1A1615]">{rew.title}</span>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#9E782F] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-[#6E6A66]">{rew.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#E5E0D8] text-xs">
              <span className="font-semibold text-[#6E6A66]">Reward Expiry Window:</span>
              <div className="flex items-center gap-2">
                {[60, 90, 180, 365].map((days) => (
                  <button
                    key={days}
                    onClick={() => setExpiryDays(days)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold border ${
                      expiryDays === days
                        ? 'bg-[#1A1615] text-[#D4AF37] border-[#1A1615]'
                        : 'bg-[#FAF8F5] text-[#6E6A66] border-[#E5E0D8]'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Tier & Milestone Upgrades */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A1615]">3. Tier & Milestone Upgrades</h3>
                <p className="text-[11px] text-[#6E6A66]">Vertical stacked tiers with automatic qualification</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* T1 Member */}
              <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <TierBadge tier="Standard" />
                    <span className="text-xs font-bold text-[#1A1615]">T1 Member</span>
                  </div>
                  <p className="text-[10px] text-[#6E6A66] mt-1">Automatic entry on 1st scan • Base 1x stamp earning</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#6E6A66]">$0.00 Entry</span>
              </div>

              {/* T2 Gold Reserve */}
              <div className="p-3 bg-[#FDF8EB]/50 border border-[#F3E5C8] rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <TierBadge tier="Gold Reserve" />
                    <span className="text-xs font-bold text-[#1A1615]">T2 Gold Reserve</span>
                  </div>
                  <p className="text-[10px] text-[#6E6A66] mt-1">10% Off Wholesale Beans • Priority Mobile Queue</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="text-[10px] text-[#9E9A93]">Spend &gt;</span>
                  <input
                    type="number"
                    value={t2Threshold}
                    onChange={(e) => setT2Threshold(Number(e.target.value))}
                    className="w-20 px-2 py-1 bg-white border border-[#E5E0D8] rounded text-right font-mono"
                  />
                </div>
              </div>

              {/* T3 Obsidian VIP */}
              <div className="p-3 bg-[#1A1615] text-white rounded-xl flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <TierBadge tier="Obsidian VIP" />
                    <span className="text-xs font-bold text-[#D4AF37]">T3 Obsidian VIP</span>
                  </div>
                  <p className="text-[10px] text-white/70 mt-1">Free Reserve Tastings • Private Cupping Salon Invites</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <span className="text-[10px] text-white/50">Spend &gt;</span>
                  <input
                    type="number"
                    value={t3Threshold}
                    onChange={(e) => setT3Threshold(Number(e.target.value))}
                    className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-right font-mono text-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Flash Velocity Windows */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#9E782F]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1A1615]">4. Flash Velocity Windows</h3>
                  <p className="text-[11px] text-[#6E6A66]">Time-based multiplier to drive off-peak footfall</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={flashVelocityActive}
                  onChange={(e) => setFlashVelocityActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0D7A53]"></div>
              </label>
            </div>

            {flashVelocityActive && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-[#9E9A93] block mb-1">Active Multiplier</span>
                  <div className="flex items-center gap-2">
                    {['2X Stamps', '3X Stamps'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setVelocityMultiplier(m)}
                        className={`px-3 py-1 text-xs font-bold rounded-md ${
                          velocityMultiplier === m
                            ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white'
                            : 'bg-white border border-[#E5E0D8] text-[#6E6A66]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-[#9E9A93] block mb-1">Time Window</span>
                  <div className="text-xs font-bold text-[#1A1615] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#9E782F]" /> Weekdays 02:00 PM - 05:00 PM
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Preview: Live Digital Wallet Pass Simulator (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">LIVE SIMULATOR</span>
                <h3 className="text-sm font-bold text-[#1A1615]">Digital Wallet Pass</h3>
              </div>

              {/* Toggle Apple Wallet vs Google Wallet */}
              <div className="flex p-0.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setWalletView('apple')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    walletView === 'apple' ? 'bg-white shadow-2xs text-[#1A1615]' : 'text-[#6E6A66]'
                  }`}
                >
                  Apple Wallet
                </button>
                <button
                  onClick={() => setWalletView('google')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    walletView === 'google' ? 'bg-white shadow-2xs text-[#1A1615]' : 'text-[#6E6A66]'
                  }`}
                >
                  Google Pay
                </button>
              </div>
            </div>

            {/* Interactive Stamps preview slider */}
            <div className="flex items-center justify-between text-xs text-[#6E6A66] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5E0D8]">
              <span>Test Stamp Count:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: maxStamps }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStampsInPreview(i + 1)}
                    className={`w-5 h-5 rounded text-[10px] font-bold ${
                      i < currentStampsInPreview ? 'bg-[#9E782F] text-white' : 'bg-white border border-[#E5E0D8]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Rendered Mobile Card (Apple / Google style) */}
            <div
              className={`rounded-2xl p-5 shadow-xl transition-all duration-300 relative overflow-hidden ${
                walletView === 'apple'
                  ? 'bg-gradient-to-br from-[#1A1615] via-[#2D2624] to-[#1A1615] text-white'
                  : 'bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF] border-2 border-[#E5E0D8] text-[#1A1615]'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#D4A753] to-[#9E782F] flex items-center justify-center text-white font-bold text-xs">
                    ☕
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-tight uppercase">
                      {passBrandName || 'REVIA MERCHANT'}
                    </div>
                    <div className="text-[10px] text-[#D4A753] font-semibold">Specialty Coffee Pass</div>
                  </div>
                </div>

                <TierBadge tier="Obsidian VIP" />
              </div>

              {/* Card Body & Stamp Grid */}
              <div className="py-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                    LOYALTY STAMP PROGRESS
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D4A753]">
                    {currentStampsInPreview} OF {maxStamps} COLLECTED
                  </span>
                </div>

                {/* Stamp Circles */}
                <div className="grid grid-cols-5 gap-2 my-2">
                  {Array.from({ length: maxStamps }).map((_, idx) => {
                    const isFilled = idx < currentStampsInPreview;
                    const isLast = idx === maxStamps - 1;

                    return (
                      <div
                        key={idx}
                        className={`h-11 rounded-xl flex flex-col items-center justify-center transition-all ${
                          isFilled
                            ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-md'
                            : 'bg-white/10 border border-white/15 text-white/40'
                        }`}
                      >
                        {isFilled ? (
                          <span className="text-sm">☕</span>
                        ) : isLast ? (
                          <Sparkles className="w-4 h-4 text-[#D4A753]" />
                        ) : (
                          <span className="text-[11px] font-mono opacity-50">{idx + 1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Next Reward Banner */}
                <div className="mt-3 p-2.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] uppercase font-bold text-[#D4A753]">Next Reward</div>
                    <div className="font-semibold text-[11px]">
                      {selectedRewardType === 'flight' ? 'Signature Flight' : 'Store Reward'}
                    </div>
                  </div>
                  <span className="text-[10px] opacity-80">{maxStamps - currentStampsInPreview} stamps away</span>
                </div>
              </div>

              {/* NFC Barcode / QR Simulation */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-7 h-7 text-[#D4A753]" />
                  <div className="text-[9px] font-mono leading-tight opacity-70">
                    <div>PASS-NFC-9981-82</div>
                    <div>AES-GCM-256</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">
                  Tap at Counter
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-[#6E6A66]">
                Syncs with Apple Wallet & Google Wallet NFC pass APIs in real time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
