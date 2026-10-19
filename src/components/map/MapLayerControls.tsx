import React from 'react';
import { Eye, EyeOff, Filter, RotateCcw, ShieldAlert, Package } from 'lucide-react';

interface MapLayerControlsProps {
  showFoodPoints: boolean;
  setShowFoodPoints: (val: boolean) => void;
  showRiskAreas: boolean;
  setShowRiskAreas: (val: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: string[];
  onResetView: () => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({
  showFoodPoints,
  setShowFoodPoints,
  showRiskAreas,
  setShowRiskAreas,
  selectedCategory,
  setSelectedCategory,
  categories,
  onResetView,
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200 p-3.5 text-xs text-slate-700 w-full sm:w-80 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
          Kontrol Lapisan Peta
        </span>
        <button
          onClick={onResetView}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 px-2 py-0.5 rounded transition"
          title="Kembalikan Tampilan Awal Indonesia"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Posisi</span>
        </button>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-2">
        <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/80 transition">
          <div className="flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-slate-800">Layer Titik Sumber Pangan</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFoodPoints(!showFoodPoints)}
            className={`p-1 rounded transition ${
              showFoodPoints ? 'text-emerald-700 bg-emerald-100' : 'text-slate-400 bg-slate-200'
            }`}
            aria-label="Toggle Titik Sumber Pangan"
          >
            {showFoodPoints ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </label>

        <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/80 transition">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <div>
              <span className="font-medium text-slate-800 block leading-tight">
                Layer Area Risiko
              </span>
              <span className="text-[10px] text-amber-700 font-medium">AREA RISIKO SIMULASI</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowRiskAreas(!showRiskAreas)}
            className={`p-1 rounded transition ${
              showRiskAreas ? 'text-amber-800 bg-amber-100' : 'text-slate-400 bg-slate-200'
            }`}
            aria-label="Toggle Area Risiko Simulasi"
          >
            {showRiskAreas ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </label>
      </div>

      {/* Category Filter */}
      {showFoodPoints && (
        <div className="border-t border-slate-100 pt-2 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <Filter className="w-3 h-3 text-slate-400" />
            <span>Filter Kategori Sumber Pangan:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
          >
            <option value="ALL">Semua Kategori ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
