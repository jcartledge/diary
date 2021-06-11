import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { getDbClient } from "./getDbClient";
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
