import { Auth0Context, Auth0ContextInterface } from "@auth0/auth0-react";
import { createHelper } from "souvlaki";
import { buildMockAuth0ContextValue } from "../buildMockAuth0ContextValue";

export const withAuth0Wrapper = createHelper(
  (
      value: Partial<Auth0ContextInterface> = {}
    ): React.FC<React.PropsWithChildren<{}>> =>
    ({ children }) =>
      (
        <Auth0Context.Provider value={buildMockAuth0ContextValue(value)}>
          {children}
        </Auth0Context.Provider>
      )
);
