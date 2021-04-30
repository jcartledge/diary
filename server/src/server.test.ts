import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { Sequelize } from "sequelize";
import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { DiaryEntryCreationAttributes, getDiaryEntriesTableFromDb } from "./db";
import { buildServer } from "./server";

const buildServerWithDiaryEntry = async (
  diaryEntry: DiaryEntryCreationAttributes
): Promise<ApolloServer> => {
  const mockDiaryEntriesTable = await getDiaryEntriesTableFromDb(
    new Sequelize("sqlite::memory:", { logging: false })
  );
  mockDiaryEntriesTable.create(diaryEntry);
  const diaryEntriesDataSource = new DiaryEntriesDataSource(
    mockDiaryEntriesTable
  );
  const dataSources = () => ({ diaryEntriesDataSource });
  return buildServer(dataSources);
};

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

const UPDATE_DIARY_ENTRY_MUTATION = gql`
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

describe("DiaryEntry query", () => {
  it("returns a diary entry", async () => {
    const date = "2012-01-01";
    const diaryEntry = { date, couldBeImproved: "Everything" };
    const server = await buildServerWithDiaryEntry(diaryEntry);
    const { query } = createTestClient(server);

    const response = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });

    expect(response.data.diaryEntry).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });
});

describe("UpdateDiaryEntry mutation", () => {
  it("returns the mutated diary entry", async () => {
    const date = "2012-01-01";
    const diaryEntry = { date, couldBeImproved: "Everything" };
    const server = await buildServerWithDiaryEntry(diaryEntry);
    const { query, mutate } = createTestClient(server);

    const {
      data: { diaryEntry: retrievedDiaryEntry },
    } = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });
    const updatedDiaryEntry = {
      ...retrievedDiaryEntry,
      wentWell: "Everything",
    };
    await mutate({
      mutation: UPDATE_DIARY_ENTRY_MUTATION,
      variables: { diaryEntry: updatedDiaryEntry },
    });

    const {
      data: { diaryEntry: retrievedMutatedDiaryEntry },
    } = await query({ query: DIARY_ENTRY_QUERY, variables: { date } });
    expect(retrievedMutatedDiaryEntry).toEqual(updatedDiaryEntry);
  });
});
