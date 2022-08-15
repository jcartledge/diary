import { bffUri } from "config";

export const diaryEntryUriTemplate = `${bffUri}/diaryentry/:date`;
export const diaryEntryUri = (date?: string) =>
  typeof date === "undefined"
    ? diaryEntryUriTemplate
    : diaryEntryUriTemplate.replace(":date", date);
