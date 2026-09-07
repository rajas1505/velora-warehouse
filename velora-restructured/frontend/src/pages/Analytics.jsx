import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Warehouse, 
  CheckCircle2, 
  Activity,
  PieChart,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';

export function Analytics() {
  const analyticsData = [
    {
      title: 'Storage Utilization',
      percentage: 89,
      icon: Warehouse,
      description: 'Percentage of high-density pallet racks currently occupied across Zones A-D.',
      status: 'Optimal Volume',
      color: 'cyan',
      iconBg: 'bg-[#238cff]/15 text-[#46d5ff] border-[#238cff]/30'
    },
    {
      title: 'Shipment Accuracy',
      percentage: 97,
      icon: ShieldCheck,
      description: 'Order fulfillment precision rate verified by automated barcode RFID scanners.',
      status: '+2.4% vs last month',
      color: 'emerald',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Order Efficiency',
      percentage: 92,
      icon: Zap,
      description: 'Time from order creation in MySQL API to dock doors departure.',
      status: 'Exceeds SLA Target',
      color: 'blue',
      iconBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Inventory Health',
      percentage: 95,
      icon: Layers,
      description: 'SKU availability index with low stock risk mitigation factor.',
      status: 'Healthy Stock Levels',
      color: 'emerald',
      iconBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
    }
  ];

  const categoryBreakdown = [
    { category: 'Machinery & Equipment', count: '4,850 SKUs', share: 32 },
    { category: 'Storage & Pallets', count: '3,420 SKUs', share: 23 },
    { category: 'Packaging Materials', count: '2,980 SKUs', share: 20 },
    { category: 'Electronics & Sensors', count: '2,100 SKUs', share: 14 },
    { category: 'Lighting & Power', count: '1,470 SKUs', share: 11 }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Operations Analytics"
        subtitle="In-depth telemetry and logistics efficiency metrics computed from warehouse sensors and database logs."
      />

      {/* Primary Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} interactive padding="p-6" className="space-y-4">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl border ${item.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  {item.status}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium text-[#b9c7dd] uppercase tracking-wider">{item.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{item.percentage}%</h2>
                  <span className="text-xs text-slate-400 font-medium">score</span>
                </div>
              </div>

              <ProgressBar value={item.percentage} showPercentage={false} color={item.color} height="h-2.5" />

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Deep Dive Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Inventory Distribution */}
        <div className="lg:col-span-7 space-y-6">
          <Card padding="p-6 sm:p-8" className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#238cff]/15 text-[#46d5ff] border border-[#238cff]/30">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Inventory Category Distribution</h3>
                  <p className="text-xs text-[#b9c7dd]">Volume breakdown by primary warehouse inventory sector</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {categoryBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{item.category}</span>
                    <span className="text-slate-400">{item.count} ({item.share}%)</span>
                  </div>
                  <ProgressBar value={item.share} showPercentage={false} color={idx % 2 === 0 ? 'cyan' : 'blue'} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: AGV & Robotics Efficiency */}
        <div className="lg:col-span-5 space-y-6">
          <Card padding="p-6 sm:p-8" className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AGV Fleet Status</h3>
                  <p className="text-xs text-[#b9c7dd]">Automated guided vehicles telemetry</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0b1525] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-semibold">Active Fleet Units</span>
                  <span className="text-emerald-400 font-mono font-bold">18 / 18 Online</span>
                </div>
                <ProgressBar value={100} showPercentage={false} color="emerald" height="h-2" />
              </div>

              <div className="p-4 rounded-xl bg-[#0b1525] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-semibold">Battery Charge Level</span>
                  <span className="text-[#46d5ff] font-mono font-bold">94% Avg</span>
                </div>
                <ProgressBar value={94} showPercentage={false} color="cyan" height="h-2" />
              </div>

              <div className="p-4 rounded-xl bg-[#0b1525] border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-semibold">Dock Door Cycle Time</span>
                  <span className="text-indigo-400 font-mono font-bold">4.2 Mins / Pallet</span>
                </div>
                <ProgressBar value={88} showPercentage={false} color="blue" height="h-2" />
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default Analytics;
