import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  QrCode,
  Smartphone,
  Edit2,
  TrendingUp,
  Activity,
  CheckCircle2,
  ChevronDown,
  Info,
  Layers,
  Zap,
  Clock,
  MapPin
} from 'lucide-react';

export const QrCodesPage: React.FC = () => {
  const [activeAsset, setActiveAsset] = useState<string>('asset-1');
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  const [searchQuery, setSearchQuery] = useState('');

  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };
  const [venueFilter, setVenueFilter] = useState('VENUE: Downtown Flagship');
  const [assetTypeFilter, setAssetTypeFilter] = useState('ASSET TYPE: All (Acrylic, Brass, NFC)');
  const [destinationFilter, setDestinationFilter] = useState('DESTINATION: All Routing Targets');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedActionAsset, setSelectedActionAsset] = useState<any>(null);

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

  const assets = [
    {
      id: 'asset-1',
      title: 'Downtown Flagship • Tabletop Acrylic #01 to #08',
      status: 'Active',
      inspecting: true,
      location: 'Main Salon Dining',
      material: 'Acrylic Dual-Sided A6 (Walnut Base)',
      destination: 'VIP Onboarding + Instant 1st Stamp Perk',
      scans: '14,210',
      tag: 'NFC + QR',
    },
    {
      id: 'asset-2',
      title: 'Downtown Flagship • Counter Barista NFC/QR Puck #01',
      status: 'Active',
      inspecting: false,
      location: 'Espresso Bar Order Point',
      material: 'Milled Brass & Smoked Ash Puck',
      destination: 'Quick Loyalty Stamp + Wallet Pass Tap',
      scans: '18,450',
      tag: 'Direct NFC Priority',
    },
    {
      id: 'asset-3',
      title: 'Northside Mall • Atrium Patio Stand #A1–#A5',
      status: 'Active',
      inspecting: false,
      location: 'Outdoor Garden Lounge',
      material: 'Brushed Anodized Aluminum',
      destination: 'Afternoon 2x Points Happy Hour Portal',
      scans: '6,120',
      tag: 'Time-Gated Routing',
    },
    {
      id: 'asset-4',
      title: 'West End Kiosk • Commuter Window Sticker #01',
      status: 'Active',
      inspecting: false,
      location: 'Express Curbside Pickup Bay',
      material: 'UV Weatherproof Vinyl Decal',
      destination: 'Fast Mobile Quick-Order & Repeat Perk',
      scans: '4,110',
      tag: 'Geo-Fenced Beacon',
    }
  ];

  const filteredAssets = assets.filter(a => {
    const searchMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());

    let venueMatch = true;
    if (venueFilter !== 'VENUE: All') {
      if (venueFilter.includes('Downtown')) venueMatch = a.title.includes('Downtown');
      else if (venueFilter.includes('Northside')) venueMatch = a.title.includes('Northside');
      else if (venueFilter.includes('West End')) venueMatch = a.title.includes('West End');
    }

    let typeMatch = true;
    if (assetTypeFilter !== 'ASSET TYPE: All (Acrylic, Brass, NFC)') {
      if (assetTypeFilter.includes('Acrylic')) typeMatch = a.material.includes('Acrylic');
      else if (assetTypeFilter.includes('Brass')) typeMatch = a.material.includes('Brass');
    }

    return searchMatch && venueMatch && typeMatch;
  });

  const selectedAssetDetails = assets.find(a => a.id === activeAsset) || assets[0];

  const DropdownSelect = ({ id, value, options, onChange }: { id: string, value: string, options: string[], onChange: (v: string) => void }) => (
    <div className="relative" ref={openDropdown === id ? dropdownRef : null}>
      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] rounded-md hover:bg-[#EFECE6] transition-colors whitespace-nowrap shrink-0"
      >
        {value} <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {openDropdown === id && (
        <div className="absolute top-full mt-1 left-0 min-w-[200px] bg-white border border-[#EFECE6] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
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

  return (
    <>
      <div className="p-4 sm:p-6 bg-[#FAF8F5] min-h-[calc(100vh-4rem)] space-y-6">
        {/* Bottom Toast Feedback */}
        {feedbackToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1A1615] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-[#3D3732] animate-in slide-in-from-bottom-5 fade-in">
            <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
            <span>{feedbackToast}</span>
          </div>
        )}

        {/* 2. NAVIGATION & PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight">
                QR Codes &amp; Physical Asset Hub
              </h1>
              <div className="hidden sm:flex items-center gap-2">
                {/* <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded border border-[#BCE3D1] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> DYNAMIC ROUTING FABRIC
                </span> */}
                {/* <span className="px-2.5 py-1 text-[10px] font-bold bg-white text-[#1A1615] rounded border border-[#EFECE6] tracking-wider uppercase">
                  18 ACTIVE ASSETS
                </span> */}
              </div>
            </div>
            <p className="text-sm text-[#6E6A66] max-w-3xl">
              Manage contactless tabletop stands, counter acrylics, digital pass enrollment codes, and multi-venue scan routing with instantaneous cloud redirect dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1A1615] bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-xl transition-colors shadow-sm cursor-pointer">
              <Download className="w-4 h-4" />
              Download Print PDF Pack
            </button>
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-b from-[#D4A753] to-[#9E782F] rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer">
              <Plus className="w-4 h-4" />
              Create Dynamic Stand
            </button>
          </div>
        </div>

        {/* 3. TOP KPI METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="bg-white rounded-xl border border-[#EFECE6] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Total Active Stands</div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FDF8EB] text-[#D4A753] border border-[#F3E5C8] rounded">
                +3 this month
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A1615] mb-1">18 Stands</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">16 Acrylic • 2 Milled Brass</div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white rounded-xl border border-[#EFECE6] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">30-Day Physical Scans</div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] border border-[#BCE3D1] rounded flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +21.4%
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A1615] mb-1">42,890 scans</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">Table &amp; Counter combined</div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white rounded-xl border border-[#EFECE6] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Scan-to-Pass Enrolled</div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] rounded">
                High Yield
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A1615] mb-1">68.2% conversion</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">Guest to Wallet Member</div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white rounded-xl border border-[#EFECE6] p-5 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93]">Routing Health</div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] rounded uppercase">
                28ms LATENCY
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A1615] mb-1">99.9% Online</div>
              <div className="text-[11px] font-semibold text-[#6E6A66]">Zero 404 dead links</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 4. LEFT SECTION: ASSET INVENTORY MANAGEMENT */}
          <div className="lg:col-span-7 space-y-4">

            {/* Filter & Search Toolbar */}
            <div className="bg-white rounded-xl border border-[#EFECE6] p-4 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stand ID, venue, table or zone..."
                    className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-sm focus:outline-none focus:border-[#D4A753] focus:ring-1 focus:ring-[#D4A753]/20 transition-all text-[#1A1615] font-semibold"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1A1615] bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer shrink-0">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EFECE6]">
                <div className="flex flex-wrap items-center gap-2">
                  <DropdownSelect
                    id="venue"
                    value={venueFilter}
                    options={['VENUE: All', 'VENUE: Downtown Flagship', 'VENUE: Northside Mall', 'VENUE: West End Kiosk']}
                    onChange={setVenueFilter}
                  />
                  <DropdownSelect
                    id="type"
                    value={assetTypeFilter}
                    options={['ASSET TYPE: All (Acrylic, Brass, NFC)', 'ASSET TYPE: Acrylic', 'ASSET TYPE: Brass']}
                    onChange={setAssetTypeFilter}
                  />
                  <DropdownSelect
                    id="dest"
                    value={destinationFilter}
                    options={['DESTINATION: All Routing Targets']}
                    onChange={setDestinationFilter}
                  />
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-[#9E9A93]">
                  Showing {filteredAssets.length} of {assets.length}
                </div>
              </div>
            </div>

            {/* Asset List Cards */}
            <div className="space-y-3">
              {filteredAssets.map((asset) => {
                const isActive = activeAsset === asset.id;
                return (
                  <div
                    key={asset.id}
                    onClick={() => setActiveAsset(asset.id)}
                    className={`bg-white rounded-xl border-2 p-5 transition-all cursor-pointer shadow-xs hover:shadow-sm ${isActive ? 'border-[#D4A753]' : 'border-[#EFECE6] hover:border-[#D1CDC7]'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox mock */}
                      <div className="shrink-0 mt-1">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-[#D4A753] border-[#D4A753] text-white' : 'bg-[#FAF8F5] border-[#D1CDC7]'}`}>
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-[15px] font-bold text-[#1A1615] truncate">{asset.title}</h3>
                          <div className="flex items-center gap-2 shrink-0 relative">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedActionAsset(asset); setIsEditModalOpen(true); }}
                              className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] rounded bg-[#FAF8F5] transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedActionAsset(asset); setIsDownloadModalOpen(true); }}
                              className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] rounded bg-[#FAF8F5] transition-colors"><Download className="w-3.5 h-3.5" /></button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === asset.id ? null : asset.id); }}
                              className="p-1.5 text-[#9E9A93] hover:text-[#1A1615] rounded bg-[#FAF8F5] transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>

                            {/* Dropdown Menu */}
                            {openDropdown === asset.id && (
                              <>
                                <div className="fixed inset-0 z-[50]" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#EFECE6] rounded-xl shadow-xl z-[60] overflow-hidden">
                                  <button onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); showToast('Viewing detailed analytics...'); }} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#1A1615] hover:bg-[#FAF8F5]">View Analytics</button>
                                  <button onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); showToast('Asset temporarily paused.'); }} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#B45309] hover:bg-[#FEF3C7]">Pause Asset</button>
                                  <button onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); showToast('Asset permanently deactivated.'); }} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2]">Deactivate</button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> {asset.status}
                          </span>
                          {asset.inspecting && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FEF3C7] text-[#B45309] rounded uppercase tracking-wider">
                              Inspecting
                            </span>
                          )}
                          <span className="text-[11px] font-bold text-[#9E9A93] px-2 py-0.5 bg-[#FAF8F5] rounded border border-[#EFECE6]">{asset.tag}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6E6A66]">
                              <MapPin className="w-3.5 h-3.5 text-[#9E9A93]" /> {asset.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6E6A66]">
                              <Layers className="w-3.5 h-3.5 text-[#9E9A93]" /> {asset.material}
                            </div>
                          </div>

                          <div className="space-y-1.5 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFECE6]">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-[#9E9A93]">Cloud Destination</span>
                              <ChevronDown className="w-3 h-3 text-[#9E9A93]" />
                            </div>
                            <div className="text-xs font-bold text-[#1A1615] truncate">{asset.destination}</div>
                            <div className="text-[10px] font-semibold text-[#6E6A66] pt-1 border-t border-[#EFECE6] flex items-center gap-1.5">
                              <Activity className="w-3 h-3 text-[#0D7A53]" /> 30D SCANS: <span className="text-[#1A1615]">{asset.scans}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. RIGHT SECTION: LIVE VECTOR PREVIEW & ASSET CUSTOMIZER */}
          <div className="lg:col-span-5 sticky top-6 space-y-4">
            <div className="bg-white rounded-xl border border-[#EFECE6] shadow-sm overflow-hidden flex flex-col h-[calc(100vh-8rem)]">

              {/* Card Header & Toggle */}
              <div className="px-5 py-4 border-b border-[#EFECE6] bg-[#FAF8F5] shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#1A1615] truncate max-w-[250px]">{selectedAssetDetails.title.split(' • ')[1] || selectedAssetDetails.title}</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E0E7FF] text-[#4338CA] border border-[#C7D2FE] rounded uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4338CA] animate-pulse"></span> LIVE VECTOR PREVIEW
                  </span>
                </div>

                <div className="flex p-0.5 bg-[#EFECE6] rounded-lg">
                  <button
                    onClick={() => setActiveTab('front')}
                    className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'front' ? 'bg-white shadow-xs text-[#1A1615]' : 'text-[#6E6A66] hover:text-[#1A1615]'}`}>
                    Front Side
                  </button>
                  <button
                    onClick={() => setActiveTab('back')}
                    className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'back' ? 'bg-white shadow-xs text-[#1A1615]' : 'text-[#6E6A66] hover:text-[#1A1615]'}`}>
                    Back Side
                  </button>
                </div>
              </div>

              {/* Scrollable Configuration Area */}
              <div className="flex-1 overflow-y-auto p-5 bg-[#FDFBF7]">

                {/* Realistic Printable Stand Mockup Box */}
                <div className="flex justify-center mb-8">
                  <div className="w-[240px] bg-white rounded-t-[16px] shadow-2xl border border-[#EFECE6] relative overflow-hidden flex flex-col items-center pt-6 pb-4">
                    {/* Acrylic Gloss Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-white/80 to-transparent pointer-events-none"></div>

                    <div className="text-[9px] font-bold uppercase tracking-widest text-[#9E9A93] mb-2 z-10">• {selectedAssetDetails.title.split(' • ')[0].toUpperCase()}</div>
                    <div className="text-xs font-bold tracking-widest text-[#D4A753] uppercase mb-4 z-10">PRIVE MEMBER ACCESS</div>

                    <h4 className="text-center text-[15px] font-black text-[#1A1615] leading-tight px-6 z-10">
                      {activeTab === 'front' ? 'SCAN TO JOIN REVIA PRIVÉ' : 'REVIA PRIVÉ MEMBER PERKS'}
                    </h4>
                    <p className="text-center text-[10px] font-semibold text-[#6E6A66] px-8 mt-2 mb-6 z-10 leading-snug">
                      {activeTab === 'front' ? 'Unlock complimentary artisanal pour-over on your next reservation.' : 'Tap or scan to access your digital wallet pass and current tier benefits.'}
                    </p>

                    {/* Vector QR Code Core */}
                    <div className="w-32 h-32 bg-white border border-[#EFECE6] rounded-lg p-2 shadow-sm mb-4 z-10 relative flex items-center justify-center">
                      <QrCode className="w-full h-full text-[#1A1615]" strokeWidth={1} />
                      {/* Center Brand Emblem */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-[#1A1615]">
                          <span className="font-sans font-bold text-lg text-[#1A1615]">R</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#1A1615] uppercase tracking-widest mb-6 z-10">
                      <Smartphone className="w-3.5 h-3.5" /> OR TAP PHONE HERE (NFC)
                    </div>

                    <div className="w-full flex items-center justify-between px-6 text-[8px] font-bold text-[#9E9A93] tracking-widest uppercase z-10">
                      <span>{selectedAssetDetails.location.toUpperCase()}</span>
                      <span>DYNAMIC ROUTING {selectedAssetDetails.id.split('-')[1]}</span>
                    </div>

                    {/* Bottom Wood Base Representation */}
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#4A3B2C] border-t-2 border-[#33281E] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 bg-white border border-[#EFECE6] rounded-full text-[10px] font-bold text-[#6E6A66] tracking-widest shadow-xs">
                    ⊙ Vector Asset Ready • CMYK 300 DPI Export
                  </span>
                </div>

                {/* Material & Dynamic Routing Configuration Controls */}
                <div className="space-y-5">
                  {/* 1. Brand Foil & Acrylic Accent */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Brand Foil &amp; Acrylic Accent</label>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#EFECE6]">
                      <div className="flex items-center gap-2 border-r border-[#EFECE6] pr-3">
                        <button className="w-6 h-6 rounded-full bg-[#D4A753] ring-2 ring-offset-1 ring-[#D4A753]"></button>
                        <button className="w-6 h-6 rounded-full bg-[#1A1615] border border-[#EFECE6] hover:scale-110 transition-transform"></button>
                        <button className="w-6 h-6 rounded-full bg-[#0D7A53] border border-[#EFECE6] hover:scale-110 transition-transform"></button>
                      </div>
                      <span className="text-xs font-semibold text-[#1A1615]">Champagne Gold Hot-stamped metallic foil</span>
                    </div>
                  </div>

                  {/* 2. Dynamic Routing Target (Cloud Redirect) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Dynamic Routing Target</label>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[#FEF3C7] text-[#B45309] rounded uppercase">INSTANT SHIFT</span>
                    </div>
                    <div className="bg-white rounded-xl border border-[#EFECE6] overflow-hidden">
                      <div className="relative border-b border-[#EFECE6]">
                        <select className="w-full appearance-none px-3 py-2.5 bg-transparent text-xs font-bold text-[#1A1615] focus:outline-none cursor-pointer pr-10">
                          <option>Revia Black Tier VIP Welcome + Instant Table Perk</option>
                          <option>Standard App Enrollment &amp; Wallet Pass</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9A93] pointer-events-none" />
                      </div>
                      <div className="px-3 py-2 bg-[#FAF8F5] text-[11px] font-mono text-[#0D7A53] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]"></span> https://revia.club/df/104
                      </div>
                    </div>
                  </div>

                  {/* 3. Pattern Density & Error Correction */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Pattern Density</label>
                      <div className="relative">
                        <select className="w-full appearance-none px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-xs font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753] cursor-pointer">
                          <option>Micro-Data (Rounded)</option>
                          <option>Standard (Square)</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9A93] pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Error Correction</label>
                      <div className="relative">
                        <select className="w-full appearance-none px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-xs font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753] cursor-pointer">
                          <option>Level H (30% Damage Proof)</option>
                          <option>Level Q (25% Damage Proof)</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9A93] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* 4. Physical Material Fabric */}
                  <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#9E9A93]">Physical Material Fabric</div>
                      <div className="text-[11px] font-semibold text-[#1A1615]">{selectedAssetDetails.material}</div>
                    </div>
                    <button className="px-3 py-1.5 bg-white border border-[#EFECE6] rounded-lg text-[10px] font-bold text-[#1A1615] hover:bg-[#EFECE6] transition-colors cursor-pointer shrink-0 uppercase tracking-wider">
                      Change
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Controls Footer */}
              <div className="p-4 bg-white border-t border-[#EFECE6] shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#1A1615] bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] rounded-xl transition-colors shadow-sm cursor-pointer">
                    <Download className="w-4 h-4" />
                    Download Vector (300 DPI)
                  </button>
                  <button className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:opacity-90 rounded-xl transition-opacity shadow-sm cursor-pointer">
                    Save &amp; Push Live
                  </button>
                </div>
                <div className="text-center flex justify-center items-center gap-1.5 text-[10px] font-semibold text-[#6E6A66]">
                  <Info className="w-3.5 h-3.5" /> ⓘ Changes update cloud redirect without reprinting physical stand!
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedActionAsset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsEditModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#EFECE6] flex justify-between items-center bg-[#FAF8F5]">
              <h2 className="text-[15px] font-bold text-[#1A1615]">Edit Asset Details</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9E9A93]">Asset Title</label>
                <input type="text" defaultValue={selectedActionAsset.title} className="w-full px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#9E9A93]">Location</label>
                <input type="text" defaultValue={selectedActionAsset.location} className="w-full px-3 py-2 bg-white border border-[#EFECE6] rounded-lg text-sm font-semibold text-[#1A1615] focus:outline-none focus:border-[#D4A753]" />
              </div>
              <button
                onClick={() => { setIsEditModalOpen(false); showToast('Asset updated successfully.'); }}
                className="w-full py-2.5 bg-[#1A1615] text-white rounded-lg text-sm font-bold shadow-sm mt-2 hover:bg-black transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {isDownloadModalOpen && selectedActionAsset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={() => setIsDownloadModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b border-[#EFECE6] flex justify-between items-center bg-[#FAF8F5]">
              <h2 className="text-[15px] font-bold text-[#1A1615]">Download Files</h2>
            </div>
            <div className="p-5 space-y-3">
              <button onClick={() => { setIsDownloadModalOpen(false); showToast(`Downloading ${selectedActionAsset.title} as PDF (Print Ready)...`); }} className="w-full py-2.5 bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] text-[#1A1615] rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Download Vector PDF
              </button>
              <button onClick={() => { setIsDownloadModalOpen(false); showToast(`Downloading ${selectedActionAsset.title} as PNG...`); }} className="w-full py-2.5 bg-white border border-[#EFECE6] hover:bg-[#FAF8F5] text-[#1A1615] rounded-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Download Web PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
