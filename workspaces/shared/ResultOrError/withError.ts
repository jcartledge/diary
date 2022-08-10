import { type ResultOrError } from "./ResultOrError.types";
import { isError } from "./isError";

export function withError<E extends Error>(
  resultOrError: ResultOrError<unknown, E>,
  callback: (error: E) => void
) {
  if (isError(resultOrError)) {
    callback(resultOrError.error);
  }
}
