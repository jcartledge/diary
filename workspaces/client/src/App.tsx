import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocaleContext } from "./context/LocaleContext";
import { client } from "./graphql/client";
import { AppRoutes } from "./routes/AppRoutes";
import { EnvironmentTogglesProvider } from "./toggles/EnvironmentTogglesProvider";

const App: React.FC = () => {
  return (
    <EnvironmentTogglesProvider environment={process.env}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <LocaleContext.Provider value={navigator.language}>
            <AppRoutes />
          </LocaleContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    </EnvironmentTogglesProvider>
  );
};

export default App;
