import { buildDiaryEntry } from "@diary/shared/types/diaryEntry";
import { http } from "msw";
import { diaryEntryUriTemplate } from "./diaryEntryUriTemplate";

export const handlers = [
  http.get(diaryEntryUriTemplate, ({ params }) =>
    new Response(
      JSON.stringify({
        diaryEntry: buildDiaryEntry({ date: params.date as string }),
      }),
    )
  ),

  http.post(diaryEntryUriTemplate, async ({ request }) =>
    new Response(JSON.stringify(await request.json()))
  ),
];
