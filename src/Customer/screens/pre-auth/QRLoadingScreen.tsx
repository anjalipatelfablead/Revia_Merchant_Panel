import React, { useEffect } from 'react';

export const QRLoadingScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="min-h-screen bg-[#F8F8F6] md:bg-[#EBEBEB] flex items-center justify-center md:p-6">
      <div className="w-full max-w-[400px] md:max-w-7xl bg-[#F8F8F6] md:bg-white min-h-screen md:min-h-0 md:h-[800px] md:rounded-[40px] md:shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Column (Brand) */}
        <div className="hidden md:flex md:w-5/12 bg-[#1a1a1a] px-6 pt-16 pb-10 md:p-16 flex-col justify-center items-center md:items-start text-center md:text-left relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=90&w=1200')] bg-cover bg-center md:block hidden" />
        </div>

        {/* Right Column (Loading) */}
        <div className="md:w-7/12 flex-1 px-6 py-8 md:p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-[#C89B3C] rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-[#C89B3C]/20 animate-pulse">
            <span className="text-white font-black text-2xl">GC</span>
          </div>
          <h2 className="text-xl font-black text-[#222] mb-1">Preparing Your Experience</h2>
          <p className="text-[#666] text-sm mb-6">Resolving business and branch…</p>
          <div className="w-8 h-8 border-2 border-[#C89B3C] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};
