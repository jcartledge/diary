import { DiaryDate } from "lib/util/date";
import React, { useContext } from "react";

export const DateContext = React.createContext<DiaryDate>(new DiaryDate());

export const useDate = () => useContext(DateContext);
