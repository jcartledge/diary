import { AsyncResultOrError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { type DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";

export class DiaryEntriesResolver {
  constructor(private repository: DiaryEntriesRepositoryMethods) {}

  public async getDiaryEntry(date: string): AsyncResultOrError<DiaryEntry> {
    return this.repository.getByDate(date);
  }
  public async postDiaryEntry(
    diaryEntry: DiaryEntry
  ): AsyncResultOrError<DiaryEntry> {
    return this.repository.save(diaryEntry);
  }
}
