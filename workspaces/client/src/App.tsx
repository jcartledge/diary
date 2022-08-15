import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HistoryRouter } from "lib/router";
import React from "react";
import { LocaleContext } from "./app/context/locale/LocaleContext";
import { Routes } from "./app/routes/Routes";
import { auth0, toggles } from "./config";
import { TogglesProvider } from "./lib/toggles/TogglesProvider";

const App: React.FC = () => {
  return (
    <TogglesProvider toggles={toggles}>
      <Auth0Provider {...auth0}>
        <QueryClientProvider client={new QueryClient()}>
          <HistoryRouter>
            <LocaleContext.Provider value={navigator.language}>
              <main className="container">
                <Routes />
              </main>
            </LocaleContext.Provider>
          </HistoryRouter>
        </QueryClientProvider>
      </Auth0Provider>
    </TogglesProvider>
  );
};

export default App;
