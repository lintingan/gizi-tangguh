import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { FOOD_SOURCES_DATA, RISK_SIMULATION_AREAS } from '../data/foodSourcesData';
import {
  Database,
  ShieldAlert,
  Sliders,
  Scale,
  MapPin,
  ExternalLink,
  Info,
  CheckCircle2,
  FileCode2,
} from 'lucide-react';

export const DataMetodologiPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Scope */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
          <Database className="w-4 h-4" />
          <span>Transparansi & Tata Kelola Data</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Informasi Data & Metodologi Prototipe
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Halaman ini mendokumentasikan spesifikasi dataset, sumber peta, definisi satuan, konfigurasi riset,
          serta batas legalitas model yang digunakan di dalam prototipe <strong>GiziTangguh Play</strong>.
        </p>
      </div>

      {/* Project Configuration Card (Readily configurable) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sliders className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">
            Parameter Konfigurasi Prototipe
          </h2>
          <span className="text-[11px] text-slate-400 font-mono ml-auto">
            src/config/appConfig.ts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Wilayah Penelitian
            </span>
            <span className="font-bold text-slate-900 text-sm">{APP_CONFIG.researchArea}</span>
            <p className="text-[10px] text-slate-500 mt-1">Dapat disesuaikan per wilayah studi kasus.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Jenis Bencana
            </span>
            <span className="font-bold text-amber-700 text-sm">{APP_CONFIG.disasterType}</span>
            <p className="text-[10px] text-slate-500 mt-1">Skenario bahaya fleksibel.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Status Dataset
            </span>
            <span className="font-bold text-emerald-700 text-sm">{APP_CONFIG.datasetStatus}</span>
            <p className="text-[10px] text-slate-500 mt-1">Data tiruan terstruktur.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Sumber Data Utama
            </span>
            <span className="font-bold text-slate-900 text-sm">{APP_CONFIG.dataSource}</span>
            <p className="text-[10px] text-slate-500 mt-1">Tersimpan lokal di GeoJSON.</p>
          </div>
        </div>
      </div>

      {/* Data Dictionary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileCode2 className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">
            Kamus Data Titik Sumber Pangan (GeoJSON Schema)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-2.5">Nama Properti</th>
                <th className="px-4 py-2.5">Tipe Data</th>
                <th className="px-4 py-2.5">Contoh Nilai</th>
                <th className="px-4 py-2.5">Deskripsi Peran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              <tr>
                <td className="px-4 py-2.5 font-mono font-semibold text-emerald-800">id</td>
                <td className="px-4 py-2.5 text-slate-500 font-mono">string</td>
                <td className="px-4 py-2.5 font-mono">"FS-01"</td>
                <td className="px-4 py-2.5">Identifikator unik simpul pangan simulasi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-semibold text-emerald-800">name</td>
                <td className="px-4 py-2.5 text-slate-500 font-mono">string</td>
                <td className="px-4 py-2.5">"Gudang Penyangga Simulasi Jawa Barat"</td>
                <td className="px-4 py-2.5">Label nama fasilitas dengan penanda tegas kata 'Simulasi'.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-semibold text-emerald-800">category</td>
                <td className="px-4 py-2.5 text-slate-500 font-mono">string enum</td>
                <td className="px-4 py-2.5">"Lumbung Karbohidrat", "Depo Logistik Darurat"</td>
                <td className="px-4 py-2.5">Klasifikasi fungsi logistik dalam rantai suplai gizi.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-semibold text-emerald-800">longitude, latitude</td>
                <td className="px-4 py-2.5 text-slate-500 font-mono">number [lng, lat]</td>
                <td className="px-4 py-2.5 font-mono">107.6191, -6.9175</td>
                <td className="px-4 py-2.5">Koordinat spasial desimal (WGS84).</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-semibold text-emerald-800">capacity, unit</td>
                <td className="px-4 py-2.5 text-slate-500 font-mono">number, string</td>
                <td className="px-4 py-2.5 font-mono">1200, "Ton"</td>
                <td className="px-4 py-2.5">Volume stok simulasi yang dapat ditampung.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono font-semibold text-emerald-800">dataStatus</td>
                <td className="px-4 py-2.5 text-slate-500 font-mono">string literal</td>
                <td className="px-4 py-2.5 font-bold text-amber-700">"DATA SIMULASI — DEMO"</td>
                <td className="px-4 py-2.5">Pernyataan status validitas data.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Basemap Attribution & Licensing */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">
            Peta Dasar & Atribusi Hak Cipta
          </h2>
        </div>

        <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
          <p>
            Aplikasi ini menggunakan teknologi <strong>MapLibre GL JS</strong> (engine rendering WebGL/WebGPU open-source)
            dan gaya peta dasar vektor <strong>OpenFreeMap Liberty Style</strong>:
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 break-all">
            https://tiles.openfreemap.org/styles/liberty
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <strong className="block text-slate-900 font-bold mb-1">OpenFreeMap</strong>
              <p className="text-[11px] text-slate-500">
                Penyedia tile peta gratis tanpa registrasi API key untuk purwarupa dan riset publik.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
              <strong className="block text-slate-900 font-bold mb-1">OpenStreetMap</strong>
              <p className="text-[11px] text-slate-500">
                Data peta kontributor dunia berlisensi Open Data Commons Open Database License (ODbL).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formal Legal & Educational Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 text-amber-950 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          <span>Deklarasi Keterbatasan & Batas Tanggung Jawab</span>
        </div>

        <h3 className="text-base font-bold text-amber-950">
          DATA SIMULASI — BUKAN DATA RESMI PEMERINTAH
        </h3>

        <ul className="text-xs space-y-2 text-amber-900/90 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              Aplikasi ini tidak mewakili, tidak terafiliasi secara resmi, dan tidak diverifikasi oleh Badan Nasional Penanggulangan Bencana (BNPB), Badan Pangan Nasional (Bapanas), Kementerian Kesehatan, maupun institusi pemerintah lainnya.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              Poligon dengan label <strong>"AREA RISIKO SIMULASI"</strong> dibuat semata-mata sebagai konteks skenario latihan perencana logistik, bukan peta zonasi kerentanan geologis ataupun batas evakuasi bencana resmi.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">•</span>
            <span>
              Skor pada mini-game <strong>Pangan Siaga</strong> merupakan refleksi matematis atas rasio pembagian kuota stok terbatas, bukan pedoman klinis kebutuhan Angka Kecukupan Gizi (AKG) individu.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
