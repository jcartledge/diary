import { type SuccessResult } from "../types/either.types";
import { type ResultOrError } from "./ResultOrError.types";

export const isResult = <T>(
  resultOrError: ResultOrError<T>
): resultOrError is SuccessResult<T> => "result" in resultOrError;
