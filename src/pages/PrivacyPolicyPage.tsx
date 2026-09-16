import React from 'react';
import { motion } from 'motion/react';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';

interface Props {
   onNavigate?: (route: string) => void;
}

export const PrivacyPolicyPage: React.FC<Props> = ({ onNavigate }) => {
   return (
      <div className="min-h-screen bg-[#FAF6EE] text-[#241C15] font-sans selection:bg-[#D9A94E]/20 relative overflow-hidden">
         <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#D9A94E]/10 rounded-full blur-[120px] pointer-events-none z-0" />
         
         <MarketingNavbar onNavigate={onNavigate} />

         <main className="pt-28 sm:pt-32 pb-12 relative z-10">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-xl rounded-3xl p-10 lg:p-16 shadow-sm border border-gray-100 relative">
                  <div className="absolute -top-4 -left-4 w-16 h-6 bg-[#D9A94E] -rotate-12 rounded-sm opacity-90 shadow-sm" />
                  
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-[#241C15] mb-4">Privacy Policy</h1>
                  <p className="text-gray-500 font-medium mb-10 border-b border-gray-100 pb-10">Last Updated: September 14, 2026</p>

                  <div className="prose prose-lg max-w-none text-gray-600 font-medium space-y-6">
                     <p>At Revia, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our platform.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
                     <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products, or otherwise contact us.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
                     <p>We use the information we collect to operate, maintain, and provide the features and functionality of the platform, as well as to communicate directly with you.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Security of Your Information</h3>
                     <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
                     
                     <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Contact Us</h3>
                     <p>If you have questions or comments about this Privacy Policy, please contact us at privacy@revia.app.</p>
                  </div>
               </motion.div>
            </div>
         </main>

         {/* FOOTER */}
         <MarketingFooter onNavigate={onNavigate} />
      </div>
   );
};
