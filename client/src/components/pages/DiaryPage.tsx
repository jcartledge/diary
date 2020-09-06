import { Diary } from "components/organisms/Diary";
import DateContextProvider from "context/DateContext";
import React from "react";
import DiaryHeader from "components/organisms/DiaryHeader";

const DiaryPage: React.FC = () => (
  <DateContextProvider>
    <DiaryHeader />
    <Diary />
  </DateContextProvider>
);

export default DiaryPage;
