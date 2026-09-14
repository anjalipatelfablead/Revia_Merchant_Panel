import React, { useState } from 'react';
import { 
  Users, Coffee, HeartPulse, Clock, ArrowRight, ShieldCheck, 
  CheckCircle2, Wine, Droplets, ChevronDown, CheckSquare, Square
} from 'lucide-react';
import { CustomerHeader } from '../../components/shared/CustomerHeader';

export const CurateExperienceScreen = ({ onConfirm }: { onConfirm: () => void }) => {
  const [partySize, setPartySize] = useState('party-2');
  const [flight, setFlight] = useState('coffee');
  const [tags, setTags] = useState(['dairy-free', 'plant-forward']);
  const [notes, setNotes] = useState('');
  const [pacing, setPacing] = useState('leisurely');
  const [saveCloud, setSaveCloud] = useState(true);

  const toggleTag = (id: string) => {
    setTags(p => p.includes(id) ? p.filter(t => t !== id) : [...p, id]);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#F8F6F0] font-sans overflow-y-auto">
      <CustomerHeader
        mode="light"
        bgColor="bg-[#F8F6F0]/95 backdrop-blur-md"
        position="sticky"
        transparentOnTop={false}
        borderClass="border-b border-[#EAE3D9]"
      />
      
      <div className="w-full max-w-[1280px] mx-auto flex flex-col flex-1 px-5 lg:px-8">
        
        {/* Header */}
        <header className="w-full py-8 lg:py-12 flex flex-col lg:flex-row justify-between items-start gap-6 border-b border-[#EAE3D9]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3EFE7] text-[#9A7436] text-[10px] font-black uppercase tracking-widest mb-5 border border-[#EAE3D9]">
              Bespoke Salon Preferences • Table 14
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-[#111] mb-3 tracking-tight">Curate Your Tasting & Dining Experience</h1>
            <p className="text-[13px] text-[#666] leading-relaxed">
              Personalize your cellar service, dietary nuances, flight pacing, and sensory ambience for this afternoon's residency at Salon Cavendish.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white border border-[#EAE3D9] rounded-2xl p-3 pr-4 shadow-sm shrink-0">
            <div className="w-12 h-12 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center rounded-xl" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#888] mb-0.5">Lead Concierge On-Service</p>
              <p className="text-[13px] font-bold text-[#111] leading-tight">Julian Vance, MS</p>
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#111] uppercase tracking-widest border border-[#EAE3D9] bg-[#F8F6F0] px-4 py-2 rounded-lg ml-2 hover:bg-[#EAE3D9]/50 transition-colors">
              <span className="text-lg leading-none">🥂</span> Inquire
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start flex-1">
          
          {/* Left Column - Preferences */}
          <div className="w-full lg:flex-1 shrink-0 space-y-8">
            
            {/* Guest Seating */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#111] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#9A7436]" />
                  Guest Seating & Party Configuration
                </h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#1C8A54] bg-[#F0FFF8] px-2 py-1 rounded border border-[#1C8A54]/20">Last Room Guarantee</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {[
                  { id: 'solo', label: 'Solo', sub: 'Solitary Residency' },
                  { id: 'party-2', label: 'Party of 2', sub: 'Active Manifest' },
                  { id: 'party-4', label: 'Party of 4', sub: 'Atelier Table' },
                  { id: 'salon-6', label: 'Salon 6+', sub: 'Private Room' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setPartySize(opt.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${partySize === opt.id ? 'bg-[#111] border-[#111] shadow-[0_4px_20px_rgba(0,0,0,0.15)]' : 'bg-white border-[#EAE3D9] hover:border-[#D1C9B9] shadow-sm'}`}
                  >
                    <span className={`text-[13px] font-black mb-0.5 ${partySize === opt.id ? 'text-white' : 'text-[#111]'}`}>{opt.label}</span>
                    <span className={`text-[9px] font-bold ${partySize === opt.id ? 'text-[#9A7436]' : 'text-[#888]'}`}>{opt.sub}</span>
                  </button>
                ))}
              </div>
              <div className="bg-[#F3EFE7] rounded-lg px-4 py-2.5 flex items-center justify-between">
                <p className="text-[11px] text-[#666]"><span className="font-bold text-[#111]">Host: Lord Sterling-Vance</span> • Companion Guest Profile(s) fully flexed</p>
                <p className="text-[10px] font-black text-[#9A7436]">+44 (Grests)</p>
              </div>
            </div>

            {/* Beverage Flights */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#111] flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-[#9A7436]" />
                  Sensory Extraction & Beverage Flights
                </h3>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#888]">Wine/Reserve Selection Available</span>
              </div>
              <div className="space-y-3">
                {[
                  { 
                    id: 'coffee', 
                    title: 'Rare Micro-Lot Coffee Journey', 
                    desc: 'Panama Geisha cold-vault vintage extractions, Japanese siphon ceremonials, and single-estate macerates. Honey process botanical bespoke degrees.',
                    badge: 'Master Selected',
                    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=200'
                  },
                  { 
                    id: 'wine', 
                    title: 'Grand Cru Wine & Vintage Champagne Pairing', 
                    desc: 'Rare reserve allocation. Assorted off-menu prestige cuvées. Vintage Champagnes accompanied by surplus terroir pairings. Direct from Master Cellar.',
                    badge: 'Cellar Vault',
                    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=200'
                  },
                  { 
                    id: 'elixirs', 
                    title: 'Botanical Non-Alcoholic Elixirs', 
                    desc: 'Artisanal wild herbs, sparkling Scottish peat infusions, and smoked fig nectars poured dynamically at tableside. 0.0% ABV.',
                    badge: 'Zero-Proof',
                    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200'
                  }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setFlight(opt.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all relative overflow-hidden ${flight === opt.id ? 'bg-[#FFFCF5] border-[#9A7436] shadow-[0_2px_20px_rgba(154,116,54,0.08)]' : 'bg-white border-[#EAE3D9] hover:border-[#D1C9B9] shadow-sm'}`}
                  >
                    <img src={opt.img} alt={opt.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[13px] font-black ${flight === opt.id ? 'text-[#111]' : 'text-[#333]'}`}>{opt.title}</span>
                        <span className="bg-[#F8F6F0] border border-[#EAE3D9] text-[#111] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">{opt.badge}</span>
                      </div>
                      <p className="text-[11px] text-[#666] leading-relaxed pr-6">{opt.desc}</p>
                    </div>
                    {flight === opt.id && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#9A7436] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Nuances */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#111] flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-[#9A7436]" />
                  Dietary Nuances & Flavor Profile Tags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { id: 'gluten-free', label: 'Gluten-Sensitive' },
                  { id: 'dairy-free', label: 'Dairy Free / Oat Emulsion' },
                  { id: 'plant-forward', label: 'Plant-Forward Artisan' },
                  { id: 'nut-allergy', label: 'Nut Allergy Mute' },
                  { id: 'low-tannin', label: 'Low-Tannin Pacing' },
                  { id: 'decaf', label: 'Decaffeinated Micro-Lot Option' }
                ].map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all border ${tags.includes(tag.id) ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-[#444] border-[#EAE3D9] hover:bg-[#F3EFE7]'}`}
                  >
                    {tag.label} {tags.includes(tag.id) && '✓'}
                  </button>
                ))}
              </div>
              
              <div className="bg-[#F8F6F0] rounded-xl p-5 border border-[#EAE3D9]">
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#888] mb-3">Special Sommelier or Salon Notes</p>
                <textarea 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Inform sommeliers of specific vintage cellar desires, preferred seating ambient temperature, or specialized floral placement requests..."
                  className="w-full bg-transparent outline-none text-[13px] text-[#111] placeholder:text-[#999] resize-none h-20"
                />
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#EAE3D9]">
                  <span className="text-[10px] font-bold text-[#1C8A54] flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Transmitted securely to Head Waiter</span>
                  <span className="text-[10px] text-[#999]">0 / 500 chars Allowed</span>
                </div>
              </div>
            </div>

            {/* Residency Pacing */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#111] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#9A7436]" />
                  Residency Service Pacing/Dynamics
                </h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#9A7436]">Synchronized with Kitchen</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'leisurely', title: 'Leisurely Curation', desc: '90 - 120 mins cadenced. Extended lingering between tasting courses.', sub: '12-Course Default' },
                  { id: 'classic', title: 'Classic Atelier', desc: '60 min structurally paced. Synchronized venueings offerings.', sub: 'Standardized Flow' },
                  { id: 'executive', title: 'Executive Flight', desc: '40 min direct staging. Compact flights. Delivered dynamically on demand.', sub: 'Prompt Service' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setPacing(opt.id)}
                    className={`flex flex-col text-left p-5 rounded-2xl border transition-all ${pacing === opt.id ? 'bg-[#111] border-[#111] shadow-xl shadow-black/10' : 'bg-[#F3EFE7] border-[#EAE3D9] hover:bg-white'}`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${pacing === opt.id ? 'text-[#9A7436]' : 'text-[#666]'}`}>Pacing Protocol</span>
                    <span className={`text-sm font-black mb-2 ${pacing === opt.id ? 'text-white' : 'text-[#111]'}`}>{opt.title}</span>
                    <p className={`text-[11px] leading-relaxed mb-4 flex-1 ${pacing === opt.id ? 'text-[#888]' : 'text-[#666]'}`}>{opt.desc}</p>
                    <span className={`text-[10px] font-bold ${pacing === opt.id ? 'text-[#9A7436]' : 'text-[#444]'}`}>{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Info Cards */}
          <div className="w-full lg:w-[420px] shrink-0 space-y-6">
            
            {/* Live Allocation */}
            <div className="bg-white rounded-[24px] p-6 border border-[#EAE3D9] shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black text-[#9A7436] uppercase tracking-[0.2em] mb-1">Live Allocation</p>
                  <h3 className="text-xl font-black text-[#111]">Salon Cavendish</h3>
                  <p className="text-[11px] text-[#666]">Table 14 Leather Banquette</p>
                </div>
                <div className="bg-[#F0FFF8] px-3 py-1 rounded-full border border-[#1C8A54]/20 text-[#1C8A54] text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#1C8A54] rounded-full inline-block animate-pulse" />
                  Table Ready
                </div>
              </div>
              
              <div className="relative w-full h-[180px] rounded-xl overflow-hidden mb-5">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" alt="Dining Room" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 text-[10px] font-black text-[#9A7436] uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Authenticated via Cryptographic Beacon
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { label: 'Host Sommelier', val: 'Julian Vance' },
                  { label: 'Mixologist Maestro', val: 'Henri de Valois' },
                  { label: 'Sommelier Commis', val: 'Silk Cello Quintado' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[#F3EFE7] last:border-0 last:pb-0">
                    <span className="text-[11px] text-[#888]">{item.label}</span>
                    <span className="text-[13px] font-black text-[#111]">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve Black Privilege */}
            <div className="bg-[#111] rounded-[24px] p-6 border border-[#222] shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2 text-[#9A7436]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-black tracking-tight">Reserve Black Privilege</span>
                </div>
                <span className="bg-[#9A7436]/10 border border-[#9A7436]/30 text-[#9A7436] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">Unlocked</span>
              </div>
              <div className="space-y-4">
                {[
                  'Complimentary Master Roaster double signature Reserve Tasting flat white.',
                  'Cellar Allocations Unlocked: 2018 DRC & 2002 Pol Roger reserved exclusively for your board.',
                  '$15 member VIP Tasting Credit automatically recognized for billing.'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#1C8A54]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#1C8A54]" />
                    </div>
                    <p className="text-[11px] text-white/80 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="bg-white rounded-[24px] p-6 border border-[#EAE3D9] shadow-sm">
              <button 
                onClick={onConfirm}
                className="w-full h-16 bg-gradient-to-r from-[#B89454] to-[#9A7436] hover:from-[#A68345] hover:to-[#886630] text-white rounded-xl font-black text-sm flex items-center justify-between px-6 transition-all shadow-xl shadow-[#9A7436]/20 group mb-4"
              >
                Confirm Preferences & View Menu
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button onClick={() => setSaveCloud(!saveCloud)} className="flex items-start gap-3 text-left group">
                <div className="mt-0.5 text-[#B89454]">
                  {saveCloud ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                </div>
                <p className="text-[10px] text-[#666] leading-relaxed group-hover:text-[#444] transition-colors">
                  Save these refined preferences to my cloud telemetry VIP profile for future Revia Mayfair reservations.
                </p>
              </button>

              <div className="mt-4 pt-4 border-t border-[#EAE3D9] text-center">
                <p className="text-[9px] text-[#999] uppercase tracking-widest leading-relaxed">
                  Preferences can be aggressively shifted with Sommelier Vance directly at your table at any time.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};
