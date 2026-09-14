import React, { useState } from 'react';
import {
  Store,
  Users,
  Banknote,
  Activity,
  Radio,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronDown,
  Search,
  Download,
  Plus,
  MoreVertical,
  Sliders,
  Edit2,
  X,
  Printer,
  ShieldCheck,
  Coffee,
  Laptop,
  QrCode,
  Sparkles,
  Table as TableIcon,
  Map,
  Check
} from 'lucide-react';
import { NavRoute, OutletsData } from '../types';
import { INITIAL_OUTLETS } from '../data/outletsData';

interface BranchesPageProps {
  onNavigate?: (route: NavRoute) => void;
  onBranchSelect?: (branchName: string) => void;
  outlets?: OutletsData[];
  onAddBranch?: (branch: OutletsData) => void;
  selectedOutletId?: string;
  onSelectOutletId?: (id: string) => void;
}

export const BranchesPage: React.FC<BranchesPageProps> = ({
  onNavigate,
  onBranchSelect,
  outlets: externalOutlets,
  onAddBranch: externalOnAddBranch,
  selectedOutletId: externalSelectedOutletId,
  onSelectOutletId: externalOnSelectOutletId,
}) => {
  const [internalOutlets, setInternalOutlets] = useState<OutletsData[]>(INITIAL_OUTLETS);
  const outlets = externalOutlets || internalOutlets;
  const setOutlets = (newOutlets: OutletsData[]) => {
    setInternalOutlets(newOutlets);
  };

  const [internalSelectedOutletId, setInternalSelectedOutletId] = useState<string>('downtown');
  const selectedOutletId = externalSelectedOutletId || internalSelectedOutletId;
  const setSelectedOutletId = (id: string) => {
    if (externalOnSelectOutletId) {
      externalOnSelectOutletId(id);
    }
    setInternalSelectedOutletId(id);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All West Coast');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'revenue-desc' | 'revenue-asc' | 'name-asc' | 'name-desc'>('revenue-desc');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [inspectorVisible, setInspectorVisible] = useState(true);

  // New Branch Form state
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newManager, setNewManager] = useState('');

  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const selectedOutlet = outlets.find((o) => o.id === selectedOutletId) || outlets[0];

  const filteredOutlets = outlets.filter((outlet) => {
    const matchesSearch =
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.manager.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      regionFilter === 'All West Coast' ||
      outlet.address.toLowerCase().includes(regionFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && (outlet.type === 'Active' || outlet.type === 'Primary Hub')) ||
      outlet.type.toLowerCase().includes(statusFilter.toLowerCase());

    return matchesSearch && matchesRegion && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else {
      const parseRev = (rev: string) => parseFloat(rev.replace(/[^0-9.-]+/g, ''));
      const revA = parseRev(a.volume30d);
      const revB = parseRev(b.volume30d);
      return sortBy === 'revenue-desc' ? revB - revA : revA - revB;
    }
  });

  const handleSelectOutlet = (id: string, name: string) => {
    setSelectedOutletId(id);
    setInspectorVisible(true);
    if (onBranchSelect) {
      onBranchSelect(name);
    }
  };

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newBranch: OutletsData = {
      id: `branch-${Date.now()}`,
      name: newName,
      shortName: newName.split(' ')[0],
      type: 'Active',
      address: newAddress || '700 S Flower St, Los Angeles, CA 90017',
      manager: newManager || 'Alex Rivera',
      managerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      terminalsActive: 2,
      membersLinked: '1,200 Linked',
      volume30d: '$18,400',
      hours: 'Mon–Sat 7:00 AM – 7:00 PM',
      timezone: 'PST (America/Los_Angeles)',
      currency: 'USD ($)',
      taxProfile: 'CA State + LA City (9.5%)',
      hardware: [
        {
          name: 'Terminal 1 (Counter POS)',
          badge: 'Square',
          detail: 'Square Register v2.4 • Online, 1s ago',
          icon: 'register',
        },
        {
          name: 'Beacon #D1 (Entrance Stand)',
          badge: 'Revia Stand',
          detail: 'Smart Beacon #BB-04 • Online',
          icon: 'beacon',
        },
      ],
      loyaltyRules: {
        baseMultiplier: '1.0× (Standard)',
        specialRuleName: 'Welcome Month Bonus',
        specialRuleTime: 'All day during launch',
        specialRuleBadge: 'Active Now',
        specialMultiplier: '2.0× Double',
        exclusivePerk: 'Complimentary Single Origin upgrade',
      },
    };

    if (externalOnAddBranch) {
      externalOnAddBranch(newBranch);
    } else {
      setOutlets([...outlets, newBranch]);
    }
    setSelectedOutletId(newBranch.id);
    setIsAddModalOpen(false);
    setNewName('');
    setNewAddress('');
    setNewManager('');
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5 text-[#1A1615]">
      {/* Bottom Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1615] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-[#3D3732] animate-in slide-in-from-bottom-5 fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
            Branch &amp; Outlets Management
          </h1>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Export Ledger button */}
          <button
            onClick={() => showToast('Generating cryptographic ledger snapshot (CSV / PDF)...')}
            className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615] rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#5C554E]" />
            <span>Export Ledger</span>
          </button>

          {/* + Add New Branch button (warm gold) */}
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('/branches/new');
              } else {
                setIsAddModalOpen(true);
              }
            }}
            className="bg-[#B38637] hover:bg-[#A37837] text-white rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add New Branch</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: ACTIVE OUTLETS */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
              ACTIVE OUTLETS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] border border-[#E5D7BE] flex items-center justify-center text-[#B38637]">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1A1615] tracking-tight">{outlets.length}</span>
              <span className="text-sm font-medium text-[#7C746C]">Operating</span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#F5F2EC] flex items-center justify-between text-[11px]">
              <span className="text-[#7C746C] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B38637]" />
                1 in final setup
              </span>
              <span className="text-[#B38637] font-semibold">+1 planned Q3</span>
            </div>
          </div>
        </div>

        {/* Card 2: TOTAL DAILY FOOTFALL */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
              TOTAL DAILY FOOTFALL
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EBF7F0] border border-[#CEEBD9] flex items-center justify-center text-[#15803D]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#1A1615] tracking-tight">1,842</span>
              <span className="text-sm font-medium text-[#7C746C]">visits</span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#F5F2EC] flex items-center justify-between text-[11px]">
              <span className="bg-[#EBF7F0] text-[#15803D] font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                ↑ +14.2%
              </span>
              <span className="text-[#7C746C]">vs last 7 days</span>
            </div>
          </div>
        </div>

        {/* Card 3: NETWORK GROSS REVENUE */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
              NETWORK GROSS REVENUE
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] border border-[#E5D7BE] flex items-center justify-center text-[#B38637]">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-[#1A1615] tracking-tight">
              $184,920
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#F5F2EC] flex items-center justify-between text-[11px]">
              <span className="text-[#7C746C]">Avg. $61,640 / outlet</span>
              <span className="font-bold text-[#1A1615]">30D Window</span>
            </div>
          </div>
        </div>

        {/* Card 4: POS & SCANNER HEALTH */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
              POS &amp; SCANNER HEALTH
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EBF7F0] border border-[#CEEBD9] flex items-center justify-center text-[#15803D]">
              <Radio className="w-4 h-4 text-[#15803D]" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#15803D] tracking-tight">100%</span>
              <span className="text-sm font-medium text-[#7C746C]">Online</span>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#F5F2EC] flex items-center justify-between text-[11px]">
              <span className="text-[#7C746C] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                7/7 Terminals connected
              </span>
              <span className="text-[#15803D] font-medium">0 latency drops</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Controls Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C827A]" />
          <input
            type="text"
            placeholder="Filter outlets by name, city, or manager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-white border border-[#EAE6E1] rounded-lg text-xs text-[#1A1615] placeholder:text-[#8C827A] focus:outline-none focus:border-[#B38637] transition-colors shadow-2xs"
          />
        </div>

        {/* Right: Dropdowns and View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Region select */}
          <div className="relative">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="appearance-none bg-white border border-[#EAE6E1] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[#1A1615] shadow-2xs focus:outline-none cursor-pointer"
            >
              <option value="All West Coast">Region: All West Coast</option>
              <option value="Los Angeles">Region: Los Angeles</option>
              <option value="San Francisco">Region: San Francisco</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#8C827A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status select */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-[#EAE6E1] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[#1A1615] shadow-2xs focus:outline-none cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Active">Status: Active ({outlets.length})</option>
              <option value="Maintenance">Status: Maintenance</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#8C827A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-[#EAE6E1] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[#1A1615] shadow-2xs focus:outline-none cursor-pointer"
            >
              <option value="revenue-desc">Sort by: Revenue (High to Low)</option>
              <option value="revenue-asc">Sort by: Revenue (Low to High)</option>
              <option value="name-asc">Sort by: Name (A-Z)</option>
              <option value="name-desc">Sort by: Name (Z-A)</option>
            </select>
            <Sliders className="w-3 h-3 text-[#8C827A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-[#EAE6E1] bg-white rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'list'
                ? 'bg-[#FAF8F5] text-[#1A1615] font-semibold'
                : 'text-[#8C827A] hover:text-[#1A1615]'
                }`}
              title="List View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setViewMode('map');
                showToast('Interactive Map View: 3 Outlets mapped across Southern California.');
              }}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'map'
                ? 'bg-[#FAF8F5] text-[#1A1615] font-semibold'
                : 'text-[#8C827A] hover:text-[#1A1615]'
                }`}
              title="Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Configured Outlets + Velocity Chart (8 cols or 7 cols) */}
        <div className={`${inspectorVisible ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-1 gap-1.5 sm:gap-0">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Store className="w-4 h-4 text-[#B38637] shrink-0" />
              <h2 className="text-sm font-bold text-[#1A1615]">Configured Outlets</h2>
              <span className="bg-[#FAF8F5] text-[#7C746C] text-[10px] font-bold px-2 py-0.5 rounded border border-[#EAE6E1] whitespace-nowrap">
                {filteredOutlets.length} Visible
              </span>
            </div>
            <span className="text-[11px] text-[#8C827A]">
              Tap branch to inspect details
            </span>
          </div>

          {/* Branch Cards List */}
          <div className="space-y-3">
            {filteredOutlets.map((outlet) => {
              const isSelected = outlet.id === selectedOutletId;

              return (
                <div
                  key={outlet.id}
                  onClick={() => handleSelectOutlet(outlet.id, outlet.shortName)}
                  className={`bg-white border rounded-xl p-4 sm:p-5 transition-all cursor-pointer shadow-2xs ${isSelected
                    ? 'border-[#B38637] ring-1 ring-[#B38637]/30 shadow-xs'
                    : 'border-[#EAE6E1] hover:border-[#D4A753]'
                    }`}
                >
                  {/* Top Header of Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Left icon square */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${outlet.id === 'downtown'
                          ? 'bg-[#1A1615] text-[#D4A753]'
                          : outlet.id === 'northside'
                            ? 'bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615]'
                            : 'bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615]'
                          }`}
                      >
                        {outlet.id === 'westend' ? (
                          <Laptop className="w-5 h-5" />
                        ) : (
                          <Coffee className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-[#1A1615] truncate">
                            {outlet.name}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${outlet.type === 'Primary Hub'
                              ? 'bg-[#FAF6EE] text-[#9E782F] border border-[#E5D7BE]'
                              : 'bg-[#EBF7F0] text-[#15803D] border border-[#CEEBD9]'
                              }`}
                          >
                            {outlet.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#7C746C] flex items-center gap-1.5 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#8C827A] shrink-0" />
                          <span className="truncate">{outlet.address}</span>
                        </p>
                      </div>
                    </div>

                    {/* Top Right Action button */}
                    <div className="flex items-center gap-1 shrink-0">
                      {isSelected ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectOutlet(outlet.id, outlet.shortName);
                          }}
                          className="bg-[#B38637] hover:bg-[#A37837] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                        >
                          Inspect
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectOutlet(outlet.id, outlet.shortName);
                          }}
                          className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615] px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                        >
                          Manage
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Managing options for ${outlet.shortName}`);
                        }}
                        className="p-1 text-[#8C827A] hover:text-[#1A1615] rounded hover:bg-[#FAF8F5] cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 4 Stats Grid in Card */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3.5 border-t border-[#F5F2EC] text-xs">
                    {/* Manager */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C827A] block">
                        MANAGER
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <img
                          src={outlet.managerAvatar}
                          alt={outlet.manager}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-[#EAE6E1]"
                        />
                        <span className="font-semibold text-[#1A1615] truncate">
                          {outlet.manager}
                        </span>
                      </div>
                    </div>

                    {/* Terminals */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C827A] block">
                        TERMINALS
                      </span>
                      <div className="font-semibold text-[#1A1615] flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        <span>{outlet.terminalsActive} Active POS</span>
                      </div>
                    </div>

                    {/* Members */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C827A] block">
                        MEMBERS
                      </span>
                      <div className="font-semibold text-[#1A1615] mt-1">
                        {outlet.membersLinked}
                      </div>
                    </div>

                    {/* 30D Volume */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C827A] block">
                        30D VOLUME
                      </span>
                      <div className="font-bold text-[#B38637] font-mono mt-1">
                        {outlet.volume30d}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Card: MULTI-UNIT DISTRIBUTION / Realtime Footfall Velocity */}
          <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider block">
                  MULTI-UNIT DISTRIBUTION
                </span>
                <h3 className="text-base font-bold text-[#1A1615] mt-0.5">
                  Realtime Footfall Velocity
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#7C746C]">
                <span className="w-2 h-2 rounded-full bg-[#B38637] animate-pulse" />
                <span>Live Telemetry</span>
              </div>
            </div>

            {/* Timestamps Row */}
            <div className="flex justify-between text-[11px] font-mono text-[#7C746C] px-2 pt-2">
              <span>07:00 AM</span>
              <span className="text-[#B38637] font-bold">11:30 AM (Peak Rush)</span>
              <span>03:30 PM</span>
              <span>08:00 PM</span>
            </div>

            {/* Smooth Wave Area Chart */}
            <div className="h-32 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A753" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#D4A753" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path
                  d="M 0 100 Q 120 95, 180 60 T 260 25 T 340 70 T 450 15 T 550 50 L 600 100 L 600 120 L 0 120 Z"
                  fill="url(#goldGradient)"
                />
                {/* Stroke Line */}
                <path
                  d="M 0 100 Q 120 95, 180 60 T 260 25 T 340 70 T 450 15 T 550 50 L 600 100"
                  fill="none"
                  stroke="#A37837"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Peak Rush Marker Dot at 11:30 AM */}
                <circle cx="260" cy="25" r="4.5" fill="#A37837" stroke="#FFF" strokeWidth="2" />
              </svg>
            </div>

            {/* Legend at bottom */}
            <div className="pt-2 border-t border-[#F5F2EC] flex flex-wrap items-center gap-5 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B38637]" />
                <span className="text-[#5C554E]">Downtown: <strong>812 visits</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                <span className="text-[#5C554E]">Northside: <strong>620 visits</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3D3732]" />
                <span className="text-[#5C554E]">West End: <strong>410 visits</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: INSPECTING OUTLET Panel (5 cols) */}
        {inspectorVisible && selectedOutlet && (
          <div className="lg:col-span-5 bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs space-y-4 sticky top-16">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#F5F2EC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] border border-[#E5D7BE] flex items-center justify-center text-[#B38637]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider block">
                    INSPECTING OUTLET
                  </span>
                  <h3 className="text-base font-bold text-[#1A1615]">
                    {selectedOutlet.shortName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] text-xs font-semibold px-2.5 py-1.5 rounded-lg text-[#1A1615] flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3 h-3 text-[#5C554E]" />
                  <span>Edit Details</span>
                </button>
                <button
                  onClick={() => setInspectorVisible(false)}
                  className="p-1.5 text-[#8C827A] hover:text-[#1A1615] rounded-lg hover:bg-[#FAF8F5] cursor-pointer"
                  title="Close Inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Box 1: OPERATIONAL SNAPSHOT */}
            <div className="bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-4 space-y-3">
              <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider block">
                OPERATIONAL SNAPSHOT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8C827A] text-[11px] block">Hours</span>
                  <span className="font-semibold text-[#1A1615] mt-0.5 block leading-tight">
                    {selectedOutlet.hours}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C827A] text-[11px] block">Timezone</span>
                  <span className="font-semibold text-[#1A1615] mt-0.5 block leading-tight truncate">
                    {selectedOutlet.timezone}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C827A] text-[11px] block">Primary Currency</span>
                  <span className="font-semibold text-[#1A1615] mt-0.5 block">
                    {selectedOutlet.currency}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C827A] text-[11px] block">Tax Profile</span>
                  <span className="font-semibold text-[#1A1615] mt-0.5 block leading-tight">
                    {selectedOutlet.taxProfile}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: HARDWARE & DYNAMIC BEACONS (3) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
                  HARDWARE &amp; DYNAMIC BEACONS ({selectedOutlet.hardware.length})
                </span>
                <span className="text-[11px] text-[#15803D] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  All Healthy
                </span>
              </div>

              <div className="space-y-2">
                {selectedOutlet.hardware.map((hw, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-[#EAE6E1] rounded-xl flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1] flex items-center justify-center text-[#B38637] shrink-0">
                        {hw.icon === 'beacon' ? (
                          <QrCode className="w-4 h-4" />
                        ) : hw.icon === 'pos' ? (
                          <Laptop className="w-4 h-4" />
                        ) : (
                          <Coffee className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1A1615] truncate">
                            {hw.name}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${hw.badge === 'Square'
                              ? 'bg-[#EBF7F0] text-[#15803D]'
                              : hw.badge === 'Clover'
                                ? 'bg-neutral-100 text-neutral-700'
                                : 'bg-[#FAF6EE] text-[#9E782F]'
                              }`}
                          >
                            {hw.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7C746C] truncate mt-0.5">
                          {hw.detail}
                        </p>
                      </div>
                    </div>

                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: LOCALIZED LOYALTY RULES */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider block">
                LOCALIZED LOYALTY RULES
              </span>

              <div className="space-y-2 text-xs">
                {/* Row 1 */}
                <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-[#1A1615]">Base Stamp Multiplier</div>
                    <div className="text-[10px] text-[#7C746C] mt-0.5">
                      Applied to all orders at this register node
                    </div>
                  </div>
                  <div className="bg-white border border-[#EAE6E1] px-2.5 py-1 rounded-lg text-xs font-bold text-[#1A1615] shrink-0 shadow-2xs">
                    {selectedOutlet.loyaltyRules.baseMultiplier}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-[#1A1615]">
                      {selectedOutlet.loyaltyRules.specialRuleName}
                    </div>
                    <div className="text-[10px] text-[#7C746C] mt-0.5">
                      {selectedOutlet.loyaltyRules.specialRuleTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="bg-[#EBF7F0] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded">
                      {selectedOutlet.loyaltyRules.specialRuleBadge}
                    </span>
                    <span className="bg-[#CEEBD9] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded">
                      {selectedOutlet.loyaltyRules.specialMultiplier}
                    </span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-[#1A1615]">Exclusive Branch Perk</div>
                    <div className="text-[10px] text-[#7C746C] italic mt-0.5">
                      &quot;{selectedOutlet.loyaltyRules.exclusivePerk}&quot;
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-[#B38637] shrink-0" />
                </div>
              </div>
            </div>

            {/* Bottom Button: Generate QR Stand Pack */}
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/qr-codes');
                } else {
                  showToast(`Downloading Printable QR Stands Pack for ${selectedOutlet.shortName}...`);
                }
              }}
              className="w-full mt-2 bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#7C746C]" />
              <span>Generate QR Stand Pack</span>
            </button>
          </div>
        )}
      </div>

      {/* Add New Branch Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1A1615]">Deploy New Outlet Node</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#8C827A] hover:text-[#1A1615] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddBranch} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-[#7C746C] block mb-1">
                  Outlet Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arts District Roastery"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#7C746C] block mb-1">
                  Physical Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 742 S Santa Fe Ave, Los Angeles, CA"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#7C746C] block mb-1">
                  Assigned Store Manager
                </label>
                <input
                  type="text"
                  placeholder="e.g. Liam Thorn"
                  value={newManager}
                  onChange={(e) => setNewManager(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EAE6E1]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#7C746C] hover:bg-[#FAF8F5] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#B38637] text-white rounded-lg hover:bg-[#A37837] cursor-pointer"
                >
                  Provision Outlet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}
      {isEditModalOpen && selectedOutlet && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1A1615]">
                Edit {selectedOutlet.shortName} Details
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#8C827A] hover:text-[#1A1615] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#7C746C] block mb-1">
                  Operating Window
                </label>
                <input
                  type="text"
                  defaultValue={selectedOutlet.hours}
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#7C746C] block mb-1">
                  Assigned Store Manager
                </label>
                <input
                  type="text"
                  defaultValue={selectedOutlet.manager}
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#7C746C] block mb-1">
                  Tax Profile
                </label>
                <input
                  type="text"
                  defaultValue={selectedOutlet.taxProfile}
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EAE6E1]">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#7C746C] hover:bg-[#FAF8F5] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    showToast('Branch details updated successfully.');
                  }}
                  className="px-4 py-1.5 text-xs font-semibold bg-[#B38637] text-white rounded-lg hover:bg-[#A37837] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
