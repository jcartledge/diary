import React, { useContext } from "react";
import { matchPath } from "./matchPath";
import { RouteParamsContext } from "./RouteParamsContext";
import { RouterContext } from "./RouterContext";

type RouteProps = React.PropsWithChildren<{
  path: string;
}>;

export const Route: React.FC<RouteProps> = ({ children, path }) => {
  const { isMatch, params } = matchPath(path, useContext(RouterContext));
  return isMatch ? (
    <RouteParamsContext.Provider value={params}>
      {children}
    </RouteParamsContext.Provider>
  ) : null;
};
