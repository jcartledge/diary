import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { db, getDiaryEntriesTableFromDb } from "./db";
import { buildServer } from "./server";

getDiaryEntriesTableFromDb(db).then((diaryEntriesTable) => {
  const dataSources = () => ({
    diaryEntriesDataSource: new DiaryEntriesDataSource(diaryEntriesTable),
  });

  const server = buildServer(dataSources);

  server.listen().then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  });
});
