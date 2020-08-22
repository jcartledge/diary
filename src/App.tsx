import DiaryPage from "components/pages/DiaryPage";
import { throttle } from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { buildState } from "store/state";
import {
  getEntriesFromLocalStorage,
  saveEntriesToLocalStorage,
} from "store/sync";
import { LocaleContext } from "./context/LocaleContext";
import { rootReducer } from "./store/reducers";

interface AppProps {
  localStorage?: Storage;
  throttleTime?: number;
}

const App: React.FC<AppProps> = ({
  localStorage = window.localStorage,
  throttleTime = 1000,
}) => {
  const entriesResult = getEntriesFromLocalStorage(localStorage);
  const entries = "error" in entriesResult ? [] : entriesResult.result;
  const initialState = buildState({ entries });
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(
    throttle(
      () => saveEntriesToLocalStorage(store.getState().entries, localStorage),
      throttleTime
    )
  );

  return (
    <LocaleContext.Provider value={navigator.language}>
      <Provider store={store}>
        <DiaryPage />
      </Provider>
    </LocaleContext.Provider>
  );
};

export default App;
