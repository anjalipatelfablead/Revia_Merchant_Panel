import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
   QrCode, ArrowRight, CheckCircle2, Star, Shield,
   Smartphone, Gift, Clock, ChevronRight, Menu, X,
   Zap, RefreshCw, Eye, Lock, Bell, TrendingUp,
   Coffee, Scissors, Dumbbell, ShoppingBag, Store,
   Megaphone, MapPin, BarChart3, Users, CreditCard,
   ChevronDown, Sparkles, Phone, Mail
} from 'lucide-react';
import { StaggerTestimonials } from '../components/ui/stagger-testimonials';
import { FAQSection } from '../components/ui/faqsection';

interface Props {
   onNavigate?: (route: string) => void;
}

// ─── Reusable Components ─────────────────────────────────────────────────────

const GoldBadge = ({ children }: { children: React.ReactNode }) => (
   <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-1.5 bg-[#D9A94E]/15 text-[#B8862E] border border-[#D9A94E]/30 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
   >
      {children}
   </motion.span>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
   <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 mb-6"
   >
      <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#D9A94E]" />
      <span className="text-[#B8862E] text-[10px] font-black uppercase tracking-[0.25em]">{children}</span>
      <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#D9A94E]" />
   </motion.div>
);

const GlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
   <div className={`bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl ${className}`}>
      {children}
   </div>
);

// ─── Mobile Mockup Frame ──────────────────────────────────────────────────────
const MobileFrame = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
   <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={`relative w-[280px] bg-white rounded-[36px] border-[10px] border-[#241C15] shadow-2xl overflow-hidden flex flex-col ${className}`}
      style={{ height: 560, boxShadow: '0 25px 50px -12px rgba(217, 169, 78, 0.25)' }}
   >
      {/* Status bar */}
      <div className="bg-white flex items-center justify-between px-6 pt-5 pb-3 shrink-0 z-10">
         <span className="text-[11px] font-bold text-[#241C15] tracking-tight">9:41</span>
         <div className="w-20 h-5 bg-[#241C15] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
         <div className="flex gap-1.5 items-center">
            <div className="w-5 h-2.5 border border-[#241C15] rounded-[3px] relative"><div className="absolute inset-[1px] right-auto w-[65%] bg-[#241C15] rounded-[2px]" /></div>
         </div>
      </div>
      <div className="flex-1 overflow-hidden bg-[#FAF6EE]">{children}</div>
   </motion.div>
);

const DashboardFrame = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
   <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={`relative w-full max-w-[550px] bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl overflow-hidden flex flex-col ${className}`}
      style={{ height: 420, boxShadow: '0 25px 50px -12px rgba(0,0,0, 0.25)' }}
   >
      <div className="bg-gray-100/80 backdrop-blur-sm flex items-center gap-2 px-4 py-3 shrink-0 border-b border-gray-200/50">
         <div className="w-3 h-3 rounded-full bg-red-400" />
         <div className="w-3 h-3 rounded-full bg-amber-400" />
         <div className="w-3 h-3 rounded-full bg-green-400" />
         <div className="flex-1" />
         <div className="w-48 h-5 bg-white/50 rounded-md shadow-inner" />
      </div>
      <div className="flex-1 overflow-hidden flex bg-gray-50/50">
         <div className="w-16 border-r border-gray-200/50 bg-white/50 flex flex-col items-center py-4 gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D9A94E] to-[#B8862E] shadow-md mb-4" />
            <div className="w-6 h-6 rounded-md bg-gray-200/50" />
            <div className="w-6 h-6 rounded-md bg-gray-200/50" />
            <div className="w-6 h-6 rounded-md bg-gray-200/50" />
         </div>
         <div className="flex-1 p-5 overflow-hidden relative">
            {children}
         </div>
      </div>
   </motion.div>
);


export const MarketingLandingPage: React.FC<Props> = ({ onNavigate }) => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeFaq, setActiveFaq] = useState<number | null>(null);
   const [isAnnual, setIsAnnual] = useState(true);

   useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const faqs = [
      { q: "Does my customer need to download an app?", a: "No. Customers simply scan your QR code with their phone camera and join instantly via a mobile web browser." },
      { q: "How much does Revia cost?", a: "We offer plans starting from $49/mo, with a 14-day free trial. See our pricing section for detailed information." },
      { q: "Can I run it across multiple branches?", a: "Yes! The Growth and Enterprise plans support multi-branch management from a single unified dashboard." },
      { q: "How long does setup take?", a: "Under 10 minutes. Create an account, set your loyalty rules, print your QR code, and you are ready to go." },
      { q: "Can I create custom campaigns and discounts?", a: "Absolutely. You can create BOGO offers, double stamp days, and targeted discounts for specific customer segments." },
      { q: "Is there a free trial?", a: "Yes, every new account comes with a 14-day full-feature free trial. No credit card required to start." }
   ];

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
   };

   return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#241C15] font-sans selection:bg-[#D9A94E]/20 relative overflow-hidden">

         {/* Global decorative blurs */}
         <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/10 rounded-full blur-[120px] pointer-events-none z-0" />
         <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/5 rounded-full blur-[120px] pointer-events-none z-0" />

         {/* ═══════════════════════════════════════ */}
         {/* 1. NAVBAR                             */}
         {/* ═══════════════════════════════════════ */}
         <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-white/50 shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => window.scrollTo(0, 0)}
               >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D9A94E] to-[#B8862E] flex items-center justify-center shadow-lg shadow-[#D9A94E]/30">
                     <span className="text-white font-black text-lg">R</span>
                  </div>
                  <span className="text-2xl font-black tracking-tight">Revia</span>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-600 bg-white/50 px-8 py-3 rounded-full backdrop-blur-md border border-white/60 shadow-sm"
               >
                  <a href="#features" className="hover:text-[#B8862E] transition-colors">Features</a>
                  <a href="#how-it-works" className="hover:text-[#B8862E] transition-colors">How It Works</a>
                  <a href="#pricing" className="hover:text-[#B8862E] transition-colors">Pricing</a>
                  <a href="#faq" className="hover:text-[#B8862E] transition-colors">FAQ</a>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden md:flex items-center gap-6"
               >
                  <button onClick={() => onNavigate?.('/login')} className="text-sm font-bold text-gray-700 hover:text-[#B8862E] transition-colors">Log In</button>
                  <button onClick={() => onNavigate?.('/onboarding')} className="bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#D9A94E]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                     Become Merchant
                  </button>
               </motion.div>

               <button className="md:hidden z-50 relative" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="w-6 h-6 text-[#241C15]" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
         </nav>

         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl pt-28 px-6 flex flex-col gap-6 md:hidden border-b border-gray-100"
               >
                  <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black border-b border-gray-100 pb-4">Features</a>
                  <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black border-b border-gray-100 pb-4">How It Works</a>
                  <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black border-b border-gray-100 pb-4">Pricing</a>
                  <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black border-b border-gray-100 pb-4">FAQ</a>
                  <div className="flex flex-col gap-4 mt-auto pb-12">
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/login'); }} className="w-full bg-[#FAF6EE] text-[#241C15] py-4 rounded-xl font-black text-lg border border-[#D9A94E]/20">Log In</button>
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/onboarding'); }} className="w-full bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-[#D9A94E]/30">Become Merchant</button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ═══════════════════════════════════════ */}
         {/* 2. HERO SECTION                       */}
         {/* ═══════════════════════════════════════ */}
         <section className="pt-32 lg:pt-30 pb-12 lg:pb-20 overflow-hidden relative z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
            {/* Animated decorative blobs */}
            <motion.div
               animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#D9A94E]/10 rounded-[40%_60%_70%_30%] blur-3xl pointer-events-none z-0"
            />
            <motion.div
               animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-[#241C15]/5 rounded-[60%_40%_30%_70%] blur-3xl pointer-events-none z-0"
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
                  <div className="absolute -left-6 -top-6 w-20 h-20 bg-[radial-gradient(circle_at_center,rgba(217,169,78,0.15)_0,transparent_50%)]" />
                  <motion.div variants={itemVariants}>
                     <GoldBadge><Sparkles className="w-3 h-3" /> Loyalty & Retention Platform</GoldBadge>
                  </motion.div>
                  <motion.h1 variants={itemVariants} className="mt-8 text-5xl lg:text-[4rem] font-black leading-[1.05] tracking-tight text-[#241C15] drop-shadow-sm">
                     Turn every customer into a <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A94E] via-[#C89B3C] to-[#B8862E] relative inline-block">
                        repeat customer
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                           <path d="M0,10 Q50,0 100,10" fill="none" stroke="rgba(217,169,78,0.3)" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                     </span>
                  </motion.h1>
                  <motion.p variants={itemVariants} className="mt-10 text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
                     QR-based loyalty, targeted campaigns, and rewards — no app download required for your customers. Built to seamlessly integrate with your counter.
                  </motion.p>
                  <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row gap-4">
                     <button onClick={() => onNavigate?.('/onboarding')} className="bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white px-8 py-4 rounded-xl text-base font-black shadow-xl shadow-[#D9A94E]/30 hover:shadow-[0_20px_40px_rgba(217,169,78,0.25)] hover:scale-105 transition-all duration-300 flex justify-center items-center gap-3 group relative overflow-hidden">
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2">Start Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                     </button>
                     <button className="bg-white/80 backdrop-blur-md border-2 border-gray-200 hover:border-[#D9A94E]/50 text-[#241C15] px-8 py-4 rounded-xl text-base font-black transition-all shadow-sm hover:shadow-lg flex justify-center items-center">
                        Become Merchant
                     </button>
                  </motion.div>
                  <motion.p variants={itemVariants} className="mt-8 text-sm text-gray-500 font-bold flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4 text-[#D9A94E]" /> No credit card required · Setup in under 10 minutes
                  </motion.p>
               </motion.div>

               <div className="flex justify-center lg:justify-end lg:pr-12 h-[580px] items-center mt-10 lg:mt-0">
                  <div className="relative">
                     {/* Ambient glow behind phone */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-br from-[#D9A94E]/40 to-[#241C15]/10 rounded-full blur-[80px]" />

                     {/* Floating stat card 1 */}
                     <motion.div
                        initial={{ opacity: 0, x: -50, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
                        transition={{ duration: 0.8, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                        className="absolute top-[20%] -left-12 lg:-left-20 z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white flex items-center gap-4 hover:scale-105 transition-transform cursor-default"
                     >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                           <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Repeat Visit Rate</p>
                           <div className="flex items-end gap-2">
                              <p className="text-2xl font-black text-[#241C15]">68%</p>
                              <p className="text-xs font-black text-green-600 mb-1 flex items-center bg-green-50 px-1.5 py-0.5 rounded-full">↑12%</p>
                           </div>
                        </div>
                     </motion.div>

                     {/* Floating stat card 2 */}
                     <motion.div
                        initial={{ opacity: 0, x: 50, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
                        transition={{ duration: 0.8, delay: 0.2, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                        className="absolute bottom-[20%] -right-8 lg:-right-16 z-30 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white flex items-center gap-3 hover:scale-105 transition-transform cursor-default"
                     >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D9A94E] to-[#B8862E] flex items-center justify-center shadow-lg shadow-[#D9A94E]/30">
                           <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">New Members</p>
                           <p className="text-xl font-black text-[#241C15]">+124</p>
                        </div>
                     </motion.div>

                     <MobileFrame className="transform lg:rotate-3 transition-transform duration-700 hover:rotate-0 relative z-10">
                        <div className="flex flex-col h-full bg-[#FAF6EE] p-5">
                           <div className="bg-gradient-to-br from-[#241C15] to-[#1A1410] rounded-3xl p-6 mb-5 text-white shadow-xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                              <div className="flex justify-between items-start mb-6 relative z-10">
                                 <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">REVIA LOYALTY</p>
                                    <p className="text-xl font-black">Amber Coffee</p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[9px] text-white/50 font-bold mb-1">PROGRESS</p>
                                    <p className="text-2xl font-black text-[#D9A94E]">6/10</p>
                                 </div>
                              </div>

                              <div className="grid grid-cols-5 gap-2.5 mb-5 relative z-10">
                                 {Array.from({ length: 10 }).map((_, i) => (
                                    <div key={i} className={`aspect-square rounded-full flex items-center justify-center text-sm font-black shadow-inner ${i < 6 ? 'bg-gradient-to-br from-[#D9A94E] to-[#B8862E] text-white' : 'bg-white/10 text-white/20'}`}>
                                       {i < 6 && <Star className="w-4 h-4 fill-current" />}
                                    </div>
                                 ))}
                              </div>
                              <p className="text-[11px] text-center text-white/70 font-bold relative z-10">4 more stamps unlocks a free item ☕</p>
                           </div>

                           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Recent Activity</p>
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                    <div>
                                       <p className="text-sm font-bold text-[#241C15]">Visit Recorded</p>
                                       <p className="text-[10px] text-gray-400">Today, 9:42 AM</p>
                                    </div>
                                    <div className="bg-[#D9A94E]/10 px-3 py-1 rounded-full">
                                       <p className="text-sm font-black text-[#B8862E]">+1</p>
                                    </div>
                                 </div>
                                 <div className="flex justify-between items-center opacity-60">
                                    <div>
                                       <p className="text-sm font-bold text-[#241C15]">Visit Recorded</p>
                                       <p className="text-[10px] text-gray-400">Mon, 2:15 PM</p>
                                    </div>
                                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                                       <p className="text-sm font-black text-gray-500">+1</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </MobileFrame>
                  </div>
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 3. TRUST BAR                            */}
         {/* ═══════════════════════════════════════ */}
         <section className="py-6 border-y border-white/40 bg-white/30 backdrop-blur-sm relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <p className="text-center text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8">
                  Built for cafés, salons, gyms, and retail businesses
               </p>
               <div className="flex justify-center flex-wrap gap-12 lg:gap-28 opacity-50">
                  <motion.div whileHover={{ scale: 1.1, color: '#D9A94E' }} className="transition-colors"><Coffee className="w-8 h-8" /></motion.div>
                  <motion.div whileHover={{ scale: 1.1, color: '#D9A94E' }} className="transition-colors"><Scissors className="w-8 h-8" /></motion.div>
                  <motion.div whileHover={{ scale: 1.1, color: '#D9A94E' }} className="transition-colors"><Dumbbell className="w-8 h-8" /></motion.div>
                  <motion.div whileHover={{ scale: 1.1, color: '#D9A94E' }} className="transition-colors"><ShoppingBag className="w-8 h-8" /></motion.div>
                  <motion.div whileHover={{ scale: 1.1, color: '#D9A94E' }} className="transition-colors"><Store className="w-8 h-8" /></motion.div>
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 4. PROBLEM → SOLUTION SECTION         */}
         {/* ═══════════════════════════════════════ */}
         <section className="pt-12 pb-12 relative z-10 bg-[#1A1410] overflow-hidden" id="problem">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,169,78,0.15)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center max-w-4xl mx-auto mb-20"
               >
                  <SectionLabel>The Problem</SectionLabel>
                  <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-8 mt-4">Most customers visit once.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D9A94E] to-[#B8862E]">They don't come back.</span></h2>
                  <p className="text-xl text-white/70 leading-relaxed font-medium">Losing a first-time customer is losing future revenue. Revia turns anonymous walk-ins into trackable, loyal regulars.</p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {[
                     { icon: Smartphone, title: "No app needed", desc: "Customers join in seconds via QR, no download required. Frictionless onboarding." },
                     { icon: Megaphone, title: "Built-in campaigns", desc: "Reward the right customer at the right time with automated SMS and push offers." },
                     { icon: MapPin, title: "One dashboard", desc: "Manage loyalty, staff, and analytics across all your locations seamlessly." }
                  ].map((val, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.15 }}
                     >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 h-full group hover:-translate-y-2 transition-all duration-300 hover:bg-white/10 text-center relative overflow-hidden">
                           {/* Card subtle glow on hover */}
                           <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                           <div className="w-20 h-20 bg-gradient-to-br from-[#241C15] to-[#1A1410] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(217,169,78,0.15)] group-hover:shadow-[0_0_40px_rgba(217,169,78,0.3)] transition-shadow relative z-10">
                              <val.icon className="w-10 h-10 text-[#D9A94E]" />
                           </div>
                           <h3 className="text-2xl font-black mb-4 text-white relative z-10">{val.title}</h3>
                           <p className="text-white/60 leading-relaxed relative z-10">{val.desc}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 5. HOW IT WORKS                       */}
         {/* ═══════════════════════════════════════ */}
         <section className="py-22 bg-white relative z-10" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <SectionLabel>How Revia Works</SectionLabel>
               <div className="text-center mb-24">
                  <h2 className="text-4xl lg:text-5xl font-black text-[#241C15]">A simple flow for you and your customers</h2>
               </div>

               <div className="relative">
                  <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[3px] bg-gray-100 rounded-full" />
                  <motion.div
                     initial={{ scaleX: 0 }}
                     whileInView={{ scaleX: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-[#D9A94E] to-[#B8862E] rounded-full origin-left"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-6 relative">
                     {[
                        { step: 1, title: "Generate your QR", icon: QrCode, desc: "Print and place at your counter." },
                        { step: 2, title: "Customer scans", icon: Smartphone, desc: "Frictionless mobile sign-up." },
                        { step: 3, title: "Earn stamps", icon: Star, desc: "Tracked seamlessly at POS." },
                        { step: 4, title: "Bring them back", icon: Gift, desc: "Targeted offers drive returns." }
                     ].map((item, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2 }}
                           className="relative flex flex-col items-center text-center group"
                        >
                           <div className="w-[120px] h-[120px] bg-gradient-to-br from-[#D9A94E] to-[#B8862E] rounded-full shadow-xl shadow-[#D9A94E]/30 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 border-4 border-white">
                              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#241C15] to-[#1A1410] text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg transform translate-x-2 -translate-y-2 border-2 border-white">
                                 {item.step}
                              </div>
                              <item.icon className="w-12 h-12 text-white drop-shadow-md" />
                           </div>
                           <h3 className="text-xl font-black mb-3 text-[#241C15]">{item.title}</h3>
                           <p className="text-base text-gray-500 max-w-[200px]">{item.desc}</p>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 6. FEATURE GRID                       */}
         {/* ═══════════════════════════════════════ */}
         <section className="py-12 relative z-10 bg-[#FAF6EE]" id="features">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="text-center max-w-3xl mx-auto mb-20">
                  <h2 className="text-4xl lg:text-5xl font-black text-[#241C15]">Everything you need to build repeat business</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                     { title: "Loyalty Program Builder", desc: "Stamp-based rewards, fully configurable to match your brand.", icon: Star },
                     { title: "Campaign Builder", desc: "Targeted offers, BOGO, tier-based discounts, linked conditions.", icon: Megaphone },
                     { title: "Multi-Branch Management", desc: "One dashboard, unlimited locations, granular permissions.", icon: MapPin },
                     { title: "Analytics & Reports", desc: "Retention curves, repeat-visit rate, campaign ROI tracking.", icon: BarChart3 },
                     { title: "Staff & Counter Tools", desc: "Fast transaction capture and reward redemption at the POS.", icon: Users },
                     { title: "QR & Wallet Passes", desc: "Apple/Google Wallet-ready digital loyalty cards for easy access.", icon: CreditCard }
                  ].map((feat, idx) => (
                     <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[32px] p-8 shadow-sm border border-white hover:border-[#D9A94E]/40 hover:shadow-2xl hover:shadow-[#D9A94E]/10 transition-all duration-300 group cursor-pointer"
                     >
                        <div className="w-16 h-16 rounded-2xl bg-[#FAF6EE] flex items-center justify-center mb-8 group-hover:bg-gradient-to-br from-[#D9A94E] to-[#B8862E] transition-colors duration-300 shadow-sm">
                           <feat.icon className="w-8 h-8 text-[#B8862E] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-2xl font-black mb-3 text-[#241C15]">{feat.title}</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">{feat.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 7. LIVE PRODUCT PREVIEW               */}
         {/* ═══════════════════════════════════════ */}
         {/* <section className="py-32 bg-[#1A1410] overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D9A94E]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
               <div className="text-center mb-24">
                  <h2 className="text-4xl lg:text-5xl font-black text-white">See it from both sides</h2>
               </div>

               <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 relative">

                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[2px] border-t-[2px] border-dashed border-[#D9A94E]/50 z-0 opacity-50" />
                  <motion.div
                     animate={{ x: [-20, 20, -20] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#D9A94E] to-[#B8862E] rounded-full z-10 items-center justify-center shadow-[0_0_30px_rgba(217,169,78,0.5)]"
                  >
                     <RefreshCw className="w-5 h-5 text-white" />
                  </motion.div>

                  <div className="relative z-10 flex flex-col items-center">
                     <DashboardFrame className="!border-white/10 !bg-white/5">
                        <div className="w-full h-full p-6">
                           <div className="flex justify-between items-center mb-8">
                              <h4 className="font-bold text-white text-lg">Live Dashboard</h4>
                              <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Live
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-5 mb-8">
                              <div className="bg-white/10 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                                 <p className="text-xs text-white/50 font-bold mb-2 uppercase tracking-wider">New Signups</p>
                                 <p className="text-3xl font-black text-white">+24</p>
                              </div>
                              <div className="bg-white/10 p-5 rounded-2xl border border-white/5 backdrop-blur-md">
                                 <p className="text-xs text-white/50 font-bold mb-2 uppercase tracking-wider">Redemptions</p>
                                 <p className="text-3xl font-black text-white">12</p>
                              </div>
                           </div>
                           <div className="w-full h-28 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/5" />
                        </div>
                     </DashboardFrame>
                     <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                        <p className="text-[#D9A94E] font-black uppercase tracking-widest text-sm">What you see</p>
                     </div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center">
                     <MobileFrame className="lg:scale-110 !border-[#111]">
                        <div className="flex flex-col h-full items-center justify-center p-8 bg-white">
                           <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: [0.8, 1.1, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                              className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-500/30"
                           >
                              <CheckCircle2 className="w-12 h-12 text-white" />
                           </motion.div>
                           <h4 className="text-2xl font-black text-center mb-3 text-[#241C15]">Stamp Earned!</h4>
                           <p className="text-gray-500 text-center text-base mb-10 font-medium">You now have 6/10 stamps.</p>
                           <div className="w-full h-16 bg-gray-50 rounded-2xl border border-gray-100" />
                        </div>
                     </MobileFrame>
                     <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                        <p className="text-[#D9A94E] font-black uppercase tracking-widest text-sm">What your customer sees</p>
                     </div>
                  </div>

               </div>
            </div>
         </section> */}

         {/* ═══════════════════════════════════════ */}
         {/* 8. PRICING SECTION                    */}
         {/* ═══════════════════════════════════════ */}
         <section className="py-12 bg-white relative z-10" id="pricing">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="text-center mb-10">
                  <h2 className="text-4xl lg:text-5xl font-black text-[#241C15] mb-8">Simple, transparent pricing</h2>

                  <div className="inline-flex bg-gray-100 p-1 rounded-full relative">
                     <button
                        onClick={() => setIsAnnual(false)}
                        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-gray-500 hover:text-[#241C15]'}`}
                     >
                        Monthly
                     </button>
                     <button
                        onClick={() => setIsAnnual(true)}
                        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-500 hover:text-[#241C15]'}`}
                     >
                        Annual
                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${isAnnual ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>Save 20%</span>
                     </button>
                     <div className={`absolute top-1 bottom-1 bg-[#241C15] rounded-full transition-all duration-300 ease-out shadow-md ${isAnnual ? 'translate-x-[98px] w-[170px]' : 'translate-x-0 w-[98px]'}`} />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mt-2">
                  {/* Starter */}
                  <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                     <h3 className="text-2xl font-black mb-2 text-[#241C15]">Starter</h3>
                     <div className="flex items-end gap-1 mb-8">
                        <span className="text-4xl font-black">${isAnnual ? '39' : '49'}</span>
                        <span className="text-gray-500 font-bold mb-1">/mo</span>
                     </div>
                     <ul className="space-y-4 mb-10">
                        {['1 Branch Limit', '3 Staff Seats', 'Basic Campaigns', 'Standard Support'].map((feat, i) => (
                           <li key={i} className="flex items-center gap-4 text-base text-gray-600 font-bold">
                              <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" /> {feat}
                           </li>
                        ))}
                     </ul>
                     <button onClick={() => onNavigate?.('/onboarding')} className="w-full py-2.5 rounded-xl font-black text-lg bg-[#FAF6EE] text-[#241C15] hover:bg-[#F0EBE1] transition-colors border border-gray-200/50">
                        Start Free Trial
                     </button>
                  </div>

                  {/* Growth */}
                  <div className="relative">
                     <div className="absolute inset-0 bg-gradient-to-b from-[#D9A94E] to-[#B8862E] rounded-[40px] blur-xl opacity-40 -z-10" />
                     <div className="bg-[#241C15] text-white rounded-[40px] p-12 shadow-2xl relative border border-white/10 md:-scale-y-100 md:scale-y-100 md:scale-105">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg">
                           Most Popular
                        </div>
                        <h3 className="text-2xl font-black mb-2">Growth</h3>
                        <div className="flex items-end gap-1 mb-8">
                           <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D9A94E] to-[#B8862E]">${isAnnual ? '79' : '99'}</span>
                           <span className="text-gray-400 font-bold mb-1.5">/mo</span>
                        </div>
                        <ul className="space-y-4 mb-10">
                           {['3 Branch Limit', '10 Staff Seats', 'Advanced Campaigns', 'Deep Analytics', 'Priority Support'].map((feat, i) => (
                              <li key={i} className="flex items-center gap-4 text-base text-gray-300 font-bold">
                                 <CheckCircle2 className="w-6 h-6 text-[#D9A94E] shrink-0" /> {feat}
                              </li>
                           ))}
                        </ul>
                        <button onClick={() => onNavigate?.('/onboarding')} className="w-full py-2.5 rounded-xl font-black text-lg bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white shadow-xl shadow-[#D9A94E]/20 hover:scale-[1.02] transition-transform">
                           Start Free Trial
                        </button>
                     </div>
                  </div>

                  {/* Enterprise */}
                  <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                     <h3 className="text-2xl font-black mb-2 text-[#241C15]">Enterprise</h3>
                     <div className="flex items-end gap-1 mb-8">
                        <span className="text-4xl font-black">Custom</span>
                     </div>
                     <ul className="space-y-4 mb-10">
                        {['Unlimited Branches', 'Unlimited Staff', 'Custom Integration', 'Dedicated Success Mgr'].map((feat, i) => (
                           <li key={i} className="flex items-center gap-4 text-base text-gray-600 font-bold">
                              <CheckCircle2 className="w-6 h-6 text-gray-300 shrink-0" /> {feat}
                           </li>
                        ))}
                     </ul>
                     <button className="w-full py-2.5 rounded-xl font-black text-lg bg-white border-2 border-gray-200 hover:border-[#241C15] text-[#241C15] transition-colors">
                        Talk to Sales
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 9. TESTIMONIAL / RESULTS              */}
         {/* ═══════════════════════════════════════ */}
         <section className="py-12 bg-gradient-to-b from-white to-[#FAF6EE] relative z-10 overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D9A94E]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
               <div className="text-center mb-12">
                  <SectionLabel>Wall of Love</SectionLabel>
                  <h2 className="text-4xl lg:text-5xl font-black text-[#241C15] mt-6">Results that speak for themselves</h2>
               </div>

               <StaggerTestimonials />
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 10. FAQ SECTION                       */}
         {/* ═══════════════════════════════════════ */}
         <FAQSection
            faqsLeft={faqs.slice(0, 3).map(f => ({ question: f.q, answer: f.a }))}
            faqsRight={faqs.slice(3).map(f => ({ question: f.q, answer: f.a }))}
            buttonLabel="Get Started for Free"
            onButtonClick={() => onNavigate?.('/onboarding')}
         />

         {/* ═══════════════════════════════════════ */}
         {/* 11. FINAL CTA BANNER                  */}
         {/* ═══════════════════════════════════════ */}
         <section className="relative overflow-hidden z-10 max-w-6xl mx-auto my-12 lg:my-20 rounded-[32px] bg-[#1A1410] border border-[#D9A94E]/20 shadow-2xl flex flex-col md:flex-row">
            {/* Ambient Lighting & Glows for the right side */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D9A94E]/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Left Image Area */}
            <div 
               className="w-full md:w-5/12 min-h-[350px] relative bg-cover bg-center"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=800&fit=crop&q=80')" }}
            >
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A1410] md:hidden" />
               <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#1A1410] to-transparent hidden md:block opacity-30" />
            </div>

            {/* Right Content Area */}
            <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center text-left relative z-10">
               <span className="text-[#D9A94E] font-bold text-sm tracking-widest uppercase mb-2">Try it risk-free</span>
               
               <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                  Ready to bring customers back?
               </h2>
               
               <p className="text-lg text-gray-400 mb-8 max-w-lg font-medium leading-relaxed">
                  Join hundreds of local businesses growing their revenue with Revia's frictionless loyalty platform.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <button onClick={() => onNavigate?.('/onboarding')} className="bg-[#FAF6EE] text-[#241C15] px-8 py-4 rounded-xl text-lg font-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                     Become Merchant
                  </button>
               </div>
            </div>
         </section>

         {/* ═══════════════════════════════════════ */}
         {/* 12. FOOTER                            */}
         {/* ═══════════════════════════════════════ */}
         <footer className="bg-[#FAF8F5] pt-10 pb-10 relative z-10 font-sans">
            <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative">
               
               {/* The White Card */}
               <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 lg:p-12 relative">
                  
                  {/* Tape Decorations */}
                  <div className="absolute -top-4 -left-4 w-16 h-6 bg-[#D9A94E] -rotate-12 rounded-sm opacity-90 shadow-sm" />
                  <div className="absolute -top-4 -right-4 w-16 h-6 bg-[#D9A94E] rotate-12 rounded-sm opacity-90 shadow-sm" />
                  <div className="absolute -top-3 -right-6 w-12 h-6 bg-[#D9A94E] rotate-[45deg] rounded-sm opacity-90 shadow-sm" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-7">
                     
                     {/* Column 1: Brand */}
                     <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D9A94E] to-[#B8862E] flex items-center justify-center shadow-lg">
                              <span className="text-white font-black text-lg">R</span>
                           </div>
                           <span className="text-2xl font-black tracking-tight text-[#241C15]">Revia</span>
                        </div>
                        <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                           The easiest way for local businesses to build loyalty, retain customers, and grow revenue.
                        </p>
                     </div>

                     {/* Column 2: Product */}
                     <div>
                        <h4 className="font-bold mb-6 text-[13px] tracking-wider text-gray-500 uppercase">Product</h4>
                        <ul className="space-y-4 text-[15px] font-medium text-gray-600">
                           <li>
                              <a href="#features" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <Star className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 Features
                              </a>
                           </li>
                           <li>
                              <a href="#pricing" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <CreditCard className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 Pricing
                              </a>
                           </li>
                           <li>
                              <a href="#how-it-works" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <RefreshCw className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 How It Works
                              </a>
                           </li>
                        </ul>
                     </div>

                     {/* Column 3: Company */}
                     <div>
                        <h4 className="font-bold mb-6 text-[13px] tracking-wider text-gray-500 uppercase">Company</h4>
                        <ul className="space-y-4 text-[15px] font-medium text-gray-600">
                           <li>
                              <a href="#" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <Users className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 About Us
                              </a>
                           </li>
                           <li>
                              <a href="#" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <Megaphone className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 Contact
                              </a>
                           </li>
                           <li>
                              <a href="#" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <Lock className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 Privacy Policy
                              </a>
                           </li>
                           <li>
                              <a href="#" className="flex items-center gap-3 hover:text-[#D9A94E] transition-colors group">
                                 <CheckCircle2 className="w-4 h-4 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                 Terms of Service
                              </a>
                           </li>
                        </ul>
                     </div>

                     {/* Column 4: Contact Info */}
                     <div>
                        <h4 className="font-bold mb-6 text-[13px] tracking-wider text-gray-500 uppercase">Contact</h4>
                        <ul className="space-y-4 text-[15px] font-medium text-gray-600">
                           <li className="flex gap-3">
                              <MapPin className="w-5 h-5 text-[#D9A94E] shrink-0" />
                              <span>123 Innovation Drive<br />Tech City, TC 90210</span>
                           </li>
                           <li className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-[#D9A94E] shrink-0" />
                              <span>(555) 123-4567</span>
                           </li>
                           <li className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-[#D9A94E] shrink-0" />
                              <span>hello@revia.com</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* Bottom Row outside the card */}
               <div className="pt-8 px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-[14px] font-medium text-slate-500">
                  <p>© 2026 Revia. All rights reserved.</p>
                  <div className="flex gap-4">
                     {/* Facebook */}
                     <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 hover:bg-[#D9A94E] hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                     </a>
                     {/* Twitter */}
                     <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 hover:bg-[#D9A94E] hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                     </a>
                     {/* Instagram */}
                     <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 hover:bg-[#D9A94E] hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                           <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};
