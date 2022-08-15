import { Toggles } from "config";
import { Toggle } from "lib/toggles/Toggle";
import { NewDiaryEntryContextProvider } from "./NewDiaryEntryContextProvider";
import { OldDiaryEntryContextProvider } from "./OldDiaryEntryContextProvider";

export type DiaryEntryContextProviderProps = React.PropsWithChildren<{
  saveTimeoutInterval?: number;
}>;

export const DiaryEntryContextProvider: React.FC<
  DiaryEntryContextProviderProps
> = ({ children, ...props }) => (
  <>
    <Toggle name={Toggles.NEW_BACKEND}>
      <NewDiaryEntryContextProvider {...props}>
        {children}
      </NewDiaryEntryContextProvider>
    </Toggle>
    <Toggle isOff name={Toggles.NEW_BACKEND}>
      <OldDiaryEntryContextProvider {...props}>
        {children}
      </OldDiaryEntryContextProvider>
    </Toggle>
  </>
);
