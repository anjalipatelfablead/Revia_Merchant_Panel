import React, { useState } from 'react';
import {
  Calendar,
  Share2,
  Plus,
  TrendingUp,
  QrCode,
  UserPlus,
  Zap,
  ChevronRight,
  MoreVertical,
  Wifi,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Clock,
  Sparkles,
  Store,
  ChevronDown
} from 'lucide-react';
import { Customer, CatalogItem, Branch, NavRoute } from '../types';

interface DashboardPageProps {
  onNavigate: (route: NavRoute) => void;
  customers?: Customer[];
  catalog?: CatalogItem[];
  branches?: Branch[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [activeDateRange, setActiveDateRange] = useState('Last 30 Days (Oct 1 - Oct 31, 2024)');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    stamps: number;
    redeemed: number;
    x: number;
    y1: number;
    y2: number;
  } | null>({
    date: 'Thu, Oct 24',
    stamps: 1084,
    redeemed: 186,
    x: 440,
    y1: 65,
    y2: 155,
  });

  // Dynamic Chart data and totals based on filters
  const { chartPoints, totalStamps, totalRedeemed, ratio } = React.useMemo(() => {
    let basePoints = [];
    let stamps = 0;
    let redeemed = 0;

    if (activeDateRange === 'Last 7 Days') {
      basePoints = [
        { date: 'Mon', stamps: 820, redeemed: 120, x: 20, y1: 140, y2: 180 },
        { date: 'Tue', stamps: 950, redeemed: 140, x: 120, y1: 120, y2: 175 },
        { date: 'Wed', stamps: 880, redeemed: 130, x: 220, y1: 130, y2: 178 },
        { date: 'Thu', stamps: 1100, redeemed: 180, x: 320, y1: 100, y2: 165 },
        { date: 'Fri', stamps: 1400, redeemed: 220, x: 420, y1: 70, y2: 140 },
        { date: 'Sat', stamps: 1600, redeemed: 280, x: 520, y1: 50, y2: 120 },
        { date: 'Sun', stamps: 1450, redeemed: 240, x: 620, y1: 60, y2: 130 },
      ];
      stamps = 8200;
      redeemed = 1310;
    } else if (activeDateRange === 'This Quarter (Q4 2024)') {
      basePoints = [
        { date: 'Oct', stamps: 28410, redeemed: 4180, x: 20, y1: 120, y2: 180 },
        { date: 'Nov', stamps: 32000, redeemed: 4800, x: 320, y1: 80, y2: 160 },
        { date: 'Dec', stamps: 45000, redeemed: 7500, x: 620, y1: 40, y2: 120 },
      ];
      stamps = 105410;
      redeemed = 16480;
    } else if (activeDateRange === 'Year to Date (2024)') {
      basePoints = [
        { date: 'Q1', stamps: 65000, redeemed: 8500, x: 20, y1: 150, y2: 190 },
        { date: 'Q2', stamps: 82000, redeemed: 11000, x: 220, y1: 120, y2: 170 },
        { date: 'Q3', stamps: 95000, redeemed: 13500, x: 420, y1: 90, y2: 150 },
        { date: 'Q4', stamps: 105410, redeemed: 16480, x: 620, y1: 50, y2: 110 },
      ];
      stamps = 347410;
      redeemed = 49480;
    } else {
      // Default: Last 30 Days
      basePoints = [
        { date: 'Oct 01', stamps: 740, redeemed: 110, x: 20, y1: 120, y2: 180 },
        { date: 'Oct 05', stamps: 820, redeemed: 125, x: 80, y1: 105, y2: 172 },
        { date: 'Oct 09', stamps: 790, redeemed: 118, x: 140, y1: 112, y2: 176 },
        { date: 'Oct 13', stamps: 910, redeemed: 140, x: 200, y1: 92, y2: 165 },
        { date: 'Oct 16', stamps: 860, redeemed: 132, x: 260, y1: 100, y2: 169 },
        { date: 'Oct 20', stamps: 980, redeemed: 165, x: 320, y1: 80, y2: 160 },
        { date: 'Oct 22', stamps: 1020, redeemed: 175, x: 380, y1: 72, y2: 158 },
        { date: 'Thu, Oct 24', stamps: 1084, redeemed: 186, x: 440, y1: 65, y2: 155 },
        { date: 'Oct 26', stamps: 990, redeemed: 170, x: 500, y1: 78, y2: 162 },
        { date: 'Oct 29', stamps: 1050, redeemed: 180, x: 560, y1: 68, y2: 157 },
        { date: 'Oct 31', stamps: 1120, redeemed: 195, x: 620, y1: 55, y2: 152 },
      ];
      stamps = 28410;
      redeemed = 4180;
    }

    if (timeframe === 'Weekly') {
      stamps = Math.round(stamps * 0.25);
      redeemed = Math.round(redeemed * 0.25);
    } else if (timeframe === 'Monthly') {
      stamps = Math.round(stamps * 1.05);
      redeemed = Math.round(redeemed * 1.05);
    }

    const calculatedRatio = redeemed > 0 ? (stamps / redeemed).toFixed(2) : '0.00';

    return { chartPoints: basePoints, totalStamps: stamps, totalRedeemed: redeemed, ratio: calculatedRatio };
  }, [activeDateRange, timeframe]);

  // Path generators
  const generatePath = (points: any[], key: 'y1' | 'y2') => {
    if (points.length === 0) return '';
    return points.map((p, i) => {
      if (i === 0) return `M ${p.x} ${p[key]}`;
      const prev = points[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 3;
      const cy1 = prev[key];
      const cx2 = prev.x + 2 * (p.x - prev.x) / 3;
      const cy2 = p[key];
      return `C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p[key]}`;
    }).join(' ');
  };

  const stampsPath = generatePath(chartPoints, 'y1');
  const redeemedPath = generatePath(chartPoints, 'y2');
  const areaPath = chartPoints.length > 0 ? `${stampsPath} L ${chartPoints[chartPoints.length - 1].x} 190 L ${chartPoints[0].x} 190 Z` : '';

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5">
      {/* 1. Header Overview Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
              Dashboard Overview
            </h1>
            <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#CEEBD9] inline-flex items-center gap-1">
              Live System
            </span>
          </div>
          <p className="text-xs text-[#7C746C] mt-1">
            Real-time performance across all 3 active branch locations • Last updated 2 mins ago
          </p>
        </div>

        {/* Top Right Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Date Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
              className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1615] flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7C746C]" />
              <span>{activeDateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#7C746C]" />
            </button>

            {dateDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white border border-[#EAE6E1] rounded-xl shadow-lg z-50 py-1 text-xs">
                {[
                  'Last 7 Days',
                  'Last 30 Days (Oct 1 - Oct 31, 2024)',
                  'This Quarter (Q4 2024)',
                  'Year to Date (2024)'
                ].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setActiveDateRange(range);
                      setDateDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#FAF8F5] transition-colors cursor-pointer ${
                      range === activeDateRange ? 'font-bold text-[#A37837] bg-[#FAF6EE]' : 'text-[#1A1615]'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Report Button */}
          <button
            onClick={() => alert('Exporting complete merchant intelligence report (CSV / PDF)...')}
            className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#7C746C]" />
            <span>Export Report</span>
          </button>

          {/* Create Campaign Primary Button */}
          <button
            onClick={() => onNavigate('/campaigns/new')}
            className="bg-[#B38637] hover:bg-[#A37837] text-white rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {/* Metric 1: Active Loyalty Members */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7C746C]">
                Active Loyalty Members
              </span>
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> 12.4%
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">
              24,850
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#7C746C] mt-1">
              <span>3,120 new signups this month</span>
              <span className="text-[10px] text-[#A8A29E]">mo/mo</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#F5F2EC] flex items-center justify-between">
            <span className="text-[11px] text-[#5C554E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38637]" />
              Active retention 94.1%
            </span>
            {/* Sparkline */}
            <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
              <path
                d="M 2 16 Q 20 18 35 11 T 60 7 T 78 4"
                stroke="#B38637"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Metric 2: Repeat Visit Rate */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7C746C]">
                Repeat Visit Rate
              </span>
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> 4.1%
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">
              68.2%
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#7C746C] mt-1">
              <span>Avg 2.8 visits/member/mo</span>
              <span className="text-[11px] text-[#7C746C]">Target: 64%</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#F5F2EC] flex items-center justify-between">
            <span className="text-[11px] text-[#5C554E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
              +0.4 visits vs Sept
            </span>
            {/* Green Sparkline */}
            <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
              <path
                d="M 2 15 Q 22 17 38 12 T 62 8 T 78 5"
                stroke="#15803D"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Metric 3: Rewards Redeemed */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7C746C]">
                Rewards Redeemed
              </span>
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> 8.9%
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">
              4,180
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#7C746C] mt-1">
              <span>91.2% redemption velocity</span>
              <span className="text-[11px] text-[#7C746C]">8-stamp</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#F5F2EC] flex items-center justify-between">
            <span className="text-[11px] text-[#5C554E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38637]" />
              368 unclaimed cards
            </span>
            {/* Gold Sparkline */}
            <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
              <path
                d="M 2 17 Q 20 12 36 14 T 60 9 T 78 6"
                stroke="#B38637"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Metric 4: Attributed Revenue (GMV) */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7C746C]">
                Attributed Revenue (GMV)
              </span>
              <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> 15.2%
              </span>
            </div>
            <div className="text-3xl font-bold tracking-tight text-[#1A1615] mt-1.5">
              $142,650
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#7C746C] mt-1">
              <span>$34.12 avg spend with stamp</span>
              <span className="text-[11px] text-[#7C746C]">ROI 8.4x</span>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-[#F5F2EC] flex items-center justify-between">
            <span className="text-[11px] text-[#5C554E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1615]" />
              +$18.7k lift vs baseline
            </span>
            {/* Dark Charcoal Sparkline */}
            <svg className="w-20 h-5" viewBox="0 0 80 20" fill="none">
              <path
                d="M 2 18 Q 20 15 36 10 T 60 6 T 78 3"
                stroke="#1A1615"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Middle Grid: Visits/Redemptions (8 cols) & Program Velocity (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Chart: Customer Visits & Reward Redemptions */}
        <div className="lg:col-span-8 bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Card Header & Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#1A1615]">
                  Customer Visits &amp; Reward Redemptions
                </h2>
                <p className="text-xs text-[#7C746C] mt-0.5">
                  Dynamic volume comparison across all terminal stamps
                </p>
              </div>

              {/* Daily / Weekly / Monthly Switcher */}
              <div className="bg-[#F2EFE9] p-0.5 rounded-lg flex items-center self-start sm:self-auto">
                {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      timeframe === t
                        ? 'bg-[#B38637] text-white shadow-2xs'
                        : 'text-[#7C746C] hover:text-[#1A1615]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend & Ratio */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#F5F2EC] text-xs">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B38637]" />
                  <span className="text-[#7C746C]">Stamps Issued</span>
                  <span className="font-bold text-[#1A1615]">{totalStamps.toLocaleString()}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A1615]" />
                  <span className="text-[#7C746C]">Rewards Redeemed</span>
                  <span className="font-bold text-[#1A1615]">{totalRedeemed.toLocaleString()}</span>
                </span>
              </div>
              <div className="font-mono text-xs text-[#7C746C]">
                Scan Ratio: <span className="font-semibold text-[#1A1615]">{ratio} : 1</span>
              </div>
            </div>

            {/* Interactive SVG Chart Viewport */}
            <div className="relative mt-4 h-64 w-full select-none">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 640 210"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Gold Area Gradient */}
                  <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B38637" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#B38637" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="640" y2="40" stroke="#F5F2EC" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="640" y2="90" stroke="#F5F2EC" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="640" y2="140" stroke="#F5F2EC" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="190" x2="640" y2="190" stroke="#EAE6E1" strokeWidth="1" />

                {/* Area under stamps curve */}
                <path
                  d={areaPath}
                  fill="url(#goldAreaGrad)"
                />

                {/* Gold Line: Stamps Issued */}
                <path
                  d={stampsPath}
                  stroke="#B38637"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Dark Charcoal Line: Rewards Redeemed */}
                <path
                  d={redeemedPath}
                  stroke="#1A1615"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Interactive Points on hover */}
                {chartPoints.map((pt) => {
                  const isHovered = hoveredPoint?.date === pt.date;
                  return (
                    <g
                      key={pt.date}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(pt)}
                    >
                      {/* Vertical highlight line on hovered */}
                      {isHovered && (
                        <line
                          x1={pt.x}
                          y1="30"
                          x2={pt.x}
                          y2="190"
                          stroke="#A8A29E"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* Gold stamp point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y1}
                        r={isHovered ? '5' : '3.5'}
                        fill="#FFFFFF"
                        stroke="#B38637"
                        strokeWidth={isHovered ? '2.5' : '2'}
                      />

                      {/* Dark redeemed point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y2}
                        r={isHovered ? '4.5' : '3'}
                        fill="#FFFFFF"
                        stroke="#1A1615"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Render Tooltip Box at Hovered Position */}
              {hoveredPoint && (
                <div
                  className="absolute pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${(hoveredPoint.x / 640) * 100}%`,
                    top: `${(hoveredPoint.y1 / 210) * 100 - 6}%`,
                  }}
                >
                  <div className="bg-[#1A1615] text-white rounded-lg p-2.5 shadow-xl border border-neutral-700 min-w-[125px]">
                    <div className="text-[11px] font-semibold text-[#A8A29E] border-b border-neutral-700/80 pb-1 mb-1.5 flex items-center justify-between">
                      <span>{hoveredPoint.date}</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between gap-3 text-white">
                        <span className="text-[#A8A29E] text-[11px]">Stamps:</span>
                        <span className="font-bold">{hoveredPoint.stamps.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3 text-white">
                        <span className="text-[#A8A29E] text-[11px]">Redeemed:</span>
                        <span className="font-bold">{hoveredPoint.redeemed.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom 3 Summary Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-2 border-t border-[#F5F2EC]">
            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1]">
              <div className="text-[9px] uppercase font-bold text-[#8C827A] tracking-wider">
                PEAK HOUR
              </div>
              <div className="text-xs font-bold text-[#1A1615] mt-0.5">
                12:30 - 14:00 PM
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1]">
              <div className="text-[9px] uppercase font-bold text-[#8C827A] tracking-wider">
                TOP REWARD
              </div>
              <div className="text-xs font-bold text-[#1A1615] mt-0.5">
                Signature Oat Latte
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE6E1]">
              <div className="text-[9px] uppercase font-bold text-[#8C827A] tracking-wider">
                STAMP VELOCITY
              </div>
              <div className="text-xs font-bold text-[#1A1615] mt-0.5">
                39.2 scans / hr
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Program Velocity */}
        <div className="lg:col-span-4 bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1A1615]">
                Program Velocity
              </h2>
              <span className="text-[10px] font-semibold text-[#8C827A] bg-[#FAF6EE] border border-[#E5D7BE] px-2 py-0.5 rounded-md">
                Oct Target
              </span>
            </div>
            <p className="text-xs text-[#7C746C] mt-0.5">
              30,000 monthly scan capacity
            </p>

            {/* Circular Donut Progress Ring */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Track Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F2EFE9"
                    strokeWidth="8"
                    fill="none"
                  />
                  {/* Active Progress Circle: 84% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#B38637"
                    strokeWidth="8"
                    strokeDasharray="238.76"
                    strokeDashoffset="38.2" // (1 - 0.84) * 238.76 = 38.2
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold tracking-tight text-[#1A1615]">
                    84%
                  </span>
                  <span className="text-[11px] font-medium text-[#7C746C]">
                    25,200 Scans
                  </span>
                </div>
              </div>
            </div>

            {/* Branch Breakdown List */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#3D3732]">
                  <span className="w-2 h-2 rounded-full bg-[#B38637]" />
                  <span>Downtown Flagship</span>
                </span>
                <span className="font-medium text-[#1A1615]">
                  48% (12,096)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#3D3732]">
                  <span className="w-2 h-2 rounded-full bg-[#1A1615]" />
                  <span>Northside Mall</span>
                </span>
                <span className="font-medium text-[#1A1615]">
                  32% (8,064)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#3D3732]">
                  <span className="w-2 h-2 rounded-full bg-[#8C827A]" />
                  <span>West End Kiosk</span>
                </span>
                <span className="font-medium text-[#1A1615]">
                  20% (5,040)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Operational Actions Section */}
          <div className="mt-5 pt-4 border-t border-[#F5F2EC]">
            <div className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider mb-2">
              QUICK OPERATIONAL ACTIONS
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Action 1 */}
              <button
                onClick={() => onNavigate('/qr-codes')}
                className="w-full text-left bg-[#B38637] hover:bg-[#A37837] border border-[#A37837] rounded-xl p-3 flex flex-col justify-between transition-colors shadow-xs h-24 cursor-pointer group"
              >
                <QrCode className="w-5 h-5 text-white mb-2" />
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Scan & Verify</div>
                  <div className="text-[10px] text-[#FDF8EB] opacity-90 line-clamp-1">Counter camera launch</div>
                </div>
              </button>

              {/* Action 2 */}
              <button
                onClick={() => onNavigate('/qr-codes')}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-3 flex flex-col justify-between transition-colors shadow-2xs h-24 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FAF6EE] text-[#B38637] flex items-center justify-center mb-2">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1615] mb-0.5">QR Pack Print</div>
                  <div className="text-[10px] text-[#7C746C] line-clamp-1">Table stand templates</div>
                </div>
              </button>

              {/* Action 3 */}
              <button
                onClick={() => onNavigate('/staff')}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-3 flex flex-col justify-between transition-colors shadow-2xs h-24 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FAF6EE] text-[#B38637] flex items-center justify-center mb-2">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1615] mb-0.5">Shift Staff</div>
                  <div className="text-[10px] text-[#7C746C] line-clamp-1">4 baristas logged in</div>
                </div>
              </button>

              {/* Action 4 */}
              <button
                onClick={() => onNavigate('/loyalty')}
                className="w-full text-left bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl p-3 flex flex-col justify-between transition-colors shadow-2xs h-24 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FAF6EE] text-[#B38637] flex items-center justify-center mb-2">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1615] mb-0.5">Double-Stamp</div>
                  <div className="text-[10px] text-[#7C746C] line-clamp-1">Trigger flash hour boost</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Real-time Branch Activity & Branch Comparison & Stand Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Real-time Branch Activity */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#1A1615]">
                  Real-time Branch Activity
                </h2>
                <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              </div>
              <span className="font-mono text-xs text-[#5C554E]">
                Stream: Connected
              </span>
            </div>
            <p className="text-xs text-[#7C746C] mt-0.5 mb-4">
              Instant log of counter scans, member tier upgrades, and verified redemptions
            </p>

            {/* 4 Activity Cards */}
            <div className="space-y-3">
              {/* Activity 1 */}
              <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#E5D7BE] flex items-center justify-center text-[#B38637] shrink-0 mt-0.5">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1615]">
                      Marcus Vance
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      4 mins ago
                    </span>
                  </div>
                  <div className="text-xs text-[#3D3732] mt-0.5">
                    Earned Stamp #8 • Downtown Flagship
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-semibold bg-[#EFECE6] text-[#5C554E] px-1.5 py-0.5 rounded">
                      POS #02
                    </span>
                    <span className="text-[11px] text-[#7C746C]">
                      Staff: Sarah K.
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF7F0] border border-[#CEEBD9] flex items-center justify-center text-[#15803D] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1615]">
                      Elena Rostova
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      11 mins ago
                    </span>
                  </div>
                  <div className="text-xs text-[#3D3732] mt-0.5">
                    Redeemed &ldquo;Free Cold Brew &amp; Pastry&rdquo; • Northside
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-bold bg-[#EBF7F0] text-[#15803D] border border-[#CEEBD9] px-2 py-0.5 rounded">
                      VERIFIED VOUCHER
                    </span>
                    <span className="font-mono text-[11px] text-[#7C746C]">
                      TK-98241
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#E5D7BE] flex items-center justify-center text-[#B38637] shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1615]">
                      David Chen
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      19 mins ago
                    </span>
                  </div>
                  <div className="text-xs text-[#3D3732] mt-0.5">
                    Unlocked <span className="text-[#A37837] font-semibold">Gold Tier</span> privileges (25 lifetime visits)
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-bold bg-[#1A1615] text-[#D4A753] px-2 py-0.5 rounded">
                      OBSIDIAN VIP
                    </span>
                    <span className="text-[11px] text-[#7C746C]">
                      Perk: 1.5x Auto-Stamps
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity 4 */}
              <div className="p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EFECE6] border border-[#E0DBD3] flex items-center justify-center text-[#5C554E] shrink-0 mt-0.5">
                  <QrCode className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1615]">
                      QR Stand: &ldquo;Table 14 - Fast Scan&rdquo;
                    </span>
                    <span className="text-[11px] text-[#8C827A]">
                      1 hr ago
                    </span>
                  </div>
                  <div className="text-xs text-[#3D3732] mt-0.5">
                    Scanned 12 times in the last hour • West End Kiosk
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-bold bg-[#FAF6EE] text-[#9E782F] border border-[#E5D7BE] px-2 py-0.5 rounded">
                      High Velocity Alert
                    </span>
                    <span className="text-[11px] text-[#7C746C]">
                      Static Table Stand
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-4 pt-3 border-t border-[#F5F2EC] flex items-center justify-between">
            <button
              onClick={() => onNavigate('/settings/audit')}
              className="text-xs font-bold text-[#A37837] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View full activity audit ledger</span>
              <span>→</span>
            </button>
            <span className="text-[11px] text-[#8C827A]">
              Refreshed automatically
            </span>
          </div>
        </div>

        {/* Right: Branch Comparison & Stand Status */}
        <div className="bg-white border border-[#EAE6E1] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1A1615]">
                Branch Comparison &amp; Stand Status
              </h2>
              <button 
                className="text-[#8C827A] hover:text-[#1A1615] p-1 cursor-pointer"
                aria-label="Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#7C746C] mt-0.5 mb-4">
              Operational stand performance across live retail sites
            </p>

            {/* Performance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F2EFE9] text-[10px] uppercase font-bold tracking-wider text-[#8C827A]">
                    <th className="pb-2.5">BRANCH NAME</th>
                    <th className="pb-2.5">QR STANDS</th>
                    <th className="pb-2.5">TODAY SCANS</th>
                    <th className="pb-2.5">REDEEMED</th>
                    <th className="pb-2.5 text-right">STAFF ACTIVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EC] text-xs">
                  {/* Row 1 */}
                  <tr>
                    <td className="py-3">
                      <div className="font-bold text-[#1A1615]">
                        Downtown Flagship
                      </div>
                      <div className="text-[10px] text-[#8C827A]">
                        742 Evergreen Terr.
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 font-medium text-[#1A1615]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        6 Active
                      </span>
                    </td>
                    <td className="py-3 font-bold text-[#1A1615]">
                      412
                    </td>
                    <td className="py-3 font-bold text-[#B38637]">
                      38
                    </td>
                    <td className="py-3 text-right">
                      <span className="bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615] text-[11px] font-medium px-2.5 py-0.5 rounded-full inline-block">
                        3 On-duty
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="py-3">
                      <div className="font-bold text-[#1A1615]">
                        Northside Mall
                      </div>
                      <div className="text-[10px] text-[#8C827A]">
                        Atrium Level 2, Unit 4B
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 font-medium text-[#1A1615]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        4 Active
                      </span>
                    </td>
                    <td className="py-3 font-bold text-[#1A1615]">
                      245
                    </td>
                    <td className="py-3 font-bold text-[#B38637]">
                      22
                    </td>
                    <td className="py-3 text-right">
                      <span className="bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615] text-[11px] font-medium px-2.5 py-0.5 rounded-full inline-block">
                        2 On-duty
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="py-3">
                      <div className="font-bold text-[#1A1615]">
                        West End Kiosk
                      </div>
                      <div className="text-[10px] text-[#8C827A]">
                        Transit Plaza Central
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 font-medium text-[#1A1615]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        2 Active
                      </span>
                    </td>
                    <td className="py-3 font-bold text-[#1A1615]">
                      118
                    </td>
                    <td className="py-3 font-bold text-[#B38637]">
                      14
                    </td>
                    <td className="py-3 text-right">
                      <span className="bg-[#FAF8F5] border border-[#EAE6E1] text-[#1A1615] text-[11px] font-medium px-2.5 py-0.5 rounded-full inline-block">
                        1 On-duty
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terminal Telemetry Box */}
            <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-[#E5D7BE] bg-white flex items-center justify-center text-[#B38637] shrink-0">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1615]">
                    All 12 Terminal Stands Online
                  </div>
                  <div className="text-[11px] text-[#7C746C]">
                    Bluetooth &amp; Dynamic QR sync operating at 100% telemetry
                  </div>
                </div>
              </div>
              <span className="bg-[#EBF7F0] border border-[#CEEBD9] text-[#15803D] text-xs font-bold px-2.5 py-1 rounded-md shrink-0">
                99.98% SLA
              </span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-4 pt-3 border-t border-[#F5F2EC] flex items-center justify-between">
            <button
              onClick={() => onNavigate('/qr-codes')}
              className="text-xs font-bold text-[#A37837] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Configure QR stand terminals</span>
              <span>→</span>
            </button>
            <span className="text-[11px] text-[#8C827A]">
              Auto-sync: 30s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
