import { DataSource } from "apollo-datasource";
import { Client } from "pg";
import { DiaryEntry } from "../resolvers-types";

export const diaryEntriesTableName = "diary_entries";

export const buildDiaryEntry = (
  overrides: Partial<DiaryEntry>
): DiaryEntry => ({
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
export class DiaryEntriesDataSource extends DataSource {
  public static selectQuery = `SELECT * FROM "${diaryEntriesTableName}" WHERE date = $1`;
  public static upsertQuery = `
    INSERT INTO "${diaryEntriesTableName}"
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT ("date") DO UPDATE
    SET "whatHappened" = EXCLUDED."whatHappened",
        "wentWell" = EXCLUDED."wentWell",
        "notWell" = EXCLUDED."notWell",
        "couldBeImproved" = EXCLUDED."couldBeImproved",
        "risk" = EXCLUDED."risk"
  `;

  constructor(private client: Client) {
    super();
  }

  async getByDate(date: string): Promise<DiaryEntry> {
    const response = await this.client.query<DiaryEntry>(
      DiaryEntriesDataSource.selectQuery,
      [date]
    );
    return response.rows[0] ?? this.save(buildDiaryEntry({ date }));
  }

  async save({
    date,
    whatHappened,
    wentWell,
    notWell,
    couldBeImproved,
    risk,
  }: DiaryEntry): Promise<DiaryEntry> {
    const response = await this.client.query<DiaryEntry>(
      DiaryEntriesDataSource.upsertQuery,
      [date, whatHappened, wentWell, notWell, couldBeImproved, risk]
    );
    return response.rows[0];
  }
}
