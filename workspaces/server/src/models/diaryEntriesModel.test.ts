import { withError, withResult } from "@diary/shared/ResultOrError";
import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { getDbClient } from "src/getDbClient";
import { describe, expect, it } from "vitest";
import { DiaryEntriesModel } from "./diaryEntriesModel";

describe("diaryEntriesModel", () => {
  describe("getByDate", () => {
    it("retrieves an empty diary entry", async () => {
      const date = "2020-10-10";
      const model = new DiaryEntriesModel(getDbClient());
      const resultOfGetByDate = await model.getByDate(date);

      withError(resultOfGetByDate, () => expect.fail());
      withResult(resultOfGetByDate, (diaryEntry) =>
        expect(diaryEntry).toEqual(buildDiaryEntry({ date }))
      );
    });

    it("returns an error if the query fails", async () => {
      const date = "2020-10-10";
      const model = new DiaryEntriesModel(
        Promise.resolve({
          query: () => {
            throw new Error("failed");
          },
        })
      );
      const resultOfGetByDate = await model.getByDate(date);

      withResult(resultOfGetByDate, () => expect.fail());
      withError(resultOfGetByDate, ({ message }) =>
        expect(message).toEqual(expect.stringContaining("failed"))
      );
    });
  });

  describe("save", () => {
    it("returns the saved record", async () => {
      const diaryEntry = buildDiaryEntry({ date: "2020-10-10" });
      const model = new DiaryEntriesModel(getDbClient());
      const resultOfGetByDate = await model.save(diaryEntry);

      withError(resultOfGetByDate, () => expect.fail());
      withResult(resultOfGetByDate, (savedDiaryEntry) =>
        expect(savedDiaryEntry).toEqual(diaryEntry)
      );
    });

    it("returns an error if the query fails", async () => {
      const diaryEntry = buildDiaryEntry({ date: "2020-10-10" });
      const model = new DiaryEntriesModel(
        Promise.resolve({
          query: () => {
            throw new Error("failed");
          },
        })
      );
      const resultOfGetByDate = await model.save(diaryEntry);

      withResult(resultOfGetByDate, () => expect.fail());
      withError(resultOfGetByDate, ({ message }) =>
        expect(message).toEqual(expect.stringContaining("failed"))
      );
    });
  });
});
