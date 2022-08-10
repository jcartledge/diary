import { type ErrorResult } from "../types/either.types";
import { type ResultOrError } from "./ResultOrError.types";

export function isError<E extends Error>(
  resultOrError: ResultOrError<unknown, E>
): resultOrError is ErrorResult<E> {
  return "error" in resultOrError;
}
