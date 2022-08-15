import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { getDbClient } from "./getDbClient";
import { DiaryEntriesRepository } from "./repositories/diaryEntriesRepository";
import { DiaryEntriesResolver } from "./resolvers/diaryEntriesResolver";
import { applyDiaryEntryRoutes } from "./routes/diaryEntryRoutes";

export const getApp = () =>
  express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    /* c8 ignore next */
    .use(cors());

export const getConfiguredApp = () =>
  applyDiaryEntryRoutes(
    getApp(),
    new DiaryEntriesResolver(new DiaryEntriesRepository(getDbClient()))
  );
