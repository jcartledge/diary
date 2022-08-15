export const diaryEntryUriTemplate = "http://localhost/diaryentry/:date";
export const diaryEntryUri = (date?: string) =>
  typeof date === "undefined"
    ? diaryEntryUriTemplate
    : diaryEntryUriTemplate.replace(":date", date);
