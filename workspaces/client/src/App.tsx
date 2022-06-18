import { Auth0Provider } from "@auth0/auth0-react";
import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { LocaleContext } from "./context/LocaleContext";
import { AppRoutes } from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
          redirectUri={window.location.origin}
        >
          <LocaleContext.Provider value={navigator.language}>
            <AppRoutes />
          </LocaleContext.Provider>
        </Auth0Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
