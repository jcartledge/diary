import DateNextButton from "../atoms/DateNextButton";
import DatePrevButton from "../atoms/DatePrevButton";

export const DiaryNav = () => (
  <ul>
    <li>
      <DatePrevButton />
    </li>
    <li>
      <DateNextButton />
    </li>
  </ul>
);
