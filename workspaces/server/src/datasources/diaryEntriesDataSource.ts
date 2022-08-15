import { type DiaryEntry } from "@diary/shared/types/DiaryEntry.types";
import { DataSource } from "apollo-datasource";
import { DiaryEntriesRepository } from "src/repositories/diaryEntriesRepository";

export class DiaryEntriesDataSource extends DataSource {
  constructor(private repository: DiaryEntriesRepository) {
    super();
  }

  async getByDate(date: string): Promise<DiaryEntry> {
    return this.repository.getByDate(date);
  }

  async save(diaryEntry: DiaryEntry): Promise<DiaryEntry> {
    return this.repository.save(diaryEntry);
  }
}
