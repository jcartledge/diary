import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { LocaleContext } from "./context/LocaleContext";
import { client } from "./graphql/client";
import { AppRoutes } from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <LocaleContext.Provider value={navigator.language}>
          <AppRoutes />
        </LocaleContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
