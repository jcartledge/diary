import { SuccessResult } from "./ResultOrError.types";

export const result = <T>(result: T): SuccessResult<T> => ({ result });
