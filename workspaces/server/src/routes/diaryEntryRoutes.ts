import { withError, withResult } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import express, { IRouter, Response } from "express";
import { DiaryEntriesModelMethods } from "src/models/diaryEntriesModel";

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

    .get(async ({ params: { date } }, response) => {
      const resultOfGet = await model.getByDate(date);
      withError(resultOfGet, sendNotFound(response));
      withResult(resultOfGet, sendOk(response));
    })

    .post(async ({ body: { diaryEntry } }, response) => {
      const resultOfValidate = validateDiaryEntry(diaryEntry);
      withError(resultOfValidate, sendBadRequest(response));
      withResult(resultOfValidate, async (diaryEntry) => {
        const resultOfSave = await model.save(diaryEntry);
        withError(resultOfSave, sendNotFound(response));
        withResult(resultOfSave, sendOk(response));
      });
    });

  return router;
};
