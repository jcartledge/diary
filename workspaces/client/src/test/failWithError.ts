import { withError, type ResultOrError } from "@diary/shared/ResultOrError";
import { expect } from "vitest";

export function failWithError<E extends Error>(
  resultOrError: ResultOrError<unknown, E>
): void {
  withError(resultOrError, (error) => expect.fail(error.message));
}
