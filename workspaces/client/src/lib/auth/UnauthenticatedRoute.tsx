import { Route } from "lib/router";
import { type RouteProps } from "lib/router/components/Route";
import { Unauthenticated } from "./Unauthenticated";

type UnauthenticatedRouteProps = React.PropsWithChildren<RouteProps>;

export const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
  children,
  ...routeProps
}) => (
  <Unauthenticated>
    <Route {...routeProps}>{children}</Route>
  </Unauthenticated>
);
