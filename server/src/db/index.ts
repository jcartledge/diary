import { Model, ModelDefined, Sequelize, STRING, TEXT } from "sequelize";
import { db_options, db_uri } from "../config";

interface DiaryEntryAttributes {
  date: string;
  risk: string;
  whatHappened: string;
  wentWell: string;
  couldBeImproved: string;
  notWell: string;
}

export type DiaryEntryCreationAttributes = Pick<DiaryEntryAttributes, "date">;

export type DiaryEntriesTable = ModelDefined<
  DiaryEntryAttributes,
  DiaryEntryCreationAttributes
>;

export type DiaryEntriesTableModel = Model<
  DiaryEntryAttributes,
  DiaryEntryCreationAttributes
>;

export const getDiaryEntriesTable = async (): Promise<DiaryEntriesTable> => {
  const db = new Sequelize(db_uri, db_options);
  const diaryEntriesTable = db.define("diaryEntry", {
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
  await db.sync();
  return diaryEntriesTable;
};
