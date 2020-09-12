import DiaryHeader from "components/organisms/DiaryHeader";
import DiaryPageForm from "components/organisms/DiaryPageForm";
import DateContextProvider from "context/DateContext";
import React from "react";

const DiaryPage: React.FC = () => (
  <DateContextProvider>
    <DiaryHeader />
    <DiaryPageForm />
  </DateContextProvider>
);

export default DiaryPage;
