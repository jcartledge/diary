import DiaryHeader from "components/organisms/DiaryHeader";
import DiaryPageForm from "components/organisms/DiaryPageForm";
import { DateContext } from "context/DateContext";
import { DiaryEntryContextProvider } from "context/DiaryEntryContext";
import { isValidDate } from "iso-datestring-validator";
import { useParams } from "react-router-dom";
import { DiaryDate } from "util/date";

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
