import { createStore } from "redux";

export interface DiaryEntry {
  date: Date;
  whatHappened: string;
  wentWell: string;
  couldBeImproved: string;
  notWell: string;
  risk: string;
}

export const buildDiaryEntry = (
  overrides: Partial<DiaryEntry> = {}
): DiaryEntry => ({
  date: new Date(),
  whatHappened: "",
  wentWell: "",
  couldBeImproved: "",
  notWell: "",
  risk: "",
  ...overrides,
});

export interface AppState {
  date: Date;
  entries: DiaryEntry[];
}

export const buildState = (overrides: Partial<AppState> = {}): AppState => ({
  date: new Date(),
  entries: [],
  ...overrides,
});

export const rootReducer = (state: AppState | undefined, action) =>
  state || buildState();

export const store = createStore(rootReducer);
