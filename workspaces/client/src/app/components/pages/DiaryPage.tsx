import DiaryHeader from "app/components/organisms/DiaryHeader";
import DiaryPageForm from "app/components/organisms/DiaryPageForm";
import { DateContext } from "app/context/date/DateContext";
import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContext";
import { isValidDate } from "iso-datestring-validator";
import { useParam } from "lib/router/useParam";
import { DiaryDate } from "lib/util/date";

const DiaryPage = () => {
  const isoDateString = useParam("isoDateString");
  return isValidDate(isoDateString) ? (
    <DateContext.Provider value={new DiaryDate(new Date(isoDateString))}>
      <DiaryEntryContextProvider>
        <DiaryHeader />
        <DiaryPageForm />
      </DiaryEntryContextProvider>
    </DateContext.Provider>
  ) : (
    <DiaryErrorPage />
  );
};

export default DiaryPage;

const DiaryErrorPage = () => <h1>Error</h1>;
