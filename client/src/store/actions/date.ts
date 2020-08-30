import { useCallback } from "react";
import { useDispatch } from "react-redux";

export enum DateActionType {
  DECREMENT_DATE_ACTION = "DECREMENT_DATE_ACTION",
  INCREMENT_DATE_ACTION = "INCREMENT_DATE_ACTION",
}

interface DecrementDateAction {
  type: DateActionType.DECREMENT_DATE_ACTION;
}

export const useDecrementDateAction = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<DecrementDateAction>({
        type: DateActionType.DECREMENT_DATE_ACTION,
      }),
    [dispatch]
  );
};

interface IncrementDateAction {
  type: DateActionType.INCREMENT_DATE_ACTION;
}

export const useIncrementDateAction = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch<IncrementDateAction>({
        type: DateActionType.INCREMENT_DATE_ACTION,
      }),
    [dispatch]
  );
};

export type DateAction = DecrementDateAction | IncrementDateAction;
