import express from "express";
import http from "http";
import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { getDbClient } from "./getDbClient";
import { buildServer } from "./server";

getDbClient().then(async (client) => {
  const dataSources = () => ({
    diaryEntriesDataSource: new DiaryEntriesDataSource(client),
  });

  const server = buildServer(dataSources);
  const app = express();
  const httpServer = http.createServer(app);
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
