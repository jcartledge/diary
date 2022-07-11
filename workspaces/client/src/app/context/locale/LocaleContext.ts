import { createContext, useContext } from "react";

export const LocaleContext = createContext<string>("");
export const useLocale = () => useContext(LocaleContext);
