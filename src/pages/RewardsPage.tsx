import React, { useState } from 'react';
import {
  Download,
  Plus,
  Search,
  ChevronDown,
  Clock,
  QrCode,
  Edit2,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  CreditCard,
  Settings,
  Lock,
  Wallet,
  Calendar,
  MoreVertical,
  Activity,
  ChevronRight,
  Target,
  Trophy
} from 'lucide-react';

export const RewardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Rewards (18)');
  const [dynamicQR, setDynamicQR] = useState(true);
  const [pinOverride, setPinOverride] = useState(true);

  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('Status: Active');

  const [availabilityWindow, setAvailabilityWindow] = useState('60 Days');
  const [selectedMatrixTier, setSelectedMatrixTier] = useState<string | null>(null);

  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [deletedCards, setDeletedCards] = useState<string[]>([]);

  const [newVoucherTitle, setNewVoucherTitle] = useState('');
  const [newVoucherCost, setNewVoucherCost] = useState('4 Stamps');
  const [newVoucherTier, setNewVoucherTier] = useState('Silver & Up');
  const [newCards, setNewCards] = useState<any[]>([]);

  const isVisible = (id: string, title: string, tier: string[], category: string, status: string, tabs: string[]) => {
    if (deletedCards.includes(id)) return false;
    if (activeTab !== 'All Rewards (18)' && !tabs.includes(activeTab)) return false;
    if (tierFilter !== 'All Tiers' && !tier.includes(tierFilter)) return false;
    if (categoryFilter !== 'All Categories' && category !== categoryFilter) return false;
    if (statusFilter !== 'Status: Active' && `Status: ${status}` !== statusFilter) return false;
    if (searchQuery && !title.toLowerCase().includes(searchQuery.toLowerCase()) && !id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  };

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {feedbackToast && (
        <div className="fixed bottom-4 right-4 bg-[#1A1615] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-[#0D7A53]/20 flex items-center justify-center text-[#0D7A53]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">{feedbackToast}</p>
          </div>
        </div>
      )}
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          {/* <div className="flex items-center gap-2 text-xs font-bold text-[#9E9A93] mb-2 uppercase tracking-wider">
            Home <ChevronRight className="w-3 h-3" /> CRM & Activity <ChevronRight className="w-3 h-3" /> <span className="text-[#1A1615]">Rewards Catalog & Perks</span>
          </div> */}

          {/* <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-[#FDF8EB] text-[#9E782F] text-[10px] font-bold uppercase tracking-widest rounded">
              ATELIER LOYALTY ARCHITECTURE
            </span>
            <span className="text-[#9E9A93] text-[10px] font-bold uppercase tracking-widest">• Engine v4.2</span>
          </div> */}

          <h1 className="text-[28px] font-bold tracking-tight text-[#1A1615] leading-tight">
            Rewards Catalog & Tier Perks Manager
          </h1>
          <p className="text-sm text-[#6E6A66] mt-1 font-medium">
            Configure redeemable guest vouchers, tier exclusivity thresholds, perk fulfillment rules, and digital wallet redemption limits for Revia hospitality venues.
          </p>
        </div>

        <div className="flex flex-col items-end gap-4 shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1A1615]">
            {/* <span className="w-2 h-2 rounded-full bg-[#0D7A53] animate-pulse"></span>
            REALTIME WALLET SYNC: ACTIVE */}
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EAE6E1] text-[#1A1615] text-xs font-bold rounded-lg shadow-xs hover:bg-[#FAF8F5] transition-colors cursor-pointer">
              <Download className="w-4 h-4" /> Export Matrix (CSV)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white text-xs font-bold rounded-lg shadow-xs hover:opacity-95 transition-opacity cursor-pointer">
              <Plus className="w-4 h-4 text-white" /> Create New Reward
            </button>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">ACTIVE REWARD<br />CATALOG</h3>
            <span className="bg-[#FDF8EB] text-[#9E782F] text-[9px] font-bold uppercase px-2 py-1 rounded">Across 4<br />Tiers</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-[32px] font-bold text-[#1A1615] leading-none">18</span>
            <span className="text-[14px] font-bold text-[#D4A753]">Live Perks</span>
          </div>
          <div className="text-[11px] font-bold text-[#6E6A66] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#D4A753]" /> 6 auto-replenishing, 12 static
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">30-DAY REDEMPTIONS</h3>
            <span className="bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full">+18.4%</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[28px] font-bold text-[#1A1615] leading-none">1,420</span>
              <span className="text-[13px] font-bold text-[#6E6A66]">Vouchers</span>
            </div>
            <span className="text-[14px] font-bold text-[#0D7A53]">$14,850</span>
          </div>
          <div className="flex justify-between items-center text-[11px] font-bold text-[#9E9A93]">
            <span>Total redeemed</span>
            <span></span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">HIGHEST VELOCITY</h3>
            <span className="bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] text-[10px] font-bold px-2 py-0.5 rounded">412 claimed</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] font-bold text-[#1A1615]">Specialty Flight</span>
            <span className="text-[11px] font-bold text-[#D4A753]">Gold/Obsidian</span>
          </div>
          <div className="text-[11px] font-bold text-[#6E6A66] flex items-center gap-1.5 mt-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A53]" /> 98.2% positive rating
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">LIABILITY / ESCROW</h3>
            <span className="bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full">Sealed</span>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[28px] font-bold text-[#1A1615] leading-none">$4,120</span>
              <span className="text-[13px] font-bold text-[#6E6A66]">Escrow</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] font-bold text-[#9E9A93]">
            <span>Avg cost / unlock</span>
            <span className="text-[#1A1615]">$2.90</span>
          </div>
        </div>
      </div>

      {/* Filters & Navigation */}
      <div className="flex flex-col gap-4">
        {/* Tabs Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EFECE6] pb-1">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All Rewards (18)', 'Vouchers & Items (10)', 'VIP & Tier Perks (5)', 'Flash & Happy Hour (3)', 'Archived'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-t-lg transition-colors cursor-pointer ${activeTab === tab
                  ? 'bg-[#1A1615] text-white'
                  : 'bg-[#FAF8F5] text-[#6E6A66] hover:bg-[#EFECE6]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold bg-[#FAF8F5] border border-[#EFECE6] px-3 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#D4A753]" />
            <span className="text-[#1A1615]">Velocity:</span>
            <span className="text-[#6E6A66]">47 today</span>
            <span className="w-1 h-1 rounded-full bg-[#D1CDC7] mx-1"></span>
            <span className="text-[#6E6A66]">Peak: 8:00 - 10:30 AM</span>
          </div>
        </div>

        {/* Search & Select Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rewards, perks, SKU..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#EFECE6] rounded-full text-xs font-bold text-[#1A1615] placeholder:text-[#9E9A93] focus:outline-none focus:border-[#D4A753]"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="relative">
              <select
                value={tierFilter}
                onChange={(e) => { setTierFilter(e.target.value); showToast(`Filter applied: ${e.target.value}`); }}
                className="appearance-none bg-white border border-[#EFECE6] rounded-full pl-4 pr-8 py-2 text-xs font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] min-w-[240px] cursor-pointer"
              >
                <option value="All Tiers">All Tiers (Silver, Gold, Black, Obsidian)</option>
                <option value="Silver Tier">Silver Tier</option>
                <option value="Gold Tier">Gold Tier</option>
                <option value="Black Tier">Black Tier</option>
                <option value="Obsidian VIP">Obsidian VIP</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); showToast(`Category selected: ${e.target.value}`); }}
                className="appearance-none bg-white border border-[#EFECE6] rounded-full pl-4 pr-8 py-2 text-xs font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] min-w-[140px] cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Beverages">Beverages</option>
                <option value="Pastries">Pastries</option>
                <option value="Merchandise">Merchandise</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); showToast(`Status filter: ${e.target.value}`); }}
                className="appearance-none bg-white border border-[#EFECE6] rounded-full pl-4 pr-8 py-2 text-xs font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] min-w-[120px] cursor-pointer"
              >
                <option value="Status: Active">Status: Active</option>
                <option value="Status: Draft">Status: Draft</option>
                <option value="Status: Paused">Status: Paused</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Left Column - Reward List */}
        <div className="xl:col-span-8 space-y-4">

          {/* Dynamically created cards */}
          {newCards.filter(c => isVisible(c.id, c.title, [c.tier], 'Beverages', 'Active', ['Vouchers & Items (10)', 'All Rewards (18)'])).map(card => (
            <div key={card.id} className="bg-white border border-[#EFECE6] rounded-xl p-4 flex flex-col md:flex-row gap-5 shadow-sm hover:border-[#D1CDC7] transition-colors group">
              <div className="w-full md:w-[160px] h-[120px] rounded-lg relative overflow-hidden shrink-0 bg-[#FAF8F5] flex items-center justify-center border border-[#EFECE6]">
                <div className="absolute top-2 left-2 bg-[#1A1615]/80 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20 z-10">{card.id}</div>
                <div className="w-10 h-10 rounded bg-[#FDF8EB] flex items-center justify-center border border-[#F3E5C8]">
                  <Zap className="w-5 h-5 text-[#9E782F]" />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] text-[10px] font-bold px-2 py-0.5 rounded-full">{card.tier}</span>
                    <span className="bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#BCE3D1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Active
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#D4A753]">{card.cost}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1A1615] mb-1">{card.title}</h3>
                <p className="text-xs text-[#6E6A66] mb-3 leading-relaxed">Newly created custom voucher reward.</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#9E9A93] bg-[#FAF8F5] px-3 py-2 rounded-lg mb-3 border border-[#EFECE6]">
                  <span>Availability: <strong className="text-[#1A1615]">{card.availability}</strong></span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6E6A66]">
                    <Clock className="w-3.5 h-3.5" /> Just Added
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => showToast('QR Preview generated')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] text-[11px] font-bold rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer"><QrCode className="w-3 h-3" /> QR Preview</button>
                    <button onClick={() => { setNewVoucherTitle(card.title); showToast('Edit mode enabled') }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5] hover:text-[#1A1615] transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeletedCards([...deletedCards, card.id])} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FCA5A5] transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Card 1 */}
          {isVisible('#REV-041', 'Complimentary Specialty Flight & Pastry', ['Gold Tier', 'Black Tier'], 'Beverages', 'Active', ['VIP & Tier Perks (5)', 'All Rewards (18)']) && (
            <div className="bg-white border border-[#EFECE6] rounded-xl p-4 flex flex-col md:flex-row gap-5 shadow-sm hover:border-[#D1CDC7] transition-colors group">
              <div className="w-full md:w-[160px] h-[120px] rounded-lg relative overflow-hidden shrink-0 bg-[#1A1615] flex items-center justify-center">
                <div className="absolute top-2 left-2 bg-[#1A1615]/80 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20">#REV-041</div>
                <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=300" alt="Specialty Flight" className="w-full h-full object-cover opacity-80" />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FDF8EB] text-[#9E782F] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F3E5C8]">Gold & Black Tier</span>
                    <span className="bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#BCE3D1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Active
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#D4A753]">10 Stamps <span className="text-[#9E9A93] font-medium text-xs">or 500 Pts</span></div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1615] mb-1">Complimentary Specialty Flight & Pastry</h3>
                <p className="text-xs text-[#6E6A66] mb-3 leading-relaxed">
                  Signature three-origin pour-over tasting flight paired with any morning bake from...
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#9E9A93] bg-[#FAF8F5] px-3 py-2 rounded-lg mb-3 border border-[#EFECE6]">
                  <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#D4A753]" /> Velocity: <strong className="text-[#1A1615]">412 (Hot)</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Venues: <strong className="text-[#1A1615]">All 3 Venues</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Guest Limit: <strong className="text-[#1A1615]">1 / day</strong></span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6E6A66]">
                    <Clock className="w-3.5 h-3.5" /> 30 Days expiry
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => showToast('QR Preview generated')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] text-[11px] font-bold rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer">
                      <QrCode className="w-3 h-3" /> QR Preview
                    </button>
                    <button onClick={() => { setNewVoucherTitle('Complimentary Specialty Flight & Pastry'); showToast('Edit mode enabled') }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5] hover:text-[#1A1615] transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeletedCards([...deletedCards, '#REV-041'])} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FCA5A5] transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 2 */}
          {isVisible('#REV-108', '$10 Off Any Roasted Bean Bag (250g)', ['Silver Tier', 'Gold Tier', 'Black Tier', 'Obsidian VIP'], 'Merchandise', 'Active', ['Vouchers & Items (10)', 'All Rewards (18)']) && (
            <div className="bg-white border border-[#EFECE6] rounded-xl p-4 flex flex-col md:flex-row gap-5 shadow-sm hover:border-[#D1CDC7] transition-colors group">
              <div className="w-full md:w-[160px] h-[120px] rounded-lg relative overflow-hidden shrink-0 bg-[#FAF8F5] flex items-center justify-center border border-[#EFECE6]">
                <div className="absolute top-2 left-2 bg-[#1A1615]/80 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20 z-10">#REV-108</div>
                <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=300" alt="Bean Bag" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] text-[10px] font-bold px-2 py-0.5 rounded-full">All Tiers (Silver+)</span>
                    <span className="bg-[#E0F9ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#BCE3D1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Auto-Replenish
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#D4A753]">8 Stamps <span className="text-[#9E9A93] font-medium text-xs">or 400 Pts</span></div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1615] mb-1">$10 Off Any Roasted Bean Bag (250g)</h3>
                <p className="text-xs text-[#6E6A66] mb-3 leading-relaxed">
                  Single-Origin Micro-lots or Reserve Geisha. In-store POS barcode scan or pre-order.
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#9E9A93] bg-[#FAF8F5] px-3 py-2 rounded-lg mb-3 border border-[#EFECE6]">
                  <span>Redemptions: <strong className="text-[#1A1615]">289</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Channel: <strong className="text-[#1A1615]">POS & Mobile</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Inventory: <strong className="text-[#1A1615]">Auto-Deducted</strong></span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6E6A66]">
                    <Calendar className="w-3.5 h-3.5" /> Continuous Season
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => showToast('QR Preview generated')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] text-[11px] font-bold rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer">
                      <QrCode className="w-3 h-3" /> QR Preview
                    </button>
                    <button onClick={() => { setNewVoucherTitle('$10 Off Any Roasted Bean Bag (250g)'); showToast('Edit mode enabled') }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5] hover:text-[#1A1615] transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeletedCards([...deletedCards, '#REV-108'])} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FCA5A5] transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3 - VIP */}
          {isVisible('#VIP-001', 'Revia Obsidian Private Tasting Tour', ['Obsidian VIP'], 'Beverages', 'Active', ['VIP & Tier Perks (5)', 'All Rewards (18)']) && (
            <div className="bg-white border border-[#EFECE6] rounded-xl p-4 flex flex-col md:flex-row gap-5 shadow-sm hover:border-[#D1CDC7] transition-colors group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#1A1615]"></div>
              <div className="w-full md:w-[160px] h-[120px] rounded-lg relative overflow-hidden shrink-0 bg-[#1A1615] flex items-center justify-center">
                <div className="absolute top-2 left-2 bg-[#1A1615]/90 backdrop-blur-md text-[#D4A753] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#D4A753]/30 z-10">VIP EXCLUSIVE</div>
                <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300" alt="VIP Tour" className="w-full h-full object-cover opacity-70" />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1A1615] text-[#D4A753] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#332e2d]">Obsidian VIP Exclusive</span>
                    <span className="bg-[#FDF8EB] text-[#9E782F] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F3E5C8]">Milestone Unlock</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#D4A753]">Zero Pts</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1615] mb-1">Revia Obsidian Private Tasting Tour</h3>
                <p className="text-xs text-[#6E6A66] mb-3 leading-relaxed">
                  Private after-hours cupping and sensory flight led by Head of Roasting.
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#9E9A93] bg-[#FAF8F5] px-3 py-2 rounded-lg mb-3 border border-[#EFECE6]">
                  <span>Quota: <strong className="text-[#1A1615]">4 Guests / Session</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Days: <strong className="text-[#1A1615]">Fri & Sat Only</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Claimed: <strong className="text-[#D4A753]">18 (8 Left)</strong></span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4A753]">
                    <Trophy className="w-3.5 h-3.5" /> Concierge RSVP Required
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => showToast('Slot Manager opened')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1615] text-[#D4A753] border border-[#332e2d] text-[11px] font-bold rounded-lg hover:bg-black transition-colors cursor-pointer">
                      <Calendar className="w-3 h-3" /> Manage Slots
                    </button>
                    <button onClick={() => { setNewVoucherTitle('Revia Obsidian Private Tasting Tour'); showToast('Edit mode enabled') }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5] hover:text-[#1A1615] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeletedCards([...deletedCards, '#VIP-001'])} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FCA5A5] transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 4 */}
          {isVisible('#REV-012', 'Artisanal Single-Origin Pour-Over Upgrade', ['Silver Tier', 'Gold Tier', 'Black Tier', 'Obsidian VIP'], 'Beverages', 'Active', ['Vouchers & Items (10)', 'All Rewards (18)']) && (
            <div className="bg-white border border-[#EFECE6] rounded-xl p-4 flex flex-col md:flex-row gap-5 shadow-sm hover:border-[#D1CDC7] transition-colors group">
              <div className="w-full md:w-[160px] h-[120px] rounded-lg relative overflow-hidden shrink-0 bg-[#FAF8F5] flex items-center justify-center border border-[#EFECE6]">
                <div className="absolute top-2 left-2 bg-[#1A1615]/80 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20 z-10">#REV-012</div>
                <div className="w-10 h-10 rounded bg-[#FDF8EB] flex items-center justify-center border border-[#F3E5C8]">
                  <svg className="w-5 h-5 text-[#9E782F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /></svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] text-[10px] font-bold px-2 py-0.5 rounded-full">Silver Tier & Above</span>
                    <span className="bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#BCE3D1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Active
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#D4A753]">4 Stamps <span className="text-[#9E9A93] font-medium text-xs">or 150 Pts</span></div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1615] mb-1">Artisanal Single-Origin Pour-Over Upgrade</h3>
                <p className="text-xs text-[#6E6A66] mb-3 leading-relaxed">
                  Upgrade any standard drip brew or Americano to rotating single-origin bar brew.
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#9E9A93] bg-[#FAF8F5] px-3 py-2 rounded-lg mb-3 border border-[#EFECE6]">
                  <span>Daily Velocity: <strong className="text-[#1A1615]">654</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Venues: <strong className="text-[#1A1615]">Downtown & Roastery</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Sync: <strong className="text-[#0D7A53]">Instant</strong></span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6E6A66]">
                    <Activity className="w-3.5 h-3.5" /> Recurring Weekly
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => showToast('QR Preview generated')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] text-[11px] font-bold rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer">
                      <QrCode className="w-3 h-3" /> QR Preview
                    </button>
                    <button onClick={() => { setNewVoucherTitle('Artisanal Single-Origin Pour-Over Upgrade'); showToast('Edit mode enabled') }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5] hover:text-[#1A1615] transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeletedCards([...deletedCards, '#REV-012'])} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FCA5A5] transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 5 */}
          {isVisible('#REV-077', 'Reserve Cold Brew Growler Refill (50% Off)', ['Gold Tier', 'Black Tier', 'Obsidian VIP'], 'Beverages', 'Active', ['Flash & Happy Hour (3)', 'All Rewards (18)']) && (
            <div className="bg-white border border-[#EFECE6] rounded-xl p-4 flex flex-col md:flex-row gap-5 shadow-sm hover:border-[#D1CDC7] transition-colors group">
              <div className="w-full md:w-[160px] h-[120px] rounded-lg relative overflow-hidden shrink-0 bg-[#FAF8F5] flex items-center justify-center border border-[#EFECE6]">
                <div className="absolute top-2 left-2 bg-[#1A1615]/80 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-white/20 z-10">#REV-077</div>
                <div className="w-10 h-10 rounded bg-[#FDF8EB] flex items-center justify-center border border-[#F3E5C8]">
                  <svg className="w-4 h-5 text-[#9E782F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M8 6h8" /><path d="M7 6v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6" /></svg>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FDF8EB] border border-[#F3E5C8] text-[#9E782F] text-[10px] font-bold px-2 py-0.5 rounded-full">Gold Exclusive</span>
                    <span className="bg-[#E6F4ED] text-[#0D7A53] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#BCE3D1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Active
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-bold text-[#D4A753]">6 Stamps</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1615] mb-1">Reserve Cold Brew Growler Refill (50% Off)</h3>
                <p className="text-xs text-[#6E6A66] mb-3 leading-relaxed">
                  Valid for 32oz or 64oz amber glass growler refilled with nitrogen-infused Kyoto style...
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#9E9A93] bg-[#FAF8F5] px-3 py-2 rounded-lg mb-3 border border-[#EFECE6]">
                  <span>Redemptions: <strong className="text-[#1A1615]">142</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Venues: <strong className="text-[#1A1615]">All 3 Venues</strong></span>
                  <span className="w-1 h-1 rounded-full bg-[#D1CDC7]"></span>
                  <span>Type: <strong className="text-[#1A1615]">Direct Discount</strong></span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#6E6A66]">
                    <Clock className="w-3.5 h-3.5" /> Weekend Refresh
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => showToast('QR Preview generated')} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] text-[11px] font-bold rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer">
                      <QrCode className="w-3 h-3" /> QR Preview
                    </button>
                    <button onClick={() => { setNewVoucherTitle('Reserve Cold Brew Growler Refill (50% Off)'); showToast('Edit mode enabled') }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5] hover:text-[#1A1615] transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setDeletedCards([...deletedCards, '#REV-077'])} className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#FCA5A5] transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Side Panels */}
        <div className="xl:col-span-4 space-y-6">

          {/* Tier Privilege Matrix */}
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#1A1615] flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#D4A753]" /> Tier Privilege Matrix
              </h3>
              <button className="text-[10px] font-bold text-[#D4A753] uppercase tracking-wider hover:text-[#9E782F] transition-colors cursor-pointer">
                Reconfigure
              </button>
            </div>
            <p className="text-[11px] text-[#6E6A66] mb-5 font-medium">
              Autonomous milestones unlocked on digital wallet passes.
            </p>

            <div className="space-y-4">
              {/* Silver */}
              <div onClick={() => setSelectedMatrixTier('Silver')} className={`border rounded-lg p-3 shadow-sm cursor-pointer transition-all ${selectedMatrixTier === 'Silver' ? 'bg-[#FDF8EB] border-[#D4A753]' : 'bg-white border-[#EFECE6] hover:border-[#D1CDC7]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D1CDC7]"></span>
                    <span className="text-xs font-bold text-[#1A1615]">Silver Tier</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#9E9A93] uppercase tracking-widest">Entry Level</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#6E6A66] font-medium ml-4">
                  <li>Free welcome espresso or batch brew</li>
                  <li>Birthday double stamps celebration</li>
                </ul>
              </div>

              {/* Gold */}
              <div onClick={() => setSelectedMatrixTier('Gold')} className={`border rounded-lg p-3 shadow-sm cursor-pointer transition-all ${selectedMatrixTier === 'Gold' ? 'bg-[#FDF8EB] border-[#D4A753]' : 'bg-white border-[#EFECE6] hover:border-[#D1CDC7]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span>
                    <span className="text-xs font-bold text-[#1A1615]">Gold Tier</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#9E782F] uppercase tracking-widest">5+ Visits / mo</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#9E782F] font-medium ml-4">
                  <li>10% off bagged beans & merch</li>
                  <li>Priority mobile pickup lane routing</li>
                </ul>
              </div>

              {/* Black */}
              <div onClick={() => setSelectedMatrixTier('Black')} className={`border rounded-lg p-3 shadow-sm cursor-pointer transition-all ${selectedMatrixTier === 'Black' ? 'bg-[#FDF8EB] border-[#D4A753]' : 'bg-white border-[#EFECE6] hover:border-[#D1CDC7]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A1615]"></span>
                    <span className="text-xs font-bold text-[#1A1615]">Black Tier</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#1A1615] uppercase tracking-widest">15+ Visits / mo</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#6E6A66] font-medium ml-4">
                  <li>Complimentary monthly tasting flight</li>
                  <li>Downtown Flagship table reservations</li>
                </ul>
              </div>

              {/* Obsidian */}
              <div onClick={() => setSelectedMatrixTier('Obsidian')} className={`border rounded-lg p-3 shadow-sm relative overflow-hidden cursor-pointer transition-all ${selectedMatrixTier === 'Obsidian' ? 'bg-[#1A1615] border-[#D4A753]' : 'bg-[#1A1615] border-[#332e2d] hover:border-[#4a4342]'}`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#D4A753]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span>
                    <span className="text-xs font-bold text-[#D4A753]">Obsidian VIP</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#D4A753] uppercase tracking-widest">$2.5K / Invite</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#D1CDC7] font-medium ml-4 relative z-10">
                  <li>Private cupping with Master Roaster</li>
                  <li>Bespoke digital concierge VIP pass</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Redemption Security */}
          <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#1A1615] flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-[#0D7A53]" /> Redemption Security
            </h3>
            <p className="text-[11px] text-[#6E6A66] mb-5 font-medium">
              Active fraud mitigation across terminal endpoints.
            </p>

            <div className="space-y-4 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1A1615]">Dynamic QR Rotation</div>
                  <div className="text-[10px] text-[#9E9A93]">Rotates hash every 45s to block screenshots.</div>
                </div>
                <button
                  onClick={() => setDynamicQR(!dynamicQR)}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${dynamicQR ? 'bg-[#0D7A53]' : 'bg-[#D1CDC7]'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${dynamicQR ? 'left-4.5' : 'left-0.5'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1A1615]">PIN Override ({'>'}$25)</div>
                  <div className="text-[10px] text-[#9E9A93]">Supervisor PIN required for rare lots.</div>
                </div>
                <button
                  onClick={() => setPinOverride(!pinOverride)}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${pinOverride ? 'bg-[#0D7A53]' : 'bg-[#D1CDC7]'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${pinOverride ? 'left-4.5' : 'left-0.5'}`}></span>
                </button>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#D4A753]" />
                <div>
                  <div className="text-[11px] font-bold text-[#1A1615]">Apple & Google Wallet</div>
                  <div className="text-[10px] text-[#9E9A93]">Sync badge instant</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0D7A53]">99.98% Live</span>
            </div>
          </div>

          {/* Quick Create Voucher */}
          <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#1A1615] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#D4A753]" /> Quick Create Voucher
              </h3>
              <span className="text-[10px] font-bold text-[#9E782F] bg-[#FDF8EB] px-2 py-0.5 rounded border border-[#F3E5C8]">Fast Wizard</span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1.5">Perk Title</label>
                <input
                  type="text"
                  value={newVoucherTitle}
                  onChange={(e) => setNewVoucherTitle(e.target.value)}
                  placeholder="e.g. Cascara Fizz Voucher"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1.5">Cost</label>
                  <div className="relative">
                    <select value={newVoucherCost} onChange={(e) => setNewVoucherCost(e.target.value)} className="w-full appearance-none px-3 py-2 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] cursor-pointer">
                      <option>4 Stamps</option>
                      <option>10 Stamps</option>
                      <option>Zero Pts</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9A93] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1.5">Tier</label>
                  <div className="relative">
                    <select value={newVoucherTier} onChange={(e) => setNewVoucherTier(e.target.value)} className="w-full appearance-none px-3 py-2 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-xs font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] cursor-pointer">
                      <option>Silver Tier</option>
                      <option>Gold Tier</option>
                      <option>Black Tier</option>
                      <option>Obsidian VIP</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9A93] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-2">Availability Window</label>
                <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1">
                  <button onClick={() => setAvailabilityWindow('30 Days')} className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-colors cursor-pointer ${availabilityWindow === '30 Days' ? 'text-[#1A1615] bg-white shadow-sm border border-[#EFECE6]' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>30 Days</button>
                  <button onClick={() => setAvailabilityWindow('60 Days')} className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-colors cursor-pointer ${availabilityWindow === '60 Days' ? 'text-[#1A1615] bg-white shadow-sm border border-[#EFECE6]' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>60 Days</button>
                  <button onClick={() => setAvailabilityWindow('Permanent')} className={`flex-1 py-1.5 text-[11px] font-bold rounded transition-colors cursor-pointer ${availabilityWindow === 'Permanent' ? 'text-[#1A1615] bg-white shadow-sm border border-[#EFECE6]' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>Permanent</button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!newVoucherTitle) { showToast('Please enter a Perk Title'); return; }
                const newId = `#REV-${Date.now().toString().slice(-3)}`;
                setNewCards([{ id: newId, title: newVoucherTitle, cost: newVoucherCost, tier: newVoucherTier, availability: availabilityWindow }, ...newCards]);
                setNewVoucherTitle('');
                showToast('Voucher created and deployed to wallet!');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white rounded-lg text-xs font-bold shadow-md hover:opacity-95 transition-opacity border border-[#9E782F] cursor-pointer"
            >
              <ArrowUpFromWalletIcon className="w-4 h-4" /> Save & Deploy to Wallet
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

function ArrowUpFromWalletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.5" />
      <path d="M7 15h0" />
      <path d="M7 11h0" />
      <path d="M16 22v-6" />
      <path d="m13 19 3-3 3 3" />
    </svg>
  );
}