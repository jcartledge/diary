import { result, type ResultOrError } from "@diary/shared/ResultOrError";
import { buildDiaryEntry } from "src/datasources/diaryEntries";
import { DiaryEntry } from "src/resolvers-types";

export class DiaryEntryResolverError extends Error {}

export interface DiaryEntryResolver {
  getDiaryEntry: (
    arg0: string
  ) => ResultOrError<DiaryEntry, DiaryEntryResolverError>;
}

export const buildMockDiaryEntryResolver = (
  overrides: Partial<DiaryEntryResolver> = {}
): DiaryEntryResolver => ({
  getDiaryEntry: () => result(buildDiaryEntry()),
  ...overrides,
});
