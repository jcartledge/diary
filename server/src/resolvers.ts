import { IResolvers } from "./resolvers-types";

export const resolvers: IResolvers = {
  Query: {
    diaryEntry: (_, { date }, { dataSources: { diaryEntriesDataSource } }) =>
      diaryEntriesDataSource.getByDate(date),
  },
  Mutation: {
    updateDiaryEntry: (
      _,
      { diaryEntry },
      { dataSources: { diaryEntriesDataSource } }
    ) => {
      diaryEntriesDataSource.save(diaryEntry);
      return { diaryEntry };
    },
  },
};
