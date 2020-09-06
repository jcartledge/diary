import { DataSource } from "apollo-datasource";
import { DiaryEntriesTable } from "../db";
import { DiaryEntry } from "../resolvers-types";

export class DiaryEntriesDataSource extends DataSource {
  constructor(private diaryEntriesTable: DiaryEntriesTable) {
    super();
  }

  async getByDate(date: string) {
    const [model] = await this.diaryEntriesTable.findOrCreate({
      where: { date },
      defaults: { date },
    });
    return model;
  }

  async save(diaryEntry: DiaryEntry) {
    return this.diaryEntriesTable.upsert(diaryEntry);
  }
}
