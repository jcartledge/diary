import { Sequelize } from "sequelize";
import { getDiaryEntriesTableFromDb } from "../db";
import { DiaryEntry } from "../resolvers-types";
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

describe("save", () => {
  it("saves a diary entry", async () => {
    const date = "2019-03-03";
    const diaryEntry: DiaryEntry = {
      id: 1,
      risk: "3",
      wentWell: "4",
      whatHappened: "5",
      couldBeImproved: "6",
      notWell: "7",
      date,
    };
    const mockDiaryEntriesTable = getDiaryEntriesTableFromDb(
      new Sequelize("sqlite::memory:", { logging: false })
    );
    const diaryEntriesDataSource = new DiaryEntriesDataSource(
      mockDiaryEntriesTable
    );

    await diaryEntriesDataSource.save(diaryEntry);

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});
