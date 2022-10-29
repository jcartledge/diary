import { createHelper } from "souvlaki";
import { Router } from "../components/Router";

export const withRouter = createHelper(
  (initialPath: string) =>
    ({ children }) => {
      return <Router initialPath={initialPath}>{children}</Router>;
    }
);
