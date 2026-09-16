import React from 'react';
import { AlertTriangle, PlusCircle, X } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

export const LowBalanceBanner: React.FC = () => {
  const { wallet, isBannerDismissed, dismissBanner, openTopUpModal } = useWallet();

  const isLowBalance = wallet.balance < wallet.lowBalanceThreshold;

  if (!isLowBalance || isBannerDismissed) {
    return null;
  }

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-amber-900 transition-all duration-200 z-30 shrink-0">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
        </div>
        <p className="text-xs sm:text-[13px] font-medium tracking-tight text-amber-950">
          <span className="font-bold text-amber-900">Low Wallet Balance</span> —{' '}
          <strong className="font-extrabold text-amber-900">{wallet.balance} credits</strong> remaining. Add credit to keep actions running.
        </p>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          onClick={openTopUpModal}
          className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#D4A753] to-[#9E782F] hover:from-[#C29541] hover:to-[#8C6826] text-white rounded-md text-[12px] font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Credit
        </button>

        <button
          onClick={dismissBanner}
          title="Dismiss for current session"
          className="p-1 text-amber-800/70 hover:text-amber-950 rounded hover:bg-amber-500/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
