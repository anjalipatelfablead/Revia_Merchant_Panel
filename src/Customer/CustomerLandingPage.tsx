import React, { useState, useEffect } from 'react';
import {
  QrCode, ArrowRight, CheckCircle2, Star, Shield,
  Smartphone, Gift, Clock, ChevronRight, Menu, X,
  Zap, RefreshCw, Eye, Lock, Bell, TrendingUp
} from 'lucide-react';
import { CustomerHeader } from './components/shared/CustomerHeader';
import { CustomerFooter } from './components/shared/CustomerFooter';

interface Props {
  onNavigate?: (route: string) => void;
}

// ─── Reusable Components ─────────────────────────────────────────────────────

const GoldBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
    {children}
  </span>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-5 h-px bg-[#C89B3C]" />
    <span className="text-[#C89B3C] text-[10px] font-black uppercase tracking-[0.25em]">{children}</span>
  </div>
);

// ─── Mobile Mockup Frame ──────────────────────────────────────────────────────
const MobileFrame = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative w-[220px] bg-white rounded-[32px] border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col ${className}`} style={{ minHeight: 420 }}>
    {/* Status bar */}
    <div className="bg-white flex items-center justify-between px-5 pt-3 pb-1 shrink-0">
      <span className="text-[9px] font-bold text-[#222]">9:41</span>
      <div className="w-14 h-3 bg-[#222] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
      <div className="flex gap-1 items-center">
        <div className="w-3 h-1.5 border border-[#222] rounded-sm relative"><div className="absolute inset-0.5 right-auto w-[55%] bg-[#222] rounded-sm" /></div>
      </div>
    </div>
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
);

// ─── Journey Step Data ────────────────────────────────────────────────────────
const journeySteps = [
  {
    num: '01', title: 'Scan the QR', icon: QrCode,
    desc: 'Scan the business QR code to open the correct business and branch experience instantly.',
    mockupBg: '#F8F8F6',
    mockup: (
      <div className="flex flex-col items-center justify-center h-full px-4 py-6 bg-[#F8F8F6]">
        <div className="w-12 h-12 bg-[#C89B3C] rounded-xl flex items-center justify-center mb-3 shadow-lg">
          <span className="text-white font-black text-xl">R</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#222] mb-1">Revia Coffee</p>
        <p className="text-[9px] text-[#999] mb-4">Downtown Branch</p>
        <div className="w-24 h-24 bg-white border-2 border-[#E5E5E5] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <QrCode className="w-14 h-14 text-[#222]" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#C89B3C] font-bold">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] animate-pulse" />
          Scanning...
        </div>
      </div>
    ),
  },
  {
    num: '02', title: 'Discover the Benefit', icon: Star,
    desc: 'Understand what the loyalty program offers before you join. Clear, simple, no surprises.',
    mockup: (
      <div className="flex flex-col h-full bg-white">
        <div className="bg-[#222] px-4 py-5 flex flex-col items-center">
          <div className="w-10 h-10 bg-[#C89B3C] rounded-xl flex items-center justify-center mb-2">
            <span className="text-white font-black text-base">R</span>
          </div>
          <p className="text-white font-bold text-sm">Revia Coffee</p>
          <p className="text-white/50 text-[9px]">Loyalty Program</p>
        </div>
        <div className="flex-1 px-4 py-4">
          <div className="bg-[#F8F8F6] rounded-xl p-3 mb-3 border border-[#E5E5E5]">
            <p className="text-[9px] font-black uppercase tracking-wider text-[#C89B3C] mb-1">Loyalty Benefit</p>
            <p className="text-sm font-black text-[#222]">Earn 1 Stamp per Visit</p>
            <p className="text-[9px] text-[#666]">Collect 10 stamps → Free Coffee</p>
          </div>
          <div className="space-y-1.5 mb-4">
            {['Free reward after 10 visits', 'Exclusive member offers', 'Easy mobile redemption'].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-[9px] text-[#666]">
                <CheckCircle2 className="w-3 h-3 text-[#C89B3C] shrink-0" />{b}
              </div>
            ))}
          </div>
          <button className="w-full bg-[#C89B3C] text-white text-[10px] font-black py-2.5 rounded-xl">Join Now →</button>
          <p className="text-[8px] text-[#999] text-center mt-2">By joining you agree to Terms & Privacy</p>
        </div>
      </div>
    ),
  },
  {
    num: '03', title: 'Sign In With Your Mobile', icon: Smartphone,
    desc: 'Quick mobile OTP authentication. No passwords, no apps. Just your number and a code.',
    mockup: (
      <div className="flex flex-col h-full bg-white px-4 py-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C] mb-1">Step 1 of 2</p>
        <p className="text-sm font-black text-[#222] mb-1">Enter Your Mobile</p>
        <p className="text-[9px] text-[#666] mb-4">We'll send a one-time code to verify</p>
        <div className="flex gap-2 mb-3">
          <div className="bg-[#F8F8F6] border border-[#E5E5E5] rounded-lg px-2 py-2 text-[10px] text-[#222] font-bold w-14 text-center">🇬🇧 +44</div>
          <div className="flex-1 bg-[#F8F8F6] border border-[#C89B3C] rounded-lg px-3 py-2 text-[10px] text-[#222]">7700 900 123</div>
        </div>
        <button className="w-full bg-[#222] text-white text-[10px] font-black py-2.5 rounded-xl mb-3">Continue →</button>
        <div className="border-t border-[#E5E5E5] pt-3">
          <p className="text-[9px] text-[#999] text-center mb-2">Enter 6-digit OTP</p>
          <div className="grid grid-cols-6 gap-1 mb-2">
            {['4', '2', '·', '·', '·', '·'].map((d, i) => (
              <div key={i} className={`h-7 rounded-lg flex items-center justify-center text-xs font-black border ${d !== '·' ? 'border-[#C89B3C] bg-[#C89B3C]/5 text-[#222]' : 'border-[#E5E5E5] text-transparent'}`}>{d !== '·' ? d : '—'}</div>
            ))}
          </div>
          <div className="flex justify-between text-[8px]">
            <span className="text-[#C89B3C] font-bold">Resend OTP</span>
            <span className="text-[#999]">Expires 01:28</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: '04', title: 'Pick Up Where You Left Off', icon: RefreshCw,
    desc: 'Revia recognizes whether you\'re a new or returning member and loads your existing progress.',
    mockup: (
      <div className="flex flex-col h-full bg-white px-4 py-5">
        <div className="flex-1 space-y-3">
          <div className="bg-[#F0FFF8] border border-[#BCE3D1] rounded-xl p-3">
            <p className="text-[9px] font-black text-[#0D7A53] uppercase tracking-wider mb-1">✓ Existing Member</p>
            <p className="text-sm font-black text-[#222]">Welcome back, Sarah!</p>
            <p className="text-[9px] text-[#666]">Your progress is ready to continue</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#C89B3C] w-[80%] h-full rounded-full" />
              </div>
              <span className="text-[9px] font-bold text-[#C89B3C]">8/10</span>
            </div>
          </div>
          <div className="bg-[#F8F8F6] border border-[#E5E5E5] rounded-xl p-3 opacity-50">
            <p className="text-[9px] font-black text-[#666] uppercase tracking-wider mb-1">New Member</p>
            <p className="text-xs font-bold text-[#222]">Welcome! Join this loyalty program.</p>
            <p className="text-[9px] text-[#666]">Start your journey from stamp 1</p>
          </div>
        </div>
        <button className="w-full bg-[#C89B3C] text-white text-[10px] font-black py-2.5 rounded-xl mt-3">Continue My Journey →</button>
      </div>
    ),
  },
  {
    num: '05', title: 'Create Your Profile', icon: Shield,
    desc: 'Provide the minimum information needed to personalise and manage your loyalty membership.',
    mockup: (
      <div className="flex flex-col h-full bg-white px-4 py-4">
        <p className="text-sm font-black text-[#222] mb-1">Your Profile</p>
        <p className="text-[9px] text-[#666] mb-3">Required to manage your membership</p>
        <div className="space-y-2 mb-3">
          {[{ label: 'First Name *', val: 'Sarah' }, { label: 'Last Name *', val: 'Jenkins' }, { label: 'Email (optional)', val: '' }].map((f, i) => (
            <div key={i}>
              <p className="text-[8px] font-bold text-[#666] mb-0.5">{f.label}</p>
              <div className={`w-full bg-[#F8F8F6] border rounded-lg px-2.5 py-1.5 text-[10px] ${f.val ? 'border-[#C89B3C] text-[#222]' : 'border-[#E5E5E5] text-[#bbb]'}`}>
                {f.val || 'Optional'}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 bg-[#F8F8F6] rounded-lg p-2 mb-3">
          <div className="w-3 h-3 rounded bg-[#C89B3C] flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-2 h-2 text-white" />
          </div>
          <p className="text-[8px] text-[#666] leading-relaxed">I agree to the <span className="text-[#C89B3C] font-bold">Terms</span> & <span className="text-[#C89B3C] font-bold">Privacy Policy</span></p>
        </div>
        <button className="w-full bg-[#222] text-white text-[10px] font-black py-2.5 rounded-xl">Save & Continue →</button>
      </div>
    ),
  },
  {
    num: '06', title: 'Join the Loyalty Program', icon: Star,
    desc: 'Join once and start building your loyalty progress immediately with a warm welcome.',
    mockup: (
      <div className="flex flex-col items-center h-full bg-white px-4 py-5 text-center">
        <div className="w-14 h-14 bg-[#C89B3C] rounded-2xl flex items-center justify-center mb-3 shadow-lg">
          <Star className="w-7 h-7 text-white fill-current" />
        </div>
        <p className="text-sm font-black text-[#222] mb-1">Join Loyalty</p>
        <p className="text-[9px] text-[#666] mb-3 leading-relaxed">Revia Coffee Rewards Program<br />Earn 1 stamp per qualifying visit</p>
        <div className="w-full bg-[#F8F8F6] rounded-xl p-3 mb-4 text-left border border-[#E5E5E5]">
          <p className="text-[8px] font-black uppercase text-[#C89B3C] mb-1">Welcome Benefit</p>
          <p className="text-[10px] font-bold text-[#222]">🎁 Double stamps on your first visit</p>
        </div>
        <button className="w-full bg-[#C89B3C] text-white text-[10px] font-black py-2.5 rounded-xl mb-2">Join Loyalty →</button>
        <div className="w-full bg-[#F0FFF8] border border-[#BCE3D1] rounded-xl p-2.5">
          <p className="text-[9px] font-black text-[#0D7A53]">✓ Welcome to the loyalty program!</p>
        </div>
      </div>
    ),
  },
  {
    num: '07', title: 'Track Your Progress', icon: TrendingUp,
    desc: 'Your beautiful digital loyalty card shows current stamps, next reward and recent activity.',
    mockup: (
      <div className="flex flex-col h-full bg-[#F8F8F6] p-3">
        <div className="bg-gradient-to-br from-[#222] to-[#3a3a3a] rounded-2xl p-4 mb-3 text-white shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/50">REVIA LOYALTY</p>
              <p className="text-sm font-black">Revia Coffee</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-white/50">Progress</p>
              <p className="text-base font-black text-[#C89B3C]">8 / 10</p>
            </div>
          </div>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`flex-1 h-5 rounded-md flex items-center justify-center text-[8px] font-black ${i < 8 ? 'bg-[#C89B3C] text-white' : 'bg-white/10 text-white/30'}`}>
                {i < 8 ? '●' : '○'}
              </div>
            ))}
          </div>
          <p className="text-[8px] text-white/60">2 more qualifying events to your reward</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-[#E5E5E5]">
          <p className="text-[8px] font-black uppercase tracking-wider text-[#666] mb-2">Recent Activity</p>
          {[{ label: 'Visit recorded', date: 'Today', pts: '+1' }, { label: 'Visit recorded', date: 'Mon', pts: '+1' }].map((a, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-[#F5F5F5] last:border-0">
              <p className="text-[9px] text-[#444] font-medium">{a.label}</p>
              <div className="text-right"><p className="text-[9px] font-black text-[#C89B3C]">{a.pts}</p><p className="text-[8px] text-[#999]">{a.date}</p></div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '08', title: 'Discover Your Offers', icon: Gift,
    desc: 'See active offers and campaigns that are applicable to you based on your profile and activity.',
    mockup: (
      <div className="flex flex-col h-full bg-[#F8F8F6] p-3 gap-2">
        {[
          { tag: 'Loyalty Offer', title: 'Double Stamps Weekend', desc: 'Valid Sat–Sun only', badge: 'Active', color: '#C89B3C' },
          { tag: 'Special Offer', title: 'Buy 1 Get 1 Free', desc: 'Downtown Branch · Expires 30 Sep', badge: 'New', color: '#0D7A53' },
        ].map((o, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden shadow-sm">
            <div className="h-14 bg-gradient-to-r from-[#222] to-[#333] flex items-center justify-between px-3">
              <span className="text-[8px] font-black text-white/60 uppercase tracking-wider">{o.tag}</span>
              <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full" style={{ background: o.color, color: '#fff' }}>{o.badge}</span>
            </div>
            <div className="p-2.5">
              <p className="text-[10px] font-black text-[#222] mb-0.5">{o.title}</p>
              <p className="text-[8px] text-[#999] mb-2">{o.desc}</p>
              <button className="text-[9px] font-black text-[#C89B3C] flex items-center gap-1">View Offer <ChevronRight className="w-2.5 h-2.5" /></button>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '09', title: 'Build Loyalty Through Activity', icon: CheckCircle2,
    desc: 'Your qualifying activity updates your loyalty progress. Track every interaction in real time.',
    mockup: (
      <div className="flex flex-col h-full bg-white px-4 py-4">
        <p className="text-xs font-black text-[#222] mb-1">Activity Update</p>
        <div className="bg-[#F0FFF8] border border-[#BCE3D1] rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#0D7A53]" />
            <p className="text-[10px] font-black text-[#0D7A53]">Visit Recorded!</p>
          </div>
          <p className="text-[9px] text-[#666]">Revia Coffee · Downtown Branch</p>
          <p className="text-[8px] text-[#999]">Today · 2:34 PM</p>
        </div>
        <div className="bg-[#F8F8F6] rounded-xl p-3 mb-3 border border-[#E5E5E5]">
          <p className="text-[8px] font-black uppercase tracking-wider text-[#C89B3C] mb-1">Loyalty Updated</p>
          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-[#222]">8 → 9 / 10 stamps</p>
            <span className="text-[9px] font-black text-white bg-[#C89B3C] px-1.5 py-0.5 rounded-full">+1</span>
          </div>
          <div className="mt-2 bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#C89B3C] w-[90%] h-full rounded-full" />
          </div>
        </div>
        <p className="text-[9px] text-[#666] text-center bg-[#F8F8F6] rounded-lg p-2">1 more visit to unlock your reward 🎉</p>
      </div>
    ),
  },
  {
    num: '10', title: 'Unlock Your Reward', icon: Gift,
    desc: 'When an eligible campaign or loyalty rule is satisfied, your reward becomes available instantly.',
    mockup: (
      <div className="flex flex-col items-center h-full bg-white px-4 py-5 text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#C89B3C] to-[#a07520] rounded-full flex items-center justify-center shadow-xl">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0D7A53] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C] mb-1">Congratulations!</p>
        <p className="text-sm font-black text-[#222] mb-1">You Earned a Reward!</p>
        <div className="w-full bg-[#F8F8F6] border border-[#E5E5E5] rounded-xl p-3 mb-3 text-left">
          <p className="text-[8px] text-[#999] mb-0.5">Your Reward</p>
          <p className="text-lg font-black text-[#222]">10% OFF</p>
          <p className="text-[9px] text-[#666]">Any purchase · Valid until 30 Sep</p>
          <p className="text-[8px] text-[#C89B3C] font-bold mt-1">REV-8924-ABCD</p>
        </div>
        <button className="w-full bg-[#C89B3C] text-white text-[10px] font-black py-2.5 rounded-xl">View Reward →</button>
      </div>
    ),
  },
  {
    num: '11', title: 'Keep All Rewards in One Place', icon: Eye,
    desc: 'Your Rewards Wallet keeps all available, redeemed, expired and voided rewards organised.',
    mockup: (
      <div className="flex flex-col h-full bg-[#F8F8F6] p-3">
        <div className="flex gap-1.5 mb-3">
          {['Available', 'Redeemed', 'Expired'].map((t, i) => (
            <button key={t} className={`text-[8px] font-black px-2 py-1 rounded-full ${i === 0 ? 'bg-[#222] text-white' : 'bg-white border border-[#E5E5E5] text-[#666]'}`}>{t}</button>
          ))}
        </div>
        {[{ title: '10% OFF', src: 'Loyalty Reward', val: 'Any purchase', exp: 'Exp 30 Sep', status: 'Available' }].map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden shadow-sm">
            <div className="h-12 bg-gradient-to-r from-[#C89B3C] to-[#a07520] flex items-center justify-center">
              <p className="text-xl font-black text-white">{r.title}</p>
            </div>
            <div className="p-3">
              <p className="text-[8px] text-[#999] font-medium">{r.src}</p>
              <p className="text-[10px] font-bold text-[#222] mb-0.5">{r.val}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[8px] text-[#999]">{r.exp}</p>
                <button className="text-[8px] font-black text-[#C89B3C] border border-[#C89B3C] px-2 py-0.5 rounded-full">Show QR</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '12', title: 'Redeem With a Simple QR', icon: QrCode,
    desc: 'Show your reward QR or code at the counter when you\'re ready. Staff validates instantly.',
    mockup: (
      <div className="flex flex-col items-center h-full bg-white px-4 py-5 text-center">
        <p className="text-[8px] font-black uppercase tracking-widest text-[#C89B3C] mb-1">Show at Counter</p>
        <p className="text-xs font-black text-[#222] mb-3">10% OFF — Any Purchase</p>
        <div className="w-28 h-28 bg-[#F8F8F6] border-2 border-[#C89B3C] rounded-2xl flex items-center justify-center mb-3 shadow-sm">
          <QrCode className="w-20 h-20 text-[#222]" />
        </div>
        <div className="bg-[#F8F8F6] rounded-lg px-3 py-1.5 mb-3 border border-[#E5E5E5]">
          <p className="text-[10px] font-black tracking-widest text-[#222] font-mono">REV-8924-ABCD</p>
        </div>
        <div className="flex items-center gap-1 text-[8px] text-[#0D7A53] font-bold bg-[#F0FFF8] border border-[#BCE3D1] rounded-full px-3 py-1 mb-2">
          <div className="w-1.5 h-1.5 bg-[#0D7A53] rounded-full animate-pulse" />
          Available · Valid until 30 Sep
        </div>
        <p className="text-[8px] text-[#999]">Revia Coffee · Downtown Branch only</p>
      </div>
    ),
  },
  {
    num: '13', title: 'Reward Redeemed', icon: CheckCircle2,
    desc: 'Clear confirmation once your reward has been successfully validated and redeemed.',
    mockup: (
      <div className="flex flex-col items-center h-full bg-white px-4 py-5 text-center">
        <div className="w-16 h-16 bg-[#0D7A53] rounded-full flex items-center justify-center mb-4 shadow-lg">
          <CheckCircle2 className="w-9 h-9 text-white" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#0D7A53] mb-1">Success</p>
        <p className="text-sm font-black text-[#222] mb-4">Reward Redeemed!</p>
        <div className="w-full bg-[#F8F8F6] rounded-xl border border-[#E5E5E5] p-3 text-left space-y-1.5 mb-3">
          {[['Reward', '10% OFF'], ['Business', 'Revia Coffee'], ['Branch', 'Downtown Branch'], ['Time', 'Today, 7:42 PM'], ['Ref', 'RDM-20260911-001']].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[9px]">
              <span className="text-[#999]">{k}</span>
              <span className="text-[#222] font-bold">{v}</span>
            </div>
          ))}
        </div>
        <button className="w-full border border-[#E5E5E5] text-[#666] text-[10px] font-bold py-2 rounded-xl">View History</button>
      </div>
    ),
  },
];

const benefits = [
  { icon: QrCode, title: 'Simple to Join', desc: 'Quick mobile authentication with OTP — no app download required.' },
  { icon: TrendingUp, title: 'Easy to Track', desc: 'See your loyalty progress, stamps and recent activity in one place.' },
  { icon: Gift, title: 'Relevant Offers', desc: 'View active offers and campaigns that are applicable to your profile.' },
  { icon: Eye, title: 'Rewards in One Place', desc: 'Manage your available, redeemed and expired rewards easily.' },
  { icon: QrCode, title: 'Easy Redemption', desc: 'Show your reward QR or code at the counter. Staff validates instantly.' },
  { icon: RefreshCw, title: 'Your Progress Stays', desc: 'Returning customers continue their existing membership and stamps.' },
];

const flowSteps = [
  { icon: QrCode, label: 'SCAN', desc: 'One scan opens the experience' },
  { icon: Star, label: 'JOIN', desc: 'Authenticate and join loyalty' },
  { icon: TrendingUp, label: 'EARN', desc: 'Build progress through visits' },
  { icon: Gift, label: 'DISCOVER', desc: 'See relevant offers' },
  { icon: Zap, label: 'REWARD', desc: 'Unlock eligible rewards' },
  { icon: QrCode, label: 'REDEEM', desc: 'Show QR at the counter' },
  { icon: RefreshCw, label: 'RETURN', desc: 'Continue your journey' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export const CustomerLandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white text-[#222] font-sans antialiased selection:bg-[#C89B3C]/20">

      {/* ── NAVBAR ────────────────────────────────────────────────── */}
      <CustomerHeader onNavigate={onNavigate} />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0B0A]">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=2400" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0A] via-[#0D0B0A]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Text */}
          <div>
            <GoldBadge><QrCode className="w-3 h-3" /> No App Download Required</GoldBadge>
            <h1 className="mt-8 text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
              Scan.<br />Join.<br />Earn.<br /><span className="text-[#C89B3C]">Come Back.</span>
            </h1>
            <p className="mt-8 text-lg text-white/50 leading-relaxed max-w-md">
              Discover loyalty benefits, unlock relevant offers, earn rewards and keep track of your activity — all from a simple mobile experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate?.('/customer')}
                className="group flex items-center justify-center gap-3 bg-[#C89B3C] hover:bg-[#a07520] text-white px-8 py-4 rounded-full text-sm font-black tracking-wide transition-all shadow-2xl shadow-[#C89B3C]/30"
              >
                Join Loyalty <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all">
                See How It Works
              </button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-white/30 text-sm">
              <Smartphone className="w-4 h-4" />
              <span>Works on any mobile browser · No download needed</span>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <MobileFrame className="scale-110">
              <div className="flex flex-col h-full bg-white">
                <div className="bg-[#222] px-4 py-5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#C89B3C] rounded-xl flex items-center justify-center mb-2 shadow-lg">
                    <span className="text-white font-black text-lg">R</span>
                  </div>
                  <p className="text-white font-bold text-sm">Revia Coffee</p>
                  <p className="text-white/40 text-[9px]">Downtown Branch · London</p>
                </div>
                <div className="flex-1 px-4 py-4 flex flex-col">
                  <div className="bg-[#F8F8F6] rounded-xl p-3 mb-3 border border-[#E5E5E5]">
                    <p className="text-[8px] font-black uppercase tracking-wider text-[#C89B3C] mb-1">Loyalty Program</p>
                    <p className="text-sm font-black text-[#222]">Earn 1 Stamp per Visit</p>
                    <p className="text-[9px] text-[#666]">10 stamps = Free Coffee ☕</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 mb-3">
                    {['No app download needed', 'Works on any phone', 'Exclusive member offers'].map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-[9px] text-[#444]">
                        <CheckCircle2 className="w-3 h-3 text-[#C89B3C] shrink-0" />{b}
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#C89B3C] text-white text-[10px] font-black py-3 rounded-xl shadow-lg">Join Loyalty →</button>
                  <p className="text-[8px] text-[#bbb] text-center mt-2">By joining you agree to Terms & Privacy</p>
                </div>
              </div>
            </MobileFrame>
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────── */}
      <section className="bg-[#C89B3C] py-3 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
          {[...Array(4)].map((_, gi) => (
            <React.Fragment key={gi}>
              {['Scan · Join · Earn · Redeem', '·', 'No App Download', '·', 'Mobile OTP Login', '·', 'Rewards Wallet', '·', 'Loyalty Card', '·', 'Instant Offers'].map((item, i) => (
                <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── VALUE PROPOSITION ─────────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Why Revia</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-[#222] tracking-tight leading-[1.05] mb-4">
              Everything You Need to Make<br />Every Visit More Rewarding
            </h2>
            <p className="text-[#666] text-lg leading-relaxed">
              Revia creates a simple QR-to-loyalty experience that helps customers discover benefits, build loyalty progress and access rewards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: QrCode, title: 'Easy QR Entry', desc: 'Scan a business QR and open the correct business or branch experience immediately.' },
              { icon: TrendingUp, title: 'Simple Loyalty', desc: 'Join a loyalty program and keep track of your current progress with a beautiful loyalty card.' },
              { icon: Bell, title: 'Relevant Offers', desc: 'Discover active offers and campaigns that are applicable to your profile and activity.' },
              { icon: Gift, title: 'Rewards', desc: 'View, manage and redeem rewards earned through your loyalty journey in one place.' },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-[#E5E5E5] shadow-sm hover:shadow-md hover:border-[#C89B3C]/30 transition-all group">
                <div className="w-12 h-12 bg-[#C89B3C]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C89B3C] transition-colors">
                  <card.icon className="w-5 h-5 text-[#C89B3C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-black text-[#222] mb-2">{card.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — JOURNEY ─────────────────────────────────── */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-[#222] tracking-tight leading-[1.05] mb-4">Your Complete Loyalty Journey</h2>
            <p className="text-[#666] text-lg leading-relaxed">From your first QR scan to your next reward, Revia keeps the experience simple.</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent -translate-x-1/2" />

            <div className="space-y-20 lg:space-y-28">
              {journeySteps.map((step, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={step.num} className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                    {/* Content */}
                    <div className={`${isEven ? 'lg:pr-16' : 'lg:pl-16 lg:order-2'}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black text-[#C89B3C] tracking-[0.2em]">STEP {step.num}</span>
                        <div className="w-8 h-px bg-[#C89B3C]" />
                      </div>
                      <h3 className="text-3xl font-black text-[#222] mb-4 leading-tight">{step.title}</h3>
                      <p className="text-[#666] text-lg leading-relaxed">{step.desc}</p>
                    </div>

                    {/* Mockup */}
                    <div className={`flex justify-center ${isEven ? 'lg:pl-16' : 'lg:pr-16 lg:order-1'}`}>
                      <div className="relative">
                        {/* Timeline dot */}
                        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 lg:left-auto lg:right-auto w-8 h-8 bg-white border-2 border-[#C89B3C] rounded-full items-center justify-center text-[10px] font-black text-[#C89B3C] shadow-sm z-10" style={{ left: isEven ? 'calc(100% + 2.5rem)' : 'calc(-2.5rem - 1.5rem)' }}>
                          {step.num}
                        </div>
                        <MobileFrame>{step.mockup}</MobileFrame>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE FLOW ────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>The Flow</SectionLabel>
            <h2 className="text-4xl font-black text-[#222] tracking-tight mb-4">From One Scan to Long-Term Loyalty</h2>
            <p className="text-[#666]">Revia turns simple customer interactions into a connected loyalty journey.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 flex-wrap">
            {flowSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center text-center p-4 group">
                  <div className="w-14 h-14 bg-white border-2 border-[#E5E5E5] rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:border-[#C89B3C] group-hover:bg-[#C89B3C] transition-all">
                    <step.icon className="w-5 h-5 text-[#C89B3C] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#222] mb-0.5">{step.label}</p>
                  <p className="text-[9px] text-[#999] max-w-[80px] leading-tight">{step.desc}</p>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#C89B3C] hidden md:block mx-1 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── RETURNING CUSTOMER ─────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mockup */}
          <div className="flex justify-center">
            <MobileFrame>
              <div className="flex flex-col h-full bg-white px-4 py-5">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-[#F0FFF8] border border-[#BCE3D1] rounded-full flex items-center justify-center mx-auto mb-2">
                    <RefreshCw className="w-5 h-5 text-[#0D7A53]" />
                  </div>
                  <p className="text-[10px] font-black text-[#0D7A53] uppercase tracking-wider">Existing Member</p>
                  <p className="text-sm font-black text-[#222]">Welcome back, Sarah!</p>
                </div>
                <div className="bg-gradient-to-br from-[#222] to-[#3a3a3a] rounded-2xl p-3 mb-3 text-white shadow-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40">YOUR PROGRESS</p>
                    <p className="text-xs font-black text-[#C89B3C]">8/10</p>
                  </div>
                  <div className="flex gap-1 mb-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className={`flex-1 h-4 rounded-sm ${i < 8 ? 'bg-[#C89B3C]' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-[7px] text-white/40">2 more visits to your free coffee</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#F8F8F6] rounded-xl p-2.5 border border-[#E5E5E5]">
                    <p className="text-[8px] font-black text-[#C89B3C] uppercase tracking-wider mb-0.5">Active Offer</p>
                    <p className="text-[10px] font-bold text-[#222]">Double Stamps Weekend</p>
                  </div>
                  <button className="w-full bg-[#C89B3C] text-white text-[10px] font-black py-2.5 rounded-xl">Continue My Journey →</button>
                </div>
              </div>
            </MobileFrame>
          </div>
          {/* Content */}
          <div>
            <SectionLabel>Returning Customers</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-[#222] tracking-tight leading-[1.05] mb-5">Your Progress Stays<br /><span className="text-[#C89B3C]">With You</span></h2>
            <p className="text-[#666] text-lg leading-relaxed mb-8">
              Returning customers are recognised instantly. Your existing loyalty progress, membership status and available rewards are all waiting for you — right where you left off.
            </p>
            <div className="space-y-4">
              {[
                { icon: QrCode, text: 'Scan QR → Mobile verified → Existing member detected' },
                { icon: TrendingUp, text: 'Existing loyalty progress loaded instantly' },
                { icon: Gift, text: 'Current offers and available rewards shown' },
                { icon: RefreshCw, text: 'Continue your engagement seamlessly' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#C89B3C]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <p className="text-sm text-[#444] font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────── */}
      <section className="py-28 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Customer Benefits</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-black text-[#222] tracking-tight leading-[1.05]">Why Customers Love<br />the Revia Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white p-7 rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-md hover:border-[#C89B3C]/30 transition-all group">
                <div className="w-11 h-11 bg-[#C89B3C]/8 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C89B3C] transition-colors">
                  <b.icon className="w-5 h-5 text-[#C89B3C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-black text-[#222] mb-2">{b.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <SectionLabel>Your Data, Your Control</SectionLabel>
              <h2 className="text-3xl font-black text-[#222] mb-4">Privacy & Consent Built In</h2>
              <p className="text-[#666] leading-relaxed max-w-xl">Manage your profile information, consent settings and available privacy controls. Revia keeps you in control of your data at every step of your loyalty journey.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, label: 'Consent Managed' },
                { icon: Lock, label: 'Secure OTP Auth' },
                { icon: Eye, label: 'Transparent Data Use' },
                { icon: CheckCircle2, label: 'Privacy Controls' },
              ].map((item, i) => (
                <div key={i} className="bg-[#F8F8F6] border border-[#E5E5E5] rounded-xl p-4 flex flex-col items-center text-center gap-2">
                  <item.icon className="w-5 h-5 text-[#C89B3C]" />
                  <p className="text-[10px] font-black text-[#222] leading-tight">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0D0B0A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#C89B3C15_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <GoldBadge><Star className="w-3 h-3 fill-current" /> Start Your Journey</GoldBadge>
          <h2 className="mt-8 text-4xl lg:text-6xl font-black text-white leading-[1.0] tracking-tight mb-6">
            Ready to Start Your<br /><span className="text-[#C89B3C]">Loyalty Journey?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            Scan, join, earn and redeem — all from one simple mobile experience. No app download required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate?.('/customer')}
              className="group flex items-center justify-center gap-3 bg-[#C89B3C] hover:bg-[#a07520] text-white px-10 py-4 rounded-full text-sm font-black tracking-wide transition-all shadow-2xl shadow-[#C89B3C]/30"
            >
              Join Loyalty <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-full text-sm font-bold tracking-wide transition-all">
              Explore Revia
            </button>
          </div>
          <p className="mt-6 text-white/20 text-sm">Works on any smartphone · No app download needed</p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <CustomerFooter onNavigate={onNavigate} />

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};