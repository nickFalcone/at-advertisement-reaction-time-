export type AppState = 'start' | 'testing' | 'complete';

export type ArrowPress = 'Up' | 'Down';

export interface TestResult {
  image: string;
  arrowPress: ArrowPress;
  reactionTime: number; // in seconds
}

export interface AppContextType {
  state: AppState;
  startTest: () => void;
  results: TestResult[];
  exportResults: () => void;
}
