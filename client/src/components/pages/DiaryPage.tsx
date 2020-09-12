import DiaryHeader from "components/organisms/DiaryHeader";
import DiaryPageForm from "components/organisms/DiaryPageForm";
import DateContextProvider from "context/DateContext";
import { DiaryEntryContextProvider } from "context/DiaryEntryContext";
import React from "react";

const DiaryPage: React.FC = () => (
  <DateContextProvider>
    <DiaryEntryContextProvider>
      <DiaryHeader />
      <DiaryPageForm />
    </DiaryEntryContextProvider>
  </DateContextProvider>
);

export default DiaryPage;
