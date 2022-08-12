import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { rest } from "msw";

const goodMockUri = "http://localhost/diaryentry/good-mock";

export const handlers = [
  rest.get(goodMockUri, (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ diaryEntry: buildDiaryEntry() }))
  ),

  rest.post(goodMockUri, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(await req.json()))
  ),

  rest.all("http://localhost/diaryentry/missing-mock", (_, res, ctx) =>
    res(ctx.status(404))
  ),
];
