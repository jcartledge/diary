import { isResult } from "./isResult";
import { type ResultOrError } from "../types/either.types";

export function withResult<T>(
  resultOrError: ResultOrError<T>,
  callback: (result: T) => void
) {
  if (isResult(resultOrError)) {
    callback(resultOrError.result);
  }
}
