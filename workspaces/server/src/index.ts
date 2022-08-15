import http from "http";
import { getApp } from "./app";
import { DiaryEntriesDataSource } from "./datasources/diaryEntriesDataSource";
import { getDbClient } from "./getDbClient";
import { DiaryEntriesRepository } from "./repositories/diaryEntriesRepository";
import { DiaryEntriesResolver } from "./resolvers/diaryEntriesResolver";
import { applyDiaryEntryRoutes } from "./routes/diaryEntryRoutes";
import { buildServer } from "./server";

const app = getApp();

getDbClient().then(async (client) => {
  const repository = new DiaryEntriesRepository(client);
  const dataSources = () => ({
    diaryEntriesDataSource: new DiaryEntriesDataSource(repository),
  });

  const server = buildServer(dataSources);
  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });

  applyDiaryEntryRoutes(app, new DiaryEntriesResolver(repository));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
