import React, { useContext } from "react";
import { matchPath, type MatchPathResult } from "./matchPath";

type RouterContextvalue = string;
const RouterContext = React.createContext<RouterContextvalue>("");

const useMatchPath = (pathTemplate: string): MatchPathResult =>
  matchPath(pathTemplate, useContext(RouterContext));

type RouterProps = React.PropsWithChildren<{
  initialPath: string;
}>;

export const Router: React.FC<RouterProps> = ({
  children,
  initialPath = "",
}) => {
  return (
    <RouterContext.Provider value={initialPath}>
      {children}
    </RouterContext.Provider>
  );
};

type RouteProps = React.PropsWithChildren<{
  path: string;
}>;

type RouteParams = Record<string, string>;

const RouteParamsContext = React.createContext<RouteParams>({});
export const useParams = () => useContext(RouteParamsContext);

export const Route: React.FC<RouteProps> = ({ children, path }) => {
  const { isMatch, params } = useMatchPath(path);
  return isMatch ? (
    <RouteParamsContext.Provider value={params}>
      {children}
    </RouteParamsContext.Provider>
  ) : null;
};
