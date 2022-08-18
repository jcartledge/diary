import { withError, withResult } from "@diary/shared/ResultOrError";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import express, { IRouter, Request, Response } from "express";
import { DiaryEntriesRepositoryMethods } from "src/repositories/diaryEntriesRepository";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

const getDiaryEntryRoute =
  (repository: DiaryEntriesRepositoryMethods) =>
  async (req: Request, res: Response) => {
    const resultOfGet = await repository.getByDate(req.params.isoDateString);
    withError(resultOfGet, () => res.status(404).send("Not found"));
    withResult(resultOfGet, (diaryEntry) =>
      res.type("json").send({ diaryEntry })
    );
  };

const postDiaryEntryRoute =
  (repository: DiaryEntriesRepositoryMethods) =>
  async (req: Request, res: Response) => {
    const resultOfValidate = validateDiaryEntry(req.body.diaryEntry);
    withError(resultOfValidate, () => res.status(400).send("Invalid request"));
    withResult(resultOfValidate, async (diaryEntry) => {
      const resultOfSave = await repository.save(diaryEntry);
      withError(resultOfSave, () => res.status(404).send("Not found"));
      withResult(resultOfSave, (diaryEntry) =>
        res.type("json").send({ diaryEntry })
      );
    });
  };

export const diaryEntryRoutes = (
  repository: DiaryEntriesRepositoryMethods
): IRouter => {
  const router = express.Router();
  router
    .route(DIARYENTRY_PATH)
    .get(getDiaryEntryRoute(repository))
    .post(postDiaryEntryRoute(repository));
  return router;
};
