import { withError, withResult } from "@diary/shared/ResultOrError";
import { type Express } from "express";
import { type DiaryEntryResolver } from "../resolvers/diaryEntryResolver";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

export const applyDiaryEntryRoutes = (
  app: Express,
  resolver: DiaryEntryResolver
) => {
  app.route(DIARYENTRY_PATH).get((req, res) => {
    const result = resolver.getDiaryEntry(req.params.isoDateString);
    withResult(result, (diaryEntry) => res.type("json").send({ diaryEntry }));
    withError(result, ({ message }) => res.status(404).send({ message }));
  });
};
