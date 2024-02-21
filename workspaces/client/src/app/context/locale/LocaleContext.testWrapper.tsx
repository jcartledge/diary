import { LocaleContext } from "app/context/locale/LocaleContext";

export const wrapWithLocale =
  (locale: string): React.FC<React.PropsWithChildren> =>
    ({ children }) =>
      <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
