import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { DiaryEntry } from "server/src/resolvers-types";
import { vi } from "vitest";
import { DIARY_ENTRY_QUERY } from "../graphql/queries";
import { buildDiaryEntry } from "./buildDiaryEntry";

export const buildMockClient = (
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
