import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#1A1615] relative overflow-hidden select-none">
      {/* Abstract Background Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#D4A753] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#9E782F] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg px-6 flex flex-col items-center">
        
        {/* Glowing Icon Container */}
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-[#D4A753]/10 backdrop-blur-md">
          <ShieldAlert className="w-10 h-10 text-[#D4A753]" />
        </div>

        {/* Text Area */}
        <h1 className="text-[120px] font-black text-white leading-none tracking-tighter mb-2 opacity-90 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
          Access Restricted or Route Invalid
        </h2>
        <p className="text-[#9E9A93] text-sm leading-relaxed mb-10 font-medium">
          The requested terminal pathway could not be found within the Revia Mesh Network. Please verify your credentials or return to a secure sector.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-4 rounded-xl text-sm font-bold transition-all backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          
          <button
            onClick={() => onNavigate('/customer-landing')}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-gradient-to-b from-[#D4A753] to-[#9E782F] hover:from-[#c29646] hover:to-[#8c6724] text-white px-6 py-4 rounded-xl text-sm font-black transition-all shadow-lg shadow-[#D4A753]/20"
          >
            <Home className="w-4 h-4" /> System Core
          </button>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-[#6E6A66] text-[10px] font-black uppercase tracking-[0.3em]">
          Revia Enterprise Engine
        </p>
      </div>
    </div>
  );
};
