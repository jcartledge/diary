import { useQuery } from "@tanstack/react-query";

export const useDiaryEntryQuery = (isoDateString: string) =>
  useQuery(["todos", { isoDateString }], async () => {
    const response = await fetch(`/diaryentry/${isoDateString}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  });
