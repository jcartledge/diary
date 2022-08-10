import { withError, withResult } from "@diary/shared/ResultOrError";
import { Builder } from "@diary/shared/types/builder.types";
import { buildDiaryEntry } from "src/buildDiaryEntry";
import { DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";
import { describe, expect, it, vi } from "vitest";
import { DiaryEntriesResolver } from "./diaryEntriesResolver";

const buildMockDiaryEntryRepository: Builder<DiaryEntriesRepositoryMethods> = (
  overrides = {}
) => ({
  getByDate: vi.fn(),
  save: vi.fn(),
  ...overrides,
});

describe("getDiaryEntry", () => {
  it("returns a diaryEntry if found", async () => {
    const diaryEntry = buildDiaryEntry();
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntryRepository({
        getByDate: vi.fn().mockResolvedValue(diaryEntry),
      })
    );

    const result = await resolver.getDiaryEntry("");

    withResult(result, (resultDiaryEntry) =>
      expect(resultDiaryEntry).toBe(diaryEntry)
    );
    withError(result, ({ message }) => expect.fail(message));
  });

  it("returns an error if the repository throws", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntryRepository({
        getByDate: vi.fn(() => {
          throw new Error("test error");
        }),
      })
    );

    const result = await resolver.getDiaryEntry("");
    withResult(result, () => expect.fail("error expected, result found!"));
    withError(result, ({ message }) => expect(message).toEqual("test error"));
  });
});

describe("post diary entry route", () => {
  it("returns diaryEntry if one is found", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntryRepository({
        save: vi.fn((diaryEntry) => Promise.resolve(diaryEntry)),
      })
    );
    const diaryEntry = buildDiaryEntry();

    const result = await resolver.postDiaryEntry(diaryEntry);

    withResult(result, (resultDiaryEntry) =>
      expect(resultDiaryEntry).toEqual(diaryEntry)
    );
    withError(result, ({ message }) => expect.fail(message));
  });

  it("returns an error if the repository throws", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntryRepository({
        save: vi.fn(() => {
          throw new Error("test error 2");
        }),
      })
    );
    const diaryEntry = buildDiaryEntry();

    const result = await resolver.postDiaryEntry(diaryEntry);

    withResult(result, () => expect.fail("error expected, result found!"));
    withError(result, ({ message }) => expect(message).toEqual("test error 2"));
  });
});
