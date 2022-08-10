import { type ResultOrError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "src/resolvers-types";

export class DiaryEntryResolverError extends Error {}

export interface DiaryEntryResolver {
  getDiaryEntry: (
    arg0: string
  ) => ResultOrError<DiaryEntry, DiaryEntryResolverError>;
}
