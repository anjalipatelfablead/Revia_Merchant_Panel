import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Eye,
  RefreshCw,
  QrCode,
  Image as ImageIcon
} from 'lucide-react';
import { PrimaryButton, TierBadge } from '../components/common/Badges';

export const BrandingPage: React.FC = () => {
  const [primaryGold, setPrimaryGold] = useState('#D4A753');
  const [charcoal, setCharcoal] = useState('#1A1615');
  const [canvasIvory, setCanvasIvory] = useState('#FAF8F5');
  const [forestEmerald, setForestEmerald] = useState('#0D7A53');
  const [brandName, setBrandName] = useState('Blue Bottle Specialty Roasters');

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            IDENTITY ARCHITECTURE // SYSTEM THEME ENGINE
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Business Profile & Branding</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Configure visual assets, color tokens, AAA contrast compliance, and live digital pass styling.
          </p>
        </div>

        <PrimaryButton onClick={() => alert('Brand design tokens successfully propagated across POS mesh!')} className="py-2 px-4 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Propagate Brand Tokens</span>
        </PrimaryButton>
      </div>

      {/* Main Grid: Assets & Color Engine (Left 7 cols) + Live Viewport Preview (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Upload Grid + Color Engine */}
        <div className="lg:col-span-7 space-y-6">
          {/* Visual Assets Upload Grid */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-[#E5E0D8] pb-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                HIGH-RESOLUTION ASSETS
              </span>
              <h3 className="text-base font-bold text-[#1A1615]">Visual Assets Upload Grid</h3>
              <p className="text-xs text-[#6E6A66]">
                PNG or SVG vector graphics for Apple Wallet pass header and counter kiosk displays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Asset 1: Primary Emblem */}
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors flex flex-col items-center text-center group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#D4A753] to-[#9E782F] flex items-center justify-center text-white font-bold shadow-xs mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#1A1615]">Primary Emblem</div>
                <span className="text-[10px] text-[#9E9A93] mt-0.5">SVG • 512x512px</span>
                <span className="mt-2 text-[10px] font-semibold text-[#9E782F] flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Replace Asset
                </span>
              </div>

              {/* Asset 2: Loyalty Stamp Crest */}
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors flex flex-col items-center text-center group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[#1A1615] flex items-center justify-center text-[#D4A753] font-bold shadow-xs mb-2">
                  ☕
                </div>
                <div className="text-xs font-bold text-[#1A1615]">Stamp Crest</div>
                <span className="text-[10px] text-[#9E9A93] mt-0.5">Wallet Punch Icon</span>
                <span className="mt-2 text-[10px] font-semibold text-[#9E782F] flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Replace Asset
                </span>
              </div>

              {/* Asset 3: Favicon & PWA Icon */}
              <div className="p-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors flex flex-col items-center text-center group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-center text-[#1A1615] font-bold shadow-xs mb-2">
                  <ImageIcon className="w-5 h-5 text-[#9E782F]" />
                </div>
                <div className="text-xs font-bold text-[#1A1615]">Favicon & PWA</div>
                <span className="text-[10px] text-[#9E9A93] mt-0.5">192x192 PNG</span>
                <span className="mt-2 text-[10px] font-semibold text-[#9E782F] flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Replace Asset
                </span>
              </div>
            </div>
          </div>

          {/* Color Architecture Engine */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-[#E5E0D8] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                  COLOR ARCHITECTURE ENGINE
                </span>
                <h3 className="text-base font-bold text-[#1A1615]">Brand Color Tokens & Contrast Check</h3>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0D7A53] bg-[#E6F4ED] px-2.5 py-1 rounded-full border border-[#BCE3D1]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>WCAG AAA Verified</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Gold */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md shadow-2xs border border-black/10"
                      style={{ backgroundColor: primaryGold }}
                    />
                    <span className="text-xs font-bold text-[#1A1615]">Brand Gold (Primary)</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#9E782F]">{primaryGold}</span>
                </div>
                <p className="text-[10px] text-[#6E6A66]">
                  Applied to linear gradient buttons and active tab indicators.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E0D8] text-[10px]">
                  <span className="text-[#9E9A93]">Contrast on White:</span>
                  <span className="font-bold text-[#0D7A53]">4.82:1 (Pass AA)</span>
                </div>
              </div>

              {/* Charcoal / Ink */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md shadow-2xs border border-black/10"
                      style={{ backgroundColor: charcoal }}
                    />
                    <span className="text-xs font-bold text-[#1A1615]">Espresso Charcoal</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#1A1615]">{charcoal}</span>
                </div>
                <p className="text-[10px] text-[#6E6A66]">
                  Primary typography ink and Obsidian VIP background badge.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E0D8] text-[10px]">
                  <span className="text-[#9E9A93]">Contrast on Canvas:</span>
                  <span className="font-bold text-[#0D7A53]">16.4:1 (Pass AAA)</span>
                </div>
              </div>

              {/* Canvas Ivory */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md shadow-2xs border border-black/10"
                      style={{ backgroundColor: canvasIvory }}
                    />
                    <span className="text-xs font-bold text-[#1A1615]">Canvas Ivory</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#6E6A66]">{canvasIvory}</span>
                </div>
                <p className="text-[10px] text-[#6E6A66]">
                  Neutral background tone minimizing barista eye fatigue.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E0D8] text-[10px]">
                  <span className="text-[#9E9A93]">Luminance:</span>
                  <span className="font-bold text-[#1A1615]">97.8% Reflectance</span>
                </div>
              </div>

              {/* Forest Emerald */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-md shadow-2xs border border-black/10"
                      style={{ backgroundColor: forestEmerald }}
                    />
                    <span className="text-xs font-bold text-[#1A1615]">Forest Emerald</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#0D7A53]">{forestEmerald}</span>
                </div>
                <p className="text-[10px] text-[#6E6A66]">
                  Live telemetry status and positive growth metric badges.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E0D8] text-[10px]">
                  <span className="text-[#9E9A93]">Contrast on Mint:</span>
                  <span className="font-bold text-[#0D7A53]">7.1:1 (Pass AAA)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live Viewport Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#E5E0D8] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                  REALTIME VIEWPORT
                </span>
                <h3 className="text-base font-bold text-[#1A1615]">Mobile Wallet Pass Rendering</h3>
              </div>
              <Smartphone className="w-4 h-4 text-[#9E782F]" />
            </div>

            {/* Mobile Pass Device Frame */}
            <div className="bg-neutral-900 p-4 rounded-2xl shadow-xl">
              <div className="bg-gradient-to-br from-[#1A1615] via-[#2A2321] to-[#1A1615] text-white rounded-xl p-4 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#D4A753] to-[#9E782F] flex items-center justify-center text-white text-xs font-bold">
                      ☕
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-tight">
                        {brandName}
                      </div>
                      <div className="text-[9px] text-[#D4A753]">Gold Reserve Pass</div>
                    </div>
                  </div>
                  <TierBadge tier="Gold Reserve" />
                </div>

                <div className="py-2 border-y border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-white/50 block">Passholder</span>
                    <span className="font-bold">Sofia Chen</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-bold text-white/50 block">Stamps</span>
                    <span className="font-mono font-bold text-[#D4A753]">6 / 10 Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="font-mono text-white/50">NFC-TOKEN-8812</span>
                  <span className="text-[#0D7A53] font-bold bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">
                    Ready to Tap
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg text-[11px] text-[#6E6A66] flex items-center justify-between">
              <span>Apple PassKit & Google Pay Bundles</span>
              <span className="font-bold text-[#0D7A53]">Signed & Valid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
