import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Lock, Store, MapPin, Phone, Mail, Clock, HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import { MarketingFooter } from '../components/layout/MarketingFooter';

interface Props {
   onNavigate?: (route: string) => void;
}

export const ContactPage: React.FC<Props> = ({ onNavigate }) => {
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
         <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/5 rounded-full blur-[120px] pointer-events-none z-0" />

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
                  <a href="#" onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/about'); }} className="text-2xl font-black border-b border-gray-100 pb-4">About Us</a>
                  <div className="flex flex-col gap-4 mt-auto pb-12">
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/login'); }} className="w-full bg-[#FAF6EE] text-[#241C15] py-4 rounded-xl font-black text-lg border border-[#D9A94E]/20">Log In</button>
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavigate?.('/onboarding'); }} className="w-full bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-[#D9A94E]/30">Become Merchant</button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <main className="pt-32 pb-24 relative z-10 min-h-screen">
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row overflow-hidden relative">
                  {/* Decorative Brand Tape */}
                  <div className="absolute -top-3 -right-4 w-16 h-6 bg-[#D9A94E] rotate-12 rounded-sm opacity-90 shadow-sm z-10 hidden lg:block" />

                  {/* Left Side - Form */}
                  <div className="flex-1 p-8 md:p-12 lg:p-16">
                     <h2 className="text-3xl font-black text-gray-900 mb-8">Send us a message</h2>

                     <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 ml-1">Name</label>
                              <input type="text" className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#D9A94E]/20 focus:border-[#D9A94E] transition-all font-medium placeholder-gray-400 hover:border-gray-300" placeholder="John Doe" />
                           </div>
                           <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 ml-1">Email</label>
                              <input type="email" className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#D9A94E]/20 focus:border-[#D9A94E] transition-all font-medium placeholder-gray-400 hover:border-gray-300" placeholder="john@example.com" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 ml-1">Mobile</label>
                              <input type="tel" className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#D9A94E]/20 focus:border-[#D9A94E] transition-all font-medium placeholder-gray-400 hover:border-gray-300" placeholder="555-123-4567" />
                           </div>
                           <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 ml-1">Purpose</label>
                              <div className="relative">
                                 <select className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#D9A94E]/20 focus:border-[#D9A94E] transition-all font-medium text-gray-600 appearance-none hover:border-gray-300 cursor-pointer">
                                    <option value="" disabled selected>Select a purpose</option>
                                    <option value="sales">Sales Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="billing">Billing Question</option>
                                    <option value="other">Other</option>
                                 </select>
                                 <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-bold text-gray-700 ml-1">Subject</label>
                           <input type="text" className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#D9A94E]/20 focus:border-[#D9A94E] transition-all font-medium placeholder-gray-400 hover:border-gray-300" placeholder="Enter subject.." />
                        </div>

                        <div className="space-y-2">
                           <label className="block text-sm font-bold text-gray-700 ml-1">Message</label>
                           <textarea rows={5} className="w-full px-5 py-3 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#D9A94E]/20 focus:border-[#D9A94E] transition-all font-medium placeholder-gray-400 resize-none hover:border-gray-300" placeholder="Tell us more..."></textarea>
                        </div>

                        <div className="pt-2">
                           <button type="button" className="px-8 py-4 bg-gradient-to-r from-[#D9A94E] to-[#B8862E] text-white rounded-2xl font-black shadow-lg cursor-pointer shadow-[#D9A94E]/20 hover:shadow-xl hover:shadow-[#D9A94E]/40 hover:-translate-y-0.5 transition-all duration-300">
                              Send message
                           </button>
                        </div>
                     </form>
                  </div>

                  {/* Right Side - Contact Info */}
                  <div className="w-full lg:w-[450px] bg-[#FAF8F5] bg-[url('/contact-bg.jpg')] bg-cover bg-center bg-no-repeat p-8 md:p-12 lg:p-16 lg:border-l border-gray-100 flex flex-col justify-center relative">
                     <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/90 backdrop-blur-[2px] pointer-events-none" />
                     <div className="absolute inset-0 bg-gradient-to-b from-[#D9A94E]/10 to-transparent pointer-events-none" />

                     <div className="relative z-10">
                        <h3 className="text-xl font-black text-gray-900 mb-8">Get in touch</h3>

                        <ul className="space-y-6 mb-12">
                           <li className="flex items-start gap-4 text-gray-600 font-medium group cursor-pointer hover:text-[#D9A94E] transition-colors">
                              <Mail className="w-5 h-5 mt-0.5 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity" />
                              <span>hello@revia.com</span>
                           </li>
                           <li className="flex items-start gap-4 text-gray-600 font-medium group cursor-pointer hover:text-[#D9A94E] transition-colors">
                              <Phone className="w-5 h-5 mt-0.5 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity" />
                              <span>+1 (555) 123-4567</span>
                           </li>
                           <li className="flex items-start gap-4 text-gray-600 font-medium group cursor-pointer hover:text-[#D9A94E] transition-colors">
                              <MapPin className="w-5 h-5 mt-0.5 text-[#D9A94E] opacity-70 group-hover:opacity-100 transition-opacity" />
                              <span>123 Innovation Drive<br />Tech City, TC 90210</span>
                           </li>
                           <li className="flex items-start gap-4 text-gray-600 font-medium group">
                              <Clock className="w-5 h-5 mt-0.5 text-[#D9A94E] opacity-70" />
                              <span>Mon-Fri, 9 AM - 5 PM EST</span>
                           </li>
                        </ul>

                        <hr className="border-gray-200 mb-8" />

                        <h3 className="text-xl font-black text-gray-900 mb-6">Quick links</h3>
                        <ul className="space-y-4">
                           <li>
                              <a href="/#faq" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }} className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-[#D9A94E] transition-colors group">
                                 <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-[#D9A94E] transition-colors" />
                                 Check our FAQ for common questions
                              </a>
                           </li>
                           <li>
                              <a href="#" className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-[#D9A94E] transition-colors group">
                                 <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-[#D9A94E] transition-colors" />
                                 Live chat available on the bottom right
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>

               </motion.div>
            </div>
         </main>

         {/* FOOTER */}
         <MarketingFooter onNavigate={onNavigate} />
      </div>
   );
};
