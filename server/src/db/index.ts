import { ModelDefined, Sequelize, STRING } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./.dev/db",
});

interface DiaryEntryAttributes {
  date: string;
  risk: string;
  whatHappened: string;
  wentWell: string;
  couldBeImproved: string;
  notWell: string;
}

type DiaryEntryCreationAttributes = Pick<DiaryEntryAttributes, "date">;

export type DiaryEntriesTable = ModelDefined<
  DiaryEntryAttributes,
  DiaryEntryCreationAttributes
>;

export const diaryEntriesTable: DiaryEntriesTable = db.define("diaryEntry", {
  date: { type: STRING, allowNull: false },
  risk: { type: STRING },
  whatHappened: { type: STRING },
  wentWell: { type: STRING },
  couldBeImproved: { type: STRING },
  notWell: { type: STRING },
});

db.sync();
