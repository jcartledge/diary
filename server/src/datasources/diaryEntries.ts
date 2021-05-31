import { DataSource } from "apollo-datasource";
import { DiaryEntriesTable, DiaryEntriesTableModel } from "../db";
import { DiaryEntry } from "../resolvers-types";

export class DiaryEntriesDataSource extends DataSource {
  constructor(private diaryEntriesTable: DiaryEntriesTable) {
    super();
  }

  async getByDate(date: string): Promise<DiaryEntriesTableModel> {
    const [model] = await this.diaryEntriesTable.findCreateFind({
      where: { date },
      defaults: { date },
    });
    return model;
  }

  async save(diaryEntry: DiaryEntry): Promise<void> {
    this.diaryEntriesTable.upsert(diaryEntry);
  }
}
