import React, { useState } from 'react';
import { Bell, Check, Trash2, Filter } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  detail: string;
  category: 'System' | 'Reward' | 'Security';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'VIP Stamp Redeemed',
    time: '4 mins ago',
    detail: 'Marcus Vance redeemed his 8th stamp at Downtown Flagship register #02.',
    category: 'Reward',
    read: false,
  },
  {
    id: 'NOTIF-02',
    title: 'Reward Voucher Verified',
    time: '11 mins ago',
    detail: 'Elena Rostova claimed "Free Cold Brew & Pastry" voucher #TK-98241 at Northside Mall.',
    category: 'Reward',
    read: false,
  },
  {
    id: 'NOTIF-03',
    title: 'POS Scanner Mesh Health Check',
    time: '25 mins ago',
    detail: 'All 12 Bluetooth & dynamic QR scanners completed scheduled telemetry heartbeat.',
    category: 'System',
    read: true,
  },
  {
    id: 'NOTIF-04',
    title: 'High Velocity Table Scan Alert',
    time: '1 hr ago',
    detail: 'Table 14 at West End Kiosk was scanned 12 times within 60 minutes.',
    category: 'Security',
    read: true,
  },
];

export const NotificationsPage: React.FC = () => {
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllRead = () => {
    setItems(items.map((i) => ({ ...i, read: true })));
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
              Notifications &amp; Activity Alerts
            </h1>
            <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#CEEBD9]">
              {items.filter((i) => !i.read).length} Unread
            </span>
          </div>
          <p className="text-xs text-[#7C746C] mt-1">
            Real-time terminal events, fraud flags, voucher redemptions, and hardware alerts
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Check className="w-3.5 h-3.5 text-[#15803D]" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="bg-white border border-[#EAE6E1] rounded-xl divide-y divide-[#F5F2EC] shadow-2xs">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 flex items-start justify-between gap-4 transition-colors ${
              !item.read ? 'bg-[#FAF8F5]/60' : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  !item.read ? 'bg-[#B38637]' : 'bg-transparent'
                }`}
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1A1615]">{item.title}</span>
                  <span className="text-[10px] uppercase font-bold text-[#8C827A] px-1.5 py-0.2 bg-[#FAF8F5] border border-[#EAE6E1] rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-[#5C554E]">{item.detail}</p>
                <div className="text-[10px] text-[#8C827A] pt-0.5">{item.time}</div>
              </div>
            </div>

            <button
              onClick={() => setItems(items.filter((i) => i.id !== item.id))}
              className="text-[#8C827A] hover:text-[#D32F2F] p-1 cursor-pointer"
              title="Dismiss"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
