import { DiaryEntry } from "@diary/server/src/resolvers-types";
import { buildDiaryEntry } from "lib/util/buildDiaryEntry";
import { rest } from "msw";
import { diaryEntryUri } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { vi } from "vitest";

export const mockGetDiaryEntry = (
  diaryEntry: Partial<DiaryEntry> = {},
  date?: string
) => {
  const spy = vi.fn();
  server.use(
    rest.get(
      diaryEntryUri(date),
      spy.mockImplementation((_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            diaryEntry: buildDiaryEntry({
              date,
              ...diaryEntry,
            }),
          })
        )
      )
    )
  );
  return spy;
};

export const mockPostDiaryEntry = (diaryEntry: Partial<DiaryEntry> = {}) => {
  const spy = vi.fn();
  server.use(
    rest.post(
      diaryEntryUri(""),
      spy.mockImplementation((_, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            diaryEntry: buildDiaryEntry(diaryEntry),
          })
        )
      )
    )
  );
};
