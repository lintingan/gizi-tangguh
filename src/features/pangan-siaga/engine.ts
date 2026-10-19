import { DEFAULT_SCENARIO, validateAllocations } from './rules';
import { calculateScoreAndOutcome } from './scoring';
import { AllocationInputs, GameOutcome, GameScenario, GameState, ValidationResult } from './types';

export const INITIAL_INPUTS: AllocationInputs = {
  A: '',
  B: '',
  C: '',
};

export const INITIAL_VALIDATION: ValidationResult = {
  isValid: false,
  errors: {},
};

export function createInitialGameState(scenario: GameScenario = DEFAULT_SCENARIO): GameState {
  return {
    scenario,
    inputs: { ...INITIAL_INPUTS },
    validation: { ...INITIAL_VALIDATION },
    outcome: null,
    historyCount: 0,
  };
}

/**
 * Handles input changes and runs validation without changing outcome until distributed.
 */
export function handleInputChange(
  currentState: GameState,
  field: 'A' | 'B' | 'C',
  value: string
): GameState {
  const newInputs = {
    ...currentState.inputs,
    [field]: value,
  };

  const validation = validateAllocations(newInputs, currentState.scenario);

  return {
    ...currentState,
    inputs: newInputs,
    validation,
  };
}

/**
 * Distribute action:
 * Validates inputs strictly. If valid, computes outcome and updates state.
 * If invalid, does NOT change stock or score.
 */
export function executeDistribution(currentState: GameState): {
  success: boolean;
  newState: GameState;
  errorMessage?: string;
} {
  const validation = validateAllocations(currentState.inputs, currentState.scenario);

  if (!validation.isValid || !validation.parsedValues) {
    return {
      success: false,
      newState: {
        ...currentState,
        validation,
      },
      errorMessage: 'Alokasi belum valid. Silakan periksa pesan kesalahan pada formulir.',
    };
  }

  const outcome: GameOutcome = calculateScoreAndOutcome(
    validation.parsedValues,
    currentState.scenario
  );

  return {
    success: true,
    newState: {
      ...currentState,
      validation,
      outcome,
      historyCount: currentState.historyCount + 1,
    },
  };
}

/**
 * Resets the game back to initial state while retaining the scenario.
 */
export function resetGameState(currentState: GameState): GameState {
  return {
    ...createInitialGameState(currentState.scenario),
    historyCount: currentState.historyCount,
  };
}
