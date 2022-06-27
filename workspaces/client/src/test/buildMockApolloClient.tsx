import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "app/graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { vi } from "vitest";
import { buildDiaryEntry } from "../lib/util/buildDiaryEntry";

export const buildDiaryEntryQueryMock = (
  diaryEntry: Partial<DiaryEntry> = {}
) =>
  vi.fn(async (_: Record<string, unknown>) => ({
    data: { diaryEntry: buildDiaryEntry(diaryEntry) },
  }));

export const buildDiaryEntryMutationMock = (
  diaryEntry: Partial<DiaryEntry> = {}
) =>
  vi.fn(async (_) => ({
    data: { updateDiaryEntry: { diaryEntry: buildDiaryEntry(diaryEntry) } },
  }));

export const buildMockApolloClient = (
  diaryEntry: Partial<DiaryEntry> = {},
  {
    queryMock = buildDiaryEntryQueryMock(diaryEntry),
    mutationMock = buildDiaryEntryMutationMock(diaryEntry),
  } = {}
): MockApolloClient => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(DIARY_ENTRY_QUERY, queryMock);
  mockClient.setRequestHandler(UPDATE_DIARY_ENTRY_MUTATION, mutationMock);
  return mockClient;
};
