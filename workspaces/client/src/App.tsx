import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocaleContext } from "./context/LocaleContext";
import { client } from "./graphql/client";
import { AppRoutes } from "./routes/AppRoutes";
import { TogglesProvider } from "./toggles/TogglesProvider";

const toggles = (process.env.REACT_APP_TOGGLES || "").split(/\s+/);

const App: React.FC = () => {
  return (
    <TogglesProvider toggles={toggles}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
        redirectUri={window.location.origin}
      >
        <ApolloProvider client={client}>
          <BrowserRouter>
            <LocaleContext.Provider value={navigator.language}>
              <AppRoutes />
            </LocaleContext.Provider>
          </BrowserRouter>
        </ApolloProvider>
      </Auth0Provider>
    </TogglesProvider>
  );
};

export default App;
