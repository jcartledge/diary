import { gql, useMutation, useQuery } from "@apollo/client";
import { DiaryDate } from "lib/util/date";
import {
  DiaryEntry,
  MutationUpdateDiaryEntryArgs,
  QueryDiaryEntryArgs,
} from "server/src/resolvers-types";

export const DIARY_ENTRY_QUERY = gql`
  query diaryEntry($date: String!) {
    diaryEntry(date: $date) {
      date
      wentWell
      whatHappened
      notWell
      couldBeImproved
      risk
    }
  }
`;

export const useDiaryEntryQuery = (date: DiaryDate) =>
  useQuery<{ diaryEntry: DiaryEntry }, QueryDiaryEntryArgs>(DIARY_ENTRY_QUERY, {
    variables: { date: date.getKey() },
  });

export const UPDATE_DIARY_ENTRY_MUTATION = gql`
  mutation updateDiaryEntry($diaryEntry: DiaryEntryInput!) {
    updateDiaryEntry(diaryEntry: $diaryEntry) {
      diaryEntry {
        date
        wentWell
        whatHappened
        notWell
        couldBeImproved
        risk
      }
    }
  }
`;

export const useUpdateDiaryEntryMutation = () =>
  useMutation<{ diaryEntry: DiaryEntry }, MutationUpdateDiaryEntryArgs>(
    UPDATE_DIARY_ENTRY_MUTATION
  );
