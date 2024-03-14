import { isError } from "@diary/shared/ResultOrError";
import { DiaryFooter } from "app/components/organisms/DiaryFooter";
import DiaryHeader from "app/components/organisms/DiaryHeader";
import DiaryPageForm from "app/components/organisms/DiaryPageForm";
import { DateContext } from "app/context/date/DateContext";
import { DiaryEntryContextProvider } from "app/context/diaryEntry/DiaryEntryContextProvider";
import { useParam } from "lib/router";
import { DiaryDate } from "lib/util/DiaryDate";

const DiaryPage = () => {
  const date = DiaryDate.from(useParam("isoDateString"));
  return isError(date) ? (
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
