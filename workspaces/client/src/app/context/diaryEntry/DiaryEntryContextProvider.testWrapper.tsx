import {
  DiaryEntryContextProvider,
  DiaryEntryContextProviderProps,
} from "app/context/diaryEntry/DiaryEntryContextProvider";
import { createHelper } from "souvlaki";

export const withDiaryEntry = createHelper(
  (props?: DiaryEntryContextProviderProps): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
      (
        <DiaryEntryContextProvider {...props}>
          {children}
        </DiaryEntryContextProvider>
      )
);
