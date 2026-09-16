export type WalletActionCategory =
  | 'topup'
  | 'branch_setup'
  | 'staff_invite'
  | 'loyalty_setup'
  | 'qr_generation'
  | 'campaign_creation'
  | 'redemption_commission'
  | 'admin_adjustment';

export interface Wallet {
  merchantId: string;
  balance: number; // in credits
  lowBalanceThreshold: number; // default 300
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  category: WalletActionCategory;
  amount: number;
  relatedEntityId?: string;
  balanceAfter: number;
  createdAt: string;
  description: string;
}

export interface CostRule {
  action: WalletActionCategory;
  cost: number;
  costType: 'flat' | 'percentage';
  label: string;
}
