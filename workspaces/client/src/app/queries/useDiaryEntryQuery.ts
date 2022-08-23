import { useAuth0 } from "@auth0/auth0-react";
import { withError } from "@diary/shared/ResultOrError";
import { DiaryEntry } from "@diary/shared/types/diaryEntry";
import { validateDiaryEntry } from "@diary/shared/types/validateDiaryEntry";
import { useQuery } from "@tanstack/react-query";
import { auth0, bffUri } from "config";
import { fail } from "lib/util/fail";

const readDiaryEntriesScopes = {
  audience: auth0.audience,
  scope: "read:diary_entries_for_user",
};

export const useDiaryEntryQuery = (isoDateString: string) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  return useQuery<{ diaryEntry: DiaryEntry }>(
    ["diaryEntry", { isoDateString }],
    async () => {
      isAuthenticated || fail("Not authenticated");

      const accessToken = await getAccessTokenSilently(readDiaryEntriesScopes);
      const response = await fetch(`${bffUri}/diaryentry/${isoDateString}`, {
        headers: { Authorization: `Bearer: ${accessToken}` },
      });
      response.ok || fail("Network response was not ok");

      const { diaryEntry } = await response.json();
      withError(validateDiaryEntry(diaryEntry), fail);
      return { diaryEntry };
    }
  );
};
