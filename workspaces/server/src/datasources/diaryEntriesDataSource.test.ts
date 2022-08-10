import { buildDiaryEntry } from "src/buildDiaryEntry";
import { describe, expect, it } from "vitest";
import { getDbClient } from "../getDbClient";
import { DiaryEntriesRepository, DIARY_ENTRIES_TABLE_NAME } from "../repositories/diaryEntriesRepository";
import {
  DiaryEntriesDataSource
} from "./diaryEntriesDataSource";

const setup = async () => {
  const client = await getDbClient();
  const diaryEntriesDataSource = new DiaryEntriesDataSource(new DiaryEntriesRepository(client));
  const cleanup = async () => {
    await client.query(`DELETE FROM "${DIARY_ENTRIES_TABLE_NAME}"`);
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
