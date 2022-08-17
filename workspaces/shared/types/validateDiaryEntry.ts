import { ZodError } from "zod";
import { error } from "../ResultOrError/error";
import { result } from "../ResultOrError/result";
import { ResultOrError } from "../ResultOrError/ResultOrError.types";
import { DiaryEntry, DiaryEntrySchema } from "./diaryEntry";

export const validateDiaryEntry = (
  possibleDiaryEntry: unknown
): ResultOrError<DiaryEntry, ZodError> => {
  const parseResult = DiaryEntrySchema.safeParse(possibleDiaryEntry);
  if ("error" in parseResult) {
    return error(parseResult.error);
  } else {
    return result(parseResult.data);
  }
};
