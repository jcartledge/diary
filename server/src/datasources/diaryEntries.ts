import { DataSource } from "apollo-datasource";
import { DiaryEntriesTable } from "../db";

export class DiaryEntriesDataSource extends DataSource {
  constructor(private diaryEntriesTable: DiaryEntriesTable) {
    super();
  }

  async getByDate(date: string) {
    return await this.diaryEntriesTable.findOne({ where: { date } });
  }
}
