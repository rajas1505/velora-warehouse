import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Boxes, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  PackageCheck, 
  Truck, 
  Warehouse,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#238cff]/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#46d5ff]/10 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#238cff]/10 border border-[#238cff]/30 text-[#46d5ff] text-xs font-semibold tracking-wider uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>SMART WAREHOUSE MANAGEMENT</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Transform Your Warehouse Into A <span className="bg-gradient-to-r from-[#238cff] to-[#46d5ff] bg-clip-text text-transparent">High-Performance</span> Logistics Hub.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#b9c7dd] max-w-2xl leading-relaxed">
                Manage inventory, shipments, orders, analytics, warehouse staff, and logistics from one modern intelligent platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                >
                  Explore Dashboard
                </Button>
                <Button
                  onClick={() => navigate('/inventory')}
                  variant="secondary"
                  size="lg"
                  icon={Boxes}
                >
                  View Inventory
                </Button>
              </div>

              {/* Hero Key Stats */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">25K+</h4>
                  <p className="text-xs text-[#b9c7dd] mt-1 font-medium">Products Tracked</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-[#46d5ff] tracking-tight">99.8%</h4>
                  <p className="text-xs text-[#b9c7dd] mt-1 font-medium">Shipment Accuracy</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">180+</h4>
                  <p className="text-xs text-[#b9c7dd] mt-1 font-medium">Global Warehouses</p>
                </div>
              </div>

            </div>

            {/* Right Side: Glassmorphism Status Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Glow Ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#238cff] to-[#46d5ff] opacity-20 blur-xl" />

                <Card glass padding="p-6 sm:p-8" className="relative space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#238cff]/20 text-[#46d5ff]">
                        <Warehouse className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Warehouse Status</h3>
                        <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          All Operations Active
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono bg-white/5 px-2.5 py-1 rounded-full text-slate-400">
                      LIVE
                    </span>
                  </div>

                  {/* Operational Metrics Progress Bars */}
                  <div className="space-y-5">
                    <div>
                      <ProgressBar
                        label="Storage Capacity"
                        value={92}
                        color="cyan"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">High volume utilization in Zone A & B</p>
                    </div>

                    <div>
                      <ProgressBar
                        label="Orders Completed"
                        value={85}
                        color="blue"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">342 dispatched today</p>
                    </div>

                    <div>
                      <ProgressBar
                        label="Shipment Efficiency"
                        value={97}
                        color="emerald"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Optimal logistics speed score</p>
                    </div>
                  </div>

                  {/* Footer Highlights */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#0b1525]/80 border border-white/5">
                      <p className="text-slate-400 text-[10px]">Active AGVs</p>
                      <p className="text-sm font-bold text-white mt-0.5">18 Automated Units</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0b1525]/80 border border-white/5">
                      <p className="text-slate-400 text-[10px]">Database Latency</p>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">14ms Response</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#46d5ff] uppercase tracking-widest">
            ENGINEERED FOR MODERN SUPPLY CHAINS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mt-2">
            Complete Logistics Intelligence in One Platform
          </h2>
          <p className="text-sm sm:text-base text-[#b9c7dd] mt-3">
            VELORA unites warehouse telemetry, live inventory tracking, order fulfillment, and relational database metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card interactive padding="p-6 sm:p-8" className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#238cff]/15 border border-[#238cff]/30 text-[#46d5ff] flex items-center justify-center">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Real-Time Inventory</h3>
            <p className="text-sm text-[#b9c7dd] leading-relaxed">
              Monitor SKU counts, stock health status, category distributions, and receive instant alerts when items reach reorder thresholds.
            </p>
            <Link to="/inventory" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#46d5ff] hover:underline pt-2">
              Manage Stock <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card interactive padding="p-6 sm:p-8" className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#238cff]/15 border border-[#238cff]/30 text-[#46d5ff] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Order Dispatch Control</h3>
            <p className="text-sm text-[#b9c7dd] leading-relaxed">
              Track customer orders from pending status to completed dispatch. Filter, edit, and audit fulfillment timelines seamlessly.
            </p>
            <Link to="/orders" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#46d5ff] hover:underline pt-2">
              View Dispatch <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>

          <Card interactive padding="p-6 sm:p-8" className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#238cff]/15 border border-[#238cff]/30 text-[#46d5ff] flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Operations Analytics</h3>
            <p className="text-sm text-[#b9c7dd] leading-relaxed">
              Gain deep visibility into storage utilization, shipment efficiency, and warehouse health scores with clear visual telemetry.
            </p>
            <Link to="/analytics" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#46d5ff] hover:underline pt-2">
              View Telemetry <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      </section>

      {/* Operational Standard Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-[#0b1525] via-[#182331] to-[#0b1525] border-white/10 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">Ready to streamline your warehouse operations?</h3>
              <p className="text-sm text-[#b9c7dd]">
                Connect VELORA to your MySQL database REST API or explore live operations instantly.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Button onClick={() => navigate('/dashboard')} variant="primary" size="lg" icon={ArrowRight}>
                Launch System
              </Button>
            </div>
          </div>
        </Card>
      </section>

    </div>
  );
}

export default Home;
