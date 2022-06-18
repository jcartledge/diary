type Either<T, U> = T | U;

export type Maybe<T> = Either<T, undefined>;

export type SuccessResult<T> = { result: T };
export type ErrorResult<E extends Error> = { error: E };
export type ResultOrError<T, E extends Error> = Either<
  SuccessResult<T>,
  ErrorResult<E>
>;
