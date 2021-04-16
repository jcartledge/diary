import { Resolvers } from "./resolvers-types";

export const resolvers: Resolvers = {
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
