import { createContext, useContext, useEffect } from "react";
import { matchPath } from "../util/matchPath";

export type PathSetter = (newPath: string) => void;

type RouterContextValue = {
  path: string;
  setPath?: PathSetter;
  setIsPathMatched?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RouterContext = createContext<RouterContextValue>({ path: "" });

export const useSetPath = () => {
  const { setPath, setIsPathMatched } = useContext(RouterContext);
  return (path: string) => {
    setIsPathMatched && setIsPathMatched(false);
    setPath && setPath(path);
  };
};

export const useMatch = (path: string) => {
  const { path: currentPath, setIsPathMatched } = useContext(RouterContext);
  const match = matchPath(path, currentPath);
  useEffect(() => {
    if (match.isMatch && setIsPathMatched) {
      setIsPathMatched(true);
    }
  }, [match.isMatch, setIsPathMatched]);

  return match;
};
