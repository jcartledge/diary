import { ErrorResult } from "./ResultOrError.types";

export const error = <E extends Error>(error: E): ErrorResult<E> => ({ error });
