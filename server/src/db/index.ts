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
  risk: { type: TEXT, allowNull: false, defaultValue: "" },
  whatHappened: { type: TEXT, allowNull: false, defaultValue: "" },
  wentWell: { type: TEXT, allowNull: false, defaultValue: "" },
  couldBeImproved: { type: TEXT, allowNull: false, defaultValue: "" },
  notWell: { type: TEXT, allowNull: false, defaultValue: "" },
});

db.sync();
