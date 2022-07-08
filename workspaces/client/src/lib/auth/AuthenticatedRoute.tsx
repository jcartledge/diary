import { Route } from "lib/router";
import { Authenticated } from "./Authenticated";

type AuthenticatedRouteProps = React.PropsWithChildren<{
  path: string;
}>;

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
  path,
}) => (
  <Authenticated>
    <Route path={path}>{children}</Route>
  </Authenticated>
);
