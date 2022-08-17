import { withError, withResult } from "@diary/shared/ResultOrError";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import express, { IRouter, Request, Response } from "express";
import { type DiaryEntriesResolver } from "src/resolvers/diaryEntriesResolver";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

const getDiaryEntryRoute =
  (resolver: DiaryEntriesResolver) => async (req: Request, res: Response) => {
    const getResult = await resolver.getDiaryEntry(req.params.isoDateString);
    withError(getResult, ({ message }) => res.status(404).send({ message }));
    withResult(getResult, (diaryEntry) =>
      res.type("json").send({ diaryEntry })
    );
  };

const postDiaryEntryRoute =
  (resolver: DiaryEntriesResolver) => async (req: Request, res: Response) => {
    const validationResult = validateDiaryEntry(req.body.diaryEntry);
    withError(validationResult, () => res.status(400).send("Invalid request"));
    withResult(validationResult, async (diaryEntry) => {
      const postResult = await resolver.postDiaryEntry(diaryEntry);
      withError(postResult, ({ message }) => res.status(404).send({ message }));
      withResult(postResult, (diaryEntry) =>
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
