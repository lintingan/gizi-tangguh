export interface TargetGroup {
  id: 'A' | 'B' | 'C';
  name: string;
  category: string;
  description: string;
  vulnerabilityNote: string;
  needKg: number;
}

export interface GameScenario {
  id: string;
  name: string;
  subtitle: string;
  initialStockKg: number;
  totalNeedKg: number;
  backgroundStory: string;
  groups: TargetGroup[];
}

export interface AllocationInputs {
  A: string | number;
  B: string | number;
  C: string | number;
}

export interface AllocationValues {
  A: number;
  B: number;
  C: number;
}

export interface GroupResult {
  groupId: 'A' | 'B' | 'C';
  groupName: string;
  needKg: number;
  allocatedKg: number;
  unmetKg: number;
  percentageFulfilled: number; // 0 - 100
  statusText: string;
  badgeColor: 'emerald' | 'amber' | 'rose';
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    A?: string;
    B?: string;
    C?: string;
    total?: string;
  };
  parsedValues?: AllocationValues;
}

export interface GameOutcome {
  isDistributed: boolean;
  timestamp: string;
  totalAllocatedKg: number;
  remainingStockKg: number;
  groupResults: GroupResult[];
  finalScore: number;
  scoreCategory: 'Optimal' | 'Cukup' | 'Kritis';
  feedbackMessage: string;
  disclaimer: string;
}

export interface GameState {
  scenario: GameScenario;
  inputs: AllocationInputs;
  validation: ValidationResult;
  outcome: GameOutcome | null;
  historyCount: number;
}
