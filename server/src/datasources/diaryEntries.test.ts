import { Client } from "pg";
import { getDbClient } from "server/src/getDbClient";
import { buildDiaryEntry, DiaryEntriesDataSource, diaryEntriesTableName } from "./diaryEntries";

let client: Client;
let diaryEntriesDataSource: DiaryEntriesDataSource;

describe("getByDate", () => {
  beforeEach(async () => {
    client = await getDbClient();
    diaryEntriesDataSource = new DiaryEntriesDataSource(client);
  });

  afterEach(async () => {
    await client.query(`DELETE FROM "${diaryEntriesTableName}"`);
    await client.end();
  });

  it("creates a diary entry if not found", async () => {
    const date = "dbClient";

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining({ date })
    );
  });

  it("retrieves a diary entry by date", async () => {
    const date = "dbClient";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    await diaryEntriesDataSource.save(diaryEntry);

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});