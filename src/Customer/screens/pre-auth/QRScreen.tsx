import React from 'react';
import {
  Scan, Camera, ChevronRight, CheckCircle2,
  X, Flashlight, RefreshCw, Maximize, AlertCircle, Smartphone, MapPin,
  QrCode
} from 'lucide-react';
import { CustomerHeader } from '../../components/shared/CustomerHeader';

export const QRScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-[100dvh] w-full font-sans bg-[#F5F4EE] text-[#222]">

      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col min-h-[100dvh] relative">
        <CustomerHeader
          mode="light"
          bgColor="bg-[#F5F4EE]/95 backdrop-blur-md"
          position="sticky"
          transparentOnTop={false}
          borderClass="border-b border-[#EAE3D9]"
        />
        <header className="flex justify-between items-center px-5 py-4">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#EBE7DF]">
            <X className="w-5 h-5 text-[#444]" />
          </button>
          <div className="bg-[#EBE7DF] px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B89454]" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#444]">Camera Sync</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#EBE7DF]">
            <Flashlight className="w-5 h-5 text-[#B89454]" />
          </button>
        </header>

        <div className="px-4">
          {/* Scanner Area */}
          <div className="w-full aspect-square bg-[#1A1A1A] rounded-[32px] overflow-hidden relative flex flex-col items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=600')] bg-cover bg-center opacity-40 mix-blend-luminosity" />

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 z-10 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1C8A54]" />
              <span className="text-[10px] font-bold tracking-wide text-white">Auto-Focus Active • 4K Sensor</span>
            </div>

            {/* Target Reticle */}
            <div className="w-[60%] aspect-square relative z-10">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#B89454] rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-[#B89454] rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-[#B89454] rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#B89454] rounded-br-xl" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#B89454] shadow-[0_0_10px_2px_rgba(184,148,84,0.6)] animate-[scan_2s_ease-in-out_infinite]" />
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center z-10">
              <p className="text-sm font-medium text-white mb-1">Align salon table brass tag QR code</p>
              <p className="text-[11px] font-semibold text-[#B89454]">Hold still within 15-20 cm</p>
            </div>
          </div>

          <div className="mt-4 bg-[#F0EBE1] rounded-2xl p-4 flex gap-3 items-start border border-[#E5DFD1]">
            <div className="w-7 h-7 bg-[#E5DFD1] rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#887A5E]" />
            </div>
            <p className="text-[11px] text-[#6B6149] leading-relaxed pr-2">
              Having glare issues on polished brass? Turn on torch above or enter table code manually below.
            </p>
          </div>
        </div>

        {/* Bottom Drawer */}
        <div className="mt-6 bg-white flex-1 rounded-t-[32px] p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-[#EAE3D9]">
          <div className="w-12 h-1 bg-[#EAE3D9] rounded-full mx-auto mb-6" />

          <div className="bg-[#FFF8EF] border border-[#F2E5D2] rounded-2xl p-4 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#34A853]/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#34A853] rounded-full flex items-center justify-center">
                  <Smartphone className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#111] flex items-center gap-1.5">
                  NFC Touch & Go Ready <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                </h3>
                <p className="text-[11px] text-[#666]">Tap device on brass table puck</p>
              </div>
            </div>
            <span className="bg-[#F2E5D2] text-[#9A7436] text-[10px] font-bold tracking-widest px-2 py-1 rounded">ACTIVE</span>
          </div>

          <div className="mb-4 flex justify-between items-end">
            <h3 className="text-sm font-bold text-[#111]">Can't scan QR? Enter 4-digit code:</h3>
            <span className="text-[11px] text-[#888]">e.g. M-04</span>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-8">
            {['0', '4', '-', '-'].map((char, i) => (
              <div key={i} className="h-16 bg-[#F8F6F0] rounded-xl flex items-center justify-center text-2xl font-bold text-[#111] border border-[#EAE3D9]">
                {char}
              </div>
            ))}
          </div>

          <button onClick={onNext} className="w-full bg-[#B89454] text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-[#B89454]/20 flex justify-center items-center gap-2 mb-6">
            Sync Atelier Table <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex justify-between items-center px-2">
            <button className="text-[11px] font-medium text-[#666] flex items-center gap-1.5 hover:text-[#111]">
              <div className="w-3 h-3 border border-[#666] rounded-full flex items-center justify-center text-[8px]">?</div>
              Need Sommelier Assistance
            </button>
            <button className="text-[11px] font-medium text-[#666] flex items-center gap-1.5 hover:text-[#111]">
              <RefreshCw className="w-3 h-3" />
              Reset Permissions
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex flex-col min-h-[100dvh] w-full bg-[#F5F4EE]">
        <CustomerHeader
          mode="light"
          bgColor="bg-[#F5F4EE]/95 backdrop-blur-md"
          position="sticky"
          transparentOnTop={false}
          borderClass="border-b border-[#EAE3D9]"
        />

        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 py-6 lg:py-4 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center flex-1">
          {/* Left Column */}
          <div className="w-full lg:flex-1 max-w-[580px] pt-4">
            <div className="inline-flex items-center gap-2 bg-[#F3EFE7] text-[#9A7436] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B89454]" />
              Seamless Table Synchronization
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#111] leading-[1.1] mb-5">
              Connect to Your Salon Table or Lounge Booth
            </h1>

            <p className="text-[13px] text-[#666] leading-relaxed mb-8">
              Align the optical scanner with the hand-engraved brass puck nestled on your banquette, tasting counter, or private parlor salon to unlock live tableside curation, bespoke cellar pairings, and tailored artisan courses.
            </p>

            <div className="space-y-4">
              {/* Option 1 */}
              <div className="bg-white rounded-xl border border-[#EAE3D9] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1C8A54]" />
                    <div>
                      <h3 className="text-[13px] font-bold text-[#111]">Webcam & Optical Sensor Active</h3>
                      <p className="text-[10px] text-[#888]">Calibrated for Low-Light Mayfair Parlor Ambiance</p>
                    </div>
                  </div>
                  <span className="bg-[#F4F2EB] text-[#666] text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded">UHD 4K 60FPS</span>
                </div>
                <div className="bg-[#F8F6F0] rounded-lg p-3 flex justify-between items-center border border-[#EAE3D9]">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#666]">
                    <Camera className="w-4 h-4 text-[#B89454]" /> Primary Sensor: FaceTime HD / Ultra-Wide
                  </div>
                  <button className="text-[10px] font-bold text-[#B89454] flex items-center gap-1 uppercase tracking-widest">
                    <RefreshCw className="w-3 h-3" /> Switch Lens
                  </button>
                </div>
              </div>

              {/* Option 2 */}
              <div className="bg-white rounded-xl border border-[#EAE3D9] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-[13px] font-bold text-[#111] flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-0.5 opacity-50">
                      {[1, 2, 3, 4].map(i => <div key={i} className="w-1 h-1 bg-[#B89454]" />)}
                    </div>
                    Manual Table Code
                  </h3>
                  <span className="text-[10px] text-[#888]">Stamped on brass disc rim</span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {['0', '8', '1', '—'].map((char, i) => (
                    <div key={i} className="h-12 bg-[#F8F6F0] rounded-lg border border-[#EAE3D9] flex items-center justify-center text-xl font-bold text-[#111]">
                      {char}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[10px] font-medium text-[#888] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B89454]" /> Suggested: Table 14 • Salon Cavendish
                  </div>
                  <button onClick={onNext} className="bg-[#B89454] text-white text-[11px] font-bold px-5 py-2 rounded-lg hover:bg-[#A38144] transition-colors shadow-sm">
                    Verify Table
                  </button>
                </div>
              </div>



              {/* Option 4 */}
              <div className="bg-[#F8F6F0] rounded-xl border border-[#EAE3D9] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#EBE7DF] rounded flex items-center justify-center border border-[#DED6C4]">
                    <AlertCircle className="w-3.5 h-3.5 text-[#887A5E]" />
                  </div>
                  <h3 className="text-[12px] font-bold text-[#111]">Direct Sommelier Liaison</h3>
                  <span className="text-[9px] font-bold text-[#1C8A54] flex items-center gap-1 ml-1">
                    <div className="w-1 h-1 rounded-full bg-[#1C8A54]" /> Atelier Floor Host Active
                  </span>
                </div>
                <p className="text-[10px] text-[#666] mb-2 leading-relaxed">
                  Prefer an analog consultation? Touch the physical call jewel beneath your mahogany armrest, or speak with Head Sommelier Julien directly.
                </p>
                <button className="text-[10px] font-bold text-[#B89454] hover:underline">
                  Request Host to Table 14 →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full max-w-[500px] lg:w-[450px] xl:w-[500px] shrink-0 flex flex-col pt-4 lg:pt-4 pb-12">

            {/* Scanner Box */}
            <div className="w-full aspect-[5/4] bg-[#141414] rounded-2xl relative overflow-hidden flex flex-col shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=800')] bg-cover bg-center opacity-30 mix-blend-luminosity" />

              {/* Top Bar */}
              <div className="relative z-10 flex justify-between items-start p-4">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1C8A54]" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/90">Atelier Optical Scanner 4K</span>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/5 text-white hover:bg-black/70 transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/5 text-white hover:bg-black/70 transition-colors">
                    <Maximize className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Crosshairs & Center Graphic */}
              <div className="flex-1 relative flex items-center justify-center">
                {/* Target Brackets */}
                <div className="absolute w-[50%] aspect-[4/3]">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B89454] rounded-tl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B89454] rounded-tr" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B89454] rounded-bl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B89454] rounded-br" />
                </div>

                {/* Fake QR Graphic in middle */}
                <div className="w-40 h-40 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm flex items-center justify-center flex-col relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  <QrCode className="w-10 h-10 text-[#B89454] mb-2" />
                  <p className="text-[8px] text-[#B89454] font-bold uppercase tracking-widest">Scan This Table</p>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[1px] bg-[#B89454]/30" />
              </div>

              {/* Bottom Stats Overlay */}
              <div className="relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-12">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-widest uppercase text-white/50 mb-1">Optical Alignment</p>
                    <p className="text-[11px] font-bold text-[#1C8A54]">Optimal (98%)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-widest uppercase text-white/50 mb-1">Sensory Mode</p>
                    <p className="text-[11px] font-bold text-white">Auto-Macro</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold tracking-widest uppercase text-white/50 mb-1">Optical Zoom</p>
                    <p className="text-[11px] font-bold text-[#B89454]">1.0x Fixed</p>
                  </div>
                </div>

                <div className="bg-[#B89454]/10 border border-[#B89454]/20 rounded-lg p-2 flex items-center justify-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-[#B89454]" />
                  <p className="text-[10px] text-white/70">
                    <strong className="text-[#B89454]">Table Sommelier:</strong> Ready to sync course pacing and cellar tasting flights.
                  </p>
                  <button className="text-[10px] font-bold text-[#B89454] underline ml-2">Need Help?</button>
                </div>
              </div>
            </div>

            {/* Success Panel below scanner */}
            <div className="mt-4 bg-white rounded-2xl border border-[#EAE3D9] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1C8A54]/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#1C8A54]" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#111] mb-0.5">Table 14 Brass Signature Recognized</h3>
                  <p className="text-[11px] text-[#666]">Salon Cavendish Banquet • Mayfair Atelier</p>
                </div>
              </div>
              <button onClick={onNext} className="bg-[#1C8A54] text-white text-[11px] font-bold tracking-wide px-5 py-2.5 rounded-lg hover:bg-[#156d42] transition-colors shadow-md shadow-[#1C8A54]/20">
                Confirm & Proceed
              </button>
            </div>

            {/* Option 3 (Moved to Right Column) */}
            <div className="mt-4 bg-white rounded-xl border border-[#EAE3D9] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex justify-between items-center cursor-pointer hover:border-[#B89454]/30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F4F2EB] rounded-full flex items-center justify-center">
                  <Scan className="w-5 h-5 text-[#444]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-[#111]">Physical Titanium Passkey Tap</h3>
                  <p className="text-[10px] text-[#888]">Hold your reserve token or Apple Wallet badge over the sensor</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#AAA]" />
            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 100%; opacity: 1; }
        }
      `}} />
    </div>
  )
}

