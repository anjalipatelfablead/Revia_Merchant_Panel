import React from 'react';
import { NavRoute, Customer } from '../types';
import { User, Phone, Star, ArrowLeft, Ticket, History, CheckCircle, Clock, ShoppingBag } from 'lucide-react';

interface CustomerDetailPageProps {
  onNavigate: (route: NavRoute) => void;
  customer: Customer | undefined;
}

export const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({ onNavigate, customer }) => {
  if (!customer) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F5] flex flex-col items-center justify-center font-sans text-[#1A1615]">
        <h2 className="text-xl font-bold mb-4">Customer Not Found</h2>
        <button
          onClick={() => onNavigate('/customerlist')}
          className="px-4 py-2 bg-white border border-[#EAE6E1] rounded-lg shadow-sm font-semibold hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Obsidian VIP':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" /> Obsidian VIP
          </span>
        );
      case 'Gold Reserve':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF8EB] text-[#9E782F] border border-[#D4A753]/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#9E782F]" /> Gold Reserve
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#6E6A66] border border-[#EAE6E1] text-xs font-bold uppercase tracking-wider shadow-sm">
            <User className="w-3.5 h-3.5" /> Standard
          </span>
        );
    }
  };

  const progressPct = (customer.stampsCount / customer.stampsMax) * 100;

  // Mock campaign data for demonstration
  const activeCampaigns = [
    { title: "Double Points Weekend", desc: "Earn 2x stamps on all bakery items", validUntil: "This Sunday" },
    { title: "Birthday Treat", desc: "Complimentary handcrafted beverage", validUntil: "In 5 days" }
  ];

  const pastCampaigns = [
    { title: "Welcome Bonus", date: "Oct 14, 2023", reward: "Free Pastry" },
    { title: "Summer Cooler Special", date: "Aug 02, 2024", reward: "50% off Cold Brews" }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF8F5] flex flex-col font-sans text-[#1A1615]">
      <div className="p-4 lg:p-6 space-y-6 flex-1 max-w-[1200px] mx-auto w-full">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/customerlist')}
              className="p-2 rounded-full border border-[#EAE6E1] bg-white text-[#6E6A66] hover:bg-[#F5F1EA] hover:text-[#1A1615] transition-colors shadow-sm cursor-pointer"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A1615] tracking-tight">Customer Profile</h1>
              <p className="text-sm text-[#7C746C] mt-1">Detailed overview and engagement history</p>
            </div>
          </div>
          <div>
             {getTierBadge(customer.tier)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Identity & KPI */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-white border border-[#EAE6E1] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img src={customer.avatar} alt={customer.name} className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white ring-1 ring-[#EAE6E1]" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center" title="Active">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-[#1A1615]">{customer.name}</h2>
              <p className="text-xs font-mono font-semibold text-[#7C746C] mt-1 tracking-wider">{customer.id}</p>
              
              <div className="w-full h-px bg-[#EAE6E1] my-4" />
              
              <div className="w-full space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#D4A753]" />
                  </div>
                  <span className="font-semibold">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#D4A753]" />
                  </div>
                  <span className="text-[#6E6A66]">Joined <span className="font-semibold text-[#1A1615]">{customer.joinedDate || 'Oct 2023'}</span></span>
                </div>
              </div>
            </div>

            {/* Loyalty Stamps Card */}
            <div className="bg-gradient-to-br from-[#1A1615] to-[#2D2624] border border-[#3D3732] rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#D4A753] opacity-20 rounded-full blur-[40px]" />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-white font-bold tracking-wide">Loyalty Progress</h3>
                <span className="bg-[#D4A753] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">{customer.stampsCount}/{customer.stampsMax}</span>
              </div>
              
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden mb-3 relative z-10">
                <div
                  className="h-full bg-gradient-to-r from-[#D4A753] to-[#FDE68A] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              
              <p className="text-[#9E9A93] text-xs relative z-10">
                <span className="text-white font-bold">{customer.stampsMax - customer.stampsCount}</span> stamps away from a free reward.
              </p>
            </div>

            {/* KPI Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-[#EAE6E1] rounded-2xl p-4 shadow-sm text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#7C746C] mb-1">Lifetime Spend</div>
                <div className="text-xl font-bold text-[#1A1615]">
                  ${customer.lifetimeSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-white border border-[#EAE6E1] rounded-2xl p-4 shadow-sm text-center">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#7C746C] mb-1">Total Visits</div>
                <div className="text-xl font-bold text-[#1A1615]">
                  {customer.totalVisits}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Campaigns & Activity */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Campaigns Widget */}
            <div className="bg-white border border-[#EAE6E1] rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#EAE6E1] bg-[#FAF8F5] flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#D4A753]" />
                <h3 className="font-bold text-[#1A1615]">Campaign & Offers Status</h3>
              </div>
              
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Active Campaigns */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#15803D]" /> Active Offers
                  </h4>
                  <div className="space-y-3">
                    {activeCampaigns.map((camp, idx) => (
                      <div key={idx} className="bg-[#EBF7F0]/50 border border-[#BCE3D1] rounded-xl p-3.5 relative">
                        <div className="font-bold text-[#1A1615] text-sm mb-0.5 pr-16">{camp.title}</div>
                        <div className="text-xs text-[#7C746C] mb-2 pr-16">{camp.desc}</div>
                        <div className="inline-block bg-white text-[#15803D] border border-[#BCE3D1] text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          Expires: {camp.validUntil}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Used/Past Campaigns */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C746C] flex items-center gap-1.5 mb-4">
                    <History className="w-3.5 h-3.5" /> Used / Past Offers
                  </h4>
                  <div className="space-y-3">
                    {pastCampaigns.map((camp, idx) => (
                      <div key={idx} className="bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-3.5 relative opacity-80">
                        <div className="font-semibold text-[#1A1615] text-sm mb-0.5">{camp.title}</div>
                        <div className="text-[11px] text-[#7C746C] mb-1.5">Redeemed: {camp.date}</div>
                        <div className="text-xs font-medium text-[#4A433D] flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-[#D4A753]" /> {camp.reward}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white border border-[#EAE6E1] rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#EAE6E1] bg-[#FAF8F5] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4A753]" />
                <h3 className="font-bold text-[#1A1615]">Recent Branch Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-[#EAE6E1]">
                      <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-[#7C746C]">Action</th>
                      <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-[#7C746C]">Location & Time</th>
                      <th className="py-3 px-5 text-[10px] font-bold uppercase tracking-wider text-[#7C746C] text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE6E1]">
                    {customer.recentActivity.map((act, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-3 px-5">
                          <div className="text-[13px] font-bold text-[#1A1615]">{act.action}</div>
                        </td>
                        <td className="py-3 px-5">
                          <div className="text-[11px] font-semibold text-[#7C746C]">
                            {act.branch} <span className="mx-1">·</span> {act.date}
                          </div>
                        </td>
                        <td className="py-3 px-5 text-right">
                          {act.amount !== undefined && act.amount > 0 ? (
                            <span className="text-[13px] font-bold font-mono text-[#1A1615]">
                              ${act.amount.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-[#9E9A93]">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {customer.recentActivity.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-6 text-center text-sm text-[#7C746C]">No recent activity found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
