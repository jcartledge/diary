import { DiaryEntry } from "@diary/server/src/resolvers-types";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDiaryEntryMutation = (diaryEntry: DiaryEntry) =>
  useMutation(["diaryEntry", { diaryEntry }], async () => {
    const response = await fetch(`/diaryentry/${diaryEntry.date}`, {
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
  });
