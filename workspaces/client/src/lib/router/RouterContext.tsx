import { createContext, useContext } from "react";
import { matchPath } from "./matchPath";

export type PathSetter = (newPath: string) => void;

type RouterContextValue = {
  path: string;
  setPath?: PathSetter;
};

export const RouterContext = createContext<RouterContextValue>({ path: "" });

export const useSetPath = () => useContext(RouterContext).setPath;
export const useMatch = (path: string) =>
  matchPath(path, useContext(RouterContext).path);
