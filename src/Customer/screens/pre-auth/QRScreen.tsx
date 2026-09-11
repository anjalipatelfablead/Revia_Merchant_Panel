import React from 'react';
import { QrCode, Scan, Star, CreditCard, Bell, ChevronRight, RefreshCw, TrendingUp, Eye, CheckCircle2 } from 'lucide-react';
import { GoldBtn } from '../../components/ui/Buttons';

export const QRScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="min-h-screen bg-[#0a0908] md:bg-[#FAF8F5] flex flex-col relative font-sans">
    {/* MOBILE VIEW */}
    <div className="md:hidden flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-[#C89B3C]/10 rounded-3xl border border-[#C89B3C]/20 flex items-center justify-center mb-6">
        <QrCode className="w-8 h-8 text-[#C89B3C]" />
      </div>
      <h1 className="text-2xl font-black text-white mb-2">Scan QR Code</h1>
      <p className="text-white/40 text-sm mb-10">Point your camera at the business QR code to start your loyalty journey.</p>
      <div className="w-64 h-64 border-2 border-[#C89B3C]/30 rounded-3xl flex items-center justify-center mb-10 relative">
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#C89B3C] rounded-tl-xl" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#C89B3C] rounded-tr-xl" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#C89B3C] rounded-bl-xl" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#C89B3C] rounded-br-xl" />
        <div className="flex flex-col items-center gap-3 text-white/20">
          <Scan className="w-10 h-10" />
          <p className="text-xs">Camera viewfinder</p>
        </div>
      </div>
      <GoldBtn onClick={onNext} full={false}>Simulate QR Scan</GoldBtn>
      <p className="text-white/20 text-xs mt-4">Works with any business QR code from Revia</p>
    </div>

    {/* DESKTOP VIEW */}
    <div className="hidden md:flex flex-col min-h-screen">
      <header className="px-10 py-4 flex items-center justify-between border-b border-[#E6E6E6] bg-[#FAF8F5]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
            <span className="text-[#C89B3C] font-black text-lg">R</span>
          </div>
          <div>
            <p className="text-sm font-black tracking-widest text-[#1a1a1a]">REVIA <span className="text-[#C89B3C]">RESERVE</span></p>
            <p className="text-[9px] text-[#666] tracking-widest uppercase">Artisanal Ordering &amp; Pacing</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-[#666]">
          <span className="cursor-pointer hover:text-[#1a1a1a]">Home</span>
          <span className="cursor-pointer hover:text-[#1a1a1a]">Menu</span>
          <span className="cursor-pointer hover:text-[#1a1a1a]">Contact</span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-10 py-12 flex gap-16">
        {/* Left Content */}
        <div className="w-[500px] shrink-0">
          <div className="inline-block bg-[#F5DEB3]/30 text-[#a07520] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] inline-block mr-2" />
            Seamless Table Synchronization
          </div>
          <h1 className="text-4xl font-serif text-[#1a1a1a] leading-tight mb-6">
            Connect to Your Salon Table or Lounge Booth
          </h1>
          <p className="text-sm text-[#666] leading-relaxed mb-10">
            Align the optical scanner with the hand-engraved brass puck nestled on your banquette, tasting counter, or private parlor salon to unlock live tableside curation, bespoke cellar pairings, and tailored artisan courses.
          </p>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E6E6E6] p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0D7A53]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1a1a]">Webcam & Optical Sensor Active</h3>
                    <p className="text-[10px] text-[#666]">Calibrated for Low-Light Mayfair Parlor Ambiance</p>
                  </div>
                </div>
                <span className="bg-[#F8F8F6] text-[#666] text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">
                  UHD 4K 60FPS
                </span>
              </div>
              <div className="flex items-center justify-between bg-[#F8F8F6] rounded-xl px-4 py-3 border border-[#E6E6E6]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#666]">
                  <Scan className="w-4 h-4 text-[#C89B3C]" /> Primary Sensor: FaceTime HD / Ultra-Wide
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C] flex items-center gap-1 hover:text-[#a07520]">
                  <RefreshCw className="w-3 h-3" /> Switch Lens
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E6E6E6] p-5 shadow-sm">
              <div className="flex justify-between items-start mb-5">
                <h3 className="text-sm font-bold text-[#1a1a1a] flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#C89B3C] opacity-50" /> Manual Table Code
                </h3>
                <span className="text-[9px] text-[#999] uppercase tracking-widest">
                  Stamped on brass disc rim
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {['0', '8', '1', '—'].map((char, i) => (
                  <div key={i} className="h-14 bg-[#F8F8F6] rounded-xl border border-[#E6E6E6] flex items-center justify-center text-xl font-bold text-[#1a1a1a]">
                    {char}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-[#666] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" /> Suggested: Table 14 • Salon Cavendish
                </p>
                <button onClick={onNext} className="bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl hover:bg-[#a07520] transition-colors shadow-md shadow-[#C89B3C]/20">
                  Verify Table
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E6E6E6] p-5 shadow-sm flex items-center justify-between group cursor-pointer hover:border-[#C89B3C]/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F8F8F6] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#FFF8ED] transition-colors">
                  <CreditCard className="w-5 h-5 text-[#222]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] mb-0.5">Physical Titanium Passkey Tap</h3>
                  <p className="text-[10px] text-[#666]">Hold your reserve token or Apple Wallet badge over the sensor</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#bbb] group-hover:text-[#C89B3C]" />
            </div>

            <div className="bg-[#F8F8F6] rounded-2xl border border-[#E6E6E6] p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-[#FFF8ED] rounded flex items-center justify-center shrink-0 border border-[#F5DEB3]">
                  <Bell className="w-3 h-3 text-[#C89B3C]" />
                </div>
                <h3 className="text-sm font-bold text-[#1a1a1a]">Direct Sommelier Liaison</h3>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#0D7A53] flex items-center gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]" /> Atelier Floor Host Active
                </span>
              </div>
              <p className="text-[10px] text-[#666] mb-3 leading-relaxed">
                Prefer an analog consultation? Touch the physical call jewel beneath your mahogany armrest, or speak with Head Sommelier Julien directly.
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-[#C89B3C] hover:text-[#a07520]">
                Request Host to Table 14 →
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - Scanner */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-[#1a1a1a] rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col border border-white/10">
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#0D7A53]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/90">Atelier Optical Scanner 4K</span>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-black/70 transition-colors">
                  <TrendingUp className="w-4 h-4 text-white" />
                </button>
                <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-black/70 transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center bg-[#0a0908]">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=1200')] bg-cover bg-center" />
              <div className="w-48 h-48 rounded-full border border-[#C89B3C]/30 flex items-center justify-center relative z-10 bg-black/60 backdrop-blur-sm">
                <QrCode className="w-16 h-16 text-[#C89B3C]" />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-[#C89B3C] font-mono tracking-widest">
                  Position puck code within crosshairs
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C89B3C]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C89B3C]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#C89B3C]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C89B3C]" />
              </div>
            </div>

            <div className="bg-gradient-to-t from-black via-black/90 to-transparent p-6 pt-20 relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Optical Alignment</p>
                  <p className="text-xs font-bold text-[#0D7A53]">Optimal (96%)</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Sensory Mode</p>
                  <p className="text-xs font-bold text-white">Auto-Macro</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Optical Zoom</p>
                  <p className="text-xs font-bold text-[#C89B3C]">1.0x Fixed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-5 h-5 bg-[#C89B3C]/20 rounded flex items-center justify-center border border-[#C89B3C]/30 shrink-0">
                  <Star className="w-3 h-3 text-[#C89B3C]" />
                </div>
                <p className="text-[10px] text-white/60 flex-1">
                  <strong className="text-[#C89B3C]">Table Sommelier:</strong> Ready to sync course pacing and cellar tasting flights.
                </p>
                <button className="text-[10px] font-bold text-[#C89B3C] hover:underline">Need Help?</button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white border border-[#0D7A53]/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F0FFF8] rounded-full flex items-center justify-center shrink-0 border border-[#BCE3D1]">
                <CheckCircle2 className="w-5 h-5 text-[#0D7A53]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#1a1a1a]">Table 14 Brass Signature Recognized</h3>
                <p className="text-[10px] text-[#666]">Salon Cavendish Banquet • Mayfair Atelier</p>
              </div>
            </div>
            <button onClick={onNext} className="bg-[#0D7A53] text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-[#0a6644] transition-colors shadow-lg shadow-[#0D7A53]/20">
              Confirm & Proceed
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E6E6E6] bg-white px-10 py-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#1a1a1a] rounded flex items-center justify-center">
                <span className="text-[#C89B3C] font-black text-[10px]">R</span>
              </div>
              <p className="text-xs font-black tracking-widest text-[#1a1a1a]">REVIA <span className="text-[#C89B3C]">RESERVE</span></p>
            </div>
            <p className="text-[10px] text-[#666] leading-relaxed max-w-[200px]">
              Mayfair Atelier & Bespoke Studio. Curated sensory hospitality, master stylists, and private wellness suites.
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#C89B3C] mb-3">Location & Access</p>
            <p className="text-[10px] text-[#666] leading-relaxed mb-2">42 Conduit Street<br />Mayfair, London W1S 2YQ</p>
            <p className="text-[10px] text-[#666]">Valet Parking & Chauffeur Reception</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#C89B3C] mb-3">Private Hours</p>
            <p className="text-[10px] text-[#666] leading-relaxed mb-2">Tuesday — Saturday: 09:00 - 20:00<br />Sunday: By Private Invitation</p>
            <p className="text-[10px] text-[#666]">Monday: Closed for Studio Curation</p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#C89B3C] mb-3">Direct Concierge</p>
            <p className="text-[10px] text-[#666] leading-relaxed mb-3">+44 (0) 20 7946 0912<br />concierge@reviareserve.com</p>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#0D7A53] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]" /> Direct Liaison On-Duty
            </p>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-10 pt-6 border-t border-[#E6E6E6] flex justify-between items-center text-[9px] text-[#999]">
          <p>© 2024 Revia Reserve Mayfair Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#666] cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#666] cursor-pointer">Bespoke Terms</span>
            <span className="hover:text-[#666] cursor-pointer">Concierge Desk</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
