import { type ResultOrError, type SuccessResult } from "./ResultOrError.types";

export const isResult = <T>(
  resultOrError: ResultOrError<T>
): resultOrError is SuccessResult<T> => "result" in resultOrError;
