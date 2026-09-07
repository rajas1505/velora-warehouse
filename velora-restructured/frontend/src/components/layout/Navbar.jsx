import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Boxes, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Orders', path: '/orders' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Reports', path: '/reports' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#238cff] to-[#46d5ff] flex items-center justify-center text-white shadow-[0_0_20px_rgba(35,140,255,0.4)] group-hover:scale-105 transition-transform duration-300">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-white font-['Poppins']">
                VELORA
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-[#46d5ff] -mt-1">
                WMS Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0b1525]/60 p-1.5 rounded-full border border-white/5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-[#238cff]/20 to-[#46d5ff]/20 border border-[#238cff]/40 shadow-[0_0_15px_rgba(35,140,255,0.25)] font-semibold'
                      : 'text-[#b9c7dd] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="primary"
              size="sm"
              icon={ArrowRight}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-[#182331] text-[#b9c7dd] hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#07111f]/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'text-white bg-[#238cff]/20 border border-[#238cff]/40 font-semibold'
                      : 'text-[#b9c7dd] hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10">
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/dashboard');
                }}
                variant="primary"
                className="w-full justify-center"
                icon={ArrowRight}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
