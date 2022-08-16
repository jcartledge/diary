import { withError, withResult } from "@diary/shared/ResultOrError";
import express, { IRouter } from "express";
import { type DiaryEntriesResolver } from "src/resolvers/diaryEntriesResolver";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

export const diaryEntryRoutes = (resolver: DiaryEntriesResolver): IRouter => {
  const router = express.Router();
  router
    .route(DIARYENTRY_PATH)
    .get(async (req, res) => {
      const result = await resolver.getDiaryEntry(req.params.isoDateString);
      withResult(result, (diaryEntry) => res.type("json").send({ diaryEntry }));
      withError(result, ({ message }) => res.status(404).send({ message }));
    })
    .post(async (req, res) => {
      const result = await resolver.postDiaryEntry(req.body.diaryEntry);
      withResult(result, (diaryEntry) => res.type("json").send({ diaryEntry }));
      withError(result, ({ message }) => res.status(404).send({ message }));
    });
  return router;
};
