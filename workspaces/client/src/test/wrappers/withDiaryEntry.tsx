import { type DiaryEntryContextProps } from "context/DiaryEntryContext.types";
import { createHelper } from "souvlaki";
import { DiaryEntryContextProvider } from "../../context/DiaryEntryContext";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
