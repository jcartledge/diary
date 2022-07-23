import { type SuccessResult } from "../types/either.types";

export function result<T>(result: T): SuccessResult<T> {
  return { result };
}
