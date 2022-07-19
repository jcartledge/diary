import DiaryEntryInput from "app/components/molecules/DiaryEntryInput";
import { useDiaryEntry } from "app/context/diaryEntry/useDiaryEntry";

const DiaryPageForm: React.FC = () => {
  const { diaryEntry, updateDiaryEntry } = useDiaryEntry();
  return (
    <div>
      <div className="grid">
        <DiaryEntryInput
          label="What happened?"
          value={diaryEntry.whatHappened}
          updateField={updateDiaryEntry("whatHappened")}
        />
        <DiaryEntryInput
          label="Went well"
          value={diaryEntry.wentWell}
          updateField={updateDiaryEntry("wentWell")}
        />
      </div>
      <div className="grid">
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
    </div>
  );
};

export default DiaryPageForm;
