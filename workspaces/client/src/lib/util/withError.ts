import { type ResultOrError } from "./types/either.types";

export function withError<E extends Error>(
  resultOrError: ResultOrError<unknown, E>,
  callback: (error: E) => void
) {
  if ("error" in resultOrError) {
    callback(resultOrError.error);
  }
}
