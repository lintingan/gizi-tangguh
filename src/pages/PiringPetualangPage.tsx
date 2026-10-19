import React from 'react';
import { UtensilsCrossed, Clock, Sparkles, HeartPulse, Apple, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PiringPetualangPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Segera Hadir</span>
                </span>
                <span className="text-xs text-slate-400">Rencana Modul #2</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Piring Petualang
              </h1>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-auto">
            <span>Fase Pengembangan: Desain Konsep</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Piring Petualang</strong> adalah mini-game kedua dalam roadmap ekosistem edukasi <em>GiziTangguh Play</em>.
          Jika pada <strong>Pangan Siaga</strong> kamu berperan sebagai perencana makro-logistik bantuan darurat, pada modul ini kamu akan
          diajak meracik komposisi menu gizi seimbang harian (<em>Isi Piringku</em>) bagi penyintas bencana berdasarkan bahan pangan lokal yang tersedia di posko.
        </p>
      </div>

      {/* Feature Concept Cards Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
            <Apple className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Prinsip Isi Piringku</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menyeimbangkan karbohidrat kompleks, protein hewani/nabati, serat sayur, dan buah dalam keterbatasan bahan ransum darurat.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Gizi Kelompok Khusus</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tantangan khusus menyusun MP-ASI padat zat besi untuk balita dan nutrisi penunjang laktasi bagi ibu menyusui di barak pengungsian.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Diversifikasi Pangan Lokal</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mengintegrasikan umbi lokal, sagu, jagung, dan ikan tangkapan lokal sebagai substitusi adaptif beras impor.
          </p>
        </div>
      </div>

      {/* Development Status Notice */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-purple-300 font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Fokus MVP Tahap Pertama</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            Ingin Menguji Logika Distribusi Sekarang?
          </h4>
          <p className="text-xs text-slate-300 max-w-xl">
            Sesuai ruang lingkup tahap awal, game <strong>Pangan Siaga</strong> telah aktif sepenuhnya dan dapat dimainkan untuk menguji pengambilan keputusan alokasi 650 kg stok pangan darurat.
          </p>
        </div>

        <Link
          to="/pangan-siaga"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition shadow-md shrink-0"
        >
          <span>Buka Game Pangan Siaga</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
