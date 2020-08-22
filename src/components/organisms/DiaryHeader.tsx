import Cell from "components/atoms/Cell";
import { H1 } from "components/atoms/styled";
import DateControl from "components/molecules/DateControl";
import React from "react";

const DiaryHeader: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3">
    <Cell className="text-center md:col-span-2 lg:col-span-3">
      <H1>Diary</H1>
      <DateControl />
    </Cell>
  </div>
);

export default DiaryHeader;
