import DateControl from "app/components/molecules/DateControl";
import { DiaryEntryContext } from "app/context/diaryEntry/DiaryEntryContext";
import React, { useContext } from "react";

const DiaryHeader: React.FC = () => {
  const { isDirty } = useContext(DiaryEntryContext);
  return (
    <header>
      <h1>Diary</h1>
      <div className={isDirty ? "italic" : "not-italic"}>
        <DateControl />
      </div>
    </header>
  );
};

export default DiaryHeader;
