export type Either<T, U> = T | U;
export type Maybe<T> = Either<T, undefined>;
export type ResultOrError<T, E extends Error> = Either<T, E>;
