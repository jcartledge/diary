import { useEffect, useState } from "react";
import { Router } from "./Router";

type HistoryRouterProps = React.PropsWithChildren<{
  initialPath?: string;
}>;

export const HistoryRouter: React.FC<HistoryRouterProps> = ({
  children,
  initialPath,
}) => {
  const [path, setPath] = useState(window.location.pathname);
  const updatePath = (newPath: string) => {
    window.history.pushState({}, "", newPath);
    setPath(newPath);
  };

  const popStateListener = () => {
    setPath(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener("popstate", popStateListener);
    return () => {
      window.removeEventListener("popstate", popStateListener);
    };
  }, []);

  useEffect(() => {
    initialPath && updatePath(initialPath);
  }, [initialPath]);

  return (
    <Router initialPath={path} updatePath={updatePath}>
      {children}
    </Router>
  );
};
