import { buildDiaryEntry } from "@diary/shared/types/buildDiaryEntry";
import { type DiaryEntry } from "@diary/shared/types/DiaryEntry.types";
import { type Client } from "pg";

export const DIARY_ENTRIES_TABLE_NAME = "diary_entries";
const SELECT_QUERY = `SELECT * FROM "${DIARY_ENTRIES_TABLE_NAME}" WHERE date = $1`;
const UPSERT_QUERY = `
INSERT INTO "${DIARY_ENTRIES_TABLE_NAME}"
("date", "whatHappened", "wentWell", "notWell", "couldBeImproved", "risk")
VALUES ($1, $2, $3, $4, $5, $6)
ON CONFLICT ("date") DO UPDATE
SET "whatHappened" = EXCLUDED."whatHappened",
    "wentWell" = EXCLUDED."wentWell",
    "notWell" = EXCLUDED."notWell",
    "couldBeImproved" = EXCLUDED."couldBeImproved",
    "risk" = EXCLUDED."risk"
`;

export class DiaryEntriesRepository {
  constructor(private client: Client) {}

  async getByDate(date: string): Promise<DiaryEntry> {
    const response = await this.client.query<DiaryEntry>(SELECT_QUERY, [date]);
    return response.rows[0] ?? this.createAndReturnByDate(date);
  }

  private async createAndReturnByDate(date: string): Promise<DiaryEntry> {
    await this.save(buildDiaryEntry({ date }));
    return this.getByDate(date);
  }

  async save({
    date,
    whatHappened,
    wentWell,
    notWell,
    couldBeImproved,
    risk,
  }: DiaryEntry): Promise<DiaryEntry> {
    const response = await this.client.query<DiaryEntry>(UPSERT_QUERY, [
      date,
      whatHappened,
      wentWell,
      notWell,
      couldBeImproved,
      risk,
    ]);
    return response.rows[0];
  }
}

type PublicInterface<T> = { [K in keyof T]: T[K] };
export type DiaryEntriesRepositoryMethods =
  PublicInterface<DiaryEntriesRepository>;
