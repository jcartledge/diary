import { result, withError, withResult } from "@diary/shared/ResultOrError";
import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { describe, expect, it, vi } from "vitest";
import { buildMockDiaryEntriesRepository } from "../repositories/buildMockDiaryEntriesRepository";
import { DiaryEntriesResolver } from "./diaryEntriesResolver";

describe("getDiaryEntry", () => {
  it("returns a diaryEntry if found", async () => {
    const diaryEntry = buildDiaryEntry();
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDate: vi.fn().mockResolvedValue(result(diaryEntry)),
      })
    );

    const resultOfGet = await resolver.getDiaryEntry("");

    withResult(resultOfGet, (resultDiaryEntry) =>
      expect(resultDiaryEntry).toBe(diaryEntry)
    );
    withError(resultOfGet, ({ message }) => expect.fail(message));
  });

  it("returns an error if the repository throws", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDate: vi.fn().mockResolvedValue(new Error("test error")),
      })
    );

    const resultOfGet = await resolver.getDiaryEntry("");
    withResult(resultOfGet, () => expect.fail("error expected, result found!"));
    withError(resultOfGet, ({ message }) =>
      expect(message).toEqual("test error")
    );
  });
});

describe("postDiaryEntry", () => {
  it("returns diaryEntry if one is found", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        save: vi.fn((diaryEntry) => Promise.resolve(result(diaryEntry))),
      })
    );
    const diaryEntry = buildDiaryEntry();

    const resultOfPost = await resolver.postDiaryEntry(diaryEntry);

    withResult(resultOfPost, (resultDiaryEntry) =>
      expect(resultDiaryEntry).toEqual(diaryEntry)
    );
    withError(resultOfPost, ({ message }) => expect.fail(message));
  });

  it("returns an error if the repository throws", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        save: vi.fn().mockResolvedValue(new Error("test error 2")),
      })
    );
    const diaryEntry = buildDiaryEntry();

    const resultOfPost = await resolver.postDiaryEntry(diaryEntry);

    withResult(resultOfPost, () =>
      expect.fail("error expected, result found!")
    );
    withError(resultOfPost, ({ message }) =>
      expect(message).toEqual("test error 2")
    );
  });
});
