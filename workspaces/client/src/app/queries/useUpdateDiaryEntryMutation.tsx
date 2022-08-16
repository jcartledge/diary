import { DiaryEntry } from "@diary/shared/types/DiaryEntry.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bffUri } from "config";

export const useUpdateDiaryEntryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (diaryEntry: DiaryEntry) => {
      const response = await fetch(`${bffUri}/diaryentry/${diaryEntry.date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diaryEntry }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    },
    {
      onSuccess: (_, diaryEntry) =>
        queryClient.invalidateQueries([
          "diaryEntry",
          { isoDateString: diaryEntry.date },
        ]),
    }
  );
};
