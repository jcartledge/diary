import React, { useEffect } from "react";
import { useMatch, useSetPath } from "./RouterContext";

type RouteProps = {
  path: string;
  to: string;
};

export const Redirect: React.FC<RouteProps> = ({ path, to }) => {
  const { isMatch } = useMatch(path);
  const setPath = useSetPath();
  useEffect(() => {
    isMatch && setPath && setPath(to);
  }, [isMatch, setPath, to]);

  return null;
};
