import { useState } from "react";
import { Router } from "./Router";

export const NavigationRouter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [path] = useState(window.location.pathname);
  return <Router initialPath={path}>{children}</Router>;
};
