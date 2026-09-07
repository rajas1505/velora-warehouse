import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  DollarSign, 
  Boxes, 
  Truck, 
  BarChart, 
  CheckCircle2, 
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export function Reports() {
  const { showSuccess, showInfo } = useToast();
  const [downloading, setDownloading] = useState(null);

  const reports = [
    {
      id: 'sales',
      title: 'Sales Report',
      description: 'Monthly warehouse sales performance, revenue distribution by client account, and order volume metrics.',
      icon: DollarSign,
      format: 'CSV / PDF',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'inventory',
      title: 'Inventory Report',
      description: 'Current inventory stock summary, low-stock threshold audit, category distributions, and reorder projections.',
      icon: Boxes,
      format: 'CSV / Excel',
      iconBg: 'bg-[#238cff]/15 text-[#46d5ff] border-[#238cff]/30'
    },
    {
      id: 'shipment',
      title: 'Shipment Report',
      description: 'Logistics delivery performance, carrier dispatch turnaround times, and dock door occupancy timelines.',
      icon: Truck,
      format: 'CSV / PDF',
      iconBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
    }
  ];

  const handleDownload = (report) => {
    setDownloading(report.id);
    showInfo(`Preparing ${report.title} download...`);

    setTimeout(() => {
      // Generate a mock CSV download so the user gets a real downloadable file!
      let content = '';
      if (report.id === 'sales') {
        content = "Month,Orders,Revenue,Growth\nJuly 2026,1240,$482000,+12%\nAugust 2026,1342,$520000,+8%";
      } else if (report.id === 'inventory') {
        content = "SKU,Product Name,Category,Stock Status\n1,Industrial Conveyor Belt Motor,Machinery,In Stock\n2,RFID Scanner Wand v4,Electronics,Low Stock";
      } else {
        content = "Carrier,Dispatches,OnTimeRate,Efficiency\nDHL Freight,342,98.2%,Optimal\nFedEx Logistics,280,96.5%,Optimal";
      }

      const blob = new Blob([content], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VELORA_${report.id}_report_${new Date().toISOString().substring(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloading(null);
      showSuccess(`${report.title} downloaded successfully!`);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Business Reports"
        subtitle="Generate and download operational reports compiled from MySQL inventory and fulfillment logs."
      />

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          const isDownloading = downloading === report.id;

          return (
            <Card key={report.id} interactive padding="p-6 sm:p-8" className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-2xl border ${report.iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    {report.format}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
                  <p className="text-sm text-[#b9c7dd] leading-relaxed">
                    {report.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Button
                  onClick={() => handleDownload(report)}
                  variant="primary"
                  className="w-full justify-center"
                  icon={Download}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Exporting Report...' : `Download ${report.title}`}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Report Schedule Summary */}
      <Card padding="p-6 sm:p-8" className="bg-gradient-to-r from-[#0b1525] via-[#182331] to-[#0b1525] border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-6 h-6 text-[#46d5ff]" />
          <div>
            <h4 className="text-base font-bold text-white">Automated Batch Export Endpoint</h4>
            <p className="text-xs text-[#b9c7dd] mt-0.5">
              Reports can also be scheduled via cron for automated server-side delivery to warehouse directors.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Reports;
