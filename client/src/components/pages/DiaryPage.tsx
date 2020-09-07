import  DiaryPageForm  from "components/organisms/DiaryPageForm";
import DateContextProvider from "context/DateContext";
import React from "react";
import DiaryHeader from "components/organisms/DiaryHeader";

const DiaryPage: React.FC = () => (
  <DateContextProvider>
    <DiaryHeader />
    <DiaryPageForm />
  </DateContextProvider>
);

export default DiaryPage;
