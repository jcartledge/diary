import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { corsOrigin } from "./config";
import { getDbClient } from "./getDbClient";
import { DiaryEntriesModel } from "./models/diaryEntriesModel";
import { diaryEntryRoutes } from "./routes/diaryEntryRoutes";
import { healthCheckRoute } from "./routes/healthCheckRoute";

export const getAppWithMiddleware = () =>
  express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    /* c8 ignore next */
    .use(cors({ origin: corsOrigin }));

export const getAppWithRoutes = () =>
  getAppWithMiddleware()
    .use(healthCheckRoute)
    .use(diaryEntryRoutes(new DiaryEntriesModel(getDbClient())));
