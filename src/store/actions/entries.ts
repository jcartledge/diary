import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "store/selectors";
import { DiaryEntryField } from "store/state";

export enum EntriesActionType {
  FIELD_CHANGED_ACTION = "FIELD_CHANGED_ACTION",
}

interface FieldChangedAction {
  type: EntriesActionType.FIELD_CHANGED_ACTION;
  date: Date;
  field: DiaryEntryField;
  value: string;
}

export const useDispatchFieldChangedAction = (field: DiaryEntryField) => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  return useCallback(
    ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch<FieldChangedAction>({
        type: EntriesActionType.FIELD_CHANGED_ACTION,
        date,
        field,
        value,
      });
    },
    [field, date, dispatch]
  );
};

export type EntriesAction = FieldChangedAction;
