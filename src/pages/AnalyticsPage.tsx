import React, { useMemo, useState } from 'react';
import {
  Award,
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  FileText,
  LockKeyhole,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Timer,
} from 'lucide-react';
import { RETENTION_COHORT_DATA } from '../data/mockData';

const mobileRetentionDrivers = [
  {
    name: 'Panama Geisha Reserve',
    subtitle: 'Single Origin Pour',
    rate: '94% repeat',
    detail: '420 stamps linked',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Cardamom Tahini Cruffin',
    subtitle: 'Viennoiserie Batch',
    rate: '88% repeat',
    detail: '310 stamps linked',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'Madagascar Vanilla Latte',
    subtitle: 'House Bean Extraction',
    rate: '81% repeat',
    detail: '680 stamps linked',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80',
  },
];

const MobileAnalyticsView: React.FC = () => {
  const cohorts = [
    { name: 'W1 Oct Cohort', size: '980 patrons', change: '+4.1% MoM', values: ['100%', '84%', '76%', '68%'] },
    { name: 'W2 Oct Cohort', size: '1,120 patrons', change: '+8.6% MoM', values: ['100%', '88%', '79%', '71%'] },
  ];

  return (
    <div className="min-h-screen bg-[#FBF6F1] px-5 pb-7 pt-3 text-[#211C19]">
      <div className="mx-auto w-full max-w-[430px]">
        <header className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#211C19] text-sm font-bold text-white">R</div>
            <div className="leading-tight">
              <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-[0.04em]">Mayfair Flagship <ChevronDown className="h-3 w-3 text-[#756D65]" /></div>
              <div className="text-[10px] font-bold uppercase text-[#B28529]">MoreAnalytics</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative text-[#5F5750]"><span className="absolute -right-0.5 -top-1 h-1.5 w-1.5 rounded-full bg-[#B7362F]" /><Sparkles className="h-4 w-4" /></div>
            <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white shadow-sm"><img src="https://i.pravatar.cc/80?img=47" alt="Account" className="h-full w-full object-cover" /></div>
          </div>
        </header>

        <div className="pt-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#1A1615]">Analytics &amp; Retention</h1>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#B9F1CF] px-2 py-1 text-[10px] font-bold text-[#08734B]"><span className="h-1.5 w-1.5 rounded-full bg-[#0D9A63]" />Live Telemetry</span>
          </div>
          <p className="mt-2 text-[15px] text-[#756D65]">Longitudinal cohort curves &amp; VIP telemetry</p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {['Last 30D', 'Last 90D', 'YTD', 'All Branches'].map((period, index) => (
            <button key={period} type="button" className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-bold cursor-pointer transition-all ${index === 1 ? 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white shadow-xs' : 'bg-[#F3E9DF] text-[#3D3732] hover:bg-[#EAE1D7]'}`}>{period}</button>
          ))}
        </div>

        <section className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: '30D Retention', value: '74.8%', detail: '+6.2% vs avg', icon: Timer, positive: true },
            { label: 'Obsidian LTV', value: '$1,480', detail: '$38.90 AOV baseline', icon: Award },
            { label: 'Stamp Velocity', value: '12.4 Days', detail: 'To 10th stamp reward', icon: Timer },
            { label: 'Churn Risk', value: '4.2%', detail: '18 rescued this wk', icon: ShieldCheck, positive: true },
          ].map(({ label, value, detail, icon: Icon, positive }) => (
            <div key={label} className="min-h-[116px] rounded-xl border border-[#EAE6E1] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between"><span className="text-xs font-medium text-[#7C746C]">{label}</span><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FBF1E4] text-[#A8761C]"><Icon className="h-3.5 w-3.5" /></span></div>
              <div className="mt-3 text-2xl font-bold leading-none tracking-tight">{value}</div>
              <div className={`mt-1 text-[11px] font-medium ${positive ? 'text-[#078157]' : 'text-[#756D65]'}`}>{positive && <span className="mr-1">↗</span>}{detail}</div>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-[13px] bg-white p-4 shadow-[0_5px_18px_rgba(60,38,20,0.05)]">
          <div className="flex items-start justify-between"><div><h2 className="text-[19px] font-bold tracking-[-0.04em]">Cohort Decay Curves</h2><p className="text-[12px] text-[#756D65]">Weekly active return telemetry</p></div><SlidersHorizontal className="mt-1 h-4 w-4 text-[#756D65]" /></div>
          <div className="mt-2 flex items-center justify-between rounded-[8px] bg-[#FCF2E7] px-3 py-2 text-[10px] text-[#756D65]"><span className="font-bold">Cohort Origin</span><span className="flex gap-2"><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#E6D5BA]" />&lt;50%</span><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#B69A5B]" />70%</span><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#806014]" />90%+</span></span></div>
          <div className="mt-3 space-y-3">
            {cohorts.map((cohort) => (
              <div key={cohort.name} className="rounded-[8px] bg-[#FCF5EE] p-3"><div className="flex items-center justify-between text-[12px]"><span><b>{cohort.name}</b> <span className="text-[#756D65]">({cohort.size})</span></span><b className="text-[#087B55]">{cohort.change}</b></div><div className="mt-2 grid grid-cols-4 gap-1.5">{cohort.values.map((value, index) => <div key={value} className={`rounded-[4px] px-1 py-1.5 text-center text-white ${['bg-[#8A6200]', 'bg-[#9F7E2D]', 'bg-[#B29A5F]', 'bg-[#BDAA7C]'][index]}`}><div className="text-[9px] opacity-80">W{index === 3 ? 4 : index}</div><b className="text-[14px]">{value}</b></div>)}</div></div>
            ))}
          </div>
          <div className="mt-4 flex gap-2 rounded-[8px] bg-[#FFF0D7] p-3 text-[11px] leading-[1.25] text-[#513C18]"><Award className="h-4 w-4 shrink-0 text-[#9A741E]" /><span><b>Obsidian cohort retention outperforms</b> roastery benchmark by <b className="text-[#087B55]">+22%</b> over a 90-day trajectory.</span></div>
        </section>

        <section className="mt-8 rounded-[13px] bg-white p-4 shadow-[0_5px_18px_rgba(60,38,20,0.05)]"><div className="flex items-start justify-between"><div><h2 className="text-[19px] font-bold tracking-[-0.04em]">VIP Tier Progression</h2><p className="text-[12px] text-[#756D65]">Conversion funnel &amp; velocity</p></div><span className="rounded-[4px] bg-[#F4EEE8] px-2 py-1 text-[10px] font-bold text-[#756D65]">3,420 Enrolled</span></div><div className="mt-3 space-y-2.5">{[['Guest Scan', '100%', '3,420 guests', 'bg-[#6E6862]'], ['Prive Member', '82%', '2,804 members', 'bg-[#D4A753]'], ['Black Tier', '34%', '1,162 members', 'bg-[#C39A3D]'], ['Obsidian VIP', '11.8%', '404 members', 'bg-[#8A6200]']].map(([name, value, detail, color], index) => <div key={name}><div className="flex justify-between text-[12px]"><span className="font-medium"><i className={`mr-1.5 inline-block h-2 w-2 rounded-full ${color}`} />{name}</span><b>{value} <span className="font-normal">• {detail}</span></b></div><div className="mt-1 h-2.5 rounded-full bg-[#EFE5DA]"><div className={`h-full rounded-full ${color}`} style={{ width: value }} /></div>{index > 0 && <div className="ml-3 mt-1 text-[10px] text-[#756D65]">Avg velocity: {index === 1 ? '14 days from guest activation' : index === 2 ? '42 days (3.8 visits/wk)' : 'Generates top 48.6% of gross margin'}</div>}</div>)}</div></section>

        <section className="mt-8"><div className="flex items-end justify-between"><div><h2 className="text-[19px] font-bold tracking-[-0.04em]">High LTV Drivers</h2><p className="text-[12px] text-[#756D65]">Menu items prompting repeat visits</p></div><span className="text-[11px] font-bold text-[#A8761C]">TOP 3</span></div><div className="mt-3 space-y-2">{mobileRetentionDrivers.map((item) => <div key={item.name} className="flex items-center gap-3 rounded-[12px] bg-white p-3 shadow-[0_4px_14px_rgba(60,38,20,0.04)]"><img src={item.image} alt="" className="h-12 w-12 rounded-[7px] object-cover" /><div className="min-w-0 flex-1"><div className="truncate text-[13px] font-bold">{item.name}</div><div className="text-[11px] text-[#756D65]">{item.subtitle}</div></div><div className="text-right text-[11px]"><b className="block text-[#087B55]">{item.rate}</b><span>{item.detail}</span></div></div>)}</div></section>

        <button type="button" className="mt-8 flex w-full items-center justify-center gap-2 rounded-[11px] bg-gradient-to-r from-[#D4A753] to-[#9E782F] py-3.5 text-[13px] font-bold text-white shadow-[0_5px_12px_rgba(158,120,47,0.2)]"><FileText className="h-4 w-4" />Download Executive PDF Report</button>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#756D65]"><LockKeyhole className="h-3 w-3" />Encrypted TLS 1.3 telemetry • Revia Merchant Audit v4.2</div>
      </div>
    </div>
  );
};

export const AnalyticsPage: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('Last 90 Days (Aug 15 - Nov 14, 2024)');
  const [selectedVenue, setSelectedVenue] = useState('All Venues (3)');
  const [openDropdown, setOpenDropdown] = useState<'date' | 'venue' | null>(null);
  const [exported, setExported] = useState(false);

  const kpiCards = useMemo(
    () => [
      {
        label: '30-Day Customer Retention',
        value: '74.8%',
        detail: 'Vs Prev. Quarter',
        note: 'Benchmark: 58.4%',
        accent: 'bg-[#9E782F]',
        tone: 'emerald',
      },
      {
        label: 'Obsidian VIP LTV',
        value: '$1,480.00',
        detail: 'Avg 3.8 visits/week',
        note: '$38.90 AVG',
        accent: 'bg-[#C9A24F]',
        tone: 'gold',
      },
      {
        label: 'Stamp Velocity',
        value: '12.4 Days',
        detail: 'Target: 10 Stamps',
        note: '8.7 Stamps Avg',
        accent: 'bg-[#0D7A53]',
        tone: 'stone',
      },
      {
        label: 'Guest Churn Risk',
        value: '4.2%',
        detail: '18 dormant guests re-engaged via Flash Perk',
        note: '',
        accent: 'bg-[#D9A14A]',
        tone: 'amber',
      },
    ],
    []
  );

  const exportDossier = () => {
    const rows = [
      ['Analytics Dossier', 'Value'],
      ['Date Horizon', selectedDateRange],
      ['Venue', selectedVenue],
      [],
      ['Metric', 'Value', 'Detail', 'Note'],
      ...kpiCards.map(({ label, value, detail, note }) => [label, value, detail, note]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revia-analytics-dossier.csv';
    link.click();
    URL.revokeObjectURL(url);
    setExported(true);
    window.setTimeout(() => setExported(false), 2200);
  };

  const funnelStages = [
    { label: '1st QR Counter Scan', value: '100% (2,840)', detail: 'Avg 1.2 items per order', percent: 100, accent: 'bg-[#6E6862]' },
    { label: 'Privé Member', value: '82.0% Conversion', detail: 'Achieved within 9.4 days of scan', percent: 82, accent: 'bg-[#D4A753]' },
    { label: 'Black Tier', value: '34.0% Conversion', detail: 'Avg 28 days · 15 roasts logged', percent: 34, accent: 'bg-[#C39A3D]' },
    { label: 'Obsidian VIP', value: '11.8% Velocity', detail: 'Apex spending tier · 335 total guests', percent: 12, accent: 'bg-[#9E782F]' },
  ];

  const menuItems = [
    { name: 'Panama Geisha Reserve', rate: '94%', lift: '+42.8% LTV Lift', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&auto=format&fit=crop&q=80' },
    { name: 'Cardamom Tahini Cruffin', rate: '88%', lift: '+31.2% LTV Lift', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&auto=format&fit=crop&q=80' },
    { name: 'Madagascan Vanilla Oat', rate: '81%', lift: '+26.5% LTV Lift', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80' },
    { name: 'Single-Origin Roastery Flight', rate: '79%', lift: '+22.4% LTV Lift', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=120&auto=format&fit=crop&q=80' },
  ];

  const revenueSeries = [
    { label: 'M1', value: 1240 },
    { label: 'M2', value: 1320 },
    { label: 'M3', value: 1460 },
    { label: 'M4', value: 1620 },
    { label: 'M5', value: 1740 },
    { label: 'M6', value: 1880 },
    { label: 'M7', value: 1960 },
    { label: 'M8', value: 2160 },
    { label: 'M9', value: 2310 },
    { label: 'M10', value: 2435 },
    { label: 'M11', value: 2500 },
    { label: 'M12', value: 2600 },
  ];

  const getHeatmapColor = (pct: number) => {
    if (pct === 0) return 'bg-[#F7F5F2] text-[#8F8A84] border border-[#EEE7DD]';
    if (pct >= 85) return 'bg-gradient-to-r from-[#D4A753] to-[#9E782F] text-white font-bold shadow-[0_6px_16px_rgba(158,120,47,0.25)]';
    if (pct >= 75) return 'bg-[#D8B562]/45 text-[#1A1615] font-semibold';
    if (pct >= 65) return 'bg-[#E8D9B4]/60 text-[#1A1615] font-medium';
    return 'bg-[#F7F5F2] text-[#6E6A66]';
  };

  const renderLine = (data: { label: string; value: number }[], stroke: string, fill: string) => {
    const width = 620;
    const height = 180;
    const min = 0;
    const max = 1600;
    const range = max - min || 1;

    const toPoints = (values: number[]) => values
      .map((value, index) => {
        const x = (index / (data.length - 1)) * (width - 30) + 15;
        const y = height - ((value - min) / range) * (height - 30) - 15;
        return `${x},${y}`;
      })
      .join(' ');

    const obsidianValues = [0, 300, 500, 710, 900, 1060, 1190, 1300, 1380, 1440, 1480, 1500];
    const blackTierValues = [0, 180, 300, 430, 550, 660, 750, 830, 900, 950, 985, 1000];
    const primeMemberValues = [0, 95, 155, 220, 285, 335, 375, 410, 440, 465, 485, 500];
    const guestScanValues = [0, 34, 40, 48, 55, 61, 67, 72, 78, 83, 88, 95];
    const points = toPoints(obsidianValues);
    const blackTier = toPoints(blackTierValues);
    const primeMember = toPoints(primeMemberValues);
    const guestScan = toPoints(guestScanValues);

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full">
        <defs>
          <linearGradient id={`fill-${stroke.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity={0.25} />
            <stop offset="100%" stopColor={fill} stopOpacity={0.04} />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="15"
            x2={width - 15}
            y1={18 + line * 38}
            y2={18 + line * 38}
            stroke="#EEE9E2"
            strokeDasharray="2 6"
            strokeWidth="1"
          />
        ))}

        <polyline
          fill="none"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />

        <polyline fill="none" stroke="#B78625" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" points={blackTier} />
        <polyline fill="none" stroke="#D4A753" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" points={primeMember} />
        <polyline fill="none" stroke="#8C847A" strokeWidth="1.1" strokeDasharray="2 4" points={guestScan} />

        <circle cx={width - 15} cy={height - ((1500 - min) / range) * (height - 30) - 15} r="3" fill="#9E782F" />
        <circle cx={width - 15} cy={height - ((1000 - min) / range) * (height - 30) - 15} r="2.5" fill="#B78625" />
        <circle cx={width - 15} cy={height - ((500 - min) / range) * (height - 30) - 15} r="2.5" fill="#D4A753" />
        <circle cx={width - 15} cy={height - ((95 - min) / range) * (height - 30) - 15} r="2.5" fill="#8C847A" />

        {data.map((point, index) => (
          <text key={`month-${point.label}`} x={(index / (data.length - 1)) * (width - 30) + 15} y={height - 1} textAnchor="middle" fill="#8C847A" fontSize="8">{point.label}</text>
        ))}

        <text x={width - 16} y="20" textAnchor="end" fill="#B5ADA3" fontSize="8">$1,500</text>
        <text x={width - 16} y="65" textAnchor="end" fill="#B5ADA3" fontSize="8">$1,000</text>
        <text x={width - 16} y="110" textAnchor="end" fill="#B5ADA3" fontSize="8">$500</text>

        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * (width - 30) + 15;
          const y = height - ((point.value - min) / range) * (height - 30) - 15;
          return (
            <g key={point.label}>
              {index === data.length - 1 && <circle cx={x} cy={y} r="3" fill={stroke} />}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <>
      <div className="md:hidden">
        <MobileAnalyticsView />
      </div>
      <div className="hidden md:block">
        <div className="min-h-0 bg-[#F6F3EE] px-3 pb-2 pt-4 sm:px-5 lg:px-6">
          <div className="mx-auto w-full max-w-[1400px]">
            <header className="relative z-30 bg-[#F6F3EE] pb-2 pt-1">
              {/*
          <div className="mb-4 flex items-center justify-between pb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8C847A]">
            <div className="flex items-center gap-2">
              <span>Home</span>
              <span className="text-[#C8BFB4]">/</span>
              <span>Insights &amp; Config</span>
              <span className="text-[#C8BFB4]">/</span>
              <span className="text-[#9E782F]">Analytics &amp; Retention</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#CDE9DB] bg-[#F0FAF4] px-2.5 py-1.5 text-[8px] tracking-[0.1em] text-[#0D7A53]">
              <span className="h-2 w-2 rounded-full bg-[#16A36D]" />
              Live telemetry · 4m latency
            </div>
          </div>
          */}

              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                <div className="max-w-[480px]">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight leading-[1.05] text-[#1A1615]">
                      Analytics &amp; Cohort Retention
                    </h1>
                  </div>

                  <p className="mt-2 max-w-[540px] text-[14px] font-normal leading-[1.45] text-[#6E6862]">
                    Longitudinal guest retention curves, VIP tier velocity, stamp redemption turnover, and lifetime value across all artisanal venues.
                  </p>
                </div>

                <div className="hidden md:hidden lg:flex max-w-[380px] flex-wrap items-start justify-end gap-2 self-start lg:grid lg:w-[560px] lg:max-w-full lg:grid-cols-2 lg:self-auto">
                  <div className="relative z-50 min-w-[230px] lg:min-w-0 lg:w-full">
                    <button type="button" onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')} className="flex w-full items-center gap-2 rounded-[9px] border border-[#E7E0D8] bg-white px-2.5 py-1.5 text-left shadow-[0_2px_8px_rgba(25,20,18,0.02)] hover:border-[#C9A24F]">
                      <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#F3EFE9] text-[#7A7269]"><Calendar className="h-2.5 w-2.5" /></span>
                      <span className="flex min-w-0 flex-1 flex-col"><span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C847A]">Date horizon</span><span className="mt-0.5 truncate text-[11px] font-semibold text-[#1A1615]">{selectedDateRange}</span></span>
                      <ChevronDown className={`h-3 w-3 shrink-0 text-[#8C847A] transition-transform ${openDropdown === 'date' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'date' && <div className="absolute left-0 top-full z-20 mt-1 w-full min-w-[230px] rounded-lg border border-[#E7E0D8] bg-white p-1.5 text-left shadow-lg"><div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9E782F]">Choose date horizon</div>{['Last 30 Days', 'Last 90 Days (Aug 15 - Nov 14, 2024)', 'Year to date'].map((range) => <button key={range} type="button" onClick={() => { setSelectedDateRange(range); setOpenDropdown(null); }} className={`block w-full rounded-md px-2 py-2 text-left text-[11px] hover:bg-[#FAF5EC] ${selectedDateRange === range ? 'font-semibold text-[#9E782F]' : 'text-[#4F4842]'}`}>{range}</button>)}</div>}
                  </div>

                  <div className="relative z-50 min-w-[120px] lg:min-w-0 lg:w-full">
                    <button type="button" onClick={() => setOpenDropdown(openDropdown === 'venue' ? null : 'venue')} className="flex w-full items-center gap-2 rounded-[9px] border border-[#E7E0D8] bg-white px-2.5 py-1.5 text-left shadow-[0_2px_8px_rgba(25,20,18,0.02)] hover:border-[#C9A24F]">
                      <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#F3EFE9] text-[#7A7269]"><Filter className="h-2.5 w-2.5" /></span>
                      <span className="flex min-w-0 flex-1 flex-col"><span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C847A]">Venues</span><span className="mt-0.5 truncate text-[11px] font-semibold text-[#1A1615]">{selectedVenue}</span></span>
                      <ChevronDown className={`h-3 w-3 shrink-0 text-[#8C847A] transition-transform ${openDropdown === 'venue' ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === 'venue' && <div className="absolute left-0 top-full z-20 mt-1 w-full min-w-[160px] rounded-lg border border-[#E7E0D8] bg-white p-1.5 text-left shadow-lg"><div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9E782F]">Choose venue</div>{['All Venues (3)', 'Downtown Flagship', 'Roastery Reserve', 'Northside Pop-up'].map((venue) => <button key={venue} type="button" onClick={() => { setSelectedVenue(venue); setOpenDropdown(null); }} className={`block w-full rounded-md px-2 py-2 text-left text-[11px] hover:bg-[#FAF5EC] ${selectedVenue === venue ? 'font-semibold text-[#9E782F]' : 'text-[#4F4842]'}`}>{venue}</button>)}</div>}
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-[9px] border border-[#E7E1D8] bg-[#F4F0EA] px-2.5 py-1.5 shadow-[0_2px_8px_rgba(25,20,18,0.02)] lg:w-full">
                    <BarChart3 className="h-3 w-3 text-[#9E782F]" />
                    <span className="flex flex-col text-[9px] font-bold uppercase leading-3 tracking-[0.12em] text-[#1A1615]"><span className="text-[#8C847A]">Cohort benchmark</span><span>VIP vs New Guests</span></span>
                  </div>

                  <button type="button" onClick={exportDossier} className="inline-flex items-center justify-center gap-1.5 rounded-[9px] bg-gradient-to-b from-[#D4A753] to-[#9E782F] px-2.5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_3px_10px_rgba(158,120,47,0.2)] transition hover:opacity-95 lg:w-full">
                    <Download className="h-3 w-3" />
                    {exported ? 'Dossier Ready' : 'Export CSV / PDF Dossier'}
                  </button>
                </div>

                <div className="hidden md:flex lg:hidden w-full max-w-[760px] flex-wrap items-center gap-2 self-start">
                  <div className="flex w-full flex-wrap items-center gap-2">
                    <div className="relative z-50 min-w-[180px] flex-1">
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')} className="flex w-full items-center gap-2 rounded-[9px] border border-[#E7E0D8] bg-white px-2.5 py-1.5 text-left shadow-[0_2px_8px_rgba(25,20,18,0.02)] hover:border-[#C9A24F]">
                        <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#F3EFE9] text-[#7A7269]"><Calendar className="h-2.5 w-2.5" /></span>
                        <span className="flex min-w-0 flex-1 flex-col"><span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C847A]">Date horizon</span><span className="mt-0.5 truncate text-[11px] font-semibold text-[#1A1615]">{selectedDateRange}</span></span>
                        <ChevronDown className={`h-3 w-3 shrink-0 text-[#8C847A] transition-transform ${openDropdown === 'date' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'date' && <div className="absolute left-0 top-full z-20 mt-1 w-full min-w-[230px] rounded-lg border border-[#E7E0D8] bg-white p-1.5 text-left shadow-lg"><div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9E782F]">Choose date horizon</div>{['Last 30 Days', 'Last 90 Days (Aug 15 - Nov 14, 2024)', 'Year to date'].map((range) => <button key={range} type="button" onClick={() => { setSelectedDateRange(range); setOpenDropdown(null); }} className={`block w-full rounded-md px-2 py-2 text-left text-[11px] hover:bg-[#FAF5EC] ${selectedDateRange === range ? 'font-semibold text-[#9E782F]' : 'text-[#4F4842]'}`}>{range}</button>)}</div>}
                    </div>

                    <div className="relative z-50 min-w-[150px] flex-1">
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === 'venue' ? null : 'venue')} className="flex w-full items-center gap-2 rounded-[9px] border border-[#E7E0D8] bg-white px-2.5 py-1.5 text-left shadow-[0_2px_8px_rgba(25,20,18,0.02)] hover:border-[#C9A24F]">
                        <span className="flex h-4 w-4 items-center justify-center rounded-md bg-[#F3EFE9] text-[#7A7269]"><Filter className="h-2.5 w-2.5" /></span>
                        <span className="flex min-w-0 flex-1 flex-col"><span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8C847A]">Venues</span><span className="mt-0.5 truncate text-[11px] font-semibold text-[#1A1615]">{selectedVenue}</span></span>
                        <ChevronDown className={`h-3 w-3 shrink-0 text-[#8C847A] transition-transform ${openDropdown === 'venue' ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === 'venue' && <div className="absolute left-0 top-full z-20 mt-1 w-full min-w-[160px] rounded-lg border border-[#E7E0D8] bg-white p-1.5 text-left shadow-lg"><div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#9E782F]">Choose venue</div>{['All Venues (3)', 'Downtown Flagship', 'Roastery Reserve', 'Northside Pop-up'].map((venue) => <button key={venue} type="button" onClick={() => { setSelectedVenue(venue); setOpenDropdown(null); }} className={`block w-full rounded-md px-2 py-2 text-left text-[11px] hover:bg-[#FAF5EC] ${selectedVenue === venue ? 'font-semibold text-[#9E782F]' : 'text-[#4F4842]'}`}>{venue}</button>)}</div>}
                    </div>

                    <div className="inline-flex min-w-[160px] flex-1 items-center gap-2 rounded-[9px] border border-[#E7E1D8] bg-[#F4F0EA] px-2.5 py-1.5 shadow-[0_2px_8px_rgba(25,20,18,0.02)]">
                      <BarChart3 className="h-3 w-3 text-[#9E782F]" />
                      <span className="flex flex-col text-[9px] font-bold uppercase leading-3 tracking-[0.12em] text-[#1A1615]"><span className="text-[#8C847A]">Cohort benchmark</span><span className="inline-flex items-center gap-1 text-[#1A1615]"><span>VIP vs</span><span>New Guests</span></span></span>
                    </div>

                    <button type="button" onClick={exportDossier} className="inline-flex min-w-[150px] flex-1 items-center justify-center gap-1.5 rounded-[9px] bg-gradient-to-b from-[#D4A753] to-[#9E782F] px-2.5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_3px_10px_rgba(158,120,47,0.2)] transition hover:opacity-95">
                      <Download className="h-3 w-3" />
                      {exported ? 'Dossier Ready' : 'Export CSV / PDF Dossier'}
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <section className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
              {kpiCards.map(({ label, value, detail, note, accent, tone }) => (
                <div
                  key={label}
                  className="h-[162px] rounded-xl border border-[#EAE6E1] bg-white p-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="max-w-[150px] text-xs font-medium leading-[1.35] text-[#7C746C]">{label}</span>
                    {label.includes('Retention') && <span className="rounded-full border border-[#BDE8D4] bg-[#F0FBF5] px-2 py-1 text-[10px] font-bold uppercase leading-none text-[#0D7A53]">Top<br />Decile</span>}
                    {label.includes('VIP') && <span className="rounded-full border border-[#F0D98A] bg-[#FFF9E7] px-2 py-1 text-[10px] font-bold uppercase leading-none text-[#A16D1F]">+14.5%<br />MOM</span>}
                    {label.includes('Velocity') && <span className="rounded-full border border-[#BDE8D4] bg-[#F0FBF5] px-2 py-1 text-[10px] font-bold uppercase text-[#0D7A53]">-2.1 DAYS</span>}
                    {label.includes('Churn') && <span className="rounded-full border border-[#BDE8D4] bg-[#F0FBF5] px-2 py-1 text-[10px] font-bold uppercase text-[#0D7A53]">LOW RISK</span>}
                  </div>

                  <div className="mt-2 flex items-end justify-between gap-2">
                    <div className="flex items-end gap-1 text-3xl font-bold leading-none tracking-tight text-[#1A1615]">
                      {value}
                      {label.includes('VIP') && <span className="mb-0.5 text-[10px] font-medium tracking-normal text-[#6E6A66]">/ member</span>}
                    </div>
                    {label.includes('Retention') && <span className="text-[11px] font-bold text-[#0D7A53]">+6.2%</span>}
                    {label.includes('Velocity') && <span className="text-[11px] font-bold leading-4 text-[#0D7A53]">Faster<br />Turn</span>}
                    {label.includes('Churn') && <span className="text-[11px] font-bold text-[#0D7A53]">-1.8%</span>}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#EAE3D9] pt-3 text-[11px] text-[#6E6A66]">
                    {label.includes('Churn') ? (
                      <span className="flex items-start gap-1.5 leading-3 text-[9px] text-[#6E6A66]"><span className="text-[12px] text-[#D4A753]">⚡</span><span>18 dormant guests re-engaged<br />via Flash Perk</span></span>
                    ) : (
                      <span>{detail}</span>
                    )}
                    {!label.includes('Churn') && <span className="shrink-0 font-bold text-[11px] text-[#9E782F]">{note}</span>}
                  </div>
                  {label.includes('Retention') && (
                    <div className="mt-1 flex items-end justify-between gap-2">
                      <div className="text-[10px] font-semibold text-[#1A1615]">58.4%</div>
                      <svg viewBox="0 0 90 20" className="h-5 w-24" aria-hidden="true">
                        <polyline points="1,17 15,14 29,14 43,9 56,11 71,5 89,1" fill="none" stroke="#9E782F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="89" cy="1" r="2.2" fill="#9E782F" />
                      </svg>
                    </div>
                  )}
                  {!label.includes('Churn') && !label.includes('Retention') && <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EEE9E2]"><div className={`h-full rounded-full ${accent}`} style={{ width: label.includes('VIP') ? '88%' : '82%' }} /></div>}
                </div>
              ))}
            </section>

            <div className="mt-4 grid gap-3 xl:grid-cols-[1.75fr_0.9fr]">
              <main className="space-y-3">
                <section className="overflow-hidden rounded-[9px] border border-[#E9E2D8] bg-white p-2.5 shadow-[0_5px_16px_rgba(29,24,18,0.02)] sm:p-3">
                  <div className="mb-2 flex flex-col gap-2 border-b border-[#EAE3D9] pb-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-[1.075rem] font-bold tracking-[-0.04em] text-[#1A1615]">Weekly Retention Cohort Heatmap <span className="text-[10px] text-[#8C847A]">(i)</span></h2>
                      <p className="mt-0.5 max-w-[230px] text-[9px] leading-3 text-[#8C847A]">Observed customer return scans over a 12-week longitudinal duration.</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 rounded-[5px] bg-[#FAF8F5] px-1.5 py-1 text-[6px] font-semibold text-[#6E6A66]">
                      <span className="text-[6px] uppercase text-[#8C847A]">Retention:</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-gradient-to-r from-[#D4A753] to-[#9E782F]" /> &gt;70%</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#D4A753]/55" /> 50-70%</span>
                      <span className="inline-flex items-center gap-1 text-[#A39B91]"><span className="h-2 w-2 rounded-sm bg-[#EEEAE4]" /> &lt;50%</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-separate border-spacing-y-0.5 text-left text-[11px]">
                      <thead>
                        <tr className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8C847A]">
                          <th className="w-[24%] px-2 py-1 font-bold">Cohort</th>
                          <th className="w-[10%] px-1 py-1 font-bold">Size</th>
                          <th className="px-1 py-1 text-center">W0</th>
                          <th className="px-1 py-1 text-center">W1</th>
                          <th className="px-1 py-1 text-center">W2</th>
                          <th className="px-1 py-1 text-center">W3</th>
                          <th className="px-1 py-1 text-center">W4</th>
                          <th className="px-1 py-1 text-center">W5</th>
                          <th className="px-1 py-1 text-center">W6</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RETENTION_COHORT_DATA.map((row) => (
                          <tr key={row.cohort} className="rounded-xl bg-[#FAF8F5]">
                            <td className="rounded-l-xl px-2 py-1 font-semibold text-[#1A1615]">{row.cohort}</td>
                            <td className="px-1 py-1 font-mono text-[#6E6A66]">{row.members.toLocaleString()}</td>
                            {[100, row.m1, row.m2, row.m3, row.m4, row.m5, row.m6].map((value, index) => (
                              <td key={`${row.cohort}-${index}`} className="px-0.5 py-0.5">
                                <div className={`flex h-6 items-center justify-center rounded-[3px] px-0.5 font-mono text-[10px] ${getHeatmapColor(value)}`}>
                                  {value ? `${value}%` : '—'}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-2 flex min-h-[34px] items-start gap-2 rounded-[6px] border border-[#EAE3D9] bg-[#FAF8F5] px-2.5 py-2 text-[12px] leading-4 text-[#6E6A66]">
                    <span className="mt-0.5 shrink-0 text-[12px] font-bold text-[#B78A2B]">*</span>
                    <p className="min-w-0 font-bold"><strong className="text-[#1A1615]">Cohort Health Insight:</strong> The introduction of the <strong className="font-bold text-[#9E782F]">Tahini Cruffin pairing perk</strong> on Oct 7 accelerated Week-1 return velocity by <strong className="font-bold text-[#9E782F]">+4.8%</strong> over the autumn baseline.</p>
                  </div>
                </section>

                <section className="rounded-[12px] border border-[#E9E2D8] bg-white p-3 shadow-[0_5px_16px_rgba(29,24,18,0.02)] sm:p-4">
                  <div className="mb-3 flex flex-col gap-2 border-b border-[#EAE3D9] pb-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-[1rem] font-extrabold tracking-[-0.04em] text-[#1A1615]">Cumulative Revenue &amp; LTV Trajectory by Member Tier</h2>
                      <p className="mt-0.5 text-[9px] text-[#8C847A]">12-Month Longitudinal Value Growth across guest classifications.</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="flex h-[48px] w-[82px] flex-col items-center justify-center rounded-[9px] border border-[#EAE3D9] bg-[#FAF8F5] text-center text-[8px] font-bold uppercase leading-3 text-[#8C847A]">Payback<br />Period<b className="mt-0.5 text-[12px] leading-3 text-[#1A1615]">18 Days</b></span>
                      <span className="flex h-[48px] w-[82px] flex-col items-center justify-center rounded-[9px] border border-[#BDE8D4] bg-[#F0FBF5] text-center text-[8px] font-bold uppercase leading-3 text-[#8C847A]">Tier<br />Conversion<b className="mt-0.5 text-[12px] leading-3 text-[#0D7A53]">28.4%</b></span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[10px] border border-[#F0E9E2] bg-[#FCFAF8] p-1">
                    {renderLine(revenueSeries, '#9E782F', '#D4A753')}
                  </div>

                  <div className="mt-2 grid gap-2 sm:grid-cols-4">
                    {[
                      { name: 'Obsidian VIP', value: '$1,480.00', color: 'bg-[#9E782F]' },
                      { name: 'Black Tier', value: '$820.00', color: 'bg-[#B29E8F]' },
                      { name: 'Prime Member', value: '$410.00', color: 'bg-[#1A1615]' },
                      { name: 'Guest Scan', value: '$95.00', color: 'bg-[#D8C7A2]' },
                    ].map((item) => (
                      <div key={item.name} className="rounded-[7px] border border-[#EAE3D9] bg-[#FAF8F5] p-2">
                        <div className="mb-1 flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${item.color}`} />
                          <span className="text-[11px] font-semibold text-[#1A1615]">{item.name}</span>
                        </div>
                        <div className="font-bold tracking-[-0.04em] text-[#1A1615]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </main>

              <aside className="flex flex-col gap-3">
                <section className="order-3 rounded-[12px] border border-[#EAE1D6] bg-white p-3 shadow-[0_4px_10px_rgba(29,24,18,0.02)] sm:p-4">
                  <div className="mb-3 flex items-center justify-between border-b border-[#EAE3D9] pb-2">
                    <div>
                      <h3 className="text-[0.9rem] font-bold uppercase tracking-[-0.02em] text-[#1A1615]">Footfall Experience Heatmap</h3>
                    </div>
                    <span className="rounded-[5px] border border-[#EAE3D9] bg-[#FAF8F5] px-1.5 py-1 text-center text-[6px] font-bold uppercase text-[#6E6A66]">Live<br />Flow</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="rounded-[7px] border border-[#EAE3D9] bg-[#FBF9F6] p-2">
                      <div className="text-[8px] font-bold uppercase text-[#8C847A]">Morning Rush</div>
                      <div className="mt-1 font-bold text-[#1A1615]">7:30 - 10:00 AM</div>
                      <div className="mt-1 text-[9px] text-[#9E782F]">⚡ Espresso Batch</div>
                    </div>
                    <div className="rounded-[7px] border border-[#EAE3D9] bg-[#FBF9F6] p-2">
                      <div className="text-[8px] font-bold uppercase text-[#8C847A]">Salon Tasting</div>
                      <div className="mt-1 font-bold text-[#1A1615]">2:00 - 4:30 PM</div>
                      <div className="mt-1 text-[9px] text-[#9E782F]">♥ VIP Pour-Overs</div>
                    </div>
                  </div>
                </section>

                <section className="order-1 rounded-[12px] border border-[#EAE1D6] bg-white p-3 font-bold shadow-[0_4px_10px_rgba(29,24,18,0.02)] sm:p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-[0.95rem] font-bold uppercase tracking-[-0.02em] text-[#1A1615]">Tier Velocity Funnel</h3>
                    </div>
                    <span className="text-[7px] font-bold uppercase tracking-[0.08em] text-[#8C847A]">Full lifecycle</span>
                  </div>

                  <div className="space-y-2">
                    {funnelStages.map((stage, index) => (
                      <div key={stage.label} className={`rounded-[8px] border px-2.5 py-2 ${index === 1 ? 'ml-1.5' : index === 2 ? 'ml-3' : index === 3 ? 'ml-5' : ''} ${stage.label === 'Obsidian VIP' ? 'border-[#E4D3A5] bg-[#FBF5E8]' : 'border-[#EAE3D9] bg-[#FBF9F6]'}`}>
                        <div className="flex items-center justify-between gap-2 text-[11px] text-[#1A1615]">
                          <span className="font-semibold">{stage.label === 'Obsidian VIP' && <span className="mr-1 text-[#9E782F]">✿</span>}{stage.label}</span>
                          <span className="font-bold text-[#9E782F]">{stage.value}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E9E3DC]">
                          <div className={`h-full rounded-full ${stage.accent}`} style={{ width: `${stage.percent}%` }} />
                        </div>
                        <div className="mt-1 text-[10px] text-[#8C847A]">{stage.detail}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mx-0.5 mt-3 min-h-[50px] rounded-[8px] border border-[#EAE3D9] bg-[#FAF8F5] px-2.5 py-2 text-[12px] leading-[1.25] text-[#6E6A66]">
                    <span className="mr-1 align-top text-[13px] text-[#D4A753]">⚡</span><strong className="text-[#1A1615]">Velocity Lever:</strong> Double-stamp happy hours on Thursdays accelerate <strong className="text-[#9E782F]">Black -&gt; Obsidian</strong> migration by 2.3x.
                  </div>
                </section>

                <section className="order-2 rounded-[12px] border border-[#EAE1D6] bg-white p-3 shadow-[0_4px_10px_rgba(29,24,18,0.02)] sm:p-4">
                  <div className="mb-3 flex items-center justify-between border-b border-[#EAE3D9] pb-2">
                    <h3 className="text-[1rem] font-extrabold uppercase tracking-[-0.02em] text-[#1A1615]">Menu Items Driving Retention</h3>
                    <span className="text-[9px] font-bold text-[#8C847A]">↗</span>
                  </div>

                  <div className="space-y-1.5">
                    {menuItems.map((item, index) => (
                      <div key={item.name} className="flex items-center gap-2 rounded-[7px] border border-[#EAE3D9] bg-[#FBF9F6] p-1.5 shadow-[0_2px_7px_rgba(29,24,18,0.03)]">
                        <img src={item.image} alt="" className="h-8 w-8 shrink-0 rounded-[5px] object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[11px] font-extrabold text-[#1A1615]">{item.name}</div>
                          <div className="mt-0.5 text-[10px] text-[#8C847A]">Signature bakery · {index + 2} stamps logged</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] font-bold text-[#0D7A53]">{item.rate}</div>
                          <div className="text-[9px] font-bold text-[#0D7A53]">Return</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </aside>
            </div>

            <footer className="mt-3 flex flex-col gap-2 border-t border-[#E8E1D8] py-2 text-[8px] text-[#8C847A] sm:flex-row sm:items-center sm:justify-between">
              <span>Revia Merchant Intelligence Engine • Confidential Roastery Telemetry</span>
              <span>Retention Model Methodology <span className="px-1 text-[#C8BFB4]">•</span> Privacy &amp; Pseudonymization Log</span>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};