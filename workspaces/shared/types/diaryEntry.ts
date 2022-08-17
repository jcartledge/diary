import { z } from "zod";

export const DiaryEntrySchema = z.object({
  couldBeImproved: z.string(),
  date: z.string(),
  notWell: z.string(),
  risk: z.string(),
  wentWell: z.string(),
  whatHappened: z.string(),
});

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;

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
