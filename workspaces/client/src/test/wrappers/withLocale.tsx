import { createHelper } from "souvlaki";
import { LocaleContext } from "../../context/LocaleContext";

export const withLocale = createHelper(
  (locale): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);
