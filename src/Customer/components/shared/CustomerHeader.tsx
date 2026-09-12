import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface Props {
  onNavigate?: (route: string) => void;
  mode?: 'light' | 'dark';
  bgColor?: string;
  position?: 'fixed' | 'absolute' | 'sticky' | 'relative';
  transparentOnTop?: boolean;
  borderClass?: string;
}

export const CustomerHeader: React.FC<Props> = ({ 
  onNavigate,
  mode = 'dark',
  bgColor = 'bg-white/95',
  position = 'fixed',
  transparentOnTop = true,
  borderClass = 'border-b border-[#E5E5E5]'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (position !== 'fixed' && position !== 'sticky') return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [position]);

  const isScrolled = scrolled && (position === 'fixed' || position === 'sticky');
  
  const isLightMode = isScrolled ? true : mode === 'light';
  const logoColor = isLightMode ? 'text-[#222]' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]';
  const navLinkColor = isLightMode ? 'text-[#666]' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]';
  const actionBtnColor = isLightMode ? 'text-[#222]' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]';
  const partnerBtnClass = isLightMode 
    ? 'border-transparent bg-white text-[#B89454] shadow-lg' 
    : 'border-white/40 text-white bg-white/20 backdrop-blur-md shadow-lg';

  let headerBgClass = bgColor;
  if (transparentOnTop && !isScrolled) {
    headerBgClass = 'bg-transparent';
  }
  
  const border = isScrolled || (!transparentOnTop && borderClass) ? borderClass : 'border-transparent';

  return (
    <header className={`${position} top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass} ${border} ${isScrolled ? 'backdrop-blur-md shadow-sm' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[80px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#B89454] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-black text-xl">R</span>
          </div>
          <span className={`text-2xl font-black tracking-[0.25em] uppercase transition-colors ${logoColor}`}>REVIA</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {['How It Works', 'Loyalty', 'Offers', 'Rewards'].map(link => (
            <button key={link} className={`text-sm font-bold transition-colors hover:text-[#B89454] ${navLinkColor}`}>{link}</button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-6">
          <button
            onClick={() => onNavigate?.('/login')}
            className={`text-sm font-bold transition-colors hover:text-[#B89454] ${actionBtnColor}`}
          >Sign In</button>
          <button
            onClick={() => onNavigate?.('/customer-panel')}
            className="bg-[#B89454] hover:bg-[#a07520] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-[#B89454]/25"
          >Join Loyalty</button>
          <button
            onClick={() => onNavigate?.('/onboarding')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${partnerBtnClass}`}
          >Become Partner</button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden ${isLightMode ? 'text-[#222]' : 'text-white'}`}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E5E5] px-6 py-6 space-y-4 shadow-xl absolute top-full left-0 right-0">
          {['How It Works', 'Loyalty', 'Offers', 'Rewards'].map(l => (
            <button key={l} className="block w-full text-left text-base font-semibold text-[#666] hover:text-[#B89454]">{l}</button>
          ))}
          <div className="pt-4 border-t border-[#E5E5E5] flex flex-col gap-3">
            <button onClick={() => onNavigate?.('/login')} className="w-full py-3 rounded-full text-sm font-bold border border-[#E5E5E5] text-[#222]">Sign In</button>
            <button onClick={() => onNavigate?.('/customer-panel')} className="w-full py-3 rounded-full text-sm font-bold bg-[#B89454] text-white">Join Loyalty</button>
            <button onClick={() => onNavigate?.('/onboarding')} className="w-full py-3 rounded-full text-sm font-bold border border-[#222] text-[#222]">Become Partner</button>
          </div>
        </div>
      )}
    </header>
  );
};
