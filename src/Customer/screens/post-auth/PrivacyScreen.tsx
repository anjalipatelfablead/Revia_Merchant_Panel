import React from 'react';
import { Shield, Bell, Lock, Eye, ChevronRight } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { BackBtn } from '../../components/ui/Buttons';

export const PrivacyScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="space-y-5">
    <BackBtn onClick={onBack} />
    <div>
      <h2 className="text-xl font-black text-[#222] mb-0.5">Privacy & Data</h2>
      <p className="text-sm text-[#666]">Your data, your control.</p>
    </div>
    <div className="bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm">
      {[
        { Icon: Shield, label: 'Consent Status', val: 'Granted · Jan 2026', badge: <Badge variant="green">Active</Badge> },
        { Icon: Bell, label: 'Marketing Consent', val: 'Enabled', badge: <Badge variant="green">On</Badge> },
        { Icon: Lock, label: 'Privacy Policy', val: 'View Policy', badge: null },
        { Icon: Eye, label: 'Your Data', val: 'Manage', badge: null },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-4 border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-[#F8F8F6] rounded-xl flex items-center justify-center shrink-0">
            <row.Icon className="w-4 h-4 text-[#999]" />
          </div>
          <p className="flex-1 text-sm font-bold text-[#222]">{row.label}</p>
          {row.badge || <span className="text-xs font-black text-[#C89B3C]">{row.val}</span>}
          <ChevronRight className="w-3.5 h-3.5 text-[#bbb]" />
        </div>
      ))}
    </div>
    <div className="bg-[#F8F8F6] rounded-2xl p-4 border border-[#E6E6E6]">
      <p className="text-xs text-[#666] leading-relaxed">Your data is used only to manage your loyalty membership. You have the right to manage your consent and privacy preferences. For data requests or concerns, contact us through the privacy policy.</p>
    </div>
  </div>
);
