import React, { useState } from 'react';
import {
  createInitialGameState,
  executeDistribution,
  handleInputChange,
  resetGameState,
} from '../features/pangan-siaga/engine';
import {
  Gamepad2,
  RotateCcw,
  Send,
  AlertCircle,
  CheckCircle2,
  Info,
  ShieldAlert,
  Flame,
  Award,
  Users,
  PackageCheck,
  TrendingUp,
} from 'lucide-react';

export const PanganSiagaPage: React.FC = () => {
  const [gameState, setGameState] = useState(() => createInitialGameState());
  const [alertFeedback, setAlertFeedback] = useState<string | null>(null);

  const scenario = gameState.scenario;
  const outcome = gameState.outcome;
  const validation = gameState.validation;

  const currentA = Number(gameState.inputs.A) || 0;
  const currentB = Number(gameState.inputs.B) || 0;
  const currentC = Number(gameState.inputs.C) || 0;
  const currentTotal = currentA + currentB + currentC;
  const remainingCalculated = scenario.initialStockKg - currentTotal;

  const handleFieldChange = (field: 'A' | 'B' | 'C', val: string) => {
    setAlertFeedback(null);
    setGameState((prev) => handleInputChange(prev, field, val));
  };

  const handleQuickFill = (a: number, b: number, c: number) => {
    setAlertFeedback(null);
    let st = handleInputChange(gameState, 'A', String(a));
    st = handleInputChange(st, 'B', String(b));
    st = handleInputChange(st, 'C', String(c));
    setGameState(st);
  };

  const handleDistribute = (e: React.FormEvent) => {
    e.preventDefault();
    const result = executeDistribution(gameState);
    setGameState(result.newState);

    if (!result.success) {
      setAlertFeedback(result.errorMessage || 'Alokasi belum valid. Silakan periksa pesan error.');
    } else {
      setAlertFeedback(null);
    }
  };

  const handleReset = () => {
    setGameState((prev) => resetGameState(prev));
    setAlertFeedback(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner Disclaimer */}
      <div className="bg-amber-100 border border-amber-300 rounded-xl p-3.5 flex items-center justify-between gap-3 text-amber-900 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Simulasi Edukatif:</strong> Seluruh angka stok, kebutuhan posko, dan skor di bawah ini adalah
            parameter fiktif simulasi pengajaran, bukan standar gizi klinis atau data kedaruratan riil.
          </span>
        </div>
        <span className="font-mono font-bold text-[11px] bg-amber-200/80 px-2 py-0.5 rounded text-amber-950 shrink-0">
          DATA SIMULASI
        </span>
      </div>

      {/* Game Title & Scenario Introduction */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <Gamepad2 className="w-4 h-4" />
              <span>Mini-Game Pengambilan Keputusan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {scenario.name}
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1">{scenario.subtitle}</p>
          </div>

          <div className="text-right self-start sm:self-auto bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">Siklus Bermain</span>
            <span className="text-sm font-bold text-slate-700">Putaran #{gameState.historyCount + 1}</span>
          </div>
        </div>

        {/* Scenario Background Box */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-bold text-emerald-900 text-xs sm:text-sm flex items-center gap-1.5 mb-1.5">
            <Flame className="w-4 h-4 text-emerald-700" />
            <span>Latar Belakang Skenario Darurat:</span>
          </h2>
          <p>{scenario.backgroundStory}</p>
        </div>

        {/* Global Metric Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xs">
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
              Stok Awal Tersedia
            </span>
            <div className="text-2xl font-black mt-1 text-emerald-400">
              {scenario.initialStockKg}{' '}
              <span className="text-sm font-normal text-slate-300">kg</span>
            </div>
            <span className="text-[10px] text-slate-400">Gudang logistik darurat</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider block">
              Total Kebutuhan Posko
            </span>
            <div className="text-2xl font-black mt-1 text-slate-900">
              {scenario.totalNeedKg}{' '}
              <span className="text-sm font-normal text-slate-500">kg</span>
            </div>
            <span className="text-[10px] text-rose-600 font-semibold">
              Defisit Pangan: {scenario.totalNeedKg - scenario.initialStockKg} kg
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border transition ${
              remainingCalculated < 0
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <span className="text-[11px] uppercase font-bold tracking-wider block text-slate-500">
              Estimasi Sisa Stok
            </span>
            <div
              className={`text-2xl font-black mt-1 ${
                remainingCalculated < 0 ? 'text-rose-600' : 'text-emerald-800'
              }`}
            >
              {remainingCalculated} <span className="text-sm font-normal">kg</span>
            </div>
            <span className="text-[10px]">
              {remainingCalculated < 0 ? '❌ Melebihi stok!' : '✅ Dalam kapasitas'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Form */}
      <form onSubmit={handleDistribute} className="space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Langkah Alokasi Pangan per Kelompok
              </h2>
              <p className="text-xs text-slate-500">
                Tentukan jumlah kg yang disalurkan. Masukkan angka 0 jika memutuskan tidak menyalurkan.
              </p>
            </div>

            {/* Quick-fill helper buttons for quick testing / exploration */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-[11px] text-slate-400 font-medium mr-1">Rekomendasi Uji:</span>
              <button
                type="button"
                onClick={() => handleQuickFill(250, 200, 200)}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold transition"
                title="A: 250kg, B: 200kg, C: 200kg (Pas 650kg)"
              >
                Seimbang (650kg)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill(300, 200, 150)}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold transition"
                title="A: 300kg, B: 200kg, C: 150kg"
              >
                Prioritas Rentan
              </button>
            </div>
          </div>

          {/* Group Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenario.groups.map((group) => {
              const fieldKey = group.id as 'A' | 'B' | 'C';
              const error = validation.errors[fieldKey];
              const inputVal = gameState.inputs[fieldKey];
              const numVal = Number(inputVal) || 0;
              const pct = group.needKg > 0 ? Math.min(100, Math.round((numVal / group.needKg) * 100)) : 0;

              return (
                <div
                  key={group.id}
                  className={`rounded-xl border p-4 flex flex-col justify-between transition ${
                    error
                      ? 'border-rose-300 bg-rose-50/40'
                      : 'border-slate-200 bg-slate-50/50 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 uppercase">
                        Posko {group.id}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        Butuh: {group.needKg} kg
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{group.name}</h4>
                    <span className="text-[11px] font-semibold text-emerald-700 block">
                      {group.category}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{group.description}</p>
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <strong>Fokus Gizi:</strong> {group.vulnerabilityNote}
                    </p>
                  </div>

                  {/* Input field */}
                  <div className="pt-4 border-t border-slate-200 mt-4 space-y-1.5">
                    <label
                      htmlFor={`input-${group.id}`}
                      className="block text-xs font-bold text-slate-700"
                    >
                      Alokasi Pangan (kg):
                    </label>
                    <div className="relative">
                      <input
                        id={`input-${group.id}`}
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={inputVal}
                        onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                        className={`w-full px-3 py-2 text-sm font-bold rounded-lg border focus:outline-hidden focus:ring-2 ${
                          error
                            ? 'border-rose-400 bg-white text-rose-900 focus:ring-rose-400'
                            : 'border-slate-300 bg-white text-slate-900 focus:ring-emerald-500'
                        }`}
                      />
                      <span className="absolute right-3 top-2 text-xs text-slate-400 font-medium pointer-events-none">
                        kg
                      </span>
                    </div>

                    {/* Progress Bar of allocation vs need */}
                    <div className="pt-1">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                        <span>Pemenuhan: {pct}%</span>
                        <span>Maks: {group.needKg} kg</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pct >= 100 ? 'bg-emerald-600' : pct >= 60 ? 'bg-amber-500' : 'bg-slate-400'
                          }`}
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                    </div>

                    {/* Field error message */}
                    {error && (
                      <div className="flex items-start gap-1 text-[11px] font-semibold text-rose-600 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Validation Error Banner */}
          {validation.errors.total && (
            <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-xl text-xs font-semibold text-rose-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Total Alokasi Melebihi Batas!</p>
                <p className="font-normal mt-0.5">{validation.errors.total}</p>
              </div>
            </div>
          )}

          {/* Form action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Total yang direncanakan:{' '}
              <strong className={currentTotal > scenario.initialStockKg ? 'text-rose-600 font-bold' : 'text-slate-900 font-bold'}>
                {currentTotal} kg
              </strong>{' '}
              dari batas {scenario.initialStockKg} kg.
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Mulai Ulang</span>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Distribusikan Bantuan</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Outcome & Scoring Section (Rendered when distributed) */}
      {outcome && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 sm:p-7 shadow-lg space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Hasil Simulasi Terkalkulasi
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Ringkasan Dampak Penyaluran Pangan
                </h3>
              </div>
            </div>

            <div className="text-right self-start sm:self-auto bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
              <span className="text-[10px] text-emerald-800 uppercase font-bold block">
                Skor Simulasi Distribusi
              </span>
              <div className="text-3xl font-black text-emerald-950">
                {outcome.finalScore}{' '}
                <span className="text-sm font-semibold text-emerald-700">/ 100</span>
              </div>
            </div>
          </div>

          {/* Feedback message */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  outcome.scoreCategory === 'Optimal'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : outcome.scoreCategory === 'Cukup'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                Evaluasi: {outcome.scoreCategory}
              </span>
              <span className="text-xs text-slate-400">• Waktu simulasi: {outcome.timestamp}</span>
            </div>
            <p className="font-medium text-slate-800 leading-relaxed">{outcome.feedbackMessage}</p>
          </div>

          {/* Detailed Group Performance Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Rincian Tingkat Pemenuhan Kebutuhan Posko
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {outcome.groupResults.map((group) => (
                <div
                  key={group.groupId}
                  className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      Kelompok {group.groupId}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        group.badgeColor === 'emerald'
                          ? 'bg-emerald-100 text-emerald-800'
                          : group.badgeColor === 'amber'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {group.percentageFulfilled}% Terpenuhi
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Alokasi Diberikan:</span>
                      <strong className="text-slate-900">{group.allocatedKg} kg</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Kebutuhan:</span>
                      <span className="text-slate-700">{group.needKg} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defisit / Kekurangan:</span>
                      <span className={group.unmetKg > 0 ? 'text-rose-600 font-bold' : 'text-emerald-700'}>
                        {group.unmetKg} kg
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        group.percentageFulfilled >= 100
                          ? 'bg-emerald-600'
                          : group.percentageFulfilled >= 70
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${group.percentageFulfilled}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-tight italic">
                    {group.statusText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics summary breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-medium">Total Dialokasikan</span>
              <strong className="text-slate-900 text-sm">{outcome.totalAllocatedKg} kg</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-medium">Sisa Cadangan Gudang</span>
              <strong className="text-emerald-700 text-sm">{outcome.remainingStockKg} kg</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-medium">Rumus Skor</span>
              <span className="text-slate-700 text-[11px]">Rata-rata % 3 Kelompok</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-400 block font-medium">Batas Maks Skor</span>
              <span className="text-slate-700 text-[11px]">100 poin (dibulatkan)</span>
            </div>
          </div>

          {/* Educational Formula Explanation & Disclaimer */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Transparansi Rumus & Batasan Klinis:</span>
            </div>
            <p className="leading-relaxed">
              {outcome.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
