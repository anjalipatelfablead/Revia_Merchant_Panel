export const MOCK_BUSINESS = { name: 'Grand Café', branch: 'Downtown Branch', logo: 'GC', color: '#C89B3C' };

export const MOCK_OFFERS = [
  { id: '1', type: 'Loyalty Offer', title: 'Double Stamps Weekend', desc: 'Earn 2 stamps instead of 1 on qualifying visits this weekend.', value: '2× Stamps', validity: 'Valid Sat–Sun', branch: 'Downtown Branch', status: 'active' as const },
  { id: '2', type: 'Special Offer', title: 'Buy 1 Get 1 Free', desc: 'Buy any regular beverage and get a second of equal or lesser value free.', value: 'BOGO', validity: 'Expires 30 Sep', branch: 'All Branches', status: 'active' as const },
  { id: '3', type: 'Campaign Offer', title: 'Summer Flash Sale', desc: '15% off all specialty drinks.', value: '15% OFF', validity: 'Expired 1 Sep', branch: 'Downtown Branch', status: 'expired' as const },
  { id: '4', type: 'Branch Offer', title: 'Grand Opening Bonus', desc: 'Triple stamps on your first visit to our Canary Wharf location.', value: '3× Stamps', validity: 'Paused', branch: 'Canary Wharf', status: 'paused' as const },
];

export const MOCK_COUPONS = [
  { id: 'c1', type: 'Welcome Coupon', title: '₹10 Off Your Next Meal', desc: 'Get ₹10 off when you spend ₹50 or more on your next visit.', value: '₹10 OFF', validity: 'Valid 30 Days', branch: 'All Branches', status: 'active' as const },
  { id: 'c2', type: 'Birthday Coupon', title: 'Free Dessert', desc: 'Celebrate your birthday with a free dessert of your choice.', value: 'FREE', validity: 'Expires 15 Oct', branch: 'Downtown Branch', status: 'active' as const },
];
export const MOCK_ADDONS = [
  { id: 'a1', name: 'Extra Shot', price: 0.5, icon: 'Coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 'a2', name: 'Soy Milk', price: 0.3, icon: 'Droplet', image: 'https://images.unsplash.com/photo-1588720188725-780c85c2d3bc?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: 'a3', name: 'Whipped Cream', price: 0.4, icon: 'Cloud', image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=100&h=100' },
];

export const MOCK_REWARDS = {
  available: [{ id: 'r1', title: 'Free Coffee', value: '10% OFF', source: 'Loyalty Program · 10 Stamps', validity: 'Valid until 30 Sep 2026', code: 'REVIA-8F42K', business: 'Grand Café', branch: 'Downtown Branch' }],
  redeemed: [{ id: 'r2', title: 'Buy 1 Get 1', value: 'BOGO', source: 'Special Campaign', validity: 'Redeemed 2 Sep 2026', code: 'REVIA-7X9PM', business: 'Grand Café', branch: 'All Branches' }],
  expired: [],
  voided: [],
};

export const MOCK_HISTORY = [
  { id: '1', date: 'Today', type: 'redemption', icon: 'check', title: 'Reward Redeemed', sub: '10% OFF · Grand Café — Downtown', time: '7:42 PM', badge: 'Redeemed' },
  { id: '2', date: 'Today', type: 'loyalty', icon: 'star', title: 'Loyalty Progress', sub: '8 / 10 Stamps', time: '2:34 PM', badge: '+1 Stamp' },
  { id: '3', date: 'Yesterday', type: 'reward', icon: 'gift', title: 'Reward Earned', sub: '10% OFF Any Purchase', time: '11:20 AM', badge: 'New' },
  { id: '4', date: '5 Sep', type: 'visit', icon: 'check', title: 'Visit Recorded', sub: 'Grand Café · Downtown Branch', time: '3:15 PM', badge: null },
  { id: '5', date: '2 Sep', type: 'loyalty', icon: 'star', title: 'Loyalty Progress', sub: '7 / 10 Stamps', time: '1:00 PM', badge: '+1 Stamp' },
  { id: '6', date: '2 Sep', type: 'visit', icon: 'check', title: 'Visit Recorded', sub: 'Grand Café · Downtown Branch', time: '12:50 PM', badge: null },
];

import { CustomerMembership, Campaign, CustomerCampaignProgress } from '../../types/campaign';

export const MOCK_MEMBERSHIP: CustomerMembership = {
  customerId: 'cust-123',
  tier: 'VIP',
  totalBilledAmount: 125000,
  startDate: '2026-01-01',
  expiryDate: '2026-12-31',
  status: 'Active'
};

export const MOCK_ACTIVE_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    merchantId: 'm-1',
    name: 'Coffee Lover Stamps',
    category: 'Existing_Customer',
    type: 'Stamp',
    qualifyingItemId: 'item-coffee',
    qualifyingItemName: 'Any Coffee',
    requiredStamps: 10,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'Active',
    rewardType: 'Free_Item',
    rewardValue: 'Free Coffee'
  },
  {
    id: 'camp-2',
    merchantId: 'm-1',
    name: 'High Roller Monthly',
    category: 'Existing_Customer',
    type: 'Billing',
    frequency: 'Monthly',
    targetBillingAmount: 100000,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    status: 'Active',
    rewardType: 'Cashback',
    rewardValue: 500
  },
  {
    id: 'camp-3',
    merchantId: 'm-1',
    name: 'Weekend Happy Hours',
    category: 'Happy_Hours',
    startTime: '14:00',
    endTime: '18:00',
    applicableDays: ['Saturday', 'Sunday'],
    excludeHolidays: true,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'Active',
    rewardType: 'Discount_Percentage',
    rewardValue: 20
  }
];

export const MOCK_CAMPAIGN_PROGRESS: CustomerCampaignProgress[] = [
  {
    campaignId: 'camp-1',
    campaignName: 'Coffee Lover Stamps',
    type: 'Stamp',
    currentProgress: 7,
    targetProgress: 10,
    progressText: '7 / 10 Stamps',
    rewardType: 'Free_Item',
    rewardValue: 'Free Coffee'
  },
  {
    campaignId: 'camp-2',
    campaignName: 'High Roller Monthly',
    type: 'Billing',
    currentProgress: 45000,
    targetProgress: 100000,
    progressText: '₹45,000 / ₹1,00,000',
    rewardType: 'Cashback',
    rewardValue: '₹500 Cashback'
  }
];
