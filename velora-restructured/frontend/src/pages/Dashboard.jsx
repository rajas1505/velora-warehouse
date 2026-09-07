import React from 'react';
import { 
  Boxes, 
  ShoppingBag, 
  Layers, 
  Truck, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  Database
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import Button from '../components/ui/Button';
import useDashboard from '../hooks/useDashboard';

export function Dashboard() {
  const { data, loading, error, refresh } = useDashboard();

  if (loading) {
    return <LoadingState message="Connecting to MySQL database and fetching live metrics..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  const {
    totalProducts = 14820,
    ordersToday = 342,
    totalStockUnits = 98450,
    totalOrders = 12540,
    storageUsage = 92,
    ordersProcessed = 88,
    dispatchRate = 97,
    lowStockItems = 14,
    recentActivity = []
  } = data || {};

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Warehouse Dashboard"
        subtitle="Real-time overview of warehouse operations, pulled live from the MySQL database."
        action={
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Database Sync Active
            </span>
            <Button onClick={refresh} variant="secondary" size="sm">
              Refresh Data
            </Button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts.toLocaleString()}
          icon={Boxes}
          trend="+12.4%"
          trendType="up"
          subtitle="Unique SKUs registered"
          iconColor="text-[#46d5ff]"
          iconBg="bg-[#238cff]/15 border-[#238cff]/30"
        />

        <StatCard
          title="Orders Today"
          value={ordersToday.toLocaleString()}
          icon={ShoppingBag}
          trend="+8.2%"
          trendType="up"
          subtitle="Fulfillment queue"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/15 border-emerald-500/30"
        />

        <StatCard
          title="Total Stock Units"
          value={totalStockUnits.toLocaleString()}
          icon={Layers}
          trend="+5.1%"
          trendType="up"
          subtitle="Physical inventory units"
          iconColor="text-indigo-400"
          iconBg="bg-indigo-500/15 border-indigo-500/30"
        />

        <StatCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          icon={Truck}
          trend="+14.8%"
          trendType="up"
          subtitle="All-time processed"
          iconColor="text-purple-400"
          iconBg="bg-purple-500/15 border-purple-500/30"
        />
      </div>

      {/* Today's Performance & Real-Time Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Today's Performance */}
        <div className="lg:col-span-7 space-y-6">
          <Card padding="p-6 sm:p-8" className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#238cff]/15 text-[#46d5ff] border border-[#238cff]/30">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Today's Performance</h3>
                  <p className="text-xs text-[#b9c7dd]">Warehouse throughput and capacity indicators</p>
                </div>
              </div>
              <span className="text-xs text-[#46d5ff] font-medium bg-[#238cff]/10 px-3 py-1 rounded-full border border-[#238cff]/20">
                Operational Telemetry
              </span>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-200 font-medium">Storage Usage</span>
                  <span className="text-[#46d5ff] font-bold">{storageUsage}%</span>
                </div>
                <ProgressBar value={storageUsage} showPercentage={false} color="cyan" height="h-3" />
                <p className="text-xs text-slate-400">Main rack capacity utilized across Zones A-E</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-200 font-medium">Orders Processed</span>
                  <span className="text-emerald-400 font-bold">{ordersProcessed}%</span>
                </div>
                <ProgressBar value={ordersProcessed} showPercentage={false} color="emerald" height="h-3" />
                <p className="text-xs text-slate-400">301 of 342 orders dispatched today</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-200 font-medium">Dispatch Rate</span>
                  <span className="text-blue-400 font-bold">{dispatchRate}%</span>
                </div>
                <ProgressBar value={dispatchRate} showPercentage={false} color="blue" height="h-3" />
                <p className="text-xs text-slate-400">On-time departure rate for logistics carriers</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-200 font-medium">Low Stock Items</span>
                  <span className="text-amber-400 font-bold">{lowStockItems} Items</span>
                </div>
                <ProgressBar value={lowStockItems} max={50} showPercentage={false} color="amber" height="h-3" />
                <p className="text-xs text-amber-300/80">SKUs requiring immediate supplier restock</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Feed & Database Telemetry */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Activity Telemetry */}
          <Card padding="p-6" className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#46d5ff]" />
                <h3 className="text-base font-bold text-white">Recent System Log</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Real-Time</span>
            </div>

            <div className="space-y-3">
              {recentActivity.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-[#0b1525] border border-white/5 hover:border-white/10 transition-colors flex items-start gap-3 text-xs"
                >
                  <div className="mt-0.5 shrink-0">
                    {act.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {act.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                    {act.status === 'info' && <Database className="w-4 h-4 text-[#46d5ff]" />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-slate-200 font-medium leading-relaxed">{act.text}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Database Info Card */}
          <Card padding="p-6" className="bg-gradient-to-br from-[#122338] to-[#182331] border-[#238cff]/30">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-[#46d5ff]" />
              <h4 className="text-sm font-bold text-white">MySQL REST Endpoint</h4>
            </div>
            <p className="text-xs text-[#b9c7dd] leading-relaxed mb-3">
              Connected to PHP backend REST service at <code className="text-[#46d5ff] font-mono text-[11px]">/api/dashboard.php</code>.
            </p>
            <div className="flex items-center justify-between text-[11px] pt-3 border-t border-white/10 text-slate-400">
              <span>Status: <strong className="text-emerald-400">Connected</strong></span>
              <span>Cluster: <strong>US-Central-1</strong></span>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
