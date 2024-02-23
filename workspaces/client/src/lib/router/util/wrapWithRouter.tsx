import { Router } from "../components/Router";
import React from "react";

export const wrapWithRouter =
  (initialPath: string): React.FC<React.PropsWithChildren> =>
  ({ children }) => {
    return <Router initialPath={initialPath}>{children}</Router>;
  };
