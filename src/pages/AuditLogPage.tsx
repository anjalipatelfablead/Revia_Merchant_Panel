import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Radio,
  Key,
  Download,
  CheckCircle2,
  Cpu,
  Search,
  SlidersHorizontal,
  RefreshCw,
  ChevronDown,
  CircleCheck,
  Activity,
  AlertTriangle,
  Clock3,
  Wifi,
  Webhook,
  Server
} from 'lucide-react';
import { AuditLogEntry } from '../types';
import { CustomerTypeSettings } from './CustomerTypeSettings';
import { MerchantPlatformSettings } from './MerchantPlatformSettings';

interface AuditLogPageProps {
  logs: AuditLogEntry[];
}

const MobileAuditView: React.FC<{ logs: AuditLogEntry[] }> = ({ logs }) => {
  const verifiedLogs = logs.filter((log) => log.cryptoState !== 'FLAGGED');
  const flaggedLogs = logs.filter((log) => log.cryptoState === 'FLAGGED');
  const mobileEventOverrides = [
    { name: 'Elena Vance', role: 'Admin', timestamp: '2m ago', target: 'Owner · Downtown Flagship', action: 'CRM Customer Directory Export (.csv)', ip: '1,420 Guest records encrypted' },
    { name: 'Terminal POS-01', role: 'System', timestamp: '18m ago', target: 'Automated Ledger Mesh Node', action: 'Fast Stamp Ledger Sync', ip: '+14 loyalty stamps reconciled' },
    { name: 'Security Daemon', role: 'ALERT', timestamp: '1h ago', target: 'Cloudflare WAF Ingress', action: 'Blocked unauthorized IP access attempt', ip: '198.51.100.42 (Rate-limit)' },
    { name: 'Marcus Vance', role: 'Shift Lead', timestamp: '3h ago', target: 'Roastery Reserve Register 02', action: 'PIN Authentication Override', ip: 'Session token extended 4h' },
  ];
  const visibleLogs = [verifiedLogs[0], verifiedLogs[1], flaggedLogs[0], verifiedLogs[2]]
    .filter((log): log is AuditLogEntry => Boolean(log))
    .map((log, index) => ({
      ...log,
      timestamp: mobileEventOverrides[index].timestamp,
      actor: { ...log.actor, name: mobileEventOverrides[index].name, role: mobileEventOverrides[index].role },
      target: mobileEventOverrides[index].target,
      action: mobileEventOverrides[index].action,
      ip: mobileEventOverrides[index].ip,
    }));

  return (
    <div className="min-h-screen bg-[#FBF8F4] px-5 pb-6 pt-3 text-[#211C19]">
      <div className="mx-auto w-full max-w-[430px]">

        <section className="mt-3 rounded-[13px] bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)]"><div className="flex items-center gap-2 text-[19px] font-bold"><ShieldCheck className="h-4 w-4 text-[#8B681F]" />Security &amp; Audit Log</div><div className="my-3 h-px bg-[#E9E0D7]" /><div className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 text-[11px]"><span className="flex gap-1.5"><span>▤</span>Downtown<br />Flagship</span><span className="border-l border-[#E9E0D7] pl-3 text-[#756D65]">Mesh ID: REV-<br />8402</span><b className="text-[#8B681F]">99.98%<br />Uptime</b></div></section>

        <nav className="scrollbar-hide mt-5 flex gap-2 overflow-x-auto pb-1"><button type="button" className="shrink-0 rounded-[7px] bg-[#C99B42] px-3 py-2 text-[12px] font-semibold text-white shadow-sm"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" />Audit Log</button><button type="button" className="shrink-0 rounded-[7px] border border-[#E1D9D0] bg-[#F3EFEA] px-3 py-2 text-[12px] font-semibold text-[#4F4842]"><Cpu className="mr-1 inline h-3.5 w-3.5" />POS Mesh Fleet</button><button type="button" className="shrink-0 rounded-[7px] border border-[#E1D9D0] bg-[#F3EFEA] px-3 py-2 text-[12px] font-semibold text-[#4F4842]"><Webhook className="mr-1 inline h-3.5 w-3.5" />API &amp; Webhooks</button></nav>

        <section className="mt-5 grid grid-cols-2 gap-3">
          {[
            { label: 'Compliance', value: 'SOC-2 Type II', detail: 'Enforced · 0 breaches', Icon: ShieldCheck, tone: 'text-[#087B55]' },
            { label: 'POS Mesh', value: '6 / 6 Online', detail: '18ms avg peer ping', Icon: Radio, tone: 'text-[#087B55]' },
            { label: 'API Volume', value: '48,219', detail: '0 failed HMAC sigs', Icon: Activity, tone: 'text-[#087B55]' },
            { label: 'Crypto Ledger', value: '142 Events', detail: 'SHA-256 Validated', Icon: Key, tone: 'text-[#8B681F]' },
          ].map(({ label, value, detail, Icon, tone }) => <div key={label} className="h-[116px] rounded-xl border border-[#EAE6E1] bg-white p-3 shadow-2xs"><div className="flex items-center justify-between text-[10px] font-medium text-[#7C746C]"><span>{label}</span><span className="rounded-[7px] bg-[#FCF1DF] p-1.5"><Icon className={`h-4 w-4 ${tone}`} /></span></div><div className="mt-2 text-xl font-bold leading-none tracking-tight">{value}</div><div className={`mt-2 text-[10px] font-medium leading-tight ${tone}`}>{label === 'Compliance' && '◉ '}{label === 'POS Mesh' && '• '}{detail}</div></div>)}
        </section>

        <div className="mt-5 flex min-h-[62px] items-center gap-2 rounded-xl bg-[#211C19] px-4 py-3 font-mono text-[10px] text-[#B6AFA8]"><span className="h-2 w-2 shrink-0 rounded-full bg-[#20C99A]" /><span className="shrink-0">WITNESS BLOCK #892,104:</span><b className="min-w-0 truncate text-[#20C99A]">sha:7b91e...4f9c</b><span className="ml-auto shrink-0 rounded border border-[#6D5730] px-1.5 py-1 text-[8px] text-[#C99B42]">SEALED</span></div>

        <section className="mt-5 rounded-xl border border-[#EAE6E1] bg-white p-4 shadow-2xs"><div className="flex items-start justify-between"><h2 className="flex items-start gap-2 text-[19px] font-bold leading-none"><Cpu className="mt-1 h-4 w-4 shrink-0 text-[#8B681F]" /><span>Active Hardware<br />Mesh</span></h2><span className="rounded-full bg-[#F2EEE9] px-3 py-1 text-[11px] leading-tight text-[#756D65]">Auto-Ping<br />30s</span></div><div className="mt-4 space-y-2"><div className="flex min-h-[94px] items-center gap-3 rounded-[10px] bg-[#F3EFEA] p-3"><span className="rounded-[7px] bg-white p-2 text-[#8B681F]"><Cpu className="h-4 w-4" /></span><div className="min-w-0 flex-1 text-[12px]"><b className="block whitespace-nowrap">Downtown Counter 01</b><div className="text-[10px] leading-relaxed text-[#756D65]">RevOS v4.2.1 ·<br />192.168.1.104</div></div><span className="shrink-0 text-right text-[10px] text-[#087B55]">• Online<br /><span className="text-[#756D65]">12ms latency</span></span></div><div className="flex min-h-[94px] items-center gap-3 rounded-[10px] bg-[#F3EFEA] p-3"><span className="rounded-[7px] bg-white p-2 text-[#8B681F]"><Server className="h-4 w-4" /></span><div className="min-w-0 flex-1 text-[12px]"><b className="block whitespace-nowrap">Roastery Reserve Bar 02</b><div className="text-[10px] leading-relaxed text-[#756D65]">RevOS v4.2.0 ·<br />192.168.2.88</div></div><span className="shrink-0 text-right text-[10px] text-[#087B55]">• Online<br /><span className="text-[#756D65]">18ms latency</span></span></div></div><button type="button" className="mt-3 w-full rounded-[10px] border border-[#E1D9D0] bg-[#F3EFEA] py-2.5 text-[12px] font-semibold"><Radio className="mr-1 inline h-4 w-4 text-[#8B681F]" />Ping All 6 Terminals</button></section>

        <section className="mt-6"><div className="flex items-center justify-between"><div><h2 className="text-[19px] font-bold">Audit Event Stream</h2><span className="rounded-full bg-[#FFF4DC] px-2 py-1 text-[10px] font-bold text-[#8B681F]">Live SHA-256</span></div><button type="button" aria-label="Filter audit events" className="rounded-[7px] bg-white p-2 shadow-sm"><SlidersHorizontal className="h-4 w-4" /></button></div><label className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#E1D9D0] bg-white px-3 py-2 text-[11px] text-[#8E847B]"><Search className="h-4 w-4" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Filter by operator, IP, or hash key..." /></label><div className="mt-3 space-y-3">{visibleLogs.map((log) => { const flagged = log.cryptoState === 'FLAGGED'; const EventIcon = flagged ? AlertTriangle : log.actor.role === 'Admin' ? Download : log.actor.role === 'System' ? RefreshCw : Key; return <article key={log.id} className={`rounded-[12px] border bg-white p-4 shadow-[0_4px_15px_rgba(60,38,20,0.04)] ${flagged ? 'border-[#FFB6B0] bg-[#FFF8F7]' : 'border-[#E9E0D7]'}`}><div className="flex items-start gap-2"><span className={`rounded-[7px] p-2 ${flagged ? 'bg-[#FFE3E1] text-[#C2413A]' : log.actor.role === 'System' ? 'bg-[#E5F8F0] text-[#0D8B61]' : 'bg-[#FCF1DF] text-[#8B681F]'}`}><EventIcon className="h-4 w-4" /></span><div className="min-w-0 flex-1"><div className={`text-[12px] font-semibold ${flagged ? 'text-[#C2413A]' : ''}`}>{log.actor.name} <span className="ml-1 rounded bg-[#F2EEE9] px-1.5 py-1 text-[9px] text-[#756D65]">{log.actor.role}</span></div><div className="text-[10px] text-[#756D65]">{log.target}</div></div><span className="text-[10px] text-[#756D65]">{log.timestamp}</span></div><div className={`mt-3 rounded-[8px] p-3 text-[12px] ${flagged ? 'border border-[#FFB6B0] bg-white text-[#C2413A]' : 'bg-[#F3EFEA]'}`}><b>{flagged ? 'Blocked unauthorized IP access attempt' : log.action.replaceAll('_', ' ')}</b><div className="mt-1 text-[10px] text-[#756D65]">{flagged ? log.ip : 'Cryptographic witness verified · hash sealed'}</div></div></article>; })}</div></section>

        <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-[11px] bg-gradient-to-r from-[#D4A753] to-[#9E782F] py-3.5 text-[13px] font-bold text-white shadow-[0_5px_12px_rgba(158,120,47,0.2)]"><Download className="h-4 w-4" />Export Immutable Audit Dossier (CSV/PDF)</button><button type="button" className="mt-3 w-full rounded-[11px] border border-[#E1D9D0] bg-white py-3 text-[12px] font-semibold"><Lock className="mr-1 inline h-4 w-4" />Commit &amp; Seal New Policy Hash</button>
      </div>
    </div>
  );
};

const AccessControlSettings: React.FC = () => {
  const [invitingAdmin, setInvitingAdmin] = useState(false);
  const [reviewingPolicies, setReviewingPolicies] = useState(false);

  const identities = [
    { name: 'Elena Rostova', role: 'General Manager', email: 'elena@revia.co', scopes: 'store:owner', status: 'Active' },
    { name: 'Marcus Davis', role: 'Operations Lead', email: 'ops@revia.co', scopes: 'store:operations', status: 'Active' },
    { name: 'Avery Chen', role: 'Finance Reviewer', email: 'finance@revia.co', scopes: 'billing:read', status: 'Pending' },
  ];

  const handleInviteAdmin = () => {
    setInvitingAdmin(true);
    window.setTimeout(() => setInvitingAdmin(false), 700);
  };

  const handleReviewPolicies = () => {
    setReviewingPolicies(true);
    window.setTimeout(() => setReviewingPolicies(false), 700);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E0D8] bg-white shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] bg-[#FAF8F5] px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#B7842C]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1A1615]">Access Control</span>
          </div>
          <h2 className="mt-1 text-[22px] font-bold tracking-tight text-[#1A1615]">Identity & Permission Matrix</h2>
        </div>
        <button type="button" onClick={handleInviteAdmin} className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-3 py-1.5 text-[10px] font-bold text-[#6E6A66]">
          <Lock className="h-3.5 w-3.5 text-[#B7842C]" /> {invitingAdmin ? 'Inviting...' : 'Invite Admin'}
        </button>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-8">
          <div className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#B7842C]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6E6A66]">Role-Based Access Policy</span>
              </div>
              <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">3 ACTIVE</span>
            </div>
          </div>
          {identities.map((person) => (
            <div key={person.name} className="flex items-center justify-between rounded-lg border border-[#E5E0D8] bg-white p-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#F5F1EA] px-3 py-2 text-[#B7842C] font-bold text-[10px]">{person.name.split(' ').map((s) => s[0]).join('')}</span>
                <div>
                  <div className="text-[12px] font-bold text-[#1A1615]">{person.name}</div>
                  <div className="text-[10px] text-[#6E6A66]">{person.role} · {person.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#FAF8F5] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">{person.scopes}</span>
                <span className={`rounded-full px-2 py-1 text-[8px] font-bold ${person.status === 'Pending' ? 'bg-[#FFF4DC] text-[#B7842C]' : 'bg-[#E6F4ED] text-[#0D7A53]'}`}>{person.status}</span>
              </div>
            </div>
          ))}

          <div className="rounded-lg border border-[#E5E0D8] bg-[#FCFBF9] p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#B7842C]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1615]">Access Session Review</span>
              </div>
              <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">Last 24h</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-md border border-[#E5E0D8] bg-white p-2">
                <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-[#9E9A93]">Logins</div>
                <div className="mt-1 text-[13px] font-bold text-[#1A1615]">128</div>
              </div>
              <div className="rounded-md border border-[#E5E0D8] bg-white p-2">
                <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-[#9E9A93]">Invites</div>
                <div className="mt-1 text-[13px] font-bold text-[#1A1615]">04</div>
              </div>
              <div className="rounded-md border border-[#E5E0D8] bg-white p-2">
                <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-[#9E9A93]">Flags</div>
                <div className="mt-1 text-[13px] font-bold text-[#1A1615]">00</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-lg border border-[#E5E0D8] bg-[#FCFBF9] p-4 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#B7842C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1615]">Policy Controls</span>
            </div>
            <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">SOC-2</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="rounded-md border border-[#E5E0D8] bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1A1615]">Manager 2FA</span>
                <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">ENABLED</span>
              </div>
            </div>
            <div className="rounded-md border border-[#E5E0D8] bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1A1615]">IP Restriction</span>
                <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">ON</span>
              </div>
            </div>
            <div className="rounded-md border border-[#E5E0D8] bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#1A1615]">Session Timeout</span>
                <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">15m</span>
              </div>
            </div>
          </div>
          <button type="button" onClick={handleReviewPolicies} className="mt-4 w-full rounded-md border border-[#E5E0D8] bg-white px-3 py-2 text-[10px] font-bold text-[#1A1615]">
            {reviewingPolicies ? 'Reviewing...' : 'Review Access Policies'}
          </button>
        </aside>
      </div>
    </div>
  );
};

const ApiKeysWebhooksSettings: React.FC = () => {
  const [generatingSecret, setGeneratingSecret] = useState(false);
  const [rotatingSigningSecret, setRotatingSigningSecret] = useState(false);

  const handleGenerateApiSecret = () => {
    setGeneratingSecret(true);
    window.setTimeout(() => setGeneratingSecret(false), 700);
  };

  const handleRotateSigningSecret = () => {
    setRotatingSigningSecret(true);
    window.setTimeout(() => setRotatingSigningSecret(false), 700);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E0D8] bg-white shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#E5E0D8] bg-[#FAF8F5] px-3 sm:px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <Webhook className="h-4 w-4 text-[#B7842C]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1A1615]">API Keys & Webhooks</span>
          </div>
          <h2 className="mt-1 text-[22px] font-bold tracking-tight text-[#1A1615]">API Access & Integration</h2>
        </div>
        <button type="button" onClick={handleGenerateApiSecret} className="inline-flex w-full sm:w-auto justify-center items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-3 py-1.5 text-[10px] font-bold text-[#6E6A66]">
          <Key className="h-3.5 w-3.5 text-[#B7842C]" /> {generatingSecret ? 'Generating...' : 'Generate API Secret'}
        </button>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-7">
          <div className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-[#B7842C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6E6A66]">Credential Registry</span>
            </div>
          </div>
          <div className="rounded-lg border border-[#E5E0D8] bg-white p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#1A1615] truncate">Shopify POS Sync</div>
                <div className="text-[10px] text-[#6E6A66] truncate">Production key · Last rotated 2 days ago</div>
              </div>
              <span className="shrink-0 rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">ACTIVE</span>
            </div>
            <div className="mt-3 rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-3 py-2 font-mono text-[10px] text-[#6E6A66] break-all">
              rev_live_994a••••••••••••
            </div>
          </div>
          <div className="rounded-lg border border-[#E5E0D8] bg-white p-3 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#1A1615] truncate">Wallet Push Endpoint</div>
                <div className="text-[10px] text-[#6E6A66] truncate">Apple & Google Wallet webhook</div>
              </div>
              <span className="shrink-0 rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">99.98%</span>
            </div>
            <div className="mt-3 rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-3 py-2 font-mono text-[10px] text-[#6E6A66] break-all">
              https://revia.example.com/webhooks/wallet/push
            </div>
          </div>
        </div>

        <aside className="rounded-lg border border-[#E5E0D8] bg-[#FCFBF9] p-3 sm:p-4 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
            <div className="flex items-center gap-2">
              <Webhook className="h-4 w-4 text-[#B7842C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1615]">Webhook Events</span>
            </div>
            <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">3 ACTIVE</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-3 py-2">
              <span className="text-[10px] font-bold text-[#1A1615]">reward.redemption</span>
              <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">OK</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-3 py-2">
              <span className="text-[10px] font-bold text-[#1A1615]">customer.exported</span>
              <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">OK</span>
            </div>
            <div className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-3 py-2">
              <span className="text-[10px] font-bold text-[#1A1615]">audit.sealed</span>
              <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">IDLE</span>
            </div>
          </div>
          <button type="button" onClick={handleRotateSigningSecret} className="mt-4 w-full rounded-md border border-[#E5E0D8] bg-white px-3 py-2 text-[10px] font-bold text-[#1A1615]">
            {rotatingSigningSecret ? 'Rotating...' : 'Rotate Signing Secret'}
          </button>
        </aside>
      </div>
    </div>
  );
};

const PosHardwareSettings: React.FC = () => {
  const [syncingMesh, setSyncingMesh] = useState(false);
  const [policyReviewing, setPolicyReviewing] = useState(false);

  const hardwareNodes = [
    { name: 'Downtown Counter 01', type: 'iPad Pro 12.9" · Revia Hub', status: 'Online', latency: '4ms', percent: '99.98%' },
    { name: 'Roastery Bar 02', type: 'Square Register · Revia Bridge', status: 'Online', latency: '12ms', percent: '99.96%' },
    { name: 'Northside Pop-up 01', type: 'Mobile Handheld NFC', status: 'Standby', latency: '21ms', percent: '96.70%' },
  ];

  const handleSyncHardwareMesh = () => {
    setSyncingMesh(true);
    window.setTimeout(() => setSyncingMesh(false), 700);
  };

  const handleReviewHardwarePolicy = () => {
    setPolicyReviewing(true);
    window.setTimeout(() => setPolicyReviewing(false), 700);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E0D8] bg-white shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] bg-[#FAF8F5] px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-[#B7842C]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1A1615]">POS & Hardware</span>
          </div>
          <h2 className="mt-1 text-[22px] font-bold tracking-tight text-[#1A1615]">POS Hardware Fleet</h2>
        </div>
        <button type="button" onClick={handleSyncHardwareMesh} className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-3 py-1.5 text-[10px] font-bold text-[#6E6A66]">
          <Radio className="h-3.5 w-3.5 text-[#B7842C]" /> {syncingMesh ? 'Syncing...' : 'Sync Hardware Mesh'}
        </button>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-8">
          <div className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#B7842C]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6E6A66]">Active Terminal Inventory</span>
              </div>
              <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">6 / 6 ONLINE</span>
            </div>
          </div>
          {hardwareNodes.map((node, idx) => (
            <div key={node.name} className="flex items-center justify-between rounded-lg border border-[#E5E0D8] bg-white p-3">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[#F5F1EA] p-2 text-[#B7842C]"><Server className="h-4 w-4" /></span>
                <div>
                  <div className="text-[12px] font-bold text-[#1A1615]">{node.name}</div>
                  <div className="text-[10px] text-[#6E6A66]">{node.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <span className={node.status === 'Standby' ? 'text-[#B7842C]' : 'text-[#0D7A53]'}>{node.status}</span>
                <span className="text-[#6E6A66]">{node.latency}</span>
                <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[#6E6A66]">{node.percent}</span>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-lg border border-[#E5E0D8] bg-[#FCFBF9] p-4 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-[#B7842C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1615]">Mesh Network</span>
            </div>
            <span className="rounded-full bg-[#F5F1EA] px-2 py-1 text-[8px] font-bold text-[#6E6A66]">Auto-Ping 30s</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="rounded-md border border-[#E5E0D8] bg-white p-2">
              <div className="mb-1 text-[10px] font-bold text-[#6E6A66]">Downtown Flagship</div>
              <div className="h-2 rounded bg-[#E5E0D8]">
                <div className="h-2 w-[98%] rounded bg-[#0D7A53]" />
              </div>
            </div>
            <div className="rounded-md border border-[#E5E0D8] bg-white p-2">
              <div className="mb-1 text-[10px] font-bold text-[#6E6A66]">Roastery Reserve</div>
              <div className="h-2 rounded bg-[#E5E0D8]">
                <div className="h-2 w-[90%] rounded bg-[#B7842C]" />
              </div>
            </div>
            <div className="rounded-md border border-[#E5E0D8] bg-white p-2">
              <div className="mb-1 text-[10px] font-bold text-[#6E6A66]">Northside Market</div>
              <div className="h-2 rounded bg-[#E5E0D8]">
                <div className="h-2 w-[78%] rounded bg-[#C08B31]" />
              </div>
            </div>
          </div>
          <button type="button" onClick={handleReviewHardwarePolicy} className="mt-4 w-full rounded-md border border-[#E5E0D8] bg-white px-3 py-2 text-[10px] font-bold text-[#1A1615]">
            {policyReviewing ? 'Reviewing...' : 'Review Hardware Policy'}
          </button>
        </aside>
      </div>
    </div>
  );
};

export const AuditLogPage: React.FC<AuditLogPageProps> = ({ logs }) => {
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'customer_tiers' | 'general_brand' | 'pos_hardware' | 'api_keys_webhooks' | 'access_control'>('audit');

  // Security Policy Toggles
  const [enforceMfa, setEnforceMfa] = useState<boolean>(true);
  const [autoSessionTimeout, setAutoSessionTimeout] = useState<boolean>(true);
  const [enforceFleetTls, setEnforceFleetTls] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [eventType, setEventType] = useState<string>('All Event Types');
  const [branchFilter, setBranchFilter] = useState<string>('All Branches');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const eventTypes = Array.from(new Set(logs.map((log) => log.action))).sort();
  const branchOptions = ['All Branches', 'Downtown', 'Roastery', 'Northside'];
  const filteredLogs = logs.filter((log) => {
    const searchText = `${log.actor.name} ${log.actor.role} ${log.action} ${log.target} ${log.terminal} ${log.ip} ${log.hash}`.toLowerCase();
    const matchesSearch = searchText.includes(searchQuery.toLowerCase().trim());
    const matchesType = eventType === 'All Event Types' || log.action === eventType;
    const matchesBranch = branchFilter === 'All Branches' || searchText.includes(branchFilter.toLowerCase());
    return matchesSearch && matchesType && matchesBranch;
  });
  const flaggedLogs = filteredLogs.filter((log) => log.cryptoState === 'FLAGGED');
  const regularLogs = filteredLogs.filter((log) => log.cryptoState !== 'FLAGGED');
  const referenceLogs = regularLogs.filter((log) =>
    log.action === 'POS_HEARTBEAT_RECONNECT' || log.action === 'CUSTOMER_EXPORT_REQUESTED'
  );
  const remainingLogs = regularLogs.filter((log) => !referenceLogs.includes(log));
  const orderedLogs = [
    ...remainingLogs.slice(0, 2),
    ...flaggedLogs,
    ...referenceLogs,
    ...remainingLogs.slice(2),
  ];
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(orderedLogs.length / pageSize));
  const paginatedLogs = orderedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const successLogId = orderedLogs[1]?.id;
  const firstVisibleEntry = orderedLogs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastVisibleEntry = Math.min(currentPage * pageSize, orderedLogs.length);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    setSelectedHash(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setEventType('All Event Types');
    setBranchFilter('All Branches');
    setCurrentPage(1);
  };

  const refreshLogs = () => {
    setRefreshing(true);
    setCurrentPage(1);
    window.setTimeout(() => setRefreshing(false), 900);
  };

  const exportAuditDossier = () => {
    const rows = [
      ['Timestamp EST', 'Actor', 'Role', 'Action', 'Target', 'Terminal', 'IP', 'Hash', 'Crypto State'],
      ...logs.map((log) => [
        log.timestamp,
        log.actor.name,
        log.actor.role,
        log.action,
        log.target,
        log.terminal,
        log.ip,
        log.hash,
        log.cryptoState,
      ]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(','))
      .join('\n');

    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revia-audit-immutable-dossier.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="space-y-3 p-2 sm:py-4 sm:pl-4 sm:pr-1">
          {/*
      <div className="flex items-center justify-between gap-2 px-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#9E9A93]">
        <div className="flex min-w-0 items-center gap-2 truncate">
          <span>Home</span>
          <span>/</span>
          <span>Insights & Config</span>
          <span>/</span>
          <span className="text-[#1A1615]">Settings & Security Audit</span>
        </div>
        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-2.5 py-1 text-[8px] normal-case tracking-normal text-[#6E6A66] sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0D7A53]" />
          SOC-2 SHA-256 Ledger Synchronized
          <span className="rounded bg-[#F5F1EA] px-1.5 py-0.5 font-mono text-[#9E9A93]">Block #392,104</span>
        </div>
      </div>
      */}

          {/* Settings header and section navigation */}
          <header className="rounded-xl bg-[#FCFBF9] px-2 pt-2 sm:px-3 sm:pt-2.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {/* <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#E6D4A8] bg-[#FFF8E8] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#8B681F]">
                    Governance & Zero-Trust
                  </span>
                  <span className="text-[8px] text-[#A09A91]">• Revision v2.14r4</span>
                </div> */}
                <h1 className="mt-0.5 text-2xl sm:text-[28px] font-bold tracking-tight text-[#1A1615]">
                  Merchant Settings & Security Audit Log
                </h1>
              </div>

              <button
                onClick={exportAuditDossier}
                className="inline-flex w-fit items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#1A1615] shadow-2xs transition-colors hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A753]/40"
              >
                <Download className="h-3.5 w-3.5 text-[#9E782F]" />
                Export Immutable Dossier (CSV/PDF)
              </button>
            </div>

            <nav aria-label="Settings sections" className="-mx-1 mt-[17px] overflow-x-auto rounded-lg border border-[#E5E0D8] bg-white p-1 sm:-mx-2">
              <div className="flex min-w-full items-center gap-0.5">
                <button
                  onClick={() => setActiveTab('general_brand')}
                  className={`min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[10px] sm:text-[11px] ${activeTab === 'general_brand' ? 'bg-[#C99B42] font-bold text-white shadow-sm' : 'font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]'}`}
                  type="button"
                >
                  General & Brand
                </button>
                <button
                  className={`min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[10px] sm:text-[11px] ${activeTab === 'pos_hardware' ? 'bg-[#C99B42] font-bold text-white shadow-sm' : 'font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]'}`}
                  type="button"
                  onClick={() => setActiveTab('pos_hardware')}
                >
                  POS & Hardware
                </button>
                <button
                  className={`min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[10px] sm:text-[11px] ${activeTab === 'api_keys_webhooks' ? 'bg-[#C99B42] font-bold text-white shadow-sm' : 'font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]'}`}
                  type="button"
                  onClick={() => setActiveTab('api_keys_webhooks')}
                >
                  API Keys & Webhooks
                </button>
                <button
                  onClick={() => setActiveTab('audit')}
                  className={`min-w-max flex-1 rounded-md px-3 py-1.5 text-[10px] sm:text-[11px] ${activeTab === 'audit' ? 'bg-[#C99B42] font-bold text-white shadow-sm' : 'font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]'}`}
                  type="button"
                >
                  Security & SOC-2 Audit Stream
                </button>
                <button
                  onClick={() => setActiveTab('customer_tiers')}
                  className={`min-w-max flex-1 rounded-md px-3 py-1.5 text-[10px] sm:text-[11px] ${activeTab === 'customer_tiers' ? 'bg-[#C99B42] font-bold text-white shadow-sm' : 'font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]'}`}
                  type="button"
                >
                  Customer Tiers
                </button>
                <button
                  className={`min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[10px] sm:text-[11px] ${activeTab === 'access_control' ? 'bg-[#C99B42] font-bold text-white shadow-sm' : 'font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]'}`}
                  type="button"
                  onClick={() => setActiveTab('access_control')}
                >
                  Access Control
                </button>
              </div>
            </nav>
          </header>

          {activeTab === 'access_control' ? (
            <AccessControlSettings />
          ) : activeTab === 'api_keys_webhooks' ? (
            <ApiKeysWebhooksSettings />
          ) : activeTab === 'pos_hardware' ? (
            <PosHardwareSettings />
          ) : activeTab === 'audit' ? (
            <>
              {/* Governance summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#0D7A53]" /> Compliance Posture</div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#E6F4ED] text-[#0D7A53] rounded">
                      Enforced
                    </span>
                  </div>
                  <div className="text-[26px] font-bold text-[#1A1615] mb-1">SOC-2 Type II</div>
                  <div className="text-[11px] font-semibold text-[#6E6A66]">Audit compliance sealed & certified valid</div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#0D7A53]"><CircleCheck className="h-3.5 w-3.5" /> Zero policy breaches (365 days)</div>
                </div>

                <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] flex items-center gap-1"><Radio className="h-3.5 w-3.5 text-[#0D7A53] animate-pulse" /> Connected Terminals</div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FDF8EB] text-[#9E782F] rounded">
                      All Online
                    </span>
                  </div>
                  <div className="text-[26px] font-bold text-[#1A1615] mb-1">6 / 6 <span className="text-[14px] font-medium text-[#6E6A66]">Terminals</span></div>
                  <div className="text-[11px] font-semibold text-[#6E6A66]">Downtown • Roastery • Northside</div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#0D7A53]"><Activity className="h-3.5 w-3.5" /> 100% Mesh Health</div>
                </div>

                <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-[#C08B31]" /> Audit Events (24h)</div>
                  </div>
                  <div className="text-[26px] font-bold text-[#1A1615] mb-1">48,219</div>
                  <div className="text-[11px] font-semibold text-[#6E6A66]">Configuration and access events recorded</div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#0D7A53]"><CircleCheck className="h-3.5 w-3.5" /> 0 failed auth signatures</div>
                </div>

                <div className="bg-white rounded-xl border border-[#EAE6E1] p-5 shadow-2xs transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#9E9A93] flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-[#8B681F]" /> Cryptographic Ledger</div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#FDF8EB] text-[#9E782F] rounded">
                      SHA-256
                    </span>
                  </div>
                  <div className="text-[26px] font-bold text-[#1A1615] mb-1">142 Events</div>
                  <div className="text-[11px] font-semibold text-[#6E6A66]">Stream rate: ~12.4 actions / hr</div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#9E782F]"><Lock className="h-3.5 w-3.5" /> Immutable Block State Valid</div>
                </div>
              </div>

              {/* Main Grid: Immutable Audit Trail Table (Left 8 cols) + Right Security Policy Sidebar (4 cols) */}
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
                {/* Immutable Audit Trail Table */}
                <div className="lg:col-span-8 overflow-hidden rounded-lg border border-[#E5E0D8] bg-white shadow-xs">
                  <div className="border-b border-[#E5E0D8] bg-[#FAF8F5]/60 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Key className="h-3.5 w-3.5 text-[#B7842C]" />
                          <h3 className="text-[13px] font-bold text-[#1A1615]">Immutable Audit Trail</h3>
                        </div>
                        <p className="mt-1 max-w-[430px] text-[10px] leading-snug text-[#9E9A93]">
                          Cryptographically chained ledger recording all store administration,<br className="hidden sm:block" /> loyalty redemptions, and hardware handshakes.
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]"><SlidersHorizontal className="h-3 w-3" /> Clear Filters</button>
                        <button type="button" onClick={refreshLogs} className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]"><RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} /> {refreshing ? 'Refreshing...' : 'Live Refresh'}</button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-[minmax(0,1.7fr)_1fr_1fr_auto]">
                      <label className="flex items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] text-[#9E9A93]">
                        <Search className="h-3 w-3 shrink-0" />
                        <input aria-label="Filter audit log" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} placeholder="Filter by actor, IP, hash, or action" className="min-w-0 flex-1 bg-transparent text-[10px] text-[#1A1615] outline-none placeholder:text-[#B8B1A7]" />
                      </label>
                      <label className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-left text-[9px] font-semibold text-[#6E6A66]"> <select value={eventType} onChange={(event) => { setEventType(event.target.value); setCurrentPage(1); }} className="w-full appearance-none bg-transparent outline-none"><option>All Event Types</option>{eventTypes.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}</select><ChevronDown className="h-3 w-3 shrink-0 text-[#9E9A93]" /></label>
                      <label className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-left text-[9px] font-semibold text-[#6E6A66]"> <select value={branchFilter} onChange={(event) => { setBranchFilter(event.target.value); setCurrentPage(1); }} className="w-full appearance-none bg-transparent outline-none"><option>All Branches</option>{branchOptions.slice(1).map((branch) => <option key={branch}>{branch}</option>)}</select><ChevronDown className="h-3 w-3 shrink-0 text-[#9E9A93]" /></label>
                      <button type="button" className="rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]">Today, 2.4</button>
                    </div>
                  </div>
                  <div className="divide-y divide-[#E5E0D8] sm:hidden">
                    {paginatedLogs.map((log, index) => {
                      const isFlagged = log.cryptoState === 'FLAGGED';
                      const statusLabel = log.id === successLogId && !isFlagged ? 'SUCCESS' : isFlagged ? 'CRITICAL' : 'VERIFIED';
                      return (
                        <button
                          key={`mobile-${log.id}`}
                          type="button"
                          onClick={() => setSelectedHash(log.hash)}
                          className={`block w-full p-3 text-left transition-colors ${isFlagged ? 'bg-[#FFF7F6]' : 'bg-white hover:bg-[#FAF8F5]'}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <img src={log.actor.avatar} alt="" className="h-7 w-7 shrink-0 rounded-full border border-[#E5E0D8] object-cover" />
                              <div className="min-w-0">
                                <div className="truncate text-[11px] font-bold text-[#1A1615]">{log.action.replaceAll('_', ' ')}</div>
                                <div className="truncate text-[9px] text-[#6E6A66]">{log.actor.name} · {log.actor.role}</div>
                              </div>
                            </div>
                            <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${isFlagged ? 'bg-[#FCE7E5] text-[#B42318]' : 'bg-[#E6F4ED] text-[#0D7A53]'}`}>
                              {statusLabel}
                            </span>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-[9px]">
                            <div><span className="block uppercase tracking-wider text-[#A09A91]">Target</span><span className="block truncate font-medium text-[#1A1615]">{log.target}</span></div>
                            <div><span className="block uppercase tracking-wider text-[#A09A91]">Time</span><span className="block text-[#6E6A66]">{log.timestamp}</span></div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="hidden overflow-x-auto sm:block">
                    <table className="w-full min-w-[760px] text-left text-xs">
                      <thead className="bg-[#FAF8F5] text-[#9E9A93] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E0D8]">
                        <tr>
                          <th className="w-[112px] px-4 py-3">Timestamp (EST)</th>
                          <th className="py-3 px-3">Actor</th>
                          <th className="w-[190px] px-3 py-3">Action / Target</th>
                          <th className="py-3 px-3">Terminal / IP</th>
                          <th className="px-4 py-3 text-right">Cryptographic State</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E0D8]">
                        {paginatedLogs.map((log, index) => (
                          <tr
                            key={log.id}
                            onClick={() => setSelectedHash(log.hash)}
                            className={`cursor-pointer align-top transition-colors ${log.cryptoState === 'FLAGGED' ? 'bg-[#FFF7F6] hover:bg-[#FDEDEC]' : 'hover:bg-[#FAF8F5]/80'}`}
                          >
                            {/* Timestamp */}
                            <td className={`whitespace-nowrap px-4 py-4 font-mono text-[11px] ${log.cryptoState === 'FLAGGED' ? 'text-[#C2413A]' : 'text-[#6E6A66]'}`}>
                              <div className="font-bold">{log.timestamp.split(' ')[1] || log.timestamp}</div>
                              <div className="mt-0.5 text-[10px] font-normal">{log.timestamp.split(' ')[0]}</div>
                            </td>

                            {/* Actor */}
                            <td className="px-3 py-4">
                              <div className="flex items-center gap-2">
                                <img
                                  src={log.actor.avatar}
                                  alt={log.actor.name}
                                  className="w-6 h-6 rounded-full object-cover border border-[#E5E0D8]"
                                />
                                <div>
                                  <div className={`font-semibold leading-tight ${log.cryptoState === 'FLAGGED' ? 'text-[#C2413A]' : 'text-[#1A1615]'}`}>{log.actor.name}</div>
                                  <div className="text-[9px] text-[#9E9A93] font-medium">{log.actor.role}</div>
                                </div>
                              </div>
                            </td>

                            {/* Action & Target */}
                            <td className="px-3 py-4">
                              <div className={`max-w-[190px] text-[12px] font-bold leading-tight ${log.cryptoState === 'FLAGGED' ? 'text-[#C2413A]' : 'text-[#1A1615]'}`}>
                                {log.cryptoState === 'FLAGGED' && <AlertTriangle className="mr-1 inline h-3 w-3" />}
                                {log.cryptoState === 'FLAGGED' ? 'Role Escalation [BLOCKED]' : log.action.replaceAll('_', ' ')}
                              </div>
                              <div className="mt-1 max-w-[190px] text-[10px] leading-snug text-[#6E6A66]">{log.target}</div>
                            </td>

                            {/* Terminal / IP */}
                            <td className="px-3 py-4">
                              <div className="font-mono text-[11px] text-[#1A1615]">{log.terminal}</div>
                              <div className="text-[10px] text-[#9E9A93] font-mono">{log.ip}</div>
                            </td>

                            {/* Crypto State */}
                            <td className="whitespace-nowrap px-4 py-4 text-right">
                              <span className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-bold ${log.cryptoState === 'FLAGGED' ? 'border-[#F3B7B1] bg-[#FCE7E5] text-[#B42318]' : 'border-[#BCE3D1] bg-[#E6F4ED] text-[#0D7A53]'}`}>
                                {log.cryptoState === 'FLAGGED' ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />} {log.cryptoState === 'FLAGGED' ? 'ROLE ESCALATION BLOCKED' : log.id === successLogId ? 'SUCCESS' : log.cryptoState}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Hash Inspector Banner */}
                  {selectedHash && (
                    <div className="p-3 bg-[#FAF8F5] border-t border-[#E5E0D8] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <Key className="w-3.5 h-3.5 text-[#9E782F] shrink-0" />
                        <span className="font-mono text-[10px] text-[#1A1615] truncate">
                          SHA-256: {selectedHash}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedHash)}
                        className="px-2.5 py-1 bg-white border border-[#E5E0D8] rounded text-[10px] font-semibold text-[#6E6A66] hover:bg-[#F5F4F0] shrink-0 cursor-pointer"
                      >
                        {copiedHash ? 'Copied!' : 'Copy Hash'}
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col gap-2 border-t border-[#E5E0D8] bg-[#FCFBF9] px-3 py-2.5 text-[9px] text-[#9E9A93] sm:flex-row sm:items-center sm:justify-between">
                    <span>Showing {firstVisibleEntry}–{lastVisibleEntry} of {orderedLogs.length} immutable log entries</span>
                    <div className="flex items-center gap-2">
                      <span><strong className="text-[#6E6A66]">Merkle Root:</strong> 0x88f...1c8d</span>
                      <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="rounded border border-[#E5E0D8] bg-white px-2 py-1 font-semibold text-[#6E6A66] disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                      {Array.from({ length: totalPages }, (_, pageIndex) => pageIndex + 1).map((page) => (
                        <button key={page} type="button" onClick={() => goToPage(page)} aria-current={currentPage === page ? 'page' : undefined} className={`rounded px-2 py-1 font-bold ${currentPage === page ? 'bg-[#9E782F] text-white' : 'border border-[#E5E0D8] bg-white text-[#6E6A66]'}`}>{page}</button>
                      ))}
                      <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="rounded border border-[#E5E0D8] bg-white px-2 py-1 font-semibold text-[#6E6A66] disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                    </div>
                  </div>

                  <div className="m-3 rounded-lg border border-[#E5E0D8] bg-[#FCFBF9] p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#B7842C]" /><h3 className="text-[12px] font-bold text-[#1A1615]">Realtime Hash Verification Node</h3></div>
                      <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">ALL 142 BLOCKS VALID</span>
                    </div>
                    <div className="mt-2 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-2 font-mono text-[11px] leading-relaxed text-[#6E6A66]">
                      <div className="flex flex-wrap justify-between gap-x-4"><span>LAST VERIFIED BLOCK: <strong className="text-[#1A1615]">#892,104</strong></span><span>DIFFICULTY TARGET: 0000ffff...</span></div>
                      <div><strong className="text-[#1A1615]">PREV_HASH:</strong> 000000000000000004f29a88c7d61dea352f683ab293410a8d67e0e1189ac6</div>
                      <div className="text-[#B7842C]"><strong>CURR_HASH:</strong> 00000000000000001c91f3f09ae84227c991823c51c8ba48726190a862ef</div>
                      <div className="mt-1 flex items-center gap-1 text-[#0D7A53]"><CheckCircle2 className="h-3 w-3" /> Cryptographic witness attested by Cloudflare HSM & Amazon KMS enclave</div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar: POS Mesh Fleet & Venue Security Policy (4 cols) */}
                <div className="space-y-4 lg:col-span-4">
                  {/* POS Mesh Fleet Status */}
                  <div id="pos-hardware-panel" className="space-y-3 rounded-lg border border-[#E5E0D8] bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
                      <div className="flex items-center gap-1.5"><Wifi className="h-3.5 w-3.5 text-[#B7842C]" /><span className="text-[12px] font-bold text-[#1A1615]">POS Mesh Fleet</span></div>
                      <span className="rounded-full bg-[#F5F1EA] px-1.5 py-1 text-[8px] font-bold text-[#6E6A66]">◌ Ping Mesh</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#1A1615]">Downtown Counter 01</div>
                          <div className="text-[10px] text-[#6E6A66]">Apple iPad Pro 12.9&quot; • Revia Hub</div>
                        </div>
                        <span className="text-[9px] font-bold text-[#0D7A53]">Online<br /><span className="font-normal text-[#9E9A93]">4s ago</span></span>
                      </div>

                      <div className="p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#1A1615]">Roastery Bar 02</div>
                          <div className="text-[10px] text-[#6E6A66]">Square Register • Revia Bridge</div>
                        </div>
                        <span className="text-[9px] font-bold text-[#0D7A53]">Online<br /><span className="font-normal text-[#9E9A93]">12s ago</span></span>
                      </div>

                      <div className="p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[#1A1615]">Northside Pop-up 01</div>
                          <div className="text-[10px] text-[#6E6A66]">Revia Mobile Handheld NFC</div>
                        </div>
                        <span className="text-[9px] font-bold text-[#B7842C]">Standby<br /><span className="font-normal text-[#9E9A93]">5m ago</span></span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] font-semibold text-[#6E6A66]">
                      <span>Enforce Mutual TLS on Fleet</span>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" checked={enforceFleetTls} onChange={(event) => setEnforceFleetTls(event.target.checked)} className="peer sr-only" aria-label="Enforce Mutual TLS on Fleet" />
                        <span className="h-3.5 w-7 rounded-full bg-[#D9D3C9] transition-colors peer-checked:bg-[#0D7A53] after:absolute after:left-0.5 after:top-0.5 after:h-2.5 after:w-2.5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-3.5" />
                      </label>
                    </div>
                  </div>

                  {/* Webhooks & Connectors Status */}
                  <div className="space-y-3 rounded-lg border border-[#E5E0D8] bg-white p-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
                      <div className="flex items-center gap-1.5"><Webhook className="h-3.5 w-3.5 text-[#B7842C]" /><span className="text-[10px] font-bold uppercase tracking-wider text-[#9E9A93]">Webhooks & Connectors</span></div>
                      <span className="rounded-full bg-[#E6F4ED] px-1.5 py-0.5 text-[8px] font-bold text-[#0D7A53]">3 active</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8]">
                        <span className="font-semibold text-[#1A1615]">Shopify POS Sync</span>
                        <span className="text-[10px] text-[#0D7A53] font-bold">200 OK</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8]">
                        <span className="font-semibold text-[#1A1615]">Apple & Google Wallet Push</span>
                        <span className="text-[10px] text-[#0D7A53] font-bold">99.98%</span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="mb-1 text-[8px] font-bold uppercase tracking-wider text-[#9E9A93]">Live webhook signing secret</div>
                      <div className="flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-1.5 font-mono text-[9px] text-[#6E6A66]">
                        <span className="min-w-0 flex-1 truncate">rev_sec_live_994a••••••••••••</span>
                        <button type="button" className="shrink-0 rounded bg-white px-1.5 py-0.5 text-[8px] font-semibold text-[#6E6A66]">Rotate</button>
                      </div>
                    </div>
                  </div>

                  {/* Venue Authentication Policy */}
                  <div className="space-y-3 rounded-lg border border-[#E5E0D8] bg-white p-4 shadow-xs lg:-mt-1">
                    <div className="flex items-center gap-1.5 border-b border-[#E5E0D8] pb-2"><Lock className="h-3.5 w-3.5 text-[#B7842C]" /><h4 className="text-[12px] font-bold text-[#1A1615]">Venue Authentication Policy</h4></div>

                    <div className="space-y-3 pt-1 text-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#1A1615]">Mandatory 2FA for Managers</div>
                          <p className="text-[10px] text-[#6E6A66]">Requires hardware FIDO2 or TOTP authenticator</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" checked={enforceMfa} onChange={(e) => setEnforceMfa(e.target.checked)} className="peer sr-only" aria-label="Mandatory 2FA for Managers" />
                          <span className="h-3.5 w-7 rounded-full bg-[#D9D3C9] transition-colors peer-checked:bg-[#0D7A53] after:absolute after:left-0.5 after:top-0.5 after:h-2.5 after:w-2.5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-3.5" />
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#1A1615]">Terminal Inactivity Lock</div>
                          <p className="text-[10px] text-[#6E6A66]">Auto-lock POS cashier display</p>
                        </div>
                        <span className="rounded bg-[#F5F1EA] px-1.5 py-1 text-[9px] font-semibold text-[#6E6A66]">15 Minutes</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#1A1615]">Venue Subnet IP Restrict</div>
                          <p className="text-[10px] text-[#6E6A66]">Limit administrative space to trusted store LANs</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" checked={autoSessionTimeout} onChange={(e) => setAutoSessionTimeout(e.target.checked)} className="peer sr-only" aria-label="Venue Subnet IP Restrict" />
                          <span className="h-3.5 w-7 rounded-full bg-[#D9D3C9] transition-colors peer-checked:bg-[#0D7A53] after:absolute after:left-0.5 after:top-0.5 after:h-2.5 after:w-2.5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-3.5" />
                        </label>
                      </div>
                      <div className="flex items-start gap-1.5 rounded-md bg-[#FAF8F5] p-2 text-[9px] leading-snug text-[#6E6A66]"><CircleCheck className="mt-0.5 h-3 w-3 shrink-0 text-[#0D7A53]" /> All 3 venues meet Level 1 PCI-DSS Merchant Attestation standard.</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'customer_tiers' ? (
            <div className="mt-4 overflow-hidden rounded-xl bg-white border border-[#E5E0D8] shadow-xs">
              <CustomerTypeSettings />
            </div>
          ) : activeTab === 'general_brand' ? (
            <div className="mt-4 overflow-hidden rounded-xl bg-white border border-[#E5E0D8] shadow-xs">
              <MerchantPlatformSettings />
            </div>
          ) : activeTab === 'pos_hardware' ? (
            <div className="mt-4 overflow-hidden rounded-xl bg-white border border-[#E5E0D8] shadow-xs">
              <PosHardwareSettings />
            </div>
          ) : activeTab === 'api_keys_webhooks' ? (
            <div className="mt-4 overflow-hidden rounded-xl bg-white border border-[#E5E0D8] shadow-xs">
              <ApiKeysWebhooksSettings />
            </div>
          ) : activeTab === 'access_control' ? (
            <div className="mt-4 overflow-hidden rounded-xl bg-white border border-[#E5E0D8] shadow-xs">
              <AccessControlSettings />
            </div>
          ) : null}

          {/* <footer className="flex flex-col gap-2 border-t border-[#E5E0D8] px-1 pt-3 text-[9px] text-[#9E9A93] sm:flex-row sm:items-center sm:justify-between mt-4">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#0D7A53]"><span className="h-1.5 w-1.5 rounded-full bg-[#0D7A53]" /> All systems operational</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3 w-3" /> Last synchronized: 2 minutes ago</span>
          </footer> */}
        </div>
    </>
  );
};
