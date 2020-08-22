import { ResultOrError } from "util/types";
import { DiaryEntry } from "./state";
import { InvalidDiaryEntryError, validateDiaryEntries } from "./validation";

export class LocalStorageSyncError extends Error {}

const storageKey = "diary-entries";

export const saveEntriesToLocalStorage = (
  entries: DiaryEntry[],
  localStorage: Storage = window.localStorage
): ResultOrError<true, LocalStorageSyncError | InvalidDiaryEntryError> => {
  const validationResult = validateDiaryEntries(entries);
  if ("error" in validationResult) {
    return validationResult;
  }
  try {
    localStorage.setItem(storageKey, JSON.stringify(entries));
    return { result: true };
  } catch (e) {
    return { error: new LocalStorageSyncError(e.message) };
  }
};

export const getEntriesFromLocalStorage = (
  localStorage: Storage = window.localStorage
): ResultOrError<DiaryEntry[], LocalStorageSyncError> => {
  try {
    const stringDiaryEntries = localStorage.getItem(storageKey);
    const diaryEntries = JSON.parse(stringDiaryEntries ?? "");
    const validationResult = validateDiaryEntries(diaryEntries);
    if ('error' in validationResult) {
      return validationResult;
    }
    return { result: diaryEntries };
  } catch (e) {
    return { error: new LocalStorageSyncError(e.message) };
  }
};
