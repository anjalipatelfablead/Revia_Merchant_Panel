import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Lock, Store, MapPin, Phone, Mail } from 'lucide-react';
import { MarketingFooter } from '../components/layout/MarketingFooter';

interface Props {
   onNavigate?: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<Props> = ({ onNavigate }) => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#241C15] font-sans selection:bg-[#D9A94E]/20 relative overflow-hidden">
         <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/10 rounded-full blur-[120px] pointer-events-none z-0" />
         
         <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('/')}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D9A94E] to-[#B8862E] flex items-center justify-center shadow-lg shadow-[#D9A94E]/30">
                     <span className="text-white font-black text-lg">R</span>
                  </div>
                  <span className="text-2xl font-black tracking-tight">Revia</span>
               </motion.div>
               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-600 bg-white/50 px-8 py-3 rounded-full backdrop-blur-md border border-white/60 shadow-sm">
                  <a href="/#features" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }} className="hover:text-[#B8862E] transition-colors">Features</a>
                  <a href="/#pricing" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }} className="hover:text-[#B8862E] transition-colors">Pricing</a>
               </motion.div>
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-6">
                  <button onClick={() => onNavigate?.('/login')} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#B8862E] transition-colors">
                     <Lock className="w-4 h-4" /> Log In
                  </button>
               </motion.div>
               <button className="md:hidden z-50 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="w-6 h-6 text-[#241C15]" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
         </nav>

         <main className="pt-32 pb-24 relative z-10 min-h-screen">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 lg:p-16 shadow-sm border border-gray-100 relative mb-12">
                  <div className="absolute -top-4 -left-4 w-16 h-6 bg-[#D9A94E] -rotate-12 rounded-sm opacity-90 shadow-sm" />
                  
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-[#241C15] mb-4">Privacy Policy</h1>
                  <p className="text-gray-500 font-medium mb-10 border-b border-gray-100 pb-10">Last Updated: September 14, 2026</p>

                  <div className="prose prose-lg max-w-none text-gray-600 font-medium space-y-6">
                     <p>At Revia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
                     <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products, or otherwise contact us.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
                     <p>We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h3>
                     <p>We aim to protect your personal information through a system of organizational and technical security measures. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Contact Us</h3>
                     <p>If you have questions or comments about this notice, you may email us at privacy@revia.com.</p>
                  </div>
               </motion.div>
            </div>
         </main>

         {/* FOOTER */}
         <MarketingFooter onNavigate={onNavigate} />
      </div>
   );
};
