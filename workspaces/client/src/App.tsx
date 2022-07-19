import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { HistoryRouter } from "lib/router";
import { LocaleContext } from "./app/context/locale/LocaleContext";
import { client } from "./app/graphql/client";
import { Routes } from "./app/routes/Routes";
import { auth0, toggles } from "./config";
import { TogglesProvider } from "./lib/toggles/TogglesProvider";

const App: React.FC = () => {
  return (
    <TogglesProvider toggles={toggles}>
      <Auth0Provider {...auth0}>
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
