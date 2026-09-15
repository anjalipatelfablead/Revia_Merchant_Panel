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
  ChevronRight,
  ChevronDown
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
  const [expandedCustomerRow, setExpandedCustomerRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCustName, setEditCustName] = useState('');
  const [editCustPhone, setEditCustPhone] = useState('');
  const [editCustEmail, setEditCustEmail] = useState('');

  const handleRegister = () => {
    if (!newCustName || !newCustPhone) return;
    const newCust: Customer = {
      id: `C${Math.floor(100000 + Math.random() * 900000)}`,
      name: newCustName,
      phone: newCustPhone,
      email: newCustEmail,
      tier: 'Standard',
      stampsCount: 0,
      stampsMax: 10,
      lifetimeSpend: 0,
      totalVisits: 0,
      joinedDate: 'Today',
      lastVisit: 'Never',
      preferredBranch: 'Downtown Flagship',
      favoriteItem: 'None',
      recentActivity: [],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCustName)}&background=FAF8F5&color=1A1615`
    };
    onAddCustomer(newCust);
    setIsRegisterModalOpen(false);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustEmail('');
    setSelectedCustomerId(newCust.id);
  };

  const handleEditOpen = () => {
    if (!selectedCustomer) return;
    setEditCustName(selectedCustomer.name);
    setEditCustPhone(selectedCustomer.phone);
    setEditCustEmail(selectedCustomer.email);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedCustomer) return;
    onUpdateCustomer({
      ...selectedCustomer,
      name: editCustName,
      phone: editCustPhone,
      email: editCustEmail,
    });
    setIsEditModalOpen(false);
  };

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
            <p className="text-xs sm:text-sm text-[#7C746C] max-w-2xl">
              Manage loyalty members, view lifetime engagement history, and manage tier privileges across active branch locations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#1A1615] bg-white border border-[#EAE6E1] hover:bg-[#FAF8F5] rounded-lg transition-colors shadow-xs cursor-pointer">
              <Download className="w-4 h-4 text-[#7C746C]" />
              Export CSV
            </button>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:opacity-95 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-white" />
              Register Customer
            </button>
          </div>
        </div>

        {/* TOP KPI METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#7C746C]">
              Total Directory Members
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">+12.4%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">{customers.length}</div>
            <div className="text-[11px] text-[#7C746C] mt-1">Active hospitality patrons</div>
          </div>
          <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#7C746C]">
              Obsidian & Gold VIPs
              <span className="bg-[#FAF6EE] text-[#9E782F] text-[11px] font-bold px-2 py-0.5 rounded-full border border-[#E5D7BE]">Top 28%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">
              {customers.filter(c => c.tier !== 'Standard').length}
            </div>
            <div className="text-[11px] text-[#7C746C] mt-1">High-LTV loyalty tier holders</div>
          </div>
          <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#7C746C]">
              Avg Stamps / Member
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">6.4 avg</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">
              {(customers.reduce((acc, c) => acc + c.stampsCount, 0) / (customers.length || 1)).toFixed(1)}
            </div>
            <div className="text-[11px] text-[#7C746C] mt-1">Out of 10 max reward threshold</div>
          </div>
          <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#7C746C]">
              Retention Velocity
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full">94.8%</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">94.8%</div>
            <div className="text-[11px] text-[#7C746C] mt-1">30-day repeat visit rate</div>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#7C746C]" />
            </div>
            <input
              type="text"
              placeholder="Search member by name, phone number, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-[#EAE6E1] rounded-lg bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1615] placeholder:text-[#9E9A93] focus:outline-none focus:border-[#D4A753]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

          {/* 4. LEFT SECTION: CUSTOMER DATA TABLE */}
          <div className="xl:col-span-7 2xl:col-span-8 bg-white rounded-xl border border-[#EAE6E1] shadow-2xs flex flex-col overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#EAE6E1]">
                    <th className="py-3 px-5 text-xs font-bold uppercase tracking-wider text-[#7C746C] w-2/5">Member</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#7C746C]">Phone / Contact</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#7C746C]">Tier</th>
                    <th className="py-3 px-5 text-xs font-bold uppercase tracking-wider text-[#7C746C] w-1/4">Loyalty Stamps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE6E1]">
                  {customers
                    .filter(c =>
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.phone.includes(searchQuery) ||
                      c.id.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((cust) => {
                    const isSelected = cust.id === selectedCustomerId;
                    const progressPct = (cust.stampsCount / cust.stampsMax) * 100;
                    return (
                      <tr
                        key={cust.id}
                        onClick={() => setSelectedCustomerId(cust.id)}
                        className={`transition-colors cursor-pointer group ${isSelected ? 'bg-[#FDF8EB]/60' : 'hover:bg-[#FAF8F5]/60'}`}
                      >
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-3">
                            <img src={cust.avatar} alt={cust.name} className="w-10 h-10 rounded-full object-cover border border-[#EAE6E1] shadow-2xs" />
                            <div>
                              <div className="text-sm font-bold text-[#1A1615] flex items-center gap-2">
                                {cust.name}
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A753]"></span>}
                              </div>
                              <div className="text-[11px] font-mono font-semibold text-[#7C746C]">{cust.id}</div>
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
                              <div className="w-full h-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-full overflow-hidden">
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

            {/* Mobile Expandable List */}
            <div className="md:hidden flex flex-col">
              {customers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((cust) => {
                const isSelected = cust.id === selectedCustomerId;
                const isExpanded = expandedCustomerRow === cust.id;
                const progressPct = (cust.stampsCount / cust.stampsMax) * 100;

                return (
                  <div key={cust.id} className="border-b border-[#EAE6E1] last:border-b-0 overflow-hidden">
                    <button
                      onClick={() => {
                        setSelectedCustomerId(cust.id);
                        setExpandedCustomerRow(isExpanded ? null : cust.id);
                      }}
                      className={`w-full p-4 flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#FDF8EB]/60' : 'bg-white hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={cust.avatar} alt={cust.name} className="w-10 h-10 rounded-full object-cover border border-[#EAE6E1] shadow-2xs" />
                        <div className="text-left">
                          <div className="text-sm font-bold text-[#1A1615] flex items-center gap-2">
                            {cust.name}
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#D4A753]"></span>}
                          </div>
                          <div className="text-[11px] font-mono font-semibold text-[#7C746C]">{cust.id}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                         {getTierBadge(cust.tier)}
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-[#8C827A]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#8C827A]" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className={`p-4 grid grid-cols-2 gap-4 border-t border-[#EAE6E1] ${isSelected ? 'bg-[#FDF8EB]/30' : 'bg-[#FAF8F5]/50'}`}>
                        <div>
                          <div className="text-[9px] uppercase font-bold text-[#7C746C] mb-1 tracking-wider">Phone / Contact</div>
                          <div className="text-xs font-mono font-bold text-[#1A1615]">{cust.phone}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] uppercase font-bold text-[#7C746C] mb-1 tracking-wider">Loyalty Stamps</div>
                          <div className="flex flex-col items-end gap-1.5">
                            <div className="text-xs font-mono font-bold text-[#1A1615]">
                              {cust.stampsCount} / 10
                            </div>
                            <div className="w-24 h-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressPct}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Table Footer / Pagination */}
            <div className="px-5 py-4 border-t border-[#EAE6E1] bg-[#FAF8F5] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#7C746C]">
                Showing {customers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, customers.length)} of {customers.length} records
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 font-bold text-[#7C746C] hover:text-[#1A1615] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >Previous</button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors cursor-pointer ${currentPage === i + 1 ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-2xs' : 'bg-white border border-[#EAE6E1] text-[#7C746C] hover:text-[#1A1615]'}`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-3 py-1.5 font-bold text-[#1A1615] hover:text-[#D4A753] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >Next</button>
              </div>
            </div>
          </div>

          {/* 5. RIGHT SECTION: CUSTOMER PROFILE SIDE DRAWER / PANEL */}
          {selectedCustomer && (
            <div className="xl:col-span-5 2xl:col-span-4 bg-white rounded-xl border border-[#EAE6E1] shadow-md sticky top-[90px] flex flex-col max-h-[calc(100vh-120px)] overflow-hidden">

              {/* Panel Header */}
              <div className="px-5 py-4 border-b border-[#EAE6E1] flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D4A753]" />
                  <h2 className="text-[15px] font-bold text-[#1A1615]">Customer Profile</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-[#FAF6EE] text-[#9E782F] border border-[#E5D7BE] rounded uppercase tracking-wider">
                    VIP Active
                  </span>
                  <button onClick={() => setSelectedCustomerId('')} className="text-[#7C746C] hover:text-[#1A1615] transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5 overflow-y-auto flex-1 space-y-6">

                {/* User Identity Section */}
                <div className="flex items-center gap-4">
                  <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-16 h-16 rounded-full object-cover shadow-2xs border-2 border-white ring-2 ring-[#EAE6E1]" />
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1615]">{selectedCustomer.name}</h3>
                    <div className="text-[11px] font-semibold text-[#7C746C] mt-0.5">
                      Member since {selectedCustomer.joinedDate || 'Oct 2023'} · <span className="font-mono">{selectedCustomer.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1A1615] mt-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded inline-flex border border-[#EAE6E1]">
                      <Phone className="w-3 h-3 text-[#D4A753]" /> {selectedCustomer.phone}
                    </div>
                  </div>
                </div>

                {/* Stat Cards Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-4">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#7C746C] mb-1">Lifetime Spend</div>
                    <div className="text-[22px] font-bold text-[#1A1615]">
                      ${selectedCustomer.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-4">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#7C746C] mb-1">Total Visits</div>
                    <div className="text-[22px] font-bold text-[#1A1615]">
                      {selectedCustomer.totalVisits} visits
                    </div>
                  </div>
                </div>

                {/* Active Loyalty Stamp Card Widget */}
                <div className="bg-[#FAF8F5] rounded-xl border border-[#EAE6E1] p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[13px] font-bold text-[#1A1615]">Loyalty Stamp Card</h4>
                    <span className="text-xs font-bold text-[#15803D]">{selectedCustomer.stampsCount} / 10 Stamps</span>
                  </div>

                  <div className="w-full h-3 bg-white border border-[#EAE6E1] rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(selectedCustomer.stampsCount / selectedCustomer.stampsMax) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-[#7C746C]">Reward: Complimentary Reserve Pour-Over</span>
                    <span className="text-[#9E782F]">{selectedCustomer.stampsMax - selectedCustomer.stampsCount} stamps left</span>
                  </div>
                </div>

                {/* Recent Branch Activity List */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#7C746C] mb-3">Recent Branch Activity</div>
                  <div className="space-y-3">
                    {selectedCustomer.recentActivity.slice(0, 3).map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-[#EAE6E1] p-3.5 rounded-xl shadow-2xs">
                        <div>
                          <div className="text-[13px] font-bold text-[#1A1615] mb-0.5">{act.action}</div>
                          <div className="text-[11px] font-semibold text-[#7C746C] flex items-center gap-1.5">
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
              <div className="p-5 border-t border-[#EAE6E1] bg-white flex items-center gap-3 shrink-0">
                <button
                  onClick={handleAddStamp}
                  className="flex-1 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:opacity-95 rounded-lg transition-all shadow-xs cursor-pointer"
                >
                  Add Stamp
                </button>
                <button
                  onClick={handleEditOpen}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#1A1615] bg-white border border-[#EAE6E1] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Register Customer Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsRegisterModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#EAE6E1] flex justify-between items-center bg-[#FAF8F5]">
              <h2 className="text-[15px] font-bold text-[#1A1615]">Register New Customer</h2>
              <button onClick={() => setIsRegisterModalOpen(false)} className="p-1 text-[#7C746C] hover:text-[#1A1615] rounded transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C746C]">Full Name <span className="text-red-500">*</span></label>
                <input type="text" value={newCustName} onChange={e => setNewCustName(e.target.value)} placeholder="e.g. Jane Doe" className="w-full px-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C746C]">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" value={newCustPhone} onChange={e => setNewCustPhone(e.target.value)} placeholder="e.g. (555) 123-4567" className="w-full px-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C746C]">Email Address</label>
                <input type="email" value={newCustEmail} onChange={e => setNewCustEmail(e.target.value)} placeholder="e.g. jane@example.com" className="w-full px-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <button
                onClick={handleRegister}
                disabled={!newCustName || !newCustPhone}
                className="w-full py-2.5 bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white rounded-lg text-sm font-bold shadow-xs mt-2 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Register & Create Wallet Pass
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Customer Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#EAE6E1] flex justify-between items-center bg-[#FAF8F5]">
              <h2 className="text-[15px] font-bold text-[#1A1615]">Edit Customer Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 text-[#7C746C] hover:text-[#1A1615] rounded transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C746C]">Full Name <span className="text-red-500">*</span></label>
                <input type="text" value={editCustName} onChange={e => setEditCustName(e.target.value)} placeholder="e.g. Jane Doe" className="w-full px-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C746C]">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" value={editCustPhone} onChange={e => setEditCustPhone(e.target.value)} placeholder="e.g. (555) 123-4567" className="w-full px-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C746C]">Email Address</label>
                <input type="email" value={editCustEmail} onChange={e => setEditCustEmail(e.target.value)} placeholder="e.g. jane@example.com" className="w-full px-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <button
                onClick={handleEditSave}
                disabled={!editCustName || !editCustPhone}
                className="w-full py-2.5 bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white rounded-lg text-sm font-bold shadow-xs mt-2 hover:opacity-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
