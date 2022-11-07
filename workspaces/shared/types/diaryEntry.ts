import { isValidDate } from "iso-datestring-validator";
import { z } from "zod";

export const DiaryEntrySchema = z.object({
  couldBeImproved: z.string(),
  date: z
    .string()
    .refine(isValidDate, { message: "Not a valid ISO string date." }),
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
