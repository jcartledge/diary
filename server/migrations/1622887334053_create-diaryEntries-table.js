const defaults = { notNull: true, default: "" };
const textField = { type: "varchar(1000)", ...defaults };

const tableName = "diary_entries";

exports.up = (pgm) => {
  pgm.createTable(
    tableName,
    {
      date: { type: "varchar(10)", unique: true, ...defaults },
      risk: textField,
      whatHappened: textField,
      wentWell: textField,
      couldBeImproved: textField,
      notWell: textField,
    },
    { ifNotExists: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable(tableName, { ifExists: true });
};
