import { error, result } from "@diary/shared/ResultOrError";
import { AsyncResultOrError } from "@diary/shared/ResultOrError/ResultOrError.types";
import {
  buildDiaryEntry,
  type DiaryEntry,
} from "@diary/shared/types/diaryEntry";
import { type Client } from "pg";

const DIARY_ENTRIES_TABLE_NAME = "diary_entries";
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
  constructor(private client: Promise<Pick<Client, "query">>) {}

  async getByDate(date: string): AsyncResultOrError<DiaryEntry> {
    const client = await this.client;
    try {
      const response = await client.query<DiaryEntry>(SELECT_QUERY, [date]);
      return response.rows.length
        ? result(response.rows[0])
        : this.save(buildDiaryEntry({ date }));
    } catch (e: unknown) {
      return error(e as Error);
    }
  }

  async save({
    date,
    whatHappened,
    wentWell,
    notWell,
    couldBeImproved,
    risk,
  }: DiaryEntry): AsyncResultOrError<DiaryEntry> {
    const client = await this.client;
    try {
      await client.query<DiaryEntry>(UPSERT_QUERY, [
        date,
        whatHappened,
        wentWell,
        notWell,
        couldBeImproved,
        risk,
      ]);
      return this.getByDate(date);
    } catch (e: unknown) {
      return error(e as Error);
    }
  }

  /**
   * @deprecated
   */
  async getByDateOld(date: string): Promise<DiaryEntry> {
    const client = await this.client;
    const response = await client.query<DiaryEntry>(SELECT_QUERY, [date]);
    return response.rows[0] ?? this.createAndReturnByDateOld(date);
  }

  /**
   * @deprecated
   */
  private async createAndReturnByDateOld(date: string): Promise<DiaryEntry> {
    await this.saveOld(buildDiaryEntry({ date }));
    return this.getByDateOld(date);
  }

  /**
   * @deprecated
   */
  async saveOld({
    date,
    whatHappened,
    wentWell,
    notWell,
    couldBeImproved,
    risk,
  }: DiaryEntry): Promise<DiaryEntry> {
    const client = await this.client;
    const response = await client.query<DiaryEntry>(UPSERT_QUERY, [
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
