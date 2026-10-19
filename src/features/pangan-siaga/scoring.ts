import { AllocationValues, GameOutcome, GameScenario, GroupResult } from './types';

/**
 * Calculates fulfilled percentages and final simulation score according to required specification:
 * - Group % fulfilled = Math.min(100, Math.round((allocated / need) * 100 * 10) / 10)
 * - Final score = Math.round((%A + %B + %C) / 3)
 * - Score explanation: "Skor simulasi distribusi, bukan ukuran kecukupan gizi klinis."
 */
export function calculateScoreAndOutcome(
  allocations: AllocationValues,
  scenario: GameScenario
): GameOutcome {
  const groupResults: GroupResult[] = scenario.groups.map((group) => {
    const allocated = allocations[group.id] || 0;
    const need = group.needKg;
    const unmet = Math.max(0, need - allocated);

    // Percentage of need fulfilled, capped at 100%
    const rawPct = need > 0 ? (allocated / need) * 100 : 100;
    const percentageFulfilled = Math.min(100, Math.round(rawPct * 10) / 10);

    let statusText = '';
    let badgeColor: 'emerald' | 'amber' | 'rose' = 'amber';

    if (allocated === 0) {
      statusText = 'Tidak dialokasikan (0 kg) — posko ini tidak mendapatkan bantuan pada putaran ini.';
      badgeColor = 'rose';
    } else if (percentageFulfilled >= 100) {
      statusText = '100% terpenuhi penuh sesuai kapasitas kebutuhan.';
      badgeColor = 'emerald';
    } else if (percentageFulfilled >= 70) {
      statusText = `Terpenuhi sebagian (${percentageFulfilled}%). Defisit ${unmet} kg.`;
      badgeColor = 'amber';
    } else {
      statusText = `Tingkat pemenuhan rendah (${percentageFulfilled}%). Kekurangan ${unmet} kg kritis.`;
      badgeColor = 'rose';
    }

    return {
      groupId: group.id,
      groupName: group.name,
      needKg: need,
      allocatedKg: allocated,
      unmetKg: unmet,
      percentageFulfilled,
      statusText,
      badgeColor,
    };
  });

  const totalAllocatedKg = allocations.A + allocations.B + allocations.C;
  const remainingStockKg = scenario.initialStockKg - totalAllocatedKg;

  // Final score: average of percentage fulfilled for all 3 groups, rounded to nearest integer
  const sumPercentages = groupResults.reduce((acc, g) => acc + g.percentageFulfilled, 0);
  const finalScore = Math.round(sumPercentages / (groupResults.length || 1));

  let scoreCategory: 'Optimal' | 'Cukup' | 'Kritis' = 'Cukup';
  let feedbackMessage = '';

  if (finalScore >= 80) {
    scoreCategory = 'Optimal';
    feedbackMessage =
      'Strategi distribusi sangat seimbang! Prioritas logistik tersalurkan merata dengan memanfaatkan kapasitas cadangan secara maksimal.';
  } else if (finalScore >= 60) {
    scoreCategory = 'Cukup';
    feedbackMessage =
      'Distribusi cukup terarah, namun beberapa posko mengalami defisit pasokan yang cukup terasa. Perhatikan kelompok rentan balita dan ibu hamil.';
  } else {
    scoreCategory = 'Kritis';
    feedbackMessage =
      'Penyaluran masih kurang merata atau cadangan tidak dimanfaatkan secara optimal. Masih terdapat posko dengan defisit pangan yang tinggi.';
  }

  return {
    isDistributed: true,
    timestamp: new Date().toLocaleTimeString('id-ID'),
    totalAllocatedKg,
    remainingStockKg,
    groupResults,
    finalScore,
    scoreCategory,
    feedbackMessage,
    disclaimer:
      'Catatan Edukasi: Skor di atas merupakan skor simulasi alokasi logistik operasional darurat, bukan standar kecukupan asupan gizi klinis maupun indikator medis resmi.',
  };
}
