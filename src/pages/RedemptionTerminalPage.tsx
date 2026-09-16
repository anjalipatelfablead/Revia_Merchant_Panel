import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import {
  Maximize,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  CreditCard,
  History,
  Info,
  Store,
  Receipt
} from 'lucide-react';

export const RedemptionTerminalPage = () => {
  const { checkAndDeductCredit } = useWallet();
  const [settledLogs, setSettledLogs] = useState([
    { id: '01', item: 'Artisanal Oat Cortado & Financier', guest: "Clara O'Donnell", vch: 'REV-7712', amount: '₹11.50', time: '14:22' },
    { id: '02', item: 'Whole Bean 250g Panama Gesha bag', guest: 'Julian Hayes', vch: 'REV-6490', amount: '₹38.00', time: '13:58' },
    { id: '03', item: 'Cascara Fizz Mocktail', guest: 'Chloe Bennett', vch: 'REV-5901', amount: '₹9.00', time: '13:14' },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSettleReward = () => {
    // REDEMPTION COMMISSION HOOK (5 credits)
    const allowed = checkAndDeductCredit('redemption_commission', 5, 'REV-VCH-8924', 'Redemption Commission (Voucher #REV-VCH-8924)');
    if (!allowed) {
      return; // Blocked due to insufficient wallet credits
    }

    const newLog = {
      id: String(settledLogs.length + 1).padStart(2, '0'),
      item: 'Complimentary Specialty Tasting Flight & Artisanal Brioche',
      guest: 'Marcus Vance',
      vch: 'REV-8924',
      amount: '₹24.00',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    };

    setSettledLogs([newLog, ...settledLogs]);
    setToastMessage('Reward voucher REV-8924 successfully settled! 5 credits commission deducted.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full p-4 lg:p-6 sm:pb-12 flex flex-col gap-6 font-sans relative">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1615] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold border border-[#3D3732] animate-in slide-in-from-bottom-5 fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight mb-1">
            Reward Redemption & Pass Verification
          </h1>
          <p className="text-[13px] text-[#6E6A66]">
            Live counter validation, optical scanner target lock, and immediate<br />voucher settlement.
          </p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 mt-4 md:mt-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EFECE6] rounded-full text-[10px] font-bold text-[#1A1615] shadow-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C8A54]"></span>
              NFC & LASER READY
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-[#EFECE6] rounded-full text-[10px] font-bold text-[#1A1615] shadow-sm tracking-wider">
              <Maximize className="w-3 h-3 text-[#D4A753]" />
              Downtown Flagship • POS #02
            </span>
          </div>
        </div>
      </div>

      {/* Lookup Bar */}
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="flex-1 bg-[#F5F2EC] border border-[#EFECE6] rounded-xl flex items-center px-4 py-3 shadow-inner">
          <Maximize className="w-5 h-5 text-[#9E9A93] mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Scan or type voucher code..."
            value="REV - VCH - 8924"
            readOnly
            className="w-full min-w-0 bg-transparent border-none outline-none text-[14px] font-bold text-[#1A1615] truncate"
          />
          <span className="text-[10px] font-bold text-[#9E9A93] tracking-wider ml-3 shrink-0 hidden sm:block">QUICK KEY</span>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#D4A753] hover:bg-[#C29541] text-white px-6 py-3 rounded-xl font-bold text-[14px] transition-colors shadow-sm">
            <Search className="w-4 h-4 shrink-0" /> <span className="whitespace-nowrap">Lookup Pass</span>
          </button>
          <button className="flex items-center justify-center bg-[#FAF8F5] border border-[#EFECE6] text-[#1A1615] px-4 py-3 rounded-xl hover:bg-[#EFECE6] transition-colors shadow-sm shrink-0">
            <Filter className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">

        {/* Left Column (Hardware & Scanners) */}
        <div className="space-y-4">

          {/* Scanner Viewport */}
          <div className="bg-[#1A1615] rounded-2xl p-4 aspect-[4/3] flex flex-col justify-between relative overflow-hidden shadow-md">
            <div className="flex justify-between items-center relative z-10">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#D4A753] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C8A54] animate-pulse"></span>
                OPTICAL LOCK • 60 FPS
              </span>
              <span className="text-[10px] font-mono text-[#D4A753]">CAM - 01 / MACRO</span>
            </div>

            {/* Simulated QR Code Target */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full max-w-[200px] aspect-square border-2 border-[#D4A753]/30 relative rounded-lg">
                {/* Crosshairs */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4A753]"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4A753]"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4A753]"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4A753]"></div>

                {/* QR Box */}
                <div className="absolute inset-4 bg-white rounded flex items-center justify-center shadow-lg relative">
                  <div className="absolute inset-2 border-4 border-black border-dashed opacity-20 rounded"></div>
                  <div className="w-16 h-8 bg-[#D4A753] rounded-full opacity-80 flex items-center justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[8px] font-bold text-black">REV-8924</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center relative z-10 bg-gradient-to-t from-black/80 to-transparent pt-4 -mx-4 px-4 pb-0 -mb-4 h-12">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1C8A54]" /> Pass Detected & Frozen
              </span>
              <span className="text-[11px] font-bold text-[#D4A753] cursor-pointer hover:underline">Re-scan</span>
            </div>
          </div>

          {/* NFC Reader */}
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-[#FAF8F5] rounded-xl border border-[#EFECE6] flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5 text-[#9E782F]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[13px] font-bold text-[#1A1615]">NFC & Keycard Reader</h3>
              <p className="text-[11px] text-[#6E6A66] leading-tight mt-0.5">Tap guest smartphone, Apple Wallet, or VIP brass fob</p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#EBF7F0] text-[#1C8A54] border border-[#1C8A54]/20 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C8A54]"></span> ACTIVE
            </span>
          </div>

          {/* Audit Log / Warning */}
          <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2 text-[12px] font-bold text-[#1A1615]">
                <AlertTriangle className="w-4 h-4 text-[#D4A753]" /> Exceptions & Audit Log
              </span>
              <span className="text-[9px] font-bold text-[#9E9A93] tracking-widest uppercase">PREV - ATTEMPT</span>
            </div>
            <p className="text-[11px] text-[#6E6A66] leading-relaxed mb-4">
              Voucher <strong className="text-[#1A1615]">#REV-9014</strong> was previously flagged: expired 2 days ago at Tribeca Roastery. Overriding counter validation requires authorized Store Manager PIN.
            </p>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4A753] hover:text-[#9E782F] transition-colors">
                <Info className="w-3.5 h-3.5" /> Request Manager Override
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Settlement) */}
        <div className="flex flex-col gap-4">

          {/* Reward Settlement Card */}
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <span className="flex items-center w-fit gap-1.5 px-2.5 py-1 bg-[#EBF7F0] text-[#1C8A54] rounded-full text-[10px] font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" /> READY FOR SETTLEMENT
              </span>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="font-bold text-[#6E6A66]">REV-VCH-8924</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-[#D4A753] uppercase tracking-widest mb-1.5">SPECIALTY LOYALTY REWARD</p>
              <h2 className="text-[22px] font-bold text-[#1A1615] leading-tight mb-3">
                Complimentary Specialty Tasting Flight & Artisanal Brioche
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[28px] font-black text-[#1A1615]">₹24.00</span>
                <span className="px-3 py-1 bg-[#FAF8F5] border border-[#EFECE6] rounded-lg text-[11px] font-bold text-[#6E6A66]">0 Point Surcharge</span>
                <span className="flex items-center gap-1 text-[12px] font-bold text-[#1C8A54] whitespace-nowrap">
                  <CheckCircle2 className="w-4 h-4" /> 100% Counter Comp
                </span>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#1A1615]">
                  <CreditCard className="w-3.5 h-3.5 text-[#D4A753]" /> Reward Inclusions
                </span>
                <span className="text-[9px] font-mono text-[#9E9A93]">SKU: RE-RW-FLGT-08</span>
              </div>
              <p className="text-[12px] text-[#6E6A66] leading-relaxed mb-4">
                Includes 1x Single Origin Geisha Flight (3 distinct roasts: Panama Boquete, Ethiopia Yirgacheffe, Colombia Huila) + 1x Freshly Baked Brioche or Croissant from morning bake.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[10px] text-[#9E9A93] font-medium">
                <span className="flex items-center gap-1.5"><History className="w-3 h-3" /> Valid through Nov 30, 2025</span>
                <span className="flex items-center gap-1.5"><Store className="w-3 h-3" /> Downtown Flagship & SoHo Roastery</span>
              </div>
            </div>

            {/* User Profile Snippet */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
              <div className="flex items-center gap-4 flex-1">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" alt="Marcus Vance" className="w-12 h-12 rounded-full object-cover border border-[#EFECE6]" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <h3 className="text-[14px] font-bold text-[#1A1615] truncate">Marcus Vance</h3>
                    <span className="px-2 py-0.5 bg-[#1A1615] text-white text-[9px] font-bold uppercase rounded tracking-wider shrink-0">BLACK TIER VIP</span>
                  </div>
                  <p className="text-[11px] text-[#6E6A66] truncate sm:whitespace-normal">
                    SoHo Regular • 42 Lifetime Visits • Member #MV-0491
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right bg-[#FAF8F5] sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                <p className="text-[9px] font-bold text-[#9E9A93] uppercase tracking-widest leading-tight sm:mb-1 w-[80px] sm:w-auto">
                  STAMP CARD <span className="sm:hidden"><br /></span>STATUS
                </p>
                <div className="flex items-center gap-2 sm:gap-1 flex-1 sm:flex-initial justify-center sm:justify-end">
                  <div className="flex items-center gap-0.5 sm:mr-2">
                    {[...Array(8)].map((_, i) => <div key={`f-${i}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4A753]"></div>)}
                    {[...Array(2)].map((_, i) => <div key={`e-${i}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EFECE6]"></div>)}
                  </div>
                  <p className="text-[11px] font-bold text-[#1A1615] leading-tight flex flex-col sm:block w-[60px] sm:w-auto text-right sm:text-left">
                    <span>8 / 10</span> <span className="sm:inline hidden">Stamps</span><span className="sm:hidden block">Stamps</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 mt-2">
              <div className="flex-1 bg-[#FAF8F5] border border-[#EFECE6] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1 sm:gap-0">
                <span className="text-[11px] sm:text-[12px] text-[#6E6A66] leading-tight">Stamps<br className="sm:hidden" /> Remaining</span>
                <span className="text-[14px] sm:text-[16px] font-black text-[#1A1615] leading-tight flex flex-col sm:block">
                  <span className="text-[16px] sm:text-inherit">8</span> <span className="text-[12px] sm:text-inherit">Stamps</span>
                </span>
              </div>
              <div className="flex-1 bg-[#EBF7F0] border border-[#1C8A54]/20 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-1 sm:gap-0">
                <span className="text-[11px] sm:text-[12px] text-[#6E6A66] leading-tight">Unused<br className="sm:hidden" /> Vouchers</span>
                <span className="text-[14px] sm:text-[16px] font-black text-[#1C8A54] leading-tight flex flex-col sm:block">
                  <span className="text-[16px] sm:text-inherit">1</span> <span className="text-[12px] sm:text-inherit whitespace-nowrap">Pass Left</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
              <button
                onClick={handleSettleReward}
                className="w-full sm:w-auto flex-1 bg-[#D4A753] hover:bg-[#C29541] text-white h-12 sm:h-14 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] sm:text-[14px] transition-colors shadow-sm cursor-pointer px-2 sm:px-4"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" /> <span className="whitespace-nowrap">Confirm & Settle Reward </span>
              </button>
              <button className="w-full sm:w-auto px-8 h-12 sm:h-14 bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#1A1615] border border-[#EFECE6] rounded-xl font-bold text-[13px] sm:text-[14px] transition-colors shadow-sm cursor-pointer shrink-0">
                Clear
              </button>
            </div>
          </div>

          {/* Today's Redemptions Log */}
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <span className="flex items-center gap-2 text-[11px] font-bold text-[#1A1615] uppercase tracking-wider">
                <Receipt className="w-4 h-4 text-[#D4A753] shrink-0" /> TODAY'S LANE REDEMPTIONS
              </span>
              <span className="text-[11px] text-[#6E6A66]">Lane #02 • {settledLogs.length + 11} settled today</span>
            </div>

            <div className="space-y-2">
              {settledLogs.map(log => (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border border-[#EFECE6] bg-[#FAF8F5] hover:bg-white transition-colors cursor-pointer gap-2 sm:gap-0">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="text-[11px] font-bold text-[#D4A753] mt-0.5 sm:mt-0">#{log.id}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-[#1A1615] truncate sm:whitespace-normal">{log.item}</p>
                      <p className="text-[10px] text-[#6E6A66] truncate sm:whitespace-normal">Guest: {log.guest} • Voucher: {log.vch}</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right pl-7 sm:pl-0 shrink-0">
                    <p className="text-[12px] font-bold text-[#1C8A54]">{log.amount} Comp</p>
                    <p className="text-[10px] text-[#9E9A93]">{log.time} • Barista Ken</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
