import { withError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bffUri } from "config";

const updateDiaryEntryMutation = async (diaryEntry: DiaryEntry) => {
  withError(validateDiaryEntry(diaryEntry), (validationError) => {
    throw validationError;
  });

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
};

export const useUpdateDiaryEntryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDiaryEntryMutation, {
    onSuccess: (_, diaryEntry) =>
      queryClient.invalidateQueries([
        "diaryEntry",
        { isoDateString: diaryEntry.date },
      ]),
  });
};
