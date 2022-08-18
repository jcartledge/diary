import { withError, withResult } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import express, { IRouter, Response } from "express";
import { DiaryEntriesModelMethods } from "src/models/diaryEntriesModel";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

const notFound = (response: Response) => () =>
  response.status(404).send("Not found");

const badRequest = (response: Response) => () =>
  response.status(400).send("Bad request");

const ok = (response: Response) => (diaryEntry: DiaryEntry) =>
  response.type("json").send({ diaryEntry });

export const diaryEntryRoutes = (model: DiaryEntriesModelMethods): IRouter => {
  const router = express.Router();
  router
    .route(DIARYENTRY_PATH)

    .get(async ({ params: { isoDateString } }, response) => {
      const resultOfGet = await model.getByDate(isoDateString);
      withError(resultOfGet, notFound(response));
      withResult(resultOfGet, ok(response));
    })

    .post(async ({ body: { diaryEntry } }, response) => {
      const resultOfValidate = validateDiaryEntry(diaryEntry);
      withError(resultOfValidate, badRequest(response));
      withResult(resultOfValidate, async (diaryEntry) => {
        const resultOfSave = await model.save(diaryEntry);
        withError(resultOfSave, notFound(response));
        withResult(resultOfSave, ok(response));
      });
    });

  return router;
};
