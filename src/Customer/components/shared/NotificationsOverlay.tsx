import React from 'react';
import { X, Bell, CookingPot, Award, Sparkles, Check, ChevronRight } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'order' | 'tier' | 'reward';
  unread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Order Status Update',
    desc: 'Your order #REV-4921 is now being prepared in the kitchen!',
    time: '2 mins ago',
    type: 'order',
    unread: true
  },
  {
    id: 'n2',
    title: 'Loyalty Stamp Earned! ☕',
    desc: 'You collected 1 stamp at Grand Café. 3 stamps left until free drink!',
    time: '1 hour ago',
    type: 'reward',
    unread: true
  },
  {
    id: 'n3',
    title: 'Gold Tier Perks Unlocked 👑',
    desc: 'You earned 1.5x multiplier on all purchases. Enjoy your perks!',
    time: 'Yesterday',
    type: 'tier',
    unread: false
  }
];

export const NotificationsOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E6E6E6]">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-[#C89B3C]" />
            <h2 className="text-lg font-black text-[#222]">Notifications</h2>
            <span className="bg-[#FFF8ED] text-[#C89B3C] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#F5DEB3]">
              {MOCK_NOTIFICATIONS.filter(n => n.unread).length} new
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F8F8F6] text-[#666]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {MOCK_NOTIFICATIONS.map(n => {
            const Icon = n.type === 'order' ? CookingPot : n.type === 'reward' ? Award : Sparkles;

            return (
              <div 
                key={n.id}
                className={`p-4 rounded-2xl border transition-all space-y-1.5 ${
                  n.unread ? 'bg-[#FFF8ED]/40 border-[#F5DEB3]' : 'bg-white border-[#E6E6E6]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FFF8ED] text-[#C89B3C] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-black text-[#222]">{n.title}</p>
                  </div>
                  <span className="text-[10px] text-[#999] font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-[#666] leading-relaxed pl-9">{n.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E6E6E6] bg-[#F8F8F6]">
          <button 
            onClick={onClose}
            className="w-full bg-[#222] hover:bg-black text-white py-3 rounded-xl text-xs font-bold transition-all text-center"
          >
            Mark All as Read
          </button>
        </div>

      </div>
    </div>
  );
};
