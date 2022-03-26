import { MockedResponse } from "@apollo/client/testing";
import { DiaryEntry } from "server/src/resolvers-types";
import {
  DIARY_ENTRY_QUERY,
  UPDATE_DIARY_ENTRY_MUTATION,
} from "../graphql/queries";
import { buildDiaryEntry } from "./buildDiaryEntry";
import { DiaryDate } from "./date";

export const buildMockDiaryEntryQuery = (
  date: DiaryDate,
  partialDiaryEntry: Partial<DiaryEntry> = {},
  spy?: jest.Mock
): MockedResponse<Record<string, any>> => {
  const resultValue = {
    data: { diaryEntry: buildDiaryEntry(partialDiaryEntry) },
  };
  const result = spy ? spy.mockReturnValue(resultValue) : resultValue;
  return {
    request: { query: DIARY_ENTRY_QUERY, variables: { date: date.getKey() } },
    result,
  };
};

export const buildMockDiaryEntryMutation = (
  diaryEntry?: DiaryEntry,
  spy?: jest.Mock
): MockedResponse<Record<string, any>> => {
  const resultValue = {
    data: { updateDiaryEntry: { diaryEntry: diaryEntry ?? buildDiaryEntry() } },
  };
  const result = spy ? spy.mockReturnValue(resultValue) : resultValue;
  return {
    request: {
      query: UPDATE_DIARY_ENTRY_MUTATION,
      variables: { diaryEntry: diaryEntry ?? buildDiaryEntry() },
    },
    result,
  };
};
