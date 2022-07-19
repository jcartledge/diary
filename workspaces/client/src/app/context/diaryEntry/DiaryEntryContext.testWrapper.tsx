import {
  DiaryEntryContextProvider,
  type DiaryEntryContextProps,
} from "app/context/diaryEntry/DiaryEntryContext";
import { createHelper } from "souvlaki";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProps): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
