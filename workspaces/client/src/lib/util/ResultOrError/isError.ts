import { type ErrorResult, type ResultOrError } from "../types/either.types";

export function isError<E extends Error>(
  resultOrError: ResultOrError<unknown, E>
): resultOrError is ErrorResult<E> {
  return "error" in resultOrError;
}
