import Cell from "components/atoms/Cell";
import { H1 } from "components/atoms/styled";
import DateControl from "components/molecules/DateControl";
import { DiaryEntryContext } from "context/DiaryEntryContext";
import React, { useContext } from "react";

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
