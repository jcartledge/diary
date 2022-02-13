import { createHelper } from "souvlaki";
import { LocaleContext } from "../context/LocaleContext";

export const withLocale = createHelper((locale) => ({ children }) => (
  <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
));
