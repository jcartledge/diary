import DiaryEntryInput from "app/components/molecules/DiaryEntryInput";
import { useDiaryEntry } from "app/context/diaryEntry/useDiaryEntry";

const DiaryPageForm: React.FC = () => {
  const { diaryEntry, updateDiaryEntry, isDirty, isLoading } = useDiaryEntry();
  return (
    <div>
      <div className="grid">
        <DiaryEntryInput
          label="What happened?"
          value={diaryEntry.whatHappened}
          fieldUpdater={updateDiaryEntry("whatHappened")}
          disabled={isLoading}
        />
        <DiaryEntryInput
          label="Went well"
          value={diaryEntry.wentWell}
          fieldUpdater={updateDiaryEntry("wentWell")}
          disabled={isLoading}
        />
      </div>
      <div className="grid">
        <DiaryEntryInput
          label="Could be improved"
          value={diaryEntry.couldBeImproved}
          fieldUpdater={updateDiaryEntry("couldBeImproved")}
          disabled={isLoading}
        />
        <DiaryEntryInput
          label="Didn't go well"
          value={diaryEntry.notWell}
          fieldUpdater={updateDiaryEntry("notWell")}
          disabled={isLoading}
        />
        <DiaryEntryInput
          label="Might be a risk"
          value={diaryEntry.risk}
          fieldUpdater={updateDiaryEntry("risk")}
          disabled={isLoading}
        />
      </div>
      {isDirty && (
        <div aria-busy>
          <small>Saving...</small>
        </div>
      )}
    </div>
  );
};

export default DiaryPageForm;
