import { result } from "@diary/shared/ResultOrError";
import { Builder } from "@diary/shared/types/builder.types";
import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { DiaryEntriesModelMethods } from "src/models/diaryEntriesModel";
import { vi } from "vitest";

export const buildMockDiaryEntriesModel: Builder<DiaryEntriesModelMethods> = (
  overrides = {}
) => ({
  getByDate: vi
    .fn()
    .mockResolvedValue(result(buildDiaryEntry({ date: "2020-11-11" }))),
  save: vi
    .fn()
    .mockResolvedValue(result(buildDiaryEntry({ date: "2020-11-11" }))),
  ...overrides,
});
