import { type ErrorResult, type ResultOrError } from "./ResultOrError.types";

export const isError = <E extends Error>(
  resultOrError: ResultOrError<unknown, E>
): resultOrError is ErrorResult<E> => "error" in resultOrError;
