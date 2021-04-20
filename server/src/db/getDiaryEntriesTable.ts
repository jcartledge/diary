import { DiaryEntriesTable, getDiaryEntriesTableFromDb, db } from "./index";

export const getDiaryEntriesTable = (): DiaryEntriesTable => getDiaryEntriesTableFromDb(db);
