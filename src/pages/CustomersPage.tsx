import React, { useState } from 'react';
import {
  Search,
  Download,
  UserPlus,
  X,
  Plus,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Store,
  CreditCard,
  Award,
  ChevronRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Customer, LoyaltyTier } from '../types';
import { TierBadge, PrimaryButton } from '../components/common/Badges';

interface CustomersPageProps {
  customers: Customer[];
  onUpdateCustomer: (updated: Customer) => void;
  onAddCustomer: (newCust: Customer) => void;
}

export const CustomersPage: React.FC<CustomersPageProps> = ({
  customers,
  onUpdateCustomer,
  onAddCustomer,
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTier, setNewTier] = useState<LoyaltyTier>('Standard');

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'All' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleAddStamp = () => {
    if (!selectedCustomer) return;
    const nextStamps = (selectedCustomer.stampsCount + 1) % (selectedCustomer.stampsMax + 1);
    const updated: Customer = {
      ...selectedCustomer,
      stampsCount: nextStamps === 0 ? 0 : nextStamps,
      totalVisits: selectedCustomer.totalVisits + 1,
      lifetimeSpend: selectedCustomer.lifetimeSpend + 12.50,
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          action: nextStamps === 0 ? 'Reward Redeemed (10 Stamps Completed)' : 'In-Store Scan Stamp Awarded',
          branch: selectedCustomer.preferredBranch,
          date: 'Just now',
          amount: 12.50,
          stampsEarned: 1,
        },
        ...selectedCustomer.recentActivity,
      ],
    };
    onUpdateCustomer(updated);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newCust: Customer = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: newPhone || '+1 (415) 555-0100',
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      tier: newTier,
      stampsCount: 1,
      stampsMax: 10,
      lifetimeSpend: 25.00,
      totalVisits: 1,
      joinedDate: 'Today',
      lastVisit: 'Just now',
      preferredBranch: 'Downtown Flagship',
      favoriteItem: 'Single Origin Pour-Over',
      recentActivity: [
        { id: `act-${Date.now()}`, action: 'Loyalty Pass Registered & 1st Stamp', branch: 'Downtown Flagship', date: 'Just now', amount: 25.00, stampsEarned: 1 },
      ],
    };
    onAddCustomer(newCust);
    setSelectedCustomerId(newCust.id);
    setIsRegisterModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Phone,Email,Tier,Stamps,Lifetime Spend,Total Visits']
        .concat(
          customers.map(
            (c) =>
              `${c.id},"${c.name}",${c.phone},${c.email},${c.tier},${c.stampsCount}/${c.stampsMax},$${c.lifetimeSpend},${c.totalVisits}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'revia_customer_directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            RELATIONSHIP ENGINE // GUEST DIRECTORY
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Customer Directory & CRM</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Real-time digital passholder telemetry, reward redemption velocity, and lifetime spend records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="px-3 py-2 rounded-lg border border-[#E5E0D8] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6E6A66]" />
            <span>Export CSV</span>
          </button>
          <PrimaryButton onClick={() => setIsRegisterModalOpen(true)} className="py-2 px-3.5 text-xs font-semibold">
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Customer</span>
          </PrimaryButton>
        </div>
      </div>

      {/* Main Split View: Table (Left/Center) + Sliding Profile Drawer (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Table Section (7 or 8 cols on xl) */}
        <div className="xl:col-span-7 2xl:col-span-8 bg-white border border-[#E5E0D8] rounded-xl shadow-xs overflow-hidden">
          {/* Table Filters & Search Bar */}
          <div className="p-3.5 border-b border-[#E5E0D8] bg-[#FAF8F5]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#9E9A93] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, phone..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E0D8] rounded-lg text-[#1A1615] placeholder:text-[#9E9A93] focus:outline-hidden focus:border-[#D4A753]"
              />
            </div>

            {/* Tier Filters */}
            <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
              {['All', 'Obsidian VIP', 'Gold Reserve', 'Standard'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer shrink-0 ${
                    tierFilter === tier
                      ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-2xs'
                      : 'bg-white border border-[#E5E0D8] text-[#6E6A66] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#9E9A93] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E0D8]">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Loyalty Tier</th>
                  <th className="py-3 px-4">Stamp Progress</th>
                  <th className="py-3 px-3 text-right">Visits</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]">
                {filteredCustomers.map((cust) => {
                  const isSelected = cust.id === selectedCustomerId;
                  const progressPct = (cust.stampsCount / cust.stampsMax) * 100;

                  return (
                    <tr
                      key={cust.id}
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className={`hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#FDF8EB]/50 font-medium' : ''
                      }`}
                    >
                      {/* Avatar & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cust.avatar}
                            alt={cust.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#E5E0D8]"
                          />
                          <div>
                            <div className="font-semibold text-[#1A1615] flex items-center gap-1.5">
                              {cust.name}
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A753]" />}
                            </div>
                            <div className="text-[10px] text-[#9E9A93] font-mono">{cust.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-3">
                        <div className="text-[#1A1615] font-mono text-[11px]">{cust.phone}</div>
                        <div className="text-[10px] text-[#6E6A66] truncate max-w-[140px]">{cust.email}</div>
                      </td>

                      {/* Loyalty Tier */}
                      <td className="py-3 px-3">
                        <TierBadge tier={cust.tier} />
                      </td>

                      {/* Stamp Progress Bar */}
                      <td className="py-3 px-4 min-w-[130px]">
                        <div className="flex items-center justify-between text-[10px] font-bold text-[#1A1615] mb-1">
                          <span>{cust.stampsCount} of {cust.stampsMax}</span>
                          <span className="text-[#9E782F]">{Math.round(progressPct)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </td>

                      {/* Visits */}
                      <td className="py-3 px-3 text-right">
                        <span className="font-bold text-[#1A1615]">{cust.totalVisits}</span>
                        <span className="text-[10px] text-[#9E9A93] block">trips</span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <span className="text-[#9E782F] font-semibold text-xs inline-flex items-center gap-0.5 hover:underline">
                          View <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Drawer / Sliding Panel: Detailed Customer Profile */}
        {selectedCustomer && (
          <div className="xl:col-span-5 2xl:col-span-4 bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-sm sticky top-20 space-y-5">
            {/* Header / Profile Pill */}
            <div className="flex items-start justify-between border-b border-[#E5E0D8] pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#D4A753]/30"
                />
                <div>
                  <h3 className="text-base font-bold text-[#1A1615] tracking-tight">{selectedCustomer.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-[#9E9A93]">{selectedCustomer.id}</span>
                    <TierBadge tier={selectedCustomer.tier} />
                  </div>
                </div>
              </div>
            </div>

            {/* Lifetime spend & Total visits stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider block">
                  LIFETIME SPEND
                </span>
                <span className="text-xl font-bold tracking-tight text-[#1A1615] mt-0.5 block">
                  ${selectedCustomer.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-[#0D7A53] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="text-[10px]">↑</span> Top 5% Spender
                </span>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider block">
                  TOTAL VISITS
                </span>
                <span className="text-xl font-bold tracking-tight text-[#1A1615] mt-0.5 block">
                  {selectedCustomer.totalVisits} visits
                </span>
                <span className="text-[10px] text-[#6E6A66] font-medium block mt-0.5">
                  Last: {selectedCustomer.lastVisit}
                </span>
              </div>
            </div>

            {/* Live Digital Stamp Card Status */}
            <div className="p-4 bg-gradient-to-br from-[#1A1615] to-[#2B2422] rounded-xl text-white shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4A753]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4A753]">
                    DIGITAL STAMP WALLET PASS
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#D4A753]">
                  {selectedCustomer.stampsCount} / {selectedCustomer.stampsMax}
                </span>
              </div>

              {/* 10 Stamp Circle Matrix */}
              <div className="grid grid-cols-5 gap-2 my-3">
                {Array.from({ length: selectedCustomer.stampsMax }).map((_, i) => {
                  const isFilled = i < selectedCustomer.stampsCount;
                  const isReward = i === selectedCustomer.stampsMax - 1;

                  return (
                    <div
                      key={i}
                      className={`h-9 rounded-lg flex flex-col items-center justify-center transition-all ${
                        isFilled
                          ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-xs'
                          : 'bg-white/10 border border-white/10 text-white/40'
                      }`}
                    >
                      {isFilled ? (
                        <span className="text-xs font-bold">☕</span>
                      ) : isReward ? (
                        <Sparkles className="w-3.5 h-3.5 text-[#D4A753]" />
                      ) : (
                        <span className="text-[10px] font-mono">{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/70 pt-2 border-t border-white/10">
                <span>Reward: Complimentary Flight at 10 Stamps</span>
                <span className="text-[#D4A753] font-semibold">NFC Active</span>
              </div>
            </div>

            {/* Actions: Add Stamp + Edit Profile */}
            <div className="grid grid-cols-2 gap-2.5">
              <PrimaryButton onClick={handleAddStamp} className="py-2 text-xs font-semibold">
                <Plus className="w-3.5 h-3.5" /> Add Stamp (+1)
              </PrimaryButton>
              <button
                onClick={() => alert(`Editing profile for ${selectedCustomer.name}`)}
                className="py-2 px-3 border border-[#E5E0D8] rounded-lg text-xs font-semibold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            {/* Recent Branch Activity List */}
            <div className="border-t border-[#E5E0D8] pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">
                  RECENT ACTIVITY LOG
                </span>
                <span className="text-[10px] text-[#6E6A66]">{selectedCustomer.preferredBranch}</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedCustomer.recentActivity.map((act) => (
                  <div key={act.id} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-[#1A1615]">
                      <span className="truncate pr-2">{act.action}</span>
                      {act.amount !== undefined && act.amount > 0 && (
                        <span className="font-mono text-[#0D7A53] shrink-0">+${act.amount.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#6E6A66]">
                      <span>{act.branch}</span>
                      <span>{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Register Customer Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1615]/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E5E0D8] shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">NEW PASS ISSUANCE</span>
                <h3 className="text-base font-bold text-[#1A1615]">Register New Guest</h3>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1 rounded-md text-[#6E6A66] hover:bg-[#FAF8F5] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                  Full Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (415) 555-..."
                    className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                    Loyalty Tier
                  </label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as LoyaltyTier)}
                    className="w-full text-xs px-2.5 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                  >
                    <option value="Standard">Standard Member</option>
                    <option value="Gold Reserve">Gold Reserve</option>
                    <option value="Obsidian VIP">Obsidian VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-1">
                  Email (Apple / Google Wallet Pass Delivery)
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="guest@domain.com"
                  className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[#1A1615] focus:outline-hidden focus:border-[#D4A753]"
                />
              </div>

              <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#6E6A66] hover:bg-[#FAF8F5] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <PrimaryButton type="submit" className="py-2 px-4 text-xs font-semibold">
                  Generate Pass & Save →
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
