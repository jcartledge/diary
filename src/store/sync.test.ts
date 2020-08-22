import { buildDiaryEntry, DiaryEntry } from "./state";
import {
  getEntriesFromLocalStorage,
  LocalStorageSyncError,
  saveEntriesToLocalStorage,
} from "./sync";
import { InvalidDiaryEntryError } from "./validation";

const buildMockStorage = (overrides: Partial<Storage> = {}): Storage => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  ...overrides,
});

describe("saveEntriesToLocalStorage", () => {
  it("saves the entries to local storage", () => {
    const entries = [buildDiaryEntry()];
    expect(saveEntriesToLocalStorage(entries)).toEqual({ result: true });
  });

  beforeEach(() => localStorage.clear());

  it("returns an error if setItem fails", () => {
    const entries = [buildDiaryEntry()];
    const mockLocalStorage = buildMockStorage({
      setItem: () => {
        throw new Error();
      },
    });
    const result = saveEntriesToLocalStorage(entries, mockLocalStorage);

    expect(result).toEqual({ error: expect.any(LocalStorageSyncError) });
  });

  it("returns an error if the entries are not in a valid format", () => {
    const invalidDiaryEntry = buildDiaryEntry();
    delete invalidDiaryEntry.couldBeImproved;
    const entries = [invalidDiaryEntry as DiaryEntry];
    const result = saveEntriesToLocalStorage(entries);

    expect(result).toEqual({ error: expect.any(InvalidDiaryEntryError) });
  });
});

describe("getEntriesFromLocalStorage", () => {
  it("returns the entries previously set", () => {
    const entries = [buildDiaryEntry()];
    const mockLocalStorage = buildMockStorage({
      getItem: (key) =>
        key === "diary-entries" ? JSON.stringify(entries) : null,
    });

    expect(getEntriesFromLocalStorage(mockLocalStorage)).toEqual({
      result: entries,
    });
  });

  it("returns an error if the entries are not found", () => {
    const mockLocalStorage = buildMockStorage({
      getItem: () => null,
    });

    expect(getEntriesFromLocalStorage(mockLocalStorage)).toEqual({
      error: expect.any(LocalStorageSyncError),
    });
  });

  it("returns an error if the entries are not valid", () => {
    const entries = "asdf";
    const mockLocalStorage = buildMockStorage({
      getItem: (key) =>
        key === "diary-entries" ? JSON.stringify(entries) : null,
    });

    expect(getEntriesFromLocalStorage(mockLocalStorage)).toEqual({
      error: expect.any(InvalidDiaryEntryError),
    });
  });

  it("returns an error if the an entry is not valid", () => {
    const invalidEntry = buildDiaryEntry();
    delete invalidEntry.notWell;
    const mockLocalStorage = buildMockStorage({
      getItem: (key) =>
        key === "diary-entries" ? JSON.stringify([invalidEntry]) : null,
    });

    expect(getEntriesFromLocalStorage(mockLocalStorage)).toEqual({
      error: expect.any(InvalidDiaryEntryError),
    });
  });
});
