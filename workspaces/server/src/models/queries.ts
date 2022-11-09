const DIARY_ENTRIES_TABLE_NAME = "diary_entries";

export const SELECT_QUERY = `
SELECT "date", "whatHappened", "wentWell", "notWell", "couldBeImproved", "risk"
FROM "${DIARY_ENTRIES_TABLE_NAME}"
WHERE "userId" = $1 and "date" = $2
`;

export const UPSERT_QUERY = `
INSERT INTO "${DIARY_ENTRIES_TABLE_NAME}"
("userId", "date", "whatHappened", "wentWell", "notWell", "couldBeImproved", "risk")
VALUES ($1, $2, $3, $4, $5, $6, $7)
ON CONFLICT ("userId", "date") DO UPDATE
SET "whatHappened" = EXCLUDED."whatHappened",
    "wentWell" = EXCLUDED."wentWell",
    "notWell" = EXCLUDED."notWell",
    "couldBeImproved" = EXCLUDED."couldBeImproved",
    "risk" = EXCLUDED."risk"
`;
