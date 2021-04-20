import { ApolloServer } from "apollo-server";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export const buildServer = (
  dataSources: () => DataSources<Record<string, unknown>>
): ApolloServer => new ApolloServer({ typeDefs, dataSources, resolvers });
