import { type SuccessResult } from "../types/either.types";

export const result = <T>(result: T): SuccessResult<T> => ({ result });
