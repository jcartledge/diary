import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { getDiaryEntriesTable } from "./getDiaryEntriesTable";
import { buildServer } from "./server";

const dataSources = () => ({
  diaryEntriesDataSource: new DiaryEntriesDataSource(getDiaryEntriesTable()),
});

const server = buildServer(dataSources);

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
