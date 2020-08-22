import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "./selectors";
import { DiaryEntryFields } from "./state";

export enum ActionType {
  DECREMENT_DATE_ACTION = "DECREMENT_DATE_ACTION",
  FIELD_CHANGED_ACTION = "FIELD_CHANGED_ACTION",
  INCREMENT_DATE_ACTION = "INCREMENT_DATE_ACTION",
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

interface DecrementDateAction {
  type: ActionType.DECREMENT_DATE_ACTION;
}

export const useDecrementDateAction = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<DecrementDateAction>({ type: ActionType.DECREMENT_DATE_ACTION }),
    [dispatch]
  );
};

interface IncrementDateAction {
  type: ActionType.INCREMENT_DATE_ACTION;
}

export const useIncrementDateAction = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<IncrementDateAction>({ type: ActionType.INCREMENT_DATE_ACTION }),
    [dispatch]
  );
};

export type DateAction = DecrementDateAction | IncrementDateAction;
