import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "./selectors";
import { DiaryEntryFields } from "./state";

export enum ActionType {
  FIELD_CHANGED_ACTION = "FIELD_CHANGED_ACTION",
}

interface FieldChangedAction {
  type: ActionType.FIELD_CHANGED_ACTION;
  date: Date;
  field: DiaryEntryFields;
  value: string;
}

export const useDispatchFieldChangedAction = (field: DiaryEntryFields) => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  return useCallback(
    ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch<FieldChangedAction>({
        type: ActionType.FIELD_CHANGED_ACTION,
        date,
        field,
        value,
      });
    },
    [field, date, dispatch]
  );
};

export type EntriesAction = FieldChangedAction;
