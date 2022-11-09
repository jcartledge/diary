import { AsyncResultOrError, error, result } from "@diary/shared/ResultOrError";
import {
  buildDiaryEntry,
  type DiaryEntry,
} from "@diary/shared/types/diaryEntry";
import { type Client } from "pg";
import { SELECT_QUERY, UPSERT_QUERY } from "./queries";

export class DiaryEntriesModel {
  constructor(private client: Promise<Pick<Client, "query">>) {}

  async getByDate(
    userId: string,
    date: string
  ): AsyncResultOrError<DiaryEntry> {
    const client = await this.client;
    try {
      const response = await client.query<DiaryEntry>(SELECT_QUERY, [
        userId,
        date,
      ]);
      return response.rows.length
        ? result(response.rows[0])
        : this.save(userId, buildDiaryEntry({ date }));
    } catch (e: unknown) {
      return error(e as Error);
    }
  }

  async save(
    userId: string,
    { date, whatHappened, wentWell, notWell, couldBeImproved, risk }: DiaryEntry
  ): AsyncResultOrError<DiaryEntry> {
    const client = await this.client;
    try {
      await client.query<DiaryEntry>(UPSERT_QUERY, [
        userId,
        date,
        whatHappened,
        wentWell,
        notWell,
        couldBeImproved,
        risk,
      ]);
      return this.getByDate(userId, date);
    } catch (e: unknown) {
      return error(e as Error);
    }
  }
}

type PublicInterface<T> = { [K in keyof T]: T[K] };
export type DiaryEntriesModelMethods = PublicInterface<DiaryEntriesModel>;
