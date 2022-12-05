import { isError } from "./isError";
import { type ResultOrError } from "./ResultOrError.types";

export const withError = <E extends Error>(
  resultOrError: ResultOrError<unknown, E>,
  callback: (error: E) => void
) => {
  if (isError(resultOrError)) {
    callback(resultOrError.error);
  }
};
