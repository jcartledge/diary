import {
  DataTypes,
  Model,
  ModelDefined,
  Sequelize,
  STRING,
  TEXT,
} from "sequelize";

export const db = new Sequelize({
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

export type DiaryEntriesTableModel = Model<
  DiaryEntryAttributes,
  DiaryEntryCreationAttributes
>;

export const getDiaryEntriesTableFromDb = (
  db: Sequelize
): DiaryEntriesTable => {
  const diaryEntriesTable = db.define("diaryEntry", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
  return diaryEntriesTable;
};
