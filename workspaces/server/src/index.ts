import { getApp } from "./app";
import { getDbClient } from "./getDbClient";
import { DiaryEntriesRepository } from "./repositories/diaryEntriesRepository";
import { DiaryEntriesResolver } from "./resolvers/diaryEntriesResolver";
import { applyDiaryEntryRoutes } from "./routes/diaryEntryRoutes";

const app = getApp();

getDbClient().then(async (client) => {
  const repository = new DiaryEntriesRepository(client);
  applyDiaryEntryRoutes(app, new DiaryEntriesResolver(repository));

  app.listen(4000, () => {
    console.log(`Diary server listening on port ${4000}`);
  });
});
