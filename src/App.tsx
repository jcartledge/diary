import DiaryPage from "components/pages/DiaryPage";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LocaleContext } from "./contexts/LocaleContext";
import { rootReducer } from "./store/reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App: React.FC = () => (
  <LocaleContext.Provider value={navigator.language}>
    <Provider store={store}>
      <DiaryPage />
    </Provider>
  </LocaleContext.Provider>
);

export default App;
