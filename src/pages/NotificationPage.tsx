import React, { useState } from 'react';
import {
	AlertTriangle,
	Bell,
	CheckCircle2,
	CircleDollarSign,
	Gift,
	Megaphone,
	Users,
} from 'lucide-react';

interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	location: string;
	kind: 'success' | 'reward' | 'customer' | 'warning' | 'campaign';
	read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
	{ id: 'redeemed-reward', title: 'Reward redeemed', description: 'Aisha Rahman redeemed a free cold brew at Downtown Flagship.', time: '2 min ago', location: 'Downtown Flagship', kind: 'reward', read: false },
	{ id: 'daily-sales', title: 'Daily sales target reached', description: 'Downtown Flagship crossed today\'s sales target of $2,500.', time: '18 min ago', location: 'Downtown Flagship', kind: 'success', read: false },
	{ id: 'new-member', title: 'New loyalty member joined', description: 'Welcome Maya Chen, who joined through the in-store QR code.', time: '42 min ago', location: 'Northside Mall', kind: 'customer', read: false },
	{ id: 'stock-warning', title: 'Inventory running low', description: 'Ethiopia Yirgacheffe is down to 8 units. Review your catalog stock.', time: '1 hr ago', location: 'Roastery Reserve', kind: 'warning', read: true },
	{ id: 'campaign-live', title: 'Campaign completed', description: 'The Weekend Double Stamps campaign reached 1,248 customers.', time: '3 hrs ago', location: 'All branches', kind: 'campaign', read: true },
	{ id: 'payment-settled', title: 'Payment settlement received', description: 'Your $8,420.50 settlement has been deposited successfully.', time: 'Yesterday', location: 'Merchant account', kind: 'success', read: true },
	{ id: 'branch-online', title: 'Branch back online', description: 'The West End Kiosk scanner is online and accepting check-ins.', time: 'Yesterday', location: 'West End Kiosk', kind: 'success', read: true },
];

export const NotificationPage: React.FC = () => {
	const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
	const [filter, setFilter] = useState<'all' | 'unread'>('all');
	const unreadCount = items.filter((item) => !item.read).length;
	const visibleItems = filter === 'unread' ? items.filter((item) => !item.read) : items;

	const markAllRead = () => setItems((currentItems) => currentItems.map((item) => ({ ...item, read: true })));
	const markRead = (id: string) => setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, read: true } : item));
	const iconFor = (kind: NotificationItem['kind']) => {
		if (kind === 'reward') return Gift;
		if (kind === 'customer') return Users;
		if (kind === 'warning') return AlertTriangle;
		if (kind === 'campaign') return Megaphone;
		if (kind === 'success') return CheckCircle2;
		return CircleDollarSign;
	};
	const toneFor = (kind: NotificationItem['kind']) => {
		if (kind === 'reward') return { icon: 'bg-[#FFF4DC] text-[#B77A16]', label: 'Reward' };
		if (kind === 'customer') return { icon: 'bg-[#EEF4FF] text-[#4C7FEA]', label: 'Customer' };
		if (kind === 'warning') return { icon: 'bg-[#FFF0ED] text-[#D25F48]', label: 'Attention' };
		if (kind === 'campaign') return { icon: 'bg-[#F3EEFF] text-[#8064D7]', label: 'Campaign' };
		return { icon: 'bg-[#EAF9F1] text-[#1DA765]', label: 'Business' };
	};

	return (
		<div className="min-h-full bg-white">
			<div className="border-b border-[#E5EAF0] px-4 py-5 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<div className="flex items-center gap-2">
							<Bell className="h-5 w-5 text-[#D4A753]" />
							<h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Notifications</h1>
							<span className="rounded-full bg-[#EBF7F0] px-2.5 py-0.5 text-[11px] font-bold text-[#15803D] border border-[#15803D]/20">{unreadCount} new</span>
						</div>
						<p className="mt-1 text-sm text-[#7C746C]">Manage all your system alerts and real-time updates.</p>
					</div>
					<button type="button" onClick={markAllRead} disabled={unreadCount === 0} className="self-start rounded-lg bg-gradient-to-r from-[#D4A753] to-[#9E782F] px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:cursor-default disabled:opacity-40">Mark all as read</button>
				</div>
			</div>

			<div className="border-b border-[#E5EAF0] px-4 py-3 sm:px-6 lg:px-8">
				<div className="flex items-center gap-1">
					{(['all', 'unread'] as const).map((option) => <button key={option} type="button" onClick={() => setFilter(option)} className={`rounded-md px-3 py-1.5 text-[12px] font-medium capitalize ${filter === option ? 'bg-[#F0F5FB] text-[#315EA8]' : 'text-[#8393A8] hover:bg-[#F7F9FC]'}`}>{option}{option === 'unread' && ` (${unreadCount})`}</button>)}
				</div>
			</div>

			<div className="divide-y divide-[#E5EAF0]">
				{visibleItems.length === 0 ? <div className="px-6 py-16 text-center text-[14px] text-[#7B8DA6]">You are all caught up.</div> : visibleItems.map((item) => {
					const Icon = iconFor(item.kind);
					const tone = toneFor(item.kind);
					return <div key={item.id} className={`group flex min-h-[86px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8 ${!item.read ? 'bg-[#FCFDFF]' : 'bg-white'}`}>
						<div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.icon}`}><Icon className="h-[17px] w-[17px]" strokeWidth={1.8} /></div>
						<div className="min-w-0 flex-1">
							<div className="flex flex-wrap items-center gap-2"><h2 className={`text-[14px] text-[#263A55] ${!item.read ? 'font-bold' : 'font-light'}`}>{item.title}</h2><span className="text-[10px] text-[#8C9BAE]">{tone.label}</span>{!item.read && <span className="h-1.5 w-1.5 rounded-full bg-[#4C7FEA]" />}</div>
							<p className={`mt-1 text-[13px] ${!item.read ? 'text-[#4A6079]' : 'font-light text-[#8291A4]'}`}>{item.description}</p>
							<p className="mt-1 text-[11px] text-[#93A0B0]">{item.time} <span className="mx-1 text-[#D2DAE3]">•</span> {item.location}</p>
						</div>
						<button type="button" onClick={() => markRead(item.id)} disabled={item.read} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#BCE3D1] bg-[#EAF8F0] px-3 py-1.5 text-[12px] font-medium text-[#178252] transition-colors hover:border-[#8FD0AE] hover:bg-[#DFF5E8] disabled:cursor-default disabled:opacity-100"><span className="h-1.5 w-1.5 rounded-full bg-[#27A96B]" />Read</button>
					</div>;
				})}
			</div>
		</div>
	);
};
