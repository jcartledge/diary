import DiaryEntryInput from "app/components/molecules/DiaryEntryInput";
import { DiaryEntryContext } from "app/context/diaryEntry/DiaryEntryContext";
import React, { useContext } from "react";

const DiaryPageForm: React.FC = () => {
  const { diaryEntry, updateDiaryEntry } = useContext(DiaryEntryContext);
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
