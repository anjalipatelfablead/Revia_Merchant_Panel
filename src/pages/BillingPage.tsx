import React from 'react';
import { CreditCard, CheckCircle2, Download, Zap, ShieldCheck } from 'lucide-react';

export const BillingPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
              Subscription &amp; Merchant Billing
            </h1>
            <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#CEEBD9]">
              Enterprise Active
            </span>
          </div>
          <p className="text-xs text-[#7C746C] mt-1">
            Manage your Revia plan, branch licensing seats, and automated billing invoices
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Plan Card */}
        <div className="lg:col-span-2 bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
                CURRENT SUBSCRIPTION
              </span>
              <h3 className="text-lg font-bold text-[#1A1615]">
                Revia Multi-Branch Enterprise
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#1A1615]">$299</span>
              <span className="text-xs text-[#7C746C]"> / month</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <div className="text-[#8C827A] text-[10px] uppercase font-bold">Licensed Outlets</div>
              <div className="font-bold text-[#1A1615] mt-0.5">3 of 5 Outlets Used</div>
            </div>
            <div>
              <div className="text-[#8C827A] text-[10px] uppercase font-bold">Billing Period</div>
              <div className="font-bold text-[#1A1615] mt-0.5">Renews Nov 1, 2024</div>
            </div>
            <div>
              <div className="text-[#8C827A] text-[10px] uppercase font-bold">Payment Method</div>
              <div className="font-bold text-[#1A1615] mt-0.5">Amex ••3011</div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#5C554E]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
              <span>Unlimited customer digital wallet passes (Apple Wallet &amp; Google Pay)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
              <span>Real-time POS scanner sync mesh telemetry with 99.98% SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
              <span>Cryptographic SHA-256 audit ledger logging &amp; export</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#1A1615]">Payment Card</h3>
          <div className="p-4 bg-gradient-to-br from-[#1A1615] to-[#3D3732] text-white rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#D4A753] font-bold">REVIA BUSINESS</span>
              <CreditCard className="w-4 h-4 text-[#D4A753]" />
            </div>
            <div className="font-mono text-base tracking-widest text-neutral-200">
              •••• •••• •••• 3011
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-400">
              <span>ELENA VANCE</span>
              <span>EXP 08/27</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
