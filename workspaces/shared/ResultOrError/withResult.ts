import { type ResultOrError } from "./ResultOrError.types";
import { isResult } from "./isResult";

export function withResult<T>(
  resultOrError: ResultOrError<T>,
  callback: (result: T) => void
) {
  if (isResult(resultOrError)) {
    callback(resultOrError.result);
  }
}
