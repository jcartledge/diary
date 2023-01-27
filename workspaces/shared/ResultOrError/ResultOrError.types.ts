export type SuccessResult<T> = { result: T };
export type ErrorResult<E extends Error> = { error: E };

export type ResultOrError<T, E extends Error = Error> =
  | SuccessResult<T>
  | ErrorResult<E>;

export type AsyncResultOrError<T, E extends Error = Error> = Promise<
  ResultOrError<T, E>
>;
