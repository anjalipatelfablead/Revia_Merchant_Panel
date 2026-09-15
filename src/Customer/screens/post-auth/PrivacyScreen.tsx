import React, { useState } from 'react';
import { Shield, Bell, Lock, Eye, ChevronRight, ShieldCheck, Download, Trash2, Key, Check, ToggleLeft, ToggleRight, Sparkles, FileText, AlertTriangle, X } from 'lucide-react';

export const PrivacyScreen = ({ onBack }: { onBack: () => void }) => {
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [personalizedOffers, setPersonalizedOffers] = useState(true);
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportedSuccess(true);
      setTimeout(() => setExportedSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-24 space-y-8 animate-in fade-in duration-500">
      
      {/* Hero Header Banner */}
      <div className="bg-[#1A1A1A] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C89B3C]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#C89B3C] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> SOC-2 Compliant
              </span>
              <span className="text-xs text-white/60">• 256-bit Encrypted</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Privacy & Data Control</h1>
            <p className="text-white/70 text-sm max-w-lg">
              Take full control of your personal information, consent preferences, and data privacy rights.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center shrink-0">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Consent Status</p>
            <p className="text-lg font-black text-[#94F1C6] flex items-center justify-center gap-1.5 mt-1">
              <Check className="w-5 h-5" /> Active & Verified
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Preferences & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Toggles & Permissions */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-6 shadow-sm">
            <div className="border-b border-[#F0F0F0] pb-4">
              <h2 className="text-lg font-black text-[#222]">Consent & Communication</h2>
              <p className="text-xs text-[#666] mt-0.5">Toggle real-time permissions for notifications and data usage.</p>
            </div>

            <div className="space-y-6">
              
              {/* Toggle 1: Marketing Notifications */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#C89B3C]" />
                    <p className="text-sm font-bold text-[#222]">Marketing & Offer Alerts</p>
                  </div>
                  <p className="text-xs text-[#666]">Receive SMS and push notifications for double-stamp events and member discounts.</p>
                </div>

                <button 
                  onClick={() => setMarketingConsent(!marketingConsent)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${marketingConsent ? 'bg-[#C89B3C]' : 'bg-[#E6E6E6]'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${marketingConsent ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Toggle 2: Analytics & Insights */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#F0F0F0]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#0D7A53]" />
                    <p className="text-sm font-bold text-[#222]">Anonymous App Analytics</p>
                  </div>
                  <p className="text-xs text-[#666]">Help us improve coffee ordering speed and app performance through aggregated usage telemetry.</p>
                </div>

                <button 
                  onClick={() => setAnalyticsConsent(!analyticsConsent)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${analyticsConsent ? 'bg-[#0D7A53]' : 'bg-[#E6E6E6]'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${analyticsConsent ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Toggle 3: Personalized Recommendations */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#F0F0F0]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C89B3C]" />
                    <p className="text-sm font-bold text-[#222]">Personalized Recommendations</p>
                  </div>
                  <p className="text-xs text-[#666]">Curate custom tasting flights and seasonal recommendations based on your past orders.</p>
                </div>

                <button 
                  onClick={() => setPersonalizedOffers(!personalizedOffers)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${personalizedOffers ? 'bg-[#C89B3C]' : 'bg-[#E6E6E6]'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${personalizedOffers ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

            </div>
          </div>

          {/* Legal Documents Card */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <h2 className="text-xs font-black text-[#999] uppercase tracking-wider">Policies & Legal Terms</h2>
            
            <div className="space-y-2">
              <button 
                onClick={() => setShowPolicyModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#E6E6E6] hover:border-[#C89B3C] hover:bg-[#FFF8ED]/50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#C89B3C]" />
                  <div>
                    <p className="text-sm font-bold text-[#222]">Privacy Policy Statement</p>
                    <p className="text-xs text-[#999]">Version 2.4 • Updated Jan 2026</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999]" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Data Download & Security Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Data Export Card */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8ED] text-[#C89B3C] flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#222]">Your Data Archive</h3>
                <p className="text-xs text-[#666]">Export your personal data and activity records.</p>
              </div>
            </div>

            <p className="text-xs text-[#666] leading-relaxed">
              Download a complete machine-readable JSON copy of your profile, order history, loyalty stamps, and consent logs.
            </p>

            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="w-full bg-[#222] hover:bg-black text-white py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {isExporting ? (
                <span>Generating JSON Archive...</span>
              ) : exportedSuccess ? (
                <span className="text-[#94F1C6] flex items-center gap-1.5"><Check className="w-4 h-4" /> Download Complete (.JSON)</span>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#C89B3C]" /> Request Data Export (.JSON)
                </>
              )}
            </button>
          </div>

          {/* Account Audit Log Preview */}
          <div className="bg-white rounded-3xl border border-[#E6E6E6] p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#999] uppercase tracking-wider">Recent Audit Security Log</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-start pb-2 border-b border-[#F0F0F0]">
                <div>
                  <p className="font-bold text-[#222]">Consent Updated</p>
                  <p className="text-[#999] text-[10px]">Chrome on Windows 11</p>
                </div>
                <span className="text-[#999]">Today, 10:43 AM</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[#222]">Reward Redirection Verified</p>
                  <p className="text-[#999] text-[10px]">Grand Café Central POS</p>
                </div>
                <span className="text-[#999]">Yesterday, 2:15 PM</span>
              </div>
            </div>
          </div>

          {/* Account Deletion Danger Zone */}
          <div className="bg-[#FFF0F0] border border-[#FFCDCD] rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#D32F2F]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-wider">Data Erasure Zone</h3>
            </div>
            <p className="text-xs text-[#666] leading-relaxed">
              Permanently delete your Revia loyalty account, unredeemed stamps, and active coupons.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-3 rounded-2xl text-xs font-black transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Request Account Deletion
            </button>
          </div>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 relative shadow-2xl border border-[#E6E6E6]">
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-4 right-4 text-[#999] hover:text-[#222]">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-[#FFF0F0] text-[#D32F2F] rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#222]">Delete Revia Account?</h3>
              <p className="text-xs text-[#666]">
                This action is permanent. You will forfeit your 7 collected stamps, Gold Tier status, and saved rewards.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 bg-[#F8F8F6] text-[#222] py-3 rounded-xl font-bold text-xs">
                Cancel
              </button>
              <button onClick={() => { alert('Account deletion request submitted!'); setShowDeleteModal(false); }} className="flex-1 bg-[#D32F2F] text-white py-3 rounded-xl font-bold text-xs">
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 relative shadow-2xl border border-[#E6E6E6] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#E6E6E6] pb-4">
              <h3 className="text-lg font-black text-[#222]">Revia Privacy Policy</h3>
              <button onClick={() => setShowPolicyModal(false)} className="text-[#999] hover:text-[#222]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-[#666] space-y-4 leading-relaxed">
              <p>At Revia, we take your privacy seriously. Your data is used exclusively to process orders, maintain loyalty stamp balances, and provide personalized coffee experiences.</p>
              <h4 className="font-bold text-[#222] text-sm">1. Data We Collect</h4>
              <p>We store your phone number, order history, table numbers during dine-in sessions, and loyalty stamp progress. We never sell your personal data to third parties.</p>
              <h4 className="font-bold text-[#222] text-sm">2. Data Security & Encryption</h4>
              <p>All sensitive transactions and account credentials are encrypted using 256-bit SSL technology and compliant with SOC-2 guidelines.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
