import { type ErrorResult } from "../types/either.types";

export function error<E extends Error>(error: E): ErrorResult<E> {
  return { error };
}
