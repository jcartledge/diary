import { Client } from "pg";
import PGMock2 from "pgmock2";
import { buildDiaryEntry, DiaryEntriesDataSource } from "./diaryEntries";

export const selectQueryParams = ["string"];
export const upsertQueryParams = [
  "string",
  "string",
  "string",
  "string",
  "string",
  "string",
];

describe("getByDate", () => {
  it("creates a diary entry if not found", async () => {
    const date = "2012-01-01";
    const pg = new PGMock2();
    pg.add(DiaryEntriesDataSource.selectQuery, selectQueryParams, {
      rowCount: 0,
      rows: [],
    });
    pg.add(DiaryEntriesDataSource.upsertQuery, upsertQueryParams, {
      rowCount: 1,
      rows: [buildDiaryEntry({ date })],
    });
    const client = (await pg.connect()) as unknown as Client;
    const diaryEntriesDataSource = new DiaryEntriesDataSource(client);

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining({ date })
    );
  });

  it("retrieves a diary entry by date", async () => {
    const date = "2012-01-01";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    const pg = new PGMock2();
    pg.add(DiaryEntriesDataSource.selectQuery, selectQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });
    const client = (await pg.connect()) as unknown as Client;
    const diaryEntriesDataSource = new DiaryEntriesDataSource(client);

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});

describe("save", () => {
  it("saves a diary entry", async () => {
    const date = "2019-03-03";
    const diaryEntry = buildDiaryEntry({
      risk: "3",
      wentWell: "4",
      whatHappened: "5",
      couldBeImproved: "6",
      notWell: "7",
      date,
    });
    const pg = new PGMock2();
    pg.add(DiaryEntriesDataSource.selectQuery, selectQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });
    pg.add(DiaryEntriesDataSource.upsertQuery, upsertQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });

    const client = (await pg.connect()) as unknown as Client;
    const diaryEntriesDataSource = new DiaryEntriesDataSource(client);
    await diaryEntriesDataSource.save(diaryEntry);
    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});
