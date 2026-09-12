import React, { useState } from 'react';
import { ScanLine, CheckCircle2 } from 'lucide-react';

export const CustomerScanScreen = () => {
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanned(true);
    setTimeout(() => {
      setScanned(false);
    }, 3000);
  };

  return (
    <div className="max-w-[600px] mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-[#222]">Scan Table QR</h2>
        <p className="text-sm text-[#666]">Align the QR code within the frame to view the menu and place your order.</p>
      </div>

      <div className="relative w-full aspect-square md:aspect-[4/3] bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border-4 border-black group">
        {/* Simulated Camera Feed Background (Darkened) */}
        <div className="absolute inset-0 bg-[#111] bg-opacity-90"></div>

        {/* Viewfinder Frame */}
        <div className="relative z-10 w-2/3 md:w-1/2 aspect-square border-2 border-dashed border-white/40 flex items-center justify-center">
          {/* Corner Highlights */}
          <div className="absolute top-[-2px] left-[-2px] w-8 h-8 border-t-4 border-l-4 border-[#C89B3C]" />
          <div className="absolute top-[-2px] right-[-2px] w-8 h-8 border-t-4 border-r-4 border-[#C89B3C]" />
          <div className="absolute bottom-[-2px] left-[-2px] w-8 h-8 border-b-4 border-l-4 border-[#C89B3C]" />
          <div className="absolute bottom-[-2px] right-[-2px] w-8 h-8 border-b-4 border-r-4 border-[#C89B3C]" />

          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C89B3C] shadow-[0_0_10px_#C89B3C] animate-[scan_2s_ease-in-out_infinite]" />
        </div>

        {/* Success Overlay */}
        {scanned && (
          <div className="absolute inset-0 z-20 bg-[#0D7A53]/90 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <CheckCircle2 className="w-16 h-16 text-white mb-4" />
            <h3 className="text-xl font-black text-white">Table 4 Scanned!</h3>
            <p className="text-white/80 text-sm mt-1">Redirecting to menu...</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleScan}
          disabled={scanned}
          className="bg-white border border-[#E6E6E6] hover:bg-[#F8F8F6] text-[#222] px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <ScanLine className="w-5 h-5" />
          Simulate Scan
        </button>
      </div>

      {/* Global Style for scanning line animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};
