import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { rest } from "msw";
import { diaryEntryUriTemplate } from "./diaryEntryUriTemplate";

export const handlers = [
  rest.get(diaryEntryUriTemplate, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        diaryEntry: buildDiaryEntry({ date: req.params.date as string }),
      })
    )
  ),

  rest.post(diaryEntryUriTemplate, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(await req.json()))
  ),
];
