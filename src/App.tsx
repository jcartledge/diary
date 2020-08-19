import React from "react";
import { Diary } from "./components/Diary";
import { LocaleContext } from "./contexts/LocaleContext";

const App: React.FC = () => (
  <LocaleContext.Provider value={navigator.language}>
    <Diary date={new Date()} />
  </LocaleContext.Provider>
);

export default App;
