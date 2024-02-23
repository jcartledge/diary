import { buildDiaryEntry, DiaryEntry } from "@diary/shared/types/diaryEntry";
import { DiaryDate } from "lib/util/DiaryDate";
import { http } from "msw";
import { diaryEntryUri } from "test/mocks/diaryEntryUriTemplate";
import { server } from "test/mocks/server";
import { vi } from "vitest";

export const mockGetDiaryEntry = (
  diaryEntry: Partial<DiaryEntry> = {},
  date?: string,
) => {
  const spy = vi.fn();
  server.use(
    http.get(
      diaryEntryUri(date),
      spy.mockImplementation(
        () =>
          new Response(
            JSON.stringify({
              diaryEntry: buildDiaryEntry({
                date: date ?? new DiaryDate().getKey(),
                ...diaryEntry,
              }),
            }),
          ),
      ),
    ),
  );
  return spy;
};
