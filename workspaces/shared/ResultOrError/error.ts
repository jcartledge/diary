import { type ErrorResult } from "../types/either.types";

export const error = <E extends Error>(error: E): ErrorResult<E> => ({ error });
