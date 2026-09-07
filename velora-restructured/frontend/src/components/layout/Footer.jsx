import React from 'react';
import { Boxes, Server, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  return (
    <footer className="w-full bg-[#050b14] border-t border-white/10 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#238cff] to-[#46d5ff] flex items-center justify-center text-white">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-wider">VELORA</span>
            </div>
            <p className="text-xs text-[#b9c7dd] leading-relaxed">
              Modern Intelligent Warehouse & Operations Management Platform. Empowering high-performance logistics worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#46d5ff] transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#46d5ff] transition-colors">Dashboard</Link></li>
              <li><Link to="/inventory" className="hover:text-[#46d5ff] transition-colors">Inventory</Link></li>
              <li><Link to="/orders" className="hover:text-[#46d5ff] transition-colors">Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Analytics & Support</h4>
            <ul className="space-y-2">
              <li><Link to="/analytics" className="hover:text-[#46d5ff] transition-colors">Analytics</Link></li>
              <li><Link to="/reports" className="hover:text-[#46d5ff] transition-colors">Business Reports</Link></li>
              <li><Link to="/contact" className="hover:text-[#46d5ff] transition-colors">Contact System Support</Link></li>
            </ul>
          </div>

          {/* API System Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">System Integration</h4>
            <div className="p-3.5 rounded-xl bg-[#0b1525] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>REST API Ready</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Target Endpoint: <code className="text-[#46d5ff]">{apiBase || '/api'}</code>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} VELORA Warehouse Management System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#46d5ff]" /> Enterprise Grade</span>
            <span className="inline-flex items-center gap-1"><Server className="w-3.5 h-3.5 text-emerald-400" /> MySQL Synced</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
