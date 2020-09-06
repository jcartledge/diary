import { gql, useQuery } from "@apollo/client";
import { DiaryEntry, QueryDiaryEntryArgs } from "server/src/resolvers-types";

const DIARY_ENTRY_QUERY = gql`
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

export const useDiaryEntryQuery = (date: string) =>
  useQuery<{ diaryEntry: DiaryEntry }, QueryDiaryEntryArgs>(DIARY_ENTRY_QUERY, {
    variables: { date },
  });
