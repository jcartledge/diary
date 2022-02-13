import { createHelper } from "souvlaki";
import {
  DiaryEntryContextProps,
  DiaryEntryContextProvider,
} from "../context/DiaryEntryContext";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps) =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
