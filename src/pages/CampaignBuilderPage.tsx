import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  Wifi,
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Zap,
  UserPlus,
  RefreshCw,
  Percent,
  Star,
  Activity,
  FileText,
  Smartphone,
  ChevronDown,
  DollarSign,
  Users,
  HelpCircle,
  Circle,
  CircleDot,
  X,
  Trophy,
  Gift,
  SlidersHorizontal,
  Lightbulb,
  GripVertical,
  Copy,
  Info,
  Network,
  CornerDownRight,
  Lock,
  Store,
  BarChart3,
  Sparkles,
  TrendingUp,
  Link2,
  Edit2,
  AlertCircle,
  Hourglass,
  BellRing
} from 'lucide-react';

export const CampaignBuilderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    { id: 1, name: 'Basics' },
    { id: 2, name: 'Audience' },
    { id: 3, name: 'Conditions & Rules' },
    { id: 4, name: 'Reward Def' },
    { id: 5, name: 'Review & Publish' },
  ];

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-7 bg-white border border-[#EFECE6] rounded-xl p-6 shadow-sm space-y-6">
        <div className="border-b border-[#EFECE6] pb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">CONFIG 1/5</span>
          <h3 className="text-base font-bold text-[#1A1615]">Campaign Details</h3>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66]">Campaign Name Input</label>
            <span className="text-[11px] font-semibold text-[#9E9A93]">38 / 64 characters</span>
          </div>
          <input
            type="text"
            defaultValue="Autumn Reserve Tasting & Geisha Perk"
            className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-sm font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Campaign Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button className="p-3 bg-white border border-[#EFECE6] rounded-xl text-xs font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#FAF8F5] transition-colors">
              <Percent className="w-5 h-5 text-[#9E9A93]" /> % Discount
            </button>
            <button className="p-3 bg-[#FDF8EB] border-2 border-[#D4A753] rounded-xl text-xs font-bold text-[#9E782F] flex flex-col items-center gap-2 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 w-3 h-3 bg-[#D4A753] rounded-full flex items-center justify-center">
                <Check className="w-2 h-2 text-white" />
              </div>
              <Star className="w-5 h-5 fill-[#D4A753] text-[#D4A753]" /> Loyalty Boost
            </button>
            <button className="p-3 bg-white border border-[#EFECE6] rounded-xl text-xs font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#FAF8F5] transition-colors">
              <Zap className="w-5 h-5 text-[#9E9A93]" /> Flash Promo
            </button>
            <button className="p-3 bg-white border border-[#EFECE6] rounded-xl text-xs font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#FAF8F5] transition-colors">
              <Users className="w-5 h-5 text-[#9E9A93]" /> Referral Bonus
            </button>
            <button className="p-3 bg-white border border-[#EFECE6] rounded-xl text-xs font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#FAF8F5] transition-colors">
              <UserPlus className="w-5 h-5 text-[#9E9A93]" /> New Customer
            </button>
            <button className="p-3 bg-white border border-[#EFECE6] rounded-xl text-xs font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#FAF8F5] transition-colors">
              <RefreshCw className="w-5 h-5 text-[#9E9A93]" /> Old Customer
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66]">Active Outlets &amp; Locations</label>
            <button className="text-[11px] font-bold text-[#D4A753] hover:underline">Select All Branches</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4ED] border border-[#BCE3D1] text-[#0D7A53] rounded-full text-xs font-bold">
              <Check className="w-3.5 h-3.5" /> Downtown Flagship - Main Bar
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4ED] border border-[#BCE3D1] text-[#0D7A53] rounded-full text-xs font-bold">
              <Check className="w-3.5 h-3.5" /> Northside Mall - Espresso Bar
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F4ED] border border-[#BCE3D1] text-[#0D7A53] rounded-full text-xs font-bold">
              <Check className="w-3.5 h-3.5" /> West End Kiosk - Drive-Thru
            </span>
          </div>
          <button className="text-[11px] font-bold text-[#1A1615] flex items-center gap-1 hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Location
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-2">Campaign Runtime Window</label>
            <div className="flex items-center gap-3 px-3 py-2 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg">
              <Calendar className="w-4 h-4 text-[#9E9A93]" />
              <span className="text-xs font-bold text-[#1A1615]">Nov 1, 2024 – Nov 30, 2024</span>
            </div>
          </div>
          <div className="flex items-end pb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] rounded text-[10px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" /> 30 DAYS TOTAL
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-2">Priority Level</label>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center bg-[#FAF8F5] border border-[#EFECE6] rounded-lg">
              <button className="px-3 py-1.5 text-[#1A1615] font-bold hover:bg-[#EFECE6] transition-colors rounded-l-lg">-</button>
              <span className="px-4 py-1.5 text-xs font-bold text-[#1A1615] border-x border-[#EFECE6]">1 (P1)</span>
              <button className="px-3 py-1.5 text-[#1A1615] font-bold hover:bg-[#EFECE6] transition-colors rounded-r-lg">+</button>
            </div>
          </div>
          <p className="text-[11px] font-semibold text-[#6E6A66] leading-relaxed">
            Tier 1 Override Active: Highest arbitration queue. Higher priority wins if a transaction qualifies for multiple active campaigns.
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="bg-[#1A1615] rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">REVIA ARTISAN PASS</span>
              <span className="px-2 py-0.5 bg-[#D4A753]/20 text-[#D4A753] border border-[#D4A753]/30 rounded text-[9px] font-bold tracking-widest uppercase">LOYALTY BOOST</span>
            </div>
            <div className="h-32 bg-neutral-800 rounded-xl mb-4 overflow-hidden border border-neutral-700">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&auto=format&fit=crop&q=80" alt="Coffee Flight" className="w-full h-full object-cover opacity-80" />
            </div>
            <h4 className="text-lg font-bold mb-2">Autumn Reserve Tasting &amp; Geisha Perk</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A53]" /> 3 Flagship Branches
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Calendar className="w-3.5 h-3.5 text-[#D4A753]" /> Nov 1 – Nov 30, 2024
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm space-y-4">
          <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#1A1615]">Summary Specs Widget</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#6E6A66]">Branch Eligibility</span>
              <span className="text-[#1A1615]">3 Outlets Attached</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#6E6A66]">Program Horizon</span>
              <span className="text-[#1A1615]">30 Calendar Days</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#6E6A66]">Conflict Resolution</span>
              <span className="text-[#1A1615]">Level 1 (Highest Arbitration)</span>
            </div>
            <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Estimated Scope</div>
                <div className="text-sm font-bold text-[#1A1615]">~1,420 Target Members</div>
              </div>
              <span className="px-2 py-1 bg-[#E6F4ED] text-[#0D7A53] rounded text-[10px] font-bold">+18.4% vs last cohort</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-7 bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-[24px] font-bold text-[#1A1615] tracking-tight">Who is this campaign for?</h2>
            <span className="px-2.5 py-1 text-[10px] font-bold bg-[#FDF8EB] text-[#9E782F] rounded uppercase tracking-wider">STEP 2/5</span>
          </div>
          <p className="text-sm text-[#6E6A66] font-medium leading-relaxed max-w-lg">
            Narrow campaign eligibility by tier status, patron lifecycle stage, demographic filters, and guest satisfaction ratings.
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615] mb-1">
              <Trophy className="w-4 h-4 text-[#D4A753]" /> Tier &amp; Membership
            </div>
            <p className="text-[13px] text-[#6E6A66]">Select eligible member tiers that can unlock this campaign perk.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1615] text-white rounded-full text-[13px] font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span> Obsidian VIP <X className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FDF8EB] border border-[#F3E5C8] text-[#9E782F] rounded-full text-[13px] font-bold shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A753]" /> Gold Reserve <X className="w-4 h-4 text-[#9E782F]/50 hover:text-[#9E782F] transition-colors" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EFECE6] text-[#6E6A66] rounded-full text-[13px] font-bold hover:bg-[#FAF8F5] transition-colors">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D1CDC7]"></span> Silver Tier
            </button>
            <button className="flex items-center px-4 py-2 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded-full text-[13px] font-bold hover:bg-[#EFECE6] transition-colors">
              All Tiers
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF8F5] text-[#9E782F] border border-[#EFECE6] rounded-full text-[12px] font-bold hover:bg-[#FDF8EB] transition-colors mt-1">
            <Plus className="w-3 h-3" /> Add Custom Segment
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615] mb-1">
              <RefreshCw className="w-4 h-4 text-[#D4A753]" /> Customer Lifecycle Type
            </div>
            <p className="text-[13px] text-[#6E6A66]">Target new first-time salon guests or re-engage loyal recurring patrons.</p>
          </div>
          <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-1.5">
            <button className="flex-1 py-2.5 text-[13px] font-bold text-[#6E6A66] rounded-lg hover:bg-[#EFECE6] transition-colors">New Patrons</button>
            <button className="flex-1 py-2.5 text-[13px] font-bold text-[#6E6A66] rounded-lg hover:bg-[#EFECE6] transition-colors">Returning Patrons</button>
            <button className="flex-1 py-2.5 text-[13px] font-bold text-white bg-gradient-to-b from-[#C59B46] to-[#9E782F] shadow-sm rounded-lg flex items-center justify-center gap-2 border border-[#9E782F]">
              Both (Active Cohort) <Check className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615] mb-1">
              <Gift className="w-4 h-4 text-[#D4A753]" /> Birthday &amp; Celebration Window
            </div>
            <p className="text-[13px] text-[#6E6A66]">Trigger perk availability around patron birthdays or anniversary milestones.</p>
          </div>

          <div className="bg-[#FDF8EB] border border-[#F3E5C8] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-[#EFECE6]">
                <Calendar className="w-5 h-5 text-[#D4A753]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A1615] mb-0.5">Active Birthday Horizon</div>
                <div className="text-[12px] font-semibold text-[#6E6A66]">Patron birth date falls within range</div>
              </div>
            </div>
            <div className="flex items-center bg-white border border-[#EFECE6] rounded-lg shadow-sm">
              <button className="px-3.5 py-2 text-[#1A1615] hover:bg-[#FAF8F5] transition-colors rounded-l-lg border-r border-[#EFECE6] font-bold text-lg leading-none">-</button>
              <div className="px-4 py-2 text-[14px] font-bold text-[#1A1615]">7 <span className="font-semibold text-[13px]">days</span></div>
              <button className="px-3.5 py-2 text-[#1A1615] hover:bg-[#FAF8F5] transition-colors rounded-r-lg border-l border-[#EFECE6] font-bold text-lg leading-none">+</button>
            </div>
          </div>
          <div className="flex items-start gap-2 text-[12px] font-medium text-[#6E6A66]">
            <Smartphone className="w-4 h-4 text-[#0D7A53] shrink-0 mt-0.5" /> Automatically syncs with guest Apple Wallet &amp; Passbook notifications 48h prior to celebration.
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615] mb-1">
                  <Users className="w-4 h-4 text-[#D4A753]" /> Age Range
                </div>
                <p className="text-[13px] text-[#6E6A66]">Restrict campaign visibility by registered patron age bracket.</p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-[#FAF8F5] text-[#6E6A66] rounded uppercase tracking-wider">OPTIONAL DEMOGRAPHIC</span>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 bg-white border border-[#EFECE6] rounded-lg p-3 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#9E9A93] mb-1">MIN AGE</div>
                    <div className="text-[20px] font-bold text-[#1A1615]">21 <span className="text-xs font-semibold text-[#6E6A66]">yrs</span></div>
                  </div>
                  <div className="text-[#6E6A66]"><SlidersHorizontal className="w-5 h-5 opacity-50" /></div>
                </div>
                <div className="flex-1 bg-white border border-[#EFECE6] rounded-lg p-3 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#9E9A93] mb-1">MAX AGE</div>
                    <div className="text-[20px] font-bold text-[#1A1615]">65 <span className="text-xs font-semibold text-[#6E6A66]">yrs</span></div>
                  </div>
                  <div className="text-[#6E6A66]"><SlidersHorizontal className="w-5 h-5 opacity-50" /></div>
                </div>
              </div>

              <div className="px-2">
                <div className="h-1.5 bg-[#EFECE6] rounded-full relative mb-3">
                  <div className="absolute left-[10%] right-[30%] h-full bg-[#D4A753] rounded-full"></div>
                  <div className="absolute left-[10%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#D4A753] rounded-full shadow-sm"></div>
                  <div className="absolute right-[30%] top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-[#D4A753] rounded-full shadow-sm"></div>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold text-[#6E6A66]">
                  <span>18 yrs</span>
                  <span className="text-[#D4A753]">Active Segment: 21–65</span>
                  <span>80+ yrs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615] mb-1">
                <Star className="w-4 h-4 text-[#D4A753]" /> Feedback &amp; Satisfaction Rating
              </div>
              <p className="text-[13px] text-[#6E6A66]">Filter by historical tasting room ratings and post-visit CSAT scores.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-2 pl-4 shadow-sm">
              <div className="flex-1 w-full relative">
                <select className="w-full appearance-none bg-transparent text-[13px] font-bold text-[#1A1615] py-2.5 focus:outline-none cursor-pointer">
                  <option>Average guest rating ≥</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
              </div>
              <div className="flex items-center gap-3 pr-3 bg-white border border-[#EFECE6] rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center gap-1.5 text-[#1A1615] font-bold text-sm">
                  <Star className="w-4 h-4 fill-[#D4A753] text-[#D4A753]" /> 4.5 <span className="text-[#9E9A93] text-[11px]">/ 5.0</span>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-bold bg-[#E0F9ED] text-[#0D7A53] rounded uppercase tracking-widest border border-[#BCE3D1]">PRIME CSAT</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF8F5] p-3 rounded-lg text-[12px] font-medium text-[#6E6A66]">
              <span className="w-4 h-4 rounded-full border border-[#D1CDC7] flex items-center justify-center text-[9px] font-bold shrink-0 text-[#9E9A93]">i</span>
              Only includes members with at least 2 verified visits to avoid sample bias.
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-bold text-[#1A1615] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D7A53]"></span> Audience Impact
            </h3>
            <span className="px-3 py-1 text-[10px] font-bold bg-[#E0F9ED] text-[#0D7A53] rounded-full uppercase tracking-widest">LIVE SIMULATION</span>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="text-[36px] leading-none font-bold text-[#1A1615] tracking-tight">2,840</div>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-[#E0F9ED] text-[#0D7A53] rounded-full">11.4% Reach</span>
            </div>
            <p className="text-[12px] text-[#6E6A66] font-medium mb-4">
              Eligible patrons out of <span className="font-bold text-[#1A1615]">24,850</span> total enrolled members
            </p>
            <div className="h-2.5 bg-[#EFECE6] rounded-full overflow-hidden flex">
              <div className="h-full bg-[#D4A753] w-[11.4%] rounded-full"></div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-3">ACTIVE TIER COMPOSITION</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1A1615]"></span> Obsidian VIP</span>
                <div><span className="text-[#1A1615] mr-2">1,260</span> <span className="text-[#9E9A93] text-[11px] font-semibold">(44.4%)</span></div>
              </div>
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span> Gold Reserve</span>
                <div><span className="text-[#1A1615] mr-2">1,580</span> <span className="text-[#9E9A93] text-[11px] font-semibold">(55.6%)</span></div>
              </div>
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D1CDC7]"></span> Silver Tier</span>
                <span className="text-[#F87171] text-[11px] font-bold uppercase tracking-wider">EXCLUDED</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-3">PROJECTED CAMPAIGN FORECAST</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-[#FAF8F5] border border-[#EFECE6] p-4 rounded-xl">
                <div>
                  <div className="text-[11px] font-medium text-[#6E6A66] mb-0.5">Expected Redemptions</div>
                  <div className="text-[15px] font-bold text-[#1A1615]">520 – 640 visits</div>
                </div>
                <span className="px-2.5 py-1 bg-[#E0F9ED] text-[#0D7A53] rounded-full text-[11px] font-bold">+22% lift</span>
              </div>

              <div className="flex justify-between items-center bg-[#FAF8F5] border border-[#EFECE6] p-4 rounded-xl">
                <div>
                  <div className="text-[11px] font-medium text-[#6E6A66] mb-0.5">Projected Gross GMV</div>
                  <div className="text-[15px] font-bold text-[#0D7A53]">+$19,800</div>
                </div>
                <span className="px-2.5 py-1 bg-[#FDF8EB] text-[#9E782F] rounded-full text-[11px] font-bold uppercase border border-[#F3E5C8]">High ROI</span>
              </div>

              <div className="flex justify-between items-center bg-white border border-[#EFECE6] p-4 rounded-xl">
                <div>
                  <div className="text-[11px] font-medium text-[#6E6A66] mb-0.5">Estimated Incentive Cost</div>
                  <div className="text-[15px] font-bold text-[#1A1615]">$2,860 – $3,320</div>
                </div>
                <span className="text-[12px] font-medium text-[#6E6A66]">Within Budget</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-3">SAMPLE QUALIFYING PATRON</h4>
            <div className="flex items-center gap-3 bg-white border border-[#EFECE6] p-4 rounded-xl shadow-sm">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Julian Vane" className="w-11 h-11 rounded-full object-cover border border-[#EFECE6]" />
              <div>
                <div className="text-[14px] font-bold text-[#1A1615] flex items-center gap-2">
                  Julian Vane <span className="px-1.5 py-0.5 bg-[#1A1615] text-[#D4A753] text-[9px] rounded uppercase tracking-wider font-bold">VIP</span>
                </div>
                <div className="text-[12px] font-medium text-[#6E6A66] mt-0.5">14 Salon Visits • Rating 5.0 ★ • Birthday in 4d</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FAF8F5] rounded-xl p-4 flex items-start gap-3 border border-[#EFECE6]">
          <div className="shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 text-[#D4A753]" />
          </div>
          <p className="text-[12px] font-medium text-[#6E6A66] leading-relaxed">
            Narrowing audience by 4.5★ rating preserves brand exclusivity and significantly reduces drop-off rates on high-margin reservations.
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-[#EFECE6] pb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FAF8F5] rounded-xl flex items-center justify-center border border-[#EFECE6]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A753]"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-[#1A1615]">Trigger &amp; Qualification Rules</h3>
                <p className="text-[13px] text-[#6E6A66] font-medium mt-0.5">Define logic trees, order purchase thresholds, and nested item entitlements.</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">EVALUATION ENGINE:</span>
              <span className="px-3 py-1.5 bg-[#E0F9ED] text-[#0D7A53] rounded-full text-[12px] font-bold tracking-wide flex items-center gap-1.5 border border-[#BCE3D1]">
                <span className="w-2 h-2 rounded-full bg-[#0D7A53]"></span> Real-time
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-[#6E6A66] tracking-wider">MATCH</span>
              <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1">
                <button className="px-4 py-1.5 bg-[#1A1615] text-white text-[12px] font-bold rounded-md shadow-sm">ALL (AND)</button>
                <button className="px-4 py-1.5 text-[#6E6A66] text-[12px] font-bold rounded-md hover:bg-[#EFECE6] transition-colors">ANY (OR)</button>
              </div>
              <span className="text-[12px] font-medium text-[#6E6A66]">of the following condition criteria:</span>
            </div>

            <div className="space-y-4">
              {/* Rule 1 */}
              <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 pr-4 shadow-sm">
                <div className="cursor-grab opacity-50 hover:opacity-100"><GripVertical className="w-5 h-5 text-[#9E9A93]" /></div>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none"><option>Customer Lifetime $</option></select>
                  <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-medium text-[#6E6A66] focus:outline-none"><option>is greater than or equal to</option></select>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1615] font-bold text-[13px]">$</span>
                    <input type="text" defaultValue="250.00" className="w-full bg-white border border-[#EFECE6] rounded-lg pl-7 pr-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none" />
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-2 border-l border-[#EFECE6]">
                  <button className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] transition-colors"><Copy className="w-4 h-4" /></button>
                  <button className="p-1.5 text-[#9E9A93] hover:text-[#EF4444] transition-colors"><X className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Rule 2 */}
              <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 pr-4 shadow-sm">
                <div className="cursor-grab opacity-50 hover:opacity-100"><GripVertical className="w-5 h-5 text-[#9E9A93]" /></div>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none"><option>Last Visit Date</option></select>
                  <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-medium text-[#6E6A66] focus:outline-none"><option>is within the last</option></select>
                  <div className="flex bg-white border border-[#EFECE6] rounded-lg overflow-hidden">
                    <input type="text" defaultValue="14" className="w-12 text-center text-[13px] font-bold text-[#1A1615] focus:outline-none border-r border-[#EFECE6]" />
                    <span className="flex-1 px-3 py-2 text-[13px] font-medium text-[#6E6A66] bg-[#FAF8F5] flex items-center">days</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-2 border-l border-[#EFECE6]">
                  <button className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] transition-colors"><Copy className="w-4 h-4" /></button>
                  <button className="p-1.5 text-[#9E9A93] hover:text-[#EF4444] transition-colors"><X className="w-4 h-4" /></button>
                </div>
              </div>

              {/* BOGO Rule */}
              <div className="bg-[#FDF8EB] border-2 border-[#F3E5C8] rounded-xl p-5 shadow-sm relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="cursor-grab opacity-50 hover:opacity-100"><GripVertical className="w-5 h-5 text-[#9E782F]" /></div>
                    <span className="px-2.5 py-1 bg-[#D4A753]/20 text-[#9E782F] font-bold text-[10px] uppercase tracking-widest rounded flex items-center gap-1.5 border border-[#D4A753]/30">
                      <Gift className="w-3 h-3" /> BOGO
                    </span>
                    <span className="text-[13px] font-bold text-[#1A1615]">Item Quantity in Order (Buy X Get Y)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-[#9E782F]/70 hover:text-[#9E782F] transition-colors"><Copy className="w-4 h-4" /></button>
                    <button className="p-1.5 text-[#9E782F]/70 hover:text-[#EF4444] transition-colors"><X className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="ml-8 space-y-4">
                  <div className="flex items-center gap-3 bg-white border border-[#F3E5C8] rounded-lg p-2 pr-3 shadow-sm">
                    <select className="flex-1 bg-transparent text-[13px] font-bold text-[#1A1615] px-2 focus:outline-none"><option>Espresso</option></select>
                    <span className="text-[13px] font-medium text-[#6E6A66]">buy quantity of</span>
                    <input type="text" defaultValue="3" className="w-12 bg-[#FAF8F5] border border-[#EFECE6] rounded-md text-center py-1.5 text-[14px] font-bold text-[#1A1615] focus:outline-none" />
                  </div>

                  <div className="pl-6 border-l-2 border-[#D4A753]/30 relative pt-2">
                    <div className="absolute top-1/2 -left-[2px] w-4 h-[2px] bg-[#D4A753]/30"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-[#F3E5C8] rounded-lg p-3 shadow-sm relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#1A1615]">Customer gets</span>
                        <input type="text" defaultValue="1" className="w-10 bg-[#FAF8F5] border border-[#EFECE6] rounded-md text-center py-1.5 text-[13px] font-bold text-[#1A1615] focus:outline-none" />
                      </div>

                      <div className="flex-1 flex items-center gap-3">
                        <select className="flex-1 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none"><option>same item (Espresso)</option></select>
                        <span className="text-[13px] font-bold text-[#1A1615]">free</span>
                      </div>

                      <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1 shrink-0">
                        <button className="px-3 py-1.5 bg-white text-[#9E782F] border border-[#F3E5C8] rounded-md text-[11px] font-bold shadow-sm">Same<br />Item</button>
                        <button className="px-3 py-1.5 text-[#6E6A66] text-[11px] font-semibold hover:bg-[#EFECE6] transition-colors rounded-md text-center">Different<br />Item</button>
                      </div>
                    </div>
                    <div className="mt-3 ml-4">
                      <span className="px-2.5 py-1 bg-[#E0F9ED] text-[#0D7A53] rounded text-[10px] font-bold uppercase tracking-widest border border-[#BCE3D1]">100% item waiver</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F3E5C8] flex items-center gap-2 text-[12px] font-medium text-[#9E782F]">
                  <Info className="w-4 h-4 shrink-0" /> Preview: Buy 3 Espresso, get 1 Espresso free (100% item waiver)
                </div>
              </div>

              {/* OR GROUP block */}
              <div className="bg-white border-2 border-[#EFECE6] rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-[#9E782F] text-white font-bold text-[10px] uppercase tracking-widest rounded flex items-center gap-1.5">
                      <Network className="w-3 h-3" /> OR GROUP
                    </span>
                    <span className="text-[13px] font-bold text-[#1A1615]">Customer satisfies AT LEAST ONE criteria below:</span>
                  </div>
                  <button className="text-[12px] font-bold text-[#EF4444] hover:underline flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" /> Remove Group
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-2 pl-3 shadow-sm">
                    <CornerDownRight className="w-4 h-4 text-[#9E9A93] shrink-0" />
                    <div className="flex-1 flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-2 bg-white border border-[#EFECE6] rounded-lg px-3 py-1.5 shadow-sm">
                        <span className="text-[13px] font-medium text-[#1A1615]">Current Tier</span>
                        <Lock className="w-3 h-3 text-[#9E9A93]" />
                      </div>
                      <span className="text-[13px] font-medium text-[#6E6A66]">is one of</span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1A1615] text-white rounded-full text-[11px] font-bold shadow-sm">
                        <Star className="w-3 h-3 text-[#D4A753]" /> Obsidian VIP <X className="w-3.5 h-3.5 text-white/60 hover:text-white cursor-pointer" />
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FDF8EB] border border-[#F3E5C8] text-[#9E782F] rounded-full text-[11px] font-bold shadow-sm">
                        <Trophy className="w-3 h-3 text-[#D4A753]" /> Gold Reserve <X className="w-3.5 h-3.5 text-[#9E782F]/60 hover:text-[#9E782F] cursor-pointer" />
                      </span>
                      <button className="w-7 h-7 rounded-full bg-white border border-[#EFECE6] flex items-center justify-center text-[#9E9A93] hover:text-[#1A1615] hover:border-[#D1CDC7] transition-all shadow-sm">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="p-2 text-[#9E9A93] hover:text-[#EF4444] transition-colors shrink-0"><X className="w-4 h-4" /></button>
                  </div>

                  <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-2 pl-3 shadow-sm">
                    <CornerDownRight className="w-4 h-4 text-[#9E9A93] shrink-0" />
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none shadow-sm"><option>Total Stamp Cycle</option></select>
                      <div className="flex items-center">
                        <span className="text-[13px] font-medium text-[#6E6A66] px-3">is greater than</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex bg-white border border-[#EFECE6] rounded-lg overflow-hidden flex-1 shadow-sm">
                          <input type="text" defaultValue="8" className="w-12 text-center text-[13px] font-bold text-[#1A1615] focus:outline-none border-r border-[#EFECE6]" />
                          <span className="px-3 py-2 text-[13px] font-medium text-[#1A1615] bg-[#FAF8F5] flex items-center">stamps</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] font-medium text-[#9E9A93] text-right w-16 leading-tight shrink-0 mr-2">(out of 10 stamps ledger pass)</div>
                    <button className="p-2 text-[#9E9A93] hover:text-[#EF4444] transition-colors shrink-0"><X className="w-4 h-4" /></button>
                  </div>

                  <div className="pl-9 mt-3 pt-1">
                    <button className="px-3 py-1.5 bg-white border border-[#EFECE6] rounded-full text-[11px] font-bold text-[#9E782F] hover:bg-[#FDF8EB] transition-colors flex items-center gap-1.5 shadow-sm">
                      <Plus className="w-3 h-3" /> Add condition inside this OR block
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EFECE6] rounded-xl text-[13px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Add Condition Rule
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EFECE6] rounded-xl text-[13px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors shadow-sm">
                <Network className="w-4 h-4 text-[#9E782F]" /> Add Nested Condition Group (AND/OR)
              </button>
            </div>

            <div className="bg-[#E0F9ED] border border-[#BCE3D1] rounded-lg px-4 py-2.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0D7A53]" />
              <span className="text-[12px] font-bold text-[#0D7A53]">Syntax Valid · Complete all condition rows before continuing</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FAF8F5] rounded-xl flex items-center justify-center border border-[#EFECE6]">
                <Store className="w-6 h-6 text-[#D4A753]" />
              </div>
              <div>
                <h3 className="text-[20px] font-bold text-[#1A1615]">Delivery Timing &amp; Branch Eligibility</h3>
                <p className="text-[13px] text-[#6E6A66] font-medium mt-0.5">Operational dispatch scope synchronized across all physical POS registers.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#FAF8F5] text-[#6E6A66] border border-[#EFECE6] rounded text-[10px] font-bold uppercase tracking-widest">SYNCED FROM STEP 1</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">TRIGGER EVENT</label>
                <Zap className="w-4 h-4 text-[#D4A753]" />
              </div>
              <select className="w-full bg-white border border-[#EFECE6] px-3 py-2.5 rounded-lg text-[14px] font-bold text-[#1A1615] focus:outline-none mb-3 shadow-sm">
                <option>On QR Stand Scan at POS</option>
              </select>
              <p className="text-[12px] font-medium text-[#6E6A66]">Triggers automatically when a qualified transaction is submitted at POS.</p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">CAMPAIGN RUNTIME WINDOW</label>
                <span className="px-2 py-0.5 bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] rounded text-[10px] font-bold uppercase">30 Days</span>
              </div>
              <div className="w-full bg-white border border-[#EFECE6] px-3 py-2.5 rounded-lg flex items-center justify-between shadow-sm mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4A753]" />
                  <span className="text-[13px] font-bold text-[#1A1615]">Nov 1, 2024 – Nov 30, 2024</span>
                </div>
                <span className="text-[10px] font-bold text-[#6E6A66] uppercase">Active</span>
              </div>
              <p className="text-[12px] font-medium text-[#6E6A66]">Configured in merchant home timezone (PST - Pacific Standard).</p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#6E6A66]">ACTIVE BRANCHES (3 SELECTED)</label>
              <button className="text-[12px] font-bold text-[#0D7A53] hover:underline">All retail locations active</button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-2 bg-white border border-[#EFECE6] text-[#1A1615] rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <Check className="w-4 h-4 text-[#0D7A53]" /> Downtown Flagship
              </span>
              <span className="px-3 py-2 bg-white border border-[#EFECE6] text-[#1A1615] rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <Check className="w-4 h-4 text-[#0D7A53]" /> Northside Mall
              </span>
              <span className="px-3 py-2 bg-white border border-[#EFECE6] text-[#1A1615] rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm">
                <Check className="w-4 h-4 text-[#0D7A53]" /> West End Kiosk
              </span>
              <button className="px-3 py-2 bg-transparent border border-dashed border-[#D4A753] text-[#9E782F] rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-[#FDF8EB] transition-colors">
                <Plus className="w-4 h-4" /> Add Location
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-bold text-[#1A1615] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#D4A753]" /> Audience Impact
            </h3>
            <span className="px-3 py-1 text-[10px] font-bold bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] rounded-full uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Dynamic Cohort
            </span>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">QUALIFYING CUSTOMERS</div>
                <div className="text-[32px] leading-none font-bold text-[#1A1615] tracking-tight">4,120 <span className="text-[12px] font-medium text-[#6E6A66] tracking-normal">of 24,850 members</span></div>
              </div>
              <div className="text-right bg-white border border-[#EFECE6] rounded-lg px-3 py-1.5 shadow-sm">
                <div className="text-[13px] font-bold text-[#D4A753]">16.6%</div>
                <div className="text-[10px] font-bold text-[#6E6A66] uppercase">Reach</div>
              </div>
            </div>

            <p className="text-[10px] text-[#9E9A93] font-medium mt-4">
              Includes Step 2 audience filters &amp; Step 3 item conditions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">EXPECTED VISITS</div>
              <div className="text-[16px] font-bold text-[#1A1615] mb-1">680 – 820</div>
              <div className="text-[10px] font-bold text-[#0D7A53]">~18% claim rate</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">PROJECTED GMV</div>
              <div className="text-[16px] font-bold text-[#0D7A53] mb-1">+$16,400</div>
              <div className="text-[10px] font-medium text-[#6E6A66]">+$3,250 Estimated lift</div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">TIER DISTRIBUTION</h4>
              <span className="text-[10px] font-bold text-[#1A1615]">100% Total</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#1A1615]"></span> Obsidian VIP</span>
                <div><span className="text-[#1A1615] mr-2">1,420</span> <span className="text-[#6E6A66]">• 34.5%</span></div>
              </div>
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4A753]"></span> Gold Reserve</span>
                <div><span className="text-[#1A1615] mr-2">2,100</span> <span className="text-[#6E6A66]">• 51.0%</span></div>
              </div>
              <div className="flex items-center justify-between text-[12px] font-bold">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D1CDC7]"></span> Silver Tier</span>
                <div><span className="text-[#1A1615] mr-2">600</span> <span className="text-[#6E6A66]">• 14.5%</span></div>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] w-24 leading-tight">QUALIFICATION VELOCITY (LAST 14 DAYS)</h4>
              <span className="text-[12px] font-bold text-[#0D7A53] flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> +24%</span>
            </div>
            <div className="h-12 w-full flex items-end">
              {/* Very basic SVG path approximation of the graph */}
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0,25 C20,22 40,15 60,12 C80,9 90,5 100,2" fill="none" stroke="#D4A753" strokeWidth="2" strokeLinecap="round" />
                <path d="M0,25 C20,22 40,15 60,12 C80,9 90,5 100,2 L100,30 L0,30 Z" fill="url(#gradient-gold)" opacity="0.15" />
                <defs>
                  <linearGradient id="gradient-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D4A753" stopOpacity="1" />
                    <stop offset="100%" stopColor="#D4A753" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-[9px] text-center text-[#9E9A93] font-medium mt-3 leading-relaxed">
              Daily newly qualifying member volume trending upward across participating roasteries.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-[#1A1615] flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#D4A753]" /> Guest Experience Preview
            </h3>
            <span className="px-2 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[10px] font-bold uppercase tracking-widest">IOS / Android</span>
          </div>

          <p className="text-[11px] text-[#6E6A66] mb-5 font-medium leading-relaxed">
            Live simulation of the privileged push card rendered on the member's passbook wallet when conditions match.
          </p>

          <div className="bg-[#1A1615] rounded-xl p-5 shadow-xl text-white relative overflow-hidden mb-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex items-center justify-between mb-5 relative z-10">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#D4A753] rounded-full flex items-center justify-center border border-white/20">
                  <div className="w-2.5 h-2.5 border border-white/60 rounded-sm"></div>
                </div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">REVIA PRIVÉ</span>
              </div>
              <span className="text-[10px] font-semibold text-white/50 tracking-widest uppercase">#REV-8824</span>
            </div>

            <div className="relative z-10">
              <span className="inline-block px-2 py-0.5 bg-[#D4A753]/20 text-[#D4A753] border border-[#D4A753]/30 rounded text-[9px] font-bold tracking-widest uppercase mb-3">FLASH PRIVILEGE</span>
              <h4 className="text-[18px] font-black leading-snug mb-2">BUY 3 GET 1 FREE — Single Origin Geisha</h4>
              <p className="text-[11px] font-medium text-white/60 leading-relaxed mb-6 w-11/12">Auto-entitlement activated on 250g whole bean roast. Valid today across downtown flagship &amp; partners.</p>

              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 text-[11px] font-bold text-white transition-colors flex flex-col items-center justify-center gap-1">
                  <Wifi className="w-4 h-4 rotate-90 opacity-70" />
                  Hold near Counter NFC
                </button>
                <button className="w-20 py-3 bg-[#D4A753] text-[#1A1615] hover:bg-[#C59B46] rounded-lg text-[11px] font-bold transition-colors flex flex-col items-center justify-center leading-tight">
                  Redeem<br />at POS
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-white border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] flex flex-col items-center justify-center gap-1 shadow-sm">
              <RefreshCw className="w-4 h-4 text-[#9E782F]" />
              <span className="text-center leading-tight">Regenerate Sample<br />Member</span>
            </button>
            <button className="flex-1 py-2.5 bg-white border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] flex flex-col items-center justify-center gap-1 shadow-sm">
              <Smartphone className="w-4 h-4 text-[#6E6A66]" />
              <span className="text-center leading-tight mt-1">Test Push to<br />Device</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 space-y-6">
        {/* Box 1: Reward Selection */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-1 block">REWARD SELECTION</span>
              <h3 className="text-[20px] font-bold text-[#1A1615]">What does the customer get?</h3>
              <p className="text-[13px] text-[#6E6A66] font-medium mt-1">Choose the commercial incentive awarded once condition triggers are satisfied.</p>
            </div>
            <div className="w-12 h-12 bg-[#FAF8F5] rounded-xl flex items-center justify-center border border-[#EFECE6] shrink-0">
              <Gift className="w-6 h-6 text-[#D4A753]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button className="pt-5 pb-4 px-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-center hover:bg-[#EFECE6] transition-colors flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><Percent className="w-4 h-4 text-[#9E9A93]" /></div>
              <div>
                <div className="text-[12px] font-bold text-[#1A1615]">Discount %</div>
                <div className="text-[10px] font-medium text-[#6E6A66] mt-0.5">% off order</div>
              </div>
            </button>
            <button className="pt-5 pb-4 px-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-center hover:bg-[#EFECE6] transition-colors flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><DollarSign className="w-4 h-4 text-[#9E9A93]" /></div>
              <div>
                <div className="text-[12px] font-bold text-[#1A1615]">Fixed $</div>
                <div className="text-[10px] font-medium text-[#6E6A66] mt-0.5">Direct bill credit</div>
              </div>
            </button>
            <button className="pt-5 pb-4 px-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-center hover:bg-[#EFECE6] transition-colors flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><Activity className="w-4 h-4 text-[#9E9A93]" /></div>
              <div>
                <div className="text-[12px] font-bold text-[#1A1615]">Cashback</div>
                <div className="text-[10px] font-medium text-[#6E6A66] mt-0.5">Wallet credit</div>
              </div>
            </button>
            <button className="pt-5 pb-4 px-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-center hover:bg-[#EFECE6] transition-colors flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><Star className="w-4 h-4 text-[#9E9A93]" /></div>
              <div>
                <div className="text-[12px] font-bold text-[#1A1615]">Points</div>
                <div className="text-[10px] font-medium text-[#6E6A66] mt-0.5">Multipliers</div>
              </div>
            </button>
            <button className="pt-5 pb-4 px-3 bg-[#FDF8EB] border-2 border-[#D4A753] rounded-xl text-center flex flex-col items-center gap-3 relative shadow-sm">
              <div className="absolute -top-2.5 right-1/2 translate-x-1/2 bg-[#D4A753] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">ACTIVE</div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#F3E5C8]"><Zap className="w-4 h-4 text-[#D4A753]" /></div>
              <div>
                <div className="text-[12px] font-bold text-[#1A1615]">Free item / BOG</div>
                <div className="text-[10px] font-medium text-[#9E782F] mt-0.5">Complimentary bean</div>
              </div>
            </button>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EFECE6]">
              <div className="flex items-center gap-2 text-[#9E782F]">
                <Link2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">LINKED RULE: ITEM QUANTITY IN ORDER (SINGLE ORIGIN GEISHA WHOLE BEAN &gt; 2)</span>
              </div>
              <span className="text-[10px] font-medium text-[#9E9A93]">Step 3 Rule # R-04</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-[11px] font-bold text-[#6E6A66] block mb-2">Entitlement Item</span>
                <div className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 flex items-center justify-between shadow-sm">
                  <span className="text-[13px] font-bold text-[#1A1615]">Geisha (250g Whole...</span>
                  <Lock className="w-3.5 h-3.5 text-[#9E9A93]" />
                </div>
                <p className="text-[10px] font-medium text-[#9E9A93] mt-2 leading-tight">Auto-mirrored from cart qualifying SKU</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#6E6A66] block mb-2">Discount Magnitude</span>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[18px] font-bold text-[#0D7A53] leading-none">100%</div>
                    <div className="text-[11px] font-bold text-[#0D7A53] mt-1">Complimentary</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#1A1615] leading-none">$0</div>
                    <div className="text-[10px] font-medium text-[#6E6A66] mt-1 leading-tight">Patron<br />co-pay</div>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-[#9E9A93] mt-2">Full retail waiver [$38 value]</p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#6E6A66] block mb-2">Transaction Cap</span>
                <select className="w-full bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] shadow-sm focus:outline-none">
                  <option>Max 1 Free Item / Order</option>
                </select>
                <p className="text-[10px] font-medium text-[#9E9A93] mt-2">Strict limit per checkout event.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Velocity Guardrails */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-1 block">VELOCITY GUARDRAILS</span>
              <h3 className="text-[20px] font-bold text-[#1A1615]">Usage &amp; Velocity Limits</h3>
              <p className="text-[13px] text-[#6E6A66] font-medium mt-1 w-5/6">Prevent promotional arbitrage and protect promotional gross margins across customer lifecycles.</p>
            </div>
            <button className="text-[#9E9A93] hover:text-[#1A1615] transition-colors"><Edit2 className="w-4 h-4" /></button>
          </div>

          <div>
            <span className="text-[11px] font-bold text-[#1A1615] block mb-2">Redemptions per Qualifying Guest</span>
            <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1.5 mb-2">
              <button className="flex-1 py-2 bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white rounded-md text-[12px] font-bold shadow-sm">1 Time Only</button>
              <button className="flex-1 py-2 text-[#6E6A66] hover:bg-[#EFECE6] rounded-md text-[12px] font-bold transition-colors">Once per Week</button>
              <button className="flex-1 py-2 text-[#6E6A66] hover:bg-[#EFECE6] rounded-md text-[12px] font-bold transition-colors">Unlimited Window</button>
            </div>
            <p className="text-[10px] font-medium text-[#6E6A66]">Once redeemed, the coupon barcode will automatically burn in patron mobile wallet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-[#1A1615]">Max Total Redemptions</span>
                <span className="px-2 py-0.5 bg-[#FDF8EB] text-[#9E782F] text-[9px] font-bold uppercase tracking-widest rounded border border-[#F3E5C8]">Cap: 500</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-[#EFECE6] rounded-lg px-3 py-2 shadow-sm mb-3">
                <span className="text-[18px] font-bold text-[#1A1615]">500</span>
                <span className="text-[13px] font-medium text-[#6E6A66]">Total Patron Claims</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-[#9E9A93]">0 Claimed</span>
                <span className="text-[#1A1615]">500 Remaining Available</span>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-[#1A1615]">Campaign Incentive Budget</span>
                <span className="px-2 py-0.5 bg-[#E0F9ED] text-[#0D7A53] text-[9px] font-bold uppercase tracking-widest rounded border border-[#BCE3D1]">Guarded</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-[#EFECE6] rounded-lg px-3 py-2 shadow-sm mb-3">
                <span className="text-[18px] font-bold text-[#1A1615]">$3,500</span>
                <span className="text-[13px] font-medium text-[#6E6A66]">USD Hard Ceiling</span>
              </div>
              <div className="flex gap-2 text-[10px] font-medium text-[#9E9A93] leading-tight">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#D4A753]" />
                Auto-pauses campaign when claims hit $3,325 (95%)
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-bold text-[#1A1615]">Promotional Stacking Control</span>
                <span className="px-2 py-0.5 bg-white border border-[#EFECE6] text-[#6E6A66] rounded text-[9px] font-bold tracking-widest uppercase">EXCLUSIVE</span>
              </div>
              <p className="text-[10px] font-medium text-[#6E6A66]">Prevent stacking with Member Loyalty punch cards, Happy Hour discounts, and general voucher redemptions.</p>
            </div>
            <div className="w-10 h-6 bg-[#EFECE6] rounded-full relative cursor-pointer shrink-0"><div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div></div>
          </div>
        </div>

        {/* Box 3: Time Horizons */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-1 block">TIME HORIZONS</span>
              <h3 className="text-[20px] font-bold text-[#1A1615]">Reward Validity &amp; Expiration Window</h3>
              <p className="text-[13px] text-[#6E6A66] font-medium mt-1">Set activation latency and lifespan after patron unlocks the perk.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center border border-[#EFECE6] text-[#9E782F] shrink-0">
              <Hourglass className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FDF8EB] border-2 border-[#D4A753] rounded-xl p-5 relative shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white border-4 border-[#D4A753]"></div>
                  <span className="text-[12px] font-bold text-[#1A1615]">Dynamic Qualification Window</span>
                </div>
                <span className="text-[9px] font-bold tracking-widest text-[#9E782F] uppercase">STANDARD</span>
              </div>
              <p className="text-[10px] font-medium text-[#6E6A66] mb-4 h-8 leading-relaxed">Patron gets an individual rolling timer starting the moment qualification condition is met.</p>
              <div className="flex items-center gap-3 bg-white border border-[#F3E5C8] rounded-lg px-3 py-2 shadow-sm mb-3">
                <span className="text-[16px] font-bold text-[#1A1615]">14</span>
                <span className="text-[12px] font-medium text-[#6E6A66]">Days from purchase trigger</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9E782F]">
                <Calendar className="w-3.5 h-3.5" /> Auto-expires at 23:59:59 on Day 14
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white border border-[#D1CDC7]"></div>
                  <span className="text-[12px] font-bold text-[#1A1615]">Fixed Calendar Deadline</span>
                </div>
              </div>
              <p className="text-[10px] font-medium text-[#6E6A66] mb-4 h-8 leading-relaxed">All unredeemed passes expire uniformly on a set calendar date regardless of unlock date.</p>
              <div className="flex items-center justify-between bg-white border border-[#EFECE6] rounded-lg px-3 py-2 shadow-sm mb-3">
                <span className="text-[13px] font-medium text-[#9E9A93]">November 30, 2024</span>
                <Calendar className="w-4 h-4 text-[#9E9A93]" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#9E9A93]">
                <Lock className="w-3.5 h-3.5" /> Campaign ends simultaneously for all
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5"><BellRing className="w-4 h-4 text-[#D4A753]" /></div>
              <div>
                <span className="text-[12px] font-bold text-[#1A1615] block mb-0.5">Automated Expiration Alert</span>
                <p className="text-[10px] font-medium text-[#6E6A66]">Send push notification via Apple Wallet &amp; WhatsApp 48 hours prior to lapse</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#E0F9ED] text-[#0D7A53] rounded-full text-[10px] font-bold tracking-widest uppercase shrink-0 border border-[#BCE3D1]">Active Automation</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Right Sidebar 1: Reward Cost & Margin Impact */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-0.5 bg-[#E0F9ED] text-[#0D7A53] border border-[#BCE3D1] rounded text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#0D7A53] rounded-full animate-pulse"></div> Live Simulation
            </span>
            <span className="text-[10px] font-bold text-[#9E9A93]">Step 4 Unit Econ</span>
          </div>

          <h3 className="text-[16px] font-bold text-[#1A1615] mb-2">Reward Cost &amp; Margin Impact</h3>
          <p className="text-[10px] font-medium text-[#6E6A66] mb-6 leading-relaxed">
            Modeled on 1,840 qualifying patrons from Step 2 at an estimated 25% BOGO velocity.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">EST. REDEMPTIONS</div>
              <div className="text-[18px] font-bold text-[#1A1615] mb-1">420 – 510</div>
              <div className="text-[10px] font-bold text-[#0D7A53]">23.4% Velocity</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">PROMOTION COST</div>
              <div className="text-[18px] font-bold text-[#1A1615] mb-1">$1.95k</div>
              <div className="text-[10px] font-medium text-[#6E6A66]">Under $3.5k Cap</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">PROJECTED GMV</div>
              <div className="text-[18px] font-bold text-[#D4A753] mb-1">+$16,400</div>
              <div className="text-[10px] font-medium text-[#6E6A66]">8.4x Incentive ROI</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">NET CAMPAIGN MARGIN</div>
              <div className="text-[18px] font-bold text-[#0D7A53] mb-1">71.8%</div>
              <div className="text-[10px] font-bold text-[#0D7A53]">&gt;65% Target</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold mb-2">
              <span className="text-[#1A1615]">Promotion Economics Breakdown</span>
              <span className="text-[#1A1615]">100% Total Value</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden mb-3">
              <div className="bg-[#0D7A53] w-[71.8%]"></div>
              <div className="bg-[#D1CDC7] w-[18%] border-l border-white/50"></div>
              <div className="bg-[#D4A753] w-[10.2%] border-l border-white/50"></div>
            </div>
            <div className="flex gap-4 text-[9px] font-bold">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0D7A53]"></span><span className="text-[#6E6A66]">Gross:</span><span className="text-[#1A1615]">71.8%</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D1CDC7]"></span><span className="text-[#6E6A66]">COGS:</span><span className="text-[#1A1615]">18%</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D4A753]"></span><span className="text-[#6E6A66]">Perk:</span><span className="text-[#1A1615]">10.2%</span></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar 2: Patron Experience */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93] mb-1">WALLET PREVIEW</div>
              <h3 className="text-[16px] font-bold text-[#1A1615]">Patron Experience</h3>
            </div>
            <span className="px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] rounded-full text-[10px] font-bold tracking-widest">Apple &amp; Google Pass</span>
          </div>

          <div className="bg-[#1A1615] rounded-[24px] p-1 shadow-2xl relative mx-auto w-[280px]">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

            {/* Pass Container */}
            <div className="bg-[#1A1615] border border-white/10 rounded-[20px] overflow-hidden relative pt-8 pb-6 px-5 h-[480px] flex flex-col">
              {/* Pass Header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#D4A753] rounded-full flex items-center justify-center text-white font-bold text-[10px]">R</div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">REVIA PRIVÉ</span>
                </div>
                <span className="text-[10px] font-semibold text-white/50 tracking-widest uppercase">RESERVE PASS</span>
              </div>

              {/* Hero Image */}
              <div className="relative h-32 rounded-xl overflow-hidden mb-5 shrink-0 shadow-lg border border-white/10">
                <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Coffee beans" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 bg-[#D4A753] text-[#1A1615] rounded text-[9px] font-bold tracking-widest uppercase shadow-sm">COMPLIMENTARY ENTITLEMENT</span>
                </div>
              </div>

              {/* Pass Details */}
              <div className="relative z-10 flex-1">
                <h4 className="text-[18px] font-black text-white leading-snug mb-1">BUY 2, GET 1 FREE</h4>
                <p className="text-[13px] font-semibold text-white/90 mb-1">Single Origin Geisha (Whole Bean 250g)</p>
                <p className="text-[10px] font-medium text-white/50 mb-4">Downtown Flagship • Roastery &amp; Tasting Room</p>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#D4A753]/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#D4A753]" />
                  </div>
                  <div className="flex-1 border-r border-white/10">
                    <div className="text-[10px] font-medium text-[#D4A753]">14 Days from</div>
                    <div className="text-[11px] font-bold text-white leading-none mt-0.5">Unlock</div>
                  </div>
                  <div className="flex-1 pl-2">
                    <div className="text-[10px] font-medium text-white/50">Single</div>
                    <div className="text-[11px] font-bold text-white leading-none mt-0.5">Redemption</div>
                  </div>
                </div>

                {/* Barcode Area */}
                <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center mt-auto">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg" alt="barcode" className="w-full h-12 opacity-90 object-cover mb-2" style={{ filter: 'grayscale(100%) contrast(200%)' }} />
                  <div className="text-[8px] font-bold tracking-widest text-[#1A1615] uppercase mt-2">• TAP BARCODE OR HOLD NEAR COUNTER NFC •</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-[#6E6A66] bg-[#FAF8F5] p-3 rounded-xl border border-[#EFECE6]">
            <RefreshCw className="w-4 h-4 shrink-0 text-[#0D7A53]" />
            <span className="text-[10px] font-medium leading-relaxed">Dynamically synced with patron Revia Web App upon qualification.</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 space-y-6">

        {/* Auto-validation Alert */}
        <div className="bg-white border-l-4 border-l-[#0D7A53] border-y border-r border-[#EFECE6] rounded-r-xl p-5 shadow-sm flex items-start justify-between relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#E0F9ED] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-5 h-5 text-[#0D7A53]" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#1A1615] mb-1">Auto-validation passed — zero logic or budget conflicts detected across 3 active branch registers.</h4>
              <p className="text-[11px] font-medium text-[#6E6A66]">All cryptographic token envelopes are pre-compiled and ready for instantaneous sync.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end shrink-0 ml-4">
            <span className="px-2.5 py-1 bg-[#E0F9ED] border border-[#BCE3D1] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> POS MESH READY</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[9px] font-bold uppercase tracking-widest">NO BUDGET CONFLICT</span>
              <span className="px-2 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[9px] font-bold uppercase tracking-widest">SECURITY POLICY VERIFIED</span>
            </div>
          </div>
        </div>

        {/* 01 Basics Summary */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm relative">
          <div className="flex items-start justify-between mb-6 border-b border-[#EFECE6] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF8EB] text-[#9E782F] flex items-center justify-center text-[12px] font-bold border border-[#F3E5C8]">01</div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-0.5">BASICS CONFIGURATION</div>
                <h3 className="text-[18px] font-bold text-[#1A1615]">Step 1: Basics Summary</h3>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors" onClick={() => setCurrentStep(1)}>
              Edit Step 1 <ArrowRight className="w-3 h-3 -rotate-45" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-1">CAMPAIGN NAME</div>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-[#1A1615]">Autumn Reserve Tasting &amp; Geisha Perk</span>
                <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#9E9A93] rounded text-[9px] font-bold tracking-widest uppercase">#CMP-8821</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-1">CAMPAIGN TYPE</div>
              <span className="px-2.5 py-1 bg-gradient-to-r from-[#FDF8EB] to-[#FAF8F5] border border-[#F3E5C8] text-[#9E782F] rounded-full text-[11px] font-bold flex items-center gap-1.5 inline-flex shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-[#D4A753]" /> Loyalty Boost
              </span>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-2">ACTIVE BRANCHES (3 LOCATIONS)</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded-md text-[11px] font-semibold">Downtown Flagship</span>
                <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded-md text-[11px] font-semibold">Northside Mall</span>
                <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded-md text-[11px] font-semibold">West End Kiosk</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-1">RUNTIME HORIZON</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4A753]" />
                <span className="text-[13px] font-bold text-[#1A1615]">Nov 1, 2024 – Nov 30, 2024</span>
                <span className="text-[11px] font-medium text-[#9E9A93]">(30 Calendar Days)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FDF8EB] border border-[#F3E5C8] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-1 h-8 bg-[#D4A753] rounded-full"></div>
              <div>
                <span className="text-[12px] font-bold text-[#1A1615] block mb-0.5">Priority Arbitration: Priority 1 (P1)</span>
                <p className="text-[11px] font-medium text-[#6E6A66]">Supercedes seasonal discount codes and default tier stamp boosts during checkout conflict.</p>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-white border border-[#EFECE6] rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#1A1615] shadow-sm">STRICT ARBITRATION</span>
          </div>
        </div>

        {/* 02 Audience Summary */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm relative">
          <div className="flex items-start justify-between mb-6 border-b border-[#EFECE6] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF8EB] text-[#9E782F] flex items-center justify-center text-[12px] font-bold border border-[#F3E5C8]">02</div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-0.5">PATRON COHORTS</div>
                <h3 className="text-[18px] font-bold text-[#1A1615]">Step 2: Audience Summary</h3>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors" onClick={() => setCurrentStep(2)}>
              Edit Step 2 <ArrowRight className="w-3 h-3 -rotate-45" />
            </button>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D4A753]"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93]">DYNAMIC COHORT LOGIC FILTER</span>
            </div>
            <p className="text-[14px] font-medium text-[#1A1615] leading-relaxed">
              "Targets <span className="text-[#D4A753] font-bold">Gold Reserve &amp; Obsidian VIP</span> patrons, ages 21–65, with average visit rating ≥ 4.5★ and birthday within 7 days of order date."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93] mb-2 leading-tight">ENROLLED<br />SEGMENT</div>
              <div>
                <div className="text-[20px] font-bold text-[#1A1615] mb-1">2,840</div>
                <div className="text-[9px] font-bold text-[#0D7A53]">+14% vs last cycle</div>
              </div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93] mb-2 leading-tight">ESTIMATED<br />REACH</div>
              <div>
                <div className="text-[20px] font-bold text-[#1A1615] mb-1">11.4%</div>
                <div className="text-[9px] font-medium text-[#6E6A66]">of total register network</div>
              </div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93] mb-2 leading-tight">PATRON<br />PROFILE</div>
              <div>
                <div className="text-[18px] font-bold text-[#1A1615] mb-1">Mixed</div>
                <div className="text-[9px] font-medium text-[#6E6A66]">New &amp; Returning Active</div>
              </div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-4 rounded-xl shadow-sm flex flex-col justify-between">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93] mb-2 leading-tight">OPT-IN<br />COMPLIANCE</div>
              <div>
                <div className="text-[20px] font-bold text-[#0D7A53] mb-1">100%</div>
                <div className="text-[9px] font-medium text-[#6E6A66]">Zero spam exclusions</div>
              </div>
            </div>
          </div>
        </div>

        {/* 03 Conditions & Rules Summary */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm relative">
          <div className="flex items-start justify-between mb-6 border-b border-[#EFECE6] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF8EB] text-[#9E782F] flex items-center justify-center text-[12px] font-bold border border-[#F3E5C8]">03</div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-0.5">RULE LOGIC TREE</div>
                <h3 className="text-[18px] font-bold text-[#1A1615]">Step 3: Conditions &amp; Rules Summary</h3>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors" onClick={() => setCurrentStep(3)}>
              Edit Step 3 <ArrowRight className="w-3 h-3 -rotate-45" />
            </button>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-[#1A1615] text-white rounded text-[10px] font-bold tracking-widest uppercase shadow-sm">MATCH ALL (AND)</span>
              <span className="text-[11px] font-medium text-[#6E6A66]">Parent root evaluation container</span>
            </div>

            <div className="space-y-2 pl-4 border-l-2 border-[#EFECE6]">
              <div className="bg-white border border-[#EFECE6] rounded-lg p-3 flex items-center justify-between shadow-sm relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-4 before:h-[2px] before:bg-[#EFECE6]">
                <div className="flex items-center gap-3 text-[12px] font-mono font-bold text-[#1A1615]">
                  <span className="text-[#D4A753]">Customer.LifetimeSpend</span> <span className="text-[#6E6A66]">≥</span> <span>$250.00</span>
                  <span className="text-[#6E6A66] px-2 text-[10px] font-sans">AND</span>
                  <span className="text-[#D4A753]">Customer.LastVisit</span> <span className="text-[#6E6A66]">≤</span> <span>14 days</span>
                </div>
                <span className="px-2 py-0.5 bg-[#E0F9ED] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-widest">VALIDATED</span>
              </div>

              <div className="bg-[#E6F4ED] border border-[#BCE3D1] rounded-lg p-3 flex items-center justify-between shadow-sm relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-4 before:h-[2px] before:bg-[#EFECE6]">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-[#0D7A53] text-white rounded text-[9px] font-bold tracking-widest uppercase">BOGO TRIGGER</span>
                  <div className="text-[12px] font-mono font-bold text-[#1A1615]">
                    <span className="text-[#0D7A53]">Basket.ItemCount</span><span>("Single Origin Geisha 250g")</span> <span className="text-[#6E6A66]">≥</span> <span>2</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#6E6A66] text-right leading-tight">Qty ≥ 2<br />Required</span>
              </div>

              <div className="bg-white border border-[#EFECE6] rounded-lg p-3 shadow-sm relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-4 before:h-[2px] before:bg-[#EFECE6]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#1A1615]">OR SUB-GROUP</span>
                  <span className="text-[10px] font-medium text-[#9E9A93] italic">Any condition satisfies eligibility</span>
                </div>
                <div className="text-[12px] font-mono font-bold text-[#1A1615] pl-2 border-l-2 border-[#D4A753]">
                  <span className="text-[#9E782F] font-sans text-[10px]">Option A:</span> <span className="text-[#D4A753]">Patron.Tier</span> <span className="text-[#6E6A66]">==</span> <span>"Obsidian VIP"</span>
                  <span className="text-[#6E6A66] px-3">||</span>
                  <span className="text-[#9E782F] font-sans text-[10px]">Option B:</span> <span className="text-[#D4A753]">Patron.CurrentStampCycle</span> <span className="text-[#6E6A66]">≥</span> <span>8 stamps</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#1A1615] bg-[#FDF8EB] border border-[#F3E5C8] p-3 rounded-xl shadow-sm">
            <div className="w-8 h-8 rounded-md bg-white border border-[#EFECE6] flex items-center justify-center shrink-0">
              <Store className="w-4 h-4 text-[#D4A753]" />
            </div>
            <p className="text-[11px] font-medium">Trigger Event: Dynamic QR / NFC scan at POS counter stand with immediate terminal authorization.</p>
          </div>
        </div>

        {/* 04 Reward Definition Summary */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 lg:p-8 shadow-sm relative">
          <div className="flex items-start justify-between mb-6 border-b border-[#EFECE6] pb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDF8EB] text-[#9E782F] flex items-center justify-center text-[12px] font-bold border border-[#F3E5C8]">04</div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-0.5">INCENTIVE SETTLEMENT</div>
                <h3 className="text-[18px] font-bold text-[#1A1615]">Step 4: Reward Definition Summary</h3>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors" onClick={() => setCurrentStep(4)}>
              Edit Step 4 <ArrowRight className="w-3 h-3 -rotate-45" />
            </button>
          </div>

          <div className="bg-white border border-[#EFECE6] rounded-xl p-5 flex items-center justify-between mb-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FDF8EB] border border-[#F3E5C8] rounded-xl flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-[#D4A753]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-[#1A1615] uppercase tracking-widest">FREE ITEM (BOGO PERK)</span>
                  <span className="px-2 py-0.5 bg-[#E0F9ED] text-[#0D7A53] rounded text-[9px] font-bold tracking-widest uppercase border border-[#BCE3D1]">100% WAIVED</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1A1615]">1x Complimentary Single Origin Geisha (250g Whole Bean)</h4>
                <p className="text-[11px] font-medium text-[#6E6A66] mt-0.5">$0.00 patron co-pay at point of checkout.</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">WHOLESALE UNIT VALUE</div>
              <div className="text-[16px] font-bold text-[#1A1615] leading-none">$28.00 <span className="text-[11px] font-medium text-[#6E6A66]">retail</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-[#9E782F]">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">VELOCITY GUARDRAILS</span>
              </div>
              <ul className="space-y-2 text-[11px] font-medium text-[#1A1615]">
                <li className="flex items-start gap-2 before:content-['•'] before:text-[#9E9A93]">Strictly limited to 1 time redemption per loyalty profile.</li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[#9E9A93]">Campaign hard velocity cap: <span className="font-bold">500 claims maximum</span>.</li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[#9E9A93]">Hard financial ceiling: <span className="font-bold">$3,500 incentive budget cap</span>.</li>
              </ul>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-[#9E782F]">
                <BellRing className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">EXPIRATION &amp; PUSH TRIGGERS</span>
              </div>
              <ul className="space-y-2 text-[11px] font-medium text-[#1A1615]">
                <li className="flex items-start gap-2 before:content-['•'] before:text-[#9E9A93]">Valid for dynamic 14 days upon receiving trigger token.</li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[#9E9A93]">Automated push alert via Apple/Google Wallet 48h prior to cutoff.</li>
                <li className="flex items-start gap-2 before:content-['•'] before:text-[#9E9A93]">WhatsApp concierge ping configured for Obsidian tier members.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Right Sidebar 1: Deployment Forecast */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">EXECUTIVE PROJECTION</span>
            <span className="px-2 py-0.5 bg-[#E0F9ED] text-[#0D7A53] border border-[#BCE3D1] rounded text-[9px] font-bold tracking-widest uppercase">8.4x ROI</span>
          </div>

          <h3 className="text-[16px] font-bold text-[#1A1615] mb-6">Deployment Forecast</h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
              <span className="text-[12px] font-medium text-[#6E6A66]">Estimated Claims</span>
              <span className="text-[13px] font-bold text-[#1A1615]">420 – 510 claims</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
              <span className="text-[12px] font-medium text-[#6E6A66]">Projected Net<br />GMV</span>
              <span className="text-[16px] font-bold text-[#0D7A53]">+$16,400.00</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
              <span className="text-[12px] font-medium text-[#6E6A66]">Incentive Budget<br />Allocated</span>
              <div className="text-right">
                <div className="text-[13px] font-bold text-[#1A1615]">$1,950 / $3,500 cap</div>
                <div className="text-[9px] font-medium text-[#9E9A93] mt-0.5">55.7% max financial exposure</div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[12px] font-medium text-[#6E6A66]">Projected Net<br />Margin</span>
              <div className="text-right">
                <span className="text-[16px] font-bold text-[#1A1615]">71.8%</span>
                <span className="text-[11px] font-bold text-[#0D7A53] ml-1">(Target &gt;65%)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#0D7A53] animate-pulse shrink-0"></div>
            <span className="text-[10px] font-bold text-[#6E6A66] leading-tight">Roastery Register Mesh: <span className="text-[#1A1615]">3 Outlets Synced</span> (14ms latency)</span>
          </div>
        </div>

        {/* Right Sidebar 2: Patron Experience */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#9E9A93] mb-1">LIVE TOKEN CARD</div>
              <h3 className="text-[14px] font-bold text-[#1A1615]">Guest Mobile Preview</h3>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#D4A753]">Apple &amp; Google Wallet</span>
          </div>

          <div className="bg-[#1A1615] rounded-[20px] p-1 shadow-xl relative mx-auto w-full max-w-[260px]">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-lg z-20"></div>

            {/* Pass Container */}
            <div className="bg-[#1A1615] border border-white/10 rounded-[16px] overflow-hidden relative pt-7 pb-5 px-4 flex flex-col">
              {/* Pass Header */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#D4A753] rounded-full flex items-center justify-center text-white font-bold text-[9px]">R</div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/90">REVIA ROASTERS &amp; CO.</span>
                </div>
                <span className="text-[8px] font-semibold text-white/50 tracking-widest uppercase text-right leading-tight">RESERVE<br />PASS CARD</span>
              </div>

              <div className="mt-8 mb-4">
                <span className="inline-block px-2 py-0.5 border border-[#D4A753]/30 text-[#D4A753] rounded text-[8px] font-bold tracking-widest uppercase mb-2">EXCLUSIVE AUTUMN PERK</span>
                <h4 className="text-[18px] font-black text-white leading-snug mb-1">BUY 2, GET 1 FREE</h4>
                <p className="text-[10px] font-medium text-white/70 mb-4">Single Origin Geisha (Whole Bean 250g)</p>
              </div>

              {/* Barcode Area */}
              <div className="bg-white rounded-lg p-3 flex flex-col items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg" alt="barcode" className="w-full h-10 opacity-90 object-cover mb-1.5" style={{ filter: 'grayscale(100%) contrast(200%)' }} />
                <div className="text-[6px] font-bold tracking-widest text-[#1A1615] uppercase mt-1 text-center leading-tight">
                  <span className="flex items-center justify-center gap-1"><Wifi className="w-2.5 h-2.5 rotate-90" /> HOLD NEAR COUNTER NFC OR</span>
                  SCAN BARCODE
                </div>
              </div>
            </div>
          </div>

          <p className="text-[9px] font-medium text-center text-[#9E9A93] mt-4 leading-relaxed">
            Pass adapts automatically to patron's local Apple / Google Wallet dark mode.
          </p>
        </div>

        {/* Right Sidebar 3: Deployment Protocol */}
        <div className="bg-white border border-[#EFECE6] rounded-[16px] p-6 shadow-sm">
          <h3 className="text-[14px] font-bold text-[#1A1615] mb-4">Deployment Protocol</h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 text-[13px] font-bold text-[#1A1615] cursor-pointer bg-[#FAF8F5] p-4 rounded-xl border border-[#D4A753] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#D4A753]"></div>
              <div className="mt-0.5"><CircleDot className="w-4 h-4 text-[#D4A753]" /></div>
              <div>
                <span className="block mb-0.5">Publish Instantly</span>
                <span className="text-[11px] font-medium text-[#6E6A66]">Mesh registers synchronize instantly upon clicking Publish.</span>
              </div>
            </label>
            <label className="flex items-start gap-3 text-[13px] font-bold text-[#1A1615] cursor-pointer bg-white p-4 rounded-xl border border-[#EFECE6] hover:bg-[#FAF8F5] transition-colors">
              <div className="mt-0.5"><Circle className="w-4 h-4 text-[#D1CDC7]" /></div>
              <div>
                <span className="block mb-0.5">Schedule Activation</span>
                <span className="text-[11px] font-medium text-[#6E6A66]">Automated staging for Nov 1, 2024 at 00:00 PST.</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-[#1A1615] pb-24 relative">

      {/* 2. SHARED LAYOUT & TOP HEADER BAR */}
      <div className="bg-white border-b border-[#EFECE6] px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 z-20 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#9E9A93] mb-3 uppercase">
            <span className="px-2.5 py-1 bg-[#FDF8EB] text-[#9E782F] rounded-full border border-[#F3E5C8]">MERCHANT SUITE CRM</span>
            <span>• Module CMP-8821</span>
          </div>
          <h1 className="text-[28px] font-bold tracking-tight text-[#1A1615] mb-2 leading-none">Campaign Builder</h1>
          <p className="text-[14px] text-[#6E6A66] font-medium max-w-xl">Audit parameters, preview the live guest pass token, and deploy the campaign across roastery registers.</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4 flex items-center gap-4 shadow-sm w-[180px]">
            <div className="w-10 h-10 bg-white border border-[#EFECE6] rounded-full flex items-center justify-center shrink-0 shadow-sm relative">
              <Users className="w-5 h-5 text-[#D4A753]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FDF8EB] border border-[#F3E5C8] rounded-full flex items-center justify-center">
                <Plus className="w-3 h-3 text-[#9E782F]" />
              </div>
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold tracking-widest text-[#9E9A93] mb-0.5">AUDIENCE BASE</div>
              <div className="text-[18px] font-bold text-[#1A1615] leading-tight">1,840</div>
              <div className="text-[10px] font-medium text-[#6E6A66] mt-0.5">Patrons</div>
            </div>
          </div>
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4 flex items-center gap-4 shadow-sm w-[180px]">
            <div className="w-10 h-10 bg-white border border-[#EFECE6] rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <TrendingUp className="w-5 h-5 text-[#0D7A53]" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold tracking-widest text-[#9E9A93] mb-0.5">EST. LIFETIME GMV</div>
              <div className="text-[18px] font-bold text-[#0D7A53] leading-tight">+$16,400</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6 flex-1 max-w-[1600px] mx-auto w-full">

        {/* Stepper Indicator */}
        <div className="flex justify-between bg-white border border-[#EFECE6] rounded-xl px-4 py-6 shadow-sm mb-6 relative">
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-[#EFECE6] z-0 hidden md:block"></div>
          {steps.map((step) => {
            const isPast = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} onClick={() => setCurrentStep(step.id)} className="relative z-10 flex flex-col items-center flex-1 cursor-pointer group">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all relative z-10 ${isPast ? 'bg-[#0D7A53] text-white border-2 border-[#0D7A53]' : isCurrent ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white border-2 border-[#D4A753] ring-4 ring-[#FDF8EB]' : 'bg-white border-2 border-[#EFECE6] text-[#9E9A93] group-hover:border-[#D1CDC7]'}`}>
                  {isPast ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="mt-2 text-center w-full px-2 hidden sm:block">
                  <span className={`text-[11px] font-bold block ${isCurrent ? 'text-[#1A1615]' : isPast ? 'text-[#0D7A53]' : 'text-[#9E9A93]'}`}>{step.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EFECE6] p-4 flex items-center justify-between z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:pl-[280px]">
        {currentStep === 5 ? (
          <div className="flex items-center gap-3 w-full max-w-[1600px] mx-auto">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-2 h-2 rounded-full bg-[#0D7A53] animate-pulse"></div>
              <div>
                <div className="text-[13px] font-bold text-[#1A1615]">Ready to deploy campaign</div>
                <div className="text-[11px] font-medium text-[#6E6A66]">All 5 steps validated • Zero conflict warnings</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentStep(4)} className="px-5 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-[12px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors shadow-sm">
                Back to Reward Def
              </button>
              <button className="px-5 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-[12px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors shadow-sm">
                Save Draft
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-95 text-white rounded-xl text-[12px] font-bold shadow-md transition-opacity flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" /> Deploy &amp; Publish Campaign <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 text-[11px] font-bold text-[#6E6A66]">
              <span>• Draft autosaved just now</span>
              <span className="text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">• Validation Passed</span>
            </div>
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button onClick={() => setCurrentStep(prev => prev - 1)} className="px-4 py-2 bg-white border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
              <button className="px-4 py-2 bg-white border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors cursor-pointer">
                Save as Draft
              </button>
              {currentStep < 5 && (
                <button onClick={() => setCurrentStep(prev => prev + 1)} className="px-6 py-2 bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-95 text-white rounded-lg text-xs font-bold shadow-md transition-opacity flex items-center gap-1.5 cursor-pointer">
                  Continue to {steps.find(s => s.id === currentStep + 1)?.name} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
};
