import React, { useContext } from "react";
import { DiaryDate } from "../util/date";

export const DateContext = React.createContext<DiaryDate>(new DiaryDate());

export const useDate = () => useContext(DateContext);
