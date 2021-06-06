import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { Client } from "pg";
import PGMock2 from "pgmock2";
import {
  buildDiaryEntry,
  DiaryEntriesDataSource,
} from "./datasources/diaryEntries";
import {
  selectQueryParams,
  upsertQueryParams,
} from "./datasources/diaryEntries.test";
import { buildServer } from "./server";

const buildServerWithMockedDb = async (
  client: Client
): Promise<ApolloServer> => {
  const diaryEntriesDataSource = new DiaryEntriesDataSource(client);
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
  it("selects a diary entry", async () => {
    const date = "2012-01-01";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    const pg = new PGMock2();
    pg.add(DiaryEntriesDataSource.selectQuery, selectQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });

    const client = (await pg.connect()) as unknown as Client;
    const server = await buildServerWithMockedDb(client);
    const { query } = createTestClient(server);

    const response = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });

    expect(response.data.diaryEntry).toEqual(
      expect.objectContaining(diaryEntry)
    );
  });

  it("creates a diary entry if none is found", async () => {
    const date = "2012-01-01";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    const pg = new PGMock2();
    pg.add(DiaryEntriesDataSource.selectQuery, selectQueryParams, {
      rowCount: 0,
      rows: [],
    });

    pg.add(DiaryEntriesDataSource.upsertQuery, upsertQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });

    const client = (await pg.connect()) as unknown as Client;
    const server = await buildServerWithMockedDb(client);
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
  it("upserts the entry for the date passed", async () => {
    const date = "2012-01-01";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    const pg = new PGMock2();
    pg.add(DiaryEntriesDataSource.selectQuery, selectQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });
    pg.add(DiaryEntriesDataSource.upsertQuery, upsertQueryParams, {
      rowCount: 1,
      rows: [diaryEntry],
    });

    const client = (await pg.connect()) as unknown as Client;
    const server = await buildServerWithMockedDb(client);
    const { query, mutate } = createTestClient(server);
    await mutate({
      mutation: UPDATE_DIARY_ENTRY_MUTATION,
      variables: { diaryEntry },
    });

    const response = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });
    expect(response.data.diaryEntry).toEqual(diaryEntry);
  });
});
