import { DocumentNode, gql, useQuery } from "@apollo/client";
import { DiaryEntry, QueryDiaryEntryArgs } from "server/src/resolvers-types";
import { DiaryEntryField } from "store/state";

const diaryEntryFieldQuery = (fieldName: DiaryEntryField) => gql`
query diaryEntry($date: String) {
  diaryEntry(date: $date) {
    ${fieldName}
  }
}
`;
const WENT_WELL_QUERY = diaryEntryFieldQuery("wentWell");
const WHAT_HAPPENED_QUERY = diaryEntryFieldQuery("whatHappened");
const NOT_WELL_QUERY = diaryEntryFieldQuery("notWell");
const COULD_BE_IMPROVED_QUERY = diaryEntryFieldQuery("couldBeImproved");
const RISK_QUERY = diaryEntryFieldQuery("risk");

const buildUseDiaryEntryFieldQuery = <T>(query: DocumentNode) => (
  date: string
) => useQuery<T, QueryDiaryEntryArgs>(query, { variables: { date } });

export const useWentWellQuery = buildUseDiaryEntryFieldQuery<
  Pick<DiaryEntry, "wentWell">
>(WENT_WELL_QUERY);

export const useWhatHappenedQuery = buildUseDiaryEntryFieldQuery<
  Pick<DiaryEntry, "whatHappened">
>(WHAT_HAPPENED_QUERY);

export const useNotWellQuery = buildUseDiaryEntryFieldQuery<
  Pick<DiaryEntry, "notWell">
>(NOT_WELL_QUERY);

export const useCouldBeImprovedQuery = buildUseDiaryEntryFieldQuery<
  Pick<DiaryEntry, "couldBeImproved">
>(COULD_BE_IMPROVED_QUERY);

export const useRiskQuery = buildUseDiaryEntryFieldQuery<
  Pick<DiaryEntry, "risk">
>(RISK_QUERY);
