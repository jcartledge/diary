import { MockedResponse } from "@apollo/client/testing";
import { DiaryEntry } from "server/src/resolvers-types";
import { DIARY_ENTRY_QUERY } from "../graphql/queries";
import { buildDiaryEntry } from "./buildDiaryEntry";

export const buildApolloClientMocks = (
  diaryEntry: Partial<DiaryEntry> = {}
): MockedResponse<Record<string, any>>[] => [
  {
    request: { query: DIARY_ENTRY_QUERY },
    result: {
      data: { diaryEntry: buildDiaryEntry(diaryEntry) },
    },
  },
];
