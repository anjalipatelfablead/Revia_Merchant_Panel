import React from 'react';

interface Props {
  onNavigate?: (route: string) => void;
}

export const CustomerFooter: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0a0908] border-t border-white/5 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-[#C89B3C] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">R</span>
              </div>
              <span className="text-white font-black tracking-[0.12em] text-base uppercase">REVIA</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              QR-based Customer Loyalty & Retention Platform. Scan, join, earn and redeem — from one simple mobile experience.
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-5">Experience</p>
            <ul className="space-y-3">
              {['How It Works', 'Loyalty', 'Offers', 'Rewards', 'Customer Experience'].map(l => (
                <li key={l}><button className="text-sm text-white/40 hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-5">Account</p>
            <ul className="space-y-3">
              {[
                { l: 'Sign In', a: () => onNavigate?.('/login') },
                { l: 'My Account', a: () => onNavigate?.('/customer') },
                { l: 'Become Partner', a: () => onNavigate?.('/onboarding') },
                { l: 'Privacy Policy', a: () => {} },
                { l: 'Terms', a: () => {} },
              ].map(({ l, a }) => (
                <li key={l}><button onClick={a} className="text-sm text-white/40 hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/20">© 2026 Revia. All rights reserved.</p>
          <p className="text-xs text-white/20">QR-based Customer Loyalty & Retention Platform</p>
        </div>
      </div>
    </footer>
  );
};
