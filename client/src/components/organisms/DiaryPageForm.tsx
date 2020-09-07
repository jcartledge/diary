import DiaryEntryInput from "components/molecules/DiaryEntryInput";
import { DateContext } from "context/DateContext";
import { useDiaryEntryQuery } from "graphql/queries";
import React, { useContext, useEffect, useState } from "react";
import { DiaryEntry } from "server/src/resolvers-types";
import { buildDiaryEntry } from "util/types";

const DiaryPageForm: React.FC = () => {
  const { date } = useContext(DateContext);
  const { data } = useDiaryEntryQuery(date);
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry>(buildDiaryEntry());

  useEffect(() => {
    if (data) {
      setDiaryEntry(data.diaryEntry);
    }
  }, [data]);

  const [saveTimeout, setSaveTimeout] = useState<
    ReturnType<typeof setTimeout>
  >();

  const updateDiaryEntry = (field: keyof DiaryEntry) => (value: string) => {
    const newDiaryEntry = { ...diaryEntry, [field]: value };
    setDiaryEntry(newDiaryEntry);
    clearTimeout(saveTimeout);
    setSaveTimeout(
      setTimeout(() => {
        console.log({ newDiaryEntry });
      }, 1000)
    );
  };

  return (
    <div className="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
      <DiaryEntryInput
        className="md:col-span-2 lg:row-span-2 lg:col-span-1"
        label="What happened?"
        value={diaryEntry.whatHappened}
        updateField={updateDiaryEntry("whatHappened")}
      />
      <DiaryEntryInput
        label="Went well"
        value={diaryEntry.wentWell}
        updateField={updateDiaryEntry("wentWell")}
      />
      <DiaryEntryInput
        label="Could be improved"
        value={diaryEntry.couldBeImproved}
        updateField={updateDiaryEntry("couldBeImproved")}
      />
      <DiaryEntryInput
        label="Didn't go well"
        value={diaryEntry.notWell}
        updateField={updateDiaryEntry("notWell")}
      />
      <DiaryEntryInput
        label="Might be a risk"
        value={diaryEntry.risk}
        updateField={updateDiaryEntry("risk")}
      />
    </div>
  );
};

export default DiaryPageForm;
