import React, { useState } from 'react';
import { 
  ChevronRight, 
  Check, 
  Coffee, 
  Utensils, 
  Wine, 
  Info, 
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CustomerLandingPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All Curations');
  const [activeDietary, setActiveDietary] = useState<string[]>(['Gluten-Sensitive']);

  const toggleDietary = (diet: string) => {
    if (activeDietary.includes(diet)) {
      setActiveDietary(activeDietary.filter(d => d !== diet));
    } else {
      setActiveDietary([...activeDietary, diet]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2A2422] font-sans pb-24">
      {/* Top Banner / Navigation placeholder if needed */}
      <div className="max-w-[1600px] mx-auto p-6 lg:p-8 xl:p-10">
        
        <header className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-[#1A1615]">
            Atelier Sensory Menu & Cellar Allocations
          </h1>
          <p className="text-lg text-[#7C746C] max-w-4xl">
            Explore micro-lot extractions, tableside culinary courses, and rare vineyard pairings curated for this afternoon's residency in the Cavendish Alcove.
          </p>
        </header>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left Sidebar - Filters & Index */}
          <aside className="w-full xl:w-72 shrink-0 space-y-6">
            
            {/* Residency Index */}
            <div className="bg-white rounded-2xl p-5 border border-[#EAE6E1] shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#A37837] mb-4">Residency Index</h3>
              <ul className="space-y-1">
                {[
                  { name: 'All Curations', count: 19, active: true },
                  { name: 'Rare Micro-Lot Roasts', count: 6 },
                  { name: 'Sommelier Allocations', count: 5 },
                  { name: 'Savory Atelier Courses', count: 4 },
                  { name: 'Artisanal Pâtisserie', count: 3 },
                ].map(item => (
                  <li key={item.name}>
                    <button 
                      onClick={() => setActiveCategory(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        item.active || activeCategory === item.name 
                          ? 'bg-[#FAF6EE] text-[#A37837]' 
                          : 'text-[#5C544E] hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.active && <ChevronRight className="w-4 h-4" />}
                        {!item.active && <span className="w-4" />}
                        {item.name}
                      </span>
                      <span className={`text-xs ${item.active ? 'bg-[#F1E9D8] px-2 py-0.5 rounded-full text-[#8A652E]' : 'text-gray-400'}`}>
                        {item.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dietary Alignment */}
            <div className="bg-white rounded-2xl p-5 border border-[#EAE6E1] shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#A37837] mb-4">Dietary Alignment</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Gluten-Sensitive', 'Plant-Forward', 'Nut-Free', 'Low Tannin'].map(diet => {
                  const isActive = activeDietary.includes(diet);
                  return (
                    <button
                      key={diet}
                      onClick={() => toggleDietary(diet)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        isActive 
                          ? 'bg-[#EBF5EE] border-[#4ADE80] text-[#15803D]' 
                          : 'bg-white border-[#EAE6E1] text-[#5C544E] hover:border-gray-300'
                      }`}
                    >
                      {isActive && <Check className="w-3 h-3" />}
                      {diet}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[#7C746C]">Roast Depth Spectrum</span>
                    <span className="text-[#A37837]">Medium Amber</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D4A373] to-[#8A652E] w-1/2 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[#7C746C]">Acidity Brightness</span>
                    <span className="text-[#A37837]">Citric / Vibrant</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FDE047] to-[#F59E0B] w-3/4 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-2">
                <input type="checkbox" id="decaf" className="rounded text-[#A37837] focus:ring-[#A37837]" />
                <label htmlFor="decaf" className="text-sm text-[#5C544E]">Highlight Decaffeinated lots</label>
              </div>
            </div>

            {/* Consult Card */}
            <div className="bg-[#1A1615] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-16 h-16" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-[#2A2422] border border-[#3A3432] rounded-full flex items-center justify-center mb-3">
                  <User className="w-5 h-5 text-[#D4B58A]" />
                </div>
                <h3 className="font-bold text-lg text-white mb-1">Consult Julian Vance</h3>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Tableside guidance for extraction methods & cellar pairings.
                </p>
                <button className="w-full bg-[#3A3432] hover:bg-[#4A4442] text-[#D4B58A] border border-[#5A5452] py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  Request Pairing Advice
                </button>
              </div>
            </div>

          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-6">
            
            {/* Featured Hero Item */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#EAE6E1] shadow-sm flex flex-col">
              <div className="relative h-64 md:h-80 lg:h-96 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200" 
                  alt="Hacienda La Esmeralda Geisha" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#A37837] text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                    Private Reserve Lot #109
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                    Cupping Score: 96.4 pts
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-end gap-4">
                  <div>
                    <p className="text-[#D4B58A] text-xs font-bold uppercase tracking-widest mb-2">
                      Boquete • Panama • 1,750m
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                      Hacienda La Esmeralda Geisha
                    </h2>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gray-300 text-xs font-medium uppercase mb-1">Per Service</p>
                    <p className="text-4xl font-light text-[#D4B58A]">£28.00</p>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-white">
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                  <div className="flex-1 flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#EBF5EE] border border-[#4ADE80] text-[#15803D] flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold uppercase">Floral</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#7C746C] tracking-wider mb-1">Sensory Architecture</h4>
                      <p className="text-[#1A1615] font-medium leading-relaxed">Bergamot, Wild Peach, Honey, White Jasmine Blossom.</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold uppercase text-[#7C746C] tracking-wider mb-1">Terroir Profile</h4>
                    <p className="text-[#5C544E] text-sm leading-relaxed">
                      Natural cold-fermentation process. Exceptionally bright phosphoric tartness balanced by ethereal lemongrass-like florals.
                    </p>
                  </div>
                </div>

                <h4 className="text-xs font-bold uppercase text-[#7C746C] tracking-wider mb-3">Recommended Extraction Craft</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                  <div className="border-2 border-[#A37837] bg-[#FAF6EE] rounded-xl p-3 text-center cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#A37837] flex items-center justify-center rounded-bl-xl">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-bold text-[#1A1615] text-sm mb-1">Siphon Vacuum</p>
                    <p className="text-[#7C746C] text-xs">Purest clarity • 94°C</p>
                  </div>
                  <div className="border border-[#EAE6E1] hover:border-[#D4B58A] bg-white rounded-xl p-3 text-center cursor-pointer transition-colors">
                    <p className="font-bold text-[#1A1615] text-sm mb-1">V60 Ceramic</p>
                    <p className="text-[#7C746C] text-xs">Delicate cup • 2:15m</p>
                  </div>
                  <div className="border border-[#EAE6E1] hover:border-[#D4B58A] bg-white rounded-xl p-3 text-center cursor-pointer transition-colors">
                    <p className="font-bold text-[#1A1615] text-sm mb-1">Ice Drip Kyoto</p>
                    <p className="text-[#7C746C] text-xs">Slow chilled • 12h extract</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-[#15803D] text-sm font-medium">
                    <ShieldCheck className="w-5 h-5" />
                    Direct Farm Allocation • Lot Verified
                  </div>
                  <button className="bg-[#A37837] hover:bg-[#8A652E] text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-[#A37837]/20">
                    <Check className="w-5 h-5" />
                    Add to Tasting Flight
                  </button>
                </div>
              </div>
            </div>

            {/* Grid Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl border border-[#EAE6E1] shadow-sm overflow-hidden flex flex-col group hover:border-[#D4B58A] transition-colors">
                <div className="h-48 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" alt="Coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2.5 py-1 rounded-md text-[#1A1615]">
                    Omotesando-Style
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A37837]">Colombia • 1,900m</p>
                    <p className="font-light text-xl text-[#1A1615]">£24.00</p>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1615] mb-2 leading-tight">Cerro Azul Enano Geisha</h3>
                  <p className="text-sm text-[#5C544E] mb-4 line-clamp-3">Natural slow sun-dry processing on raised African beds. Velvety body with high complex acidity.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Medium Roast</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Pour Over</span>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-[#7C746C] font-medium">Allocation: 8 carafes</span>
                    <button className="bg-[#FAF8F5] hover:bg-[#EAE6E1] text-[#1A1615] border border-[#EAE6E1] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                      <Check className="w-4 h-4 opacity-50" /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl border border-[#EAE6E1] shadow-sm overflow-hidden flex flex-col group hover:border-[#D4B58A] transition-colors">
                <div className="h-48 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800" alt="Beans" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-[#A37837] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    Rare Spice
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A37837]">Yemen • 2,300m Terrace</p>
                    <p className="font-light text-xl text-[#1A1615]">£26.00</p>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1615] mb-2 leading-tight">Port of Mokha Matari</h3>
                  <p className="text-sm text-[#5C544E] mb-4 line-clamp-3">Centuries-old heirloom typica grown on precarious cloud terraces. Distinctive deep spice and rich fruit compote.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Dark Roast</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Ibrik Pot</span>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-[#A37837] font-bold">Limited Extraction</span>
                    <button className="bg-[#FAF8F5] hover:bg-[#EAE6E1] text-[#1A1615] border border-[#EAE6E1] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                      <Check className="w-4 h-4 opacity-50" /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Wine */}
              <div className="bg-white rounded-2xl border border-[#EAE6E1] shadow-sm overflow-hidden flex flex-col group hover:border-[#D4B58A] transition-colors">
                <div className="h-48 relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800" alt="Wine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-red-900 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    2 Pours Remaining
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A37837]">Burgundy Grand Cru • 75ml Coravin</p>
                    <p className="font-light text-xl text-[#1A1615]">£95.00</p>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1615] mb-2 leading-tight">2015 Romanée-Conti Échezeaux</h3>
                  <p className="text-sm text-[#5C544E] mb-4 line-clamp-3">Cellared under inert argon since harvest. Truffle, red licorice, crushed wild cherries, gossamer tannins.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Grand Cru</span>
                    <span className="px-2 py-1 bg-[#FAF6EE] text-[#A37837] text-[10px] font-bold uppercase rounded">Sommelier Pour</span>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-[#7C746C] font-medium">Glass #14 Reserved</span>
                    <button className="bg-[#FAF8F5] hover:bg-[#EAE6E1] text-[#1A1615] border border-[#EAE6E1] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                      <Check className="w-4 h-4 opacity-50" /> Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4 - Food */}
              <div className="bg-white rounded-2xl border border-[#EAE6E1] shadow-sm overflow-hidden flex flex-col group hover:border-[#D4B58A] transition-colors">
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img src="https://images.unsplash.com/photo-1621841957884-1210fe19b66d?auto=format&fit=crop&q=80&w=800" alt="Tartlet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    Tableside Finish
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A37837]">Atelier Savory • Course 2</p>
                    <p className="font-light text-xl text-[#1A1615]">£34.00</p>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1615] mb-2 leading-tight">Dry-Aged Wagyu Tartlet</h3>
                  <p className="text-sm text-[#5C544E] mb-4 line-clamp-3">45-day dry-aged Kagoshima beef, Oscietra caviar, smoked bone marrow emulsion, crispest pastry.</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">Tasting Course</span>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xs text-[#7C746C] font-medium">Chef Kadence • 12 min</span>
                    <button className="bg-[#FAF8F5] hover:bg-[#EAE6E1] text-[#1A1615] border border-[#EAE6E1] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                      <Check className="w-4 h-4 opacity-50" /> Add
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </main>

          {/* Right Sidebar - Residency Order */}
          <aside className="w-full xl:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-[#EAE6E1] shadow-lg sticky top-8 flex flex-col">
              
              <div className="p-5 border-b border-[#EAE6E1]">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A37837]">Residency Order</h3>
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">14</span>
                </div>
                <h2 className="text-xl font-bold text-[#1A1615] mb-1">Table 14 Tasting Flight</h2>
                <p className="text-sm text-[#7C746C]">Cavendish North Alcove</p>
              </div>

              <div className="px-5 py-4 bg-[#FAF6EE] border-b border-[#EAE6E1]">
                <div className="flex gap-3">
                  <Clock className="w-4 h-4 text-[#A37837] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#1A1615]">Leisurely Salon Cadence</p>
                    <p className="text-xs text-[#7C746C]">Estimated duration: 90-120 minutes</p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 overflow-y-auto">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#5C544E] mb-4">Seated Selections (2)</h3>
                
                <div className="space-y-4">
                  {/* Item 1 */}
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#A37837] mb-1">Extraction • Siphon</p>
                      <h4 className="text-sm font-bold text-[#1A1615] mb-1 leading-tight">Panama La Esmeralda Geisha</h4>
                      <p className="text-xs text-[#7C746C] mb-2">Course 1 • Tableside extraction</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#1A1615] mb-2">£28.00</p>
                      <button className="text-[10px] font-bold uppercase text-red-500 hover:text-red-700 transition-colors">Remove</button>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 w-full" />

                  {/* Item 2 */}
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#15803D] mb-1">Kitchen Synchronized</p>
                      <h4 className="text-sm font-bold text-[#1A1615] mb-1 leading-tight">Wild Foraged Morel Risotto</h4>
                      <p className="text-xs text-[#7C746C] mb-2">Course 2 • Gluten-sensitive confirmed</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#1A1615] mb-2">£38.00</p>
                      <button className="text-[10px] font-bold uppercase text-red-500 hover:text-red-700 transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 border-t border-[#EAE6E1] rounded-b-2xl">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5C544E]">Flight Subtotal</span>
                    <span className="text-[#1A1615] font-medium">£66.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#15803D] flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Reserve Glass VIP (15%)</span>
                    <span className="text-[#15803D] font-medium">-£9.90</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-5">
                  <span className="text-lg font-bold text-[#1A1615]">Table Total</span>
                  <span className="text-3xl font-light text-[#1A1615]">£56.10</span>
                </div>

                <div className="mb-4">
                  <button className="w-full flex items-center justify-between text-xs font-bold text-[#7C746C] py-2 border-b border-gray-200">
                    <span className="flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5" /> Notes for Julian & Atelier Chef</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <button className="w-full bg-[#A37837] hover:bg-[#8A652E] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#A37837]/20 mb-4">
                  Dispatch to Sommelier & Kitchen
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-[#7C746C] text-center leading-relaxed">
                  <Clock className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                  Orders are staged in courses with your referential pacing in mind. You may add courses or cellar pours at any time during service.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-[#EAE6E1] flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-[#A37837] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#1A1615] mb-0.5">Cellar Authenticity Guarantee</p>
                <p className="text-[10px] text-[#7C746C]">All vintages temperature controlled at 13.2°C • Mayfair Vaults</p>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};
