import { useEffect } from "react";
import { useMatch, useSetPath } from "../contexts/RouterContext";

type RedirectProps = {
  path: string;
  to: string;
};

export const Redirect: React.FC<RedirectProps> = ({ path, to }) => {
  const { isMatch } = useMatch(path);
  const setPath = useSetPath();
  useEffect(() => {
    isMatch && setPath && setPath(to);
  }, [isMatch, setPath, to]);

  return null;
};
