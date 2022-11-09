import { withError, withResult } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import express, { IRouter, Response } from "express";
import { DiaryEntriesModelMethods } from "src/models/diaryEntriesModel";
import {
  checkGetDiaryScopes,
  checkJwt,
  checkPostDiaryScopes,
} from "./auth/checkToken";

const DIARYENTRY_PATH = "/diaryentry/:date";

const sendNotFound = (response: Response) => () =>
  response.status(404).send("Not found");

const sendBadRequest = (response: Response) => () =>
  response.status(400).send("Bad request");

const sendOk = (response: Response) => (diaryEntry: DiaryEntry) =>
  response.type("json").send({ diaryEntry });

export const diaryEntryRoutes = (model: DiaryEntriesModelMethods): IRouter => {
  const router = express.Router();
  router
    .route(DIARYENTRY_PATH)

    .get(
      checkJwt,
      checkGetDiaryScopes,
      async ({ auth, params: { date } }, response) => {
        const resultOfGet = await model.getByDate(
          /* c8 ignore next */
          auth?.payload.sub ?? "",
          date
        );
        withError(resultOfGet, sendNotFound(response));
        withResult(resultOfGet, sendOk(response));
      }
    )

    .post(
      checkJwt,
      checkPostDiaryScopes,
      async ({ auth, body: { diaryEntry } }, response) => {
        const resultOfValidate = validateDiaryEntry(diaryEntry);
        withError(resultOfValidate, sendBadRequest(response));
        withResult(resultOfValidate, async (diaryEntry) => {
          const resultOfSave = await model.save(
            /* c8 ignore next */
            auth?.payload.sub ?? "",
            diaryEntry
          );
          withError(resultOfSave, sendNotFound(response));
          withResult(resultOfSave, sendOk(response));
        });
      }
    );

  return router;
};
