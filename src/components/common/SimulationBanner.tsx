import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { APP_CONFIG } from '../../config/appConfig';

interface SimulationBannerProps {
  compact?: boolean;
}

export const SimulationBanner: React.FC<SimulationBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <span>DATA SIMULASI — BUKAN DATA RESMI</span>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-900 uppercase">
            DATA SIMULASI — BUKAN DATA RESMI
          </span>
          <span className="hidden md:inline text-xs text-amber-800">
            • {APP_CONFIG.dataDisclaimer}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-800">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Status: {APP_CONFIG.datasetStatus} ({APP_CONFIG.dataSource})</span>
        </div>
      </div>
    </div>
  );
};
