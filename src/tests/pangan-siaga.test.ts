import { describe, expect, it } from 'vitest';
import {
  createInitialGameState,
  executeDistribution,
  handleInputChange,
  resetGameState,
} from '../features/pangan-siaga/engine';
import { DEFAULT_SCENARIO, validateAllocations } from '../features/pangan-siaga/rules';
import { calculateScoreAndOutcome } from '../features/pangan-siaga/scoring';

describe('Pangan Siaga Game Engine & Rules', () => {
  it('validates a correct distribution within 650 kg stock', () => {
    // A: 250 (<= 300), B: 200 (<= 250), C: 200 (<= 250) -> total: 650 kg
    const result = validateAllocations({ A: '250', B: '200', C: '200' }, DEFAULT_SCENARIO);
    expect(result.isValid).toBe(true);
    expect(result.parsedValues).toEqual({ A: 250, B: 200, C: 200 });
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('rejects allocation when sum exceeds total available stock (650 kg)', () => {
    // Total: 300 + 250 + 250 = 800 > 650 kg
    const result = validateAllocations({ A: '300', B: '250', C: '250' }, DEFAULT_SCENARIO);
    expect(result.isValid).toBe(false);
    expect(result.errors.total).toBeDefined();
    expect(result.errors.total).toContain('melebihi stok yang tersedia (650 kg)');
  });

  it('rejects negative numbers strictly', () => {
    const result = validateAllocations({ A: '-50', B: '200', C: '100' }, DEFAULT_SCENARIO);
    expect(result.isValid).toBe(false);
    expect(result.errors.A).toContain('tidak boleh bernilai negatif');
  });

  it('rejects non-numeric characters strictly', () => {
    const result = validateAllocations({ A: 'seratus', B: '200', C: '100' }, DEFAULT_SCENARIO);
    expect(result.isValid).toBe(false);
    expect(result.errors.A).toContain('harus berupa angka yang valid');
  });

  it('rejects allocation exceeding group specific need', () => {
    // Kelompok A need is 300 kg, input is 350 kg
    const result = validateAllocations({ A: '350', B: '100', C: '100' }, DEFAULT_SCENARIO);
    expect(result.isValid).toBe(false);
    expect(result.errors.A).toContain('melampaui kebutuhan maksimum');
  });

  it('allows 0 kg allocation as a conscious non-distribution decision', () => {
    const result = validateAllocations({ A: '300', B: '250', C: '0' }, DEFAULT_SCENARIO);
    expect(result.isValid).toBe(true);
    expect(result.parsedValues?.C).toBe(0);

    const outcome = calculateScoreAndOutcome(result.parsedValues!, DEFAULT_SCENARIO);
    const groupC = outcome.groupResults.find((g) => g.groupId === 'C');
    expect(groupC?.percentageFulfilled).toBe(0);
    expect(groupC?.statusText).toContain('Tidak dialokasikan (0 kg)');
  });

  it('calculates score according to exact formula: Math.round((%A + %B + %C) / 3)', () => {
    // Kelompok A need: 300, alloc: 240 -> 240/300 = 80%
    // Kelompok B need: 250, alloc: 200 -> 200/250 = 80%
    // Kelompok C need: 250, alloc: 150 -> 150/250 = 60%
    // Total alloc: 240 + 200 + 150 = 590 <= 650
    // Score average: (80 + 80 + 60) / 3 = 220 / 3 = 73.333 -> 73
    const outcome = calculateScoreAndOutcome({ A: 240, B: 200, C: 150 }, DEFAULT_SCENARIO);
    expect(outcome.finalScore).toBe(73);
    expect(outcome.remainingStockKg).toBe(650 - 590);
    expect(outcome.totalAllocatedKg).toBe(590);
  });

  it('does not allow invalid decision to change stock or produce success outcome in engine', () => {
    let state = createInitialGameState();
    state = handleInputChange(state, 'A', '400'); // exceeds need of 300
    state = handleInputChange(state, 'B', '200');
    state = handleInputChange(state, 'C', '100');

    const execution = executeDistribution(state);
    expect(execution.success).toBe(false);
    expect(execution.newState.outcome).toBeNull();
  });

  it('resets state completely back to initial clean inputs and null outcome', () => {
    let state = createInitialGameState();
    state = handleInputChange(state, 'A', '200');
    state = handleInputChange(state, 'B', '200');
    state = handleInputChange(state, 'C', '200');

    const execution = executeDistribution(state);
    expect(execution.success).toBe(true);
    expect(execution.newState.outcome).not.toBeNull();

    const resetState = resetGameState(execution.newState);
    expect(resetState.inputs.A).toBe('');
    expect(resetState.inputs.B).toBe('');
    expect(resetState.inputs.C).toBe('');
    expect(resetState.outcome).toBeNull();
    expect(resetState.validation.isValid).toBe(false);
  });
});
