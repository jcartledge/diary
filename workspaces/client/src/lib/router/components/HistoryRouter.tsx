import { useEffect, useState } from "react";
import { Router, RouterProps } from "./Router";
import { usePopState } from "./usePopState";

type HistoryRouterProps = Omit<RouterProps, "updatePath">;

export const HistoryRouter: React.FC<HistoryRouterProps> = ({
  children,
  initialPath,
  ...restProps
}) => {
  const [path, setPath] = useState(window.location.pathname);
  const updatePath = (newPath: string) => {
    window.history.pushState({}, "", newPath);
    setPath(newPath);
  };

  usePopState(() => {
    setPath(window.location.pathname);
  });

  useEffect(() => {
    initialPath && updatePath(initialPath);
  }, [initialPath]);

  return (
    <Router initialPath={path} updatePath={updatePath} {...restProps}>
      {children}
    </Router>
  );
};
