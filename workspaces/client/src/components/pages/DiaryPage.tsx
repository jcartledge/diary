import DiaryHeader from "components/organisms/DiaryHeader";
import DiaryPageForm from "components/organisms/DiaryPageForm";
import { DiaryEntryContextProvider } from "context/DiaryEntryContext";
import React from "react";

export interface DiaryPageParams {
  isoDateString: string;
}

const DiaryPage: React.FC = () => (
  <DiaryEntryContextProvider>
    <DiaryHeader />
    <DiaryPageForm />
  </DiaryEntryContextProvider>
);

export default DiaryPage;
