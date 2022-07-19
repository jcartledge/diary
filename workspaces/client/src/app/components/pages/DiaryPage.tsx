import DiaryHeader from "app/components/organisms/DiaryHeader";
import DiaryPageForm from "app/components/organisms/DiaryPageForm";
import { DateContext } from "app/context/date/DateContext";
import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContextProvider";
import { useParam } from "lib/router";
import { DiaryDate } from "lib/util/DiaryDate";
import { DiaryFooter } from "../organisms/DiaryFooter";

const DiaryPage = () => {
  const date = DiaryDate.from(useParam("isoDateString"));
  return "error" in date ? (
    <DiaryErrorPage />
  ) : (
    <DateContext.Provider value={date.result}>
      <DiaryEntryContextProvider>
        <DiaryHeader />
        <DiaryPageForm />
        <DiaryFooter />
      </DiaryEntryContextProvider>
    </DateContext.Provider>
  );
};

export default DiaryPage;

const DiaryErrorPage = () => <h1>Error</h1>;
