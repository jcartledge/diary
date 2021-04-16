import { ApolloServer } from "apollo-server";
import { DiaryEntriesDataSource } from "./datasources/diaryEntries";
import { diaryEntriesTable } from "./db";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const dataSources = () => ({
  diaryEntriesDataSource: new DiaryEntriesDataSource(diaryEntriesTable),
});

const server = new ApolloServer({ typeDefs, dataSources, resolvers });

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
