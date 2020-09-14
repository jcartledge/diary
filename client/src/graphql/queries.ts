import { gql, QueryResult, useMutation, useQuery } from "@apollo/client";
import {
  DiaryEntry,
  MutationUpdateDiaryEntryArgs,
  QueryDiaryEntryArgs,
} from "server/src/resolvers-types";
import { DiaryDate } from "util/date";

export const DIARY_ENTRY_QUERY = gql`
  query diaryEntry($date: String!) {
    diaryEntry(date: $date) {
      id
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

const isNotEmptyDiaryEntry = ({
  wentWell,
  whatHappened,
  notWell,
  couldBeImproved,
  risk,
}: DiaryEntry) => {
  return (
    `${whatHappened}${wentWell}${notWell}${couldBeImproved}${risk}`.length > 0
  );
};

const doesEntryExist = ({ data }: QueryResult<{ diaryEntry: DiaryEntry }>) =>
  data && isNotEmptyDiaryEntry(data.diaryEntry);

export const useDoesEntryExistForPreviousDate = (date: DiaryDate) =>
  doesEntryExist(useDiaryEntryQuery(date.getPrevious()));

export const useDoesEntryExistForNextDate = (date: DiaryDate) =>
  doesEntryExist(useDiaryEntryQuery(date.getNext()));

export const UPDATE_DIARY_ENTRY_MUTATION = gql`
  mutation updateDiaryEntry($diaryEntry: DiaryEntryInput!) {
    updateDiaryEntry(diaryEntry: $diaryEntry) {
      diaryEntry {
        id
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
