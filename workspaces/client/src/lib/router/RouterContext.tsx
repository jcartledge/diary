import { Maybe } from "lib/util/either.types";
import { createContext, useContext } from "react";

export type PathSetter = (newPath: string) => void;

type RouterContextValue = Maybe<{
  path: string;
  setPath: PathSetter;
}>;

export const RouterContext = createContext<RouterContextValue>(undefined);

export const useSetPath = () => useContext(RouterContext)?.setPath;
