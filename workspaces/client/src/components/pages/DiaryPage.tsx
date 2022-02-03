import { isValidDate } from "iso-datestring-validator";
import { useParams } from "react-router-dom";
import { DateContext } from "../../context/DateContext";
import { DiaryEntryContextProvider } from "../../context/DiaryEntryContext";
import { DiaryDate } from "../../util/date";
import DiaryHeader from "../organisms/DiaryHeader";
import DiaryPageForm from "../organisms/DiaryPageForm";

const DiaryPage = () => {
  const { isoDateString } = useParams<{ isoDateString: string }>();
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
