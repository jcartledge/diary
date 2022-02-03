import React, { useContext } from "react";
import { DiaryEntryContext } from "../../context/DiaryEntryContext";
import Cell from "../atoms/Cell";
import { H1 } from "../atoms/styled";
import DateControl from "../molecules/DateControl";

const DiaryHeader: React.FC = () => {
  const { isDirty } = useContext(DiaryEntryContext);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      <Cell className="text-center md:col-span-2 lg:col-span-3">
        <H1>Diary</H1>
        <div className={isDirty ? "italic" : "not-italic"}>
          <DateControl />
        </div>
      </Cell>
    </div>
  );
};

export default DiaryHeader;
