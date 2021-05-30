import { getDiaryEntriesTable } from "../db";
import { DiaryEntry } from "../resolvers-types";
import { DiaryEntriesDataSource } from "./diaryEntries";

describe("getByDate", () => {
  it("creates a diary entry if not found", async () => {
    const diaryEntriesTable = await getDiaryEntriesTable();
    const diaryEntriesDataSource = new DiaryEntriesDataSource(
      diaryEntriesTable
    );
    const date = "2012-01-01";

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining({ date })
    );
  });

  it("retrieves a diary entry by date", async () => {
    const diaryEntriesTable = await getDiaryEntriesTable();

    const date = "2012-01-01";
    const diaryEntry = { date, couldBeImproved: "Everything" };
    diaryEntriesTable.create(diaryEntry);
    const diaryEntriesDataSource = new DiaryEntriesDataSource(
      diaryEntriesTable
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
      risk: "3",
      wentWell: "4",
      whatHappened: "5",
      couldBeImproved: "6",
      notWell: "7",
      date,
    };
    const diaryEntriesTable = await getDiaryEntriesTable();
    const diaryEntriesDataSource = new DiaryEntriesDataSource(
      diaryEntriesTable
    );

    await diaryEntriesDataSource.save(diaryEntry);

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});
