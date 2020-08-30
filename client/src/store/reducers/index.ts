import { combineReducers } from "redux";
import { AppState } from "../state";
import { dateReducer } from "./dateReducer";
import { entriesReducer } from "./entriesReducer";

export const rootReducer = combineReducers<AppState>({
  date: dateReducer,
  entries: entriesReducer,
});
