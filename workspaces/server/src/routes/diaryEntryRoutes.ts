import { type DiaryEntriesResolver } from "src/resolvers/diaryEntriesResolver";
import { withError, withResult } from "@diary/shared/ResultOrError";
import { type Express } from "express";

const DIARYENTRY_PATH = "/diaryentry/:isoDateString";

export const applyDiaryEntryRoutes = (
  app: Express,
  resolver: DiaryEntriesResolver
) => {
  app.route(DIARYENTRY_PATH).get(async (req, res) => {
    const result = await resolver.getDiaryEntry(req.params.isoDateString);
    withResult(result, (diaryEntry) => res.type("json").send({ diaryEntry }));
    withError(result, ({ message }) => res.status(404).send({ message }));
  });
};
