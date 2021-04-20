import { gql } from "apollo-server";

export const typeDefs = gql`
  type DiaryEntry {
    id: Int!
    risk: String!
    date: String!
    whatHappened: String!
    wentWell: String!
    couldBeImproved: String!
    notWell: String!
  }

  input DiaryEntryInput {
    id: Int!
    risk: String!
    date: String!
    whatHappened: String!
    wentWell: String!
    couldBeImproved: String!
    notWell: String!
  }

  type Query {
    diaryEntry(date: String!): DiaryEntry
  }

  type Mutation {
    updateDiaryEntry(diaryEntry: DiaryEntryInput!): UpdateDiaryEntryResponse
  }

  type UpdateDiaryEntryResponse {
    diaryEntry: DiaryEntry
  }
`;
