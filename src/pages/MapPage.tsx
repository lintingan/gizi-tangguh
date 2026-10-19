import React, { useState } from 'react';
import { MapContainer } from '../components/map/MapContainer';
import { FOOD_SOURCES_DATA, FoodSourcePoint } from '../data/foodSourcesData';
import { Package, ShieldAlert, Info, MapPin, Compass, AlertTriangle } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const MapPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'peta' | 'daftar'>('peta');
  const [selectedPoint, setSelectedPoint] = useState<FoodSourcePoint | null>(null);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Peta Ketahanan Pangan Spasial
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              WebGIS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visualisasi distribusi cadangan logistik dan poligon zonasi kerawanan simulasi di seluruh wilayah Indonesia.
          </p>
        </div>

        {/* View mode tabs for desktop/mobile */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('peta')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'peta'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tampilan Peta Interaktif
          </button>
          <button
            onClick={() => setActiveTab('daftar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'daftar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tabel Data Titik ({FOOD_SOURCES_DATA.length})
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'peta' ? (
        <div className="space-y-3">
          {/* Explicit Map Container */}
          <MapContainer heightClass="h-[640px] sm:h-[680px]" initialCenter={[117, -2]} initialZoom={4} />

          {/* Bottom helper card with operational note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Catatan Area Risiko:</strong> Poligon dengan garis putus-putus merah/oranye adalah{' '}
                <span className="font-extrabold uppercase">AREA RISIKO SIMULASI</span> untuk studi kasus edukasi tanggap pangan darurat.
              </span>
            </div>
            <span className="text-[11px] text-amber-800 font-medium">
              Sumber gaya: OpenFreeMap Liberty (Vector Tiles)
            </span>
          </div>
        </div>
      ) : (
        /* Tabular View of all 8 Food Source demo points */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Daftar Simpul Cadangan Pangan Demo ({FOOD_SOURCES_DATA.length} Titik)
              </h2>
              <p className="text-xs text-slate-500">
                Seluruh data di bawah ini digunakan secara konsisten pada peta dan dashboard.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md">
              {APP_CONFIG.datasetStatus}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/70 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">ID & Nama Simpul</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Wilayah</th>
                  <th className="px-4 py-3">Koordinat [Lng, Lat]</th>
                  <th className="px-4 py-3">Estimasi Kapasitas</th>
                  <th className="px-4 py-3">Status Operasional</th>
                  <th className="px-4 py-3">Status Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {FOOD_SOURCES_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <div>{item.name}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{item.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.category === 'Lumbung Karbohidrat'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.category === 'Gudang Penyangga Regional'
                            ? 'bg-blue-100 text-blue-800'
                            : item.category === 'Depo Logistik Darurat'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.region}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-600">
                      [{item.longitude.toFixed(4)}, {item.latitude.toFixed(4)}]
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {item.capacity.toLocaleString('id-ID')} {item.unit}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.operationalStatus === 'Siaga Penuh'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.operationalStatus === 'Operasional Terbatas'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {item.operationalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-amber-800 font-bold">
                      {item.dataStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
