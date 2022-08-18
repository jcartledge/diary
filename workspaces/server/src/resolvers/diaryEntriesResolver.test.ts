import { result, withError, withResult } from "@diary/shared/ResultOrError";
import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { describe, expect, it, vi } from "vitest";
import { buildMockDiaryEntriesRepository } from "../repositories/buildMockDiaryEntriesRepository";
import { DiaryEntriesResolver } from "./diaryEntriesResolver";

describe("getDiaryEntryOld", () => {
  it("returns a diaryEntry if found", async () => {
    const diaryEntry = buildDiaryEntry();
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDateOld: vi.fn().mockResolvedValue(diaryEntry),
      })
    );

    const result = await resolver.getDiaryEntryOld("");

    withResult(result, (resultDiaryEntry) =>
      expect(resultDiaryEntry).toBe(diaryEntry)
    );
    withError(result, ({ message }) => expect.fail(message));
  });

  it("returns an error if the repository throws", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        getByDateOld: vi.fn(() => {
          throw new Error("test error");
        }),
      })
    );

    const result = await resolver.getDiaryEntryOld("");
    withResult(result, () => expect.fail("error expected, result found!"));
    withError(result, ({ message }) => expect(message).toEqual("test error"));
  });
});

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
    withError(resultOfGet, ({ message }) => expect(message).toEqual("test error"));
  });
});

describe("postDiaryEntryOld", () => {
  it("returns diaryEntry if one is found", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        saveOld: vi.fn((diaryEntry) => Promise.resolve(diaryEntry)),
      })
    );
    const diaryEntry = buildDiaryEntry();

    const result = await resolver.postDiaryEntryOld(diaryEntry);

    withResult(result, (resultDiaryEntry) =>
      expect(resultDiaryEntry).toEqual(diaryEntry)
    );
    withError(result, ({ message }) => expect.fail(message));
  });

  it("returns an error if the repository throws", async () => {
    const resolver = new DiaryEntriesResolver(
      buildMockDiaryEntriesRepository({
        saveOld: vi.fn(() => {
          throw new Error("test error 2");
        }),
      })
    );
    const diaryEntry = buildDiaryEntry();

    const result = await resolver.postDiaryEntryOld(diaryEntry);

    withResult(result, () => expect.fail("error expected, result found!"));
    withError(result, ({ message }) => expect(message).toEqual("test error 2"));
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

    withResult(resultOfPost, () => expect.fail("error expected, result found!"));
    withError(resultOfPost, ({ message }) => expect(message).toEqual("test error 2"));
  });
});
