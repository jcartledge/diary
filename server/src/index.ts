import { getDbClient } from "server/src/getDbClient";
import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { buildServer } from "./server";

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
