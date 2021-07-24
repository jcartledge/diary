import { DiaryPageParams } from "components/pages/DiaryPage";
import { useParams } from "react-router-dom";
import { DiaryDate } from "util/date";

export const useDate = () => {
  const { isoDateString } = useParams<DiaryPageParams>();
  return new DiaryDate(new Date(isoDateString));
};
