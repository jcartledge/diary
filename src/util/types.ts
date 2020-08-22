export type Either<T, U> = T | U;
export type Maybe<T> = Either<T, undefined>;
export type SuccessResult<T> = { result: T };
export type ErrorResult<T> = { error: T };
export type ResultOrError<T, E> = Either<SuccessResult<T>, ErrorResult<E>>;
