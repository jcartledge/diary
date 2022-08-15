import { DiaryEntry } from "@diary/server/src/resolvers-types";
import { useQuery } from "@tanstack/react-query";

export const useDiaryEntryQuery = (isoDateString: string) =>
  useQuery<{ diaryEntry: DiaryEntry }>(
    ["diaryEntry", { isoDateString }],
    async () => {
      const response = await fetch(`/diaryentry/${isoDateString}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    }
  );
