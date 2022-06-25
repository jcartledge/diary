import DiaryHeader from "app/components/organisms/DiaryHeader";
import DiaryPageForm from "app/components/organisms/DiaryPageForm";
import { DateContext } from "app/context/date/DateContext";
import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContext";
import { isValidDate } from "iso-datestring-validator";
import { useParams } from "react-router-dom";
import { DiaryDate } from "lib/util/date";

const DiaryPage = () => {
  const { isoDateString = "" } = useParams<{ isoDateString: string }>();
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
