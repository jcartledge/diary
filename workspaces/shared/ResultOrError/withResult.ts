import { isResult } from "./isResult";
import { type ResultOrError } from "./ResultOrError.types";

export const withResult = <T>(
  resultOrError: ResultOrError<T>,
  callback: (result: T) => void
) => {
  if (isResult(resultOrError)) {
    callback(resultOrError.result);
  }
};
