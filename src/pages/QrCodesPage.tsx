import React, { useState } from 'react';
import {
  QrCode,
  Download,
  Printer,
  Plus,
  Radio,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface QRStand {
  id: string;
  name: string;
  branch: string;
  type: 'Counter POS' | 'Table Stand' | 'Window Decal' | 'Barista Quick-Scan';
  totalScans: number;
  todayScans: number;
  status: 'Active' | 'Maintenance';
  nfcPaired: boolean;
  link: string;
}

const INITIAL_STANDS: QRStand[] = [
  {
    id: 'QR-001',
    name: 'Main Counter Register #1',
    branch: 'Downtown Flagship',
    type: 'Counter POS',
    totalScans: 14280,
    todayScans: 215,
    status: 'Active',
    nfcPaired: true,
    link: 'https://pass.revia.me/bb-dt-01',
  },
  {
    id: 'QR-002',
    name: 'Espresso Bar Pick-up Stand',
    branch: 'Downtown Flagship',
    type: 'Counter POS',
    totalScans: 8940,
    todayScans: 197,
    status: 'Active',
    nfcPaired: true,
    link: 'https://pass.revia.me/bb-dt-02',
  },
  {
    id: 'QR-003',
    name: 'Table 14 - Fast Scan Acrylic',
    branch: 'Northside Mall',
    type: 'Table Stand',
    totalScans: 4120,
    todayScans: 84,
    status: 'Active',
    nfcPaired: false,
    link: 'https://pass.revia.me/bb-ns-t14',
  },
  {
    id: 'QR-004',
    name: 'Entrance Window Pass Decal',
    branch: 'Northside Mall',
    type: 'Window Decal',
    totalScans: 5310,
    todayScans: 161,
    status: 'Active',
    nfcPaired: true,
    link: 'https://pass.revia.me/bb-ns-w01',
  },
  {
    id: 'QR-005',
    name: 'Transit Central Kiosk Stand #1',
    branch: 'West End Kiosk',
    type: 'Counter POS',
    totalScans: 6890,
    todayScans: 118,
    status: 'Active',
    nfcPaired: true,
    link: 'https://pass.revia.me/bb-we-k01',
  },
];

export const QrCodesPage: React.FC = () => {
  const [stands, setStands] = useState<QRStand[]>(INITIAL_STANDS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#1A1615]">
              Dynamic QR Codes &amp; Terminal Stands
            </h1>
            <span className="bg-[#EBF7F0] text-[#15803D] text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-[#CEEBD9]">
              12 Stands Synced
            </span>
          </div>
          <p className="text-xs text-[#7C746C] mt-1">
            Printable acrylic stands, dynamic wallet pass installers, and NFC tap pairing
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('Preparing high-resolution Vector PDF print package (A5/A6 acrylic cuts)...')}
            className="bg-white hover:bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg px-3 py-2 text-xs font-semibold text-[#1A1615] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#7C746C]" />
            <span>Download Printable QR Pack</span>
          </button>

          <button
            onClick={() => alert('New QR stand provisioning token generated.')}
            className="bg-[#B38637] hover:bg-[#A37837] text-white rounded-lg px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Generate New Stand</span>
          </button>
        </div>
      </div>

      {/* Grid of Stands */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stands.map((stand) => (
          <div
            key={stand.id}
            className="bg-white border border-[#EAE6E1] rounded-xl p-4 shadow-2xs flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#8C827A] tracking-wider">
                  {stand.type}
                </span>
                <span className="bg-[#EBF7F0] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  {stand.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1A1615] mt-1">
                {stand.name}
              </h3>
              <div className="text-[11px] text-[#7C746C]">
                {stand.branch}
              </div>

              {/* QR Preview box */}
              <div className="mt-3 p-3 bg-[#FAF8F5] border border-[#EAE6E1] rounded-lg flex items-center gap-3">
                <div className="w-16 h-16 bg-white border border-[#E5D7BE] rounded-md p-1 flex items-center justify-center shrink-0 shadow-2xs">
                  <QrCode className="w-12 h-12 text-[#1A1615]" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#8C827A]">
                    Target URL
                  </div>
                  <div className="text-xs font-mono text-[#A37837] truncate">
                    {stand.link}
                  </div>
                  <div className="text-[11px] text-[#5C554E] flex items-center gap-2">
                    <span>Today: <strong>{stand.todayScans}</strong> scans</span>
                    {stand.nfcPaired && (
                      <span className="text-[10px] text-[#15803D] bg-[#EBF7F0] px-1.5 rounded font-semibold">
                        NFC Paired
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F5F2EC] flex items-center justify-between">
              <button
                onClick={() => handleCopy(stand.id, stand.link)}
                className="text-xs text-[#7C746C] hover:text-[#1A1615] flex items-center gap-1 cursor-pointer"
              >
                {copiedId === stand.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#15803D]" />
                    <span className="text-[#15803D] font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => alert(`Printing template for ${stand.name}`)}
                className="text-xs font-semibold text-[#A37837] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Stand Acrylic</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
