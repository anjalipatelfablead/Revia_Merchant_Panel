import React, { useState } from 'react';
import {
  Search,
  Bell,
  Download,
  UserPlus,
  Star,
  User,
  Phone,
  Award,
  X,
  Sparkles,
  Plus,
  ChevronRight
} from 'lucide-react';
import { Customer, LoyaltyTier } from '../types';

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

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

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
          action: nextStamps === 0 ? 'Reward Redeemed' : 'In-Store Scan Stamp Awarded',
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

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Obsidian VIP':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1615] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider shadow-sm">
            <Star className="w-3 h-3 fill-[#D4AF37]" /> Obsidian VIP
          </span>
        );
      case 'Gold Reserve':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FDF8EB] text-[#9E782F] border border-[#D4A753]/30 text-[10px] font-bold uppercase tracking-wider">
            <Star className="w-3 h-3 fill-[#9E782F]" /> Gold Reserve
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5F4F0] text-[#6E6A66] text-[10px] font-bold uppercase tracking-wider">
            <User className="w-3 h-3" /> Standard
          </span>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F5] flex flex-col font-sans text-[#1A1615]">
      <div className="p-4 sm:p-6 space-y-6 flex-1">
        {/* MAIN SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight mb-1">Customer Directory</h1>
            <p className="text-sm text-[#6E6A66] max-w-2xl">
              Manage loyalty members, view lifetime engagement history, and manage tier privileges across active branch locations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1A1615] bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-lg transition-colors shadow-sm cursor-pointer">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-90 rounded-lg transition-opacity shadow-sm cursor-pointer">
              <UserPlus className="w-4 h-4" />
              Register Customer
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

          {/* 4. LEFT SECTION: CUSTOMER DATA TABLE */}
          <div className="xl:col-span-7 2xl:col-span-8 bg-white rounded-xl border border-[#EFECE6] shadow-sm flex flex-col overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#F7F5F0] border-b border-[#EFECE6]">
                    <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] w-2/5">Member</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Phone / Contact</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Tier</th>
                    <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] w-1/4">Loyalty Stamps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {customers.map((cust) => {
                    const isSelected = cust.id === selectedCustomerId;
                    const progressPct = (cust.stampsCount / cust.stampsMax) * 100;
                    return (
                      <tr
                        key={cust.id}
                        onClick={() => setSelectedCustomerId(cust.id)}
                        className={`transition-colors cursor-pointer group ${isSelected ? 'bg-[#FDF8EB]/60' : 'hover:bg-[#FAF8F5]'}`}
                      >
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-3">
                            <img src={cust.avatar} alt={cust.name} className="w-10 h-10 rounded-full object-cover border border-[#EFECE6] shadow-xs" />
                            <div>
                              <div className="text-sm font-bold text-[#1A1615] flex items-center gap-2">
                                {cust.name}
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A753]"></span>}
                              </div>
                              <div className="text-[11px] font-mono font-semibold text-[#9E9A93]">{cust.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs font-mono font-bold text-[#1A1615]">{cust.phone}</div>
                        </td>
                        <td className="py-3 px-4">
                          {getTierBadge(cust.tier)}
                        </td>
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="w-full h-1.5 bg-[#EFECE6] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full transition-all duration-500 ease-out"
                                  style={{ width: `${progressPct}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="text-xs font-mono font-bold text-[#1A1615] shrink-0 w-10 text-right">
                              {cust.stampsCount} / 10
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Pagination */}
            <div className="px-5 py-4 border-t border-[#EFECE6] bg-[#FAF8F5] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#6E6A66]">Showing 1 to {customers.length} of 24,850 records</span>
              <div className="flex items-center gap-1.5">
                <button className="px-3 py-1.5 font-bold text-[#9E9A93] hover:text-[#1A1615] transition-colors cursor-pointer">Previous</button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white font-bold shadow-xs">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-white border border-[#EFECE6] text-[#6E6A66] hover:text-[#1A1615] font-bold transition-colors cursor-pointer">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-white border border-[#EFECE6] text-[#6E6A66] hover:text-[#1A1615] font-bold transition-colors cursor-pointer">3</button>
                <button className="px-3 py-1.5 font-bold text-[#1A1615] hover:text-[#D4A753] transition-colors cursor-pointer">Next</button>
              </div>
            </div>
          </div>

          {/* 5. RIGHT SECTION: CUSTOMER PROFILE SIDE DRAWER / PANEL */}
          {selectedCustomer && (
            <div className="xl:col-span-5 2xl:col-span-4 bg-white rounded-xl border border-[#EFECE6] shadow-lg sticky top-[90px] flex flex-col max-h-[calc(100vh-120px)] overflow-hidden">

              {/* Panel Header */}
              <div className="px-5 py-4 border-b border-[#EFECE6] flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D4A753]" />
                  <h2 className="text-[15px] font-bold text-[#1A1615]">Customer Profile</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-[#1A1615] text-[#D4A753] rounded uppercase tracking-wider">
                    VIP Active
                  </span>
                  <button className="text-[#9E9A93] hover:text-[#1A1615] transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5 overflow-y-auto flex-1 space-y-6">

                {/* User Identity Section */}
                <div className="flex items-center gap-4">
                  <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white ring-2 ring-[#EFECE6]" />
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1615]">{selectedCustomer.name}</h3>
                    <div className="text-[11px] font-semibold text-[#6E6A66] mt-0.5">
                      Member since {selectedCustomer.joinedDate || 'Oct 2023'} · <span className="font-mono">{selectedCustomer.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1A1615] mt-1.5 bg-[#FAF8F5] px-2 py-1 rounded inline-flex border border-[#EFECE6]">
                      <Phone className="w-3 h-3 text-[#D4A753]" /> {selectedCustomer.phone}
                    </div>
                  </div>
                </div>

                {/* Stat Cards Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">Lifetime Spend</div>
                    <div className="text-[22px] font-bold text-[#1A1615]">
                      ${selectedCustomer.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-1">Total Visits</div>
                    <div className="text-[22px] font-bold text-[#1A1615]">
                      {selectedCustomer.totalVisits} visits
                    </div>
                  </div>
                </div>

                {/* Active Loyalty Stamp Card Widget */}
                <div className="bg-[#FAF8F5] rounded-xl border border-[#EFECE6] p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[13px] font-bold text-[#1A1615]">Loyalty Stamp Card</h4>
                    <span className="text-xs font-bold text-[#0D7A53]">{selectedCustomer.stampsCount} / 10 Stamps</span>
                  </div>

                  <div className="w-full h-3 bg-white border border-[#EFECE6] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(selectedCustomer.stampsCount / selectedCustomer.stampsMax) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-[#6E6A66]">Reward: Complimentary Reserve Pour-Over</span>
                    <span className="text-[#D4A753]">{selectedCustomer.stampsMax - selectedCustomer.stampsCount} stamps left</span>
                  </div>
                </div>

                {/* Recent Branch Activity List */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] mb-3">Recent Branch Activity</div>
                  <div className="space-y-3">
                    {selectedCustomer.recentActivity.slice(0, 3).map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-[#EFECE6] p-3.5 rounded-xl shadow-xs">
                        <div>
                          <div className="text-[13px] font-bold text-[#1A1615] mb-0.5">{act.action}</div>
                          <div className="text-[11px] font-semibold text-[#6E6A66] flex items-center gap-1.5">
                            {act.branch} · {act.date}
                          </div>
                        </div>
                        {act.amount !== undefined && act.amount > 0 && (
                          <div className="text-[13px] font-bold font-mono text-[#1A1615]">
                            ${act.amount.toFixed(2)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Footer Buttons */}
              <div className="p-5 border-t border-[#EFECE6] bg-white flex items-center gap-3 shrink-0">
                <button
                  onClick={handleAddStamp}
                  className="flex-1 py-3 text-[13px] font-bold text-white bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-90 rounded-lg transition-opacity shadow-sm cursor-pointer"
                >
                  Add Stamp
                </button>
                <button className="px-6 py-3 text-[13px] font-bold text-[#1A1615] bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer">
                  Edit Profile
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
