import { DiaryEntryContextProvider } from "context/DiaryEntryContext";
import { type DiaryEntryContextProps } from "context/DiaryEntryContext.types";
import { createHelper } from "souvlaki";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
