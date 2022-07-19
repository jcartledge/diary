import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { HistoryRouter } from "lib/router";
import { LocaleContext } from "./app/context/locale/LocaleContext";
import { client } from "./app/graphql/client";
import { Routes } from "./app/routes/Routes";
import { TogglesProvider } from "./lib/toggles/TogglesProvider";

const toggles = (import.meta.env.VITE_TOGGLES || "").split(/\s+/);

const App: React.FC = () => {
  return (
    <TogglesProvider toggles={toggles}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN ?? ""}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID ?? ""}
        redirectUri={import.meta.env.VITE_AUTH0_CALLBACK_URI ?? ""}
      >
        <ApolloProvider client={client}>
          <HistoryRouter>
            <LocaleContext.Provider value={navigator.language}>
              <main className="container">
                <Routes />
              </main>
            </LocaleContext.Provider>
          </HistoryRouter>
        </ApolloProvider>
      </Auth0Provider>
    </TogglesProvider>
  );
};

export default App;
