import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { withError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth0, bffUri } from "config";
import { fail } from "lib/util/fail";

const writeDiaryEntriesScopes: GetTokenSilentlyOptions = {
  authorizationParams: {
    audience: auth0.authorizationParams?.audience,
    scope: "write:diary_entries_for_user",
  },
};

export const useUpdateDiaryEntryMutation = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async (diaryEntry: DiaryEntry) => {
      isAuthenticated || fail("Not authenticated");
      withError(validateDiaryEntry(diaryEntry), fail);

      const accessToken = await getAccessTokenSilently(writeDiaryEntriesScopes);
      const response = await fetch(`${bffUri}/diaryentry/${diaryEntry.date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ diaryEntry }),
      });
      response.ok || fail(response.statusText);
      return await response.json();
    },

    onSuccess: (_, diaryEntry) =>
      queryClient.invalidateQueries({
        queryKey: [
          "diaryEntry",
          { isoDateString: diaryEntry.date },
        ]
      }),
  }
  );
};
