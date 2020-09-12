import { DiaryEntry } from "server/src/resolvers-types";

type Either<T, U> = T | U;

export type Maybe<T> = Either<T, undefined>;

export type SuccessResult<T> = { result: T };
export type ErrorResult<T> = { error: T };
export type ResultOrError<T, E> = Either<SuccessResult<T>, ErrorResult<E>>;

export type Builder<T extends object> = (overrides?: Partial<T>) => T;

export const buildDiaryEntry: Builder<DiaryEntry> = (overrides = {}) => ({
  id: "",
  date: "",
  whatHappened: "",
  wentWell: "",
  notWell: "",
  couldBeImproved: "",
  risk: "",
  ...overrides,
});
