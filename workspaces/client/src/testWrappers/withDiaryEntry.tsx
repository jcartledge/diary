import { createHelper } from "souvlaki";
import {
  DiaryEntryContextProps,
  DiaryEntryContextProvider,
} from "../context/DiaryEntryContext";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
