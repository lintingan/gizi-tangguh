import { AllocationInputs, AllocationValues, GameScenario, ValidationResult } from './types';

export const DEFAULT_SCENARIO: GameScenario = {
  id: 'SCENARIO-01',
  name: 'Simulasi Distribusi Pangan Saat Bencana',
  subtitle: 'Keputusan Alokasi Logistik Pangan Darurat Pasca-Gempa & Banjir',
  initialStockKg: 650,
  totalNeedKg: 800,
  backgroundStory:
    'Terjadi bencana alam simulasi yang menyebabkan jalur pasokan utama terputus sementara. Gudang logistik darurat memiliki sisa cadangan pangan siap saji dan beras sebanyak 650 kg. Terdapat 3 posko pengungsian dengan total kebutuhan mendesak 800 kg. Karena stok terbatas (defisit 150 kg), kamu sebagai perencana logistik harus memprioritaskan dan mengalokasikan bantuan secara bijak.',
  groups: [
    {
      id: 'A',
      name: 'Kelompok A (Posko Balita & Ibu Hamil)',
      category: 'Kelompok Rentan Gizi Prioritas',
      description: 'Menampung balita, ibu hamil, dan lansia dengan kerentanan gizi tinggi.',
      vulnerabilityNote: 'Membutuhkan pangan padat gizi, biskuit fortified, dan beras bersih.',
      needKg: 300,
    },
    {
      id: 'B',
      name: 'Kelompok B (Posko Pengungsian Umum Wilayah 1)',
      category: 'Warga Dewasa & Anak Usia Sekolah',
      description: 'Menampung 120 jiwa warga penyintas tanpa komorbid berat.',
      vulnerabilityNote: 'Memerlukan kebutuhan kalori harian standar untuk energi.',
      needKg: 250,
    },
    {
      id: 'C',
      name: 'Kelompok C (Posko Dapur Umum Relawan & Warga Wilayah 2)',
      category: 'Dapur Umum Komunitas Mandiri',
      description: 'Dapur mandiri penyintas yang melayani distrik terisolir.',
      vulnerabilityNote: 'Bahan pokok mentah untuk dimasak bersama sesuai jadwal piket.',
      needKg: 250,
    },
  ],
};

/**
 * Validates player allocation input against scenario rules:
 * 1. Must be valid number (digits only or positive decimals)
 * 2. Negative numbers or NaN are strictly rejected
 * 3. 0 is valid (interpreted as decision to not distribute to that group)
 * 4. Sum of all allocations must not exceed initialStockKg (650 kg)
 * 5. Allocation per group must not exceed that group's specific need
 */
export function validateAllocations(
  inputs: AllocationInputs,
  scenario: GameScenario = DEFAULT_SCENARIO
): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  const parseField = (val: string | number, fieldName: 'A' | 'B' | 'C'): number | null => {
    if (val === '' || val === null || val === undefined) {
      errors[fieldName] = `Jumlah alokasi ${fieldName} wajib diisi (minimal 0 kg).`;
      return null;
    }

    const strVal = String(val).trim();
    // Check if contains invalid characters
    if (!/^-?\d+(\.\d+)?$/.test(strVal)) {
      errors[fieldName] = `Input ${fieldName} harus berupa angka yang valid.`;
      return null;
    }

    const num = Number(strVal);

    if (isNaN(num)) {
      errors[fieldName] = `Input ${fieldName} tidak valid.`;
      return null;
    }

    if (num < 0) {
      errors[fieldName] = `Alokasi tidak boleh bernilai negatif (ditemukan: ${num} kg).`;
      return null;
    }

    const groupDef = scenario.groups.find((g) => g.id === fieldName);
    if (groupDef && num > groupDef.needKg) {
      errors[fieldName] = `Alokasi (${num} kg) melampaui kebutuhan maksimum kelompok ini (${groupDef.needKg} kg).`;
      return null;
    }

    return num;
  };

  const aVal = parseField(inputs.A, 'A');
  const bVal = parseField(inputs.B, 'B');
  const cVal = parseField(inputs.C, 'C');

  if (aVal === null || bVal === null || cVal === null) {
    return {
      isValid: false,
      errors,
    };
  }

  const parsedValues: AllocationValues = {
    A: aVal,
    B: bVal,
    C: cVal,
  };

  const totalAllocated = parsedValues.A + parsedValues.B + parsedValues.C;

  if (totalAllocated > scenario.initialStockKg) {
    errors.total = `Total alokasi (${totalAllocated} kg) melebihi stok yang tersedia (${scenario.initialStockKg} kg). Kelebihan: ${totalAllocated - scenario.initialStockKg} kg.`;
    return {
      isValid: false,
      errors,
      parsedValues,
    };
  }

  return {
    isValid: true,
    errors: {},
    parsedValues,
  };
}
