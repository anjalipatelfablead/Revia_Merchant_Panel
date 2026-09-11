import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CustomerHeader: React.FC<Props> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E5E5E5]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[70px] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#C89B3C] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">R</span>
          </div>
          <span className={`text-lg font-black tracking-[0.12em] uppercase transition-colors ${scrolled ? 'text-[#222]' : 'text-white'}`}>REVIA</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['How It Works', 'Loyalty', 'Offers', 'Rewards'].map(link => (
            <button key={link} className={`text-sm font-semibold transition-colors hover:text-[#C89B3C] ${scrolled ? 'text-[#666]' : 'text-white/70'}`}>{link}</button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate?.('/login')}
            className={`text-sm font-bold transition-colors hover:text-[#C89B3C] ${scrolled ? 'text-[#222]' : 'text-white'}`}
          >Sign In</button>
          <button
            onClick={() => onNavigate?.('/customer-panel')}
            className="bg-[#C89B3C] hover:bg-[#a07520] text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-[#C89B3C]/25"
          >Join Loyalty</button>
          <button
            onClick={() => onNavigate?.('/onboarding')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${scrolled ? 'border-[#222] text-[#222] hover:bg-[#222] hover:text-white' : 'border-white/40 text-white hover:bg-white hover:text-[#222]'}`}
          >Become Partner</button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden ${scrolled ? 'text-[#222]' : 'text-white'}`}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E5E5] px-6 py-6 space-y-4 shadow-xl">
          {['How It Works', 'Loyalty', 'Offers', 'Rewards'].map(l => (
            <button key={l} className="block w-full text-left text-base font-semibold text-[#666] hover:text-[#C89B3C]">{l}</button>
          ))}
          <div className="pt-4 border-t border-[#E5E5E5] flex flex-col gap-3">
            <button onClick={() => onNavigate?.('/login')} className="w-full py-3 rounded-full text-sm font-bold border border-[#E5E5E5] text-[#222]">Sign In</button>
            <button onClick={() => onNavigate?.('/customer-panel')} className="w-full py-3 rounded-full text-sm font-bold bg-[#C89B3C] text-white">Join Loyalty</button>
            <button onClick={() => onNavigate?.('/onboarding')} className="w-full py-3 rounded-full text-sm font-bold border border-[#222] text-[#222]">Become Partner</button>
          </div>
        </div>
      )}
    </header>
  );
};
