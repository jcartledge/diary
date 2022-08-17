export type DiaryEntry = {
  couldBeImproved: string;
  date: string;
  notWell: string;
  risk: string;
  wentWell: string;
  whatHappened: string;
};

export const buildDiaryEntry = (
  overrides: Partial<DiaryEntry> = {}
): DiaryEntry => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
