import React, { useContext } from "react";

export type PathSetter = (newPath: string) => void;

type RouterContextValue = {
  path: string;
  setPath: PathSetter;
};

export const RouterContext = React.createContext<
  RouterContextValue | undefined
>(undefined);

export const useSetPath = () => useContext(RouterContext)?.setPath;
