import React from 'react';
import { Menu, ShieldCheck, MapPin, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { APP_CONFIG } from '../../config/appConfig';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const location = useLocation();

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Dashboard Ketahanan Pangan';
      case '/peta':
        return 'Peta Sumber Pangan & Risiko';
      case '/pangan-siaga':
        return 'Simulasi Game: Pangan Siaga';
      case '/piring-petualang':
        return 'Mini-Game: Piring Petualang';
      case '/data-metodologi':
        return 'Informasi Data & Metodologi';
      default:
        return APP_CONFIG.appName;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="md:hidden w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
              {getPageTitle(location.pathname)}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>GiziTangguh Play</span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-amber-700 font-medium">Simulasi Edukatif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/peta"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
        >
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="hidden sm:inline">Lihat</span> Peta
        </Link>
        <Link
          to="/pangan-siaga"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-xs"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Main Pangan Siaga</span>
        </Link>
      </div>
    </header>
  );
};
