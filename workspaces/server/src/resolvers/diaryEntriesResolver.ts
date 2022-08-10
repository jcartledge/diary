import { error, result, ResultOrError } from "@diary/shared/ResultOrError";
import { type DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";
import { DiaryEntry } from "src/resolvers-types";

export class DiaryEntriesResolverError extends Error {}

export class DiaryEntriesResolver {
  constructor(private repository: DiaryEntriesRepositoryMethods) {}
  public async getDiaryEntry(
    date: string
  ): Promise<ResultOrError<DiaryEntry, DiaryEntriesResolverError>> {
    try {
      return result(await this.repository.getByDate(date));
    } catch (e: unknown) {
      const { message } = e as Error;
      return error(new DiaryEntriesResolverError(message ?? ""));
    }
  }
}
