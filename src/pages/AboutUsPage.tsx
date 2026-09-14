import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Lock, Store, Users, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { MarketingFooter } from '../components/layout/MarketingFooter';

interface Props {
   onNavigate?: (route: string) => void;
}

export const AboutUsPage: React.FC<Props> = ({ onNavigate }) => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#241C15] font-sans selection:bg-[#D9A94E]/20 relative overflow-hidden">
         {/* Background Elements */}
         <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/10 rounded-full blur-[120px] pointer-events-none z-0" />
         <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/5 rounded-full blur-[120px] pointer-events-none z-0" />

         {/* NAVBAR */}
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
                  <a href="/#how-it-works" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }} className="hover:text-[#B8862E] transition-colors">How It Works</a>
                  <a href="/#pricing" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }} className="hover:text-[#B8862E] transition-colors">Pricing</a>
                  <a href="/#faq" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }} className="hover:text-[#B8862E] transition-colors">FAQ</a>
               </motion.div>
               <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-6">
                  <button onClick={() => onNavigate?.('/login')} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#B8862E] transition-colors">
                     <Lock className="w-4 h-4" /> Log In
                  </button>
                  <button onClick={() => onNavigate?.('/onboarding')} className="flex items-center gap-2 bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#D9A94E]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                     <Store className="w-4 h-4" /> Become Merchant
                  </button>
               </motion.div>
               <button className="md:hidden z-50 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="w-6 h-6 text-[#241C15]" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
         </nav>

         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl pt-28 px-6 flex flex-col gap-6 md:hidden border-b border-gray-100">
                  <a href="#" onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/'); }} className="text-2xl font-black border-b border-gray-100 pb-4">Home</a>
                  <a href="#" onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/contact'); }} className="text-2xl font-black border-b border-gray-100 pb-4">Contact</a>
                  <div className="flex flex-col gap-4 mt-auto pb-12">
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/login'); }} className="w-full bg-[#FAF6EE] text-[#241C15] py-4 rounded-xl font-black text-lg border border-[#D9A94E]/20">Log In</button>
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/onboarding'); }} className="w-full bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-[#D9A94E]/30">Become Merchant</button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* MAIN CONTENT */}
         <main className="pt-32 pb-24 relative z-10 min-h-screen">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-16">
               <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl lg:text-7xl font-black tracking-tight text-[#241C15] mb-6">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A94E] to-[#B8862E]">Story</span>
               </motion.h1>
               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-gray-600 font-medium leading-relaxed">
                  We are building the future of customer loyalty for local businesses. Revia empowers merchants to create seamless, magical experiences that turn first-time visitors into lifelong fans.
               </motion.p>
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-8">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 lg:p-16 shadow-sm border border-gray-100 relative">
                  <div className="absolute -top-4 -left-4 w-16 h-6 bg-[#D9A94E] -rotate-12 rounded-sm opacity-90 shadow-sm" />
                  <div className="absolute -top-4 -right-4 w-16 h-6 bg-[#D9A94E] rotate-12 rounded-sm opacity-90 shadow-sm" />
                  
                  <div className="prose prose-lg max-w-none text-gray-600 font-medium">
                     <p className="mb-6">
                        Revia was born out of a simple observation: big brands have incredible, data-driven loyalty programs, while local merchants are stuck with paper punch cards or clunky apps nobody wants to download.
                     </p>
                     <p className="mb-6">
                        We believe local businesses deserve enterprise-grade tools without the enterprise complexity. That's why we built Revia to be completely frictionless—no app downloads, no complicated sign-ups, just a simple QR scan that connects merchants with their customers instantly.
                     </p>
                     <p>
                        Our mission is to help 1 million local businesses thrive by giving them the power to understand, engage, and retain their customers like never before.
                     </p>
                  </div>
               </motion.div>
            </div>
         </main>

         {/* FOOTER */}
         <MarketingFooter onNavigate={onNavigate} />
      </div>
   );
};
