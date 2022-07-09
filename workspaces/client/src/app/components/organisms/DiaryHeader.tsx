import React from "react";
import DateNextButton from "../atoms/DateNextButton";
import DatePrevButton from "../atoms/DatePrevButton";
import { FormattedDate } from "../atoms/FormattedDate";

const DiaryHeader: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <strong>Diary</strong>
            <br />
            <FormattedDate />
          </li>
        </ul>
        <ul>
          <li>
            <DatePrevButton />
          </li>
          <li>
            <DateNextButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DiaryHeader;
