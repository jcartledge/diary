import { LocaleContext } from "context/LocaleContext";
import { createHelper } from "souvlaki";

export const withLocale = createHelper(
  (locale): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
);
