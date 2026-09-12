import React from 'react';
import { CreditCard, CheckCircle2, Zap, ShieldCheck, ArrowRight, ReceiptText, Search, Download, ChevronRight, LockKeyhole, WalletCards, Users, Server, FileText, Bell, CalendarDays, Building2, MoreVertical } from 'lucide-react';

const MobileBillingPage: React.FC = () => {
  const invoices = [
    ['Nov 1, 2024', '$429.00', 'Enterprise + 2 POS Node Add-on'],
    ['Oct 1, 2024', '$429.00', 'Enterprise + 2 POS Node Add-on'],
    ['Sep 1, 2024', '$389.00', 'Enterprise Base Subscription'],
  ];

  return (
    <div className="min-h-screen bg-[#FBF6F1] px-5 pb-7 pt-3 text-[#211C19]">
      <div className="mx-auto w-full max-w-[430px]">
        <header className="flex items-center justify-between border-b border-[#EDE1D7] pb-3">
          <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#211C19] text-sm font-bold text-white">R</div><div className="leading-tight"><div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.03em]">Downtown Flagship <span className="text-[#756D65]">⌄</span></div><div className="text-[10px] font-bold uppercase text-[#B28529]">Revia Merchant</div></div></div>
          <div className="flex items-center gap-3"><div className="relative"><span className="absolute -right-0.5 -top-1 h-1.5 w-1.5 rounded-full bg-[#C99B42]" /><Bell className="h-4 w-4 text-[#4F4842]" /></div><div className="h-8 w-8 overflow-hidden rounded-full border-2 border-[#C99B42]"><img src="https://i.pravatar.cc/80?img=47" alt="Account" className="h-full w-full object-cover" /></div></div>
        </header>

        <div className="pt-3"><div className="flex items-center justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#756D65]">Administration &amp; Quotas</div><h1 className="mt-2 text-[26px] font-extrabold leading-none tracking-[-0.06em]">Subscription &amp; Billing</h1><p className="mt-1 text-[14px] text-[#756D65]">Downtown Flagship &amp; Unified Venues</p></div><span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#B9F1CF] px-3 py-1 text-[11px] font-bold text-[#08734B]"><span className="h-1.5 w-1.5 rounded-full bg-[#0D9A63]" />Active</span></div></div>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.08em] text-[#756D65]"><span>Current Plan</span><CreditCard className="h-4 w-4 text-[#C99B42]" /></div><div className="mt-3 text-[30px] font-extrabold leading-none tracking-[-0.06em]">$389<span className="ml-1 text-[12px] font-normal tracking-normal text-[#756D65]">/mo</span></div><div className="mt-1 text-[11px] font-bold text-[#A8761C]">Enterprise Atelier</div></div>
          <div className="rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.08em] text-[#756D65]"><span>Next Cycle</span><CalendarDays className="h-4 w-4 text-[#C99B42]" /></div><div className="mt-4 text-[19px] font-bold">Dec 1, 2025</div><div className="mt-1 text-[11px] text-[#756D65]"><span className="text-[#087B55]">✓</span> Auto-pay enabled</div></div>
          <div className="rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.08em] text-[#756D65]"><span>Licensed Venues</span><Building2 className="h-4 w-4 text-[#C99B42]" /></div><div className="mt-3 text-[30px] font-extrabold leading-none">3<span className="ml-1 text-[12px] font-normal text-[#756D65]">/ 5 nodes</span></div><div className="mt-2 h-1.5 rounded-full bg-[#EEE7DF]"><div className="h-full w-3/5 rounded-full bg-[#C99B42]" /></div></div>
          <div className="rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.08em] text-[#756D65]"><span>Scan Volume</span><Zap className="h-4 w-4 text-[#C99B42]" /></div><div className="mt-3 text-[30px] font-extrabold leading-none">14.2k<span className="ml-1 text-[12px] font-normal text-[#756D65]">/ 25k</span></div><div className="mt-2 h-1.5 rounded-full bg-[#EEE7DF]"><div className="h-full w-[57%] rounded-full bg-[#087B55]" /></div></div>
        </section>

        <section className="mt-7 rounded-[13px] bg-white p-5 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex items-start justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#B28529]">Tier Architecture</div><h2 className="mt-2 text-[23px] font-bold leading-none tracking-[-0.04em]">Enterprise Atelier</h2></div><span className="rounded-[9px] bg-[#F4EEE8] p-2.5 text-[#211C19]"><ShieldCheck className="h-5 w-5" /></span></div><div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold"><span className="rounded-[7px] bg-[#FCF0E3] px-2 py-1.5">✓ 5 Venues Included</span><span className="rounded-[7px] bg-[#FCF0E3] px-2 py-1.5">✓ 20 Mesh Nodes</span><span className="rounded-[7px] bg-[#FCF0E3] px-2 py-1.5">✓ VIP Pass Portal</span><span className="rounded-[7px] bg-[#FCF0E3] px-2 py-1.5">✓ SOC-2 Audit Log</span></div><div className="mt-6 space-y-3 text-[12px]"><div><div className="flex justify-between"><span>Branch Locations</span><span className="text-[#756D65]">3 of 5 used (60%)</span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE7DF]"><div className="h-full w-3/5 rounded-full bg-[#C99B42]" /></div></div><div><div className="flex justify-between"><span>Active POS Mesh Nodes</span><span className="text-[#756D65]">12 of 20 used (60%)</span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE7DF]"><div className="h-full w-3/5 rounded-full bg-[#C99B42]" /></div></div><div><div className="flex justify-between"><span>Monthly Scan Transactions</span><span className="text-[#756D65]">14,240 / 25,000 (57%)</span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE7DF]"><div className="h-full w-[57%] rounded-full bg-[#087B55]" /></div></div></div><button type="button" className="mt-6 w-full rounded-[11px] bg-gradient-to-r from-[#D4A753] to-[#9E782F] py-3 text-[13px] font-bold text-white"><ArrowRight className="mr-1 inline h-4 w-4" />Upgrade Plan Quota</button></section>

        <section className="mt-7"><div className="flex items-center justify-between"><h2 className="text-[19px] font-bold">Payment Sources</h2><button type="button" className="text-[10px] font-bold uppercase text-[#A8761C]">Manage</button></div><div className="mt-3 rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex items-center gap-3 rounded-[8px] bg-[#FCF0E3] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#211C19] text-[12px] font-bold text-white">MC</span><div className="min-w-0 flex-1"><div className="text-[13px] font-semibold">Mastercard •••• 8814 <span className="ml-1 rounded bg-[#FFE0A2] px-1.5 py-0.5 text-[9px]">DEFAULT</span></div><div className="text-[11px] text-[#756D65]">Expires 08/27 • Atelier Corporate Debit</div></div><MoreVertical className="h-4 w-4 text-[#756D65]" /></div><div className="mt-3 flex items-center gap-3 rounded-[8px] bg-[#F4F0EC] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-white text-[10px] font-bold text-[#756D65]">ACH</span><div className="min-w-0 flex-1"><div className="text-[13px] font-semibold">ACH Direct Debit •••• 4109</div><div className="text-[11px] text-[#756D65]">J.P. Morgan Chase • Secondary backup</div></div><MoreVertical className="h-4 w-4 text-[#756D65]" /></div></div></section>

        <section className="mt-7"><div className="flex items-center justify-between"><h2 className="text-[19px] font-bold">Billing Ledger</h2><span className="text-[10px] font-bold uppercase text-[#756D65]">Last 3 Quarters</span></div><div className="mt-3 space-y-2">{invoices.map(([date, amount, detail]) => <div key={date} className="flex items-center gap-3 rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#B9F1CF] text-[#087B55]"><ReceiptText className="h-5 w-5" /></span><div className="min-w-0 flex-1"><div className="text-[13px] font-semibold">{date} <span className="text-[#087B55]">✓ Paid</span></div><div className="truncate text-[11px] text-[#756D65]">{detail}</div><div className="text-[19px] font-bold">{amount}</div></div><button type="button" aria-label={`Download invoice for ${date}`} className="rounded-[8px] bg-[#F4F0EC] p-2"><Download className="h-4 w-4" /><span className="block text-[8px] font-bold">PDF</span></button></div>)}</div></section>

        <section className="mt-7 rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex gap-3"><span className="rounded-[8px] bg-[#F4F0EC] p-2 text-[#A8761C]"><FileText className="h-5 w-5" /></span><div><div className="text-[10px] font-bold uppercase text-[#756D65]">Registered Legal Entity</div><div className="mt-1 text-[14px] font-bold">Revia Hospitality Atelier Group LLC</div><div className="text-[11px] text-[#756D65]">EIN: 84-2910492 • Del. Division of Corps</div></div></div><div className="mt-3 rounded-[8px] bg-[#FCF0E3] p-3 text-[11px] text-[#756D65]"><div className="flex justify-between"><span>Billing Recipient:</span><b className="text-[#211C19]">Elena Vance</b></div><div className="mt-1 flex justify-between"><span>Dispatch Email:</span><b className="text-[#211C19]">billing@revia.hospitality.com</b></div></div><button type="button" className="mt-3 w-full rounded-[8px] bg-[#F4F0EC] py-2.5 text-[12px] font-semibold"><ReceiptText className="mr-1 inline h-4 w-4 text-[#A8761C]" />Export Annual Tax Dossier (CSV/PDF)</button></section>
      </div>
    </div>
  );
};

export const BillingPage: React.FC = () => {
  return (
    <>
      <div className="md:hidden"><MobileBillingPage /></div>
      <div className="hidden md:block">
    <div className="mx-auto max-w-[1600px] space-y-5 bg-[#FAF8F5] p-4 lg:p-6">
      {/*
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-[#81776E]">
        <span>Home</span><span>/</span><span>Intelligence &amp; Admin</span><span>/</span><span className="text-[#1A1615]">Subscription &amp; Billing</span>
        <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#CFF6DF] px-2.5 py-1 text-[10px] font-bold text-[#16804A]"><span className="h-1.5 w-1.5 rounded-full bg-[#16804A]" /> Enterprise Multi-Venue • Auto-Renewal Active (Dec 1, 2025)</span>
      </div>
      */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-start sm:gap-8">
        <div>
          <h1 className="text-[27px] font-bold tracking-tight text-[#1A1615]">Subscription &amp; Billing Management</h1>
          <p className="mt-1 max-w-[600px] text-sm leading-relaxed text-[#7C746C]">Manage your hospitality atelier subscription plan, connected branch licensing, POS seat quotas, and tax invoice history.</p>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E0D8] bg-white px-3 py-2 text-xs font-semibold text-[#4F4842] shadow-2xs hover:bg-[#F5F1EA]"><ReceiptText className="h-3.5 w-3.5 text-[#9E782F]" /> Download Tax Dossier (PDF)</button>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-lg bg-[#B7842C] px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#9E782F]"><Zap className="h-3.5 w-3.5" /> Upgrade Plan Quota</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#81776E]"><span>Current Plan</span><span className="rounded-full bg-[#CFF6DF] px-2 py-1 text-[9px] normal-case tracking-normal text-[#16804A]">● Active • Tier 3</span></div>
          <div className="mt-3 text-lg font-bold text-[#1A1615]">Enterprise Atelier</div>
          <p className="mt-0.5 text-xs text-[#81776E]">$389/mo • Billed annually<br />($4,668/yr)</p>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#B7842C]">Includes 5 venue licenses <ArrowRight className="h-4 w-4" /></div>
        </div>

        <div className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#81776E]"><span>Active Venues &amp; POS</span><span className="rounded-full bg-[#F1EDE7] px-2 py-1 text-[9px] normal-case tracking-normal text-[#4F4842]">75% Cap</span></div>
          <div className="mt-3 text-lg font-bold text-[#1A1615]">3 of 5 Venues Active</div>
          <p className="mt-0.5 text-xs text-[#81776E]">12 of 16 POS terminals active</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEE9E2]"><div className="h-full w-3/4 rounded-full bg-[#C99B42]" /></div>
          <div className="mt-1.5 flex justify-between text-[10px] text-[#81776E]"><span className="font-semibold">Mesh Sync Healthy</span><span>4 Seats Available</span></div>
        </div>

        <div className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#81776E]"><span>Billing Cycle</span><span className="rounded-full bg-[#F1EDE7] px-2 py-1 text-[9px] normal-case tracking-normal text-[#81776E]">Net 0</span></div>
          <div className="mt-3 text-lg font-bold text-[#1A1615]">$389.00 due Dec 1</div>
          <p className="mt-0.5 text-xs text-[#81776E]">Next auto-charge via Mastercard<br />•••• 8814</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#16804A]"><ShieldCheck className="h-4 w-4" /> Auto-pay configured &amp; guaranteed</div>
        </div>

        <div className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#81776E]"><span>Loyalty Volume Quota</span><span className="rounded-full bg-[#FFE0A2] px-2 py-1 text-[9px] normal-case tracking-normal text-[#4F4842]">56.8% Used</span></div>
          <div className="mt-3 text-lg font-bold text-[#1A1615]">14.2k / 25k Scans</div>
          <p className="mt-0.5 text-xs text-[#81776E]">Overage protection is ON<br />(capped)</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEE9E2]"><div className="h-full w-[57%] rounded-full bg-[#80611D]" /></div>
          <div className="mt-1.5 text-[10px] font-semibold text-[#81776E]">10,760 scans left <span className="text-[#B7842C]">Resets in 11 days</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <section className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div><span className="text-[9px] font-bold uppercase tracking-wider text-[#B7842C]">Allocations &amp; Entitlements</span><h2 className="text-[16px] font-bold text-[#1A1615]">Subscription Tier &amp; Entitlement Allocation</h2></div>
              <div className="flex gap-1.5"><button type="button" className="rounded-md border border-[#E5E0D8] bg-white px-2 py-1 text-[9px] font-semibold text-[#4F4842]">Manage Venue Licenses</button><button type="button" className="rounded-md bg-[#C99B42] px-2 py-1 text-[9px] font-bold text-white">Change Tier</button></div>
            </div>
            <div className="mt-3 flex flex-col gap-3 rounded-lg bg-[#FAF3E8] p-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="text-[11px] font-bold text-[#1A1615]">Enterprise Atelier Architecture <span className="ml-1 rounded bg-white px-1.5 py-0.5 text-[8px] font-normal text-[#81776E]">v3.4 Dedicated Ledger</span></div><p className="mt-1 max-w-[520px] text-[10px] leading-relaxed text-[#81776E]">Designed for luxury coffee houses, tasting rooms, and boutique hospitality chains. Includes SOC-2 audit compliance and hardware mesh routing.</p></div><div className="flex min-w-[150px] items-center gap-2 rounded-lg bg-[#FFF2E3] px-3 py-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#B7842C]"><ShieldCheck className="h-4 w-4" /></span><span><strong className="block text-[10px] text-[#4F4842]">Concierge Support</strong><small className="block text-[9px] text-[#81776E]">15m SLA Response</small></span></div></div>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[['Unlimited VIP Guest Profiles','No artificial customer contact limits','Users'],['Apple & Google Wallet Passes','Dynamic loyalty pass NFC push updates','WalletCards'],['SOC-2 Cryptographic Ledger','Immutable point redemption verification','LockKeyhole'],['Custom SMS & Push Gateway','Branded sender ID with 99.8% inbox deliverability','Zap']].map(([title,detail,icon]) => <div key={title} className="flex items-start gap-2 rounded-md border border-[#EEE7DE] bg-[#FCFBF9] p-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#16804A]" /><div><div className="text-[10px] font-semibold text-[#1A1615]">{title}</div><div className="text-[9px] text-[#81776E]">{detail}</div></div></div>)}
            </div>
            <div className="mt-4 flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-wider text-[#81776E]">Live resource quota meters</span><span className="text-[9px] text-[#81776E]">Synchronized 4m ago</span></div>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div><div className="flex justify-between text-[9px] font-semibold text-[#4F4842]"><span>Venues Licensed</span><span>3 / 5 <em className="font-normal text-[#81776E]">(60%)</em></span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE9E2]"><div className="h-full w-3/5 rounded-full bg-[#C99B42]" /></div><div className="mt-1 text-[9px] text-[#81776E]">Flagship (SoHo), Roastery Reserve, Northside Pop-up</div></div>
              <div><div className="flex justify-between text-[9px] font-semibold text-[#4F4842]"><span>POS Hardware Nodes</span><span>12 / 20 <em className="font-normal text-[#81776E]">(60%)</em></span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE9E2]"><div className="h-full w-3/5 rounded-full bg-[#C99B42]" /></div><div className="mt-1 text-[9px] text-[#81776E]">Clover, Square &amp; Revia Atelier Touch terminals</div></div>
              <div><div className="flex justify-between text-[9px] font-semibold text-[#4F4842]"><span>Monthly Member Transactions</span><span>14,240 / 25,000 <em className="font-normal text-[#81776E]">(57%)</em></span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE9E2]"><div className="h-full w-[57%] rounded-full bg-[#80611D]" /></div><div className="mt-1 text-[9px] text-[#81776E]">Encrypted loyalty scan transactions processed</div></div>
              <div><div className="flex justify-between text-[9px] font-semibold text-[#4F4842]"><span>Custom VIP Pass SMS</span><span>4,120 / 10,000 <em className="font-normal text-[#81776E]">(41%)</em></span></div><div className="mt-1 h-1.5 rounded-full bg-[#EEE9E2]"><div className="h-full w-[41%] rounded-full bg-[#C99B42]" /></div><div className="mt-1 text-[9px] text-[#81776E]">Transactional automated SMS delivery credits</div></div>
            </div>
          </section>

          <section className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
            <div className="flex flex-wrap items-end justify-between gap-2"><div><span className="text-[9px] font-bold uppercase tracking-wider text-[#B7842C]">Accounting &amp; Tax Audits</span><h2 className="text-[16px] font-bold text-[#1A1615]">Invoice History &amp; Receipts Ledger</h2></div><div className="flex items-center gap-1"><div className="flex w-[190px] items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] text-[#81776E]"><Search className="h-3 w-3" /> Search by invoice #...</div><button type="button" aria-label="Download invoice ledger" className="rounded-md border border-[#E5E0D8] bg-white p-1.5 text-[#81776E] hover:bg-[#F5F1EA]"><Download className="h-3 w-3" /></button></div></div>
            <div className="mt-3 inline-flex rounded-md bg-[#F1EDE7] p-0.5 text-[9px] font-semibold text-[#81776E]"><button type="button" className="rounded bg-white px-2.5 py-1 text-[#4F4842] shadow-2xs">All Invoices (12)</button><button type="button" className="px-2.5 py-1 hover:text-[#4F4842]">Paid (12)</button><button type="button" className="px-2.5 py-1 hover:text-[#4F4842]">Upcoming (1)</button></div>
            <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[600px] text-left text-[9px]"><thead className="border-b border-[#E8E1D9] text-[8px] uppercase tracking-wider text-[#81776E]"><tr><th className="pb-2">Invoice ID</th><th className="pb-2">Date</th><th className="pb-2">Plan &amp; Add-ons</th><th className="pb-2">Amount</th><th className="pb-2">Status</th><th className="pb-2">Actions</th></tr></thead><tbody className="divide-y divide-[#F0EBE4]">{['Nov 1, 2024','Oct 1, 2024','Sep 1, 2024','Aug 1, 2024','Jul 1, 2024'].map((date,index) => <tr key={date}><td className="py-2 font-semibold text-[#1A1615]">#REV-INV-{String(2024-index).padStart(4,'0')}</td><td className="py-2 text-[#81776E]">{date}</td><td className="py-2 text-[#4F4842]">Enterprise Atelier {index < 2 ? '+2 POS add-ons' : 'Base Plan'}</td><td className="py-2 font-semibold text-[#1A1615]">${index < 2 ? '429.00' : '389.00'}</td><td className="py-2"><span className="rounded-full bg-[#CFF6DF] px-2 py-1 font-bold text-[#16804A]">Paid</span></td><td className="py-2"><button type="button" className="inline-flex items-center gap-1 rounded border border-[#E5E0D8] px-1.5 py-1 text-[8px] text-[#4F4842]"><Download className="h-3 w-3" /> Receipt</button></td></tr>)}</tbody></table></div>
            <div className="mt-3 flex items-center gap-2 rounded-md bg-[#FAF8F5] p-2 text-[9px] text-[#81776E]"><LockKeyhole className="h-3.5 w-3.5 text-[#B7842C]" /> Cryptographic Ledger Seal: <span className="font-mono text-[#4F4842]">sha256:7f4a...912e8b</span><span className="ml-auto hidden sm:inline">Compliant with US GAAP &amp; EU VAT cross-border directive</span></div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]">
            <div className="flex items-center justify-between"><h2 className="text-[16px] font-bold text-[#1A1615]">Payment Methods</h2><CreditCard className="h-4 w-4 text-[#B7842C]" /></div>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-[#FAF0E3] p-2.5">
                <div className="flex items-start gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#1A1615] text-[8px] font-bold text-white">MC</span><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-1 text-[10px] font-bold"><span>Mastercard •••• 8814</span><span className="rounded-full bg-[#FFE0A2] px-1.5 py-0.5 text-[8px]">Default</span></div><div className="text-[9px] leading-tight text-[#81776E]">Expires 08/27 • Elena Vance</div></div></div>
                <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#4F4842]"><span>Revia Hospitality LLC</span><button type="button">Edit</button></div>
              </div>
              <div className="rounded-lg bg-[#FAF8F5] p-2.5">
                <div className="flex items-start gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white text-[8px] font-bold text-[#81776E]">ACH</span><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-1 text-[10px] font-bold"><span>Chase Commercial<br />•••• 4109</span><span className="rounded-full bg-[#CFF6DF] px-1.5 py-0.5 text-[8px] text-[#16804A]">Verified</span></div><div className="text-[9px] leading-tight text-[#81776E]">Business Checking<br />Direct Debit</div></div></div>
                <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#4F4842]"><span>Auto-follower backup</span><button type="button">Set Default</button></div>
              </div>
            </div>
            <button type="button" className="mt-3 w-full rounded-lg bg-[#F1EDE7] py-2 text-[9px] font-semibold text-[#4F4842]"><CreditCard className="mr-1 inline h-3 w-3" /> + Add Payment Method</button>
          </section>
          <section className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]"><div className="flex items-center justify-between"><h2 className="text-[16px] font-bold text-[#1A1615]">Plan Quota Add-ons</h2><span className="rounded-full bg-[#F1EDE7] px-2 py-1 text-[8px] text-[#81776E]">Self-Serve</span></div><p className="mt-2 text-[9px] leading-relaxed text-[#81776E]">Expand capacity on demand. Add-ons are prorated automatically to your current monthly cycle.</p>{[['POS Hardware Node','+$20.00 / mo per terminal','2'],['SMS VIP Trunk (10k)','+$45.00 / mo per block','0'],['Branch Venue Slot','+$95.00 / mo per branch','0']].map(([title,detail,count]) => <div key={title} className="mt-2 flex items-center justify-between border-b border-[#F0EBE4] pb-2"><div><div className="text-[10px] font-semibold text-[#1A1615]">{title}</div><div className="text-[9px] text-[#81776E]">{detail}</div></div><button type="button" className="rounded border border-[#E5E0D8] px-2 py-1 text-[9px] text-[#4F4842]">− {count} &nbsp; +</button></div>)}</section>
          <section className="rounded-xl border border-[#E8E1D9] bg-white p-4 shadow-[0_2px_10px_rgba(31,29,26,0.04)]"><div className="flex items-center justify-between"><h2 className="text-[16px] font-bold text-[#1A1615]">Tax &amp; Legal Entity</h2><button type="button" className="text-[9px] font-semibold text-[#B7842C]">Edit Details</button></div><div className="mt-3 space-y-2 text-[9px] text-[#81776E]"><div><b className="block text-[8px] uppercase tracking-wider text-[#B0A69C]">Legal Entity</b><span className="text-[#4F4842]">Revia Hospitality Atelier Group LLC</span></div><div><b className="block text-[8px] uppercase tracking-wider text-[#B0A69C]">Tax Identification</b><span className="text-[#4F4842]">US-EIN: 27-4196482</span></div><div><b className="block text-[8px] uppercase tracking-wider text-[#B0A69C]">Registered Atelier Address</b><span className="text-[#4F4842]">482 Broadway, SoHo<br />New York, NY 10013, United States</span></div></div><div className="mt-3 rounded-md bg-[#FAF8F5] p-2 text-[9px] text-[#81776E]"><FileText className="mr-1 inline h-3 w-3 text-[#B7842C]" /> W-9 &amp; Tax Residency forms on file (Verified 2024).</div></section>
        </aside>
      </div>
    </div>
      </div>
    </>
  );
};
