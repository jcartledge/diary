import { throttle } from "lodash";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import { AppState, buildState } from "./state";
import { getEntriesFromLocalStorage, saveEntriesToLocalStorage } from "./sync";

const getDefaultInitialStateFromStorage = (storage: Storage) => {
  const entriesResult = getEntriesFromLocalStorage(storage);
  const entries = "error" in entriesResult ? [] : entriesResult.result;
  return buildState({ entries });
};

interface CreateStoreArgs {
  initialState?: AppState;
  storage?: Storage;
  throttleTime?: number;
}

export const createStorageBackedStore = ({
  initialState,
  storage = window.localStorage,
  throttleTime = 1000,
}: CreateStoreArgs = {}) => {
  const store = createStore(
    rootReducer,
    initialState ?? getDefaultInitialStateFromStorage(storage),
    composeWithDevTools()
  );

  store.subscribe(
    throttle(
      () => saveEntriesToLocalStorage(store.getState().entries, storage),
      throttleTime
    )
  );

  return store;
};
