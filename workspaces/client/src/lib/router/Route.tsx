import React from "react";
import { RouteParamsContext } from "./RouteParamsContext";
import { useMatch } from "./useMatch";

type RouteProps = React.PropsWithChildren<{
  path: string;
}>;

export const Route: React.FC<RouteProps> = ({ children, path }) => {
  const { isMatch, params } = useMatch(path);
  return isMatch ? (
    <RouteParamsContext.Provider value={params}>
      {children}
    </RouteParamsContext.Provider>
  ) : null;
};
