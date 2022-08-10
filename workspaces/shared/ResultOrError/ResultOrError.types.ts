import { Either, ErrorResult, SuccessResult } from "../types/either.types";

export type ResultOrError<T, E extends Error = Error> = Either<
  SuccessResult<T>,
  ErrorResult<E>
>;
