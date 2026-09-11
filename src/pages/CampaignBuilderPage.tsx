import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Plus,
  Trash2,
  Users,
  TrendingUp,
  DollarSign,
  Bell,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Clock
} from 'lucide-react';
import { PrimaryButton } from '../components/common/Badges';

interface CampaignCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  logic: 'AND' | 'OR';
}

export const CampaignBuilderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(3); // 3. Conditions & Rules [Active]

  // Campaign basics
  const [campaignTitle, setCampaignTitle] = useState('Autumn Geisha Velocity Boost');
  const [channel, setChannel] = useState<'push' | 'sms' | 'wallet'>('wallet');

  // Rule Builder: Visual AND/OR block logic
  const [conditions, setConditions] = useState<CampaignCondition[]>([
    {
      id: 'rule-1',
      field: 'Customer Lifetime Spend',
      operator: '>=',
      value: '$250.00',
      logic: 'AND',
    },
    {
      id: 'rule-2',
      field: 'Last Visit Recency',
      operator: 'within',
      value: '14 days',
      logic: 'AND',
    },
  ]);

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: `rule-${Date.now()}`,
        field: 'Total Visits',
        operator: '>=',
        value: '5 visits',
        logic: 'AND',
      },
    ]);
  };

  const removeCondition = (id: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((c) => c.id !== id));
    }
  };

  const updateCondition = (id: string, key: keyof CampaignCondition, val: string) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [key]: val } : c))
    );
  };

  // Dynamic audience impact calculator based on conditions count
  const qualifyingReach = 342 + (conditions.length * 45);
  const expectedVisits = Math.round(qualifyingReach * 0.64);
  const projectedGMV = (expectedVisits * 25.00).toLocaleString('en-US', { minimumFractionDigits: 2 });

  const steps = [
    { id: 1, name: 'Basics' },
    { id: 2, name: 'Audience' },
    { id: 3, name: 'Conditions & Rules' },
    { id: 4, name: 'Reward Definition' },
    { id: 5, name: 'Review & Publish' },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            AUTOMATION ENGINE // RULE-BASED MARKETING
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Campaign Builder</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Construct complex segmentation algorithms with instant mobile wallet push triggers.
          </p>
        </div>

        <PrimaryButton onClick={() => alert('Campaign Published to Audience Reach Segment!')} className="py-2 px-4 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Publish & Launch Campaign</span>
        </PrimaryButton>
      </div>

      {/* 5-Step Horizontal Stepper */}
      <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E5E0D8] -translate-y-1/2 z-0 hidden md:block" />

          {steps.map((step) => {
            const isPast = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPast
                      ? 'bg-[#0D7A53] text-white'
                      : isCurrent
                      ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white ring-4 ring-[#FDF8EB] shadow-xs'
                      : 'bg-white border-2 border-[#E5E0D8] text-[#9E9A93]'
                  }`}
                >
                  {isPast ? <Check className="w-3.5 h-3.5" /> : step.id}
                </div>
                <div className="mt-1.5 text-center">
                  <span
                    className={`text-xs font-semibold block ${
                      isCurrent ? 'text-[#1A1615] font-bold' : isPast ? 'text-[#0D7A53]' : 'text-[#9E9A93]'
                    }`}
                  >
                    {step.name}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] uppercase font-bold text-[#9E782F] tracking-wider block">
                      • ACTIVE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Rule Builder (Left 7 cols) + Audience Impact Calculator (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rule Builder Form */}
        <div className="lg:col-span-7 bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-5">
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
              LOGIC CRITERIA BUILDER
            </span>
            <h3 className="text-base font-bold text-[#1A1615] mt-0.5">
              Visual AND / OR Segmentation Filter
            </h3>
            <p className="text-xs text-[#6E6A66]">
              Target customers who satisfy the combined Boolean conditions below.
            </p>
          </div>

          {/* Conditions List */}
          <div className="space-y-3">
            {conditions.map((cond, index) => (
              <div key={cond.id} className="space-y-2">
                {index > 0 && (
                  <div className="flex items-center gap-2 pl-4">
                    <span className="w-4 h-0.5 bg-[#E5E0D8]" />
                    <div className="flex p-0.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-md text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => updateCondition(cond.id, 'logic', 'AND')}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          cond.logic === 'AND' ? 'bg-[#9E782F] text-white' : 'text-[#6E6A66]'
                        }`}
                      >
                        AND
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCondition(cond.id, 'logic', 'OR')}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          cond.logic === 'OR' ? 'bg-[#9E782F] text-white' : 'text-[#6E6A66]'
                        }`}
                      >
                        OR
                      </button>
                    </div>
                    <span className="flex-1 h-0.5 bg-[#E5E0D8]" />
                  </div>
                )}

                <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl flex flex-col sm:flex-row items-center gap-2.5">
                  {/* Field Selector */}
                  <select
                    value={cond.field}
                    onChange={(e) => updateCondition(cond.id, 'field', e.target.value)}
                    className="w-full sm:w-48 text-xs font-semibold px-2.5 py-2 bg-white border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                  >
                    <option value="Customer Lifetime Spend">Lifetime Spend</option>
                    <option value="Last Visit Recency">Last Visit Recency</option>
                    <option value="Total Visits">Total Visits</option>
                    <option value="Stamps in Current Pass">Stamps in Pass</option>
                    <option value="Preferred Category">Category Interest</option>
                  </select>

                  {/* Operator */}
                  <select
                    value={cond.operator}
                    onChange={(e) => updateCondition(cond.id, 'operator', e.target.value)}
                    className="w-full sm:w-28 text-xs font-semibold px-2.5 py-2 bg-white border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                  >
                    <option value=">=">&gt;= (At least)</option>
                    <option value="<=">&lt;= (At most)</option>
                    <option value="within">within</option>
                    <option value="equals">equals</option>
                  </select>

                  {/* Value */}
                  <input
                    type="text"
                    value={cond.value}
                    onChange={(e) => updateCondition(cond.id, 'value', e.target.value)}
                    className="w-full sm:flex-1 text-xs font-bold px-3 py-2 bg-white border border-[#E5E0D8] rounded-lg text-[#1A1615]"
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeCondition(cond.id)}
                    className="p-2 text-[#9E9A93] hover:text-red-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addCondition}
            className="w-full py-2.5 rounded-lg border border-dashed border-[#E5E0D8] hover:border-[#D4A753] text-xs font-semibold text-[#9E782F] hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Condition Rule Block
          </button>

          {/* Delivery Trigger Channel */}
          <div className="pt-4 border-t border-[#E5E0D8]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-2">
              Delivery Push Mechanism
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setChannel('wallet')}
                className={`p-2.5 rounded-lg border font-semibold text-center transition-colors cursor-pointer ${
                  channel === 'wallet'
                    ? 'border-[#D4A753] bg-[#FDF8EB] text-[#9E782F]'
                    : 'border-[#E5E0D8] text-[#6E6A66]'
                }`}
              >
                Apple/Google Pass Push
              </button>
              <button
                type="button"
                onClick={() => setChannel('sms')}
                className={`p-2.5 rounded-lg border font-semibold text-center transition-colors cursor-pointer ${
                  channel === 'sms'
                    ? 'border-[#D4A753] bg-[#FDF8EB] text-[#9E782F]'
                    : 'border-[#E5E0D8] text-[#6E6A66]'
                }`}
              >
                Direct SMS Broadcast
              </button>
              <button
                type="button"
                onClick={() => setChannel('push')}
                className={`p-2.5 rounded-lg border font-semibold text-center transition-colors cursor-pointer ${
                  channel === 'push'
                    ? 'border-[#D4A753] bg-[#FDF8EB] text-[#9E782F]'
                    : 'border-[#E5E0D8] text-[#6E6A66]'
                }`}
              >
                In-App Beacon Banner
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Audience Impact Live Calculator (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-sm space-y-5">
            <div className="border-b border-[#E5E0D8] pb-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                LIVE CALCULATOR
              </span>
              <h3 className="text-base font-bold text-[#1A1615]">Audience Impact Forecast</h3>
              <p className="text-[11px] text-[#6E6A66]">Calculated against your 3 active store networks</p>
            </div>

            {/* Impact Metric Cards */}
            <div className="space-y-3">
              <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">
                    QUALIFYING REACH
                  </span>
                  <div className="text-xl font-bold tracking-tight text-[#1A1615] mt-0.5">
                    {qualifyingReach} Members
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#E6F4ED] text-[#0D7A53] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">
                    EXPECTED VISITS
                  </span>
                  <div className="text-xl font-bold tracking-tight text-[#1A1615] mt-0.5">
                    +{expectedVisits} Store Visits
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#FDF8EB] text-[#9E782F] flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">
                    PROJECTED GMV LIFT
                  </span>
                  <div className="text-xl font-bold tracking-tight text-[#0D7A53] mt-0.5">
                    +${projectedGMV}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#E6F4ED] text-[#0D7A53] flex items-center justify-center font-bold">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Live Member Pass Push Notification Simulation */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider block mb-2">
                MOBILE WALLET PUSH PREVIEW
              </span>
              <div className="p-3.5 bg-neutral-900 text-white rounded-xl shadow-lg border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-neutral-400">
                  <span className="flex items-center gap-1 font-semibold text-[#D4A753]">
                    <Bell className="w-3 h-3" /> REVIA PASS • NOW
                  </span>
                  <span>Flagship Beacon Trigger</span>
                </div>
                <div className="text-xs font-bold text-white">Autumn Geisha Velocity Boost</div>
                <p className="text-[11px] text-neutral-300 leading-snug">
                  Julian, your loyalty pass unlocked a complimentary Geisha Flight voucher at Downtown Flagship today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
