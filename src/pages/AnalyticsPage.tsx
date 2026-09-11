import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Clock,
  AlertTriangle,
  Calendar,
  DollarSign,
  Download,
  Filter,
  Sparkles
} from 'lucide-react';
import { RETENTION_COHORT_DATA } from '../data/mockData';
import { PrimaryButton } from '../components/common/Badges';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '180d'>('30d');

  // Heatmap cell color helper: Gold/Tan gradients for >70%, 50-70%, <50%
  const getHeatmapColor = (pct: number) => {
    if (pct === 0) return 'bg-[#FAF8F5] text-[#9E9A93]';
    if (pct >= 85) return 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white font-bold shadow-2xs';
    if (pct >= 75) return 'bg-[#D4A753]/40 text-[#1A1615] font-semibold';
    if (pct >= 65) return 'bg-[#D4A753]/20 text-[#1A1615] font-medium';
    return 'bg-[#FAF8F5] text-[#6E6A66]';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            DATA INTELLIGENCE // BEHAVIORAL COHORTS
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Analytics & Cohort Retention Reports</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Cohort retention heatmaps, tier velocity funnels, and repeat visit frequency across all 3 venues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-0.5 bg-white border border-[#E5E0D8] rounded-lg text-xs font-semibold shadow-2xs">
            {(['30d', '90d', '180d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  timeRange === r ? 'bg-[#9E782F] text-white' : 'text-[#6E6A66] hover:text-[#1A1615]'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Exporting Cohort Retention PDF Report...')}
            className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6E6A66]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* High-level KPIs Grid (4 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">30-Day Customer Retention</span>
            <TrendingUp className="w-4 h-4 text-[#0D7A53]" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#1A1615] mt-1">74.8%</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold flex items-center gap-1 mt-1">
            ↑ +5.2% vs. Q2 Baseline
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Obsidian VIP LTV</span>
            <Award className="w-4 h-4 text-[#9E782F]" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#1A1615] mt-1">$1,480.00</div>
          <span className="text-[11px] text-[#6E6A66] font-medium mt-1">
            4.2x Standard Member Value
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Stamp Velocity</span>
            <Clock className="w-4 h-4 text-[#9E782F]" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#1A1615] mt-1">12.4 Days</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold flex items-center gap-1 mt-1">
            Avg. time to complete 10 stamps
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Guest Churn Risk</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-[#1A1615] mt-1">4.2%</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold flex items-center gap-1 mt-1">
            ↓ 1.8% Churn Reduction
          </span>
        </div>
      </div>

      {/* Retention Cohort Heatmap Section */}
      <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E0D8] pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
              MONTHLY RETENTION MATRIX
            </span>
            <h3 className="text-base font-bold text-[#1A1615]">Customer Retention Cohort Heatmap</h3>
            <p className="text-xs text-[#6E6A66]">
              Percentage of customers returning to make an in-store scan each subsequent month.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#6E6A66]">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-gradient-to-r from-[#D4A753] to-[#9E782F]" /> &gt;85%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-[#D4A753]/40 border border-[#E5E0D8]" /> 75-85%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-[#D4A753]/20 border border-[#E5E0D8]" /> 65-75%
            </span>
          </div>
        </div>

        {/* Heatmap Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="border-b border-[#E5E0D8] text-[#9E9A93] text-[10px] uppercase font-bold">
                <th className="py-2.5 px-3 text-left">Cohort</th>
                <th className="py-2.5 px-3 text-left">Members</th>
                <th className="py-2.5 px-3">Month 1</th>
                <th className="py-2.5 px-3">Month 2</th>
                <th className="py-2.5 px-3">Month 3</th>
                <th className="py-2.5 px-3">Month 4</th>
                <th className="py-2.5 px-3">Month 5</th>
                <th className="py-2.5 px-3">Month 6</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {RETENTION_COHORT_DATA.map((row) => (
                <tr key={row.cohort} className="hover:bg-[#FAF8F5]/50 transition-colors">
                  <td className="py-2.5 px-3 text-left font-bold text-[#1A1615]">{row.cohort}</td>
                  <td className="py-2.5 px-3 text-left font-mono text-[#6E6A66]">{row.members.toLocaleString()}</td>
                  <td className="py-1 px-1">
                    <div className={`py-1.5 rounded-md font-mono ${getHeatmapColor(row.m1)}`}>
                      {row.m1 ? `${row.m1}%` : '—'}
                    </div>
                  </td>
                  <td className="py-1 px-1">
                    <div className={`py-1.5 rounded-md font-mono ${getHeatmapColor(row.m2)}`}>
                      {row.m2 ? `${row.m2}%` : '—'}
                    </div>
                  </td>
                  <td className="py-1 px-1">
                    <div className={`py-1.5 rounded-md font-mono ${getHeatmapColor(row.m3)}`}>
                      {row.m3 ? `${row.m3}%` : '—'}
                    </div>
                  </td>
                  <td className="py-1 px-1">
                    <div className={`py-1.5 rounded-md font-mono ${getHeatmapColor(row.m4)}`}>
                      {row.m4 ? `${row.m4}%` : '—'}
                    </div>
                  </td>
                  <td className="py-1 px-1">
                    <div className={`py-1.5 rounded-md font-mono ${getHeatmapColor(row.m5)}`}>
                      {row.m5 ? `${row.m5}%` : '—'}
                    </div>
                  </td>
                  <td className="py-1 px-1">
                    <div className={`py-1.5 rounded-md font-mono ${getHeatmapColor(row.m6)}`}>
                      {row.m6 ? `${row.m6}%` : '—'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 2 Columns: Tier Velocity Funnel + Top Menu Items Driving Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tier Velocity Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
              LOYALTY ELEVATION
            </span>
            <h3 className="text-base font-bold text-[#1A1615]">Tier Velocity Conversion Funnel</h3>
            <p className="text-xs text-[#6E6A66]">Progression from 1st scan to Obsidian VIP status.</p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Stage 1 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#1A1615] mb-1">
                <span>Standard Passes Issued</span>
                <span>6,420 Guests (100%)</span>
              </div>
              <div className="w-full h-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#E5E0D8] w-full" />
              </div>
            </div>

            {/* Stage 2 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#1A1615] mb-1">
                <span>Active Repeat Visitors (3+ Visits)</span>
                <span>3,980 Guests (62%)</span>
              </div>
              <div className="w-full h-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4A753]/60 to-[#9E782F]/60 w-[62%]" />
              </div>
            </div>

            {/* Stage 3 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#1A1615] mb-1">
                <span>Gold Reserve Qualified ($500+ Spend)</span>
                <span>1,240 Guests (19.3%)</span>
              </div>
              <div className="w-full h-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4A753] to-[#9E782F] w-[19.3%]" />
              </div>
            </div>

            {/* Stage 4 */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#1A1615] mb-1">
                <span className="text-[#9E782F]">Obsidian VIP Converted ($1,500+ Spend)</span>
                <span className="text-[#9E782F]">482 Guests (7.5%)</span>
              </div>
              <div className="w-full h-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#1A1615] w-[7.5%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Driving Retention (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-4">
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
              PRODUCT STICKINESS
            </span>
            <h3 className="text-base font-bold text-[#1A1615]">Menu Items Driving Retention</h3>
            <p className="text-xs text-[#6E6A66]">Products correlated with highest 30-day repeat visits.</p>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#1A1615]">Panama Boquete Geisha Flight</div>
                <span className="text-[10px] text-[#0D7A53] font-semibold">91.4% 30-Day Repeat Rate</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#9E782F]">+42.8% LTV Lift</span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#1A1615]">Ethiopia Yirgacheffe Grade 1 Pour-Over</div>
                <span className="text-[10px] text-[#0D7A53] font-semibold">84.2% 30-Day Repeat Rate</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#9E782F]">+31.2% LTV Lift</span>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#1A1615]">Artisanal Cardamom Kouign-Amann</div>
                <span className="text-[10px] text-[#0D7A53] font-semibold">78.0% 30-Day Repeat Rate</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#9E782F]">+26.5% LTV Lift</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
