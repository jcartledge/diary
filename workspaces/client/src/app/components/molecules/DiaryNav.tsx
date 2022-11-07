import { useDiaryEntry } from "app/context/diaryEntry/useDiaryEntry";
import DateNextButton from "../atoms/DateNextButton";
import DatePrevButton from "../atoms/DatePrevButton";

export const DiaryNav = () => {
  const { isDirty } = useDiaryEntry();
  return (
    <ul>
      <li>
        <DatePrevButton disabled={isDirty} />
      </li>
      <li>
        <DateNextButton disabled={isDirty} />
      </li>
    </ul>
  );
};
