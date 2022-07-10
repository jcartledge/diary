import { createHelper } from "souvlaki";
import { Router } from "../components/Router";

export const withRouter = createHelper(
  (initialPath): React.FC<React.PropsWithChildren> =>
    ({ children }) => {
      return <Router initialPath={initialPath}>{children}</Router>;
    }
);
