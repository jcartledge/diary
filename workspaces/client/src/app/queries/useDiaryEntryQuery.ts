import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { useQuery } from "@tanstack/react-query";
import { bffUri } from "config";

export const useDiaryEntryQuery = (isoDateString: string) =>
  useQuery<{ diaryEntry: DiaryEntry }>(
    ["diaryEntry", { isoDateString }],
    async () => {
      const response = await fetch(`${bffUri}/diaryentry/${isoDateString}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    }
  );
