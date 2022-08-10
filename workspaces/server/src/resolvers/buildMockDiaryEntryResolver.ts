import { result } from "@diary/shared/ResultOrError";
import { buildDiaryEntry } from "src/buildDiaryEntry";
import { DiaryEntryResolver } from "./diaryEntryResolver";

export const buildMockDiaryEntryResolver = (
  overrides: Partial<DiaryEntryResolver> = {}
): DiaryEntryResolver => ({
  getDiaryEntry: () => result(buildDiaryEntry()),
  ...overrides,
});
