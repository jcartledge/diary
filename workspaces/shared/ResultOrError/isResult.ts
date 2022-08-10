import { type SuccessResult } from "../types/either.types";
import { type ResultOrError } from "./ResultOrError.types";

export function isResult<T>(
  resultOrError: ResultOrError<T>
): resultOrError is SuccessResult<T> {
  return "result" in resultOrError;
}
