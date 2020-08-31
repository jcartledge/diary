import { Resolvers } from "./resolvers-types";

export const resolvers: Resolvers = {
  Query: {
    diaryEntry: (_, { date }, { dataSources }) =>
      dataSources.diaryEntriesDataSource.getByDate(date),
  },
};
