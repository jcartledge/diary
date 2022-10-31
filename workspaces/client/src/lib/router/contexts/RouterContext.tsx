import { createContext, useContext } from "react";
import { matchNonWildcardPath, matchWildcardPath } from "../util/matchPath";

export type PathSetter = (newPath: string) => void;

type RouterContextValue = {
  path: string;
  setPath?: PathSetter;
};

export const RouterContext = createContext<RouterContextValue>({ path: "" });

export const useSetPath = () => useContext(RouterContext).setPath;
export const useMatch = (path: string) => {
  const { path: currentPath } = useContext(RouterContext);
  const match = matchWildcardPath(path);
  return match.isMatch ? match : matchNonWildcardPath(path, currentPath);
};
