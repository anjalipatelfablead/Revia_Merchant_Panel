import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wallet, WalletTransaction, CostRule, WalletActionCategory } from '../types/wallet';

const DEFAULT_COST_RULES: CostRule[] = [
  { action: 'branch_setup', cost: 100, costType: 'flat', label: 'Branch Setup' },
  { action: 'staff_invite', cost: 20, costType: 'flat', label: 'Staff Invitation' },
  { action: 'loyalty_setup', cost: 50, costType: 'flat', label: 'Loyalty Program Setup' },
  { action: 'qr_generation', cost: 10, costType: 'flat', label: 'QR Code / Stand Generation' },
  { action: 'campaign_creation', cost: 50, costType: 'flat', label: 'Campaign Creation' },
  { action: 'redemption_commission', cost: 5, costType: 'flat', label: 'Redemption Commission' },
];

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1008',
    walletId: 'w-merchant-01',
    type: 'debit',
    category: 'redemption_commission',
    amount: 5,
    relatedEntityId: 'REV-VCH-8924',
    balanceAfter: 250,
    createdAt: '2026-09-16 09:42 AM',
    description: 'Redemption Commission — Voucher #REV-8924'
  },
  {
    id: 'tx-1007',
    walletId: 'w-merchant-01',
    type: 'debit',
    category: 'campaign_creation',
    amount: 50,
    relatedEntityId: 'cmp-fall-01',
    balanceAfter: 255,
    createdAt: '2026-09-15 02:15 PM',
    description: 'Published Campaign: Autumn Special Tasting'
  },
  {
    id: 'tx-1006',
    walletId: 'w-merchant-01',
    type: 'debit',
    category: 'qr_generation',
    amount: 10,
    relatedEntityId: 'asset-table-08',
    balanceAfter: 305,
    createdAt: '2026-09-14 11:30 AM',
    description: 'Generated Tabletop Acrylic Stand QR #08'
  },
  {
    id: 'tx-1005',
    walletId: 'w-merchant-01',
    type: 'debit',
    category: 'staff_invite',
    amount: 20,
    relatedEntityId: 'stf-1088',
    balanceAfter: 315,
    createdAt: '2026-09-12 04:20 PM',
    description: 'Staff Invite: Liam Thorne (Manager)'
  },
  {
    id: 'tx-1004',
    walletId: 'w-merchant-01',
    type: 'credit',
    category: 'topup',
    amount: 500,
    balanceAfter: 335,
    createdAt: '2026-09-10 10:00 AM',
    description: 'Wallet Credit Top-Up via Card •••• 8814'
  },
  {
    id: 'tx-1003',
    walletId: 'w-merchant-01',
    type: 'debit',
    category: 'branch_setup',
    amount: 100,
    relatedEntityId: 'branch-soho-01',
    balanceAfter: -165, // previous snapshot
    createdAt: '2026-09-08 03:00 PM',
    description: 'New Outlet Setup: SoHo Roastery & Tasting Room'
  },
  {
    id: 'tx-1002',
    walletId: 'w-merchant-01',
    type: 'debit',
    category: 'loyalty_setup',
    amount: 50,
    relatedEntityId: 'loyalty-v1',
    balanceAfter: -65,
    createdAt: '2026-09-05 01:10 PM',
    description: 'Saved & Published Revia Atelier Loyalty Tier Rules'
  },
  {
    id: 'tx-1001',
    walletId: 'w-merchant-01',
    type: 'credit',
    category: 'topup',
    amount: 1000,
    balanceAfter: 1000,
    createdAt: '2026-09-01 09:00 AM',
    description: 'Welcome Account Initialization Credit'
  }
];

interface BlockedActionState {
  isOpen: boolean;
  requiredCost: number;
  currentBalance: number;
  actionName: string;
  category: WalletActionCategory;
}

interface WalletContextType {
  wallet: Wallet;
  transactions: WalletTransaction[];
  costRules: CostRule[];
  isBannerDismissed: boolean;
  dismissBanner: () => void;
  isTopUpModalOpen: boolean;
  openTopUpModal: () => void;
  closeTopUpModal: () => void;
  blockedActionModal: BlockedActionState;
  closeBlockedActionModal: () => void;
  checkAndDeductCredit: (
    category: WalletActionCategory,
    customAmount?: number,
    relatedEntityId?: string,
    actionDisplayName?: string
  ) => boolean;
  topUpWallet: (amount: number, paymentMethodLabel: string) => void;
  updateCostRule: (action: WalletActionCategory, newCost: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet>({
    merchantId: 'w-merchant-01',
    balance: 250, // Initial state set to 250 (< 300) to showcase low balance banner
    lowBalanceThreshold: 300,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [costRules, setCostRules] = useState<CostRule[]>(DEFAULT_COST_RULES);

  // Session state for banner dismissal
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    return sessionStorage.getItem('revia_wallet_banner_dismissed') === 'true';
  });

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    sessionStorage.setItem('revia_wallet_banner_dismissed', 'true');
  };

  // Modal states
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [blockedActionModal, setBlockedActionModal] = useState<BlockedActionState>({
    isOpen: false,
    requiredCost: 0,
    currentBalance: 0,
    actionName: '',
    category: 'branch_setup'
  });

  const openTopUpModal = () => setIsTopUpModalOpen(true);
  const closeTopUpModal = () => setIsTopUpModalOpen(false);
  const closeBlockedActionModal = () => {
    setBlockedActionModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Helper to get cost for action
  const getActionCost = (category: WalletActionCategory): number => {
    const rule = costRules.find((r) => r.action === category);
    return rule ? rule.cost : 0;
  };

  // Shared gating function
  const checkAndDeductCredit = (
    category: WalletActionCategory,
    customAmount?: number,
    relatedEntityId?: string,
    actionDisplayName?: string
  ): boolean => {
    const requiredCost = customAmount !== undefined ? customAmount : getActionCost(category);
    const rule = costRules.find((r) => r.action === category);
    const name = actionDisplayName || rule?.label || 'This Action';

    if (wallet.balance < requiredCost) {
      // BLOCK action, open modal
      setBlockedActionModal({
        isOpen: true,
        requiredCost,
        currentBalance: wallet.balance,
        actionName: name,
        category
      });
      return false;
    }

    // Balance is sufficient, deduct credit
    const newBalance = wallet.balance - requiredCost;
    setWallet((prev) => ({
      ...prev,
      balance: newBalance,
      updatedAt: new Date().toISOString()
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      walletId: wallet.merchantId,
      type: 'debit',
      category,
      amount: requiredCost,
      relatedEntityId,
      balanceAfter: newBalance,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      description: `${name} — Deducted ${requiredCost} credits`
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Reset session dismissal if balance drops below threshold
    if (newBalance < wallet.lowBalanceThreshold) {
      setIsBannerDismissed(false);
      sessionStorage.removeItem('revia_wallet_banner_dismissed');
    }

    return true;
  };

  // Top Up Wallet function
  const topUpWallet = (amount: number, paymentMethodLabel: string) => {
    const newBalance = wallet.balance + amount;
    setWallet((prev) => ({
      ...prev,
      balance: newBalance,
      updatedAt: new Date().toISOString()
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      walletId: wallet.merchantId,
      type: 'credit',
      category: 'topup',
      amount,
      balanceAfter: newBalance,
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      description: `Wallet Credit Top-Up via ${paymentMethodLabel}`
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Close modals
    setIsTopUpModalOpen(false);
    setBlockedActionModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Update dynamic cost rule (admin functionality)
  const updateCostRule = (action: WalletActionCategory, newCost: number) => {
    setCostRules((prev) =>
      prev.map((rule) => (rule.action === action ? { ...rule, cost: newCost } : rule))
    );
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        transactions,
        costRules,
        isBannerDismissed,
        dismissBanner,
        isTopUpModalOpen,
        openTopUpModal,
        closeTopUpModal,
        blockedActionModal,
        closeBlockedActionModal,
        checkAndDeductCredit,
        topUpWallet,
        updateCostRule
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
