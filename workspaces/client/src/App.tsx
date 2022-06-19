import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocaleContext } from "./context/LocaleContext";
import { client } from "./graphql/client";
import { AppRoutes } from "./routes/AppRoutes";
import { TogglesProvider } from "./toggles/TogglesProvider";

const App: React.FC = () => {
  return (
    <TogglesProvider
      toggles={(process.env.REACT_APP_TOGGLES || "").split(/\s+/)}
    >
      <ApolloProvider client={client}>
        <BrowserRouter>
          <LocaleContext.Provider value={navigator.language}>
            <AppRoutes />
          </LocaleContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    </TogglesProvider>
  );
};

export default App;
