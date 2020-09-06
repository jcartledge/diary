import DiaryEntryInput from "components/molecules/DiaryEntryInput";
import { DateContext } from "context/DateContext";
import { useDiaryEntryQuery } from "graphql/queries";
import React, { useContext } from "react";
import { buildDiaryEntry } from "store/state";

export const Diary: React.FC = () => {
  const { date } = useContext(DateContext);
  const { data } = useDiaryEntryQuery(date);
  const { whatHappened, wentWell, notWell, couldBeImproved, risk } =
    data?.diaryEntry ?? buildDiaryEntry();
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
      <DiaryEntryInput
        className="md:col-span-2 lg:row-span-2 lg:col-span-1"
        label="What happened?"
        value={whatHappened}
      />
      <DiaryEntryInput label="Went well" value={wentWell} />
      <DiaryEntryInput label="Could be improved" value={couldBeImproved} />
      <DiaryEntryInput label="Didn't go well" value={notWell} />
      <DiaryEntryInput label="Might be a risk" value={risk} />
    </div>
  );
};
