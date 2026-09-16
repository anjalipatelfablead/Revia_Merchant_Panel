import React, { useState, useMemo } from 'react';
import {
	Bell,
	CheckCheck,
	RotateCcw,
	Trash2,
	Megaphone,
	Percent,
	Star,
	Award,
	Tag,
	AlertCircle,
	X
} from 'lucide-react';

export interface NotificationItem {
	id: string;
	title: string;
	description: string;
	time: string;
	location: string;
	type: 'campaign' | 'discount' | 'loyalty' | 'stamp' | 'offer';
	read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
	{
		id: '1',
		title: 'New Campaign Created',
		description: 'Your campaign "Weekend Special Sale" is now live and accepting orders.',
		time: '10 min ago',
		location: 'Main Branch • Downtown',
		type: 'campaign',
		read: false
	},
	{
		id: '2',
		title: 'Flat 20% Discount Approved',
		description: 'The flat discount rule has been verified for all eligible registered customers.',
		time: '25 min ago',
		location: 'All Branches',
		type: 'discount',
		read: false
	},
	{
		id: '3',
		title: 'Loyalty Tier Unlocked',
		description: '15 existing customers upgraded to VIP Tier after completing 5 visits.',
		time: '1 hour ago',
		location: 'Westside Hub',
		type: 'loyalty',
		read: true
	},
	{
		id: '4',
		title: 'Stamp Rule Milestone Reached',
		description: 'Customer #4902 collected 10 stamps and redeemed a free beverage.',
		time: '3 hours ago',
		location: 'Main Branch • Downtown',
		type: 'stamp',
		read: true
	},
	{
		id: '5',
		title: 'BOGO Offer Expiring Soon',
		description: 'The "Buy 1 Get 1 Coffee" campaign is scheduled to end in 2 hours.',
		time: '5 hours ago',
		location: 'Uptown Corner',
		type: 'offer',
		read: true
	}
];

const CATEGORY_TONE: Record<NotificationItem['type'], { icon: React.ElementType; iconStyle: string; label: string }> = {
	campaign: { icon: Megaphone, iconStyle: 'bg-amber-100 text-amber-700', label: 'Campaign' },
	discount: { icon: Percent, iconStyle: 'bg-emerald-100 text-emerald-700', label: 'Discount' },
	loyalty: { icon: Star, iconStyle: 'bg-purple-100 text-purple-700', label: 'Loyalty' },
	stamp: { icon: Award, iconStyle: 'bg-blue-100 text-blue-700', label: 'Stamp' },
	offer: { icon: Tag, iconStyle: 'bg-rose-100 text-rose-700', label: 'Offer' }
};

interface DeleteModalState {
	isOpen: boolean;
	type: 'single' | 'selected' | 'clearAll';
	targetId?: string;
	targetTitle?: string;
	count?: number;
}

export const NotificationPage: React.FC = () => {
	const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
	const [filter, setFilter] = useState<'all' | 'unread'>('all');
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
		isOpen: false,
		type: 'single'
	});

	const unreadCount = useMemo(() => items.filter((i) => !i.read).length, [items]);

	const visibleItems = useMemo(() => {
		if (filter === 'unread') return items.filter((i) => !i.read);
		return items;
	}, [items, filter]);

	const allVisibleSelected = useMemo(() => {
		if (visibleItems.length === 0) return false;
		return visibleItems.every((item) => selectedIds.includes(item.id));
	}, [visibleItems, selectedIds]);

	const isAnySelected = selectedIds.length > 0;

	// Item status modifiers
	const markRead = (id: string) => {
		setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
	};

	const markAllRead = () => {
		setItems((prev) => prev.map((item) => ({ ...item, read: true })));
	};

	const restoreDefaults = () => {
		setItems(INITIAL_NOTIFICATIONS);
		setSelectedIds([]);
	};

	// Selection handlers
	const toggleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		);
	};

	const toggleSelectAll = () => {
		if (allVisibleSelected) {
			const visibleIds = visibleItems.map((i) => i.id);
			setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
		} else {
			const visibleIds = visibleItems.map((i) => i.id);
			setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
		}
	};

	// Delete Modal Triggers
	const openSingleDeleteModal = (id: string, title: string) => {
		setDeleteModal({
			isOpen: true,
			type: 'single',
			targetId: id,
			targetTitle: title
		});
	};

	const openSelectedDeleteModal = () => {
		if (selectedIds.length === 0) return;
		setDeleteModal({
			isOpen: true,
			type: 'selected',
			count: selectedIds.length
		});
	};

	const openClearAllModal = () => {
		if (items.length === 0) return;
		setDeleteModal({
			isOpen: true,
			type: 'clearAll',
			count: items.length
		});
	};

	const closeModal = () => {
		setDeleteModal({ isOpen: false, type: 'single' });
	};

	// Delete Execution logic
	const confirmDelete = () => {
		if (deleteModal.type === 'single' && deleteModal.targetId) {
			const targetId = deleteModal.targetId;
			setItems((prev) => prev.filter((i) => i.id !== targetId));
			setSelectedIds((prev) => prev.filter((id) => id !== targetId));
		} else if (deleteModal.type === 'selected') {
			setItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
			setSelectedIds([]);
		} else if (deleteModal.type === 'clearAll') {
			setItems([]);
			setSelectedIds([]);
		}
		closeModal();
	};

	return (
		<div className="p-4 lg:p-6 space-y-6 flex-1 max-w-[1600px] mx-auto w-full">
			<div className="rounded-2xl border border-[#E5EAF0] bg-white shadow-xs">
			{/* Page Header */}
			<div className="border-b border-[#E5EAF0] p-4 sm:p-6 lg:p-8">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<div className="flex items-center gap-3">
							<Bell className="h-7 w-7 text-[#D4A753]" />
							<h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#1A1615]">Notifications</h1>
							<span className="rounded-full bg-[#EBF7F0] px-2.5 py-0.5 text-[11px] font-bold text-[#15803D] border border-[#15803D]/20">
								{unreadCount} new
							</span>
						</div>
						<p className="mt-1 text-sm text-[#7C746C]">
							Manage all your system alerts, real-time updates, and notification settings.
						</p>
					</div>

					<div className="flex items-center gap-2 shrink-0">
						<button
							type="button"
							onClick={markAllRead}
							disabled={unreadCount === 0}
							className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#D4A753] to-[#9E782F] px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:cursor-default disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
						>
							<CheckCheck className="h-4 w-4" />
							Mark all as read
						</button>

						{items.length < INITIAL_NOTIFICATIONS.length && (
							<button
								type="button"
								onClick={restoreDefaults}
								className="flex items-center gap-1.5 rounded-lg border border-[#EFECE6] bg-[#FAF8F5] px-3 py-2.5 text-xs font-bold text-[#6E6A66] hover:bg-[#EFECE6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
								title="Reset mock notifications"
							>
								<RotateCcw className="h-3.5 w-3.5" />
								Reset
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Action Toolbar: Filter Tabs & Bulk Actions */}
			<div className="border-b border-[#E5EAF0] px-4 py-3 sm:px-6 lg:px-8 bg-[#FAF9F7]/60 flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					{/* Select All Checkbox */}
					{visibleItems.length > 0 && (
						<label className="flex items-center gap-2 text-xs font-bold text-[#1A1615] cursor-pointer select-none">
							<input
								type="checkbox"
								checked={allVisibleSelected}
								onChange={toggleSelectAll}
								className="w-4 h-4 rounded border-[#D1CDC7] text-[#D4A753] focus:ring-[#D4A753] cursor-pointer"
							/>
							<span className="hidden sm:inline">Select All</span>
						</label>
					)}

					{/* Filter Tabs */}
					<div className="flex items-center gap-1">
						{(['all', 'unread'] as const).map((option) => (
							<button
								key={option}
								type="button"
								onClick={() => setFilter(option)}
								className={`rounded-md px-3 py-1.5 text-[12px] font-bold capitalize transition-colors cursor-pointer ${
									filter === option
										? 'bg-white border border-[#EFECE6] text-[#1A1615] shadow-2xs'
										: 'text-[#7C746C] hover:bg-white/60'
								}`}
							>
								{option}
								{option === 'unread' && ` (${unreadCount})`}
							</button>
						))}
					</div>
				</div>

				{/* Bulk Action Controls */}
				<div className="flex items-center gap-2">
					{isAnySelected ? (
						<button
							type="button"
							onClick={openSelectedDeleteModal}
							className="flex items-center gap-1.5 rounded-lg bg-[#FEE2E2] border border-[#FECACA] px-3 py-1.5 text-xs font-bold text-[#DC2626] hover:bg-[#FCA5A5] transition-colors cursor-pointer shadow-2xs"
						>
							<Trash2 className="h-3.5 w-3.5" />
							Delete Selected ({selectedIds.length})
						</button>
					) : (
						items.length > 0 && (
							<button
								type="button"
								onClick={openClearAllModal}
								className="flex items-center gap-1.5 rounded-lg border border-[#EFECE6] bg-white px-3 py-1.5 text-xs font-bold text-[#7C746C] hover:text-[#DC2626] hover:bg-[#FFF5F5] hover:border-[#FECACA] transition-colors cursor-pointer"
							>
								<Trash2 className="h-3.5 w-3.5" />
								Clear All
							</button>
						)
					)}
				</div>
			</div>

			{/* Notifications List */}
			<div className="divide-y divide-[#E5EAF0]">
				{visibleItems.length === 0 ? (
					<div className="px-6 py-16 text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F5] text-[#9E9A93]">
							<Bell className="h-6 w-6" />
						</div>
						<h3 className="mt-3 text-sm font-bold text-[#1A1615]">No notifications found</h3>
						<p className="mt-1 text-xs text-[#7C746C]">
							{filter === 'unread'
								? 'You have read all your notifications!'
								: 'All caught up! No notifications to display.'}
						</p>
					</div>
				) : (
					visibleItems.map((item) => {
						const tone = CATEGORY_TONE[item.type];
						const Icon = tone.icon;
						const isSelected = selectedIds.includes(item.id);

						return (
							<div
								key={item.id}
								className={`group flex min-h-[86px] items-center gap-3.5 px-4 py-4 sm:px-6 lg:px-8 transition-colors ${
									isSelected ? 'bg-[#FDF8EB]/50' : !item.read ? 'bg-[#FCFDFF]' : 'bg-white hover:bg-[#FAF8F5]/60'
								}`}
							>
								{/* Selection Checkbox */}
								<input
									type="checkbox"
									checked={isSelected}
									onChange={() => toggleSelect(item.id)}
									className="w-4 h-4 rounded border-[#D1CDC7] text-[#D4A753] focus:ring-[#D4A753] cursor-pointer shrink-0"
								/>

								{/* Notification Category Icon */}
								<div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.iconStyle}`}>
									<Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
								</div>

								{/* Notification Content */}
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<h2 className={`text-[14px] text-[#263A55] ${!item.read ? 'font-bold' : 'font-normal'}`}>
											{item.title}
										</h2>
										<span className="text-[10px] font-bold uppercase tracking-wider text-[#8C9BAE]">
											{tone.label}
										</span>
										{!item.read && <span className="h-1.5 w-1.5 rounded-full bg-[#4C7FEA]" />}
									</div>
									<p className={`mt-1 text-[13px] ${!item.read ? 'text-[#4A6079] font-semibold' : 'text-[#8291A4]'}`}>
										{item.description}
									</p>
									<p className="mt-1 text-[11px] text-[#93A0B0] font-medium">
										{item.time} <span className="mx-1 text-[#D2DAE3]">•</span> {item.location}
									</p>
								</div>

								{/* Action Buttons: Mark Read + Delete */}
								<div className="flex items-center gap-2 shrink-0">
									{!item.read && (
										<button
											type="button"
											onClick={() => markRead(item.id)}
											className="inline-flex items-center gap-1.5 rounded-full border border-[#BCE3D1] bg-[#EAF8F0] px-3 py-1 text-[11px] font-bold text-[#178252] transition-colors hover:border-[#8FD0AE] hover:bg-[#DFF5E8] cursor-pointer"
										>
											<span className="h-1.5 w-1.5 rounded-full bg-[#27A96B]" />
											Mark Read
										</button>
									)}

									<button
										type="button"
										onClick={() => openSingleDeleteModal(item.id, item.title)}
										className="p-1.5 rounded-lg border border-[#EFECE6] text-[#9E9A93] hover:text-[#DC2626] hover:bg-[#FEE2E2]/60 hover:border-[#FECACA] transition-colors cursor-pointer"
										title="Delete notification"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						);
					})
				)}
			</div>

			{/* Delete Confirmation Modal */}
			{deleteModal.isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#E5EAF0] animate-in zoom-in-95 duration-150">
						{/* Close button */}
						<button
							type="button"
							onClick={closeModal}
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
						>
							<X className="h-5 w-5" />
						</button>

						{/* Modal Content */}
						<div className="flex flex-col items-center text-center">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
								<AlertCircle className="h-8 w-8" />
							</div>

							<h3 className="text-lg font-bold text-[#1A1615]">
								{deleteModal.type === 'single' && 'Delete Notification?'}
								{deleteModal.type === 'selected' && 'Delete Selected Notifications?'}
								{deleteModal.type === 'clearAll' && 'Clear All Notifications?'}
							</h3>

							<p className="mt-2 text-sm text-[#7C746C] leading-relaxed">
								{deleteModal.type === 'single' && (
									<>
										Are you sure you want to delete <span className="font-semibold text-[#1A1615]">"{deleteModal.targetTitle}"</span>? This action cannot be undone.
									</>
								)}
								{deleteModal.type === 'selected' && (
									<>
										Are you sure you want to delete <span className="font-semibold text-[#1A1615]">{deleteModal.count}</span> selected notification(s)? This action cannot be undone.
									</>
								)}
								{deleteModal.type === 'clearAll' && (
									<>
										Are you sure you want to clear all <span className="font-semibold text-[#1A1615]">{deleteModal.count}</span> active notification(s)? This action cannot be undone.
									</>
								)}
							</p>

							{/* Action buttons */}
							<div className="mt-6 flex w-full gap-3">
								<button
									type="button"
									onClick={closeModal}
									className="flex-1 rounded-xl border border-[#EFECE6] bg-[#FAF8F5] py-2.5 text-sm font-bold text-[#6E6A66] hover:bg-[#EFECE6] transition-colors cursor-pointer"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={confirmDelete}
									className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-red-700 transition-colors cursor-pointer"
								>
									{deleteModal.type === 'clearAll' ? 'Clear All' : 'Delete'}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	</div>
);
};

export default NotificationPage;
