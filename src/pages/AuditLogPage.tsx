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
  Webhook
} from 'lucide-react';
import { AuditLogEntry } from '../types';

interface AuditLogPageProps {
  logs: AuditLogEntry[];
}

export const AuditLogPage: React.FC<AuditLogPageProps> = ({ logs }) => {
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  // Security Policy Toggles
  const [enforceMfa, setEnforceMfa] = useState<boolean>(true);
  const [autoSessionTimeout, setAutoSessionTimeout] = useState<boolean>(true);
  const [enforceFleetTls, setEnforceFleetTls] = useState<boolean>(true);
  const flaggedLogs = logs.filter((log) => log.cryptoState === 'FLAGGED');
  const regularLogs = logs.filter((log) => log.cryptoState !== 'FLAGGED');
  const orderedLogs = [
    ...regularLogs.slice(0, 2),
    ...flaggedLogs,
    ...regularLogs.slice(2),
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-3 p-2 sm:py-4 sm:pl-4 sm:pr-1">
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

      {/* Settings header and section navigation */}
      <header className="rounded-xl bg-[#FCFBF9] px-2 pt-2 sm:px-3 sm:pt-2.5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-start sm:gap-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#E6D4A8] bg-[#FFF8E8] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#8B681F]">
                Governance & Zero-Trust
              </span>
              <span className="text-[8px] text-[#A09A91]">• Revision v2.14r4</span>
            </div>
            <h1 className="mt-0.5 text-[18px] font-bold tracking-tight text-[#1A1615] sm:text-[20px]">
              Merchant Settings & Security Audit Log
            </h1>
          </div>

          <button
            onClick={() => alert('Exporting signed audit ledger JSON bundle...')}
            className="inline-flex w-fit items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#1A1615] shadow-2xs transition-colors hover:bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#D4A753]/40"
          >
            <Download className="h-3.5 w-3.5 text-[#9E782F]" />
            Export Immutable Dossier (CSV/PDF)
          </button>
        </div>

        <nav aria-label="Settings sections" className="-mx-1 mt-2 overflow-x-auto rounded-lg border border-[#E5E0D8] bg-white p-1 sm:-mx-2">
          <div className="flex min-w-full items-center gap-0.5">
            <button className="min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]" type="button">
              General & Brand
            </button>
            <button className="min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]" type="button">
              POS & Hardware
            </button>
            <button className="min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]" type="button">
              API Keys & Webhooks
            </button>
            <button className="min-w-max flex-1 rounded-md bg-[#C99B42] px-3 py-1.5 text-[9px] font-bold text-white shadow-sm" type="button" aria-current="page">
              Security & SOC-2 Audit Stream
            </button>
            <button className="min-w-max flex-1 rounded-md px-2.5 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]" type="button">
              Access Control
            </button>
          </div>
        </nav>
      </header>

      {/* Governance summary */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        <div className="group min-h-[188px] rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-[0_2px_10px_rgba(31,29,26,0.04)] transition-shadow hover:shadow-[0_6px_18px_rgba(31,29,26,0.08)] sm:col-start-1 sm:row-start-1 sm:min-h-[204px] xl:col-auto xl:row-auto">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[#9E9A93]">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-[#0D7A53]" /> Compliance Posture</span>
            <span className="rounded-full bg-[#E6F4ED] px-1.5 py-0.5 text-[8px] text-[#0D7A53]">Enforced</span>
          </div>
          <div className="mt-4 max-w-[180px] text-[29px] font-bold leading-[1.02] tracking-tight text-[#1A1615]">SOC-2 Type<br />II</div>
          <p className="mt-3 max-w-[180px] text-[10px] leading-snug text-[#6E6A66]">Audit compliance sealed & certified valid</p>
          <span className="mt-3 flex max-w-[180px] items-start gap-1 text-[10px] font-semibold leading-snug text-[#0D7A53]"><CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Zero policy breaches (365 days)</span>
        </div>

        <div className="group h-fit rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-[0_2px_10px_rgba(31,29,26,0.04)] transition-shadow hover:shadow-[0_6px_18px_rgba(31,29,26,0.08)] sm:col-start-1 sm:row-start-2 xl:col-auto xl:row-auto">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[#9E9A93]"><span>Connected Terminals</span><Radio className="h-3.5 w-3.5 animate-pulse text-[#0D7A53]" /></div>
          <div className="mt-4 text-[28px] font-bold leading-none tracking-tight text-[#1A1615]">6 / 6 <span className="text-sm font-medium">Terminals Online</span></div>
          <p className="mt-1 text-[9px] text-[#6E6A66]">Downtown • Roastery • Northside</p>
          <span className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-[#0D7A53]"><Activity className="h-3 w-3" /> 100% Mesh Health</span>
        </div>

        <div className="group h-fit rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-[0_2px_10px_rgba(31,29,26,0.04)] transition-shadow hover:shadow-[0_6px_18px_rgba(31,29,26,0.08)] sm:col-start-2 sm:row-start-2 xl:col-auto xl:row-auto">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[#9E9A93]"><span>Audit Events (24h)</span><Cpu className="h-3.5 w-3.5 text-[#C08B31]" /></div>
          <div className="mt-4 text-[28px] font-bold leading-none tracking-tight text-[#1A1615]">48,219</div>
          <p className="mt-1 text-[9px] text-[#6E6A66]">Configuration and access events recorded</p>
          <span className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-[#0D7A53]"><CircleCheck className="h-3 w-3" /> 0 failed auth signatures</span>
        </div>

        <div className="group h-fit rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-[0_2px_10px_rgba(31,29,26,0.04)] transition-shadow hover:shadow-[0_6px_18px_rgba(31,29,26,0.08)] sm:col-start-3 sm:row-start-2 xl:col-auto xl:row-auto">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[#9E9A93]"><span>Cryptographic Ledger</span><span className="rounded-full bg-[#FFF6DF] px-1.5 py-0.5 text-[8px] text-[#8B681F]">SHA-256</span></div>
          <div className="mt-4 text-[28px] font-bold leading-none tracking-tight text-[#1A1615]">142 Events</div>
          <p className="mt-1 text-[9px] text-[#6E6A66]">Stream rate: ~12.4 actions / hr</p>
          <span className="mt-2 flex items-center gap-1 text-[9px] font-semibold text-[#8B681F]"><Lock className="h-3 w-3" /> Immutable Block State Valid</span>
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
                <button type="button" className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]"><SlidersHorizontal className="h-3 w-3" /> Filters</button>
                <button type="button" className="inline-flex items-center gap-1 rounded-md border border-[#E5E0D8] bg-white px-2 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]"><RefreshCw className="h-3 w-3" /> Live Refresh</button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-[minmax(0,1.7fr)_1fr_1fr_auto]">
              <label className="flex items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] text-[#9E9A93]">
                <Search className="h-3 w-3 shrink-0" />
                <input aria-label="Filter audit log" placeholder="Filter by actor, IP, hash, or action" className="min-w-0 flex-1 bg-transparent text-[10px] text-[#1A1615] outline-none placeholder:text-[#B8B1A7]" />
              </label>
              <button type="button" className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-left text-[9px] font-semibold text-[#6E6A66]">All Event Types <ChevronDown className="h-3 w-3 text-[#9E9A93]" /></button>
              <button type="button" className="flex items-center justify-between rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-left text-[9px] font-semibold text-[#6E6A66]">All Branches <ChevronDown className="h-3 w-3 text-[#9E9A93]" /></button>
              <button type="button" className="rounded-md border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#6E6A66] hover:bg-[#F5F1EA]">Today, 2.4</button>
            </div>
          </div>
          <div className="divide-y divide-[#E5E0D8] sm:hidden">
            {orderedLogs.map((log, index) => {
              const isFlagged = log.cryptoState === 'FLAGGED';
              const statusLabel = index === 1 && !isFlagged ? 'SUCCESS' : isFlagged ? 'CRITICAL' : 'VERIFIED';
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
                {orderedLogs.map((log, index) => (
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
                        {log.cryptoState === 'FLAGGED' ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />} {log.cryptoState === 'FLAGGED' ? 'ROLE ESCALATION BLOCKED' : index === 1 ? 'SUCCESS' : log.cryptoState}
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
            <span>Showing 1–5 of 142 immutable log entries</span>
            <div className="flex items-center gap-2">
              <span><strong className="text-[#6E6A66]">Merkle Root:</strong> 0x88f...1c8d</span>
              <button type="button" className="rounded border border-[#E5E0D8] bg-white px-2 py-1 font-semibold text-[#B8B1A7]">Previous</button>
              <button type="button" className="rounded bg-[#9E782F] px-2 py-1 font-bold text-white">1</button>
              <button type="button" className="rounded border border-[#E5E0D8] bg-white px-2 py-1 text-[#6E6A66]">2</button>
              <button type="button" className="rounded border border-[#E5E0D8] bg-white px-2 py-1 text-[#6E6A66]">3</button>
              <button type="button" className="rounded border border-[#E5E0D8] bg-white px-2 py-1 font-semibold text-[#6E6A66]">Next</button>
            </div>
          </div>

          <div className="m-3 rounded-lg border border-[#E5E0D8] bg-[#FCFBF9] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#B7842C]" /><h3 className="text-[12px] font-bold text-[#1A1615]">Realtime Hash Verification Node</h3></div>
              <span className="rounded-full bg-[#E6F4ED] px-2 py-1 text-[8px] font-bold text-[#0D7A53]">ALL 142 BLOCKS VALID</span>
            </div>
            <div className="mt-2 rounded-md border border-[#E5E0D8] bg-white px-2.5 py-2 font-mono text-[9px] leading-relaxed text-[#6E6A66]">
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
          <div className="space-y-3 rounded-lg border border-[#E5E0D8] bg-white p-4 shadow-xs">
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
          <div className="space-y-3 rounded-lg border border-[#E5E0D8] bg-white p-4 shadow-xs">
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

      <footer className="flex flex-col gap-2 border-t border-[#E5E0D8] px-1 pt-3 text-[9px] text-[#9E9A93] sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[#0D7A53]"><span className="h-1.5 w-1.5 rounded-full bg-[#0D7A53]" /> All systems operational</span>
        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3 w-3" /> Last synchronized: 2 minutes ago</span>
      </footer>
    </div>
  );
};
