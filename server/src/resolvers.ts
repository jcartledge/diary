import { IResolvers } from "./resolvers-types";

export const resolvers: IResolvers = {
  Query: {
    diaryEntry: (_, { date }, { dataSources }) =>
      dataSources.diaryEntriesDataSource.getByDate(date),
  },
};
