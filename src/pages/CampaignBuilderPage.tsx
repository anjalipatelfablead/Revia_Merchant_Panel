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
  BellRing,
  Bookmark,
  ChevronRight
} from 'lucide-react';

export const CampaignBuilderPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCampaignType, setSelectedCampaignType] = useState<string>('Loyalty Boost');
  const [isAddLocationOpen, setIsAddLocationOpen] = useState<boolean>(false);

  // Step 1 – Basics state
  const [campaignName, setCampaignName] = useState('');
  const [topLevelType, setTopLevelType] = useState<'new_customer' | 'existing_customer' | 'happy_hours' | ''>('');
  const [existingSubType, setExistingSubType] = useState<'existing_visit' | 'existing_billing' | 'existing_stamp' | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusDraft, setStatusDraft] = useState(true);

  const [viewMode, setViewMode] = useState<'dashboard' | 'builder'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [expandedCampaignId, setExpandedCampaignId] = useState<number | null>(null);

  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Autumn Reserve Tasting', type: 'Welcome Campaign', status: 'Active', target: 'VIP', startDate: 'Nov 1, 2024', endDate: 'Nov 30, 2024', progress: 85, reward: 'Free Geisha Pour Over' },
    { id: 2, name: 'Holiday Triple Stamps', type: 'Stamp Campaign', status: 'Draft', target: 'All Customers', startDate: 'Dec 1, 2024', endDate: 'Dec 31, 2024', progress: 0, reward: 'Free Pastry' },
    { id: 3, name: 'Morning Happy Hour', type: 'Happy Hours', status: 'Active', target: 'Gold', startDate: 'Oct 15, 2024', endDate: 'Ongoing', progress: 42, reward: '10% Discount' },
  ]);

  const [priorityLevel, setPriorityLevel] = useState<number>(1);
  const [selectedTiers, setSelectedTiers] = useState<string[]>(['Obsidian VIP', 'Gold Reserve']);
  const [lifecycleType, setLifecycleType] = useState<string>('Both');
  const [birthdayHorizon, setBirthdayHorizon] = useState<number>(7);
  const [minAge, setMinAge] = useState<number>(21);
  const [maxAge, setMaxAge] = useState<number>(65);

  const [matchType, setMatchType] = useState<'ALL' | 'ANY'>('ALL');
  const [rewardType, setRewardType] = useState<'Same' | 'Different'>('Same');

  const [rewardSelection, setRewardSelection] = useState<string>('Free item / BOG');
  const [redemptionLimit, setRedemptionLimit] = useState<string>('1 Time Only');
  const [stackingControl, setStackingControl] = useState<boolean>(true);
  const [expirationWindow, setExpirationWindow] = useState<string>('Dynamic Qualification Window');

  type RuleType = 'standard1' | 'standard2' | 'bogo' | 'orGroup';
  interface RuleItem { id: number; type: RuleType; }
  const [rulesList, setRulesList] = useState<RuleItem[]>([
    { id: 1, type: 'standard1' },
    { id: 2, type: 'standard2' },
    { id: 3, type: 'bogo' },
    { id: 4, type: 'orGroup' }
  ]);
  const addRule = (type: RuleType) => setRulesList([...rulesList, { id: Date.now(), type }]);
  const removeRule = (id: number) => setRulesList(rulesList.filter(r => r.id !== id));
  const duplicateRule = (id: number) => {
    const rule = rulesList.find(r => r.id === id);
    if (rule) setRulesList([...rulesList, { ...rule, id: Date.now() }]);
  };

  const [orGroupItems, setOrGroupItems] = useState<{ id: number, type: 'tier' | 'stamp' }[]>([
    { id: 1, type: 'tier' },
    { id: 2, type: 'stamp' }
  ]);
  const addOrGroupItem = () => setOrGroupItems([...orGroupItems, { id: Date.now(), type: 'stamp' }]);
  const removeOrGroupItem = (id: number) => setOrGroupItems(orGroupItems.filter(i => i.id !== id));

  const [activeBranches, setActiveBranches] = useState<string[]>(['Downtown Flagship', 'Northside Mall', 'West End Kiosk']);
  const allBranchOptions = ['Downtown Flagship', 'Northside Mall', 'West End Kiosk', 'Airport Lounge', 'Eastside Store'];
  const toggleBranch = (branch: string) => {
    setActiveBranches(prev =>
      prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch]
    );
  };
  const availableBranches = ['Airport Lounge', 'Eastside Store', 'Uptown Boutique'];
  const handleAddLocation = () => {
    const nextBranch = availableBranches.find(b => !activeBranches.includes(b));
    if (nextBranch) setActiveBranches([...activeBranches, nextBranch]);
    else showToast('All locations added');
  };
  const handleRemoveLocation = (branchToRemove: string) => {
    setActiveBranches(activeBranches.filter(b => b !== branchToRemove));
  };

  const [draggedRuleId, setDraggedRuleId] = useState<number | null>(null);
  const handleDragStart = (id: number) => setDraggedRuleId(id);
  const handleDragOver = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedRuleId === null || draggedRuleId === targetId) return;
    const draggedIndex = rulesList.findIndex(r => r.id === draggedRuleId);
    const targetIndex = rulesList.findIndex(r => r.id === targetId);
    if (draggedIndex < 0 || targetIndex < 0) return;
    const newRules = [...rulesList];
    const [draggedItem] = newRules.splice(draggedIndex, 1);
    newRules.splice(targetIndex, 0, draggedItem);
    setRulesList(newRules);
  };
  const handleDragEnd = () => setDraggedRuleId(null);


  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const toggleTier = (tier: string) => {
    if (tier === 'All Tiers') {
      setSelectedTiers(['Obsidian VIP', 'Gold Reserve', 'Silver Tier']);
    } else {
      setSelectedTiers(prev =>
        prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier]
      );
    }
  };

  const campaignTypes = [
    { id: '% Discount', icon: Percent },
    { id: 'Loyalty Boost', icon: Star },
    { id: 'Flash Promo', icon: Zap },
    { id: 'Referral Bonus', icon: Users },
    { id: 'New Customer', icon: UserPlus },
    { id: 'Old Customer', icon: RefreshCw },
    { id: 'Welcome Campaign', icon: Sparkles },
    { id: 'Visit Campaign', icon: Activity },
    { id: 'Billing Campaign', icon: DollarSign },
    { id: 'Stamp Campaign', icon: FileText },
    { id: 'Happy Hours', icon: Clock },
  ];

  const steps = [
    { id: 1, name: 'Basics' },
    { id: 2, name: 'Audience' },
    { id: 3, name: 'Conditions & Rules' },
    { id: 4, name: 'Reward Def' },
    { id: 5, name: 'Review & Publish' },
  ];

  // Derived full campaign type key for Step 3 routing
  const fullCampaignType =
    topLevelType === 'existing_customer' && existingSubType
      ? existingSubType
      : topLevelType;

  const step1Valid = campaignName.trim().length > 0 && fullCampaignType !== '';

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
      {/* ── LEFT COLUMN ── */}
      <div className="lg:col-span-7 flex flex-col gap-4 lg:block lg:bg-white lg:border lg:border-[#EFECE6] lg:rounded-xl lg:p-6 lg:shadow-sm lg:space-y-6">

        {/* Mobile: Estimated Reach banner */}
        <div className="lg:hidden bg-white border border-[#EFECE6] rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FDF8EB] rounded-full flex items-center justify-center text-[#9E782F]"><Users className="w-5 h-5" /></div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93] mb-0.5">ESTIMATED LIVE REACH</div>
              <div className="text-sm font-bold text-[#1A1615]">~1,840 <span className="font-medium text-[#6E6A66]">VIP Members</span></div>
            </div>
          </div>
          <div className="px-2 py-1 bg-[#E0F9ED] text-[#0D7A53] rounded font-bold text-[10px] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4%
          </div>
        </div>

        {/* Desktop section label */}
        <div className="hidden lg:block border-b border-[#EFECE6] pb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">CONFIG 1/5</span>
          <h3 className="text-base font-bold text-[#1A1615]">Campaign Details</h3>
        </div>

        {/* ── CAMPAIGN NAME ── */}
        <div className="bg-white border border-[#EFECE6] rounded-xl p-4 shadow-sm lg:p-0 lg:border-none lg:shadow-none lg:bg-transparent">
          <div className="lg:hidden flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1A1615]">
              <Sparkles className="w-4 h-4 text-[#D4A753]" /> Campaign Identity
            </div>
            <span className="px-2 py-0.5 bg-[#FDF8EB] text-[#9E782F] text-[10px] font-bold rounded">Required</span>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1615] lg:text-[#6E6A66]">Campaign Name</label>
              <span className="text-[11px] font-semibold text-[#9E9A93]">{campaignName.length} / 64 characters</span>
            </div>
            <input
              id="campaign-name-input"
              type="text"
              value={campaignName}
              maxLength={64}
              onChange={e => setCampaignName(e.target.value)}
              placeholder="e.g. Autumn Reserve Tasting & Geisha Perk"
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-sm font-semibold text-[#1A1615] placeholder:text-[#B0ABA5] focus:outline-none focus:border-[#D4A753] transition-colors"
            />
          </div>

          {/* ── CAMPAIGN TYPE (nested radio-cards) ── */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1615] lg:text-[#6E6A66] mb-3">
              Campaign Type <span className="text-[#B7362F] ml-0.5">*</span>
            </label>

            {/* Level 1 – 3 top-level cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              {/* New Customer */}
              <button
                id="type-new-customer"
                type="button"
                onClick={() => { setTopLevelType('new_customer'); setExistingSubType(''); }}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${topLevelType === 'new_customer'
                    ? 'bg-[#FDF8EB] border-[#D4A753] shadow-md'
                    : 'bg-white border-[#EFECE6] hover:border-[#D4A753]/50 hover:bg-[#FAF8F5]'
                  }`}
              >
                {topLevelType === 'new_customer' && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#D4A753] rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${topLevelType === 'new_customer' ? 'bg-[#D4A753]/20' : 'bg-[#F3EDE6]'
                  }`}>
                  <Sparkles className={`w-5 h-5 ${topLevelType === 'new_customer' ? 'text-[#9E782F]' : 'text-[#9E9A93]'}`} />
                </div>
                <div className={`text-[13px] font-bold mb-0.5 ${topLevelType === 'new_customer' ? 'text-[#9E782F]' : 'text-[#1A1615]'
                  }`}>New Customer</div>
                <div className="text-[11px] text-[#6E6A66] leading-tight">Welcome offer for first-time customers</div>
              </button>

              {/* Existing Customer */}
              <button
                id="type-existing-customer"
                type="button"
                onClick={() => setTopLevelType('existing_customer')}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${topLevelType === 'existing_customer'
                    ? 'bg-[#FDF8EB] border-[#D4A753] shadow-md'
                    : 'bg-white border-[#EFECE6] hover:border-[#D4A753]/50 hover:bg-[#FAF8F5]'
                  }`}
              >
                {topLevelType === 'existing_customer' && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#D4A753] rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${topLevelType === 'existing_customer' ? 'bg-[#D4A753]/20' : 'bg-[#F3EDE6]'
                  }`}>
                  <RefreshCw className={`w-5 h-5 ${topLevelType === 'existing_customer' ? 'text-[#9E782F]' : 'text-[#9E9A93]'}`} />
                </div>
                <div className={`text-[13px] font-bold mb-0.5 ${topLevelType === 'existing_customer' ? 'text-[#9E782F]' : 'text-[#1A1615]'
                  }`}>Existing Customer</div>
                <div className="text-[11px] text-[#6E6A66] leading-tight">Reward repeat customers</div>
              </button>

              {/* Happy Hours */}
              <button
                id="type-happy-hours"
                type="button"
                onClick={() => { setTopLevelType('happy_hours'); setExistingSubType(''); }}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${topLevelType === 'happy_hours'
                    ? 'bg-[#FDF8EB] border-[#D4A753] shadow-md'
                    : 'bg-white border-[#EFECE6] hover:border-[#D4A753]/50 hover:bg-[#FAF8F5]'
                  }`}
              >
                {topLevelType === 'happy_hours' && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#D4A753] rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${topLevelType === 'happy_hours' ? 'bg-[#D4A753]/20' : 'bg-[#F3EDE6]'
                  }`}>
                  <Clock className={`w-5 h-5 ${topLevelType === 'happy_hours' ? 'text-[#9E782F]' : 'text-[#9E9A93]'}`} />
                </div>
                <div className={`text-[13px] font-bold mb-0.5 ${topLevelType === 'happy_hours' ? 'text-[#9E782F]' : 'text-[#1A1615]'
                  }`}>Happy Hours</div>
                <div className="text-[11px] text-[#6E6A66] leading-tight">Time &amp; day-based offers</div>
              </button>
            </div>

            {/* Level 2 – Existing Customer sub-types */}
            {topLevelType === 'existing_customer' && (
              <div className="mt-2 ml-0 sm:ml-2 pl-3 border-l-2 border-[#D4A753]/40">
                <p className="text-[11px] font-bold text-[#9E782F] uppercase tracking-wider mb-2">Select Reward Trigger</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Visit Type */}
                  <button
                    id="subtype-visit"
                    type="button"
                    onClick={() => setExistingSubType('existing_visit')}
                    className={`relative text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${existingSubType === 'existing_visit'
                        ? 'bg-[#FDF8EB] border-[#D4A753] shadow-sm'
                        : 'bg-[#FAF8F5] border-[#EFECE6] hover:border-[#D4A753]/50'
                      }`}
                  >
                    {existingSubType === 'existing_visit' && (
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#D4A753] rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </span>
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${existingSubType === 'existing_visit' ? 'bg-[#D4A753]/20' : 'bg-white border border-[#EFECE6]'
                      }`}>
                      <Activity className={`w-4 h-4 ${existingSubType === 'existing_visit' ? 'text-[#9E782F]' : 'text-[#9E9A93]'}`} />
                    </div>
                    <div className={`text-[12px] font-bold mb-0.5 ${existingSubType === 'existing_visit' ? 'text-[#9E782F]' : 'text-[#1A1615]'
                      }`}>Visit Type</div>
                    <div className="text-[10px] text-[#6E6A66] leading-tight">Reward after N qualifying visits</div>
                  </button>

                  {/* Billing Type */}
                  <button
                    id="subtype-billing"
                    type="button"
                    onClick={() => setExistingSubType('existing_billing')}
                    className={`relative text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${existingSubType === 'existing_billing'
                        ? 'bg-[#FDF8EB] border-[#D4A753] shadow-sm'
                        : 'bg-[#FAF8F5] border-[#EFECE6] hover:border-[#D4A753]/50'
                      }`}
                  >
                    {existingSubType === 'existing_billing' && (
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#D4A753] rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </span>
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${existingSubType === 'existing_billing' ? 'bg-[#D4A753]/20' : 'bg-white border border-[#EFECE6]'
                      }`}>
                      <DollarSign className={`w-4 h-4 ${existingSubType === 'existing_billing' ? 'text-[#9E782F]' : 'text-[#9E9A93]'}`} />
                    </div>
                    <div className={`text-[12px] font-bold mb-0.5 ${existingSubType === 'existing_billing' ? 'text-[#9E782F]' : 'text-[#1A1615]'
                      }`}>Billing Type</div>
                    <div className="text-[10px] text-[#6E6A66] leading-tight">Reward based on cumulative spend</div>
                  </button>

                  {/* Stamp Type */}
                  <button
                    id="subtype-stamp"
                    type="button"
                    onClick={() => setExistingSubType('existing_stamp')}
                    className={`relative text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${existingSubType === 'existing_stamp'
                        ? 'bg-[#FDF8EB] border-[#D4A753] shadow-sm'
                        : 'bg-[#FAF8F5] border-[#EFECE6] hover:border-[#D4A753]/50'
                      }`}
                  >
                    {existingSubType === 'existing_stamp' && (
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#D4A753] rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </span>
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${existingSubType === 'existing_stamp' ? 'bg-[#D4A753]/20' : 'bg-white border border-[#EFECE6]'
                      }`}>
                      <FileText className={`w-4 h-4 ${existingSubType === 'existing_stamp' ? 'text-[#9E782F]' : 'text-[#9E9A93]'}`} />
                    </div>
                    <div className={`text-[12px] font-bold mb-0.5 ${existingSubType === 'existing_stamp' ? 'text-[#9E782F]' : 'text-[#1A1615]'
                      }`}>Stamp Type</div>
                    <div className="text-[10px] text-[#6E6A66] leading-tight">Reward after N purchases of a specific item</div>
                  </button>
                </div>
              </div>
            )}

            {/* Resolved type pill */}
            {fullCampaignType && (
              <div className="mt-3 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A53]" />
                <span className="text-[11px] font-bold text-[#0D7A53]">
                  Type resolved: <span className="capitalize">{fullCampaignType.replace(/_/g, ' ')}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── DATE RANGE & STATUS ── */}
        <div className="space-y-4 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">MANDATORY CAMPAIGN VALIDITY</label>
            <span className="px-2 py-0.5 bg-[#FDF8EB] text-[#9E782F] border border-[#F3E5C8] rounded text-[10px] font-bold uppercase">Required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-[#6E6A66] block mb-1.5">Start Date</label>
              <input
                id="start-date-input"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-white border border-[#EFECE6] px-3 py-2.5 rounded-lg text-[13px] font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] shadow-sm"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#6E6A66] block mb-1.5">End Date</label>
              <input
                id="end-date-input"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-white border border-[#EFECE6] px-3 py-2.5 rounded-lg text-[13px] font-bold text-[#1A1615] focus:outline-none focus:border-[#D4A753] shadow-sm"
              />
            </div>
          </div>

          {/* Status Toggle */}
          <div>
            <label className="text-[11px] font-bold text-[#6E6A66] block mb-2">Status</label>
            <div className="inline-flex items-center bg-white border border-[#EFECE6] rounded-full p-1 shadow-sm">
              <button
                id="status-draft"
                type="button"
                onClick={() => setStatusDraft(true)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${statusDraft
                    ? 'bg-[#1A1615] text-white shadow'
                    : 'text-[#6E6A66] hover:text-[#1A1615]'
                  }`}
              >
                Draft
              </button>
              <button
                id="status-active"
                type="button"
                onClick={() => setStatusDraft(false)}
                className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${!statusDraft
                    ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow'
                    : 'text-[#6E6A66] hover:text-[#1A1615]'
                  }`}
              >
                Active
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-[#9E9A93] font-medium">
              Campaign activates only when Status = Active AND current date is within range.
            </p>
          </div>

          <div className="bg-[#E0F9ED] border border-[#BCE3D1] p-3 rounded-lg flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0D7A53] shrink-0 mt-0.5" />
            <p className="text-[11px] font-medium text-[#0D7A53] leading-tight">
              Active = Status is Active <strong>AND</strong> current date &ge; Start Date <strong>AND</strong> current date &le; End Date.
            </p>
          </div>
        </div>

        {/* ── ACTIVE BRANCHES ── */}
        <div className="bg-white border border-[#EFECE6] rounded-xl p-4 shadow-sm lg:p-0 lg:border-none lg:shadow-none lg:bg-transparent">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E6A66]">Active Branches</label>
            <button
              type="button"
              onClick={() => setActiveBranches([...allBranchOptions])}
              className="text-[11px] font-bold text-[#D4A753] hover:underline cursor-pointer"
            >
              Select All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {allBranchOptions.map(branch => {
              const selected = activeBranches.includes(branch);
              return (
                <button
                  key={branch}
                  type="button"
                  id={`branch-${branch.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => toggleBranch(branch)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${selected
                      ? 'bg-[#E6F4ED] border-[#BCE3D1] text-[#0D7A53]'
                      : 'bg-[#FAF8F5] border-[#EFECE6] text-[#6E6A66] hover:border-[#D4A753]/50'
                    }`}
                >
                  {selected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {branch}
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-[#6E6A66] flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#D4A753] shrink-0" />
            {activeBranches.length} branch{activeBranches.length !== 1 ? 'es' : ''} selected
          </div>
        </div>

        {/* ── PRIORITY ── */}
        <div className="bg-white border border-[#EFECE6] rounded-xl p-4 shadow-sm lg:p-0 lg:border-none lg:shadow-none lg:bg-transparent">
          <div className="hidden lg:block">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6E6A66] mb-2">Priority Level</label>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center bg-[#FAF8F5] border border-[#EFECE6] rounded-lg">
                <button onClick={() => setPriorityLevel(Math.max(1, priorityLevel - 1))} className="px-3 py-1.5 text-[#1A1615] font-bold hover:bg-[#EFECE6] transition-colors rounded-l-lg cursor-pointer">-</button>
                <span className="px-4 py-1.5 text-xs font-bold text-[#1A1615] border-x border-[#EFECE6] w-[60px] text-center">{priorityLevel} (P{priorityLevel})</span>
                <button onClick={() => setPriorityLevel(priorityLevel + 1)} className="px-3 py-1.5 text-[#1A1615] font-bold hover:bg-[#EFECE6] transition-colors rounded-r-lg cursor-pointer">+</button>
              </div>
            </div>
            <p className="text-[11px] font-semibold text-[#6E6A66] leading-relaxed">
              Tier {priorityLevel} Override Active: Highest arbitration queue. Higher priority wins if a transaction qualifies for multiple active campaigns.
            </p>
          </div>
          {/* Mobile priority */}
          <div className="lg:hidden bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#1A1615] mb-1">Priority Queue Level</div>
              <div className="text-[10px] text-[#6E6A66] max-w-[120px]">Defines precedence over competing discounts</div>
            </div>
            <div className="flex items-center bg-white border border-[#EFECE6] rounded-full px-2 py-1 shadow-sm">
              <button onClick={() => setPriorityLevel(Math.max(1, priorityLevel - 1))} className="w-6 h-6 flex items-center justify-center text-[#9E9A93] bg-[#FAF8F5] rounded-full cursor-pointer hover:bg-[#EFECE6]">-</button>
              <div className="px-3 text-center">
                <div className="text-sm font-bold text-[#D4A753]">{priorityLevel}</div>
                <div className="text-[10px] font-bold text-[#1A1615]">(P{priorityLevel})</div>
              </div>
              <button onClick={() => setPriorityLevel(priorityLevel + 1)} className="w-6 h-6 flex items-center justify-center text-[#1A1615] bg-[#FAF8F5] rounded-full cursor-pointer hover:bg-[#EFECE6]">+</button>
            </div>
          </div>
        </div>

        {/* Mobile featured cohort banner */}
        <div className="lg:hidden mt-2 bg-[#1A1615] rounded-xl shadow-xl text-white relative overflow-hidden h-32">
          <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&auto=format&fit=crop&q=80" alt="Coffee" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#D4A753] mb-1">FEATURED COHORT</div>
              <h4 className="text-sm font-bold text-white">Geisha Harvest Collection</h4>
            </div>
            <span className="px-2 py-0.5 bg-black/50 text-[#D4A753] border border-[#D4A753]/30 rounded text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm">EXCLUSIVE</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          id="step1-continue"
          type="button"
          disabled={!step1Valid}
          onClick={() => step1Valid && setCurrentStep(2)}
          className={`w-full py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${step1Valid
              ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-md hover:opacity-95 cursor-pointer'
              : 'bg-[#EFECE6] text-[#9E9A93] cursor-not-allowed'
            }`}
        >
          Continue to Audience <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── RIGHT COLUMN – Live Preview ── */}
      <div className="hidden lg:block lg:col-span-5 space-y-4">
        <div className="bg-[#1A1615] rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">REVIA ARTISAN PASS</span>
              <span className="px-2 py-0.5 bg-[#D4A753]/20 text-[#D4A753] border border-[#D4A753]/30 rounded text-[9px] font-bold tracking-widest uppercase">
                {topLevelType ? topLevelType.replace(/_/g, ' ').toUpperCase() : 'NEW CAMPAIGN'}
              </span>
            </div>
            <div className="h-32 bg-neutral-800 rounded-xl mb-4 overflow-hidden border border-neutral-700">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&auto=format&fit=crop&q=80" alt="Coffee Flight" className="w-full h-full object-cover opacity-80" />
            </div>
            <h4 className="text-lg font-bold mb-2">{campaignName || 'Untitled Campaign'}</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D7A53]" /> {activeBranches.length} Branch{activeBranches.length !== 1 ? 'es' : ''} Selected
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Calendar className="w-3.5 h-3.5 text-[#D4A753]" />
                {startDate && endDate ? `${startDate} – ${endDate}` : 'No dates set'}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A753]" />
                Status: {statusDraft ? 'Draft' : 'Active'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EFECE6] rounded-xl p-5 shadow-sm space-y-4">
          <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#1A1615]">Summary Specs</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#6E6A66]">Campaign Type</span>
              <span className="text-[#1A1615] capitalize">{fullCampaignType ? fullCampaignType.replace(/_/g, ' ') : '—'}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#6E6A66]">Branch Eligibility</span>
              <span className="text-[#1A1615]">{activeBranches.length} Outlet{activeBranches.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#6E6A66]">Conflict Resolution</span>
              <span className="text-[#1A1615]">Level {priorityLevel} (P{priorityLevel})</span>
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
            <button onClick={() => toggleTier('Obsidian VIP')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold shadow-sm transition-colors ${selectedTiers.includes('Obsidian VIP') ? 'bg-[#1A1615] text-white' : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5]'}`}>
              {selectedTiers.includes('Obsidian VIP') ? <span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span> : <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D1CDC7]"></span>}
              Obsidian VIP
            </button>
            <button onClick={() => toggleTier('VVIP')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold shadow-sm transition-colors ${selectedTiers.includes('VVIP') ? 'bg-[#1A1615] text-white' : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5]'}`}>
              {selectedTiers.includes('VVIP') ? <span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span> : <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D1CDC7]"></span>}
              VVIP
            </button>
            <button onClick={() => toggleTier('VIP')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold shadow-sm transition-colors ${selectedTiers.includes('VIP') ? 'bg-[#1A1615] text-white' : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5]'}`}>
              {selectedTiers.includes('VIP') ? <span className="w-2.5 h-2.5 rounded-full bg-[#D4A753]"></span> : <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D1CDC7]"></span>}
              VIP
            </button>
            <button onClick={() => toggleTier('Gold')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold shadow-sm transition-colors ${selectedTiers.includes('Gold') ? 'bg-[#FDF8EB] border border-[#F3E5C8] text-[#9E782F]' : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5]'}`}>
              {selectedTiers.includes('Gold') ? <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A753]" /> : <span className="w-2.5 h-2.5 rounded-full border-2 border-[#D1CDC7]"></span>}
              Gold
            </button>
            <button onClick={() => toggleTier('Silver')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold shadow-sm transition-colors ${selectedTiers.includes('Silver') ? 'bg-[#F0F2F5] border border-[#E2E8F0] text-[#475569]' : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5]'}`}>
              {selectedTiers.includes('Silver') ? <CheckCircle2 className="w-3.5 h-3.5 text-[#64748B]" /> : <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D1CDC7]"></span>}
              Silver
            </button>
            <button onClick={() => toggleTier('Bronze')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold shadow-sm transition-colors ${selectedTiers.includes('Bronze') ? 'bg-[#F0F2F5] border border-[#E2E8F0] text-[#475569]' : 'bg-white border border-[#EFECE6] text-[#6E6A66] hover:bg-[#FAF8F5]'}`}>
              {selectedTiers.includes('Bronze') ? <CheckCircle2 className="w-3.5 h-3.5 text-[#64748B]" /> : <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D1CDC7]"></span>}
              Bronze
            </button>
            <button onClick={() => toggleTier('All Tiers')} className={`flex items-center px-4 py-2 rounded-full text-[13px] font-bold transition-colors ${selectedTiers.includes('All Tiers') ? 'bg-[#EFECE6] text-[#1A1615]' : 'bg-[#FAF8F5] border border-[#EFECE6] text-[#6E6A66] hover:bg-[#EFECE6]'}`}>
              All Customers
            </button>
          </div>

          {selectedTiers.some(t => ['VIP', 'VVIP', 'Gold', 'Silver', 'Bronze'].includes(t)) && (
            <div className="mt-4 p-4 border border-[#EFECE6] bg-white rounded-xl shadow-sm space-y-4">
              <h5 className="text-[12px] font-bold text-[#1A1615] uppercase tracking-wider">Customer Type Conditions</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-[#6E6A66] block mb-1">Minimum Billing Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6A66] font-bold">₹</span>
                    <input type="number" defaultValue={1000} className="w-full pl-7 pr-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-sm focus:outline-none focus:border-[#D4A753]" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6E6A66] block mb-1">Status</label>
                  <select className="w-full px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-sm focus:outline-none focus:border-[#D4A753]">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6E6A66] block mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-sm focus:outline-none focus:border-[#D4A753]" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#6E6A66] block mb-1">Expiry Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-sm focus:outline-none focus:border-[#D4A753]" />
                </div>
              </div>
            </div>
          )}
          <button onClick={() => showToast('Custom segment builder will open.')} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF8F5] text-[#9E782F] border border-[#EFECE6] rounded-full text-[12px] font-bold hover:bg-[#FDF8EB] transition-colors mt-1 cursor-pointer">
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
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-0 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-1.5">
            <button onClick={() => setLifecycleType('New')} className={`flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${lifecycleType === 'New' ? 'text-white bg-gradient-to-b from-[#C59B46] to-[#9E782F] shadow-sm border border-[#9E782F]' : 'text-[#6E6A66] hover:bg-[#EFECE6] cursor-pointer'}`}>
              New Patrons {lifecycleType === 'New' && <Check className="w-4 h-4" />}
            </button>
            <button onClick={() => setLifecycleType('Returning')} className={`flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${lifecycleType === 'Returning' ? 'text-white bg-gradient-to-b from-[#C59B46] to-[#9E782F] shadow-sm border border-[#9E782F]' : 'text-[#6E6A66] hover:bg-[#EFECE6] cursor-pointer'}`}>
              Returning Patrons {lifecycleType === 'Returning' && <Check className="w-4 h-4" />}
            </button>
            <button onClick={() => setLifecycleType('Both')} className={`flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${lifecycleType === 'Both' ? 'text-white bg-gradient-to-b from-[#C59B46] to-[#9E782F] shadow-sm border border-[#9E782F]' : 'text-[#6E6A66] hover:bg-[#EFECE6] cursor-pointer'}`}>
              Both (Active Cohort) {lifecycleType === 'Both' && <Check className="w-4 h-4" />}
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

          <div className="bg-[#FDF8EB] border border-[#F3E5C8] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
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
              <button onClick={() => setBirthdayHorizon(Math.max(1, birthdayHorizon - 1))} className="px-3.5 py-2 text-[#1A1615] hover:bg-[#FAF8F5] transition-colors rounded-l-lg border-r border-[#EFECE6] font-bold text-lg leading-none cursor-pointer">-</button>
              <div className="px-4 py-2 text-[14px] font-bold text-[#1A1615]">{birthdayHorizon} <span className="font-semibold text-[13px]">days</span></div>
              <button onClick={() => setBirthdayHorizon(birthdayHorizon + 1)} className="px-3.5 py-2 text-[#1A1615] hover:bg-[#FAF8F5] transition-colors rounded-r-lg border-l border-[#EFECE6] font-bold text-lg leading-none cursor-pointer">+</button>
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
                    <div className="text-[20px] font-bold text-[#1A1615]">{minAge} <span className="text-xs font-semibold text-[#6E6A66]">yrs</span></div>
                  </div>
                  <div className="text-[#6E6A66]"><SlidersHorizontal className="w-5 h-5 opacity-50" /></div>
                </div>
                <div className="flex-1 bg-white border border-[#EFECE6] rounded-lg p-3 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#9E9A93] mb-1">MAX AGE</div>
                    <div className="text-[20px] font-bold text-[#1A1615]">{maxAge} <span className="text-xs font-semibold text-[#6E6A66]">yrs</span></div>
                  </div>
                  <div className="text-[#6E6A66]"><SlidersHorizontal className="w-5 h-5 opacity-50" /></div>
                </div>
              </div>

              <div className="px-2">
                <div className="h-1.5 bg-[#EFECE6] rounded-full relative mb-3">
                  <div
                    className="absolute h-full bg-[#D4A753] rounded-full"
                    style={{ left: `${((minAge - 18) / (80 - 18)) * 100}%`, right: `${100 - ((maxAge - 18) / (80 - 18)) * 100}%` }}
                  ></div>

                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={minAge}
                    onChange={(e) => setMinAge(Math.min(maxAge - 1, Number(e.target.value)))}
                    className="absolute w-full top-1/2 -translate-y-1/2 opacity-0 cursor-pointer pointer-events-auto"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#D4A753] rounded-full shadow-sm pointer-events-none"
                    style={{ left: `${((minAge - 18) / (80 - 18)) * 100}%` }}
                  ></div>

                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={maxAge}
                    onChange={(e) => setMaxAge(Math.max(minAge + 1, Number(e.target.value)))}
                    className="absolute w-full top-1/2 -translate-y-1/2 opacity-0 cursor-pointer pointer-events-auto"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#D4A753] rounded-full shadow-sm pointer-events-none"
                    style={{ left: `${((maxAge - 18) / (80 - 18)) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold text-[#6E6A66]">
                  <span>18 yrs</span>
                  <span className="text-[#D4A753]">Active Segment: {minAge}–{maxAge}</span>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#EFECE6] pb-5 gap-4 md:gap-0">
            <div className="flex items-start md:items-center gap-4">
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
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[12px] font-bold text-[#6E6A66] tracking-wider">MATCH</span>
              <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1">
                <button onClick={() => setMatchType('ALL')} className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-colors cursor-pointer ${matchType === 'ALL' ? 'bg-[#1A1615] text-white shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>ALL (AND)</button>
                <button onClick={() => setMatchType('ANY')} className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-colors cursor-pointer ${matchType === 'ANY' ? 'bg-[#1A1615] text-white shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>ANY (OR)</button>
              </div>
              <span className="text-[12px] font-medium text-[#6E6A66]">of the following condition criteria:</span>
            </div>

            <div className="space-y-4">
              {rulesList.map(rule => (
                <div
                  key={rule.id}
                  draggable
                  onDragStart={() => handleDragStart(rule.id)}
                  onDragOver={(e) => handleDragOver(e, rule.id)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all ${draggedRuleId === rule.id ? 'opacity-50 scale-[0.98]' : 'opacity-100'}`}
                >
                  {rule.type === 'standard1' && (
                    <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 pr-4 shadow-sm">
                      <div className="cursor-grab opacity-50 hover:opacity-100"><GripVertical className="w-5 h-5 text-[#9E9A93]" /></div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none"><option>Customer Lifetime $</option></select>
                        <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-medium text-[#6E6A66] focus:outline-none"><option>is greater than or equal to</option></select>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1615] font-bold text-[13px]">$</span>
                          <input type="text" defaultValue="250.00" className="w-full bg-white border border-[#EFECE6] rounded-lg pl-7 pr-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-2 border-l border-[#EFECE6]">
                        <button onClick={() => duplicateRule(rule.id)} className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] transition-colors cursor-pointer"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => removeRule(rule.id)} className="p-1.5 text-[#9E9A93] hover:text-[#EF4444] transition-colors cursor-pointer"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  )}

                  {rule.type === 'standard2' && (
                    <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 pr-4 shadow-sm">
                      <div className="cursor-grab opacity-50 hover:opacity-100"><GripVertical className="w-5 h-5 text-[#9E9A93]" /></div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none"><option>Last Visit Date</option></select>
                        <select className="bg-white border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-medium text-[#6E6A66] focus:outline-none"><option>is within the last</option></select>
                        <div className="flex bg-white border border-[#EFECE6] rounded-lg overflow-hidden">
                          <input type="text" defaultValue="14" className="w-12 text-center text-[13px] font-bold text-[#1A1615] focus:outline-none border-r border-[#EFECE6]" />
                          <span className="flex-1 px-3 py-2 text-[13px] font-medium text-[#6E6A66] bg-[#FAF8F5] flex items-center">days</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-2 border-l border-[#EFECE6]">
                        <button onClick={() => duplicateRule(rule.id)} className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] transition-colors cursor-pointer"><Copy className="w-4 h-4" /></button>
                        <button onClick={() => removeRule(rule.id)} className="p-1.5 text-[#9E9A93] hover:text-[#EF4444] transition-colors cursor-pointer"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  )}

                  {rule.type === 'bogo' && (
                    <div className="bg-[#FDF8EB] border-2 border-[#F3E5C8] rounded-xl p-5 shadow-sm relative">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3 md:gap-0">
                        <div className="flex items-start md:items-center gap-3">
                          <div className="cursor-grab opacity-50 hover:opacity-100"><GripVertical className="w-5 h-5 text-[#9E782F]" /></div>
                          <span className="px-2.5 py-1 bg-[#D4A753]/20 text-[#9E782F] font-bold text-[10px] uppercase tracking-widest rounded flex items-center gap-1.5 border border-[#D4A753]/30">
                            <Gift className="w-3 h-3" /> BOGO
                          </span>
                          <span className="text-[13px] font-bold text-[#1A1615]">Item Quantity in Order (Buy X Get Y)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => duplicateRule(rule.id)} className="p-1.5 text-[#9E782F]/70 hover:text-[#9E782F] transition-colors cursor-pointer"><Copy className="w-4 h-4" /></button>
                          <button onClick={() => removeRule(rule.id)} className="p-1.5 text-[#9E782F]/70 hover:text-[#EF4444] transition-colors cursor-pointer"><X className="w-4 h-4" /></button>
                        </div>
                      </div>

                      <div className="ml-8 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-[#F3E5C8] rounded-lg p-2 sm:pr-3 shadow-sm">
                          <select className="w-full sm:flex-1 bg-transparent text-[13px] font-bold text-[#1A1615] px-2 focus:outline-none"><option>Espresso</option></select>
                          <div className="flex items-center gap-2 px-2 sm:px-0 pb-1 sm:pb-0">
                            <span className="text-[13px] font-medium text-[#6E6A66] whitespace-nowrap">buy quantity of</span>
                            <input type="text" defaultValue="3" className="w-12 bg-[#FAF8F5] border border-[#EFECE6] rounded-md text-center py-1.5 text-[14px] font-bold text-[#1A1615] focus:outline-none" />
                          </div>
                        </div>

                        <div className="pl-6 border-l-2 border-[#D4A753]/30 relative pt-2">
                          <div className="absolute top-1/2 -left-[2px] w-4 h-[2px] bg-[#D4A753]/30"></div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-[#F3E5C8] rounded-lg p-3 shadow-sm relative z-10">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-bold text-[#1A1615] whitespace-nowrap">Customer gets</span>
                              <input type="text" defaultValue="1" className="w-10 bg-[#FAF8F5] border border-[#EFECE6] rounded-md text-center py-1.5 text-[13px] font-bold text-[#1A1615] focus:outline-none" />
                            </div>

                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                              <select className="w-full sm:flex-1 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg px-3 py-2 text-[13px] font-bold text-[#1A1615] focus:outline-none"><option>same item (Espresso)</option></select>
                              <span className="text-[13px] font-bold text-[#1A1615] self-end sm:self-auto">free</span>
                            </div>

                            <div className="flex bg-[#FAF8F5] border border-[#EFECE6] rounded-lg p-1 shrink-0">
                              <button onClick={() => setRewardType('Same')} className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${rewardType === 'Same' ? 'bg-white text-[#9E782F] border border-[#F3E5C8] shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>Same<br />Item</button>
                              <button onClick={() => setRewardType('Different')} className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-colors cursor-pointer text-center ${rewardType === 'Different' ? 'bg-white text-[#9E782F] border border-[#F3E5C8] shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>Different<br />Item</button>
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
                  )}

                  {rule.type === 'orGroup' && (
                    <div className="bg-white border-2 border-[#EFECE6] rounded-xl p-5 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3 md:gap-0">
                        <div className="flex items-start md:items-center gap-3 flex-wrap md:flex-nowrap">
                          <span className="px-2.5 py-1 bg-[#9E782F] text-white font-bold text-[10px] uppercase tracking-widest rounded flex items-center gap-1.5 shrink-0">
                            <Network className="w-3 h-3" /> OR GROUP
                          </span>
                          <span className="text-[13px] font-bold text-[#1A1615]">Customer satisfies AT LEAST ONE criteria below:</span>
                        </div>
                        <button onClick={() => removeRule(rule.id)} className="text-[12px] font-bold text-[#EF4444] hover:underline flex items-center gap-1.5 cursor-pointer">
                          <X className="w-3.5 h-3.5" /> Remove Group
                        </button>
                      </div>

                      <div className="space-y-3">
                        {orGroupItems.map((item) => (
                          <div key={item.id}>
                            {item.type === 'tier' ? (
                              <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-2 pl-3 shadow-sm">
                                <CornerDownRight className="w-4 h-4 text-[#9E9A93] shrink-0" />
                                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-2 bg-white border border-[#EFECE6] rounded-lg px-3 py-1.5 shadow-sm">
                                      <span className="text-[13px] font-medium text-[#1A1615]">Current Tier</span>
                                      <Lock className="w-3 h-3 text-[#9E9A93]" />
                                    </div>
                                    <span className="text-[13px] font-medium text-[#6E6A66]">is one of</span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1A1615] text-white rounded-full text-[11px] font-bold shadow-sm">
                                      <Star className="w-3 h-3 text-[#D4A753]" /> Obsidian VIP
                                    </span>
                                    <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FDF8EB] border border-[#F3E5C8] text-[#9E782F] rounded-full text-[11px] font-bold shadow-sm">
                                      <Trophy className="w-3 h-3 text-[#D4A753]" /> Gold Reserve
                                    </span>
                                    <button className="w-7 h-7 rounded-full bg-white border border-[#EFECE6] flex items-center justify-center text-[#9E9A93] hover:text-[#1A1615] hover:border-[#D1CDC7] transition-all shadow-sm cursor-pointer">
                                      <Plus className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <button onClick={() => removeOrGroupItem(item.id)} className="p-2 text-[#9E9A93] hover:text-[#EF4444] transition-colors shrink-0 cursor-pointer"><X className="w-4 h-4" /></button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-2 pl-3 shadow-sm">
                                <CornerDownRight className="w-4 h-4 text-[#9E9A93] shrink-0" />
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
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
                                <button onClick={() => removeOrGroupItem(item.id)} className="p-2 text-[#9E9A93] hover:text-[#EF4444] transition-colors shrink-0 cursor-pointer"><X className="w-4 h-4" /></button>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="pl-9 mt-3 pt-1">
                          <button onClick={() => addOrGroupItem()} className="px-3 py-1.5 bg-white border border-[#EFECE6] rounded-full text-[11px] font-bold text-[#9E782F] hover:bg-[#FDF8EB] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer">
                            <Plus className="w-3 h-3" /> Add condition inside this OR block
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <button onClick={() => addRule('standard1')} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EFECE6] rounded-xl text-[13px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors shadow-sm cursor-pointer">
                <Plus className="w-4 h-4" /> Add Condition Rule
              </button>
              <button onClick={() => addRule('orGroup')} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#EFECE6] rounded-xl text-[13px] font-bold text-[#1A1615] hover:bg-[#FAF8F5] transition-colors shadow-sm cursor-pointer">
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
          <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4 md:gap-0">
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
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#6E6A66]">ACTIVE BRANCHES ({activeBranches.length} SELECTED)</label>
              <button onClick={() => showToast('Location manager opened')} className="text-[12px] font-bold text-[#0D7A53] hover:underline cursor-pointer">All retail locations active</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {activeBranches.map(branch => (
                <span key={branch} className="px-3 py-2 bg-white border border-[#EFECE6] text-[#1A1615] rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm">
                  <Check className="w-4 h-4 text-[#0D7A53]" /> {branch}
                  <X className="w-3.5 h-3.5 text-[#9E9A93] hover:text-[#EF4444] cursor-pointer ml-1" onClick={() => handleRemoveLocation(branch)} />
                </span>
              ))}
              <button onClick={handleAddLocation} className="px-3 py-2 bg-transparent border border-dashed border-[#D4A753] text-[#9E782F] rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-[#FDF8EB] transition-colors cursor-pointer">
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
            {[
              { id: 'Discount %', label: '% off order', icon: Percent },
              { id: 'Fixed $', label: 'Direct bill credit', icon: DollarSign },
              { id: 'Cashback', label: 'Wallet credit', icon: Activity },
              { id: 'Points', label: 'Multipliers', icon: Star },
              { id: 'Free item / BOG', label: 'Complimentary bean', icon: Zap }
            ].map(option => {
              const isActive = rewardSelection === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setRewardSelection(option.id)}
                  className={`pt-5 pb-4 px-3 rounded-xl text-center transition-colors flex flex-col items-center gap-3 cursor-pointer ${isActive ? 'bg-[#FDF8EB] border-2 border-[#D4A753] shadow-sm relative' : 'bg-[#FAF8F5] border border-[#EFECE6] hover:bg-[#EFECE6]'}`}
                >
                  {isActive && <div className="absolute -top-2.5 right-1/2 translate-x-1/2 bg-[#D4A753] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">ACTIVE</div>}
                  <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm ${isActive ? 'border border-[#F3E5C8]' : ''}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4A753]' : 'text-[#9E9A93]'}`} />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#1A1615]">{option.id}</div>
                    <div className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-[#9E782F]' : 'text-[#6E6A66]'}`}>{option.label}</div>
                  </div>
                </button>
              );
            })}
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
              <button onClick={() => setRedemptionLimit('1 Time Only')} className={`flex-1 py-2 rounded-md text-[12px] font-bold transition-colors cursor-pointer ${redemptionLimit === '1 Time Only' ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>1 Time Only</button>
              <button onClick={() => setRedemptionLimit('Once per Week')} className={`flex-1 py-2 rounded-md text-[12px] font-bold transition-colors cursor-pointer ${redemptionLimit === 'Once per Week' ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>Once per Week</button>
              <button onClick={() => setRedemptionLimit('Unlimited Window')} className={`flex-1 py-2 rounded-md text-[12px] font-bold transition-colors cursor-pointer ${redemptionLimit === 'Unlimited Window' ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white shadow-sm' : 'text-[#6E6A66] hover:bg-[#EFECE6]'}`}>Unlimited Window</button>
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
            <div onClick={() => setStackingControl(!stackingControl)} className={`w-10 h-6 rounded-full relative cursor-pointer shrink-0 transition-colors ${stackingControl ? 'bg-[#0D7A53]' : 'bg-[#EFECE6]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${stackingControl ? 'translate-x-4' : 'left-0.5'}`}></div>
            </div>
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
            <div onClick={() => setExpirationWindow('Dynamic Qualification Window')} className={`border-2 rounded-xl p-5 relative shadow-sm cursor-pointer transition-all ${expirationWindow === 'Dynamic Qualification Window' ? 'bg-[#FDF8EB] border-[#D4A753]' : 'bg-[#FAF8F5] border-[#EFECE6] opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-white border ${expirationWindow === 'Dynamic Qualification Window' ? 'border-4 border-[#D4A753]' : 'border-[#D1CDC7]'}`}></div>
                  <span className="text-[12px] font-bold text-[#1A1615]">Dynamic Qualification Window</span>
                </div>
                {expirationWindow === 'Dynamic Qualification Window' && <span className="text-[9px] font-bold tracking-widest text-[#9E782F] uppercase">STANDARD</span>}
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

            <div onClick={() => setExpirationWindow('Fixed Calendar Deadline')} className={`border-2 rounded-xl p-5 relative shadow-sm cursor-pointer transition-all ${expirationWindow === 'Fixed Calendar Deadline' ? 'bg-[#FDF8EB] border-[#D4A753]' : 'bg-[#FAF8F5] border-[#EFECE6] opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-white border ${expirationWindow === 'Fixed Calendar Deadline' ? 'border-4 border-[#D4A753]' : 'border-[#D1CDC7]'}`}></div>
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

  const renderDashboard = () => (
    <div className="min-h-screen bg-[#FAF8F5] p-6 lg:p-10 font-sans text-[#1A1615]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#1A1615] mb-2 leading-none">Campaign &amp; Loyalty Management</h1>
            <p className="text-[14px] text-[#6E6A66] font-medium">Create, monitor, and optimize your customer engagement programs.</p>
          </div>
          <button onClick={() => { setViewMode('builder'); setCurrentStep(1); }} className="px-6 py-3 bg-[#1A1615] text-white rounded-xl text-sm font-bold shadow-md hover:bg-black transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Create New Campaign
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white border border-[#EFECE6] rounded-xl p-4 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-[#9E9A93]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              placeholder="Search campaigns by name or reward..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-[#EFECE6] rounded-lg bg-[#FAF8F5] text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A753] focus:border-[#D4A753]"
            />
          </div>
          <div className="grid grid-cols-2 md:flex md:items-center gap-3 w-full md:w-auto">
            <select className="w-full md:w-auto border border-[#EFECE6] rounded-lg bg-[#FAF8F5] py-2.5 px-2 md:px-4 text-xs md:text-sm font-semibold text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#D4A753]">
              <option>All Types</option>
              <option>Visit Type</option>
              <option>Billing Type</option>
              <option>Stamp Type</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto border border-[#EFECE6] rounded-lg bg-[#FAF8F5] py-2.5 px-2 md:px-4 text-xs md:text-sm font-semibold text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#D4A753]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Ended</option>
            </select>
          </div>
        </div>

        {/* Campaign List */}
        <div className="bg-white border border-[#EFECE6] rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#EFECE6]">
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#9E9A93]">Campaign Info</th>
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#9E9A93]">Type &amp; Target</th>
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#9E9A93]">Status</th>
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#9E9A93]">Timeline</th>
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#9E9A93]">Performance</th>
                  <th className="py-3 px-5 text-[11px] font-bold uppercase tracking-wider text-[#9E9A93] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.filter(c =>
                  (statusFilter === 'All' || statusFilter === 'All Status' || c.status === statusFilter) &&
                  (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.reward.toLowerCase().includes(searchQuery.toLowerCase()))
                ).map(c => (
                  <tr key={c.id} className="border-b border-[#EFECE6] hover:bg-[#FAF8F5]/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="text-sm font-bold text-[#1A1615] mb-0.5">{c.name}</div>
                      <div className="text-xs font-medium text-[#6E6A66] flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> {c.reward}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-sm font-semibold text-[#1A1615] mb-0.5">{c.type}</div>
                      <div className="text-[11px] font-bold text-[#9E782F] uppercase tracking-wider bg-[#FDF8EB] border border-[#F3E5C8] inline-block px-2 py-0.5 rounded">{c.target}</div>
                    </td>
                    <td className="py-4 px-5">
                      {c.status === 'Active' ? (
                        <span className="px-2.5 py-1 bg-[#E0F9ED] border border-[#BCE3D1] text-[#0D7A53] rounded-full text-[11px] font-bold uppercase flex items-center w-max gap-1">
                          <span className="w-1.5 h-1.5 bg-[#0D7A53] rounded-full"></span> {c.status}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-[#EFECE6] text-[#6E6A66] rounded-full text-[11px] font-bold uppercase flex items-center w-max gap-1">
                          <span className="w-1.5 h-1.5 bg-[#9E9A93] rounded-full"></span> {c.status}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-xs font-semibold text-[#1A1615]">{c.startDate}</div>
                      <div className="text-[11px] text-[#6E6A66]">{c.endDate}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="h-1.5 flex-1 bg-[#EFECE6] rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4A753] rounded-full" style={{ width: `${c.progress}%` }}></div>
                        </div>
                        <span className="text-[11px] font-bold text-[#1A1615] w-8">{c.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right space-x-2 flex justify-end">
                      <button onClick={() => { setViewMode('builder'); setCurrentStep(1); }} className="p-1.5 text-[#6E6A66] hover:text-[#D4A753] bg-white border border-[#EFECE6] rounded-lg shadow-sm transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#6E6A66] hover:text-[#1A1615] bg-white border border-[#EFECE6] rounded-lg shadow-sm transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#6E6A66] hover:text-[#EF4444] bg-white border border-[#EFECE6] rounded-lg shadow-sm transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Accordion List */}
          <div className="md:hidden flex flex-col">
            {campaigns.filter(c =>
              (statusFilter === 'All' || statusFilter === 'All Status' || c.status === statusFilter) &&
              (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.reward.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map((c) => {
              const isExpanded = expandedCampaignId === c.id;

              return (
                <div key={c.id} className="border-b border-[#EFECE6] last:border-b-0 overflow-hidden">
                  <button
                    onClick={() => setExpandedCampaignId(isExpanded ? null : c.id)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#FAF8F5] transition-colors text-left"
                  >
                    <div>
                      <div className="text-sm font-bold text-[#1A1615] mb-1">{c.name}</div>
                      <div className="text-xs font-medium text-[#6E6A66] flex items-center gap-1.5 mb-2"><Gift className="w-3.5 h-3.5" /> {c.reward}</div>

                      {c.status === 'Active' ? (
                        <span className="px-2 py-0.5 bg-[#E0F9ED] border border-[#BCE3D1] text-[#0D7A53] rounded-full text-[10px] font-bold uppercase flex items-center w-max gap-1">
                          <span className="w-1.5 h-1.5 bg-[#0D7A53] rounded-full"></span> {c.status}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#EFECE6] text-[#6E6A66] rounded-full text-[10px] font-bold uppercase flex items-center w-max gap-1">
                          <span className="w-1.5 h-1.5 bg-[#9E9A93] rounded-full"></span> {c.status}
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 ml-3">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-[#8C827A]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#8C827A]" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-[#FAF8F5] border-t border-[#EFECE6] space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1 block">Type</span>
                          <div className="text-xs font-semibold text-[#1A1615]">{c.type}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1 block">Target</span>
                          <div className="text-[10px] font-bold text-[#9E782F] uppercase tracking-wider bg-[#FDF8EB] border border-[#F3E5C8] inline-block px-1.5 py-0.5 rounded">{c.target}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1 block">Start Date</span>
                          <div className="text-xs font-semibold text-[#1A1615]">{c.startDate}</div>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-1 block">End Date</span>
                          <div className="text-[10px] font-semibold text-[#6E6A66]">{c.endDate}</div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#9E9A93] uppercase tracking-wider mb-2 block">Performance ({c.progress}%)</span>
                        <div className="h-1.5 w-full bg-[#EFECE6] rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4A753] rounded-full" style={{ width: `${c.progress}%` }}></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#EFECE6]">
                        <button onClick={() => { setViewMode('builder'); setCurrentStep(1); }} className="flex-1 py-2 bg-white text-[#1A1615] border border-[#EFECE6] font-semibold text-xs rounded-lg hover:bg-[#FAF8F5] transition-colors flex justify-center items-center gap-1.5">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button className="flex-1 py-2 bg-white text-[#1A1615] border border-[#EFECE6] font-semibold text-xs rounded-lg hover:bg-[#FAF8F5] transition-colors flex justify-center items-center gap-1.5">
                          <Copy className="w-3.5 h-3.5" /> Dup
                        </button>
                        <button className="flex-1 py-2 bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA] font-semibold text-xs rounded-lg hover:bg-[#FCA5A5] transition-colors flex justify-center items-center gap-1.5">
                          <Trash2 className="w-3.5 h-3.5" /> Del
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (viewMode === 'dashboard') {
    return renderDashboard();
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-[#1A1615] md:pb-24 relative">

      {/* Add Location Modal */}
      {isAddLocationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#1A1615]">Add Location</h3>
              <button onClick={() => setIsAddLocationOpen(false)} className="text-[#9E9A93] hover:text-[#1A1615] bg-[#FAF8F5] p-2 rounded-full transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#6E6A66] mb-1.5">Search Branch/Outlet</label>
                <input type="text" placeholder="e.g. Downtown Flagship" className="w-full px-4 py-2.5 border border-[#EFECE6] bg-[#FAF8F5] rounded-lg text-sm focus:outline-none focus:border-[#D4A753]" />
              </div>
              <button onClick={() => setIsAddLocationOpen(false)} className="w-full py-3 bg-[#1A1615] text-white rounded-lg text-sm font-bold mt-2 shadow-md hover:bg-black transition-colors cursor-pointer">Confirm Location</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SHARED LAYOUT & TOP HEADER BAR */}
      {/* Mobile Header */}
      {/* <div className="lg:hidden bg-[#FAF8F5] px-4 py-3 flex items-center justify-between z-20 sticky top-0 border-b border-[#EFECE6]">
        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
          <ArrowLeft className="w-5 h-5 text-[#1A1615]" />
        </button>
        <div className="text-center">
          <div className="text-[10px] font-bold text-[#D4A753] uppercase tracking-widest mb-0.5">Revia Merchant</div>
          <div className="text-base font-black text-[#1A1615] leading-none">Campaign Wizard</div>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sm font-bold text-[#1A1615] shadow-sm">ER</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#0D7A53] rounded-full border-2 border-white"></div>
        </div>
      </div> */}

      <div className="hidden lg:flex bg-white border-b border-[#EFECE6] px-4 sm:px-6 py-6 flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 z-20 shadow-xs">
        <div className="flex items-start gap-4">
          <button onClick={() => setViewMode('dashboard')} className="mt-1 p-2 bg-[#FAF8F5] text-[#1A1615] hover:bg-[#EFECE6] border border-[#EFECE6] rounded-lg transition-colors cursor-pointer" title="Back to Dashboard">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#1A1615] mb-2 leading-none">Campaign Builder</h1>
            <p className="text-[14px] text-[#6E6A66] font-medium max-w-xl">Audit parameters, preview the live guest pass token, and deploy the campaign across roastery registers.</p>
          </div>
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
        <div className="lg:hidden flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button onClick={() => setCurrentStep(prev => prev - 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-[#EFECE6] rounded-full text-[#1A1615] shadow-sm cursor-pointer shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="text-[10px] font-bold text-[#9E782F] uppercase tracking-widest mb-0.5">Campaign Builder</div>
              <div className="text-[13px] text-[#6E6A66]">Step {currentStep} of 5 · {steps.find(s => s.id === currentStep)?.name}</div>
            </div>
          </div>
          <div className="px-3 py-1 bg-white border border-[#EFECE6] rounded-full text-[11px] font-bold text-[#1A1615] flex items-center gap-1.5 shadow-sm shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> 20% Ready
          </div>
        </div>

        <div className="flex justify-between lg:bg-white lg:border lg:border-[#EFECE6] lg:rounded-xl px-2 lg:px-4 lg:py-6 lg:shadow-sm mb-6 relative">
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-[#EFECE6] z-0 hidden md:block"></div>
          {/* Mobile horizontal line */}
          <div className="absolute top-4 left-[10%] right-[10%] h-[1px] bg-[#D1CDC7] z-0 lg:hidden"></div>
          {steps.map((step) => {
            const isPast = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} onClick={() => setCurrentStep(step.id)} className="relative z-10 flex flex-col items-center flex-1 cursor-pointer group">
                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all relative z-10 ${isPast ? 'bg-[#0D7A53] text-white border-2 border-[#0D7A53]' : isCurrent ? 'bg-gradient-to-b from-[#D4A753] to-[#9E782F] text-white border-2 border-[#D4A753] ring-4 ring-[#FDF8EB]' : 'bg-white border-2 border-[#EFECE6] text-[#9E9A93] group-hover:border-[#D1CDC7]'}`}>
                  {isPast ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="mt-2 text-center w-full px-2">
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

      {/* Sticky Bottom Action Bar (Static on mobile) */}
      <div className="relative md:fixed bottom-0 left-0 right-0 bg-transparent md:bg-white border-t-0 md:border-t border-[#EFECE6] p-4 flex flex-col md:flex-row md:items-center justify-between z-30 md:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:pl-[280px] gap-3 md:gap-0 mt-6 md:mt-0">
        {currentStep !== 5 && (
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-[#6E6A66] md:hidden mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> Autosaved just now · Basics Valid
          </div>
        )}
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
            <div className="hidden md:flex items-center gap-4 text-[11px] font-bold text-[#6E6A66]">
              <span>• Draft autosaved just now</span>
              <span className="text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">• Validation Passed</span>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
              {currentStep > 1 && (
                <button onClick={() => setCurrentStep(prev => prev - 1)} className="hidden md:flex px-4 py-3 md:py-2 bg-[#FAF8F5] md:bg-white border border-[#EFECE6] rounded-lg text-[13px] md:text-xs font-bold text-[#1A1615] hover:bg-[#EFECE6] md:hover:bg-[#FAF8F5] transition-colors items-center justify-center md:justify-start gap-1.5 cursor-pointer flex-1 md:flex-none">
                  <ArrowLeft className="w-4 h-4 md:w-3.5 md:h-3.5" /> <span className="hidden md:inline">Back</span>
                </button>
              )}
              <button className="px-4 py-3 md:py-2 bg-[#FAF8F5] md:bg-white border border-[#EFECE6] rounded-lg text-[13px] md:text-xs font-bold text-[#1A1615] hover:bg-[#EFECE6] md:hover:bg-[#FAF8F5] transition-colors cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-0">
                <Bookmark className="w-4 h-4 md:hidden shrink-0" />
                <span className="md:hidden text-center leading-tight">Save<br />Draft</span>
                <span className="hidden md:inline">Save as Draft</span>
              </button>
              {currentStep < 5 && (
                <button onClick={() => setCurrentStep(prev => prev + 1)} className="px-6 py-3 md:py-2 bg-[#9E782F] md:bg-gradient-to-b md:from-[#D4A753] md:to-[#9E782F] hover:opacity-95 text-white rounded-lg text-[13px] md:text-xs font-bold shadow-md transition-opacity flex items-center justify-center md:justify-start gap-2 md:gap-1.5 cursor-pointer flex-[2] md:flex-none">
                  <span className="md:hidden">Continue to {steps.find(s => s.id === currentStep + 1)?.name}</span>
                  <span className="hidden md:inline">Continue to {steps.find(s => s.id === currentStep + 1)?.name}</span>
                  <ArrowRight className="w-4 h-4 md:w-3.5 md:h-3.5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Global Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#1A1615] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up border border-[#332e2d]">
          <CheckCircle2 className="w-5 h-5 text-[#D4A753]" />
          <span className="text-sm font-bold">{feedbackToast}</span>
        </div>
      )}

    </div>
  );
};
