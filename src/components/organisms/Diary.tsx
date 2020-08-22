import DiaryEntryInput from "components/molecules/DiaryEntryInput";
import React from "react";
import {
  selectCouldBeImproved,
  selectNotWell,
  selectRisk,
  selectWentWell,
  selectWhatHappened,
} from "store/selectors";

export const Diary: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
      <DiaryEntryInput
        className="md:col-span-2 lg:row-span-2 lg:col-span-1"
        fieldName="whatHappened"
        label="What happened?"
        selector={selectWhatHappened}
      />
      <DiaryEntryInput
        fieldName="wentWell"
        label="Went well"
        selector={selectWentWell}
      />
      <DiaryEntryInput
        fieldName="couldBeImproved"
        label="Could be improved"
        selector={selectCouldBeImproved}
      />
      <DiaryEntryInput
        fieldName="notWell"
        label="Didn't go well"
        selector={selectNotWell}
      />
      <DiaryEntryInput
        fieldName="risk"
        label="Might be a risk"
        selector={selectRisk}
      />
    </div>
  );
};
