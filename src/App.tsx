import React from "react";
import { Provider } from "react-redux";
import { Diary } from "./components/Diary";
import { LocaleContext } from "./contexts/LocaleContext";
import { store } from "./redux";

const App: React.FC = () => (
  <LocaleContext.Provider value={navigator.language}>
    <Provider store={store}>
      <Diary />
    </Provider>
  </LocaleContext.Provider>
);

export default App;
