import React, { useState } from 'react';
import { Pencil, Trash2, Plus, Settings, ShieldAlert, ShieldCheck, Save, ChevronDown } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  minBilling: number;
  validityDuration: number;
  validityUnit: 'Days' | 'Months' | 'Years';
  startBasis: 'Customer signup date' | 'Date threshold reached';
  autoRenew: boolean;
  status: 'Active' | 'Expired';
  colorClass: string;
}

const defaultTiers: Tier[] = [
  {
    id: '1',
    name: 'VVIP',
    minBilling: 50000,
    validityDuration: 1,
    validityUnit: 'Years',
    startBasis: 'Date threshold reached',
    autoRenew: true,
    status: 'Active',
    colorClass: 'bg-[#F3E8FF] text-[#7E22CE] border-[#D8B4FE]'
  },
  {
    id: '2',
    name: 'VIP',
    minBilling: 25000,
    validityDuration: 1,
    validityUnit: 'Years',
    startBasis: 'Date threshold reached',
    autoRenew: true,
    status: 'Active',
    colorClass: 'bg-[#FDF8EB] text-[#B8862E] border-[#F3E5C8]'
  },
  {
    id: '3',
    name: 'Gold',
    minBilling: 10000,
    validityDuration: 6,
    validityUnit: 'Months',
    startBasis: 'Date threshold reached',
    autoRenew: false,
    status: 'Active',
    colorClass: 'bg-[#FEF9C3] text-[#A16207] border-[#FEF08A]'
  },
  {
    id: '4',
    name: 'Silver',
    minBilling: 5000,
    validityDuration: 6,
    validityUnit: 'Months',
    startBasis: 'Date threshold reached',
    autoRenew: false,
    status: 'Active',
    colorClass: 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]'
  },
  {
    id: '5',
    name: 'Bronze',
    minBilling: 1000,
    validityDuration: 3,
    validityUnit: 'Months',
    startBasis: 'Customer signup date',
    autoRenew: false,
    status: 'Active',
    colorClass: 'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]'
  }
];

export const CustomerTypeSettings: React.FC = () => {
  const [tiers, setTiers] = useState<Tier[]>(defaultTiers);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [minBilling, setMinBilling] = useState<number | ''>('');
  const [validityDuration, setValidityDuration] = useState<number | ''>('');
  const [validityUnit, setValidityUnit] = useState<'Days' | 'Months' | 'Years'>('Months');
  const [startBasis, setStartBasis] = useState<'Customer signup date' | 'Date threshold reached'>('Date threshold reached');
  const [autoRenew, setAutoRenew] = useState(false);
  const [status, setStatus] = useState<'Active' | 'Expired'>('Active');

  const handleEdit = (tier: Tier) => {
    setEditingTier(tier);
    setName(tier.name);
    setMinBilling(tier.minBilling);
    setValidityDuration(tier.validityDuration);
    setValidityUnit(tier.validityUnit);
    setStartBasis(tier.startBasis);
    setAutoRenew(tier.autoRenew);
    setStatus(tier.status);
  };

  const handleAddNew = () => {
    setEditingTier(null);
    setName('');
    setMinBilling('');
    setValidityDuration('');
    setValidityUnit('Months');
    setStartBasis('Date threshold reached');
    setAutoRenew(false);
    setStatus('Active');
  };

  const handleDelete = (id: string) => {
    setTiers(tiers.filter(t => t.id !== id));
    if (editingTier?.id === id) handleAddNew();
  };

  const handleSave = () => {
    if (!name || minBilling === '' || validityDuration === '') return;

    const colors = [
      'bg-[#F3E8FF] text-[#7E22CE] border-[#D8B4FE]',
      'bg-[#FDF8EB] text-[#B8862E] border-[#F3E5C8]',
      'bg-[#FEF9C3] text-[#A16207] border-[#FEF08A]',
      'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]',
      'bg-[#FFEDD5] text-[#C2410C] border-[#FED7AA]',
      'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]',
      'bg-[#D1FAE5] text-[#047857] border-[#A7F3D0]'
    ];

    const newTierObj: Tier = {
      id: editingTier ? editingTier.id : Math.random().toString(36).substr(2, 9),
      name,
      minBilling: Number(minBilling),
      validityDuration: Number(validityDuration),
      validityUnit,
      startBasis,
      autoRenew,
      status,
      colorClass: editingTier ? editingTier.colorClass : colors[Math.floor(Math.random() * colors.length)]
    };

    if (editingTier) {
      setTiers(tiers.map(t => t.id === editingTier.id ? newTierObj : t));
    } else {
      setTiers([...tiers, newTierObj]);
    }

    handleAddNew();
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="w-full font-sans bg-white p-6">
      <div className="w-full">

        <div className="mb-6">
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight">Customer Tiers</h1>
          <p className="text-sm text-[#7C746C] mt-1">Configure automated loyalty levels based on patron spending habits.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT: Tier List (~60%) */}
          <div className="w-full lg:w-[60%] space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[14px] font-bold text-[#1A1615] uppercase tracking-wider">Configured Tiers</h2>
              <span className="text-[12px] font-bold text-[#9E9A93] bg-[#EFECE6] px-2.5 py-1 rounded-full">{tiers.length} Active</span>
            </div>

            {tiers.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-[#EFECE6] text-center shadow-sm">
                <ShieldCheck className="w-12 h-12 text-[#D1CDC7] mx-auto mb-3" />
                <h3 className="text-[16px] font-bold text-[#1A1615] mb-1">No tiers configured</h3>
                <p className="text-[13px] text-[#6E6A66]">Use the panel to create your first customer tier.</p>
              </div>
            ) : (
              tiers.map((tier) => (
                <div key={tier.id} className="bg-white rounded-2xl p-3 sm:p-5 border border-[#EFECE6] shadow-sm flex items-center justify-between gap-2 group hover:border-[#D4A753]/40 transition-colors">
                  <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-[#9E9A93]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-1.5">
                        <h3 className="text-[14px] sm:text-[16px] font-bold text-[#1A1615] truncate">{tier.name}</h3>
                        <span className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wide border shrink-0 ${tier.colorClass}`}>
                          {tier.name}
                        </span>
                        {tier.status === 'Expired' && (
                          <span className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-red-50 text-red-600 border border-red-200 shrink-0">
                            Expired
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[12px] sm:text-[13px] text-[#6E6A66] font-medium">
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#D4A753]"></span>
                          {formatCurrency(tier.minBilling)} Min. Spend
                        </span>
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#9E9A93]"></span>
                          {tier.validityDuration} {tier.validityUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(tier)}
                      className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center text-[#6E6A66] hover:text-[#B8862E] hover:border-[#B8862E]/30 transition-colors"
                      title="Edit Tier"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tier.id)}
                      className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-center text-[#6E6A66] hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                      title="Delete Tier"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT: Add/Edit Panel (~40%) */}
          <div className="w-full lg:w-[40%]">
            <div className="sticky top-6 bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EFECE6]">
                <h2 className="text-[16px] font-bold text-[#1A1615] flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#B8862E]" />
                  {editingTier ? 'Edit Tier' : 'Create New Tier'}
                </h2>
                {editingTier && (
                  <button onClick={handleAddNew} className="text-[12px] font-bold text-[#B8862E] hover:text-[#9E782F] flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add New
                  </button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] block mb-2">Tier Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Platinum"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[14px] font-bold text-[#1A1615] focus:outline-none focus:border-[#B8862E] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] block mb-2">Minimum Cumulative Billing</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6A66] font-bold text-[15px]">₹</span>
                    <input
                      type="number"
                      value={minBilling}
                      onChange={(e) => setMinBilling(Number(e.target.value))}
                      placeholder="5000"
                      className="w-full pl-8 pr-4 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[14px] font-bold text-[#1A1615] focus:outline-none focus:border-[#B8862E] transition-colors"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#9E9A93] font-medium leading-relaxed">
                    Customer must reach this total spend to qualify for this tier.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] block mb-2">Validity Duration</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={validityDuration}
                      onChange={(e) => setValidityDuration(Number(e.target.value))}
                      placeholder="1"
                      className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[14px] font-bold text-[#1A1615] focus:outline-none focus:border-[#B8862E] transition-colors"
                    />
                    <div className="relative flex-1 sm:flex-none sm:w-28 shrink-0">
                      <select
                        value={validityUnit}
                        onChange={(e) => setValidityUnit(e.target.value as any)}
                        className="w-full pl-3 pr-8 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[13px] font-bold text-[#1A1615] focus:outline-none focus:border-[#B8862E] appearance-none cursor-pointer"
                      >
                        <option value="Days">Days</option>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6A66] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] block mb-2">Start Date Basis</label>
                  <div className="relative">
                    <select
                      value={startBasis}
                      onChange={(e) => setStartBasis(e.target.value as any)}
                      className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[13px] font-bold text-[#1A1615] focus:outline-none focus:border-[#B8862E] appearance-none cursor-pointer"
                    >
                      <option value="Customer signup date">Customer signup date</option>
                      <option value="Date threshold reached">Date threshold reached</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6A66] pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-[#EFECE6]">
                  <div className="pr-4">
                    <div className="text-[13px] font-bold text-[#1A1615]">Auto-Renewal</div>
                    <div className="text-[11px] text-[#9E9A93] font-medium mt-1 leading-relaxed">
                      If off, customer must re-qualify after expiry — tier is not automatically renewed.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoRenew(!autoRenew)}
                    className={`relative w-11 h-6 rounded-full border-2 transition-all cursor-pointer shrink-0 ${autoRenew ? 'bg-[#B8862E] border-[#9E782F]' : 'bg-[#EFECE6] border-[#D1CDC7]'
                      }`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${autoRenew ? 'left-[22px]' : 'left-0.5'
                      }`} />
                  </button>
                </div>

                <button
                  onClick={handleSave}
                  disabled={!name || minBilling === '' || validityDuration === ''}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all ${name && minBilling !== '' && validityDuration !== ''
                    ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-md hover:opacity-95 cursor-pointer'
                    : 'bg-[#EFECE6] text-[#9E9A93] cursor-not-allowed'
                    }`}
                >
                  <Save className="w-4 h-4" /> Save Tier
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
