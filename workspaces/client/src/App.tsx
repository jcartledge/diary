import { Auth0Provider } from "@auth0/auth0-react";
import DiaryPage from "components/pages/DiaryPage";
import React from "react";
import { LocaleContext } from "./context/LocaleContext";

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
    >
      <LocaleContext.Provider value={navigator.language}>
        <DiaryPage />
      </LocaleContext.Provider>
    </Auth0Provider>
  );
};

export default App;
