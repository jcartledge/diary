import DiaryPage from "components/pages/DiaryPage";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { createStorageBackedStore } from "store";
import { LocaleContext } from "./context/LocaleContext";

interface AppProps {
  store?: Store;
}

const App: React.FC<AppProps> = ({ store }) => {
  return (
    <LocaleContext.Provider value={navigator.language}>
      <Provider store={store ?? createStorageBackedStore()}>
        <DiaryPage />
      </Provider>
    </LocaleContext.Provider>
  );
};

export default App;
