import { DIARY_ENTRY_QUERY } from "app/graphql/queries";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { vi } from "vitest";
import { buildDiaryEntry } from "../lib/util/buildDiaryEntry";

export const buildMockApolloClient = (
  diaryEntry: Partial<DiaryEntry> = {}
): MockApolloClient => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(
    DIARY_ENTRY_QUERY,
    vi.fn().mockResolvedValue({
      data: { diaryEntry: buildDiaryEntry(diaryEntry) },
    })
  );
  return mockClient;
};
