import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Gamepad2,
  UtensilsCrossed,
  Database,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { APP_CONFIG } from '../../config/appConfig';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/peta',
      label: 'Peta Ketahanan Pangan',
      icon: MapPin,
      badge: 'WebGIS',
    },
    {
      to: '/pangan-siaga',
      label: 'Game Pangan Siaga',
      icon: Gamepad2,
      badge: 'Playable',
    },
    {
      to: '/piring-petualang',
      label: 'Piring Petualang',
      icon: UtensilsCrossed,
      badge: 'Segera',
    },
    {
      to: '/data-metodologi',
      label: 'Data & Metodologi',
      icon: Database,
      badge: null,
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-slate-800 bg-slate-950/60 justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white leading-tight">
              GiziTangguh Play
            </h1>
            <p className="text-[10px] text-emerald-400 font-medium">
              WebGIS Edukasi Ketahanan
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Tutup Menu"
          >
            ✕
          </button>
        )}
      </div>

      {/* Simulation Watermark Badge */}
      <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>PROTOTIPE SIMULASI</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
          Data fiktif terstruktur untuk edukasi & analisis spasial.
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Menu Utama
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    item.badge === 'Playable'
                      ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                      : item.badge === 'Segera'
                      ? 'bg-slate-800 text-slate-400 border border-slate-700'
                      : 'bg-blue-900/40 text-blue-300 border border-blue-700/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Konfigurasi Prototipe
        </div>
        <div className="px-3 py-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Wilayah Penelitian</span>
            <span className="font-medium text-slate-200">{APP_CONFIG.researchArea}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Jenis Skenario</span>
            <span className="font-medium text-amber-300">{APP_CONFIG.disasterType}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Peta Dasar</span>
            <span className="font-medium text-slate-200">OpenFreeMap (Liberty)</span>
          </div>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 text-xs text-slate-400 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span>Versi: {APP_CONFIG.version}</span>
          <span className="text-emerald-400 font-semibold">Aktif</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          © {APP_CONFIG.lastUpdated} GiziTangguh Play. Proyek percontohan WebGIS gizi darurat.
        </p>
      </div>
    </aside>
  );
};
