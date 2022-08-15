import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { getDbClient } from "./getDbClient";
import { DiaryEntriesRepository } from "./repositories/diaryEntriesRepository";
import { DiaryEntriesResolver } from "./resolvers/diaryEntriesResolver";
import { applyDiaryEntryRoutes } from "./routes/diaryEntryRoutes";

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors());

getDbClient().then(async (client) => {
  const repository = new DiaryEntriesRepository(client);
  applyDiaryEntryRoutes(app, new DiaryEntriesResolver(repository));

  app.listen(4000, () => {
    console.log(`Diary server listening on port ${4000}`);
  });
});
