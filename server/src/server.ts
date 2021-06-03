import { DataSource } from "apollo-datasource";
import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

type DataSources<TContext> = {
  [name: string]: DataSource<TContext>;
};

export const buildServer = (
  dataSources: () => DataSources<Record<string, unknown>>
): ApolloServer => new ApolloServer({ typeDefs, dataSources, resolvers });
