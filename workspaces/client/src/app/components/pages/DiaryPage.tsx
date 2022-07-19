import DiaryHeader from "app/components/organisms/DiaryHeader";
import DiaryPageForm from "app/components/organisms/DiaryPageForm";
import { DateContext } from "app/context/date/DateContext";
import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContextProvider";
import { isValidDate } from "iso-datestring-validator";
import { useParam } from "lib/router";
import { DiaryDate } from "lib/util/DiaryDate";
import { DiaryFooter } from "../organisms/DiaryFooter";

const DiaryPage = () => {
  const isoDateString = useParam("isoDateString");
  return isValidDate(isoDateString) ? (
    <DateContext.Provider value={DiaryDate.from(isoDateString).result!}>
      <DiaryEntryContextProvider>
        <DiaryHeader />
        <DiaryPageForm />
        <DiaryFooter />
      </DiaryEntryContextProvider>
    </DateContext.Provider>
  ) : (
    <DiaryErrorPage />
  );
};

export default DiaryPage;

const DiaryErrorPage = () => <h1>Error</h1>;
