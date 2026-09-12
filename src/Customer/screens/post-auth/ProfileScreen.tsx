import React from 'react';
import { Star, User, Phone, MapPin, Shield, Lock, Bell, Eye, ChevronRight, LogOut } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { LoyaltyCard } from '../../components/shared/LoyaltyCard';

export const ProfileScreen = ({ onPrivacy, onNavigateApp }: { onPrivacy: () => void; onNavigateApp?: (r: string) => void }) => (
  <div className="space-y-5">
    <div className="bg-white rounded-3xl border border-[#E6E6E6] p-5 flex items-center gap-4 shadow-sm">
      <div className="w-14 h-14 bg-[#C89B3C] rounded-full flex items-center justify-center text-white font-black text-xl shrink-0">RS</div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-black text-[#222]">Rohit Sharma</h2>
        <p className="text-xs text-[#666]">Member since Jan 2026</p>
        <Badge variant="gold"><Star className="w-2.5 h-2.5 fill-current" /> Active Member</Badge>
      </div>
      <button className="text-xs font-black text-[#C89B3C] border border-[#C89B3C] px-3 py-1.5 rounded-full hover:bg-[#C89B3C] hover:text-white transition-all shrink-0">Edit</button>
    </div>

    <div className="bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm">
      <div className="px-4 py-3.5 border-b border-[#E6E6E6]">
        <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Personal Information</h3>
      </div>
      <div className="divide-y divide-[#F5F5F5]">
        {[{ Icon: User, label: 'Full Name', val: 'Rohit Sharma' }, { Icon: Phone, label: 'Mobile', val: '+91 XXXXX 43210' }, { Icon: MapPin, label: 'Branch', val: 'Downtown Branch' }].map(row => (
          <div key={row.label} className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-8 h-8 bg-[#F8F8F6] rounded-xl flex items-center justify-center shrink-0">
              <row.Icon className="w-4 h-4 text-[#999]" />
            </div>
            <div>
              <p className="text-[10px] text-[#999] font-bold">{row.label}</p>
              <p className="text-sm font-bold text-[#222]">{row.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm">
      <div className="px-4 py-3.5 border-b border-[#E6E6E6]">
        <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Loyalty Membership</h3>
      </div>
      <div className="p-4">
        <LoyaltyCard stamps={8} total={10} name="Rohit Sharma" compact />
      </div>
    </div>

    <div className="bg-white rounded-2xl border border-[#E6E6E6] overflow-hidden shadow-sm">
      <div className="px-4 py-3.5 border-b border-[#E6E6E6]">
        <h3 className="text-xs font-black text-[#222] uppercase tracking-wider">Privacy & Consent</h3>
      </div>
      <div className="divide-y divide-[#F5F5F5]">
        {[
          { Icon: Shield, label: 'Consent Status', val: 'Granted', badge: <Badge variant="green">Active</Badge>, action: false },
          { Icon: Lock, label: 'Privacy Settings', val: 'Manage', badge: null, action: true },
          { Icon: Bell, label: 'Notifications', val: 'Enabled', badge: <Badge variant="green">On</Badge>, action: false },
          { Icon: Eye, label: 'Data Controls', val: 'View', badge: null, action: true },
        ].map((row, i) => (
          <button key={i} onClick={row.action ? onPrivacy : undefined}
            className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${row.action ? 'hover:bg-[#FAFAFA] transition-colors' : ''}`}>
            <div className="w-8 h-8 bg-[#F8F8F6] rounded-xl flex items-center justify-center shrink-0">
              <row.Icon className="w-4 h-4 text-[#999]" />
            </div>
            <p className="flex-1 text-sm font-bold text-[#222]">{row.label}</p>
            {row.badge || <span className="text-xs font-black text-[#C89B3C]">{row.val}</span>}
            {row.action && <ChevronRight className="w-3.5 h-3.5 text-[#bbb]" />}
          </button>
        ))}
      </div>
    </div>

    <button onClick={() => onNavigateApp?.('/customer-landing')}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-100 text-red-400 text-sm font-black hover:bg-red-50 transition-colors">
      <LogOut className="w-4 h-4" /> Sign Out
    </button>
  </div>
);
