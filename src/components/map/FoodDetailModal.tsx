import React from 'react';
import { FoodSourcePoint } from '../../data/foodSourcesData';
import { X, MapPin, Package, AlertCircle, ShieldAlert, Compass } from 'lucide-react';

interface FoodDetailModalProps {
  foodSource: FoodSourcePoint | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ foodSource, onClose }) => {
  if (!foodSource) return null;

  return (
    <div className="absolute top-4 right-4 z-20 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 overflow-hidden transition-all animate-in fade-in slide-in-from-top-2">
      {/* Header */}
      <div className="bg-emerald-700 text-white p-4 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200">
            {foodSource.id} • {foodSource.dataStatus}
          </span>
          <h3 className="font-bold text-base mt-1 text-white leading-tight">
            {foodSource.name}
          </h3>
          <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            <span>{foodSource.region}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-600 transition"
          aria-label="Tutup Detail"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Details */}
      <div className="p-4 space-y-3.5 text-xs text-slate-700">
        {/* Status Indicator */}
        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Kategori Pangan</span>
            <span className="font-semibold text-slate-800">{foodSource.category}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Status Operasional</span>
            <span
              className={`inline-block font-semibold px-2 py-0.5 rounded text-[11px] ${
                foodSource.operationalStatus === 'Siaga Penuh'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : foodSource.operationalStatus === 'Operasional Terbatas'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {foodSource.operationalStatus}
            </span>
          </div>
        </div>

        {/* Capacity */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold mb-0.5">
              <Package className="w-3.5 h-3.5 text-emerald-600" />
              <span>Estimasi Kapasitas</span>
            </div>
            <p className="text-base font-extrabold text-emerald-950">
              {foodSource.capacity.toLocaleString('id-ID')}{' '}
              <span className="text-xs font-normal text-emerald-700">{foodSource.unit}</span>
            </p>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1 text-[11px] text-slate-600 font-semibold mb-0.5">
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>Koordinat [Lng, Lat]</span>
            </div>
            <p className="text-xs font-mono font-medium text-slate-800 mt-1">
              {foodSource.longitude.toFixed(4)}, {foodSource.latitude.toFixed(4)}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Deskripsi Titik Simulasi
          </span>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            {foodSource.description}
          </p>
        </div>

        {/* Warning limitation */}
        <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Bukan Lokasi Riil:</strong> Koordinat dan kapasitas di atas adalah model tiruan untuk melatih perencanaan spasial gizi darurat.
          </p>
        </div>
      </div>
    </div>
  );
};
