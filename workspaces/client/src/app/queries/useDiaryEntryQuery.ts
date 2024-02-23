import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { withError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import { useQuery } from "@tanstack/react-query";
import { auth0, bffUri } from "config";
import { fail } from "lib/util/fail";

const readDiaryEntriesScopes: GetTokenSilentlyOptions = {
  authorizationParams: {
    audience: auth0.authorizationParams?.audience,
    scope: "read:diary_entries_for_user",
  },
};

export const useDiaryEntryQuery = (isoDateString: string) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  return useQuery<{ diaryEntry: DiaryEntry }>({
    queryKey: ["diaryEntry", { isoDateString }],
    queryFn: async () => {
      isAuthenticated || fail("Not authenticated");

      const response = await fetch(`${bffUri}/diaryentry/${isoDateString}`, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenSilently(
            readDiaryEntriesScopes,
          )}`,
        },
      });
      response.ok || fail(response.statusText);

      const { diaryEntry } = await response.json();
      withError(validateDiaryEntry(diaryEntry), fail);
      return { diaryEntry };
    },
  });
};
