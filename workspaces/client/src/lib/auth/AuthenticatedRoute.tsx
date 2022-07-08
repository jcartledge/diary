import { Route } from "lib/router";
import { type RouteProps } from "lib/router/components/Route";
import { Authenticated } from "./Authenticated";

type AuthenticatedRouteProps = React.PropsWithChildren<RouteProps>;

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
  ...routeProps
}) => (
  <Authenticated>
    <Route {...routeProps}>{children}</Route>
  </Authenticated>
);
