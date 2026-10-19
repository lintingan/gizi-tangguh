import React from 'react';
import { Layers, AlertTriangle } from 'lucide-react';

export const MapLegend: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur-xs rounded-xl shadow-md border border-slate-200 p-3.5 text-xs text-slate-700 w-64 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Legenda Simbologi</span>
        </div>
        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
          GeoJSON
        </span>
      </div>

      {/* Titik Sumber Pangan */}
      <div>
        <span className="text-[10px] font-semibold text-slate-500 block uppercase mb-1.5">
          Titik Sumber Pangan (Simulasi)
        </span>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-xs shrink-0" />
            <span className="text-[11px] text-slate-700">Lumbung Karbohidrat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs shrink-0" />
            <span className="text-[11px] text-slate-700">Gudang Penyangga Regional</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-xs shrink-0" />
            <span className="text-[11px] text-slate-700">Depo Logistik Darurat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-600 border-2 border-white shadow-xs shrink-0" />
            <span className="text-[11px] text-slate-700">Sentra Protein & Sayur</span>
          </div>
        </div>
      </div>

      {/* Area Risiko Simulasi */}
      <div className="border-t border-slate-100 pt-2">
        <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-800 mb-1.5">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>AREA RISIKO SIMULASI</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-4 h-2.5 rounded-xs bg-red-500/40 border border-red-600 shrink-0" />
            <span className="text-[11px] text-slate-700">Risiko Tinggi (Simulasi Banjir Rob)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-2.5 rounded-xs bg-amber-500/40 border border-amber-600 shrink-0" />
            <span className="text-[11px] text-slate-700">Risiko Sedang (Simulasi Sesar Tektonik / Kering)</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-1.5 leading-tight italic">
        * Bukan zona bahaya resmi pemerintah.
      </div>
    </div>
  );
};
