import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Download,
  UserPlus,
  TrendingUp,
  Clock,
  CheckCircle2,
  MoreVertical,
  Activity,
  MapPin,
  Wifi,
  Zap,
  Coffee,
  Check
} from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const [fastEntryMode, setFastEntryMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('All Branches (Downtown)');
  const [paymentFilter, setPaymentFilter] = useState('Payment: All');
  const [statusFilter, setStatusFilter] = useState('Status: All');
  const [expandedTxId, setExpandedTxId] = useState<string | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [fastPosModalOpen, setFastPosModalOpen] = useState(false);
  const [counterSearch, setCounterSearch] = useState('#REV-8924');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const [selectedStampsAction, setSelectedStampsAction] = useState<number>(2);
  const [customStamps, setCustomStamps] = useState<string>('');
  const [orderValue, setOrderValue] = useState<string>('$18.50');

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [transactions, setTransactions] = useState([
    {
      id: '#ORD-94812 (NFC-TAP-44)',
      guestName: 'Marcus Vance',
      avatar: 'MV',
      tier: 'BLACK TIER',
      type: 'Purchase + 2 Stamps',
      items: '2x Panama Geisha Pour-Over',
      channel: 'POS-01 (Barista Counter)',
      time: '2m ago',
      amount: '$18.50',
      stamps: '+2 Stamps',
      status: 'Completed',
    },
    {
      id: '#ORD-94811 (VOUCHER-51)',
      guestName: 'Sophia Lin',
      avatar: 'SL',
      tier: 'RESERVE',
      type: 'Voucher Redemption',
      items: 'Free Pour-Over Reward [-10 Stamps]',
      channel: 'Mobile App Redeem',
      time: '8m ago',
      amount: 'Free Perk',
      stamps: '-10 Stamps',
      status: 'Verified',
    },
    {
      id: '#ORD-94810 (STAMP-EARN)',
      guestName: 'Arthur Lehmann',
      avatar: 'AL',
      tier: 'MEMBER',
      type: 'Stamp Earn Only',
      items: 'Counter Scan [Cold Brew Growler]',
      channel: 'POS-02 (Roastery Bar)',
      time: '14m ago',
      amount: '$24.00',
      stamps: '+1 Stamp',
      status: 'Completed',
    },
    {
      id: '#ORD-94889 (NFC-TAP-43)',
      guestName: 'Clara Hughes',
      avatar: 'CH',
      tier: 'BLACK TIER',
      type: 'Single Origin Tasting Flight',
      items: '3-Varietal Cup Tasting + Beans',
      channel: 'POS-01 (Barista Counter)',
      time: '22m ago',
      amount: '$36.50',
      stamps: '+3 Stamps',
      status: 'Completed',
    },
    {
      id: '#ORD-94888 (FAST-COUNTER)',
      guestName: 'Guest Walk-in',
      avatar: 'GW',
      tier: 'NON-MEMBER',
      type: 'Espresso Romano + Croissant',
      items: 'Direct POS Register Entry',
      channel: 'POS-03 (Takeaway Window)',
      time: '31m ago',
      amount: '$11.20',
      stamps: '0 Stamps',
      status: 'Completed',
    },
  ]);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.items.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter !== 'Status: All') {
      matchesStatus = statusFilter.includes('Completed') ? tx.status === 'Completed' : tx.status === 'Verified';
    }

    let matchesCategory = true;
    if (categoryFilter === 'Purchases') matchesCategory = tx.type.toLowerCase().includes('purchase') || tx.type.toLowerCase().includes('flight') || tx.amount.includes('$');
    if (categoryFilter === 'Stamps Only') matchesCategory = tx.type.toLowerCase().includes('stamp earn');
    if (categoryFilter === 'Redemptions') matchesCategory = tx.type.toLowerCase().includes('redemption');

    let matchesBranch = true;
    if (branchFilter !== 'All Branches (Downtown)') {
      if (branchFilter.includes('Northside')) matchesBranch = tx.channel.includes('POS-02') || tx.channel.includes('POS-03');
      if (branchFilter.includes('West End')) matchesBranch = tx.channel.includes('POS-04');
    }

    let matchesPayment = true;
    if (paymentFilter !== 'Payment: All') {
      if (paymentFilter.includes('Credit Card')) matchesPayment = tx.amount.includes('$');
      if (paymentFilter.includes('Voucher')) matchesPayment = tx.type.includes('Voucher');
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesBranch && matchesPayment;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, branchFilter, paymentFilter, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) || 1;
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const DropdownSelect = ({ id, value, options, onChange }: { id: string, value: string, options: string[], onChange: (v: string) => void }) => (
    <div className="relative w-full sm:w-auto" ref={openDropdown === id ? dropdownRef : null}>
      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className="flex items-center justify-between gap-1.5 px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-xs font-semibold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors cursor-pointer w-full sm:w-auto"
      >
        <span className="truncate">{value}</span> <ChevronDown className="w-3.5 h-3.5 text-[#9E9A93] shrink-0" />
      </button>
      {openDropdown === id && (
        <div className="absolute top-full mt-1 left-0 sm:left-auto sm:right-0 w-full min-w-[160px] bg-white border border-[#EFECE6] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpenDropdown(null); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#FAF8F5] transition-colors ${value === opt ? 'font-bold text-[#1A1615] bg-[#FAF8F5]' : 'font-medium text-[#6E6A66]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'BLACK TIER':
        return <span className="px-1.5 py-0.5 rounded bg-[#1A1615] text-white text-[9px] font-bold tracking-wider uppercase">BLACK TIER</span>;
      case 'RESERVE':
        return <span className="px-1.5 py-0.5 rounded bg-[#FDF8EB] text-[#9E782F] text-[9px] font-bold tracking-wider uppercase border border-[#F3E5C8]">RESERVE</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded bg-[#F5F4F0] text-[#6E6A66] text-[9px] font-bold tracking-wider uppercase">NON-MEMBER</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1]"></span> Verified
      </span>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-[#1A1615]">
        {/* Bottom Toast Feedback */}
        {feedbackToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1A1615] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-[#3D3732] animate-in slide-in-from-bottom-5 fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
            <span>{feedbackToast}</span>
          </div>
        )}

        <div className="p-4 lg:p-6 space-y-6 flex-1 max-w-[1600px] mx-auto w-full">

          {/* MAIN SECTION HEADER & TOP METRICS */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight">Transactions &amp; POS Counter Entry</h1>
                <span className="w-fit px-2.5 py-1 text-[10px] font-bold bg-[#FDF8EB] text-[#9E782F] rounded-full uppercase tracking-wider border border-[#F3E5C8]">
                  Live Terminal Feed
                </span>
              </div>
              <p className="text-sm text-[#6E6A66] max-w-2xl">
                Live register stream, counter check-ins, customer stamp logging, and instant POS fast entry.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shrink-0 mt-2 md:mt-0">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#1A1615] bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-lg transition-colors shadow-sm cursor-pointer">
                <Download className="w-4 h-4 text-[#6E6A66]" />
                Export Ledger CSV
              </button>
              <button
                onClick={() => setFastPosModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:opacity-95 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-white" />
                Fast POS Entry
              </button>
            </div>
          </div>

          {/* Stat Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Today Revenue</div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +18% vs avg
                </span>
              </div>
              <div className="text-[26px] font-bold text-[#1A1615] mb-1">$8,420</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">142 total register events</div>
            </div>

            <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Stamps Issued Today</div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FDF8EB] text-[#9E782F] rounded flex items-center gap-1">
                  ◷ 94% NFC/QR tap
                </span>
              </div>
              <div className="text-[26px] font-bold text-[#1A1615] mb-1">384</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">+42 stamps vs yesterday peak</div>
            </div>

            <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Redemptions Completed</div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F5F4F0] text-[#6E6A66] rounded">
                  $410 value claimed
                </span>
              </div>
              <div className="text-[26px] font-bold text-[#1A1615] mb-1">28</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">Complimentary pour-overs &amp; beans</div>
            </div>

            <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Avg Transaction Speed</div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Terminal mesh
                </span>
              </div>
              <div className="text-[26px] font-bold text-[#1A1615] mb-1">1.8s</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">Zero offline queue drops</div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

            {/* 4. LEFT SECTION: LIVE TRANSACTION LEDGER & FILTER BAR */}
            <div className="xl:col-span-8 bg-white rounded-xl border border-[#EFECE6] shadow-sm flex flex-col overflow-hidden">

              {/* Filter & Category Tabs */}
              <div className="p-4 border-b border-[#EFECE6] bg-[#FAF8F5]/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCategoryFilter('All')}
                      className={`px-3 py-1.5 shadow-sm rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${categoryFilter === 'All' ? 'bg-white border border-[#EFECE6] text-[#1A1615]' : 'bg-transparent border border-transparent text-[#6E6A66] hover:bg-[#EFECE6]'}`}>
                      All ({transactions.length})
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Purchases')}
                      className={`px-3 py-1.5 shadow-sm rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${categoryFilter === 'Purchases' ? 'bg-white border border-[#EFECE6] text-[#1A1615]' : 'bg-transparent border border-transparent text-[#6E6A66] hover:bg-[#EFECE6]'}`}>
                      Purchases
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Stamps Only')}
                      className={`px-3 py-1.5 shadow-sm rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${categoryFilter === 'Stamps Only' ? 'bg-white border border-[#EFECE6] text-[#1A1615]' : 'bg-transparent border border-transparent text-[#6E6A66] hover:bg-[#EFECE6]'}`}>
                      Stamps Only
                    </button>
                    <button
                      onClick={() => setCategoryFilter('Redemptions')}
                      className={`px-3 py-1.5 shadow-sm rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${categoryFilter === 'Redemptions' ? 'bg-white border border-[#EFECE6] text-[#1A1615]' : 'bg-transparent border border-transparent text-[#6E6A66] hover:bg-[#EFECE6]'}`}>
                      Redemptions
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E6F4ED] text-[#0D7A53] rounded border border-[#BCE3D1] text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53] animate-pulse"></span>
                    Live Stream (Updated 10s ago)
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9A93]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by Member ID, Order ID..."
                      className="w-full pl-8 pr-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-xs focus:outline-none focus:border-[#D4A753] text-[#1A1615] placeholder:text-[#9E9A93] font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <DropdownSelect id="branch" value={branchFilter} options={['All Branches (Downtown)', 'Northside Mall', 'West End Kiosk']} onChange={setBranchFilter} />
                    <DropdownSelect id="payment" value={paymentFilter} options={['Payment: All', 'Payment: Credit Card', 'Payment: Mobile Pay', 'Payment: Voucher']} onChange={setPaymentFilter} />
                    <DropdownSelect id="status" value={statusFilter} options={['Status: All', 'Status: Completed', 'Status: Verified']} onChange={setStatusFilter} />
                  </div>
                </div>
              </div>

              {/* Ledger Data Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#EFECE6]">
                      <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93] w-[18%]">Order / Stamp ID</th>
                      <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93] w-[18%]">Guest / Member</th>
                      <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93] w-[25%]">Type &amp; Items</th>
                      <th className="py-3 px-3 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93]">Channel / Terminal</th>
                      <th className="py-3 px-3 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93]">Time</th>
                      <th className="py-3 px-4 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93]">Amount</th>
                      <th className="py-3 px-3 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93]">Status</th>
                      <th className="py-3 px-3 text-[9px] font-bold uppercase tracking-widest text-[#9E9A93] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE6]">
                    {currentTransactions.map((tx, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="text-xs font-mono font-bold text-[#D4A753]">{tx.id.split(' ')[0]}</div>
                          <div className="text-[10px] font-semibold text-[#9E9A93] mt-0.5">{tx.id.split(' ')[1]}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#EFECE6] border border-[#D1CDC7] flex items-center justify-center text-[10px] font-bold text-[#6E6A66] shrink-0">
                              {tx.avatar}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#1A1615] leading-tight">{tx.guestName}</div>
                              <div className="mt-0.5">{getTierBadge(tx.tier)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs font-bold text-[#1A1615]">{tx.type}</div>
                          <div className="text-[10px] font-semibold text-[#6E6A66] mt-0.5">{tx.items}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-[11px] font-semibold text-[#6E6A66]">{tx.channel}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#1A1615]">
                            <Clock className="w-3 h-3 text-[#9E9A93]" /> {tx.time}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs font-bold text-[#1A1615]">{tx.amount}</div>
                          <div className={`text-[10px] font-bold mt-0.5 ${tx.stamps.includes('+') ? 'text-[#D4A753]' : tx.stamps.includes('-') ? 'text-[#0D7A53]' : 'text-[#9E9A93]'}`}>
                            {tx.stamps}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {getStatusBadge(tx.status)}
                        </td>
                        <td className="py-3 px-3 text-right relative">
                          <button
                            onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === tx.id ? null : tx.id); }}
                            className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] rounded bg-white hover:bg-[#EFECE6] transition-colors cursor-pointer border border-transparent hover:border-[#D1CDC7]"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {openDropdown === tx.id && (
                            <>
                              <div className="fixed inset-0 z-[50]" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#EFECE6] rounded-xl shadow-xl z-[60] overflow-hidden text-left">
                                <button onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); showToast('Viewing receipt...'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1A1615] hover:bg-[#FAF8F5]">View Receipt</button>
                                <button onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); showToast('Refunding transaction...'); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2]">Refund</button>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Expandable List */}
              <div className="md:hidden flex flex-col">
                {currentTransactions.map((tx, idx) => {
                  const isExpanded = expandedTxId === tx.id;

                  return (
                    <div key={idx} className="border-b border-[#EFECE6] last:border-b-0 overflow-hidden">
                      <button
                        onClick={() => setExpandedTxId(isExpanded ? null : tx.id)}
                        className="w-full p-4 flex items-start justify-between transition-colors cursor-pointer bg-white hover:bg-[#FAF8F5]"
                      >
                        <div className="flex gap-3 text-left">
                          <div className="w-8 h-8 mt-1 rounded-full bg-[#EFECE6] border border-[#D1CDC7] flex items-center justify-center text-[10px] font-bold text-[#6E6A66] shrink-0">
                            {tx.avatar}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1A1615] mb-1">
                              {tx.guestName}
                            </div>
                            <div className="text-xs font-mono font-bold text-[#D4A753]">
                              {tx.id.split(' ')[0]}
                            </div>
                            <div className="text-[10px] font-semibold text-[#9E9A93] mt-0.5">
                              {tx.id.split(' ')[1]}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(tx.status)}
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-[#8C827A]" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-[#8C827A]" />
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#1A1615]">{tx.amount}</div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 grid grid-cols-2 gap-4 border-t border-[#EFECE6] bg-[#FAF8F5]/50">
                          <div className="col-span-2">
                            <div className="text-[9px] uppercase font-bold text-[#9E9A93] mb-1 tracking-wider">Type &amp; Items</div>
                            <div className="text-xs font-bold text-[#1A1615]">{tx.type}</div>
                            <div className="text-[10px] font-semibold text-[#6E6A66] mt-0.5">{tx.items}</div>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase font-bold text-[#9E9A93] mb-1 tracking-wider">Channel / Terminal</div>
                            <div className="text-[11px] font-semibold text-[#6E6A66]">{tx.channel}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] uppercase font-bold text-[#9E9A93] mb-1 tracking-wider">Time</div>
                            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-[#1A1615]">
                              <Clock className="w-3 h-3 text-[#9E9A93]" /> {tx.time}
                            </div>
                          </div>
                          <div>
                            <div className="text-[9px] uppercase font-bold text-[#9E9A93] mb-1 tracking-wider">Stamps</div>
                            <div className={`text-[11px] font-bold ${tx.stamps.includes('+') ? 'text-[#D4A753]' : tx.stamps.includes('-') ? 'text-[#0D7A53]' : 'text-[#1A1615]'}`}>
                              {tx.stamps}
                            </div>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-[#EFECE6] flex justify-end gap-2 mt-2">
                            <button onClick={(e) => { e.stopPropagation(); showToast('Viewing receipt...'); }} className="px-4 py-2 text-xs font-semibold text-[#1A1615] bg-white border border-[#EFECE6] rounded-lg shadow-sm hover:bg-[#FAF8F5]">View Receipt</button>
                            <button onClick={(e) => { e.stopPropagation(); showToast('Refunding transaction...'); }} className="px-4 py-2 text-xs font-semibold text-[#DC2626] bg-[#FEE2E2] border border-[#FECACA] rounded-lg shadow-sm hover:bg-[#FCA5A5]">Refund</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Table Footer Pagination */}
              <div className="px-5 py-4 border-t border-[#EFECE6] bg-[#FAF8F5] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#6E6A66]">
                  Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTransactions.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 font-bold transition-colors cursor-pointer ${currentPage === 1 ? 'text-[#D1CDC7] cursor-not-allowed' : 'text-[#9E9A93] hover:text-[#1A1615]'}`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 flex items-center justify-center rounded font-bold transition-colors cursor-pointer ${currentPage === page
                        ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-xs'
                        : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:text-[#1A1615]'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 font-bold transition-colors cursor-pointer ${currentPage === totalPages ? 'text-[#D1CDC7] cursor-not-allowed' : 'text-[#1A1615] hover:text-[#D4A753]'}`}
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>

            {/* 5. RIGHT SECTION: FAST COUNTER ENTRY PANEL (STICKY WIDGET) */}
            <div className="xl:col-span-4 sticky top-24">
              <div className="bg-white rounded-xl border border-[#EFECE6] shadow-lg flex flex-col">

                {/* Header */}
                <div className="px-5 py-4 border-b border-[#EFECE6] bg-[#1A1615] text-white rounded-t-xl flex items-center justify-between">
                  <h2 className="text-[15px] font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4A753]" />Fast Counter Entry
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/70">QUICK MODE</span>
                    <button
                      onClick={() => setFastEntryMode(!fastEntryMode)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${fastEntryMode ? 'bg-[#0D7A53]' : 'bg-[#4A4441]'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${fastEntryMode ? 'translate-x-4.5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-6 bg-[#FDFBF7]">

                  {/* Section 1: Customer Lookup / Scan */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93]" />
                      <input
                        type="text"
                        value={counterSearch}
                        onChange={e => setCounterSearch(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') showToast(`Found member: ${counterSearch}`); }}
                        className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#EFECE6] rounded-xl text-[15px] font-mono font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] shadow-inner"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FAF8F5] p-1 rounded border border-[#EFECE6]">
                        <Wifi className="w-3.5 h-3.5 text-[#1A1615]" />
                      </div>
                    </div>

                    {/* Active Customer Card */}
                    <div className="bg-white border-2 border-[#D4A753] rounded-xl p-4 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#1A1615] border-2 border-[#D4A753] flex items-center justify-center text-white font-bold text-lg shrink-0">MV</div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-bold text-[#1A1615]">Marcus Vance</h3>
                              <span className="px-1.5 py-0.5 rounded bg-[#1A1615] text-[#D4AF37] text-[9px] font-bold tracking-wider uppercase whitespace-nowrap">BLACK TIER</span>
                            </div>
                            <div className="text-[11px] font-mono font-semibold text-[#6E6A66] mt-0.5">ID: #REV-8924 • +1 (555) 392-8819</div>
                          </div>
                        </div>
                        <div className="shrink-0 mt-1">
                          <span className="px-2 py-0.5 bg-[#E6F4ED] text-[#0D7A53] rounded text-[9px] font-bold uppercase tracking-widest border border-[#BCE3D1] whitespace-nowrap">Active Pass</span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                          <span className="text-[#1A1615]">8 of 10 Collected</span>
                        </div>
                        <div className="w-full h-2 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#EFECE6]">
                          <div className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>

                      <div className="text-[10px] font-semibold text-[#8A6A32] bg-[#FDF8EB] px-2 py-1 rounded border border-[#F3E5C8] inline-block">
                        Favorite: Panama Geisha Reserve
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Rapid Stamp Action */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-2">Rapid Stamp Action</div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <button
                        onClick={() => { setSelectedStampsAction(1); setCustomStamps(''); }}
                        className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all shadow-sm cursor-pointer relative overflow-hidden ${selectedStampsAction === 1 ? 'bg-[#FDF8EB]/30 border-2 border-[#D4A753]' : 'bg-white border border-[#EFECE6] hover:border-[#D4A753] hover:bg-[#FDF8EB] group'}`}
                      >
                        {selectedStampsAction === 1 && (
                          <div className="absolute top-2 right-2">
                            <div className="w-4 h-4 rounded-full bg-[#D4A753] text-white flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>
                          </div>
                        )}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedStampsAction === 1 ? 'bg-[#D4A753]' : 'bg-[#FAF8F5] group-hover:bg-[#D4A753]'}`}>
                          <Coffee className={`w-4 h-4 ${selectedStampsAction === 1 ? 'text-white' : 'text-[#1A1615] group-hover:text-white'}`} />
                        </div>
                        <span className="text-sm font-bold text-[#1A1615]">+1 Stamp</span>
                        <span className={`text-[10px] font-semibold ${selectedStampsAction === 1 ? 'text-[#9E782F]' : 'text-[#6E6A66]'}`}>Drip / Espresso</span>
                      </button>
                      <button
                        onClick={() => { setSelectedStampsAction(2); setCustomStamps(''); }}
                        className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all shadow-sm cursor-pointer relative overflow-hidden ${selectedStampsAction === 2 ? 'bg-[#FDF8EB]/30 border-2 border-[#D4A753]' : 'bg-white border border-[#EFECE6] hover:border-[#D4A753] hover:bg-[#FDF8EB] group'}`}
                      >
                        {selectedStampsAction === 2 && (
                          <div className="absolute top-2 right-2">
                            <div className="w-4 h-4 rounded-full bg-[#D4A753] text-white flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>
                          </div>
                        )}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedStampsAction === 2 ? 'bg-[#D4A753]' : 'bg-[#FAF8F5] group-hover:bg-[#D4A753]'}`}>
                          <Coffee className={`w-4 h-4 ${selectedStampsAction === 2 ? 'text-white' : 'text-[#1A1615] group-hover:text-white'}`} />
                        </div>
                        <span className="text-sm font-bold text-[#1A1615]">+2 Stamps</span>
                        <span className={`text-[10px] font-semibold ${selectedStampsAction === 2 ? 'text-[#9E782F]' : 'text-[#6E6A66]'}`}>Pour-Over / Beans</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-semibold text-[#6E6A66]">Need custom count?</span>
                      <input
                        type="text"
                        value={customStamps}
                        onChange={e => { setCustomStamps(e.target.value); setSelectedStampsAction(0); }}
                        placeholder="Enter Custom Stamps"
                        className="w-36 px-2 py-1 bg-white border border-[#EFECE6] rounded text-xs font-mono text-right focus:outline-none focus:border-[#D4A753]"
                      />
                    </div>
                  </div>

                  {/* Section 3: Order Value */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93] mb-2">Order Value (Optional Sync)</div>
                    <input
                      type="text"
                      value={orderValue}
                      onChange={e => setOrderValue(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#EFECE6] rounded-xl text-xl font-bold font-mono text-[#1A1615] focus:outline-none shadow-inner mb-2"
                    />
                    <div className="grid grid-cols-4 gap-2">
                      {['$5', '$10', '$25', '$50'].map((val) => (
                        <button
                          key={val}
                          onClick={() => setOrderValue(val)}
                          className="py-1.5 bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-lg text-xs font-bold text-[#6E6A66] transition-colors cursor-pointer"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Available Reward Box */}
                  <div className="bg-[#E6F4ED] border border-[#BCE3D1] rounded-xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold text-[#0D7A53] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Complimentary Flight &amp; Pastry voucher unlocked.
                      </div>
                      <span className="px-2 py-0.5 bg-[#0D7A53] text-white rounded text-[9px] font-bold uppercase tracking-widest">READY</span>
                    </div>
                    <button className="w-full py-2 bg-white border border-[#BCE3D1] hover:bg-[#FAF8F5] rounded-lg text-xs font-bold text-[#0D7A53] transition-colors cursor-pointer mt-1 shadow-xs">
                      Redeem Voucher on Order
                    </button>
                  </div>

                </div>

                {/* Section 5: Primary Submission Button & POS Status */}
                <div className="p-5 border-t border-[#EFECE6] bg-white">
                  <button
                    onClick={() => {
                      const finalStampsCount = customStamps ? parseInt(customStamps) || 0 : selectedStampsAction;
                      const stampsString = finalStampsCount > 0 ? `+${finalStampsCount} Stamp${finalStampsCount > 1 ? 's' : ''}` : '0 Stamps';

                      const newTx = {
                        id: `#ORD-${Math.floor(10000 + Math.random() * 90000)} (FAST-COUNTER)`,
                        guestName: counterSearch.includes('REV') ? 'Marcus Vance' : 'Guest Walk-in',
                        avatar: counterSearch.includes('REV') ? 'MV' : 'GW',
                        tier: counterSearch.includes('REV') ? 'BLACK TIER' : 'NON-MEMBER',
                        type: 'Direct Fast POS Entry',
                        items: 'Manual Counter Entry',
                        channel: 'POS-02 (Downtown Flagship)',
                        time: 'Just now',
                        amount: orderValue || '$0.00',
                        stamps: stampsString,
                        status: 'Completed',
                      };
                      setTransactions([newTx, ...transactions]);
                      showToast('Processed and logged stamp successfully.');
                      setCounterSearch('');
                      setSelectedStampsAction(2);
                      setCustomStamps('');
                      setOrderValue('$18.50');
                    }}
                    className="w-full py-3.5 bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-95 text-white rounded-lg text-[15px] font-bold transition-opacity shadow-md mb-3 cursor-pointer flex justify-center items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Process &amp; Log Stamp
                  </button>
                  <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold text-[#6E6A66]">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-[#0D7A53]" /> POS Scanner #02 • Downtown Flagship
                    </span>
                    <span className="text-[#1A1615]">NFC Active (99.4%)</span>
                  </div>
                </div>

                {/* Section 6: Counter Hotkeys Footer */}
                <div className="px-5 py-3 border-t border-[#EFECE6] bg-[#FAF8F5] rounded-b-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1615]">Counter Hotkeys</span>
                    <span className="px-2 py-0.5 bg-white border border-[#EFECE6] rounded text-[9px] font-bold text-[#9E9A93] uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-[#0D7A53]" /> Keyboard enabled
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[#6E6A66]">
                      <span>Quick Stamp +1</span>
                      <kbd className="px-1.5 py-0.5 bg-white border border-[#EFECE6] rounded shadow-xs font-mono font-bold text-[#1A1615]">Ctrl + 1</kbd>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[#6E6A66]">
                      <span>Focus Search/Scan</span>
                      <kbd className="px-1.5 py-0.5 bg-white border border-[#EFECE6] rounded shadow-xs font-mono font-bold text-[#1A1615]">Ctrl + K</kbd>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[#6E6A66]">
                      <span>Process Order</span>
                      <kbd className="px-1.5 py-0.5 bg-[#1A1615] text-white border border-[#1A1615] rounded shadow-xs font-mono font-bold">Enter ↵</kbd>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fast POS Entry Modal */}
      {fastPosModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setFastPosModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#EFECE6] flex justify-between items-center bg-[#FAF8F5]">
              <h2 className="text-[15px] font-bold text-[#1A1615] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D4A753]" /> Fast POS Terminal Connecting...
              </h2>
            </div>
            <div className="p-8 text-center space-y-4 bg-white">
              <div className="w-16 h-16 rounded-full bg-[#E6F4ED] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#0D7A53]" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1615]">Connection Established</h3>
              <p className="text-xs text-[#6E6A66] mb-4">Please complete the transaction on the physical terminal reader.</p>
              <button
                onClick={() => {
                  const newTx = {
                    id: `#ORD-${Math.floor(10000 + Math.random() * 90000)} (TERMINAL-SYNC)`,
                    guestName: 'Walk-in Customer',
                    avatar: 'WC',
                    tier: 'NON-MEMBER',
                    type: 'Terminal Sync Purchase',
                    items: 'Hardware Terminal Sync',
                    channel: 'POS-01 (Barista Counter)',
                    time: 'Just now',
                    amount: '$22.00',
                    stamps: '+2 Stamps',
                    status: 'Completed',
                  };
                  setTransactions([newTx, ...transactions]);
                  setFastPosModalOpen(false);
                  showToast('Terminal sync complete. Transaction recorded.');
                }}
                className="w-full py-2.5 bg-[#1A1615] hover:bg-black text-white rounded-lg text-sm font-bold shadow-sm transition-colors cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
