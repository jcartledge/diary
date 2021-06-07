import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";
import { Client } from "pg";
import {
  buildDiaryEntry,
  DiaryEntriesDataSource,
  diaryEntriesTableName,
} from "./datasources/diaryEntries";
import { getDbClient } from "./getDbClient";
import { DiaryEntry } from "./resolvers-types";
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

const setup = async (diaryEntries: DiaryEntry[] = []) => {
  const dbClient = await getDbClient();
  await createDiaryEntries(dbClient, diaryEntries);
  const server = await buildServerWithMockedDb(dbClient);
  const apolloClient = createTestClient(server);
  const cleanup = async () => {
    await dbClient.query(`DELETE FROM "${diaryEntriesTableName}"`);
    await dbClient.end();
  };
  return { apolloClient, dbClient, cleanup };
};

const createDiaryEntries = async (
  dbClient: Client,
  diaryEntries: DiaryEntry[]
): Promise<void> => {
  const diaryEntriesDataSource = new DiaryEntriesDataSource(dbClient);
  diaryEntries.forEach(
    async (diaryEntry) => await diaryEntriesDataSource.save(diaryEntry)
  );
};

describe("DiaryEntry query", () => {
  it("selects a diary entry", async () => {
    const date = "2012-01-01";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    const {
      apolloClient: { query },
      cleanup,
    } = await setup([diaryEntry]);

    const response = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });

    expect(response.data.diaryEntry).toEqual(
      expect.objectContaining(diaryEntry)
    );

    cleanup();
  });

  it("creates a diary entry if none is found", async () => {
    const date = "2012-01-01";
    const {
      apolloClient: { query },
      cleanup,
    } = await setup();

    const response = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });

    expect(response.data.diaryEntry).toEqual(expect.objectContaining({ date }));

    cleanup();
  });
});

describe("UpdateDiaryEntry mutation", () => {
  it("upserts the entry for the date passed", async () => {
    const date = "2012-01-01";
    const diaryEntry = buildDiaryEntry({ date, couldBeImproved: "Everything" });
    const {
      apolloClient: { query, mutate },
      cleanup,
    } = await setup([diaryEntry]);

    const updatedDiaryEntry = { ...diaryEntry, wentWell: "asdf" };
    await mutate({
      mutation: UPDATE_DIARY_ENTRY_MUTATION,
      variables: { diaryEntry: updatedDiaryEntry },
    });

    const response = await query({
      query: DIARY_ENTRY_QUERY,
      variables: { date },
    });

    expect(response.data.diaryEntry).toEqual(updatedDiaryEntry);

    cleanup();
  });
});
