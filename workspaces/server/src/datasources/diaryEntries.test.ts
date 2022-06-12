import { getDbClient } from "server/src/getDbClient";
import { describe, expect, it } from "vitest";
import {
  buildDiaryEntry,
  DiaryEntriesDataSource,
  diaryEntriesTableName,
} from "./diaryEntries";

const setup = async () => {
  const client = await getDbClient();
  const diaryEntriesDataSource = new DiaryEntriesDataSource(client);
  const cleanup = async () => {
    await client.query(`DELETE FROM "${diaryEntriesTableName}"`);
    await client.end();
  };
  return { diaryEntriesDataSource, cleanup };
};

describe("getByDate", () => {
  it("creates a diary entry if not found", async () => {
    const { diaryEntriesDataSource, cleanup } = await setup();
    const date = "dbClient";

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining({ date })
    );

    cleanup();
  });

  it("retrieves a diary entry by date", async () => {
    const { diaryEntriesDataSource, cleanup } = await setup();
    const date = "dbClient";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    await diaryEntriesDataSource.save(diaryEntry);

    expect(await diaryEntriesDataSource.getByDate(date)).toEqual(
      expect.objectContaining(diaryEntry)
    );

    cleanup();
  });
});
