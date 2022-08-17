import { error, result, ResultOrError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { type DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";
import { DiaryEntriesResolverError } from "./DiaryEntriesResolverError";

export class DiaryEntriesResolver {
  constructor(private repository: DiaryEntriesRepositoryMethods) {}

  public async getDiaryEntry(
    date: string
  ): Promise<ResultOrError<DiaryEntry, DiaryEntriesResolverError>> {
    try {
      return result(await this.repository.getByDate(date));
    } catch (e: unknown) {
      const { message } = e as Error;
      return error(new DiaryEntriesResolverError(message));
    }
  }

  public async postDiaryEntry(
    diaryEntry: DiaryEntry
  ): Promise<ResultOrError<DiaryEntry, DiaryEntriesResolverError>> {
    try {
      return result(await this.repository.save(diaryEntry));
    } catch (e: unknown) {
      const { message } = e as Error;
      return error(new DiaryEntriesResolverError(message));
    }
  }
}
