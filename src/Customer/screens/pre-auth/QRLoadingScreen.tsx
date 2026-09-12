import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export const QRLoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress animation
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 15; // Random increments
      });
    }, 150);

    const t = setTimeout(() => {
      setProgress(100);
      setTimeout(onDone, 300); // Wait for 100% to render briefly
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(t);
    };
  }, [onDone]);

  return (
    <div className="min-h-[100dvh] w-full font-sans flex items-center justify-center relative overflow-hidden transition-colors duration-500 bg-[#141414] md:bg-[#F5F4EE]">

      {/* Background Ambience (Mobile Dark, Desktop Cream) */}
      <div className="absolute inset-0 opacity-40 md:opacity-0 bg-[radial-gradient(circle_at_center,_#B89454_0%,_transparent_60%)] scale-150 animate-pulse" />
      <div className="absolute inset-0 hidden md:block opacity-30 bg-[radial-gradient(circle_at_center,_#DED6C4_0%,_transparent_60%)] scale-150 animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-sm">

        {/* Animated Logo Box */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#B89454] rounded-2xl blur-xl opacity-20 animate-pulse" />
          <div className="w-20 h-20 bg-gradient-to-br from-[#222] to-[#111] md:from-white md:to-[#F8F6F0] border border-white/10 md:border-[#EAE3D9] rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 md:via-[#B89454]/10 to-transparent skew-x-12" />
            <span className="text-[#B89454] font-black text-3xl">R</span>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold tracking-tight text-white md:text-[#111] mb-2">
          Synchronizing Table
        </h2>
        <p className="text-[12px] text-white/50 md:text-[#666] mb-8 font-medium">
          Establishing secure connection to Salon Cavendish
        </p>

        {/* Custom Progress Bar */}
        <div className="w-48 h-1 bg-white/10 md:bg-[#EAE3D9] rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-[#B89454] rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#B89454] uppercase tracking-widest opacity-0 animate-[fadeIn_0.5s_ease-out_forwards_0.5s]">
          <ShieldCheck className="w-3 h-3" /> Encrypted Link
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
};
