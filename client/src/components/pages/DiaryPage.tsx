import { Diary } from "components/organisms/Diary";
import DateContextProvider from "context/DateContext";
import React from "react";

const DiaryPage: React.FC = () => (
  <DateContextProvider>
    {/* <DiaryHeader /> */}
    <Diary />
  </DateContextProvider>
);

export default DiaryPage;
