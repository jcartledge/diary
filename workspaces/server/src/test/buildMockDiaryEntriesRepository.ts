import { result } from "@diary/shared/ResultOrError";
import { Builder } from "@diary/shared/types/builder.types";
import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";
import { vi } from "vitest";

export const buildMockDiaryEntriesRepository: Builder<
  DiaryEntriesRepositoryMethods
> = (overrides = {}) => ({
  getByDate: vi.fn().mockResolvedValue(result(buildDiaryEntry())),
  save: vi.fn().mockResolvedValue(result(buildDiaryEntry())),
  ...overrides,
});
