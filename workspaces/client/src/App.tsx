import { Auth0Provider } from "@auth0/auth0-react";
import DiaryPage from "components/pages/DiaryPage";
import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { DiaryDate } from "util/date";
import { LocaleContext } from "./context/LocaleContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
        redirectUri={window.location.origin}
      >
        <LocaleContext.Provider value={navigator.language}>
          <Route exact path="/">
            <Redirect to={`/page/${new DiaryDate().getKey()}`} />
          </Route>
          <Route path="/page/:isoDateString">
            <DiaryPage />
          </Route>
        </LocaleContext.Provider>
      </Auth0Provider>
    </BrowserRouter>
  );
};

export default App;
