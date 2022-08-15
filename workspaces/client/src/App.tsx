import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HistoryRouter } from "lib/router";
import { Toggle } from "lib/toggles/Toggle";
import React from "react";
import { LocaleContext } from "./app/context/locale/LocaleContext";
import { client } from "./app/graphql/client";
import { Routes } from "./app/routes/Routes";
import { auth0, Toggles, toggles } from "./config";
import { TogglesProvider } from "./lib/toggles/TogglesProvider";

const BffQueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Toggle name={Toggles.NEW_BACKEND}>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </Toggle>
    <Toggle isOff name={Toggles.NEW_BACKEND}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Toggle>
  </>
);

const App: React.FC = () => {
  return (
    <TogglesProvider toggles={toggles}>
      <Auth0Provider {...auth0}>
        <BffQueryProvider>
          <HistoryRouter>
            <LocaleContext.Provider value={navigator.language}>
              <main className="container">
                <Routes />
              </main>
            </LocaleContext.Provider>
          </HistoryRouter>
        </BffQueryProvider>
      </Auth0Provider>
    </TogglesProvider>
  );
};

export default App;
