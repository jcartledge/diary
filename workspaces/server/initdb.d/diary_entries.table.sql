CREATE TABLE IF NOT EXISTS "diary_entries" (
  "userId" VARCHAR(250) NOT NULL,
  "date" VARCHAR(10) NOT NULL,
  "risk" VARCHAR(1000) NOT NULL,
  "whatHappened" VARCHAR(1000) NOT NULL,
  "wentWell" VARCHAR(1000) NOT NULL,
  "couldBeImproved" VARCHAR(1000) NOT NULL,
  "notWell" VARCHAR(1000) NOT NULL,
  PRIMARY KEY("userId", "date")
);
