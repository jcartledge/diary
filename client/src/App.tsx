import DiaryPage from "components/pages/DiaryPage";
import React from "react";
import { LocaleContext } from "./context/LocaleContext";

const App: React.FC = () => {
  return (
    <LocaleContext.Provider value={navigator.language}>
      <DiaryPage />
    </LocaleContext.Provider>
  );
};

export default App;
