import { DiaryDate } from "lib/util/date";
import { createContext, useContext } from "react";

export const DateContext = createContext(new DiaryDate());

export const useDate = () => useContext(DateContext);
