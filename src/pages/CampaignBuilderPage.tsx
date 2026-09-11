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
  X
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
      <div className="lg:col-span-7 bg-white border border-[#EFECE6] rounded-xl p-6 shadow-sm space-y-6">
        <div className="border-b border-[#EFECE6] pb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">STEP 2/5</span>
          <h3 className="text-base font-bold text-[#1A1615]">Who is this campaign for?</h3>
          <p className="text-[11px] text-[#6E6A66] mt-1">Narrow campaign eligibility by tier status, patron lifecycle stage, demographic filters, and guest satisfaction ratings.</p>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Tier &amp; Membership</label>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1615] text-white rounded-full text-[11px] font-bold cursor-pointer">
              <Circle className="w-3.5 h-3.5 fill-white text-white" /> Obsidian VIP <span className="text-white/60 ml-1 flex items-center justify-center"><X className="w-3 h-3" /></span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDF8EB] border border-[#D4A753]/30 text-[#9E782F] rounded-full text-[11px] font-bold cursor-pointer">
              <Star className="w-3.5 h-3.5 fill-[#D4A753] text-[#D4A753]" /> Gold Reserve <span className="text-[#9E782F]/60 ml-1 flex items-center justify-center"><X className="w-3 h-3" /></span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EFECE6] text-[#6E6A66] rounded-full text-[11px] font-bold cursor-pointer hover:bg-[#FAF8F5]">
              <Circle className="w-3.5 h-3.5 text-[#D1CDC7]" /> Silver Tier
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EFECE6] text-[#6E6A66] rounded-full text-[11px] font-bold cursor-pointer hover:bg-[#FAF8F5]">
              All Tiers
            </span>
          </div>
          <button className="text-[11px] font-bold text-[#1A1615] flex items-center gap-1 hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add Custom Segment
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Customer Lifecycle Type</label>
          <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1">
            <button className="flex-1 py-1.5 text-[11px] font-bold text-[#6E6A66] rounded-md hover:bg-[#EFECE6] transition-colors">New Patrons</button>
            <button className="flex-1 py-1.5 text-[11px] font-bold text-[#6E6A66] rounded-md hover:bg-[#EFECE6] transition-colors">Returning Patrons</button>
            <button className="flex-1 py-1.5 text-[11px] font-bold bg-white text-[#9E782F] shadow-xs rounded-md border border-[#EFECE6]">Both (Active Cohort) ✓</button>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Birthday &amp; Celebration Window</label>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center bg-[#FAF8F5] border border-[#EFECE6] rounded-lg">
              <button className="px-3 py-1.5 text-[#1A1615] font-bold hover:bg-[#EFECE6] transition-colors rounded-l-lg">-</button>
              <span className="px-4 py-1.5 text-xs font-bold text-[#1A1615] border-x border-[#EFECE6]">7 days</span>
              <button className="px-3 py-1.5 text-[#1A1615] font-bold hover:bg-[#EFECE6] transition-colors rounded-r-lg">+</button>
            </div>
          </div>
          <p className="text-[11px] font-semibold text-[#6E6A66]">Automatically syncs with guest Apple Wallet &amp; Passbook notifications 48h prior to celebration.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Age Range</label>
            <div className="px-3 py-2 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] flex justify-between items-center">
              <span>21 yrs</span>
              <div className="flex-1 mx-3 h-1.5 bg-[#EFECE6] rounded-full relative">
                <div className="absolute inset-0 bg-[#D4A753] rounded-full"></div>
              </div>
              <span>65 yrs</span>
            </div>
            <div className="text-[10px] text-right text-[#9E9A93] font-bold mt-1">Active Segment Range: 21-65</div>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Feedback &amp; Satisfaction Rating</label>
            <div className="flex items-center gap-2 mb-2">
              <select className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] focus:outline-none">
                <option>Average guest rating ≥ 4.5 / 5.0</option>
              </select>
              <span className="px-2 py-1 bg-[#E6F4ED] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-wider shrink-0 border border-[#BCE3D1]">PRIME CSAT</span>
            </div>
            <p className="text-[10px] font-semibold text-[#6E6A66]">Only includes members with at least 2 verified visits to avoid sample bias.</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="border-b border-[#EFECE6] pb-4 mb-4 text-center">
            <h4 className="text-[28px] font-bold text-[#1A1615]">2,840</h4>
            <div className="text-sm font-bold text-[#D4A753]">Eligible Patrons</div>
            <div className="text-[11px] font-semibold text-[#6E6A66] mt-1">11.4% Reach out of 24,850 enrolled members.</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-2">Active Tier Composition Breakdown</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1A1615]"></span> Obsidian VIP</span>
                  <span className="text-[#1A1615]">1,260 (44.4%)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#D4A753]"></span> Gold Reserve</span>
                  <span className="text-[#1A1615]">1,580 (55.6%)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full border border-[#D1CDC7]"></span> Silver Tier</span>
                  <span className="text-[#9E9A93]">EXCLUDED</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFECE6]">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-2">Projected Campaign Forecast</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-[#FAF8F5] p-2 rounded-lg text-[11px] font-semibold border border-[#EFECE6]">
                  <span className="text-[#6E6A66]">Expected Redemptions</span>
                  <span className="text-[#1A1615] font-bold">520 – 640 visits <span className="text-[#0D7A53]">+22% lift</span></span>
                </div>
                <div className="flex justify-between items-center bg-[#FAF8F5] p-2 rounded-lg text-[11px] font-semibold border border-[#EFECE6]">
                  <span className="text-[#6E6A66]">Projected Gross GMV</span>
                  <span className="text-[#1A1615] font-bold">+$19,800 <span className="text-[#0D7A53]">High ROI</span></span>
                </div>
                <div className="flex justify-between items-center bg-[#FAF8F5] p-2 rounded-lg text-[11px] font-semibold border border-[#EFECE6]">
                  <span className="text-[#6E6A66]">Est. Incentive Cost</span>
                  <span className="text-[#1A1615] font-bold">$2,860 – $3,320 <span className="text-[#6E6A66]">Within Budget</span></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFECE6]">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-2">Sample Qualifying Patron</div>
              <div className="flex items-center gap-3 bg-white border border-[#EFECE6] p-3 rounded-xl shadow-xs">
                <div className="w-10 h-10 bg-[#1A1615] rounded-full flex items-center justify-center text-white font-bold text-xs border border-[#D4A753]">JV</div>
                <div>
                  <div className="text-xs font-bold text-[#1A1615]">Julian Vane <span className="px-1 py-0.5 bg-[#1A1615] text-[#D4A753] text-[8px] rounded uppercase tracking-wider ml-1">VIP</span></div>
                  <div className="text-[10px] font-semibold text-[#6E6A66] mt-0.5">14 Salon Visits • Rating 5.0 ★ • Birthday in 4d</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 bg-white border border-[#EFECE6] rounded-xl p-6 shadow-sm space-y-6">
        <div className="border-b border-[#EFECE6] pb-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">STEP 3/5</span>
            <h3 className="text-base font-bold text-[#1A1615]">Trigger &amp; Qualification Rules</h3>
          </div>
          <span className="px-2 py-1 bg-[#FDF8EB] text-[#9E782F] rounded text-[9px] font-bold uppercase tracking-wider border border-[#F3E5C8]">EVALUATION ENGINE: Real-time</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 bg-[#FAF8F5] p-2 rounded-lg border border-[#EFECE6] text-xs font-bold text-[#1A1615]">
            MATCH:
            <select className="bg-white border border-[#EFECE6] px-2 py-1 rounded focus:outline-none">
              <option>ALL (AND)</option>
            </select>
            of the following condition criteria:
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="px-2 py-1.5 bg-[#1A1615] text-white rounded text-[10px] font-bold">AND</div>
              <div className="flex-1 flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFECE6]">
                <select className="flex-1 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>Customer Lifetime $</option></select>
                <select className="bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>is greater than or equal to</option></select>
                <input type="text" defaultValue="$ 250.00" className="w-24 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-bold focus:outline-none" />
                <button className="p-1.5 text-[#FFEBEB] hover:bg-[#FFEBEB] bg-[#FFEBEB] rounded text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-2 py-1.5 bg-[#1A1615] text-white rounded text-[10px] font-bold">AND</div>
              <div className="flex-1 flex items-center gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFECE6]">
                <select className="flex-1 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>Last Visit Date</option></select>
                <select className="bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>is within the last</option></select>
                <input type="text" defaultValue="14 days" className="w-24 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-bold focus:outline-none" />
                <button className="p-1.5 text-[#FFEBEB] hover:bg-[#FFEBEB] bg-[#FFEBEB] rounded text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="pl-8 relative border-l-2 border-[#D4A753] ml-4 pt-2">
              <div className="absolute -left-3 -top-2 bg-[#FDF8EB] border border-[#D4A753] px-1.5 py-0.5 rounded text-[9px] font-bold text-[#9E782F]">BOGO</div>
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#D4A753]/30 shadow-xs mb-3">
                <div className="text-[11px] font-bold text-[#1A1615] mb-2">Item Quantity in Order (Buy X Get Y)</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-[#6E6A66]">Buy</span>
                  <select className="flex-1 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>Espresso</option></select>
                  <select className="bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>buy quantity of</option></select>
                  <input type="text" defaultValue="3" className="w-12 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-bold text-center focus:outline-none" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#6E6A66]">Customer gets 1</span>
                  <select className="flex-1 bg-white border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>same item (Espresso)</option></select>
                  <span className="text-[11px] font-semibold text-[#6E6A66]">free</span>
                  <span className="px-2 py-1 bg-[#E6F4ED] text-[#0D7A53] rounded text-[9px] font-bold uppercase border border-[#BCE3D1]">100% item waiver</span>
                </div>
                <div className="text-[10px] font-bold text-[#9E782F] mt-3 bg-[#FDF8EB] p-2 rounded border border-[#F3E5C8]">Preview: Buy 3 Espresso, get 1 Espresso free (100% item waiver).</div>
              </div>
            </div>

            <div className="pl-8 relative border-l-2 border-[#EFECE6] ml-4 pt-2">
              <div className="absolute -left-4 -top-2 bg-white border border-[#EFECE6] px-1.5 py-0.5 rounded text-[9px] font-bold text-[#6E6A66]">OR GROUP</div>
              <div className="bg-white p-3.5 rounded-xl border border-[#EFECE6] shadow-xs space-y-2">
                <div className="text-[10px] font-semibold text-[#6E6A66]">Customer satisfies AT LEAST ONE criteria below:</div>
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>Current Tier</option></select>
                  <select className="bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>is one of</option></select>
                  <div className="flex-1 flex gap-1">
                    <span className="bg-[#1A1615] text-white px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">Obsidian VIP <X className="w-3 h-3" /></span>
                    <span className="bg-[#FDF8EB] border border-[#D4A753]/30 text-[#9E782F] px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">Gold Reserve <X className="w-3 h-3" /></span>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-center text-[#9E9A93]">- OR -</div>
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>Total Stamp Cycle</option></select>
                  <select className="bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-semibold focus:outline-none"><option>is greater than</option></select>
                  <input type="text" defaultValue="8 stamps" className="flex-1 bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1.5 rounded text-xs font-bold focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="flex-1 py-2 rounded-lg border border-[#EFECE6] text-xs font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors">+ Add Condition Rule</button>
            <button className="flex-1 py-2 rounded-lg border border-dashed border-[#D4A753] bg-[#FDF8EB]/50 text-xs font-bold text-[#9E782F] hover:bg-[#FDF8EB] transition-colors flex items-center justify-center gap-1">
              <Zap className="w-3 h-3" /> + Add Nested Condition Group (AND/OR)
            </button>
          </div>
        </div>

        <div className="border-t border-[#EFECE6] pt-5">
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#6E6A66] mb-3">Delivery Timing &amp; Branch Eligibility</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-[10px] font-bold text-[#9E9A93] mb-1">Trigger Event</label>
                <select className="w-full bg-white border border-[#EFECE6] px-3 py-2 rounded-lg text-xs font-bold focus:outline-none"><option>On QR Stand Scan at POS</option></select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#9E9A93] mb-1">Campaign Runtime Window</label>
                <div className="w-full bg-white border border-[#EFECE6] px-3 py-2 rounded-lg text-xs font-bold flex justify-between items-center">
                  <span>Nov 1, 2024 – Nov 30, 2024</span>
                  <span className="text-[#D4A753] text-[9px] uppercase tracking-wider">30 Days Active</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#9E9A93] mb-1">Active Branches</label>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white border border-[#EFECE6] text-[#1A1615] rounded text-[10px] font-bold flex items-center gap-1"><Check className="w-3 h-3 text-[#0D7A53]" /> Downtown Flagship</span>
                <span className="px-2 py-1 bg-white border border-[#EFECE6] text-[#1A1615] rounded text-[10px] font-bold flex items-center gap-1"><Check className="w-3 h-3 text-[#0D7A53]" /> Northside Mall</span>
                <span className="px-2 py-1 bg-white border border-[#EFECE6] text-[#1A1615] rounded text-[10px] font-bold flex items-center gap-1"><Check className="w-3 h-3 text-[#0D7A53]" /> West End Kiosk</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#EFECE6]">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Audience Impact</div>
              <div className="text-sm font-bold text-[#1A1615]">Qualifying Customers 4,120</div>
            </div>
            <span className="px-2 py-1 bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] rounded text-[10px] font-bold">16.6% Reach</span>
          </div>

          <div className="space-y-2 mb-4 text-xs font-bold">
            <div className="flex justify-between"><span className="text-[#6E6A66]">Expected Visits</span><span className="text-[#1A1615]">680 – 820</span></div>
            <div className="flex justify-between"><span className="text-[#6E6A66]">Projected GMV</span><span className="text-[#0D7A53]">+$16,400</span></div>
          </div>

          <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-2 pt-3 border-t border-[#EFECE6]">Tier Distribution</div>
          <div className="space-y-1.5 text-[11px] font-bold">
            <div className="flex justify-between"><span className="text-[#1A1615]">Obsidian VIP</span><span className="text-[#6E6A66]">34.5%</span></div>
            <div className="flex justify-between"><span className="text-[#D4A753]">Gold Reserve</span><span className="text-[#6E6A66]">51.0%</span></div>
            <div className="flex justify-between"><span className="text-[#9E9A93]">Silver Tier</span><span className="text-[#6E6A66]">14.5%</span></div>
          </div>
        </div>

        <div className="bg-[#1A1615] rounded-xl p-5 shadow-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold tracking-widest uppercase text-white/60">REVIA PRIVÉ</span>
            <span className="px-2 py-0.5 bg-[#D4A753]/20 text-[#D4A753] border border-[#D4A753]/30 rounded text-[9px] font-bold tracking-widest uppercase flex items-center gap-1"><Zap className="w-2.5 h-2.5" /> FLASH PRIVILEGE</span>
          </div>
          <h4 className="text-[15px] font-black leading-snug mb-2">BUY 3 GET 1 FREE – Single Origin Geisha</h4>
          <p className="text-[11px] font-semibold text-white/70 leading-relaxed mb-4">Auto-entitlement activated on 250g whole bean roast. Valid today across Downtown Flagship &amp; partners.</p>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="py-2 bg-white/10 hover:bg-white/20 rounded text-[10px] font-bold text-white transition-colors">Hold near Counter NFC</button>
            <button className="py-2 bg-white text-[#1A1615] hover:bg-[#FAF8F5] rounded text-[10px] font-bold transition-colors">Redeem at POS</button>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-white border border-[#EFECE6] rounded-lg text-[10px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5"><RefreshCw className="w-3 h-3" /> Regenerate Sample Member</button>
          <button className="flex-1 py-2 bg-white border border-[#EFECE6] rounded-lg text-[10px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5"><Smartphone className="w-3 h-3" /> Test Push to Device</button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 bg-white border border-[#EFECE6] rounded-xl p-6 shadow-sm space-y-6">
        <div className="border-b border-[#EFECE6] pb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">STEP 4/5</span>
          <h3 className="text-base font-bold text-[#1A1615]">What does the customer get?</h3>
        </div>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button className="p-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-[10px] font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#EFECE6]">
              <Percent className="w-4 h-4 text-[#9E9A93]" /> % Discount
            </button>
            <button className="p-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-[10px] font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#EFECE6]">
              <DollarSign className="w-4 h-4 text-[#9E9A93]" /> $ Fixed Credit
            </button>
            <button className="p-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-[10px] font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#EFECE6]">
              <Activity className="w-4 h-4 text-[#9E9A93]" /> 💳 Cashback
            </button>
            <button className="p-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl text-[10px] font-bold text-[#6E6A66] flex flex-col items-center gap-2 hover:bg-[#EFECE6]">
              <Star className="w-4 h-4 text-[#9E9A93]" /> ⭐ Points Multipliers
            </button>
            <button className="p-3 bg-[#FDF8EB] border-2 border-[#D4A753] rounded-xl text-[10px] font-bold text-[#9E782F] flex flex-col items-center gap-2 relative overflow-hidden">
              <div className="absolute top-1 right-1"><Check className="w-2.5 h-2.5" /></div>
              <Zap className="w-4 h-4 text-[#D4A753]" /> 🎁 Free Item / BOGO
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Entitlement &amp; Value Config</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <span className="text-[10px] font-semibold text-[#9E9A93] block mb-1">Entitlement Item</span>
              <select className="w-full bg-[#FAF8F5] border border-[#EFECE6] px-3 py-2 rounded-lg text-xs font-bold text-[#1A1615] focus:outline-none"><option>Geisha (250g Whole Bean)</option></select>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#9E9A93] block mb-1">Discount Magnitude</span>
              <div className="flex items-center gap-2 bg-[#FDF8EB] border border-[#F3E5C8] px-3 py-2 rounded-lg text-xs font-bold text-[#9E782F]">
                <div className="w-3 h-3 rounded-full bg-[#D4A753] flex items-center justify-center border border-white"><div className="w-1 h-1 bg-white rounded-full"></div></div>
                100% Complimentary
              </div>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#9E9A93] block mb-1">Transaction Cap</span>
              <select className="w-full bg-[#FAF8F5] border border-[#EFECE6] px-3 py-2 rounded-lg text-xs font-bold text-[#1A1615] focus:outline-none"><option>Max 1 Free Item / Order</option></select>
            </div>
          </div>
          <div className="text-[10px] font-semibold text-[#6E6A66]">Full retail waiver [$38 value]</div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Usage &amp; Velocity Limits (Guardrails)</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-[#1A1615] text-white rounded text-xs font-bold border border-[#1A1615]">1 Time Only</button>
              <button className="px-3 py-1.5 bg-white text-[#6E6A66] hover:bg-[#FAF8F5] rounded text-xs font-bold border border-[#EFECE6]">Once per Week</button>
              <button className="px-3 py-1.5 bg-white text-[#6E6A66] hover:bg-[#FAF8F5] rounded text-xs font-bold border border-[#EFECE6]">Unlimited Window</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="text-[10px] font-semibold text-[#9E9A93] block mb-1">Max Total Redemptions</span>
                <input type="text" defaultValue="500 Total Patron Claims" className="w-full bg-[#FAF8F5] border border-[#EFECE6] pl-3 pr-16 py-2 rounded-lg text-xs font-bold text-[#1A1615]" />
                <div className="absolute right-2 top-6 bg-[#E6F4ED] text-[#0D7A53] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border border-[#BCE3D1]">Cap: 500</div>
              </div>
              <div className="relative">
                <span className="text-[10px] font-semibold text-[#9E9A93] block mb-1">Campaign Incentive Budget</span>
                <input type="text" defaultValue="$3,500 USD Hard Ceiling" className="w-full bg-[#FAF8F5] border border-[#EFECE6] pl-3 pr-16 py-2 rounded-lg text-xs font-bold text-[#1A1615]" />
                <div className="absolute right-2 top-6 bg-[#E6F4ED] text-[#0D7A53] px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border border-[#BCE3D1]">Guarded</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl">
              <div>
                <div className="text-[11px] font-bold text-[#1A1615]">Promotional Stacking Control</div>
                <div className="text-[10px] text-[#6E6A66] font-semibold">Allow combining with other active offers or discounts.</div>
              </div>
              <div className="w-10 h-5 bg-[#EFECE6] rounded-full relative cursor-pointer"><div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm border border-[#D1CDC7]"></div></div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-3">Reward Validity &amp; Expiration Window</label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2 p-3 bg-[#FDF8EB] border border-[#F3E5C8] rounded-xl text-xs font-bold text-[#9E782F]">
              <div className="w-3 h-3 rounded-full bg-[#D4A753] flex items-center justify-center border border-white"><div className="w-1 h-1 bg-white rounded-full"></div></div>
              14 Days from purchase trigger
            </div>
            <div className="flex items-center gap-2 p-3 bg-white border border-[#EFECE6] rounded-xl text-xs font-bold text-[#6E6A66]">
              <div className="w-3 h-3 rounded-full border border-[#D1CDC7] bg-white"></div>
              November 30, 2024
            </div>
          </div>
          <div className="p-3 bg-[#E6F4ED] border border-[#BCE3D1] rounded-xl flex items-center justify-between">
            <div className="text-[11px] font-bold text-[#0D7A53]">Automated Expiration Alert: Send push notification via Apple Wallet &amp; WhatsApp 48 hours prior to lapse</div>
            <span className="px-2 py-1 bg-[#0D7A53] text-white rounded text-[9px] font-bold uppercase tracking-wider">Active</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-4">Reward Cost &amp; Margin Impact Engine</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-3 rounded-xl">
              <div className="text-[10px] font-semibold text-[#6E6A66] mb-1">Est. Redemptions</div>
              <div className="text-base font-bold text-[#1A1615]">420 – 510</div>
              <div className="text-[9px] font-bold text-[#D4A753] uppercase mt-1">23.4% Velocity</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-3 rounded-xl">
              <div className="text-[10px] font-semibold text-[#6E6A66] mb-1">Promotion Cost</div>
              <div className="text-base font-bold text-[#1A1615]">$1.95k</div>
              <div className="text-[9px] font-bold text-[#0D7A53] uppercase mt-1">Under $3.5k Cap</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-3 rounded-xl">
              <div className="text-[10px] font-semibold text-[#6E6A66] mb-1">Projected GMV</div>
              <div className="text-base font-bold text-[#1A1615]">+$16,400</div>
            </div>
            <div className="bg-[#FAF8F5] border border-[#EFECE6] p-3 rounded-xl">
              <div className="text-[10px] font-semibold text-[#6E6A66] mb-1">Net Campaign Margin</div>
              <div className="text-base font-bold text-[#1A1615]">71.8%</div>
              <div className="text-[9px] font-bold text-[#0D7A53] uppercase mt-1">&gt;65% Target</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1615] rounded-xl p-5 shadow-xl text-white flex flex-col items-center text-center">
          <div className="text-[9px] font-bold tracking-widest uppercase text-white/60 mb-2">PATRON PASS LIVE PREVIEW</div>
          <div className="w-full bg-white text-[#1A1615] rounded-xl p-4 shadow-inner relative overflow-hidden">
            <div className="text-[10px] font-bold text-[#D4A753] tracking-widest mb-1">COMPLIMENTARY ENTITLEMENT</div>
            <h4 className="text-lg font-black mb-4">BUY 2, GET 1 FREE</h4>
            <div className="flex justify-center mb-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg" alt="barcode" className="h-12 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8 space-y-4">
        <div className="bg-[#E6F4ED] border border-[#BCE3D1] rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D7A53]">
            <CheckCircle2 className="w-4 h-4" /> Auto-validation passed — zero logic or budget conflicts detected across 3 active branch registers.
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-white border border-[#BCE3D1] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-widest flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> POS MESH READY</span>
            <span className="px-2 py-1 bg-white border border-[#BCE3D1] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">NO BUDGET CONFLICT</span>
            <span className="px-2 py-1 bg-white border border-[#BCE3D1] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">SECURITY POLICY VERIFIED</span>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3 border-b border-[#EFECE6] pb-3">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#9E9A93] mb-1">01 Step 1: Basics Summary</div>
              <h4 className="text-[13px] font-bold text-[#1A1615]">Autumn Reserve Tasting &amp; Geisha Perk <span className="px-1.5 py-0.5 bg-[#FDF8EB] text-[#9E782F] text-[9px] rounded ml-1 border border-[#F3E5C8]">Loyalty Boost</span></h4>
            </div>
            <button className="text-[10px] font-bold text-[#D4A753] hover:underline" onClick={() => setCurrentStep(1)}>Edit Step 1 ↗</button>
          </div>
          <div className="flex gap-6 text-xs font-semibold">
            <div><span className="text-[#6E6A66] block">Active Branches</span><span className="text-[#1A1615]">3 Locations</span></div>
            <div><span className="text-[#6E6A66] block">Runtime</span><span className="text-[#1A1615]">Nov 1, 2024 – Nov 30, 2024 (30 Days)</span></div>
            <div><span className="text-[#6E6A66] block">Priority Arbitration</span><span className="text-[#1A1615]">Priority 1 (P1)</span></div>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3 border-b border-[#EFECE6] pb-3">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#9E9A93] mb-1">02 Step 2: Audience Summary</div>
              <div className="text-xs font-semibold text-[#1A1615] bg-[#FAF8F5] p-2 rounded-lg border border-[#EFECE6] italic">"Targets Gold Reserve &amp; Obsidian VIP patrons, ages 21–65, with average visit rating ≥ 4.5★ and birthday within 7 days of order date."</div>
            </div>
            <button className="text-[10px] font-bold text-[#D4A753] hover:underline" onClick={() => setCurrentStep(2)}>Edit Step 2 ↗</button>
          </div>
          <div className="flex gap-4">
            <span className="px-2 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[10px] font-bold">Enrolled: 2,840</span>
            <span className="px-2 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[10px] font-bold">Est Reach: 11.4%</span>
            <span className="px-2 py-1 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[10px] font-bold">Profile: Mixed</span>
            <span className="px-2 py-1 bg-[#E6F4ED] border border-[#BCE3D1] text-[#0D7A53] rounded text-[10px] font-bold">Opt-in: 100%</span>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3 border-b border-[#EFECE6] pb-3">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#9E9A93] mb-1">03 Step 3: Conditions &amp; Rules Summary</div>
              <div className="space-y-1.5 bg-[#FAF8F5] p-3 rounded-lg border border-[#EFECE6] text-xs font-mono font-semibold text-[#1A1615]">
                <div><span className="text-[#0D7A53] font-bold">MATCH ALL (AND):</span> Customer.LifetimeSpend ≥ $250.00 AND Customer.LastVisit ≤ 14 days.</div>
                <div><span className="text-[#D4A753] font-bold">BOGO TRIGGER:</span> Basket.ItemCount("Single Origin Geisha 250g") ≥ 2.</div>
                <div><span className="text-[#6E6A66] font-bold">OR SUB-GROUP:</span> Tier = Obsidian VIP OR StampCycle ≥ 8 stamps.</div>
              </div>
            </div>
            <button className="text-[10px] font-bold text-[#D4A753] hover:underline shrink-0" onClick={() => setCurrentStep(3)}>Edit Step 3 ↗</button>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between mb-3 border-b border-[#EFECE6] pb-3">
            <div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-[#9E9A93] mb-1">04 Step 4: Reward Definition Summary</div>
              <div className="text-xs font-bold text-[#1A1615] bg-[#FDF8EB] p-2 rounded-lg border border-[#F3E5C8] inline-block mb-2">FREE ITEM (BOGO PERK) • 100% WAIVED &rarr; 1x Complimentary Single Origin Geisha 250g (Wholesale Value: $28.00).</div>
              <div className="flex gap-3 text-[10px] font-bold text-[#6E6A66]">
                <span className="bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1 rounded">1 Time redemption per patron</span>
                <span className="bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1 rounded">Cap: 500 claims</span>
                <span className="bg-[#FAF8F5] border border-[#EFECE6] px-2 py-1 rounded">Budget Cap: $3,500</span>
              </div>
            </div>
            <button className="text-[10px] font-bold text-[#D4A753] hover:underline" onClick={() => setCurrentStep(4)}>Edit Step 4 ↗</button>
          </div>
        </div>

      </div>

      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-4">Deployment Forecast</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold"><span className="text-[#6E6A66]">Estimated Claims</span><span className="text-[#1A1615]">420 – 510 claims</span></div>
            <div className="flex items-center justify-between text-xs font-bold"><span className="text-[#6E6A66]">Projected Net GMV</span><span className="text-[#0D7A53]">+$16,400.00</span></div>
            <div className="flex items-center justify-between text-xs font-bold"><span className="text-[#6E6A66]">Allocated Budget</span><span className="text-[#1A1615]">$1,950 / $3,500</span></div>
            <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-[#EFECE6]"><span className="text-[#1A1615]">Projected Net Margin</span><span className="text-[#1A1615]">71.8%</span></div>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Deployment Options</div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-[#1A1615] cursor-pointer bg-[#FAF8F5] p-3 rounded-lg border border-[#EFECE6]">
              <CircleDot className="w-4 h-4 text-[#D4A753]" />
              Publish Instantly (Mesh register sync)
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-[#6E6A66] cursor-pointer p-3 border border-transparent">
              <Circle className="w-4 h-4 text-[#D1CDC7]" />
              Schedule Activation (Select launch date/time)
            </label>
          </div>
          <button className="w-full py-3.5 bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-95 text-white rounded-lg text-sm font-bold shadow-md transition-opacity flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> Deploy &amp; Publish Campaign <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-[#1A1615] pb-24 relative">

      {/* 2. SHARED LAYOUT & TOP HEADER BAR */}
      <div className="bg-white border-b border-[#EFECE6] px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">Home &gt; CRM &amp; Activity &gt; Campaigns &gt; New Campaign</div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Campaign Builder</h1>
            <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[10px] font-bold tracking-wider">DRAFT ID #CMP-8821</span>
            <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] rounded text-[10px] font-bold tracking-wider">Version 1.3</span>
            <span className="px-2 py-0.5 bg-[#FDF8EB] border border-[#F3E5C8] text-[#9E782F] rounded text-[10px] font-bold tracking-wider uppercase">Engine Status: Real-Time Evaluation</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors cursor-pointer">
            <Clock className="w-3.5 h-3.5" /> Load Preset
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors cursor-pointer">
            <HelpCircle className="w-3.5 h-3.5" /> Documentation
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E6F4ED] border border-[#BCE3D1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#0D7A53] uppercase tracking-wider">Terminal Online</span>
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
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all bg-white relative z-10 ${isPast ? 'bg-[#0D7A53] text-white border-2 border-[#0D7A53]' : isCurrent ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white border-2 border-[#D4A753] ring-4 ring-[#FDF8EB]' : 'border-2 border-[#EFECE6] text-[#9E9A93] group-hover:border-[#D1CDC7]'}`}>
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
      </div>

    </div>
  );
};
