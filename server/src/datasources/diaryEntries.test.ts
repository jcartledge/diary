import { Sequelize } from "sequelize";
import { getDiaryEntriesTableFromDb } from "../db";
import { DiaryEntriesDataSource } from "./diaryEntries";

describe("getByDate", () => {
  it("creates a diary entry if not found", async () => {
    const mockDiaryEntriesTable = getDiaryEntriesTableFromDb(
      new Sequelize("sqlite::memory:", { logging: false })
    );
    const diaryEntriesDataSource = new DiaryEntriesDataSource(
      mockDiaryEntriesTable
    );
    const date = "2012-01-01";

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining({ date })
    );
  });

  it("retrieves a diary entry by date", async () => {
    const mockDiaryEntriesTable = getDiaryEntriesTableFromDb(
      new Sequelize("sqlite::memory:", { logging: false })
    );

    const date = "2012-01-01";
    const diaryEntry = { date, couldBeImproved: "Everything" };
    mockDiaryEntriesTable.create(diaryEntry);
    const diaryEntriesDataSource = new DiaryEntriesDataSource(
      mockDiaryEntriesTable
    );

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});
