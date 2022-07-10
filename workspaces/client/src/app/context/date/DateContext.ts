import { DiaryDate } from "lib/util/date";
import { createContext, useContext } from "react";

export const DateContext = createContext<DiaryDate>(new DiaryDate());

export const useDate = () => useContext(DateContext);
