import { Either, ErrorResult, SuccessResult } from "../types/either.types";

export type ResultOrError<T, E extends Error = Error> = Either<
  SuccessResult<T>,
  ErrorResult<E>
>;

export type AsyncResultOrError<T, E extends Error = Error> = Promise<
  ResultOrError<T, E>
>;
