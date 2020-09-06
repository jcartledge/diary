import { ModelDefined, Sequelize, STRING, TEXT } from "sequelize";

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
  date: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: { isDate: true },
  },
  risk: { type: TEXT },
  whatHappened: { type: TEXT },
  wentWell: { type: TEXT },
  couldBeImproved: { type: TEXT },
  notWell: { type: TEXT },
});

db.sync();
