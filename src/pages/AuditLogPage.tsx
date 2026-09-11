import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Radio,
  Key,
  Server,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Copy,
  Terminal,
  Cpu,
  Sparkles
} from 'lucide-react';
import { AuditLogEntry } from '../types';
import { PrimaryButton } from '../components/common/Badges';

interface AuditLogPageProps {
  logs: AuditLogEntry[];
}

export const AuditLogPage: React.FC<AuditLogPageProps> = ({ logs }) => {
  const [selectedHash, setSelectedHash] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  // Security Policy Toggles
  const [enforceMfa, setEnforceMfa] = useState<boolean>(true);
  const [meshEcdsaSync, setMeshEcdsaSync] = useState<boolean>(true);
  const [autoSessionTimeout, setAutoSessionTimeout] = useState<boolean>(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
            GOVERNANCE & CRYPTOGRAPHIC LEDGER // COMPLIANCE
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">Settings & Security Audit Log</h1>
          <p className="text-xs text-[#6E6A66] mt-0.5">
            Immutable SHA-256 chained transaction trail, POS mesh hardware encryption, and SOC-2 Type II telemetry.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting signed audit ledger JSON bundle...')}
          className="px-3.5 py-2 rounded-lg border border-[#E5E0D8] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#6E6A66]" />
          <span>Export Ledger Proof (JSON)</span>
        </button>
      </div>

      {/* Governance Header Cards (4 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Compliance Standard</span>
            <ShieldCheck className="w-4 h-4 text-[#0D7A53]" />
          </div>
          <div className="text-base font-bold tracking-tight text-[#1A1615] mt-1">SOC-2 Type II Certified</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D7A53]" /> PCI-DSS Level 1 Enforced
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">POS Mesh Sync</span>
            <Radio className="w-4 h-4 text-[#0D7A53] animate-pulse" />
          </div>
          <div className="text-base font-bold tracking-tight text-[#1A1615] mt-1">9 Nodes In Consensus</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold mt-1 block">
            Latency &lt; 8ms • P2P Mesh
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">API Velocity</span>
            <Cpu className="w-4 h-4 text-[#9E782F]" />
          </div>
          <div className="text-base font-bold tracking-tight text-[#1A1615] mt-1">1,480 req / min</div>
          <span className="text-[11px] text-[#6E6A66] font-medium mt-1 block">
            0 Throttling Incidents
          </span>
        </div>

        <div className="bg-white border border-[#E5E0D8] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6E6A66]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">Cryptographic Ledger</span>
            <Lock className="w-4 h-4 text-[#9E782F]" />
          </div>
          <div className="text-base font-bold tracking-tight text-[#1A1615] mt-1">Block #9,401 Synced</div>
          <span className="text-[11px] text-[#0D7A53] font-semibold mt-1 block">
            SHA-256 Merkle Chained
          </span>
        </div>
      </div>

      {/* Main Grid: Immutable Audit Trail Table (Left 8 cols) + Right Security Policy Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Immutable Audit Trail Table */}
        <div className="lg:col-span-8 bg-white border border-[#E5E0D8] rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E5E0D8] bg-[#FAF8F5]/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#9E9A93] tracking-wider">
                IMMUTABLE AUDIT TRAIL
              </span>
              <h3 className="text-sm font-bold text-[#1A1615]">System Events & Ledger Proofs</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">
              Zero Tamper Detected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#9E9A93] uppercase font-bold text-[10px] tracking-wider border-b border-[#E5E0D8]">
                <tr>
                  <th className="py-3 px-4">Timestamp (UTC)</th>
                  <th className="py-3 px-3">Actor</th>
                  <th className="py-3 px-3">Action & Target</th>
                  <th className="py-3 px-3">Terminal / IP</th>
                  <th className="py-3 px-4 text-right">Crypto State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedHash(log.hash)}
                    className="hover:bg-[#FAF8F5]/80 transition-colors cursor-pointer"
                  >
                    {/* Timestamp */}
                    <td className="py-3 px-4 font-mono text-[11px] text-[#6E6A66] whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* Actor */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={log.actor.avatar}
                          alt={log.actor.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#E5E0D8]"
                        />
                        <div>
                          <div className="font-semibold text-[#1A1615] leading-tight">{log.actor.name}</div>
                          <div className="text-[9px] text-[#9E9A93] font-medium">{log.actor.role}</div>
                        </div>
                      </div>
                    </td>

                    {/* Action & Target */}
                    <td className="py-3 px-3">
                      <div className="font-mono text-[11px] font-bold text-[#1A1615]">{log.action}</div>
                      <div className="text-[10px] text-[#6E6A66] truncate max-w-[200px]">{log.target}</div>
                    </td>

                    {/* Terminal / IP */}
                    <td className="py-3 px-3">
                      <div className="font-mono text-[11px] text-[#1A1615]">{log.terminal}</div>
                      <div className="text-[10px] text-[#9E9A93] font-mono">{log.ip}</div>
                    </td>

                    {/* Crypto State */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0D7A53] bg-[#E6F4ED] px-2 py-0.5 rounded border border-[#BCE3D1]">
                        <CheckCircle2 className="w-3 h-3" /> {log.cryptoState}
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
        </div>

        {/* Right Sidebar: POS Mesh Fleet & Venue Security Policy (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* POS Mesh Fleet Status */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                FLEET HARDWARE
              </span>
              <span className="text-[10px] text-[#0D7A53] font-bold">100% HEALTHY</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1615]">POS-MESH-TERMINAL-01</div>
                  <div className="text-[10px] text-[#6E6A66]">Downtown Flagship • Station 1</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#0D7A53]" />
              </div>

              <div className="p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1615]">POS-SCANNER-FLAGSHIP-02</div>
                  <div className="text-[10px] text-[#6E6A66]">Downtown Flagship • Express Bar</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#0D7A53]" />
              </div>

              <div className="p-2.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1615]">DESKTOP-HQ-PRO-09</div>
                  <div className="text-[10px] text-[#6E6A66]">Arts District Roastery • Manager</div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#0D7A53]" />
              </div>
            </div>
          </div>

          {/* Webhooks & Connectors Status */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                WEBHOOK CONNECTORS
              </span>
              <span className="text-[10px] text-[#0D7A53] font-bold">ACTIVE</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8]">
                <span className="font-semibold text-[#1A1615]">Apple Wallet PassKit Sync</span>
                <span className="text-[10px] text-[#0D7A53] font-bold">200 OK</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8]">
                <span className="font-semibold text-[#1A1615]">Google Pay Wallet API</span>
                <span className="text-[10px] text-[#0D7A53] font-bold">200 OK</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8]">
                <span className="font-semibold text-[#1A1615]">Square POS Register Sync</span>
                <span className="text-[10px] text-[#0D7A53] font-bold">200 OK</span>
              </div>
            </div>
          </div>

          {/* Venue Security Policy Toggles */}
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-5 shadow-xs space-y-3">
            <div className="border-b border-[#E5E0D8] pb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E9A93]">
                VENUE SECURITY POLICIES
              </span>
              <h4 className="text-xs font-bold text-[#1A1615]">Cryptographic Access Rules</h4>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#1A1615]">Enforce Passkey MFA</div>
                  <p className="text-[10px] text-[#6E6A66]">Require biometric or FIDO2 hardware key</p>
                </div>
                <input
                  type="checkbox"
                  checked={enforceMfa}
                  onChange={(e) => setEnforceMfa(e.target.checked)}
                  className="rounded border-[#E5E0D8] text-[#9E782F] focus:ring-[#D4A753]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#1A1615]">POS Mesh ECDSA Signatures</div>
                  <p className="text-[10px] text-[#6E6A66]">Sign every stamp redemption with private key</p>
                </div>
                <input
                  type="checkbox"
                  checked={meshEcdsaSync}
                  onChange={(e) => setMeshEcdsaSync(e.target.checked)}
                  className="rounded border-[#E5E0D8] text-[#9E782F] focus:ring-[#D4A753]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#1A1615]">Auto Register Lock (15m)</div>
                  <p className="text-[10px] text-[#6E6A66]">Lock counter screen after inactivity</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoSessionTimeout}
                  onChange={(e) => setAutoSessionTimeout(e.target.checked)}
                  className="rounded border-[#E5E0D8] text-[#9E782F] focus:ring-[#D4A753]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
