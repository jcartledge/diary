import { createContext, useContext } from "react";

export const LocaleContext = createContext("");
export const useLocale = () => useContext(LocaleContext);
