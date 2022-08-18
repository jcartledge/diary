import { withError, withResult } from "@diary/shared/ResultOrError";
import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { getDbClient } from "src/getDbClient";
import { describe, expect, it } from "vitest";
import { DiaryEntriesRepository } from "./diaryEntriesRepository";

describe("diaryEntriesRepository", () => {
  describe("getByDate", () => {
    it("retrieves an empty diary entry", async () => {
      const date = "2020-10-10";
      const repository = new DiaryEntriesRepository(getDbClient());
      const resultOfGetByDate = await repository.getByDate(date);

      withError(resultOfGetByDate, () => expect.fail());
      withResult(resultOfGetByDate, (diaryEntry) =>
        expect(diaryEntry).toEqual(buildDiaryEntry({ date }))
      );
    });

    it("returns an error if the query fails", async () => {
      const date = "2020-10-10";
      const repository = new DiaryEntriesRepository(
        Promise.resolve({
          query: () => {
            throw new Error("failed");
          },
        })
      );
      const resultOfGetByDate = await repository.getByDate(date);

      withResult(resultOfGetByDate, () => expect.fail());
      withError(resultOfGetByDate, ({ message }) =>
        expect(message).toEqual(expect.stringContaining("failed"))
      );
    });
  });

  describe("save", () => {
    it("returns the saved record", async () => {
      const diaryEntry = buildDiaryEntry({ date: "2020-10-10" });
      const repository = new DiaryEntriesRepository(getDbClient());
      const resultOfGetByDate = await repository.save(diaryEntry);

      withError(resultOfGetByDate, () => expect.fail());
      withResult(resultOfGetByDate, (savedDiaryEntry) =>
        expect(savedDiaryEntry).toEqual(diaryEntry)
      );
    });

    it("returns an error if the query fails", async () => {
      const diaryEntry = buildDiaryEntry({ date: "2020-10-10" });
      const repository = new DiaryEntriesRepository(
        Promise.resolve({
          query: () => {
            throw new Error("failed");
          },
        })
      );
      const resultOfGetByDate = await repository.save(diaryEntry);

      withResult(resultOfGetByDate, () => expect.fail());
      withError(resultOfGetByDate, ({ message }) =>
        expect(message).toEqual(expect.stringContaining("failed"))
      );
    });
  });
});
