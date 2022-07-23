import { ResultOrError } from "lib/util/types/either.types";
import { withError } from "lib/util/ResultOrError/withError";
import { expect } from "vitest";

export function failWithError<E extends Error>(
  resultOrError: ResultOrError<unknown, E>
): void {
  withError(resultOrError, (error) => expect.fail(error.message));
}
