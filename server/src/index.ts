import { Client } from "pg";
import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { buildServer } from "./server";

const connectionString = process.env.DATABASE_URL;

const getDbClient = async (): Promise<Client> => {
  const client = new Client({ connectionString });
  await client.connect();
  return client;
};

getDbClient().then((client) => {
  const dataSources = () => ({
    diaryEntriesDataSource: new DiaryEntriesDataSource(client),
  });

  const server = buildServer(dataSources);

  server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  });
});
