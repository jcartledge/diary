import { useContext } from "react";
import { matchPath, type MatchPathResult } from "./matchPath";
import { RouterContext } from "./RouterContext";

export const useMatch = (path: string): MatchPathResult => {
  return matchPath(path, useContext(RouterContext)?.path ?? "");
};
