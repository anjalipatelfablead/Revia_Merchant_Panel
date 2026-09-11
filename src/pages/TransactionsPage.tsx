import React, { useState } from 'react';
import {
  Receipt,
  Search,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Clock,
  Filter,
  CreditCard
} from 'lucide-react';

interface Transaction {
  id: string;
  timestamp: string;
  guestName: string;
  guestEmail: string;
  branch: string;
  amount: number;
  stampsAwarded: number;
  paymentMethod: string;
  status: 'Completed' | 'Refunded';
  staff: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TX-90412',
    timestamp: 'Just now',
    guestName: 'Marcus Vance',
    guestEmail: 'marcus.v@gmail.com',
    branch: 'Downtown Flagship',
    amount: 34.50,
    stampsAwarded: 1,
    paymentMethod: 'Apple Pay (Visa ••4821)',
    status: 'Completed',
    staff: 'Sarah K.',
  },
  {
    id: 'TX-90411',
    timestamp: '11 mins ago',
    guestName: 'Elena Rostova',
    guestEmail: 'elena.rostova@designcorp.com',
    branch: 'Northside Mall',
    amount: 0.00,
    stampsAwarded: 0,
    paymentMethod: 'Reward Voucher #TK-98241',
    status: 'Completed',
    staff: 'Chloe Z.',
  },
  {
    id: 'TX-90410',
    timestamp: '19 mins ago',
    guestName: 'David Chen',
    guestEmail: 'd.chen@nexusarch.com',
    branch: 'Downtown Flagship',
    amount: 58.20,
    stampsAwarded: 2,
    paymentMethod: 'Mastercard ••9102',
    status: 'Completed',
    staff: 'Sarah K.',
  },
  {
    id: 'TX-90409',
    timestamp: '34 mins ago',
    guestName: 'Julian Thorne',
    guestEmail: 'julian.thorne@kensington.uk',
    branch: 'West End Kiosk',
    amount: 22.00,
    stampsAwarded: 1,
    paymentMethod: 'Google Pay (Amex ••3011)',
    status: 'Completed',
    staff: 'Mateo A.',
  },
  {
    id: 'TX-90408',
    timestamp: '48 mins ago',
    guestName: 'Sophia Lin',
    guestEmail: 'sophia.lin@biotech.io',
    branch: 'Downtown Flagship',
    amount: 41.80,
    stampsAwarded: 1,
    paymentMethod: 'Visa ••1890',
    status: 'Completed',
    staff: 'Sarah K.',
  },
  {
    id: 'TX-90407',
    timestamp: '1 hr ago',
    guestName: 'Liam O’Connor',
    guestEmail: 'liam.oc@celtic.ie',
    branch: 'Northside Mall',
    amount: 19.50,
    stampsAwarded: 1,
    paymentMethod: 'Cash Register POS #02',
    status: 'Completed',
    staff: 'Marcus B.',
  },
];

export const TransactionsPage: React.FC = () => {
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === 'All' || t.branch === filterBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
              Counter Transactions &amp; Receipts
            </h1>
            <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#CEEBD9]">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-[#7C746C] mt-1">
            Real-time receipt audit trail, stamp attribution, and voucher settlements
          </p>
        </div>

        <button
          onClick={() => alert('Exporting transaction records to CSV...')}
          className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#7C746C]" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Transactions Table Container */}
      <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C827A]" />
            <input
              type="text"
              placeholder="Search transaction ID or guest name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg text-xs text-[#1A1615] focus:outline-none focus:border-[#B38637]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {['All', 'Downtown Flagship', 'Northside Mall', 'West End Kiosk'].map((b) => (
              <button
                key={b}
                onClick={() => setFilterBranch(b)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                  filterBranch === b
                    ? 'bg-[#B38637] text-white font-semibold'
                    : 'bg-[#FAF8F5] text-[#7C746C] hover:text-[#1A1615]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F2EFE9] text-[10px] uppercase font-bold tracking-wider text-[#8C827A]">
                <th className="pb-2.5">TX ID</th>
                <th className="pb-2.5">GUEST</th>
                <th className="pb-2.5">BRANCH</th>
                <th className="pb-2.5">PAYMENT METHOD</th>
                <th className="pb-2.5">STAMPS</th>
                <th className="pb-2.5">STAFF</th>
                <th className="pb-2.5 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EC] text-xs">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3 font-mono font-bold text-[#A37837]">
                    {tx.id}
                    <div className="text-[10px] text-[#8C827A] font-sans font-normal">
                      {tx.timestamp}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="font-bold text-[#1A1615]">{tx.guestName}</div>
                    <div className="text-[10px] text-[#8C827A]">{tx.guestEmail}</div>
                  </td>
                  <td className="py-3 font-medium text-[#1A1615]">
                    {tx.branch}
                  </td>
                  <td className="py-3 text-[11px] text-[#5C554E]">
                    {tx.paymentMethod}
                  </td>
                  <td className="py-3 font-semibold text-[#B38637]">
                    +{tx.stampsAwarded}
                  </td>
                  <td className="py-3 text-[#7C746C] text-[11px]">
                    {tx.staff}
                  </td>
                  <td className="py-3 text-right font-bold text-[#1A1615]">
                    {tx.amount === 0 ? (
                      <span className="text-[#15803D] bg-[#EBF7F0] px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                        Voucher
                      </span>
                    ) : (
                      `$${tx.amount.toFixed(2)}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
