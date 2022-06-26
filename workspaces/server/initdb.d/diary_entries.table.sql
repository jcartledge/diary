CREATE TABLE IF NOT EXISTS "diary_entries" (
  "date" varchar(10) UNIQUE NOT NULL,
  "risk" varchar(1000) NOT NULL,
  "whatHappened" varchar(1000) NOT NULL,
  "wentWell" varchar(1000) NOT NULL,
  "couldBeImproved" varchar(1000) NOT NULL,
  "notWell" varchar(1000) NOT NULL
);
