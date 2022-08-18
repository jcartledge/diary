import { withError, withResult } from "@diary/shared/ResultOrError";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import express, { IRouter, Request, Response } from "express";
import { type DiaryEntriesResolver } from "src/resolvers/diaryEntriesResolver";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

const getDiaryEntryRoute =
  (resolver: DiaryEntriesResolver) => async (req: Request, res: Response) => {
    const resultOfGet = await resolver.getDiaryEntry(req.params.isoDateString);
    withError(resultOfGet, () => res.status(404).send("Not found"));
    withResult(resultOfGet, (diaryEntry) =>
      res.type("json").send({ diaryEntry })
    );
  };

const postDiaryEntryRoute =
  (resolver: DiaryEntriesResolver) => async (req: Request, res: Response) => {
    const resultOfValidate = validateDiaryEntry(req.body.diaryEntry);
    withError(resultOfValidate, () => res.status(400).send("Invalid request"));
    withResult(resultOfValidate, async (diaryEntry) => {
      const resultOfPost = await resolver.postDiaryEntry(diaryEntry);
      withError(resultOfPost, () => res.status(404).send("Not found"));
      withResult(resultOfPost, (diaryEntry) =>
        res.type("json").send({ diaryEntry })
      );
    });
  };

export const diaryEntryRoutes = (resolver: DiaryEntriesResolver): IRouter => {
  const router = express.Router();
  router
    .route(DIARYENTRY_PATH)
    .get(getDiaryEntryRoute(resolver))
    .post(postDiaryEntryRoute(resolver));
  return router;
};
