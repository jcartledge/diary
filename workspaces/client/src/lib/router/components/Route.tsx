import { Conditional } from "lib/util/Conditional";
import React from "react";
import { RouteParamsContext } from "../contexts/RouteParamsContext";
import { useMatch } from "../contexts/RouterContext";

type RouteProps = React.PropsWithChildren<{
  path: string;
}>;

export const Route: React.FC<RouteProps> = ({ children, path }) => {
  const { isMatch, params } = useMatch(path);
  return (
    <Conditional predicate={isMatch}>
      <RouteParamsContext.Provider value={params}>
        {children}
      </RouteParamsContext.Provider>
    </Conditional>
  );
};
