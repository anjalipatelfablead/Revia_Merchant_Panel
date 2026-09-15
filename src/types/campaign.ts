export type CustomerTier = 'Bronze' | 'Silver' | 'Gold' | 'VIP' | 'VVIP' | 'Regular';

export interface CustomerMembership {
  customerId: string;
  tier: CustomerTier;
  totalBilledAmount: number; // For progress towards next tier
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

export type CampaignCategory = 'New_Customer' | 'Existing_Customer' | 'Happy_Hours';
export type ExistingCampaignType = 'Visit' | 'Billing' | 'Stamp';
export type BillingFrequency = 'One-Time' | 'Monthly' | 'Quarterly';
export type RewardType = 'Cashback' | 'Discount_Fixed' | 'Discount_Percentage' | 'Reward_Points' | 'Free_Item';
export type CampaignStatus = 'Active' | 'Paused' | 'Expired';

export interface BaseCampaign {
  id: string;
  merchantId: string;
  name: string;
  category: CampaignCategory;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  applicableTiers?: CustomerTier[]; // Empty means all tiers
  rewardType: RewardType;
  rewardValue: number | string; // e.g., 50, 15, "Coffee"
}

export interface VisitCampaign extends BaseCampaign {
  category: 'Existing_Customer';
  type: 'Visit';
  requiredVisits: number;
  minBillingPerVisit: number;
}

export interface BillingCampaign extends BaseCampaign {
  category: 'Existing_Customer';
  type: 'Billing';
  frequency: BillingFrequency;
  targetBillingAmount: number;
}

export interface StampCampaign extends BaseCampaign {
  category: 'Existing_Customer';
  type: 'Stamp';
  qualifyingItemId: string;
  qualifyingItemName: string;
  requiredStamps: number;
}

export interface HappyHoursCampaign extends BaseCampaign {
  category: 'Happy_Hours';
  startTime: string; // "14:00"
  endTime: string;   // "16:00"
  applicableDays: string[]; // ['Monday', 'Tuesday', ...]
  excludeHolidays: boolean;
}

export interface WelcomeCampaign extends BaseCampaign {
  category: 'New_Customer';
}

export type Campaign = VisitCampaign | BillingCampaign | StampCampaign | HappyHoursCampaign | WelcomeCampaign;

// Interfaces for Customer Progress (for rendering in UI)
export interface CustomerCampaignProgress {
  campaignId: string;
  campaignName: string;
  type: ExistingCampaignType | 'Happy_Hours' | 'Welcome';
  currentProgress: number; // e.g. visits done, billing accumulated, stamps collected
  targetProgress: number;  // e.g. required visits, target billing, required stamps
  progressText: string;    // e.g. "3 / 5 Visits", "₹20,000 / ₹1,00,000", "7 / 10 Stamps"
  rewardType: RewardType;
  rewardValue: string | number;
}
