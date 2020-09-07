import { gql, QueryResult, useQuery } from "@apollo/client";
import { DiaryEntry, QueryDiaryEntryArgs } from "server/src/resolvers-types";
import { DiaryDate } from "util/date";

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

export const useIsEntryForPreviousDate = (date: DiaryDate) =>
  doesEntryExist(useDiaryEntryQuery(date.getPrevious()));

export const useIsEntryForNextDate = (date: DiaryDate) =>
  doesEntryExist(useDiaryEntryQuery(date.getNext()));
