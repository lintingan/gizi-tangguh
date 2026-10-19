import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  ShieldAlert,
  ArrowRight,
  Gamepad2,
  MapPin,
  Info,
  Database,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { FOOD_SOURCES_DATA, RISK_SIMULATION_AREAS } from '../data/foodSourcesData';
import { APP_CONFIG } from '../config/appConfig';
import { MapContainer } from '../components/map/MapContainer';

export const DashboardPage: React.FC = () => {
  const totalFoodSources = FOOD_SOURCES_DATA.length;
  const totalCapacityTon = FOOD_SOURCES_DATA.reduce((sum, item) => sum + item.capacity, 0);
  const totalRiskAreas = RISK_SIMULATION_AREAS.length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome & Scenario Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-extrabold tracking-wide uppercase shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>DATA SIMULASI — BUKAN DATA RESMI</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Edukasi Spasial Ketahanan Pangan & Logistik Siaga Bencana
          </h1>

          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Selamat datang di <strong>GiziTangguh Play</strong>. Platform prototipe WebGIS interaktif yang
            mengintegrasikan pemetaan titik cadangan logistik pangan, simulasi zonasi kerentanan wilayah, dan game
            pengambilan keputusan alokasi pangan gizi seimbang saat darurat.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/peta"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm shadow-md transition"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Jelajahi Peta WebGIS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/pangan-siaga"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition border border-emerald-400/40"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mainkan Game Pangan Siaga</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards derived purely from the demo dataset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Jumlah Titik Sumber Pangan */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sumber Pangan Demo
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {totalFoodSources}{' '}
            <span className="text-xs font-semibold text-slate-500 font-normal">Titik GeoJSON</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tersebar di 8 simpul koordinat simulasi Indonesia.
          </p>
        </div>

        {/* Card 2: Total Kapasitas Demo */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Kapasitas Cadangan
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {totalCapacityTon.toLocaleString('id-ID')}{' '}
            <span className="text-xs font-semibold text-slate-500 font-normal">Ton Simulasi</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Estimasi volume gabungan beras, protein, & cadangan.
          </p>
        </div>

        {/* Card 3: Area Risiko Simulasi */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-amber-300 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Zona Risiko Simulasi
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-900 tracking-tight">
            {totalRiskAreas}{' '}
            <span className="text-xs font-semibold text-slate-500 font-normal">Poligon Simulasi</span>
          </div>
          <p className="text-xs text-amber-800/80 mt-1">
            Skenario banjir pesisir, sesar gempa, & anomali iklim.
          </p>
        </div>

        {/* Card 4: Status Konfigurasi Prototipe */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Status Dataset
            </span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 truncate">
            {APP_CONFIG.datasetStatus}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Wilayah riset: <strong className="text-slate-700">{APP_CONFIG.researchArea}</strong>
          </p>
        </div>
      </div>

      {/* Map Preview Section */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Pratinjau Peta Spasial Indonesia
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                MapLibre GL JS
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Peta interaktif berbasis OpenFreeMap dengan layer marker sumber pangan dan poligon area risiko simulasi.
            </p>
          </div>

          <Link
            to="/peta"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold transition border border-emerald-200"
          >
            <span>Buka Layar Peta Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Map Container preview */}
        <MapContainer heightClass="h-[460px]" initialCenter={[117, -2]} initialZoom={4} />

        {/* Notice underneath */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Klik marker titik pada peta untuk melihat estimasi kapasitas dan rincian logistik.</span>
          </div>
          <span className="text-amber-800 font-semibold text-[11px]">
            * Data titik dan zona risiko adalah model percontohan (bukan data resmi).
          </span>
        </div>
      </div>

      {/* Interactive Game Promotion Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 border border-slate-700 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Fitur Game Edukasi
              </span>
              <span className="text-xs text-slate-400">• Playable MVP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Game Simulasi: Pangan Siaga
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kamu ditugaskan mengelola cadangan logistik darurat sebanyak <strong>650 kg</strong> saat bencana. Tiga posko
              membutuhkan total <strong>800 kg</strong>. Kelompok A berisiko tinggi (ibu hamil & balita), Kelompok B
              (pengungsi umum), dan Kelompok C (dapur mandiri). Ambil keputusan alokasi terbaik sebelum stok habis!
            </p>
          </div>

          <div className="pt-5 flex items-center justify-between border-t border-slate-700/80 mt-4">
            <div className="text-xs text-slate-400">
              Uji kemampuan kepemimpinan alokasi & ketahanan gizi darurat.
            </div>
            <Link
              to="/pangan-siaga"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mulai Simulasi Sekarang</span>
            </Link>
          </div>
        </div>

        {/* Limitation & Methodology Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Transparansi Data</span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">Keterbatasan Prototipe</h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Seluruh koordinat dan stok adalah data demo terisolir.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Bukan rujukan pengambilan kebijakan tanggap darurat pemerintah.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Peta dasar disuplai oleh OpenFreeMap & OpenStreetMap.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <Link
              to="/data-metodologi"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Pelajari Sumber & Metodologi Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
