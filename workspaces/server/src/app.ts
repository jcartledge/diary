import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { getDbClient } from "./getDbClient";
import { DiaryEntriesRepository } from "./repositories/diaryEntriesRepository";
import { diaryEntryRoutes } from "./routes/diaryEntryRoutes";
import { healthCheckRoute } from "./routes/healthCheckRoute";

export const getApp = () =>
  express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    /* c8 ignore next */
    .use(cors());

export const getAppWithRoutes = () =>
  getApp()
    .use(healthCheckRoute)
    .use(diaryEntryRoutes(new DiaryEntriesRepository(getDbClient())));
