import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { SimulationBanner } from '../common/SimulationBanner';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Banner Alert regarding simulation status */}
      <SimulationBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 z-30 md:hidden backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />
        )}

        {/* Sidebar Component */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>

          <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>
                <strong className="text-slate-700">GiziTangguh Play</strong> — Prototipe WebGIS Ketahanan Pangan & Simulasi Distribusi Logistik Bencana.
              </p>
              <p className="text-amber-800 font-medium">
                Peringatan: Seluruh data, koordinat, dan angka bersifat fiktif edukasi.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
