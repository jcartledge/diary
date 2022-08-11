import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost/diaryentry/good-mock", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ diaryEntry: buildDiaryEntry() }));
  }),
  rest.get("http://localhost/diaryentry/missing-mock", (_, res, ctx) => {
    return res(ctx.status(404));
  }),
];
